import { DIVERenderPipeline } from '../../../../../engine/renderer/Renderer.ts';
import { DIVEHitResult } from '../WebXRRaycaster.ts';
export declare class DIVEWebXRRaycasterAR {
    private _session;
    private _renderer;
    private _transientHitTestSource;
    private _referenceSpaceBuffer;
    private _requesting;
    private _initialized;
    private _hitMatrixBuffer;
    constructor(session: XRSession, renderer: DIVERenderPipeline);
    Dispose(): void;
    Init(): Promise<this>;
    GetIntersections(frame: XRFrame): DIVEHitResult[];
}
