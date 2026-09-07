import { GridNode, type GridNodeUniforms } from '@shopware-ag/dive/shader';
import {
    GRID_MINOR_LINE_COLOR,
    GRID_MAJOR_LINE_COLOR,
} from '../../constants/GridColors.ts';
import { HELPER_LAYER_MASK } from '../../constants/VisibilityLayerMask.ts';
import {
    Color,
    DoubleSide,
    Mesh,
    MeshBasicNodeMaterial,
    PlaneGeometry,
} from 'three/webgpu';
import { uniform } from 'three/tsl';
import { DIVEComponent } from '../component/Component.ts';

const PLANE_SIZE = 50;
const GRID_SIZE = 1;
const MAJOR_LINE_EVERY = 10;

/**
 * An infinite shader-based grid that follows the camera.
 *
 * Draws anti-aliased minor and major grid lines with a radial distance fade. The
 * plane is finite and snaps to the camera in whole cells, which is what makes it
 * look endless: the fade hides the edge, and snapping keeps the lines from
 * crawling as the camera moves.
 *
 * The camera comes from `onBeforeRender` on the contributed mesh, which is the
 * sanctioned way for a component to get one -- `tick` has no view context, and
 * the grid has to react to whichever camera is rendering rather than to time.
 *
 * Visibility lives on the mesh rather than on a node, so hiding the grid never
 * touches whatever else its node carries.
 *
 * @module
 */
export class GridComponent extends DIVEComponent {
    readonly isGridComponent: true = true;

    private _mesh: Mesh;
    private _material: MeshBasicNodeMaterial;
    private _uniforms: GridNodeUniforms;
    private _gridSize: number = GRID_SIZE;

    constructor() {
        super();

        this.name = 'GridComponent';

        const geometry = new PlaneGeometry(PLANE_SIZE, PLANE_SIZE);
        geometry.rotateX(-Math.PI / 2);

        this._uniforms = {
            uGridSize: uniform(this._gridSize),
            uMajorLineEvery: uniform(MAJOR_LINE_EVERY),
            uMinorLineColor: uniform(new Color(GRID_MINOR_LINE_COLOR)),
            uMajorLineColor: uniform(new Color(GRID_MAJOR_LINE_COLOR)),
            uFadeDistance: uniform(PLANE_SIZE / 2),
        };

        this._material = new MeshBasicNodeMaterial({
            transparent: true,
            depthWrite: false,
            side: DoubleSide,
            outputNode: new GridNode(this._uniforms),
        });

        this._mesh = new Mesh(geometry, this._material);
        this._mesh.name = 'Grid';
        this._mesh.layers.mask = HELPER_LAYER_MASK;
        this._mesh.frustumCulled = false;
        this._mesh.renderOrder = -1;

        this._mesh.onBeforeRender = (_renderer, _scene, camera) => {
            const snap = this._gridSize;
            this._mesh.position.x = Math.round(camera.position.x / snap) * snap;
            this._mesh.position.z = Math.round(camera.position.z / snap) * snap;
            this._mesh.updateMatrixWorld(true);
        };

        this.contribute(this._mesh);
    }

    /** The plane the grid is drawn on. */
    public get mesh(): Mesh {
        return this._mesh;
    }

    /** Whether the grid is drawn. */
    public get visible(): boolean {
        return this._mesh.visible;
    }

    /** Distance between minor grid lines in meters. */
    public get gridSize(): number {
        return this._gridSize;
    }

    /** How many cells apart the thicker major lines are drawn. */
    public get majorLineEvery(): number {
        return this._uniforms.uMajorLineEvery.value as number;
    }

    /**
     * @param visible - Whether the grid is drawn.
     */
    public setVisibility(visible: boolean): this {
        this._mesh.visible = visible;

        return this;
    }

    /**
     * @param size - Distance between minor grid lines in meters. Also the step
     * the plane snaps to, so the lines stay put as the camera moves.
     */
    public setGridSize(size: number): this {
        this._gridSize = size;
        this._uniforms.uGridSize.value = size;

        return this;
    }

    /**
     * @param n - Draw a thicker major line every N cells.
     */
    public setMajorLineEvery(n: number): this {
        this._uniforms.uMajorLineEvery.value = n;

        return this;
    }

    public copy(source: this): this {
        super.copy(source);

        this.setGridSize(source.gridSize);
        this.setMajorLineEvery(source.majorLineEvery);
        this.setVisibility(source.visible);

        return this;
    }

    public dispose(): void {
        this._mesh.geometry.dispose();
        this._material.dispose();
    }
}
