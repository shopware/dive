import { Matrix4, Vector3 } from "three";
import { type DIVERenderer } from "../../../../renderer/Renderer";
import { type DIVEHitResult } from "../WebXRRaycaster";

export class DIVEWebXRRaycasterAR {
    private _session: XRSession;
    private _renderer: DIVERenderer;

    private _transientHitTestSource: XRTransientInputHitTestSource | undefined;
    private _referenceSpaceBuffer: XRReferenceSpace | null = null;

    private _requesting: boolean = false;
    private _initialized: boolean = false;

    private _hitMatrixBuffer: Matrix4;

    constructor(session: XRSession, renderer: DIVERenderer) {
        this._session = session;
        this._renderer = renderer;

        this._hitMatrixBuffer = new Matrix4();
    }

    public Dispose(): void {
        this._transientHitTestSource?.cancel();
        this._transientHitTestSource = undefined;

        this._initialized = false;
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
        this._transientHitTestSource = await this._session.requestHitTestSourceForTransientInput!({ profile: 'generic-touchscreen' });
        this._referenceSpaceBuffer = this._renderer.xr.getReferenceSpace();
        this._requesting = false;

        if (!this._transientHitTestSource) {
            return Promise.reject();
        }

        this._initialized = true;

        console.log('DIVEWebXRRaycasterAR: Initialized');

        return Promise.resolve(this);
    }

    public GetIntersections(frame: XRFrame): DIVEHitResult[] {
        if (!this._transientHitTestSource) return [];

        const touches = frame.getHitTestResultsForTransientInput(this._transientHitTestSource);
        if (touches.length === 0) return [];

        const hits = touches.map((touch: XRTransientInputHitTestResult) => {
            if (!this._referenceSpaceBuffer) return undefined;
            if (!touch.results[0]) return undefined;
            if (!touch.results[0].getPose) return undefined;

            const pose = touch.results[0].getPose(this._referenceSpaceBuffer);
            if (!pose) return undefined;

            this._hitMatrixBuffer.fromArray(pose.transform.matrix);
            const position = new Vector3().setFromMatrixPosition(this._hitMatrixBuffer);

            return { point: position, matrix: this._hitMatrixBuffer, object: undefined };
        });

        return hits.filter((hit) => hit !== undefined) as DIVEHitResult[];
    }
}