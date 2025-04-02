import { DIVEInfo } from '../info/Info';
import { DIVEARQuickLook } from './arquicklook/ARQuickLook';
import { DIVESceneViewer } from './sceneviewer/SceneViewer';
import { type DIVEScene } from '../scene/Scene';

export type DIVEAROptions = {
    arPlacement: 'horizontal' | 'vertical';
    arScale: 'auto' | 'fixed';
};

export class DIVEAR {
    private readonly _scene: DIVEScene;

    constructor(scene: DIVEScene) {
        this._scene = scene;
    }

    public async launch(uri: string, options?: DIVEAROptions): Promise<void> {
        const system = DIVEInfo.GetSystem();

        if (system === 'iOS') {
            return this.tryARQuickLook(uri, options);
        }

        if (system === 'Android') {
            return this.trySceneViewer(uri, options);
        }

        console.log(
            'DIVE: AR not supported. Not a mobile system. (System is ' +
                system +
                ')',
        );
        return Promise.reject(
            new Error('AR not supported on non-mobile systems'),
        );
    }

    private async tryARQuickLook(
        uri: string,
        options?: DIVEAROptions,
    ): Promise<void> {
        const support = DIVEInfo.GetSupportsARQuickLook();
        if (!support) {
            console.log('ARQuickLook not supported');
            return Promise.reject(new Error('ARQuickLook not supported'));
        }

        console.log('DIVE: Launching AR with ARQuickLook ...');

        try {
            return new DIVEARQuickLook(uri, options).launch();
        } catch (error) {
            console.error('Error launching ARQuickLook:', error);
            return Promise.reject(error);
        }
    }

    private async trySceneViewer(
        uri: string,
        options?: DIVEAROptions,
    ): Promise<void> {
        // actually we don't have to try here, because SceneViewer is supported on all devices by now.
        // if there are no AR services (ARCore) installed on the device, SceneViewer will only show the model in 3D.
        // we also have no options to detect if SceneViewer is supported.

        console.log('DIVE: Launching AR with SceneViewer ...');

        try {
            return new DIVESceneViewer(uri, options).launch();
        } catch (error) {
            console.error('Error launching SceneViewer:', error);
            return Promise.reject(error);
        }
    }
}
