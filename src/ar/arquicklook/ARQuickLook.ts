import { type DIVEScene } from '../../scene/Scene';
import { type DIVEAROptions } from '../AR';

export class DIVEARQuickLook {
    public static Launch(
        scene: DIVEScene,
        options?: DIVEAROptions,
    ): Promise<void> {
        const url = this.findARQuickLookSrc(scene);

        // launch ARQuickLook
        return this.launchARQuickLook(url, options);
    }

    private static launchARQuickLook(
        uri: string,
        options?: DIVEAROptions,
    ): Promise<void> {
        return new Promise((resolve) => {
            if (options?.arScale === 'fixed') {
                uri = uri.concat('#allowsContentScaling=0');
            }

            // launch ARQuickLook
            const a = document.createElement('a');
            a.innerHTML = '<picture></picture>'; // This is actually needed so the viewer opens instantly
            a.rel = 'ar';
            a.href = uri;
            a.download = 'scene.usdz';
            resolve();
            a.click();
        });
    }

    private static findARQuickLookSrc(scene: DIVEScene): string {
        let uri: string | null = null;

        scene.traverse((object) => {
            if (uri) return;
            if (object.userData.uri) {
                uri = object.userData.uri;
            }
        });

        if (!uri) {
            throw new Error('No model found in scene');
        }

        return uri;
    }

    // private static extractModels(scene: DIVEScene): Object3D[] {
    //     // extract models
    //     return scene.Root.children;
    // }

    // private static launchARFromNode(
    //     node: Object3D,
    //     options?: DIVEAROptions,
    // ): Promise<void> {
    //     // bundle USDZ
    //     return this._usdzExporter
    //         .parse(node, {
    //             quickLookCompatible: true,
    //             ar: {
    //                 anchoring: { type: 'plane' },
    //                 planeAnchoring: {
    //                     alignment:
    //                         options?.arPlacement === 'vertical'
    //                             ? 'vertical'
    //                             : 'horizontal',
    //                 },
    //             },
    //         })
    //         .then((usdz: Uint8Array) => {
    //             // create blob
    //             const blob = new Blob([usdz], { type: 'model/vnd.usdz+zip' });
    //             let url = URL.createObjectURL(blob);

    //             if (options?.arScale === 'fixed') {
    //                 url = url.concat('#allowsContentScaling=0');
    //             }

    //             // launch ARQuickLook
    //             const a = document.createElement('a');
    //             a.innerHTML = '<picture></picture>'; // This is actually needed so the viewer opens instantly
    //             a.rel = 'ar';
    //             a.href = url;
    //             a.download = 'scene.usdz';
    //             a.click();
    //         });
    // }
}
