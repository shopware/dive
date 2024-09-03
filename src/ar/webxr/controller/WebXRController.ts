import { Matrix4, Mesh, Object3D, Quaternion, Vector3, WebXRArrayCamera } from "three";
import { DIVERenderer } from "../../../renderer/Renderer";
import { DIVEScene } from "../../../scene/Scene";
import { DIVEWebXRCrosshair } from "../crosshair/WebXRCrosshair";
import { DIVEWebXRRaycaster } from "../raycaster/WebXRRaycaster";
import { DIVEWebXROrigin } from "../origin/WebXROrigin";
import { DIVETouchscreenEvents, DIVEWebXRTouchscreenControls } from "../touchscreencontrols/WebXRTouchscreenControls";
import { findMoveableInterface } from "../../../interface/Moveable";

export class DIVEWebXRController extends Object3D {
    // general members
    private _renderer: DIVERenderer;
    private _scene: DIVEScene;
    private _session: XRSession;

    private _frameBuffer: XRFrame | null = null;

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
    private _arHitPosition: Vector3 = new Vector3();
    private _arHitQuaternion: Quaternion = new Quaternion();
    private _arHitScale: Vector3 = new Vector3(1, 1, 1);

    // grabbing position
    private _initialObjectPosition: Vector3 | null = null;
    private _initialRaycastHit: Vector3 | null = null;
    private _deltaRaycastHit: Vector3 = new Vector3();

    // grabbing rotation
    private _touchQuaterion: Quaternion = new Quaternion();

    // grabbing scale
    private _touchScale: number = 1;
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

        this._scene.XRRoot.XRHandNode.position.set(0, -0.05, -0.25);
        this._handNodeInitialPosition = this._scene.XRRoot.XRHandNode.position.clone();

        this._touchscreenControls = new DIVEWebXRTouchscreenControls(this._session);

        // translating
        this._touchscreenControls.Subscribe('TOUCH_START', () => this.onTouchStart());
        this._touchscreenControls.Subscribe('TOUCH_MOVE', () => this.onTouchMove());
        this._touchscreenControls.Subscribe('TOUCH_END', (p) => this.onTouchEnd(p));

        // rotating
        this._touchscreenControls.Subscribe('ROTATE_START', () => this.onRotateStart());
        this._touchscreenControls.Subscribe('ROTATE_MOVE', (p) => this.onRotateMove(p));

        // scaling
        this._touchscreenControls.Subscribe('PINCH_START', () => this.onPinchStart());
        this._touchscreenControls.Subscribe('PINCH_MOVE', (p) => this.onPinchMove(p));


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
        this._frameBuffer = frame;

        if (!this._placed) {

            this._xrCamera.updateMatrixWorld();
            this._scene.XRRoot.XRHandNode.position.copy(this._handNodeInitialPosition.clone().applyMatrix4(this._xrCamera.matrixWorld));
            this._scene.XRRoot.XRHandNode.quaternion.setFromRotationMatrix(this._xrCamera.matrixWorld);

            if (this._origin) {
                this._origin.Update(frame);
            }
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
    private updateObject(): void {
        if (!this._grabbedObject) return;
        this._grabbedObject.position.copy(this._arHitPosition);
        this._grabbedObject.quaternion.copy(this._arHitQuaternion.clone().multiply(this._touchQuaterion));
        this._grabbedObject.scale.copy(new Vector3(this._touchScale, this._touchScale, this._touchScale).multiply(this._arHitScale));
    }

    private onTouchStart(): void {
        const sceneHits = this._xrRaycaster.GetSceneIntersections();
        if (sceneHits.length === 0) return;
        if (!sceneHits[0].object) return;

        const moveable = findMoveableInterface(sceneHits[0].object);
        if (!moveable) return;

        this._grabbedObject = moveable;
    }

    private onTouchMove(): void {
        // raycast ar
        if (!this._frameBuffer) return;
        if (!this._grabbedObject) return;

        const intersections = this._xrRaycaster.GetARIntersections(this._frameBuffer);
        if (intersections.length === 0) {
            this._crosshair.visible = false;
            return;
        }

        const hit = intersections[0];

        this._crosshair.visible = true;
        this._crosshair.matrix.copy(hit.matrix);

        if (!this._grabbedObject) return;

        // if initial values have been reset by TOUCH_END event then set them again
        if (!this._initialObjectPosition || !this._initialRaycastHit) {
            this._initialObjectPosition = this._grabbedObject.position.clone();
            this._initialRaycastHit = hit.point.clone();
        }

        // decompose hit matrix to apply hit matrix to object
        hit.matrix.decompose(this._arHitPosition, this._arHitQuaternion, this._arHitScale);

        // calculate raycast hit delta
        this._deltaRaycastHit.copy(hit.point.clone().sub(this._initialRaycastHit));

        // apply moved raycast delta to actual object position
        this._arHitPosition.copy(this._initialObjectPosition.clone().add(this._deltaRaycastHit));

        this.updateObject();
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

    private _startTouchQuaternion: Quaternion = new Quaternion();
    private onRotateStart(): void {
        this._startTouchQuaternion = this._touchQuaterion.clone();
    }

    private onRotateMove(payload: DIVETouchscreenEvents['ROTATE_MOVE']): void {
        this._touchQuaterion.setFromAxisAngle(new Vector3(0, -1, 0), payload.delta * 3);
        this._touchQuaterion.multiply(this._startTouchQuaternion);
        this.updateObject();
    }

    private _startTouchScale: number = 1;
    private onPinchStart(): void {
        this._startTouchScale = this._touchScale;
    }

    private onPinchMove(payload: DIVETouchscreenEvents['PINCH_MOVE']): void {
        this._touchScale = this._startTouchScale * payload.current;
        this.updateObject();
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
    }
}