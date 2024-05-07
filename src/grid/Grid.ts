import { GRID_SIDE_LINE_COLOR, GRID_CENTER_LINE_COLOR } from "../constant/GridColors.ts";
import { HELPER_LAYER_MASK } from "../constant/VisibilityLayerMask.ts";
import { GridHelper, Object3D } from "three";

export default class DIVEGrid extends Object3D {
    constructor() {
        super();
        this.name = 'Grid';

        const grid = new GridHelper(100, 100, GRID_CENTER_LINE_COLOR, GRID_SIDE_LINE_COLOR);
        grid.material.depthTest = false;
        grid.layers.mask = HELPER_LAYER_MASK;

        this.add(grid);
    }
}