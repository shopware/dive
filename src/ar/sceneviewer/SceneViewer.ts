import { type DIVEScene } from '../../scene/Scene';
import { type DIVEAROptions } from '../AR';

export class DIVESceneViewer {
    public static Launch(scene: DIVEScene, options?: DIVEAROptions): void {
        // find url in scene (first object found that has a set uri)
        const url = this.findSceneViewerSrc(scene);

        // launch SceneViewer
        this.launchSceneViewer(url, options);
    }

    private static launchSceneViewer(
        url: string,
        options?: DIVEAROptions,
    ): void {
        const anchor = document.createElement('a');
        const noArViewerSigil = '#model-viewer-no-ar-fallback';

        const location = self.location.toString();
        const locationUrl = new URL(location);
        const modelUrl = new URL(url, location);
        const params = new URLSearchParams(modelUrl.search);

        locationUrl.hash = noArViewerSigil;

        // modelUrl can contain title/link/sound etc.
        params.set('mode', 'ar_only');

        if (options?.arScale === 'fixed') {
            params.set('resizable', 'false');
        }

        if (options?.arPlacement === 'vertical') {
            params.set('enable_vertical_placement', 'true');
        }

        // will be added later if needed
        // if (params.has('sound')) {
        //     const soundUrl = new URL(params.get('sound')!, location);
        //     params.set('sound', soundUrl.toString());
        // }
        // if (params.has('link')) {
        //     const linkUrl = new URL(params.get('link')!, location);
        //     params.set('link', linkUrl.toString());
        // }

        const intent = `intent://arvr.google.com/scene-viewer/1.2?${
            params.toString() + '&file=' + modelUrl.toString()
        }#Intent;scheme=https;package=com.google.android.googlequicksearchbox;action=android.intent.action.VIEW;S.browser_fallback_url=${encodeURIComponent(
            locationUrl.toString(),
        )};end;`;

        anchor.setAttribute('href', intent);
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
