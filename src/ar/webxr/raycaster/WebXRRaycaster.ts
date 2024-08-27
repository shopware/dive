import { Matrix4, Mesh, Vector3 } from "three";
import { DIVERenderer } from "../../../renderer/Renderer";
import { DIVEWebXRRaycasterAR } from "./ar/WebXRRaycasterAR";
import { DIVEWebXRRaycasterTHREE } from "./three/WebXRRaycasterTHREE";
import { DIVEScene } from "../../../scene/Scene";

/**
 * object is undefined when AR world is hit.
 */
export type DIVEHitResult = {
    point: Vector3;
    matrix: Matrix4;
    object?: Mesh;
}

type DIVEWebXREvents = {
    'HIT_FOUND': {
        hit: DIVEHitResult;
    },
    'HIT_LOST': undefined;
};

type EventListener<DIVEWebXREvent extends keyof DIVEWebXREvents> = (payload: DIVEWebXREvents[DIVEWebXREvent]) => void;

type Unsubscribe = () => boolean;

export class DIVEWebXRRaycaster {
    private _renderer: DIVERenderer;
    private _session: XRSession;

    private _initialized: boolean = false;

    private _threeRaycaster: DIVEWebXRRaycasterTHREE;
    private _arRaycaster: DIVEWebXRRaycasterAR;

    private _hitResultBuffer: DIVEHitResult[] = [];

    // listeners
    private _listeners: Map<keyof DIVEWebXREvents, EventListener<keyof DIVEWebXREvents>[]> = new Map();

    // buffers
    private _hasHit: boolean = false;

    constructor(session: XRSession, renderer: DIVERenderer, scene: DIVEScene) {
        this._session = session;
        this._renderer = renderer;

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

    public Update(frame: XRFrame): void {
        if (!this._initialized) return;

        // check for scene hits
        this._hitResultBuffer = this._threeRaycaster.GetIntersections();
        if (this._hitResultBuffer.length > 0) {
            // scene hit found
            this.onHitFound(this._hitResultBuffer[0]);
            // early return to prevent ar raycaster from overriding scene hit
            return;
        } else {
            // scene hit nothing
            this.onHitLost();
        }

        // check for ar hits
        this._hitResultBuffer = this._arRaycaster.GetIntersections(frame);
        if (this._hitResultBuffer.length > 0) {
            // hit found
            this.onHitFound(this._hitResultBuffer[0]);

        } else {
            // hit nothing
            this.onHitLost();
        }
    }

    public Subscribe<DIVEWebXREvent extends keyof DIVEWebXREvents>(type: DIVEWebXREvent, listener: EventListener<DIVEWebXREvent>): Unsubscribe {
        if (!this._listeners.get(type)) this._listeners.set(type, []);

        // casting to any because of typescript not finding between Action and typeof Actions being equal in this case
        this._listeners.get(type)!.push(listener as EventListener<keyof DIVEWebXREvents>);

        return () => {
            const listenerArray = this._listeners.get(type);
            if (!listenerArray) return false;

            const existingIndex = listenerArray.findIndex((entry) => entry === listener);
            if (existingIndex === -1) return false;

            listenerArray.splice(existingIndex, 1);
            return true;
        };
    }

    private dispatch<Action extends keyof DIVEWebXREvents>(type: Action, payload?: DIVEWebXREvents[Action]): void {
        const listenerArray = this._listeners.get(type);
        if (!listenerArray) return;

        listenerArray.forEach((listener) => listener(payload))
    }

    private onHitFound(hit: DIVEHitResult): void {
        this._hasHit = true;
        this.dispatch('HIT_FOUND', { hit });
    }

    private onHitLost(): void {
        if (!this._hasHit) return;

        this._hasHit = false;
        this.dispatch('HIT_LOST');
    }
}