import { type DIVEScene } from '../../scene/Scene';
import { type DIVEAROptions } from '../AR';
import { Converter } from '../../converter/Converter';
import { type USDZExporterOptions } from '../../types';

export class DIVEARQuickLook {
    public static async launch(
        uri: string,
        options?: DIVEAROptions,
    ): Promise<void> {
        const usdzUrl = await this.convertToUSDZ(uri, options);
        return this.launchARQuickLook(usdzUrl, options);
    }

    public static async launchFromScene(
        scene: DIVEScene,
        options?: DIVEAROptions,
    ): Promise<void> {
        const url = this.findARQuickLookSrc(scene);
        return this.launch(url, options);
    }

    private static async convertToUSDZ(
        uri: string,
        options?: DIVEAROptions,
    ): Promise<string> {
        // Convert the file to USDZ format
        const usdzBuffer = await Converter.convert(uri).to('usdz', {
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
        } as USDZExporterOptions);

        // Create a blob from the USDZ buffer
        const blob = new Blob([usdzBuffer], { type: 'model/vnd.usdz+zip' });
        return URL.createObjectURL(blob);
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
}
