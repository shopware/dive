import {
    Color,
    Scene,
    type Box3,
    type ColorRepresentation,
} from 'three/webgpu';
import { DIVERoot } from '../../components/root/Root.ts';
import { DIVEGrid } from '../../components/grid/Grid.ts';
import { type DIVEComponent } from '../../components/component/Component.ts';
import { type DIVENode } from '../node/Node.ts';
import { type DIVETicker } from '../clock/Clock.ts';

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

/**
 * A basic scene class.
 *
 * Comes with a root object that contains all the scene objects, and drives the
 * per-frame tick of every component attached anywhere below it.
 */
export class DIVEScene extends Scene implements DIVETicker {
    public readonly isDIVEScene: true = true;

    private _settings: DIVESceneSettings;

    private _root: DIVERoot;
    private _grid: DIVEGrid | null = null;

    /**
     * Components that asked for a per-frame callback.
     *
     * Flat and enrolment-based: nothing walks the scene tree per frame, and
     * components without a `tick` never appear here at all. Nodes enrol and
     * withdraw their components as they enter and leave the tree, so the only
     * per-frame cost is iterating this array.
     */
    private _tickingComponents: DIVEComponent[] = [];

    /** Set while `tick` is iterating, so mutations are deferred. */
    private _isTicking: boolean = false;
    private _tickListDirty: boolean = false;

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

    /**
     * Drives every enrolled component once per frame.
     *
     * @param deltaTime - Seconds since the previous frame.
     */
    public tick(deltaTime: number): void {
        this._isTicking = true;

        /**
         * index-based and length-checked, so a component that disables itself
         * from inside its own tick cannot make the loop skip its neighbour
         */
        for (let i = 0; i < this._tickingComponents.length; i++) {
            const component = this._tickingComponents[i];
            if (!component.tickEnabled) continue;
            component.tick?.(deltaTime);
        }

        this._isTicking = false;

        if (this._tickListDirty) {
            this._tickListDirty = false;
            this._tickingComponents = this._tickingComponents.filter(
                (component) => component.tick && component.tickEnabled,
            );
        }
    }

    /**
     * Registers a component for the per-frame tick.
     *
     * Called by {@link DIVENode} when a component becomes live; not part of the
     * component-authoring surface.
     *
     * @param component - The component to enrol.
     * @internal
     */
    public enlistComponent(component: DIVEComponent): void {
        if (!component.tick || !component.tickEnabled) return;
        if (this._tickingComponents.includes(component)) return;

        this._tickingComponents.push(component);
    }

    /**
     * Removes a component from the per-frame tick.
     *
     * @param component - The component to withdraw.
     * @internal
     */
    public withdrawComponent(component: DIVEComponent): void {
        const index = this._tickingComponents.indexOf(component);
        if (index === -1) return;

        if (this._isTicking) {
            // compacted after the loop finishes
            this._tickListDirty = true;
            return;
        }

        this._tickingComponents.splice(index, 1);
    }

    /**
     * Gives up everything in the scene, GPU resources included.
     *
     * Every component gets its `dispose` called, which is what actually frees
     * geometries, materials and textures: three hangs a `dispose` listener on each
     * of those and destroys the GPU object when it fires. Its own
     * `Renderer.dispose` does not do this -- it only drops its bookkeeping -- so
     * without this pass the only thing that ever released GPU memory was ending
     * the canvas's WebGL context, which is not something DIVE may do to a canvas
     * it was handed.
     *
     * Found through the nodes rather than by looking for components in the graph:
     * a component is not in the graph -- only what it contributed is -- so
     * `node.components` is the only place they can be reached.
     *
     * Collects first and disposes afterwards, because a component is free to
     * change the tree it sits in while being disposed.
     */
    public dispose(): void {
        const components: DIVEComponent[] = [];
        this.traverse((object) => {
            if (!('isDIVENode' in object)) return;
            components.push(...(object as unknown as DIVENode).components);
        });
        components.forEach((component) => component.dispose());

        this.remove(this._root);

        // kept rather than nulled, the getter would build a fresh one on demand
        if (this._grid) {
            this._grid.dispose();
            this.remove(this._grid);
        }

        this._tickingComponents = [];
    }
}
