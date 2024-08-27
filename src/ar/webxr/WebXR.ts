import { type Vector3 } from "three";
import DIVEOrbitControls from "../../controls/OrbitControls";
import { type DIVERenderer } from "../../renderer/Renderer";
import { type DIVEScene } from "../../scene/Scene";
import { Overlay } from "./overlay/Overlay";
import { DIVEWebXRRaycaster } from "./raycaster/WebXRRaycaster";

export class DIVEWebXR {
    private static _renderer: DIVERenderer;
    private static _scene: DIVEScene;
    private static _controller: DIVEOrbitControls;

    // camera reset values
    private static _cameraPosition: Vector3;
    private static _cameraTarget: Vector3;

    private static _renderCallbackId: string | null = null;

    private static _currentSession: XRSession | null = null;
    private static _referenceSpaceType: XRReferenceSpaceType = 'viewer';
    private static _overlay: Overlay | null = null;
    private static _options = {
        requiredFeatures: ['local', 'hit-test'],
        optionalFeatures: ['light-estimation', 'local-floor', 'dom-overlay'],
        domOverlay: { root: {} as HTMLElement },
    };
    private static _raycaster: DIVEWebXRRaycaster | null = null;

    public static async Launch(renderer: DIVERenderer, scene: DIVEScene, controller: DIVEOrbitControls): Promise<void> {
        this._renderer = renderer;
        this._scene = scene;
        this._controller = controller;

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

        if (this._raycaster) {
            this._raycaster.Update(frame);
        }
    }

    public static End(): void {
        if (!this._currentSession) return;
        this._currentSession.end();
    }

    private static async _onSessionStarted(): Promise<void> {
        if (!this._currentSession) return;
        console.log('Session started', this._currentSession);

        // initialize raycaster
        this._raycaster = await new DIVEWebXRRaycaster(this._currentSession, this._renderer, ['plane']).Init();

        // check if successful
        if (!this._raycaster) {
            console.error('Raycaster not initialized successfully. Aborting WebXR...');
            this.End();
            return Promise.reject();
        }

        console.log('raycaster created', this._raycaster);

        // add subscriptions
        this._raycaster.Subscribe('HIT_FOUND', (payload) => {
            this.onHitFound(payload.hit);
        });

        this._raycaster.Subscribe('HIT_LOST', () => {
            this.onHitLost();
        });

        // add update callback to render loop
        this._renderCallbackId = this._renderer.AddPreRenderCallback((time: DOMHighResTimeStamp, frame: XRFrame) => {
            this.Update(time, frame);
        });

        return Promise.resolve();
    }

    private static _onSessionEnded(): void {
        if (!this._currentSession) return;

        if (this._raycaster) {
            this._raycaster.Dispose();
        }

        if (this._renderCallbackId) {
            this._renderer.RemovePreRenderCallback(this._renderCallbackId);
            this._renderCallbackId = null;
        }

        this._renderer.xr.enabled = false;

        // resize renderer
        const canvasWrapper = this._renderer.domElement.parentElement;
        if (!canvasWrapper) return;

        const { clientWidth, clientHeight } = canvasWrapper;
        this._renderer.OnResize(clientWidth, clientHeight);

        // reset camera
        this._controller.object.OnResize(clientWidth, clientHeight);
        this._controller.object.position.copy(this._cameraPosition);
        this._controller.target.copy(this._cameraTarget);

        // reset camera values
        this._cameraPosition.set(0, 0, 0);
        this._cameraTarget.set(0, 0, 0);

        // dispose scene
        this._scene.DisposeXR();

        this._currentSession.removeEventListener('end', this._onSessionEnded);
        DIVEWebXR._overlay!.Element.style.display = 'none';
        this._currentSession = null;
    }

    private static onHitFound(hit: XRHitTestResult): void {
        console.log('hit found', hit);

        // this.reticle.visible = true;
        // this.reticle.matrix.fromArray(pose.transform.matrix);
    }

    private static onHitLost(): void {
        console.log('hit lost');

        // this.reticle.visible = false;
    }
}