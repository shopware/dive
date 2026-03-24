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
     * Distance between minor grid lines in meters.
     *
     * @default 1
     */
    gridSize: number;
    /**
     * Draw a thicker major line every N cells.
     *
     * @default 5
     */
    gridMajorLineEvery: number;
    /**
     * The background color of the scene.
     *
     * @default transparent
     */
    backgroundColor: ColorRepresentation;
};

export const DIVESceneDefaultSettings: Required<DIVESceneSettings> = {
    displayFloor: false,
    displayGrid: false,
    gridSize: 1,
    gridMajorLineEvery: 5,
    backgroundColor: 'transparent',
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

    private _settings: DIVESceneSettings;

    private _root: DIVERoot;
    private _grid: DIVEGrid | null = null;

    constructor(settings?: Partial<DIVESceneSettings>) {
        super();

        this._settings = { ...DIVESceneDefaultSettings, ...(settings ?? {}) };

        this.setBackground(this._settings.backgroundColor);

        this._root = new DIVERoot();
        this._root.floor.setVisibility(this._settings.displayFloor);
        this.add(this._root);

        if (this._settings.displayGrid) {
            this._grid = new DIVEGrid({
                gridSize: this._settings.gridSize,
                majorLineEvery: this._settings.gridMajorLineEvery,
            });
            this._grid.setVisibility(this._settings.displayGrid);
            this.add(this._grid);
        }
    }

    public get root(): DIVERoot {
        return this._root;
    }

    public get grid(): DIVEGrid {
        if (!this._grid) {
            this._grid = new DIVEGrid({
                gridSize: this._settings.gridSize,
                majorLineEvery: this._settings.gridMajorLineEvery,
            });

            this._grid.setVisibility(this._settings.displayGrid);
            this.add(this._grid);
        }

        return this._grid;
    }

    public setBackground(value: ColorRepresentation): void {
        if (value === 'transparent') {
            this.background = null;
        } else if (typeof value === 'string' || typeof value === 'number') {
            this.background = new Color(value);
        } else {
            this.background = value;
        }
    }

    public computeSceneBB(): Box3 {
        return this._root.computeSceneBB();
    }

    public dispose(): void {
        this.remove(this._root);

        if (this._grid) {
            this.remove(this._grid);
        }
    }
}
