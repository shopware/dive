import { Matrix4, Mesh, Vector3 } from "three";
import { DIVERenderer } from "../../../renderer/Renderer";
import { DIVEWebXRRaycasterAR } from "./ar/WebXRRaycasterAR";
import { DIVEWebXRRaycasterTHREE } from "./three/WebXRRaycasterTHREE";
import { DIVEScene } from "../../../scene/Scene";
import { DIVEEventExecutor } from "../../../events/EventExecutor";

/**
 * object is undefined when AR world is hit.
 */
export type DIVEHitResult = {
    point: Vector3;
    matrix: Matrix4;
    object?: Mesh;
}
type DIVEWebXREvents = {
    'AR_HIT_FOUND': {
        hit: DIVEHitResult;
    },
    'AR_HIT_LOST': undefined;
    'SCENE_HIT_FOUND': {
        hit: DIVEHitResult;
    };
    'SCENE_HIT_LOST': undefined;
};

export class DIVEWebXRRaycaster extends DIVEEventExecutor<DIVEWebXREvents> {
    private _session: XRSession;

    private _initialized: boolean = false;

    private _threeRaycaster: DIVEWebXRRaycasterTHREE;
    private _arRaycaster: DIVEWebXRRaycasterAR;

    private _arHitResultBuffer: DIVEHitResult[] = [];
    private _sceneHitResultBuffer: DIVEHitResult[] = [];

    // buffers
    private _hasHit: boolean = false;

    constructor(session: XRSession, renderer: DIVERenderer, scene: DIVEScene) {
        super();

        this._session = session;

        this._threeRaycaster = new DIVEWebXRRaycasterTHREE(renderer, scene);
        this._arRaycaster = new DIVEWebXRRaycasterAR(session, renderer);
    }

    public Dispose(): void {
        // dispose code here
        this._initialized = false;
    }

    public async Init(): Promise<this> {
        if (!this._session) {
            console.error("DIVEWebXRRaycaster: No session set in Init()! Aborting initialization...");
            return Promise.reject();
        }

        if (this._initialized) {
            console.error("DIVEWebXRRaycaster: Already initialized! Aborting initialization...");
            return Promise.reject();
        }

        await this._threeRaycaster.Init();
        await this._arRaycaster.Init();

        console.log('DIVEWebXRRaycaster: Initialized');

        this._initialized = true;

        return Promise.resolve(this);
    }

    public GetARIntersections(frame: XRFrame): DIVEHitResult[] {
        // check for ar hits
        this._arHitResultBuffer = this._arRaycaster.GetIntersections(frame);
        if (this._arHitResultBuffer.length > 0) {
            // hit found
            this.onARHitFound(this._arHitResultBuffer[0]);

        } else {
            // hit nothing
            this.onARHitLost();
        }
        return this._arHitResultBuffer;
    }

    public GetSceneIntersections(): DIVEHitResult[] {
        // check for scene hits
        this._sceneHitResultBuffer = this._threeRaycaster.GetIntersections();
        if (this._sceneHitResultBuffer.length > 0) {
            // scene hit found
            this.onSceneHitFound(this._sceneHitResultBuffer[0]);
            // early return to prevent ar raycaster from overriding scene hit
        } else {
            // scene hit nothing
            this.onSceneHitLost();
        }
        return this._sceneHitResultBuffer;
    }

    private onARHitFound(hit: DIVEHitResult): void {
        this._hasHit = true;
        this.dispatch('AR_HIT_FOUND', { hit });
    }

    private onARHitLost(): void {
        if (!this._hasHit) return;

        this._hasHit = false;
        this.dispatch('AR_HIT_LOST');
    }

    private onSceneHitFound(hit: DIVEHitResult): void {
        this._hasHit = true;
        this.dispatch('SCENE_HIT_FOUND', { hit });
    }

    private onSceneHitLost(): void {
        if (!this._hasHit) return;

        this._hasHit = false;
        this.dispatch('SCENE_HIT_LOST');
    }
}