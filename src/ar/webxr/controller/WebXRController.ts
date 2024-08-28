import { Matrix4, Mesh, Object3D, Quaternion, Vector3, WebXRArrayCamera } from "three";
import { DIVERenderer } from "../../../renderer/Renderer";
import { DIVEScene } from "../../../scene/Scene";
import { DIVEWebXRCrosshair } from "../crosshair/WebXRCrosshair";
import { DIVEWebXRRaycaster, DIVEWebXRRaycasterEvents } from "../raycaster/WebXRRaycaster";
import { DIVEWebXROrigin } from "../origin/WebXROrigin";
import { DIVETouchscreenEvents, DIVEWebXRTouchscreenControls } from "../touchscreencontrols/WebXRTouchscreenControls";
import { findMoveableInterface } from "../../../interface/Moveable";

export class DIVEWebXRController extends Object3D {
    // general members
    private _renderer: DIVERenderer;
    private _scene: DIVEScene;
    private _session: XRSession;

    // raycaster members
    private _xrRaycaster: DIVEWebXRRaycaster;
    private _origin: DIVEWebXROrigin;

    // crosshair
    private _crosshair: DIVEWebXRCrosshair;

    // controller members
    private _touchscreenControls: DIVEWebXRTouchscreenControls;
    private _handNodeInitialPosition = new Vector3();
    private _xrCamera: WebXRArrayCamera;
    private _placed: boolean = false;

    // grabbing
    private _grabbedObject: Object3D | null = null;

    // grabbing position
    private _initialObjectPosition: Vector3 | null = null;
    private _initialRaycastHit: Vector3 | null = null;
    private _deltaRaycastHit: Vector3 = new Vector3();

    // grabbing rotation
    private _bufferQuaternion: Quaternion = new Quaternion();

    // grabbing scale
    private _scaleThreshold: number = 0.1;

    constructor(session: XRSession, renderer: DIVERenderer, scene: DIVEScene) {
        super();

        this._renderer = renderer;
        this._scene = scene;
        this._session = session;

        this._xrRaycaster = new DIVEWebXRRaycaster(session, renderer, scene);
        this._origin = new DIVEWebXROrigin(this._session, this._renderer, ['plane']);

        this._crosshair = new DIVEWebXRCrosshair();
        this._crosshair.visible = false;

        this._xrCamera = this._renderer.xr.getCamera();

        this._touchscreenControls = new DIVEWebXRTouchscreenControls(this._session);
        this._touchscreenControls.Subscribe('TOUCH_START', () => this.onTouchStart());
        this._touchscreenControls.Subscribe('TOUCH_END', (p) => this.onTouchEnd(p));

        this._scene.XRRoot.XRHandNode.position.set(0, -0.05, -0.25);
        this._handNodeInitialPosition = this._scene.XRRoot.XRHandNode.position.clone();
    }

    public async Init(): Promise<this> {
        this.prepareScene();

        await this.initOrigin();
        await this.initRaycaster();

        return Promise.resolve(this);
    }

    public Dispose(): void {
        this.restoreScene();

        this._origin.Dispose();
        this._xrRaycaster.Dispose();

        // reset placement members
        this._placed = false;
    }

    public Update(frame: XRFrame): void {
        if (!this._placed) {

            this._xrCamera.updateMatrixWorld();
            this._scene.XRRoot.XRHandNode.position.copy(this._handNodeInitialPosition.clone().applyMatrix4(this._xrCamera.matrixWorld));
            this._scene.XRRoot.XRHandNode.quaternion.setFromRotationMatrix(this._xrCamera.matrixWorld);

            if (this._origin) {
                this._origin.Update(frame);
            }
        }

        if (this._grabbedObject) {
            this._xrRaycaster.GetARIntersections(frame);
        }
    }

    // placement
    private async initOrigin(): Promise<void> {
        // initialize origin
        this._origin = await this._origin.Init();

        // set resolve callback: place objects at origin when it is set
        this._origin.originSet.then(() => {
            this.placeObjects(this._origin.matrix);
        });
    }

    private placeObjects(matrix: Matrix4): void {
        this._scene.XRRoot.XRModelRoot.matrix.copy(matrix);
        [...this._scene.XRRoot.XRHandNode.children].forEach((child) => {
            this._scene.XRRoot.XRModelRoot.add(child);
        });
        this._placed = true;
    }

    // grabbing
    private onTouchStart(): void {
        const sceneHits = this._xrRaycaster.GetSceneIntersections();
        if (sceneHits.length === 0) return;
        if (!sceneHits[0].object) return;

        const moveable = findMoveableInterface(sceneHits[0].object);
        if (!moveable) return;

        this._grabbedObject = moveable;
    }

    private onTouchEnd(payload: DIVETouchscreenEvents['TOUCH_END']): void {
        if (payload.touchCount === 0) {
            this._crosshair.visible = false;

            // reset grab
            this._initialObjectPosition = null;
            this._initialRaycastHit = null;
            this._grabbedObject = null;
        }
    }

    // prepare & cleanup scene
    private prepareScene(): void {
        this._scene.XRRoot.XRModelRoot.matrixAutoUpdate = false;

        // initialize crosshair
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

    private restoreScene(): void {
        this._scene.remove(this._crosshair);

        // clear hang node and remove attached models
        this._scene.XRRoot.XRHandNode.clear();
        this._scene.XRRoot.XRModelRoot.clear();

        this._scene.XRRoot.XRModelRoot.matrixAutoUpdate = true;
    }

    // raycast
    private async initRaycaster(): Promise<void> {
        // initialize raycaster
        await this._xrRaycaster.Init();

        // check if successful
        if (!this._xrRaycaster) {
            console.error('Raycaster not initialized successfully. Aborting WebXR...');
            this.Dispose();
            return Promise.reject();
        }

        // add subscriptions
        this._xrRaycaster.Subscribe('AR_HIT_FOUND', (p) => this.onARRaycasterHit(p));
        this._xrRaycaster.Subscribe('AR_HIT_LOST', () => this.onARRaycasterHitLost());
    }

    private onARRaycasterHit(payload: DIVEWebXRRaycasterEvents['AR_HIT_FOUND']): void {
        this._crosshair.visible = true;
        this._crosshair.matrix.copy(payload.hit.matrix);

        if (!this._grabbedObject) return;

        // if initial values have been reset by TOUCH_END event then set them again
        if (!this._initialObjectPosition || !this._initialRaycastHit) {
            this._initialObjectPosition = this._grabbedObject.position.clone();
            this._initialRaycastHit = payload.hit.point.clone();
        }

        // calculate raycast hit delta
        this._deltaRaycastHit.copy(payload.hit.point.clone().sub(this._initialRaycastHit));

        // decompose hit matrix to apply hit matrix to object
        payload.hit.matrix.decompose(new Vector3(), this._grabbedObject.quaternion, this._grabbedObject.scale);

        // apply moved raycast delta to actual object position
        this._grabbedObject.position.copy(this._initialObjectPosition.clone().add(this._deltaRaycastHit));
    }

    private onARRaycasterHitLost(): void {
        this._crosshair.visible = false;
    }
}