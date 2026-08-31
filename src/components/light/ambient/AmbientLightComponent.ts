import { AmbientLight } from 'three/webgpu';
import { DIVELightComponent } from '../LightComponent.ts';

/**
 * Uniform light from every direction, with no position or direction.
 *
 * @module
 */
export class AmbientLightComponent extends DIVELightComponent {
    readonly isAmbientLightComponent: true = true;

    constructor() {
        super(new AmbientLight(0xffffff, 1));

        this.name = 'AmbientLightComponent';
    }
}
