import { DIVEInfo, WebXRUnsupportedReason } from '../info/Info';
import { DIVEARQuickLook } from './arquicklook/ARQuickLook';
import { DIVEWebXR } from './webxr/WebXR';
import { type DIVEScene } from '../scene/Scene';
import { type DIVERenderer } from '../renderer/Renderer';
import DIVEOrbitControls from '../controls/OrbitControls';
import { DIVESceneViewer } from './sceneviewer/SceneViewer';

export type DIVEAROptions = {
    arPlacement: 'horizontal' | 'vertical';
    arScale: 'auto' | 'fixed';
    /**
     * experimental, currently deactivated
     */
    useWebXR: false;
};

export class DIVEAR {
    private _renderer: DIVERenderer;
    private _scene: DIVEScene;
    private _controller: DIVEOrbitControls;

    constructor(
        renderer: DIVERenderer,
        scene: DIVEScene,
        controller: DIVEOrbitControls,
    ) {
        this._renderer = renderer;
        this._scene = scene;
        this._controller = controller;
    }

    public async Launch(options?: DIVEAROptions): Promise<void> {
        const system = DIVEInfo.GetSystem();

        if (system === 'iOS') {
            return this.tryARQuickLook();
        }

        if (system === 'Android') {
            if (options?.useWebXR) {
                console.warn('DIVE: WebXR is experimental on Android.');
                return this.tryWebXR();
            }

            return this.trySceneViewer();
        }

        console.log(
            'DIVE: AR not supported. Not a mobile system. (System is ' +
                system +
                ')',
        );
    }

    private async tryARQuickLook(options?: DIVEAROptions): Promise<void> {
        const support = DIVEInfo.GetSupportsARQuickLook();
        if (!support) {
            console.log('ARQuickLook not supported');
            return Promise.reject();
        }

        console.log('DIVE: Launching AR with ARQuickLook ...');

        // Launch ARQuickLook
        await DIVEARQuickLook.Launch(this._scene, options);
        return Promise.resolve();
    }

    private async tryWebXR(): Promise<void> {
        const support = await DIVEInfo.GetSupportsWebXR();
        if (!support) {
            console.log(
                'WebXR not supported. Reason: ' +
                    WebXRUnsupportedReason[
                        DIVEInfo.GetWebXRUnsupportedReason()!
                    ],
            );
            return Promise.reject();
        }

        console.log('DIVE: Launching AR with WebXR ...');
        // Launch WebXR
        await DIVEWebXR.Launch(this._renderer, this._scene, this._controller);
        return Promise.resolve();
    }

    private async trySceneViewer(options?: DIVEAROptions): Promise<void> {
        // actually we don't have to try here, because SceneViewer is supported on all devices by now.
        // if there are no AR services (ARCore) installed on the device, SceneViewer will only show the model in 3D.
        // we also have no options to detect if SceneViewer is supported.

        console.log('DIVE: Launching AR with SceneViewer ...');

        DIVESceneViewer.Launch(this._scene, options);
        return Promise.resolve();
    }
}
