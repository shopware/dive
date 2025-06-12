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
}
