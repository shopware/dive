import { Object3D } from 'three';
import { DIVEUSDZExporter } from '../../exporters/usdz/USDZExporter';
import { type DIVEScene } from '../../scene/Scene';
import { type DIVEAROptions } from '../AR';

export class DIVEARQuickLook {
    private static _usdzExporter: DIVEUSDZExporter = new DIVEUSDZExporter();

    public static Launch(
        scene: DIVEScene,
        options?: DIVEAROptions,
    ): Promise<void> {
        // create node to build usdz from
        const quickLookScene = new Object3D();

        // extract models from scene
        const rootCopy = scene.Root.clone(true);

        quickLookScene.add(...rootCopy.children);

        // launch ARQuickLook
        return this.launchARFromNode(quickLookScene, options);
    }

    private static extractModels(scene: DIVEScene): Object3D[] {
        // extract models
        return scene.Root.children;
    }

    private static launchARFromNode(
        node: Object3D,
        options?: DIVEAROptions,
    ): Promise<void> {
        // bundle USDZ
        return this._usdzExporter
            .parse(node, {
                quickLookCompatible: true,
                ar: {
                    anchoring: { type: 'plane' },
                    planeAnchoring: {
                        alignment:
                            options?.arPlacement === 'vertical'
                                ? 'vertical'
                                : 'horizontal',
                    },
                },
            })
            .then((usdz: Uint8Array) => {
                // create blob
                const blob = new Blob([usdz], { type: 'model/vnd.usdz+zip' });
                let url = URL.createObjectURL(blob);

                if (options?.arScale === 'fixed') {
                    url = url.concat('#allowsContentScaling=0');
                }

                // launch ARQuickLook
                const a = document.createElement('a');
                a.innerHTML = '<picture></picture>'; // This is actually needed so the viewer opens instantly
                a.rel = 'ar';
                a.href = url;
                a.download = 'scene.usdz';
                a.click();
            });
    }
}
