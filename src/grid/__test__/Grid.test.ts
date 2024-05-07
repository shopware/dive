import DIVEGrid from '../Grid.ts';
import { HELPER_LAYER_MASK } from "../../constant/VisibilityLayerMask.ts";
import { GridHelper } from 'three';

let grid: DIVEGrid;

describe('dive/grid/DIVEGrid', () => {
    beforeEach(() => {
        grid = new DIVEGrid();
    });

    it('should instantiate', () => {
        expect(grid).toBeDefined();
        expect(grid.name).toBeTruthy();
        expect(grid.children.length).toBeGreaterThanOrEqual(1);
        expect((grid.children[0] as GridHelper).material.depthTest).toBe(false);
        expect((grid.children[0] as GridHelper).layers.mask).toBe(HELPER_LAYER_MASK);
    });
});