import { SystemInfo } from '../info/Info';
import { ESystem } from '../types/info';
import { ARQuickLook } from './arquicklook/ARQuickLook';
import { SceneViewer } from './sceneviewer/SceneViewer';

export type ARSystemOptions = {
    arPlacement: 'horizontal' | 'vertical';
    arScale: 'auto' | 'fixed';
};

export class ARSystem {
    public async launch(uri: string, options?: ARSystemOptions): Promise<void> {
        const system = SystemInfo.GetSystem();

        if (system === ESystem.IOS) {
            return this.tryARQuickLook(uri, options);
        }

        if (system === ESystem.ANDROID) {
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
        options?: ARSystemOptions,
    ): Promise<void> {
        const support = SystemInfo.GetSupportsARQuickLook();
        if (!support) {
            console.log('ARQuickLook not supported');
            return Promise.reject(new Error('ARQuickLook not supported'));
        }

        console.log('DIVE: Launching AR with ARQuickLook ...');

        try {
            return new ARQuickLook(uri, options).launch();
        } catch (error) {
            console.error('Error launching ARQuickLook:', error);
            return Promise.reject(error);
        }
    }

    private async trySceneViewer(
        uri: string,
        options?: ARSystemOptions,
    ): Promise<void> {
        // actually we don't have to try here, because SceneViewer is supported on all devices by now.
        // if there are no AR services (ARCore) installed on the device, SceneViewer will only show the model in 3D.
        // we also have no options to detect if SceneViewer is supported.

        console.log('DIVE: Launching AR with SceneViewer ...');

        try {
            return new SceneViewer(uri, options).launch();
        } catch (error) {
            console.error('Error launching SceneViewer:', error);
            return Promise.reject(error);
        }
    }
}
