import { Box3, Object3D } from "three";
import DIVELightRoot from "./lightroot/LightRoot.ts";
import DIVEModelRoot from "./modelroot/ModelRoot.ts";
import { COMLight, COMModel, COMEntity } from "../../com/types.ts";
import DIVEFloor from "../../primitive/floor/Floor.ts";
import DIVEGrid from "../../grid/Grid.ts";

/**
 * A basic scene node to hold grid, floor and all lower level roots.
 *
 * @module
 */

export default class DIVERoot extends Object3D {
    private lightRoot: DIVELightRoot;
    private modelRoot: DIVEModelRoot;
    private floor: DIVEFloor;
    private grid: DIVEGrid;

    public get Floor(): DIVEFloor {
        return this.floor;
    }

    public get Grid(): DIVEGrid {
        return this.grid;
    }

    public get ModelRoot(): DIVEModelRoot {
        return this.modelRoot;
    }

    constructor() {
        super();
        this.name = "Root";

        this.lightRoot = new DIVELightRoot();
        this.add(this.lightRoot);
        this.modelRoot = new DIVEModelRoot();
        this.add(this.modelRoot);
        this.floor = new DIVEFloor();
        this.add(this.floor);
        this.grid = new DIVEGrid();
        this.add(this.grid);
    }

    public ComputeSceneBB(): Box3 {
        const bb = new Box3();
        this.modelRoot.traverse((object: Object3D) => {
            if ('isObject3D' in object) {
                bb.expandByObject(object);
            }
        });
        return bb;
    }

    public GetSceneObject(object: Partial<COMEntity>): Object3D | undefined {
        switch (object.entityType) {
            case "pov": {
                return undefined;
            }
            case "light": {
                return this.lightRoot.GetLight(object as COMLight);
            }
            case "model": {
                return this.modelRoot.GetModel(object as COMModel);
            }
        }
    }

    public AddSceneObject(object: COMEntity): void {
        switch (object.entityType) {
            case "pov": {
                break;
            }
            case "light": {
                this.lightRoot.UpdateLight(object as COMLight);
                break;
            }
            case "model": {
                this.modelRoot.UpdateModel(object as COMModel);
                break;
            }
        }
    }

    public UpdateSceneObject(object: Partial<COMEntity>): void {
        switch (object.entityType) {
            case "pov": {
                break;
            }
            case "light": {
                this.lightRoot.UpdateLight(object as COMLight);
                break;
            }
            case "model": {
                this.modelRoot.UpdateModel(object as COMModel);
                break;
            }
        }
    }

    public DeleteSceneObject(object: Partial<COMEntity>): void {
        switch (object.entityType) {
            case "pov": {
                break;
            }
            case "light": {
                this.lightRoot.DeleteLight(object as COMLight);
                break;
            }
            case "model": {
                this.modelRoot.DeleteModel(object as COMModel);
                break;
            }
        }
    }

    public PlaceOnFloor(object: Partial<COMModel>): void {
        this.modelRoot.PlaceOnFloor(object);
    }
}
