import { Scene, Box3, ColorRepresentation } from 'three';
import { DIVERoot } from '../../components/root/Root.ts';
import { DIVEGrid } from '../../components/grid/Grid.ts';
/**
 * A basic scene class.
 *
 * Comes with a root object that contains all the scene objects.
 *
 * @module
 */
export declare class DIVEScene extends Scene {
    get root(): DIVERoot;
    get grid(): DIVEGrid;
    private _root;
    private _grid;
    constructor();
    setBackground(color: ColorRepresentation): void;
    computeSceneBB(): Box3;
}
