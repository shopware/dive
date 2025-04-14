import { default as DIVEOrbitControls } from '../../../controls/OrbitControls';
import { DIVERenderer } from '../../../engine/renderer/Renderer';
import { DIVEScene } from '../../../engine/scene/Scene';
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
    static Launch(renderer: DIVERenderer, scene: DIVEScene, controller: DIVEOrbitControls): Promise<void>;
    static Update(_time: DOMHighResTimeStamp, frame: XRFrame): void;
    static End(): void;
    private static _onSessionStarted;
    private static _onSessionEnded;
}
