import {
    type Intersection,
    type Mesh,
    Raycaster,
    type XRTargetRaySpace,
} from 'three';
import { type DIVERenderPipeline } from '../../../../../engine/renderer/Renderer.ts';
import { type DIVEScene } from '../../../../../engine/scene/Scene.ts';
import { type DIVEHitResult } from '../WebXRRaycaster.ts';

export class DIVEWebXRRaycasterTHREE {
    private _renderer: DIVERenderPipeline;
    private _scene: DIVEScene;

    private _controller: XRTargetRaySpace;

    // internal raycaster
    private _raycaster: Raycaster = new Raycaster();

    constructor(renderer: DIVERenderPipeline, scene: DIVEScene) {
        this._renderer = renderer;
        this._scene = scene;

        this._controller = this._renderer.webglrenderer.xr.getController(0);
    }

    public async Init(): Promise<this> {
        console.log('DIVEWebXRRaycasterTHREE: Initialized');
        return Promise.resolve(this);
    }

    public GetIntersections(): DIVEHitResult[] {
        this._controller.updateMatrixWorld();
        this._raycaster.setFromXRController(this._controller);
        // const intersections = this._raycaster.intersectObjects(
        //     this._scene.XRRoot.XRModelRoot.children,
        // );
        const intersections: Intersection[] = [];

        if (intersections.length === 0) return [];

        return intersections.map((intersection: Intersection) => {
            return {
                point: intersection.point,
                matrix: intersection.object.matrixWorld,
                object: intersection.object as Mesh,
            };
        });
    }
}
