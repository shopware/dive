import { DIVERenderPipeline } from '../../../../../../engine/renderer/Renderer.ts';
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
    dispose(): void;
    init(): Promise<this>;
    getIntersections(frame: XRFrame): DIVEHitResult[];
}
