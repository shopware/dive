import {
    DIVEShaderLib,
    DIVEShaderMaterial,
    GridShader,
} from '@shopware-ag/dive/shader';
import {
    GRID_MINOR_LINE_COLOR,
    GRID_MAJOR_LINE_COLOR,
} from '../../constants/GridColors.ts';
import { HELPER_LAYER_MASK } from '../../constants/VisibilityLayerMask.ts';
import {
    Color,
    DoubleSide,
    Mesh,
    Object3D,
    PlaneGeometry,
    ShaderMaterial,
} from 'three';

const PLANE_SIZE = 50;
const GRID_SIZE = 1;
const MAJOR_LINE_EVERY = 10;

export interface DIVEGridSettings {
    /** Distance between minor grid lines in meters. @default 1 */
    gridSize?: number;
    /** Draw a thicker major line every N cells. @default 5 */
    majorLineEvery?: number;
}

/**
 * An infinite shader-based grid that follows the camera.
 *
 * Draws anti-aliased minor and major grid lines with a radial distance fade.
 */
export class DIVEGrid extends Object3D {
    private _mesh: Mesh;
    private _material: ShaderMaterial;
    private _gridSize: number;

    constructor(settings?: DIVEGridSettings) {
        super();
        this.name = 'Grid';

        this._gridSize = settings?.gridSize ?? GRID_SIZE;
        const majorLineEvery = settings?.majorLineEvery ?? MAJOR_LINE_EVERY;

        const geometry = new PlaneGeometry(PLANE_SIZE, PLANE_SIZE);
        geometry.rotateX(-Math.PI / 2);

        this._material = new DIVEShaderMaterial<GridShader>({
            ...DIVEShaderLib.grid,
            uniforms: {
                uGridSize: { value: this._gridSize },
                uMajorLineEvery: { value: majorLineEvery },
                uMinorLineColor: { value: new Color(GRID_MINOR_LINE_COLOR) },
                uMajorLineColor: { value: new Color(GRID_MAJOR_LINE_COLOR) },
                uFadeDistance: { value: PLANE_SIZE / 2 },
            },
            transparent: true,
            depthWrite: false,
            side: DoubleSide,
        });

        this._mesh = new Mesh(geometry, this._material);
        this._mesh.layers.mask = HELPER_LAYER_MASK;
        this._mesh.frustumCulled = false;
        this._mesh.renderOrder = -1;

        this._mesh.onBeforeRender = (_renderer, _scene, camera) => {
            const snap = this._gridSize;
            this._mesh.position.x = Math.round(camera.position.x / snap) * snap;
            this._mesh.position.z = Math.round(camera.position.z / snap) * snap;
            this._mesh.updateMatrixWorld(true);
        };

        this.add(this._mesh);
    }

    public setVisibility(visible: boolean): void {
        this.visible = visible;
    }

    public setGridSize(size: number): void {
        this._gridSize = size;
        this._material.uniforms.uGridSize.value = size;
    }

    public setMajorLineEvery(n: number): void {
        this._material.uniforms.uMajorLineEvery.value = n;
    }

    public dispose(): void {
        this._mesh.geometry.dispose();
        this._material.dispose();
    }
}
