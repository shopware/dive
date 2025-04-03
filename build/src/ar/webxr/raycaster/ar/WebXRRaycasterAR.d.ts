import { DIVERenderer } from '../../../../renderer/Renderer';
import { DIVEHitResult } from '../WebXRRaycaster';
export declare class DIVEWebXRRaycasterAR {
    private _session;
    private _renderer;
    private _transientHitTestSource;
    private _referenceSpaceBuffer;
    private _requesting;
    private _initialized;
    private _hitMatrixBuffer;
    constructor(session: XRSession, renderer: DIVERenderer);
    Dispose(): void;
    Init(): Promise<this>;
    GetIntersections(frame: XRFrame): DIVEHitResult[];
}
