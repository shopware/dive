import { Matrix4, Mesh, Vector3 } from 'three';
import { DIVERenderPipeline } from '../../../../engine/renderer/Renderer.ts';
import { DIVEWebXRRaycasterAR } from './ar/WebXRRaycasterAR.ts';
import { DIVEWebXRRaycasterTHREE } from './three/WebXRRaycasterTHREE.ts';
import { DIVEScene } from '../../../../engine/scene/Scene.ts';
import { DIVEEventExecutor } from '../../../../modules/events/EventExecutor.ts';

/**
 * object is undefined when AR world is hit.
 */
export type DIVEHitResult = {
    point: Vector3;
    matrix: Matrix4;
    object?: Mesh;
};

export type DIVEWebXRRaycasterEvents = {
    AR_HIT_FOUND: {
        hit: DIVEHitResult;
    };
    AR_HIT_LOST: undefined;
    SCENE_HIT_FOUND: {
        hit: DIVEHitResult;
    };
    SCENE_HIT_LOST: undefined;
};

export class DIVEWebXRRaycaster extends DIVEEventExecutor<DIVEWebXRRaycasterEvents> {
    private _session: XRSession;

    private _initialized: boolean = false;

    private _threeRaycaster: DIVEWebXRRaycasterTHREE;
    private _arRaycaster: DIVEWebXRRaycasterAR;

    private _arHitResultBuffer: DIVEHitResult[] = [];
    private _sceneHitResultBuffer: DIVEHitResult[] = [];

    // buffers
    private _hasHit: boolean = false;

    constructor(
        session: XRSession,
        renderer: DIVERenderPipeline,
        scene: DIVEScene,
    ) {
        super();

        this._session = session;

        this._threeRaycaster = new DIVEWebXRRaycasterTHREE(renderer, scene);
        this._arRaycaster = new DIVEWebXRRaycasterAR(session, renderer);
    }

    public dispose(): void {
        // dispose code here
        this._initialized = false;
    }

    public async init(): Promise<this> {
        if (!this._session) {
            console.error(
                'DIVEWebXRRaycaster: No session set in init()! Aborting initialization...',
            );
            return Promise.reject();
        }

        if (this._initialized) {
            console.error(
                'DIVEWebXRRaycaster: Already initialized! Aborting initialization...',
            );
            return Promise.reject();
        }

        await this._threeRaycaster.init();
        await this._arRaycaster.init();

        console.log('DIVEWebXRRaycaster: Initialized');

        this._initialized = true;

        return Promise.resolve(this);
    }

    public getARIntersections(frame: XRFrame): DIVEHitResult[] {
        // check for ar hits
        this._arHitResultBuffer = this._arRaycaster.getIntersections(frame);
        if (this._arHitResultBuffer.length > 0) {
            // hit found
            this.onARHitFound(this._arHitResultBuffer[0]);
        } else {
            // hit nothing
            this.onARHitLost();
        }
        return this._arHitResultBuffer;
    }

    public getSceneIntersections(): DIVEHitResult[] {
        // check for scene hits
        this._sceneHitResultBuffer = this._threeRaycaster.getIntersections();
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
