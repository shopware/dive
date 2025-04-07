import { type ARSystemOptions } from '../ARSystem';
import { AssetConverter } from '../../asset/converter/AssetConverter';
import { AssetLoader } from '../../asset/loader/AssetLoader';
import { AssetExporter } from '../../asset/exporter/AssetExporter';

export class ARQuickLook {
    private converter = new AssetConverter(
        new AssetLoader(),
        new AssetExporter(),
    );

    public async launch(uri: string, options?: ARSystemOptions): Promise<void> {
        const usdzUrl = await this.convertToUSDZ(uri, options);
        return this.launchARQuickLook(usdzUrl, options);
    }

    private async convertToUSDZ(
        uri: string,
        options?: ARSystemOptions,
    ): Promise<string> {
        // Convert the file to USDZ format
        const usdzBuffer = await this.converter.convert(uri).to('usdz', {
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
        });

        // Create a blob from the USDZ buffer
        const blob = new Blob([usdzBuffer], { type: 'model/vnd.usdz+zip' });
        return URL.createObjectURL(blob);
    }

    private launchARQuickLook(
        uri: string,
        options?: ARSystemOptions,
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
