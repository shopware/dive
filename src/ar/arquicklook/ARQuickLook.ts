import { type ARSystemOptions } from '../AR';
import { Converter } from '../../converter/Converter';
import { type USDZExporterOptions } from '../../types';

export class ARQuickLook {
    constructor(
        private readonly _uri: string,
        private readonly _options?: ARSystemOptions,
    ) {}

    public async launch(): Promise<void> {
        const usdzUrl = await this.convertToUSDZ();
        return this.launchARQuickLook(usdzUrl);
    }

    private async convertToUSDZ(): Promise<string> {
        // Convert the file to USDZ format
        const usdzBuffer = await Converter.convert(this._uri).to('usdz', {
            quickLookCompatible: true,
            ar: {
                anchoring: { type: 'plane' },
                planeAnchoring: {
                    alignment:
                        this._options?.arPlacement === 'vertical'
                            ? 'vertical'
                            : 'horizontal',
                },
            },
        } as USDZExporterOptions);

        // Create a blob from the USDZ buffer
        const blob = new Blob([usdzBuffer], { type: 'model/vnd.usdz+zip' });
        return URL.createObjectURL(blob);
    }

    private launchARQuickLook(uri: string): Promise<void> {
        return new Promise((resolve) => {
            if (this._options?.arScale === 'fixed') {
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
