import { Mesh, Object3D, Quaternion, Vector3 } from "three";
import DIVEOrbitControls from "../../controls/OrbitControls";
import { type DIVERenderer } from "../../renderer/Renderer";
import { type DIVEScene } from "../../scene/Scene";
import { Overlay } from "./overlay/Overlay";
import { DIVEWebXRRaycaster } from "./raycaster/WebXRRaycaster";
import { DIVEWebXRCrosshair } from "./crosshair/WebXRCrosshair";

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
        depthSensing: { usagePreference: ['gpu-optimized' as XRDepthUsage], dataFormatPreference: [] },
        domOverlay: { root: {} as HTMLElement },
    };

    // web xr members
    private static _raycaster: DIVEWebXRRaycaster | null = null;
    private static _crosshair: DIVEWebXRCrosshair | null = null;

    // placement members
    private static _handOffset = new Vector3(0, -0.05, -0.25)
    private static _raycastHitCounter = 0;
    private static _placed = false;

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

        if (!this._placed) {
            this._scene.XRRoot.XRHandNode.position.copy(this._handOffset.clone().applyMatrix4(this._renderer.xr.getCamera().matrixWorld));
            this._scene.XRRoot.XRHandNode.quaternion.copy(new Quaternion().setFromRotationMatrix(this._renderer.xr.getCamera().matrixWorld));
        }

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

        this.appendXRScene();
        await this.initRaycaster();

        // add update callback to render loop
        this._renderCallbackId = this._renderer.AddPreRenderCallback((time: DOMHighResTimeStamp, frame: XRFrame) => {
            this.Update(time, frame);
        });

        return Promise.resolve();
    }

    private static _onSessionEnded(): void {
        if (!this._currentSession) return;

        this.clearXRScene();
        this.disposeRaycaster();

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

    private static onHitFound(pose: XRPose): void {
        this._raycastHitCounter++;

        if (!this._placed && this._raycastHitCounter > 50) {
            this.placeObjects(pose);
        }

        if (this._crosshair) {
            this._crosshair.visible = true;
            this._crosshair.UpdateFromPose(pose);
        }

    }

    private static onHitLost(): void {
        this._raycastHitCounter = 0;

        if (this._crosshair) {
            this._crosshair.visible = false;
        }
    }

    private static appendXRScene(): void {
        this._scene.XRRoot.matrixAutoUpdate = false;

        // initialize crosshair
        this._crosshair = new DIVEWebXRCrosshair();
        this._crosshair.visible = false;
        this._scene.add(this._crosshair);

        // hang current scene children to hang node
        const children: Object3D[] = [];
        this._scene.Root.ModelRoot.children.forEach((child) => {
            const clone = child.clone();
            clone.layers.enableAll();
            clone.traverse((obj) => {
                obj.layers.enableAll();
                if (obj instanceof Mesh) {
                    obj.scale.set(0.1, 0.1, 0.1);
                }
            });
            clone.position.set(0, 0, 0);
            children.push(clone);
        });
        this._scene.XRRoot.XRHandNode.add(...children);
    }

    private static async initRaycaster(): Promise<void> {
        if (!this._currentSession) return Promise.reject();

        // initialize raycaster
        this._raycaster = await new DIVEWebXRRaycaster(this._currentSession, this._renderer, ['plane']).Init();

        // check if successful
        if (!this._raycaster) {
            console.error('Raycaster not initialized successfully. Aborting WebXR...');
            this.End();
            return Promise.reject();
        }

        // add subscriptions
        this._raycaster.Subscribe('HIT_FOUND', (payload) => {
            this.onHitFound(payload.pose);
        });

        this._raycaster.Subscribe('HIT_LOST', () => {
            this.onHitLost();
        });
    }

    private static disposeRaycaster(): void {
        // properly dispose raycaster
        if (this._raycaster) {
            this._raycaster.Dispose();
        }
    }

    private static clearXRScene(): void {
        this._scene.XRRoot.matrixAutoUpdate = true;

        // clear xr scene
        if (this._crosshair) {
            this._scene.remove(this._crosshair);
        }

        // clear hang node and remove attached models
        this._scene.XRRoot.XRHandNode.clear();
        this._scene.XRRoot.XRModelRoot.clear();
    }

    private static placeObjects(pose: XRPose): void {
        this._scene.XRRoot.matrix.fromArray(pose.transform.matrix);
        [...this._scene.XRRoot.XRHandNode.children].forEach((child) => {
            this._scene.XRRoot.XRModelRoot.add(child);
        });
        this._placed = true;
    }
}