import { type Intersection, type Mesh, Raycaster, type XRTargetRaySpace } from "three";
import { type DIVERenderer } from "../../../../renderer/Renderer";
import { type DIVEScene } from "../../../../scene/Scene";
import { type DIVEHitResult } from "../WebXRRaycaster";

export class DIVEWebXRRaycasterTHREE {
    private _renderer: DIVERenderer;
    private _scene: DIVEScene;

    private _controller: XRTargetRaySpace;

    // internal raycaster
    private _raycaster: Raycaster = new Raycaster();

    constructor(renderer: DIVERenderer, scene: DIVEScene) {
        this._renderer = renderer;
        this._scene = scene;

        this._controller = this._renderer.xr.getController(0);
    }

    public async Init(): Promise<this> {
        console.log('DIVEWebXRRaycasterTHREE: Initialized');
        return Promise.resolve(this);
    }

    public GetIntersections(): DIVEHitResult[] {
        this._controller.updateMatrixWorld();
        this._raycaster.setFromXRController(this._controller);
        const intersections = this._raycaster.intersectObjects(this._scene.XRRoot.XRModelRoot.children);

        if (intersections.length === 0) return [];

        return intersections.map((intersection: Intersection) => {
            return {
                point: intersection.point,
                matrix: intersection.object.matrixWorld,
                object: intersection.object as Mesh
            };
        });
    }
}