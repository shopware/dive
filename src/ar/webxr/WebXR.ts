import { type DIVERenderer } from "../../renderer/Renderer";
import { type DIVEScene } from "../../scene/Scene";
import { Overlay } from "./overlay/Overlay";

export class DIVEWebXR {
    private static _currentSession: XRSession | null = null;
    private static _referenceSpaceType: XRReferenceSpaceType = 'viewer';
    private static _overlay: Overlay | null = null;
    private static _options = {
        requiredFeatures: ['local', 'hit-test'],
        optionalFeatures: ['light-estimation', 'local-floor', 'dom-overlay'],
        domOverlay: { root: {} as HTMLElement },
    };

    public static async Launch(renderer: DIVERenderer, scene: DIVEScene): Promise<void> {
        if (!navigator.xr) {
            console.error('WebXR not supported');
            return Promise.reject();
        }

        renderer.xr.enabled = true;
        scene.InitXR(renderer);

        // creating overlay
        if (!DIVEWebXR._overlay) {
            const overlay = new Overlay();
            DIVEWebXR._overlay = overlay;
        }
        DIVEWebXR._options.domOverlay = { root: DIVEWebXR._overlay.Element };

        // request session
        const session = await navigator.xr.requestSession('immersive-ar', this._options);
        session.addEventListener('end', () => {
            this._onSessionEnded();
        });

        DIVEWebXR._overlay.CloseButton.addEventListener('click', () => session.end());

        renderer.xr.setReferenceSpaceType(this._referenceSpaceType);

        await renderer.xr.setSession(session);

        DIVEWebXR._overlay.Element.style.display = '';
        this._currentSession = session;

        return Promise.resolve();
    }

    private static _onSessionEnded(): void {
        if (!this._currentSession) return;

        this._currentSession.removeEventListener('end', this._onSessionEnded);
        DIVEWebXR._overlay!.Element.style.display = 'none';
        this._currentSession = null;
    }
}