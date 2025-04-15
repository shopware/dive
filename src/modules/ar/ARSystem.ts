import { SystemInfo } from '../systeminfo/SystemInfo';
import { ARCompatibilityError } from '../../error';
import { ESystem } from '../../types/info';
import { ARQuickLook } from './arquicklook/ARQuickLook';
import { SceneViewer } from './sceneviewer/SceneViewer';

declare global {
    interface ModuleClasses {
        ARSystem: typeof ARSystem;
    }
}

/**
 * @module ARSystem
 *
 * The AR module enables Augmented Reality features across different platforms:
 *
 * ```ts
 * import { ARSystem } from '@shopware-ag/dive/modules/ar';
 * const arSystem = new ARSystem();
 *
 * // Launch AR with options
 * await arSystem.launch('path/to/model.glb', {
 *     arPlacement: 'horizontal', // or 'vertical'
 *     arScale: 'auto' // or 'fixed'
 * });
 * ```
 *
 * Features:
 * - Platform-specific AR implementations (ARQuickLook for iOS, SceneViewer for Android)
 * - Automatic format conversion for AR compatibility
 * - Configurable placement and scaling options
 */

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
            return this.tryARQuickLook(uri, options);
        }

        if (system === ESystem.ANDROID) {
            return this.trySceneViewer(uri, options);
        }

        return Promise.reject(
            new ARCompatibilityError(
                'AR not supported on non-mobile systems',
                window.navigator.userAgent,
                window.navigator.platform,
                window.navigator.vendor,
            ),
        );
    }

    /**
     * Attempts to launch AR using ARQuickLook (iOS-specific implementation)
     *
     * @param uri - The URI of the 3D model to display in AR
     * @param options - Optional configuration for the AR experience
     * @returns Promise that resolves when ARQuickLook is launched successfully
     * @throws Error if ARQuickLook is not supported on the device
     */
    private async tryARQuickLook(
        uri: string,
        options?: ARSystemOptions,
    ): Promise<void> {
        try {
            SystemInfo.getSupportsARQuickLook();
        } catch (error) {
            return Promise.reject(error);
        }

        return new ARQuickLook().launch(uri, options);
    }

    /**
     * Launches AR using SceneViewer (Android-specific implementation)
     * Note: SceneViewer is supported on all Android devices. If ARCore is not installed,
     * the model will be displayed in 3D view mode instead of AR mode.
     *
     * @param uri - The URI of the 3D model to display in AR
     * @param options - Optional configuration for the AR experience
     * @returns Promise that resolves when SceneViewer is launched successfully
     * @throws Error if there's an issue launching SceneViewer
     */
    private async trySceneViewer(
        uri: string,
        options?: ARSystemOptions,
    ): Promise<void> {
        try {
            return new SceneViewer().launch(uri, options);
        } catch (error) {
            return Promise.reject(error);
        }
    }
}
