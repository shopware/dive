import { Matrix4, Quaternion, Vector3 } from "three";
import { DIVERenderer } from "../../../renderer/Renderer";

export class DIVEWebXROrigin {
    private _renderer: DIVERenderer;
    private _session: XRSession;

    private _requesting: boolean;
    private _initialized: boolean;

    private _referenceSpaceBuffer: XRReferenceSpace | null;
    private _hitTestSource: XRHitTestSource | null;

    private _entityTypes: XRHitTestTrackableType[];

    private _hitTestResultBuffer: XRHitTestResult[];
    private _raycastHitCounter: number = 0;

    private _originSet: Promise<void>;
    private _originSetResolve: (value: void) => void = () => { };
    public get originSet(): Promise<void> {
        return this._originSet;
    }

    private _matrix: Matrix4;
    public get matrix(): Matrix4 {
        return this._matrix;
    }
    private set matrix(value: Matrix4) {
        this._matrix = value;
        this._matrix.decompose(this._position, this._quaternion, this._scale);
    }

    private _position: Vector3;
    public get position(): Vector3 {
        return this._position;
    }

    private _quaternion: Quaternion;
    public get quaternion(): Quaternion {
        return this._quaternion;
    }

    private _scale: Vector3;
    public get scale(): Vector3 {
        return this._scale;
    }

    constructor(session: XRSession, renderer: DIVERenderer, entityTypes?: XRHitTestTrackableType[]) {
        this._renderer = renderer;
        this._session = session;

        this._originSet = new Promise<void>((resolve) => {
            this._originSetResolve = resolve;
        });

        this._requesting = false;
        this._initialized = false;

        this._referenceSpaceBuffer = null;
        this._hitTestSource = null;

        this._entityTypes = entityTypes || ['plane'];

        this._hitTestResultBuffer = [];

        // set up promises and executors
        this._matrix = new Matrix4();
        this._position = new Vector3();
        this._quaternion = new Quaternion();
        this._scale = new Vector3();

        // when origin is set, decompose matrix into position, quaternion and scale
        this._originSet.then(() => {
            // decompose matrix into position, quaternion and scale
            this._matrix.decompose(this._position, this._quaternion, this._scale);
        });
    }

    public async Init(): Promise<this> {
        if (this._initialized) {
            return Promise.resolve(this);
        }

        if (!this._session) {
            console.error("DIVEWebXROrigin: No session set in Init()! Aborting initialization...");
            return Promise.reject();
        }

        if (this._requesting) {
            console.error("DIVEWebXROrigin: Currently initializing! Aborting initialization...");
            return Promise.reject();
        }

        this._requesting = true;
        const referenceSpace = await this._session.requestReferenceSpace('viewer');
        this._hitTestSource = await this._session.requestHitTestSource!({ space: referenceSpace, entityTypes: this._entityTypes }) || null;
        this._requesting = false;

        if (!this._hitTestSource) {
            return Promise.reject();
        }

        this._initialized = true;

        return Promise.resolve(this);
    }

    public Dispose(): void {
        this._initialized = false;
        this._requesting = false;

        this._hitTestSource?.cancel();

        this._hitTestSource = null;
        this._hitTestResultBuffer = [];

        this._matrix = new Matrix4();
        this._position = new Vector3();
        this._quaternion = new Quaternion();
        this._scale = new Vector3();
    }

    public Update(frame: XRFrame): void {
        if (!this._initialized) return;

        if (!this._hitTestSource) {
            throw new Error("DIVEWebXRRaycaster: Critical Error: HitTestSource not available but WebXROrigin is initialized!");
        }

        // get hit test results
        this._hitTestResultBuffer = frame.getHitTestResults(this._hitTestSource);
        if (this._hitTestResultBuffer.length > 0) {

            // hit found
            this._referenceSpaceBuffer = this._renderer.xr.getReferenceSpace();

            // if there is no reference space, hit will be counted as lost for this frame
            if (!this._referenceSpaceBuffer) {
                this.onHitLost();
                return;
            }

            const pose = this._hitTestResultBuffer[0].getPose(this._referenceSpaceBuffer);
            if (!pose) {
                this.onHitLost();
                return;
            }

            this.onHitFound(pose);

        } else {
            this.onHitLost();
        }
    }

    private onHitFound(pose: XRPose): void {
        this._raycastHitCounter++;

        this.matrix.fromArray(pose.transform.matrix);

        if (this._raycastHitCounter > 50) {
            this._originSetResolve();
        }
    }

    private onHitLost(): void {
        this._raycastHitCounter = 0;
    }
}