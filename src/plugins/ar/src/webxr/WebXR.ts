import { Vector3 } from 'three/webgpu';
import { OrbitController } from '@shopware-ag/dive/orbitcontroller';
import { type DIVERenderer, type DIVEScene, DIVE } from '@shopware-ag/dive';
import { Overlay } from './overlay/Overlay.ts';
import { DIVEWebXRController } from './controller/WebXRController.ts';

export class DIVEWebXR {
    // general members
    private static _renderer: DIVERenderer;
    private static _scene: DIVEScene;
    private static _controller: OrbitController;

    // camera reset members
    private static _cameraPosition: Vector3;
    private static _cameraTarget: Vector3;

    // render loop members
    private static _renderCallbackId: string | null = null;

    // setup members
    private static _session: XRSession | null = null;
    private static _referenceSpaceType: XRReferenceSpaceType = 'local';
    private static _overlay: Overlay | null = null;
    private static _options: XRSessionInit = {
        requiredFeatures: [
            'local',
            'hit-test',
        ],
        optionalFeatures: [
            'light-estimation',
            'local-floor',
            'dom-overlay',
            'depth-sensing',
        ],
        depthSensing: {
            usagePreference: ['gpu-optimized'],
            dataFormatPreference: [] as XRDepthDataFormat[],
        },
        domOverlay: { root: {} as HTMLElement },
    };

    private static _xrController: DIVEWebXRController | null = null;

    public static async Launch(
        engine: DIVE,
        controller: OrbitController,
    ): Promise<void> {
        this._renderer = engine.mainView.renderer;
        this._scene = engine.scene;
        this._controller = controller;

        // setting camera reset values
        this._cameraPosition = this._controller.object.position.clone();
        this._cameraTarget = this._controller.target.clone();

        if (!navigator.xr) {
            console.error('WebXR not supported');
            return Promise.reject();
        }

        // setup current instance
        this._renderer.webgpurenderer.xr.enabled = true;
        // this._scene.InitXR(renderer);

        // creating overlay
        if (!DIVEWebXR._overlay) {
            const overlay = new Overlay();
            DIVEWebXR._overlay = overlay;
        }
        DIVEWebXR._options.domOverlay = { root: DIVEWebXR._overlay.element };

        // request session
        const session = await navigator.xr
            .requestSession('immersive-ar', this._options)
            .catch((reason) => {
                return Promise.reject(reason);
            });
        session.addEventListener('end', () => {
            this._onSessionEnded();
        });

        // build up session
        this._renderer.webgpurenderer.xr.setReferenceSpaceType(
            this._referenceSpaceType,
        );
        await this._renderer.webgpurenderer.xr.setSession(session);
        DIVEWebXR._overlay.element.style.display = '';
        this._session = session;

        // add end session event listener
        DIVEWebXR._overlay.closeButton.addEventListener('click', () =>
            this.end(),
        );

        // start session
        await this._onSessionStarted();

        return Promise.resolve();
    }

    public static update(_time: DOMHighResTimeStamp, frame: XRFrame): void {
        if (!this._session) return;

        if (this._xrController) {
            this._xrController.update(frame);
        }
    }

    public static end(): void {
        if (!this._session) return;
        this._session.end();
    }

    private static async _onSessionStarted(): Promise<void> {
        if (!this._session) return;

        // add update callback to render loop
        // this._renderCallbackId = this._renderer.AddPreRenderCallback(
        //     (time: DOMHighResTimeStamp, frame: XRFrame) => {
        //         this.Update(time, frame);
        //     },
        // );

        this._xrController = new DIVEWebXRController(
            this._session,
            this._renderer,
            this._scene,
        );
        await this._xrController.init().catch(() => {
            this.end();
        });

        return Promise.resolve();
    }

    private static _onSessionEnded(): void {
        if (!this._session) return;

        if (this._xrController) {
            this._xrController.dispose();
        }

        // remove Update() callback
        if (this._renderCallbackId) {
            // this._renderer.RemovePreRenderCallback(this._renderCallbackId);
            this._renderCallbackId = null;
        }

        // disable XR on renderer to restore canvas rendering
        this._renderer.webgpurenderer.xr.enabled = false;

        // resize renderer
        const canvasWrapper =
            this._renderer.webgpurenderer.domElement.parentElement;
        if (canvasWrapper) {
            const { clientWidth, clientHeight } = canvasWrapper;
            this._renderer.onResize(clientWidth, clientHeight);

            // will be removed in the future when DIVEOrthographicCamera will be implemented
            if ('onResize' in this._controller.object) {
                // resize camera
                this._controller.object.onResize(clientWidth, clientHeight);
            }
        }

        // reset camera
        this._controller.object.position.copy(this._cameraPosition);
        this._controller.target.copy(this._cameraTarget);

        // reset camera values
        this._cameraPosition.set(0, 0, 0);
        this._cameraTarget.set(0, 0, 0);

        // dispose xr scene
        // this._scene.DisposeXR();

        this._session.removeEventListener('end', this._onSessionEnded);
        DIVEWebXR._overlay!.element.style.display = 'none';
        this._session = null;
    }
}
