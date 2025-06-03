import { SystemInfo, ESystem } from '@shopware-ag/dive/systeminfo';
import { ARDesktopPlatformError } from './error/ar-errors.ts';
import { ARQuickLook } from './arquicklook/ARQuickLook.ts';
import { SceneViewer } from './sceneviewer/SceneViewer.ts';

/**
 * Options for configuring the AR system behavior
 */
export type ARSystemOptions = {
    /** The placement orientation for AR content - either horizontal or vertical */
    arPlacement: 'horizontal' | 'vertical';
    /** The scaling behavior for AR content - either automatic or fixed */
    arScale: 'auto' | 'fixed';
};

/**
 * Main class for handling AR functionality across different platforms
 * Provides methods to launch AR experiences using platform-specific implementations
 */
export class ARSystem {
    /**
     * Launches an AR experience using the appropriate platform-specific implementation
     *
     * @param uri - The URI of the 3D model to display in AR
     * @param options - Optional configuration for the AR experience
     * @returns Promise that resolves when AR is launched successfully
     * @throws Error if AR is not supported on the current platform
     */
    public async launch(uri: string, options?: ARSystemOptions): Promise<void> {
        const system = SystemInfo.getSystem();

        if (system === ESystem.IOS) {
            return new ARQuickLook().launch(uri, options);
        }

        if (system === ESystem.ANDROID) {
            return new SceneViewer().launch(uri, options);
        }

        // Desktop platforms are not supported for AR
        return Promise.reject(new ARDesktopPlatformError());
    }
}
