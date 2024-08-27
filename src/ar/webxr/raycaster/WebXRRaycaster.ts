import { DIVERenderer } from "../../../renderer/Renderer";

type DIVEWebXREvents = {
    'HIT_FOUND': {
        hit: XRHitTestResult;
    },
    'HIT_LOST': undefined;
};

type EventListener<DIVEWebXREvent extends keyof DIVEWebXREvents> = (payload: DIVEWebXREvents[DIVEWebXREvent]) => void;

type Unsubscribe = () => boolean;

export class DIVEWebXRRaycaster {
    private _renderer: DIVERenderer;

    private _session: XRSession;
    private _entityTypes: XRHitTestTrackableType[] | undefined;

    private _hitTestSource: XRHitTestSource | undefined;

    private _requesting: boolean = false;
    private _initialized: boolean = false;

    // listeners
    private _listeners: Map<keyof DIVEWebXREvents, EventListener<keyof DIVEWebXREvents>[]> = new Map();

    // buffers
    private _hitTestResultBuffer: XRHitTestResult[] = [];
    private _referenceSpaceBuffer: XRReferenceSpace | null = null;
    private _hasHit: boolean = false;

    constructor(session: XRSession, renderer: DIVERenderer, entityTypes?: XRHitTestTrackableType[]) {
        this._renderer = renderer;

        this._session = session;
        this._entityTypes = entityTypes;
    }

    public Dispose(): void {
        // dispose code here
        if (this._hitTestSource) this._hitTestSource.cancel();
        this._hitTestSource = undefined;

        this._initialized = false;
        this._requesting = false;
    }

    public async Init(): Promise<this> {
        if (!this._session) {
            console.error("DIVEWebXRRaycaster: No session set in Init()! Aborting initialization...");
            return Promise.reject();
        }

        if (this._requesting) {
            console.error("DIVEWebXRRaycaster: Currently initializing! Aborting initialization...");
            return Promise.reject();
        }

        if (this._initialized) {
            console.error("DIVEWebXRRaycaster: Already initialized! Aborting initialization...");
            return Promise.reject();
        }

        this._requesting = true;
        const referenceSpace = await this._session.requestReferenceSpace('viewer');
        this._hitTestSource = await this._session.requestHitTestSource!({ space: referenceSpace, entityTypes: this._entityTypes });
        this._requesting = false;

        if (!this._hitTestSource) {
            return Promise.reject();
        }

        this._initialized = true;

        return Promise.resolve(this);
    }

    public Update(frame: XRFrame): void {
        if (!this._initialized) return;

        if (!this._hitTestSource) {
            throw new Error("DIVEWebXRRaycaster: Critical Error: HitTestSource not available but Raycaster is initialized!");
        }

        // get hit test results
        this._hitTestResultBuffer = frame.getHitTestResults(this._hitTestSource);
        if (this._hitTestResultBuffer.length > 0) {

            // hit found
            const hit = this._hitTestResultBuffer[0];
            this._referenceSpaceBuffer = this._renderer.xr.getReferenceSpace();

            // if there is no reference space, hit will be counted as lost for this frame
            if (!this._referenceSpaceBuffer) {
                this.onHitLost();
                return;
            }

            this.onHitFound(hit);

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

    private onHitFound(hit: XRHitTestResult): void {
        // hit test result code here
        if (!this._referenceSpaceBuffer) {
            console.error("DIVEWebXRRaycaster: ReferenceSpace not available but hit found!");
            return;
        }

        const pose = hit.getPose(this._referenceSpaceBuffer);
        if (!pose) return;

        this._hasHit = true;
        this.dispatch('HIT_FOUND', { hit });
    }

    private onHitLost(): void {
        if (!this._hasHit) return;

        this._hasHit = false;
        this.dispatch('HIT_LOST');
    }
}