import { type DIVERenderer } from "../../renderer/Renderer";
import { CloseButton } from "./closebutton/CloseButton";

export class DIVEWebXR {
    private static _currentSession: XRSession | null = null;
    private static _referenceSpaceType: XRReferenceSpaceType = 'viewer';
    private static _options = {
        requiredFeatures: ['hit-test'],
        optionalFeatures: ['dom-overlay'],
        domOverlay: { root: CloseButton.Create(this._currentSession, false) },
    };

    public static async Launch(renderer: DIVERenderer): Promise<void> {
        if (!navigator.xr) {
            console.error('WebXR not supported');
            return Promise.reject();
        }

        renderer.xr.enabled = true;

        // request session
        const session = await navigator.xr.requestSession('immersive-ar', this._options);
        session.addEventListener('end', this._onSessionEnded);

        renderer.xr.setReferenceSpaceType(this._referenceSpaceType);

        await renderer.xr.setSession(session);

        this._options.domOverlay.root.style.display = '';
        this._currentSession = session;

        return Promise.resolve();
    }

    private static _onSessionEnded(): void {
        if (!this._currentSession) return;

        this._currentSession.removeEventListener('end', this._onSessionEnded);
        this._options.domOverlay.root.style.display = 'none';
        this._currentSession = null;
    }
}