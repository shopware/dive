import { Color, Scene, type Box3, type ColorRepresentation } from 'three';
import { DIVERoot } from '../../components/root/Root.ts';
import { DIVEGrid } from '../../components/grid/Grid.ts';

/**
 * A basic scene class.
 *
 * Comes with a root object that contains all the scene objects.
 *
 * @module
 */

export class DIVEScene extends Scene {
    public get root(): DIVERoot {
        return this._root;
    }

    public get grid(): DIVEGrid {
        return this._grid;
    }

    private _root: DIVERoot;
    private _grid: DIVEGrid;

    constructor() {
        super();

        this.background = new Color(0xffffff);

        this._root = new DIVERoot();
        this.add(this._root);

        this._grid = new DIVEGrid();
        this.add(this._grid);
    }

    public setBackground(color: ColorRepresentation): void {
        this.background = new Color(color);
    }

    public computeSceneBB(): Box3 {
        return this.root.computeSceneBB();
    }
}
