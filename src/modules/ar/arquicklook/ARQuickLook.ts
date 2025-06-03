import { type ARSystemOptions } from '../ARSystem.ts';
import { AssetConverter } from '@shopware-ag/dive/assetconverter';
import { AssetLoader } from '@shopware-ag/dive/assetloader';
import { AssetExporter } from '@shopware-ag/dive/assetexporter';
import {
    ARQuickLookNotSafariError,
    ARQuickLookVersionMismatchError,
    ARQuickLookUnknownError,
} from '../error/ar-errors.ts';
import { EBrowser, SystemInfo } from '@shopware-ag/dive/systeminfo';

const MIN_IOS_VERSION_FOR_AR_QUICK_LOOK = 12;

export class ARQuickLook {
    private converter = new AssetConverter(
        new AssetLoader(),
        new AssetExporter(),
    );

    /**
     * Launches AR using ARQuickLook (iOS-specific implementation)
     *
     * @param uri - The URI of the 3D model to display in AR
     * @param options - Optional configuration for the AR experience
     * @returns Promise that resolves when ARQuickLook is launched successfully
     * @throws Error if ARQuickLook is not supported on the device
     */
    public async launch(uri: string, options?: ARSystemOptions): Promise<void> {
        if (SystemInfo.getBrowser() !== EBrowser.SAFARI) {
            return Promise.reject(new ARQuickLookNotSafariError());
        }

        const iosVersionDetails = SystemInfo.getIOSVersion();
        if (
            iosVersionDetails &&
            iosVersionDetails.major < MIN_IOS_VERSION_FOR_AR_QUICK_LOOK
        ) {
            return Promise.reject(
                new ARQuickLookVersionMismatchError(
                    iosVersionDetails.full,
                    MIN_IOS_VERSION_FOR_AR_QUICK_LOOK,
                ),
            );
        } else if (!iosVersionDetails) {
            // This case might indicate an issue with UA parsing or it's not iOS,
            // though the SystemInfo.getSystem() check should ideally catch non-iOS earlier.
            // Consider if a specific error is needed here or if ARQuickLookUnknownError is sufficient.
            return Promise.reject(new ARQuickLookUnknownError()); // Or a more specific error like ARNotIOSDeviceError if that makes sense here
        }

        if (!SystemInfo.getSupportsARQuickLook()) {
            return Promise.reject(new ARQuickLookUnknownError());
        }

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
