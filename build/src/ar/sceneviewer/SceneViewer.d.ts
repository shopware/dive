import { ARSystemOptions } from '../AR';
export declare class SceneViewer {
    launch(uri: string, options?: ARSystemOptions): void;
    /**
     * Creates the base URL parameters for SceneViewer
     * @param location Current page location URL
     * @returns URLSearchParams with base configuration
     */
    private _createParams;
    /**
     * Applies the scale option to the parameters
     * If scale is set to 'fixed', the model will not be resizable in AR
     * @param params URLSearchParams to modify
     */
    private _applyScaleOption;
    /**
     * Applies the placement option to the parameters
     * If placement is set to 'vertical', vertical placement will be enabled
     * @param params URLSearchParams to modify
     */
    private _applyPlacementOption;
    /**
     * Applies the sound option to the parameters if present
     * This will resolve any relative sound URLs to absolute URLs
     * @param params URLSearchParams to modify
     * @param location Current page location URL
     */
    private _applySoundOption;
    /**
     * Applies the link option to the parameters if present
     * This will resolve any relative link URLs to absolute URLs
     * @param params URLSearchParams to modify
     * @param location Current page location URL
     */
    private _applyLinkOption;
    /**
     * Creates the Android Intent URL for SceneViewer
     * @param params URLSearchParams containing all configuration
     * @param location Current page location URL
     * @returns The complete Intent URL
     */
    private _createIntent;
}
