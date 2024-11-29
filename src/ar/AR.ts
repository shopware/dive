import { DIVEInfo, WebXRUnsupportedReason } from "../info/Info";
import { DIVEARQuickLook } from "./arquicklook/ARQuickLook";
import { DIVEWebXR } from "./webxr/WebXR";
import { type DIVEScene } from "../scene/Scene";
import { type DIVERenderer } from "../renderer/Renderer";
import DIVEOrbitControls from "../controls/OrbitControls";

export class DIVEAR {
    private _renderer: DIVERenderer;
    private _scene: DIVEScene;
    private _controller: DIVEOrbitControls;

    constructor(renderer: DIVERenderer, scene: DIVEScene, controller: DIVEOrbitControls) {
        this._renderer = renderer;
        this._scene = scene;
        this._controller = controller;
    }

    public async Launch(): Promise<void> {
        const system = DIVEInfo.GetSystem();

        if (system === 'iOS') {
            const support = DIVEInfo.GetSupportsARQuickLook();
            if (!support) {
                console.log('ARQuickLook not supported');
                return Promise.reject();
            }

            console.log('Launching AR on iOS');

            // Launch ARQuickLook
            await DIVEARQuickLook.Launch(this._scene);
            return Promise.resolve();
        }

        if (system === 'Android') {
            const support = await DIVEInfo.GetSupportsWebXR();
            if (!support) {
                console.log('WebXR not supported. Reason: ' + WebXRUnsupportedReason[DIVEInfo.GetWebXRUnsupportedReason()!]);
                return Promise.reject();
            }

            console.log('Launching AR on Android');

            // Launch WebXR
            await DIVEWebXR.Launch(this._renderer, this._scene, this._controller);
            return Promise.resolve();
        }

        console.log('AR not supported. Not a mobile system. (System is ' + system + ')');
    }
}