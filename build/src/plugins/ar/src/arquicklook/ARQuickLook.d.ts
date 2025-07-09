import { ARSystemOptions } from '../ARSystem.ts';
export declare class ARQuickLook {
    private converter;
    /**
     * Launches AR using ARQuickLook (iOS-specific implementation)
     *
     * @param uri - The URI of the 3D model to display in AR
     * @param options - Optional configuration for the AR experience
     * @returns Promise that resolves when ARQuickLook is launched successfully
     * @throws Error if ARQuickLook is not supported on the device
     */
    launch(uri: string, options?: ARSystemOptions): Promise<void>;
    private convertToUSDZ;
    private launchARQuickLook;
}
