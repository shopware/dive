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
 * import { ARSystem } from '@shopware-ag/dive/modules/ARSystem';
 *
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
export declare class ARSystem {
    /**
     * Launches an AR experience using the appropriate platform-specific implementation
     *
     * @param uri - The URI of the 3D model to display in AR
     * @param options - Optional configuration for the AR experience
     * @returns Promise that resolves when AR is launched successfully
     * @throws Error if AR is not supported on the current platform
     */
    launch(uri: string, options?: ARSystemOptions): Promise<void>;
    /**
     * Attempts to launch AR using ARQuickLook (iOS-specific implementation)
     *
     * @param uri - The URI of the 3D model to display in AR
     * @param options - Optional configuration for the AR experience
     * @returns Promise that resolves when ARQuickLook is launched successfully
     * @throws Error if ARQuickLook is not supported on the device
     */
    private tryARQuickLook;
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
    private trySceneViewer;
}
