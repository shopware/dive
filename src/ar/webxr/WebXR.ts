import DIVEOrbitControls from "../../controls/OrbitControls";
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

    public static async Launch(renderer: DIVERenderer, scene: DIVEScene, controller: DIVEOrbitControls): Promise<void> {
        if (!navigator.xr) {
            console.error('WebXR not supported');
            return Promise.reject();
        }

        // setup current instance
        renderer.xr.enabled = true;
        scene.InitXR(renderer);

        // creating overlay
        if (!DIVEWebXR._overlay) {
            const overlay = new Overlay();
            DIVEWebXR._overlay = overlay;
        }
        DIVEWebXR._options.domOverlay = { root: DIVEWebXR._overlay.Element };

        const camPos = controller.object.position.clone();
        const camTarget = controller.target.clone();

        // request session
        const session = await navigator.xr.requestSession('immersive-ar', this._options);
        session.addEventListener('end', () => {
            this._onSessionEnded();
            renderer.xr.enabled = false;

            // resize renderer
            const canvasWrapper = renderer.domElement.parentElement;
            if (!canvasWrapper) return;

            const { clientWidth, clientHeight } = canvasWrapper;
            renderer.OnResize(clientWidth, clientHeight);

            // reset camera
            controller.object.OnResize(clientWidth, clientHeight);
            controller.object.position.copy(camPos);
            controller.target.copy(camTarget);

            // dispose scene
            scene.DisposeXR();
        });

        // add end session event listener
        DIVEWebXR._overlay.CloseButton.addEventListener('click', () => session.end());

        console.log('Session started', this._currentSession);

        // build up session
        renderer.xr.setReferenceSpaceType(this._referenceSpaceType);
        await renderer.xr.setSession(session);
        DIVEWebXR._overlay.Element.style.display = '';
        this._currentSession = session;

        // start session
        this._onSessionStarted();

        return Promise.resolve();
    }

    private static _onSessionStarted(): void {
        console.log('Session started', this._currentSession);
        if (!this._currentSession) return;

    }

    private static _onSessionEnded(): void {
        if (!this._currentSession) return;

        this._currentSession.removeEventListener('end', this._onSessionEnded);
        DIVEWebXR._overlay!.Element.style.display = 'none';
        this._currentSession = null;
    }
}