import { OrbitController } from '../../../orbitcontroller/index.ts';
import { DIVEEngine } from '../../../../index.ts';
export declare class DIVEWebXR {
    private static _renderer;
    private static _scene;
    private static _controller;
    private static _cameraPosition;
    private static _cameraTarget;
    private static _renderCallbackId;
    private static _session;
    private static _referenceSpaceType;
    private static _overlay;
    private static _options;
    private static _xrController;
    static Launch(engine: DIVEEngine, controller: OrbitController): Promise<void>;
    static update(_time: DOMHighResTimeStamp, frame: XRFrame): void;
    static end(): void;
    private static _onSessionStarted;
    private static _onSessionEnded;
}
