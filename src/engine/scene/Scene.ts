import { Color, Scene, type Box3, type ColorRepresentation } from 'three';
import { DIVERoot } from '../../components/root/Root.ts';
import { DIVEGrid } from '../../components/grid/Grid.ts';

export type DIVESceneSettings = {
    /**
     * Whether to add a floor to the scene.
     *
     * @default false
     */
    displayFloor: boolean;
    /**
     * Whether to add a grid to the scene.
     *
     * @default false
     */
    displayGrid: boolean;
    /**
     * The background color of the scene.
     *
     * @default #ffffff
     */
    backgroundColor: ColorRepresentation;
};

export const DIVESceneDefaultSettings: Required<DIVESceneSettings> = {
    displayFloor: false,
    displayGrid: false,
    backgroundColor: '#ffffff',
};

/**
 * A basic scene class.
 *
 * Comes with a root object that contains all the scene objects.
 *
 * @module
 */

export class DIVEScene extends Scene {
    public readonly isDIVEScene: true = true;

    private _root: DIVERoot;
    private _grid: DIVEGrid;

    constructor(settings?: Partial<DIVESceneSettings>) {
        super();

        this.setBackground(
            settings?.backgroundColor ??
                DIVESceneDefaultSettings.backgroundColor,
        );

        this._root = new DIVERoot();
        this._root.floor.setVisibility(
            settings?.displayFloor ?? DIVESceneDefaultSettings.displayFloor,
        );
        this.add(this._root);

        this._grid = new DIVEGrid();
        this._grid.setVisibility(
            settings?.displayGrid ?? DIVESceneDefaultSettings.displayGrid,
        );
        this.add(this._grid);
    }

    public get root(): DIVERoot {
        return this._root;
    }

    public get grid(): DIVEGrid {
        return this._grid;
    }

    public setBackground(value: ColorRepresentation): void {
        this.background = new Color(value as ColorRepresentation);
    }

    public computeSceneBB(): Box3 {
        return this._root.computeSceneBB();
    }

    public dispose(): void {
        this.remove(this._root);
        this.remove(this._grid);
    }
}
