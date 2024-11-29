import { Matrix4, Mesh, Object3D, Vector3, WebXRArrayCamera } from "three";
import { DIVERenderer } from "../../../renderer/Renderer";
import { DIVEScene } from "../../../scene/Scene";
import { DIVEWebXRCrosshair } from "../crosshair/WebXRCrosshair";
import { DIVEHitResult, DIVEWebXRRaycaster } from "../raycaster/WebXRRaycaster";
import { DIVEWebXROrigin } from "../origin/WebXROrigin";

export class DIVEWebXRController extends Object3D {
    // general members
    private _renderer: DIVERenderer;
    private _scene: DIVEScene;
    private _currentSession: XRSession;

    // raycaster members
    private _xrRaycaster: DIVEWebXRRaycaster;
    private _origin: DIVEWebXROrigin;

    // crosshair
    private _crosshair: DIVEWebXRCrosshair;

    // controller members
    private _handNodeInitialPosition = new Vector3();
    private _xrCamera: WebXRArrayCamera;
    private _placed: boolean;

    constructor(session: XRSession, renderer: DIVERenderer, scene: DIVEScene) {
        super();

        this._renderer = renderer;
        this._scene = scene;
        this._currentSession = session;

        this._placed = false;

        this._xrRaycaster = new DIVEWebXRRaycaster(session, renderer, scene);
        this._origin = new DIVEWebXROrigin(this._currentSession, this._renderer, ['plane']);

        this._crosshair = new DIVEWebXRCrosshair();
        this._crosshair.visible = false;

        this._xrCamera = this._renderer.xr.getCamera();

        this._scene.XRRoot.XRHandNode.position.set(0, -0.05, -0.25);
        this._handNodeInitialPosition = this._scene.XRRoot.XRHandNode.position.clone();
    }

    public async Init(): Promise<this> {
        this.appendXRScene();

        await this.initOrigin();
        await this.initRaycaster();

        return Promise.resolve(this);
    }

    public Dispose(): void {
        this.clearXRScene();

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

        if (this._placed) {
            if (this._xrRaycaster) {
                this._xrRaycaster.Update(frame);
            }
        }
    }

    private onHitFound(hit: DIVEHitResult): void {
        if (this._crosshair) {
            this._crosshair.visible = true;
            this._crosshair.matrix.copy(hit.matrix);
        }
    }

    private onHitLost(): void {
        if (this._crosshair) {
            this._crosshair.visible = false;
        }
    }

    private appendXRScene(): void {
        this._scene.XRRoot.matrixAutoUpdate = false;

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

    private async initOrigin(): Promise<void> {
        // initialize origin
        this._origin = await this._origin.Init();

        // set resolve callback: place objects at origin when it is set
        this._origin.originSet.then((set) => {
            if (!set) return;

            this.placeObjects(this._origin.matrix);
        });
    }

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
        this._xrRaycaster.Subscribe('HIT_FOUND', (payload) => {
            this.onHitFound(payload.hit);
        });

        this._xrRaycaster.Subscribe('HIT_LOST', () => {
            this.onHitLost();
        });
    }

    private clearXRScene(): void {
        this._scene.remove(this._crosshair);

        // clear hang node and remove attached models
        this._scene.XRRoot.XRHandNode.clear();
        this._scene.XRRoot.XRModelRoot.clear();

        this._scene.XRRoot.matrixAutoUpdate = true;
    }

    private placeObjects(matrix: Matrix4): void {
        this._scene.XRRoot.matrix.copy(matrix);
        [...this._scene.XRRoot.XRHandNode.children].forEach((child) => {
            this._scene.XRRoot.XRModelRoot.add(child);
        });
        this._placed = true;
    }
}