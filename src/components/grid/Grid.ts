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

const vertexShader = /* glsl */ `
varying vec3 vWorldPosition;

void main() {
    vec4 worldPos = modelMatrix * vec4(position, 1.0);
    vWorldPosition = worldPos.xyz;
    gl_Position = projectionMatrix * viewMatrix * worldPos;
}
`;

const fragmentShader = /* glsl */ `
uniform float uGridSize;
uniform float uMajorLineEvery;
uniform vec3 uMinorLineColor;
uniform vec3 uMajorLineColor;
uniform float uFadeDistance;

varying vec3 vWorldPosition;

void main() {
    vec2 coord = vWorldPosition.xz;

    // Minor grid
    vec2 minorCoord = coord / uGridSize;
    vec2 minorGrid = abs(fract(minorCoord - 0.5) - 0.5) / fwidth(minorCoord);
    float lineMinor = min(minorGrid.x, minorGrid.y);

    // Major grid
    float majorSize = uGridSize * uMajorLineEvery;
    vec2 majorCoord = coord / majorSize;
    vec2 majorGrid = abs(fract(majorCoord - 0.5) - 0.5) / fwidth(majorCoord);
    float lineMajor = min(majorGrid.x, majorGrid.y);

    // Line alpha: minor = 1px, major = 2px wide
    float minorAlpha = 1.0 - min(lineMinor, 1.0);
    float majorAlpha = 1.0 - min(lineMajor / 2.0, 1.0);

    float alpha = max(minorAlpha, majorAlpha);
    vec3 color = mix(uMinorLineColor, uMajorLineColor, step(minorAlpha, majorAlpha));

    // Radial fade from camera
    float dist = length(vWorldPosition.xz - cameraPosition.xz);
    alpha *= 1.0 - smoothstep(uFadeDistance * 0.5, uFadeDistance, dist);

    if (alpha < 0.001) discard;

    gl_FragColor = vec4(color, alpha);
}
`;

/**
 * An infinite shader-based grid that follows the camera.
 *
 * Draws anti-aliased minor and major grid lines with a radial distance fade.
 *
 * @module
 */

export interface DIVEGridSettings {
    /** Distance between minor grid lines in meters. @default 1 */
    gridSize?: number;
    /** Draw a thicker major line every N cells. @default 5 */
    majorLineEvery?: number;
}

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

        this._material = new ShaderMaterial({
            vertexShader,
            fragmentShader,
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
