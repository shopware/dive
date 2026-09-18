import { GridNode, type GridNodeUniforms } from '@shopware-ag/dive/shader';
import {
    type DIVEGridColors,
    DIVEGridOnLightColors,
} from '../../constants/GridColors.ts';
import { HELPER_LAYER_MASK } from '../../constants/VisibilityLayerMask.ts';
import {
    Color,
    type ColorRepresentation,
    DoubleSide,
    Mesh,
    MeshBasicNodeMaterial,
    PlaneGeometry,
} from 'three/webgpu';
import { uniform } from 'three/tsl';
import { DIVEComponent } from '../../engine/component/Component.ts';

const PLANE_SIZE = 50;

/**
 * Everything about a grid a caller can decide.
 *
 * Colors come as a whole rather than one at a time, because what makes a grid
 * readable is the relationship between the two lines and the ground they sit
 * on -- see the presets in {@link DIVEGridColors}. The engine never picks one:
 * the ground is a white floor in one scene and the page behind a transparent
 * canvas in the next, and only the caller knows which.
 */
export type DIVEGridSettings = DIVEGridColors & {
    /** Distance between minor grid lines in meters. @default 1 */
    gridSize: number;
    /** Draw a thicker major line every N cells. @default 10 */
    majorLineEvery: number;
};

export const DIVEGridDefaultSettings: Required<DIVEGridSettings> = {
    gridSize: 1,
    majorLineEvery: 10,
    ...DIVEGridOnLightColors,
};

/**
 * How far the plane is pulled toward the camera in depth.
 *
 * It lies on the floor, and coplanar the depth test goes either way per
 * fragment -- the flicker. The pull sits here rather than as a push on the
 * floor, because a floor that gives way gives way to everything: a model
 * resting on it would show through it just the same. Only the grid is meant to
 * win, so only the grid asks for it.
 *
 * Positive because the renderer reverses the depth buffer, where closer is the
 * larger value. The factor is the slope-scaled half, which is what still
 * separates the two at grazing angles, and it works from either side of the
 * floor: the pull is toward the viewer, not upward.
 */
const DEPTH_PULL = 1;

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
    private _gridSize: number = DIVEGridDefaultSettings.gridSize;

    constructor() {
        super();

        this.name = 'GridComponent';

        const geometry = new PlaneGeometry(PLANE_SIZE, PLANE_SIZE);
        geometry.rotateX(-Math.PI / 2);

        this._uniforms = {
            uGridSize: uniform(this._gridSize),
            uMajorLineEvery: uniform(DIVEGridDefaultSettings.majorLineEvery),
            uMinorLineColor: uniform(
                new Color(DIVEGridDefaultSettings.minorLineColor),
            ),
            uMajorLineColor: uniform(
                new Color(DIVEGridDefaultSettings.majorLineColor),
            ),
            uMinorLineOpacity: uniform(
                DIVEGridDefaultSettings.minorLineOpacity,
            ),
            uMajorLineOpacity: uniform(
                DIVEGridDefaultSettings.majorLineOpacity,
            ),
            uFadeDistance: uniform(PLANE_SIZE / 2),
        };

        this._material = new MeshBasicNodeMaterial({
            transparent: true,
            depthWrite: false,
            side: DoubleSide,
            outputNode: new GridNode(this._uniforms),
            polygonOffset: true,
            polygonOffsetFactor: DEPTH_PULL,
            polygonOffsetUnits: DEPTH_PULL,
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

    /** Color of the minor grid lines. */
    public get minorLineColor(): Color {
        return this._uniforms.uMinorLineColor.value as Color;
    }

    /** Color of the major grid lines. */
    public get majorLineColor(): Color {
        return this._uniforms.uMajorLineColor.value as Color;
    }

    /** How opaque the minor grid lines are drawn. */
    public get minorLineOpacity(): number {
        return this._uniforms.uMinorLineOpacity.value as number;
    }

    /** How opaque the major grid lines are drawn. */
    public get majorLineOpacity(): number {
        return this._uniforms.uMajorLineOpacity.value as number;
    }

    /**
     * Takes on whatever the settings carry, leaving the rest as it is.
     *
     * The way a preset is put on: `applySettings(DIVEGridOnDarkColors)` reads
     * as what it does, and says nothing about the cell size the caller chose.
     *
     * @param settings - Cell size, major line spacing, line colors.
     */
    public applySettings(settings: Partial<DIVEGridSettings>): this {
        if (settings.gridSize !== undefined)
            this.setGridSize(settings.gridSize);

        if (settings.majorLineEvery !== undefined) {
            this.setMajorLineEvery(settings.majorLineEvery);
        }

        if (settings.minorLineColor !== undefined) {
            this.setMinorLineColor(settings.minorLineColor);
        }

        if (settings.majorLineColor !== undefined) {
            this.setMajorLineColor(settings.majorLineColor);
        }

        if (settings.minorLineOpacity !== undefined) {
            this.setMinorLineOpacity(settings.minorLineOpacity);
        }

        if (settings.majorLineOpacity !== undefined) {
            this.setMajorLineOpacity(settings.majorLineOpacity);
        }

        return this;
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

    /**
     * @param color - Color of the minor grid lines.
     */
    public setMinorLineColor(color: ColorRepresentation): this {
        (this._uniforms.uMinorLineColor.value as Color).set(color);

        return this;
    }

    /**
     * @param color - Color of the major grid lines.
     */
    public setMajorLineColor(color: ColorRepresentation): this {
        (this._uniforms.uMajorLineColor.value as Color).set(color);

        return this;
    }

    /**
     * @param opacity - How opaque the minor grid lines are drawn, 0 to 1.
     */
    public setMinorLineOpacity(opacity: number): this {
        this._uniforms.uMinorLineOpacity.value = opacity;

        return this;
    }

    /**
     * @param opacity - How opaque the major grid lines are drawn, 0 to 1.
     */
    public setMajorLineOpacity(opacity: number): this {
        this._uniforms.uMajorLineOpacity.value = opacity;

        return this;
    }

    public copy(source: this): this {
        super.copy(source);

        this.applySettings({
            gridSize: source.gridSize,
            majorLineEvery: source.majorLineEvery,
            minorLineColor: source.minorLineColor,
            majorLineColor: source.majorLineColor,
            minorLineOpacity: source.minorLineOpacity,
            majorLineOpacity: source.majorLineOpacity,
        });
        this.setVisibility(source.visible);

        return this;
    }

    public dispose(): void {
        this._mesh.geometry.dispose();
        this._material.dispose();
    }
}
