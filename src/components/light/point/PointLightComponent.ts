import {
    FrontSide,
    Mesh,
    MeshBasicMaterial,
    PointLight,
    SphereGeometry,
    type Color,
} from 'three/webgpu';
import { PROXY_LAYER_MASK } from '../../../constants/VisibilityLayerMask.ts';
import { DIVELightComponent } from '../LightComponent.ts';

const HANDLE_RADIUS = 0.1;
const MAX_HANDLE_OPACITY = 0.8;
const SHADOW_MAP_SIZE = 512;

/**
 * Light radiating in all directions from the node's position. Casts shadows.
 *
 * Owns the small sphere that makes the light selectable and draggable in the
 * editor. That handle is kept here rather than in a component of its own because
 * it is this light's visual stand-in: it mirrors the light's colour and
 * intensity, and it is already invisible outside the editor by virtue of sitting
 * on the UI layer.
 *
 * @module
 */
export class PointLightComponent extends DIVELightComponent {
    readonly isPointLightComponent: true = true;

    private _handle: Mesh;
    private _handleMaterial: MeshBasicMaterial;

    constructor() {
        super(new PointLight(0xffffff, 1));

        this.name = 'PointLightComponent';

        const light = this._light as PointLight;
        light.castShadow = true;
        light.shadow.mapSize.width = SHADOW_MAP_SIZE;
        light.shadow.mapSize.height = SHADOW_MAP_SIZE;

        this._handleMaterial = new MeshBasicMaterial({
            color: this._light.color,
            transparent: true,
            opacity: MAX_HANDLE_OPACITY,
            side: FrontSide,
        });

        this._handle = new Mesh(
            new SphereGeometry(HANDLE_RADIUS, 32, 32),
            this._handleMaterial,
        );
        // a proxy, not UI: the light has no geometry, and this sphere is what
        // stands in for it. UI is the gizmo, which must not be selectable.
        this._handle.layers.mask = PROXY_LAYER_MASK;
        this.contribute(this._handle);
    }

    /**
     * The editor handle standing in for this light.
     */
    public get handle(): Mesh {
        return this._handle;
    }

    public setColor(color: Color): void {
        super.setColor(color);
        this._handleMaterial.color = color;
    }

    public setIntensity(intensity: number): void {
        super.setIntensity(intensity);

        // fade the handle with the light, but never past fully opaque
        this._handleMaterial.opacity = Math.min(
            intensity * MAX_HANDLE_OPACITY,
            MAX_HANDLE_OPACITY,
        );
    }

    public dispose(): void {
        super.dispose();

        this._handle.geometry.dispose();
        this._handleMaterial.dispose();
    }
}
