import { PointLight } from 'three/webgpu';
import { DIVELightComponent } from '../LightComponent.ts';

const SHADOW_MAP_SIZE = 512;

/**
 * Light radiating in all directions from the node's position. Casts shadows.
 *
 * It is only the light: it has no geometry, so whatever makes it visible and
 * clickable in an editor is composed onto its node by the caller.
 *
 * @module
 */
export class PointLightComponent extends DIVELightComponent {
    readonly isPointLightComponent: true = true;

    constructor() {
        super(new PointLight(0xffffff, 1));

        this.name = 'PointLightComponent';

        const light = this._light as PointLight;
        light.castShadow = true;
        light.shadow.mapSize.width = SHADOW_MAP_SIZE;
        light.shadow.mapSize.height = SHADOW_MAP_SIZE;
    }
}
