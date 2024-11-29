import { DIVEInfo } from "../info/Info";
import { DIVEARQuickLook } from "./arquicklook/ARQuickLook";
import { DIVEWebXR } from "./webxr/WebXR";
import { type DIVEScene } from "../scene/Scene";
import { type DIVERenderer } from "../renderer/Renderer";

export class DIVEAR {
    private renderer: DIVERenderer;
    private scene: DIVEScene;

    constructor(renderer: DIVERenderer, scene: DIVEScene) {
        this.renderer = renderer;
        this.scene = scene;
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
            await DIVEARQuickLook.Launch(this.scene);
            return Promise.resolve();
        }

        if (system === 'Android') {
            const support = await DIVEInfo.GetSupportsWebXR();
            if (!support) {
                console.log('WebXR not supported. Reason: ' + DIVEInfo.GetWebXRUnsupportedReason());
                return Promise.reject();
            }

            console.log('Launching AR on Android');

            // Launch WebXR
            await DIVEWebXR.Launch(this.renderer);
            return Promise.resolve();
        }

    }
}