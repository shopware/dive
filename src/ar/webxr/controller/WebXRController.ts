import { Mesh, Object3D, Quaternion, Vector3 } from "three";
import { DIVERenderer } from "../../../renderer/Renderer";
import { DIVEScene } from "../../../scene/Scene";
import { DIVEWebXRCrosshair } from "../crosshair/WebXRCrosshair";
import { DIVEWebXRRaycaster } from "../raycaster/WebXRRaycaster";

export class DIVEWebXRController extends Object3D {
    // general members
    private _renderer: DIVERenderer;
    private _scene: DIVEScene;
    private _currentSession: XRSession;
    private _xrRaycaster: DIVEWebXRRaycaster | null = null;

    // crosshair
    private _crosshair: DIVEWebXRCrosshair | null = null;

    // controller members
    private _handOffset = new Vector3(0, -0.05, -0.25);
    private _raycastHitCounter: number = 0;
    private _placed: boolean;

    constructor(session: XRSession, renderer: DIVERenderer, scene: DIVEScene) {
        super();

        this._renderer = renderer;
        this._scene = scene;
        this._currentSession = session;

        this._placed = false;
    }

    public async Init(): Promise<void> {
        this.appendXRScene();
        return this.initRaycaster();
    }

    public Dispose(): void {
        this.disposeRaycaster();
        this.clearXRScene();

        // reset placement members
        this._raycastHitCounter = 0;
        this._placed = false;
    }

    public Update(frame: XRFrame): void {
        if (!this._placed) {
            this._scene.XRRoot.XRHandNode.position.copy(this._handOffset.clone().applyMatrix4(this._renderer.xr.getCamera().matrixWorld));
            this._scene.XRRoot.XRHandNode.quaternion.copy(new Quaternion().setFromRotationMatrix(this._renderer.xr.getCamera().matrixWorld));
        }

        if (this._xrRaycaster) {
            this._xrRaycaster.Update(frame);
        }
    }

    private onHitFound(pose: XRPose): void {
        this._raycastHitCounter++;

        if (!this._placed && this._raycastHitCounter > 50) {
            this.placeObjects(pose);
        }

        if (this._crosshair) {
            this._crosshair.visible = true;
            this._crosshair.UpdateFromPose(pose);
        }
    }

    private onHitLost(): void {
        this._raycastHitCounter = 0;

        if (this._crosshair) {
            this._crosshair.visible = false;
        }
    }

    private appendXRScene(): void {
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

    private async initRaycaster(): Promise<void> {
        if (!this._currentSession) return Promise.reject();

        // initialize raycaster
        this._xrRaycaster = await new DIVEWebXRRaycaster(this._currentSession, this._renderer, ['plane']).Init();

        // check if successful
        if (!this._xrRaycaster) {
            console.error('Raycaster not initialized successfully. Aborting WebXR...');
            this.Dispose();
            return Promise.reject();
        }

        // add subscriptions
        this._xrRaycaster.Subscribe('HIT_FOUND', (payload) => {
            this.onHitFound(payload.pose);
        });

        this._xrRaycaster.Subscribe('HIT_LOST', () => {
            this.onHitLost();
        });
    }

    private disposeRaycaster(): void {
        // properly dispose raycaster
        if (this._xrRaycaster) {
            this._xrRaycaster.Dispose();
        }
    }

    private clearXRScene(): void {
        this._scene.XRRoot.matrixAutoUpdate = true;

        // clear xr scene
        if (this._crosshair) {
            this._scene.remove(this._crosshair);
        }

        // clear hang node and remove attached models
        this._scene.XRRoot.XRHandNode.clear();
        this._scene.XRRoot.XRModelRoot.clear();
    }

    private placeObjects(pose: XRPose): void {
        this._scene.XRRoot.matrix.fromArray(pose.transform.matrix);
        [...this._scene.XRRoot.XRHandNode.children].forEach((child) => {
            this._scene.XRRoot.XRModelRoot.add(child);
        });
        this._placed = true;
    }
}