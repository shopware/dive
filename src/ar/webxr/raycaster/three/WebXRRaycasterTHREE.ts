import { Intersection, Matrix4, type Mesh, Raycaster, XRTargetRaySpace } from "three";
import { type DIVERenderer } from "../../../../renderer/Renderer";
import { type DIVEScene } from "../../../../scene/Scene";
import { type DIVEHitResult } from "../WebXRRaycaster";

export class DIVEWebXRRaycasterTHREE {
    private _renderer: DIVERenderer;
    private _scene: DIVEScene;

    private _controller: XRTargetRaySpace | undefined;

    // internal raycaster
    private _raycaster: Raycaster = new Raycaster();

    // temp matrix
    private _controllerMatrixBuffer: Matrix4 = new Matrix4();

    constructor(renderer: DIVERenderer, scene: DIVEScene) {
        this._renderer = renderer;
        this._scene = scene;

        this._controller = this._renderer.xr.getController(0);

        scene.XRRoot.add(this._controller);
    }

    public Dispose(): void {
        // dispose code here
    }

    public async Init(): Promise<this> {
        // init code here

        console.log('DIVEWebXRRaycasterTHREE: Initialized');
        return Promise.resolve(this);
    }

    // public Update(frame: XRFrame): void {
    //     // update code here
    // }

    public GetIntersections(): DIVEHitResult[] {
        if (!this._controller) return [];

        this._controllerMatrixBuffer.identity().extractRotation(this._controller.matrixWorld);
        this._raycaster.ray.origin.setFromMatrixPosition(this._controller.matrixWorld);
        this._raycaster.ray.direction.set(0, 0, -1).applyMatrix4(this._controllerMatrixBuffer);

        return this._raycaster.intersectObjects(this._scene.XRRoot.XRModelRoot.children).map((intersection: Intersection) => {
            return {
                point: intersection.point,
                matrix: intersection.object.matrixWorld,
                object: intersection.object as Mesh
            };
        });
    }
}