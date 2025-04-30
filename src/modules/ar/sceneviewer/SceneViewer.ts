import { type ARSystemOptions } from '../ARSystem.ts';

export class SceneViewer {
    public launch(uri: string, options?: ARSystemOptions): void {
        const location = self.location.toString();
        const anchor = document.createElement('a');
        const params = this._createParams(location, uri, options);
        const intent = this._createIntent(location, uri, params);

        anchor.setAttribute('href', intent);
        anchor.click();
    }

    /**
     * Creates the base URL parameters for SceneViewer
     * @param location Current page location URL
     * @returns URLSearchParams with base configuration
     */
    private _createParams(
        location: string,
        uri: string,
        options?: ARSystemOptions,
    ): URLSearchParams {
        const modelUrl = new URL(uri, location);
        const params = new URLSearchParams(modelUrl.search);

        // Set AR mode as preferred
        params.set('mode', 'ar_preferred');

        // Apply any custom options
        this._applyScaleOption(params, options);
        this._applyPlacementOption(params, options);

        // Apply additional parameters if present
        this._applySoundOption(params, location);
        this._applyLinkOption(params, location);

        return params;
    }

    /**
     * Applies the scale option to the parameters
     * If scale is set to 'fixed', the model will not be resizable in AR
     * @param params URLSearchParams to modify
     */
    private _applyScaleOption(
        params: URLSearchParams,
        options?: ARSystemOptions,
    ): void {
        if (options?.arScale === 'fixed') {
            params.set('resizable', 'false');
        }
    }

    /**
     * Applies the placement option to the parameters
     * If placement is set to 'vertical', vertical placement will be enabled
     * @param params URLSearchParams to modify
     */
    private _applyPlacementOption(
        params: URLSearchParams,
        options?: ARSystemOptions,
    ): void {
        if (options?.arPlacement === 'vertical') {
            params.set('enable_vertical_placement', 'true');
        }
    }

    /**
     * Applies the sound option to the parameters if present
     * This will resolve any relative sound URLs to absolute URLs
     * @param params URLSearchParams to modify
     * @param location Current page location URL
     */
    private _applySoundOption(params: URLSearchParams, location: string): void {
        if (params.has('sound')) {
            const soundUrl = new URL(params.get('sound')!, location);
            params.set('sound', soundUrl.toString());
        }
    }

    /**
     * Applies the link option to the parameters if present
     * This will resolve any relative link URLs to absolute URLs
     * @param params URLSearchParams to modify
     * @param location Current page location URL
     */
    private _applyLinkOption(params: URLSearchParams, location: string): void {
        if (params.has('link')) {
            const linkUrl = new URL(params.get('link')!, location);
            params.set('link', linkUrl.toString());
        }
    }

    /**
     * Creates the Android Intent URL for SceneViewer
     * @param params URLSearchParams containing all configuration
     * @param location Current page location URL
     * @returns The complete Intent URL
     */
    private _createIntent(
        location: string,
        uri: string,
        params: URLSearchParams,
    ): string {
        const locationUrl = new URL(location);
        const modelUrl = new URL(uri, location);
        const noArViewerSigil = '#model-viewer-no-ar-fallback';

        locationUrl.hash = noArViewerSigil;

        // Construct the intent URL with all parameters
        return `intent://arvr.google.com/scene-viewer/1.2?${
            params.toString() + '&file=' + modelUrl.toString()
        }#Intent;scheme=https;package=com.google.android.googlequicksearchbox;action=android.intent.action.VIEW;S.browser_fallback_url=${encodeURIComponent(
            locationUrl.toString(),
        )};end;`;
    }
}
