import { type DIVEScene } from '../../scene/Scene';

type DIVESceneViewerOptions = {
    arPlacement: string;
    arScale: string;
};

export class DIVESceneViewer {
    public static Launch(
        scene: DIVEScene,
        options?: DIVESceneViewerOptions,
    ): Promise<void> {
        // find url in scene (first object found that has a set uri)
        const url = this.findSceneViewerSrc(scene);

        // launch SceneViewer
        this.launchSceneViewer(url, options);

        return Promise.resolve();
    }

    private static launchSceneViewer(
        url: string,
        options?: DIVESceneViewerOptions,
    ): void {
        const anchor = document.createElement('a');
        const noArViewerSigil = '#model-viewer-no-ar-fallback';
        // let isSceneViewerBlocked = false;

        const location = self.location.toString();
        const locationUrl = new URL(location);
        const modelUrl = new URL(url, location);
        if (modelUrl.hash) modelUrl.hash = '';
        const params = new URLSearchParams(modelUrl.search);

        locationUrl.hash = noArViewerSigil;

        // modelUrl can contain title/link/sound etc.
        params.set('mode', 'ar_only');
        if (options?.arScale === 'fixed') {
            params.set('resizable', 'false');
        }
        if (options?.arPlacement === 'wall') {
            params.set('enable_vertical_placement', 'true');
        }
        if (params.has('sound')) {
            const soundUrl = new URL(params.get('sound')!, location);
            params.set('sound', soundUrl.toString());
        }
        if (params.has('link')) {
            const linkUrl = new URL(params.get('link')!, location);
            params.set('link', linkUrl.toString());
        }

        const intent = `intent://arvr.google.com/scene-viewer/1.2?${
            params.toString() + '&file=' + modelUrl.toString()
        }#Intent;scheme=https;package=com.google.android.googlequicksearchbox;action=android.intent.action.VIEW;S.browser_fallback_url=${encodeURIComponent(
            locationUrl.toString(),
        )};end;`;

        const undoHashChange = (): void => {
            if (self.location.hash === noArViewerSigil) {
                // isSceneViewerBlocked = true;
                // The new history will be the current URL with a new hash.
                // Go back one step so that we reset to the expected URL.
                // NOTE(cdata): this should not invoke any browser-level navigation
                // because hash-only changes modify the URL in-place without
                // navigating:
                self.history.back();
                console.warn(
                    'Error while trying to present in AR with Scene Viewer',
                );
                console.warn('Falling back to next ar-mode');
                // this[$selectARMode]();
                // Would be nice to activateAR() here, but webXR fails due to not
                // seeing a user activation.
            }
        };

        self.addEventListener('hashchange', undoHashChange, { once: true });

        anchor.setAttribute('href', intent);
        console.log('Attempting to present in AR with Scene Viewer...');
        anchor.click();
    }

    private static findSceneViewerSrc(scene: DIVEScene): string {
        let uri: string | null = null;

        scene.traverse((object) => {
            if (uri) return;
            if (object.userData.uri) {
                uri = object.userData.uri;
            }
        });

        if (!uri) {
            throw new Error('No model found in scene');
        }

        return uri;
    }
}
