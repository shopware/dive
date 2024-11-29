import { Vector3 } from "three";
import DIVEOrbitControls from "../../controls/OrbitControls";
import { type DIVERenderer } from "../../renderer/Renderer";
import { type DIVEScene } from "../../scene/Scene";
import { Overlay } from "./overlay/Overlay";
import { DIVEWebXRController } from "./controller/WebXRController";

export class DIVEWebXR {
    // general members
    private static _renderer: DIVERenderer;
    private static _scene: DIVEScene;
    private static _controller: DIVEOrbitControls;

    // camera reset members
    private static _cameraPosition: Vector3;
    private static _cameraTarget: Vector3;

    // render loop members
    private static _renderCallbackId: string | null = null;

    // setup members
    private static _currentSession: XRSession | null = null;
    private static _referenceSpaceType: XRReferenceSpaceType = 'local';
    private static _overlay: Overlay | null = null;
    private static _options = {
        requiredFeatures: ['local', 'hit-test'],
        optionalFeatures: ['light-estimation', 'local-floor', 'dom-overlay', 'depth-sensing'],
        depthSensing: { usagePreference: ['gpu-optimized'], dataFormatPreference: [] },
        domOverlay: { root: {} as HTMLElement },
    };

    private static _xrController: DIVEWebXRController | null = null;

    public static async Launch(renderer: DIVERenderer, scene: DIVEScene, controller: DIVEOrbitControls): Promise<void> {
        this._renderer = renderer;
        this._scene = scene;
        this._controller = controller;

        // setting camera reset values
        this._cameraPosition = this._controller.object.position.clone();
        this._cameraTarget = this._controller.target.clone();

        if (!navigator.xr) {
            console.error('WebXR not supported');
            return Promise.reject();
        }

        // setup current instance
        this._renderer.xr.enabled = true;
        this._scene.InitXR(renderer);

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

        // build up session
        renderer.xr.setReferenceSpaceType(this._referenceSpaceType);
        await renderer.xr.setSession(session);
        DIVEWebXR._overlay.Element.style.display = '';
        this._currentSession = session;

        // add end session event listener
        DIVEWebXR._overlay.CloseButton.addEventListener('click', () => this.End());

        // start session
        await this._onSessionStarted();

        return Promise.resolve();
    }

    public static Update(_time: DOMHighResTimeStamp, frame: XRFrame): void {
        if (!this._currentSession) return;

        if (this._xrController) {
            this._xrController.Update(frame);
        }
    }

    public static End(): void {
        if (!this._currentSession) return;
        this._currentSession.end();
    }

    private static async _onSessionStarted(): Promise<void> {
        if (!this._currentSession) return;

        // add update callback to render loop
        this._renderCallbackId = this._renderer.AddPreRenderCallback((time: DOMHighResTimeStamp, frame: XRFrame) => {
            this.Update(time, frame);
        });

        this._xrController = new DIVEWebXRController(this._currentSession, this._renderer, this._scene);
        await this._xrController.Init().catch(() => {
            this.End();
        });

        return Promise.resolve();
    }

    private static _onSessionEnded(): void {
        if (!this._currentSession) return;

        if (this._xrController) {
            this._xrController.Dispose();
        }

        // remove Update() callback
        if (this._renderCallbackId) {
            this._renderer.RemovePreRenderCallback(this._renderCallbackId);
            this._renderCallbackId = null;
        }

        // disable XR on renderer to restore canvas rendering
        this._renderer.xr.enabled = false;

        // resize renderer
        const canvasWrapper = this._renderer.domElement.parentElement;
        if (canvasWrapper) {
            const { clientWidth, clientHeight } = canvasWrapper;
            this._renderer.OnResize(clientWidth, clientHeight);

            // resize camera
            this._controller.object.OnResize(clientWidth, clientHeight);
        }

        // reset camera
        this._controller.object.position.copy(this._cameraPosition);
        this._controller.target.copy(this._cameraTarget);

        // reset camera values
        this._cameraPosition.set(0, 0, 0);
        this._cameraTarget.set(0, 0, 0);

        // dispose xr scene
        this._scene.DisposeXR();

        this._currentSession.removeEventListener('end', this._onSessionEnded);
        DIVEWebXR._overlay!.Element.style.display = 'none';
        this._currentSession = null;
    }
}