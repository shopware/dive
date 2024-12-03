import { DIVEInfo, WebXRUnsupportedReason } from '../info/Info';
import { DIVEARQuickLook } from './arquicklook/ARQuickLook';
import { DIVEWebXR } from './webxr/WebXR';
import { type DIVEScene } from '../scene/Scene';
import { type DIVERenderer } from '../renderer/Renderer';
import DIVEOrbitControls from '../controls/OrbitControls';

export class DIVEAR {
    private _renderer: DIVERenderer;
    private _scene: DIVEScene;
    private _controller: DIVEOrbitControls;

    private arPlacement: string = 'floor';
    private arScale: string = 'auto';

    constructor(
        renderer: DIVERenderer,
        scene: DIVEScene,
        controller: DIVEOrbitControls,
    ) {
        this._renderer = renderer;
        this._scene = scene;
        this._controller = controller;
    }

    public async Launch(): Promise<void> {
        const system = DIVEInfo.GetSystem();

        if (system === 'iOS') {
            const support = DIVEInfo.GetSupportsARQuickLook();
            if (!support) {
                console.log('ARQuickLook not supported');
                return Promise.reject();
            }

            console.log('Launching AR on iOS');

            // Launch ARQuickLook
            await DIVEARQuickLook.Launch(this._scene);
            return Promise.resolve();
        }

        if (system === 'Android') {
            this.openSceneViewer();
            return;

            const support = await DIVEInfo.GetSupportsWebXR();
            if (!support) {
                console.log(
                    'WebXR not supported. Reason: ' +
                        WebXRUnsupportedReason[
                            DIVEInfo.GetWebXRUnsupportedReason()!
                        ],
                );
                return Promise.reject();
            }

            console.log('Launching AR on Android');
            // Launch WebXR
            await DIVEWebXR.Launch(
                this._renderer,
                this._scene,
                this._controller,
            );
            return Promise.resolve();
        }

        console.log(
            'AR not supported. Not a mobile system. (System is ' + system + ')',
        );
    }

    private openSceneViewer(): void {
        const src = this.createSceneViewerSrc();
        const anchor = document.createElement('a');
        const noArViewerSigil = '#model-viewer-no-ar-fallback';
        // let isSceneViewerBlocked = false;

        const location = self.location.toString();
        const locationUrl = new URL(location);
        const modelUrl = new URL(src, location);
        if (modelUrl.hash) modelUrl.hash = '';
        const params = new URLSearchParams(modelUrl.search);

        locationUrl.hash = noArViewerSigil;

        // modelUrl can contain title/link/sound etc.
        params.set('mode', 'ar_preferred');
        if (!params.has('disable_occlusion')) {
            params.set('disable_occlusion', 'true');
        }
        if (this.arScale === 'fixed') {
            params.set('resizable', 'false');
        }
        if (this.arPlacement === 'wall') {
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

        console.log('modelUrl.toString()', modelUrl.toString());
        console.log(
            'encodeURIComponent(modelUrl.toString())',
            encodeURIComponent(modelUrl.toString()),
        );

        const intent = `intent://arvr.google.com/scene-viewer/1.0?${
            params.toString() + '&file=' + modelUrl.toString()
        }#Intent;scheme=https;package=com.google.android.googlequicksearchbox;action=android.intent.action.VIEW;S.browser_fallback_url=${encodeURIComponent(
            locationUrl.toString(),
        )};end;`;
        // intent =
        //     'intent://arvr.google.com/scene-viewer/1.0?file=https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/Avocado/glTF/Avocado.gltf#Intent;scheme=https;package=com.google.android.googlequicksearchbox;action=android.intent.action.VIEW;S.browser_fallback_url=https://developers.google.com/ar;end;';
        console.log({ intent });

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

    private createSceneViewerSrc(): string {
        let uri: string | null = null;

        this._scene.traverse((object) => {
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
