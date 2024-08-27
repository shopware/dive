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

    private _originSet: boolean;

    private _matrix: Promise<Matrix4>;
    public get matrix(): Promise<Matrix4> {
        return this._matrix;
    }
    private _matrixExecutor: { resolve: (value: Matrix4) => void, reject: (reason?: unknown) => void } = { resolve: () => { }, reject: () => { } };

    private _originPosition: Promise<Vector3>;
    public get originPosition(): Promise<Vector3> {
        return this._originPosition;
    }
    private _originPositionExecutor: { resolve: (value: Vector3) => void, reject: (reason?: unknown) => void } = { resolve: () => { }, reject: () => { } };

    private _originQuaternion: Promise<Quaternion>;
    public get originQuaternion(): Promise<Quaternion> {
        return this._originQuaternion;
    }
    private _originQuaternionExecutor: { resolve: (value: Quaternion) => void, reject: (reason?: unknown) => void } = { resolve: () => { }, reject: () => { } };

    private _originScale: Promise<Vector3>;
    public get originScale(): Promise<Vector3> {
        return this._originScale;
    }
    private _originScaleExecutor: { resolve: (value: Vector3) => void, reject: (reason?: unknown) => void } = { resolve: () => { }, reject: () => { } };

    constructor(session: XRSession, renderer: DIVERenderer, entityTypes?: XRHitTestTrackableType[]) {
        this._renderer = renderer;
        this._session = session;

        this._originSet = false;
        this._requesting = false;
        this._initialized = false;

        this._referenceSpaceBuffer = null;
        this._hitTestSource = null;

        this._entityTypes = entityTypes || ['plane'];

        this._hitTestResultBuffer = [];

        // set up promises and executors
        this._matrix = new Promise<Matrix4>((resolve, reject) => {
            this._matrixExecutor = { resolve: resolve, reject: reject };
        });
        this._originPosition = new Promise<Vector3>((resolve, reject) => {
            this._originPositionExecutor = { resolve: resolve, reject: reject };
        });
        this._originQuaternion = new Promise<Quaternion>((resolve, reject) => {
            this._originQuaternionExecutor = { resolve: resolve, reject: reject };
        });
        this._originScale = new Promise<Vector3>((resolve, reject) => {
            this._originScaleExecutor = { resolve: resolve, reject: reject };
        });

        // when origin is set, decompose matrix into position, quaternion and scale
        this.matrix.then((matrix) => {
            // create holders for position, quaternion and scale
            const position: Vector3 = new Vector3();
            const quaternion: Quaternion = new Quaternion();
            const scale: Vector3 = new Vector3();

            // decompose matrix into position, quaternion and scale
            matrix.decompose(position, quaternion, scale);

            // resolve promises
            this._originPositionExecutor.resolve(position);
            this._originQuaternionExecutor.resolve(quaternion);
            this._originScaleExecutor.resolve(scale);

            this._originSet = true;

            this._referenceSpaceBuffer = null;
            this._hitTestSource?.cancel();
            this._hitTestSource = null;
        });
    }

    public async Init(): Promise<this> {
        if (this._originSet) {
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

        if (this._initialized) {
            return Promise.resolve(this);
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

    public Update(frame: XRFrame): void {
        if (!this._initialized) return;

        if (!this._hitTestSource) {
            throw new Error("DIVEWebXRRaycaster: Critical Error: HitTestSource not available but Raycaster is initialized!");
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

        if (this._raycastHitCounter > 50) {
            this._matrixExecutor.resolve(new Matrix4().fromArray(pose.transform.matrix));
        }
    }

    private onHitLost(): void {
        this._raycastHitCounter = 0;
    }
}