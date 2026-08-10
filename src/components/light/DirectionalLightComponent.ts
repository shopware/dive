import { DirectionalLight, Vector3, type Vector3Like } from 'three/webgpu';
import { DIVELightComponent } from './LightComponent.ts';

/** Matches the sun direction the previous DIVESceneLight used. */
const DEFAULT_DIRECTION = new Vector3(1, 1.75, 1).multiplyScalar(30);

const SHADOW_MAP_SIZE = 2048;
const SHADOW_FRUSTUM_EXTENT = 5;

/**
 * Parallel light from a fixed direction, the usual choice for sunlight. Casts
 * shadows.
 *
 * @module
 */
export class DirectionalLightComponent extends DIVELightComponent {
    readonly isDirectionalLightComponent: true = true;

    constructor() {
        // factor 3 preserves the balance the combined scene light had
        super(new DirectionalLight(0xffffff, 3), 3);

        this.name = 'DirectionalLightComponent';

        const light = this._light as DirectionalLight;

        light.castShadow = true;
        light.shadow.mapSize.width = SHADOW_MAP_SIZE;
        light.shadow.mapSize.height = SHADOW_MAP_SIZE;
        light.shadow.camera.left = -SHADOW_FRUSTUM_EXTENT;
        light.shadow.camera.right = SHADOW_FRUSTUM_EXTENT;
        light.shadow.camera.top = SHADOW_FRUSTUM_EXTENT;
        light.shadow.camera.bottom = -SHADOW_FRUSTUM_EXTENT;
        light.shadow.camera.far = 3500;

        this.setDirection(DEFAULT_DIRECTION);
    }

    /**
     * Sets the direction the light shines from.
     *
     * three takes a directional light's direction from its world position
     * relative to its target, which defaults to the world origin. So this is a
     * direction, not a location: moving the node does not change where the light
     * comes from, and it must never be the zero vector.
     *
     * @param direction - Where the light shines from. Must not be zero-length.
     */
    public setDirection(direction: Vector3Like): void {
        if (direction.x === 0 && direction.y === 0 && direction.z === 0) {
            console.warn(
                'DirectionalLightComponent.setDirection: a zero direction leaves the light without a direction; ignoring.',
            );
            return;
        }

        this._light.position.set(direction.x, direction.y, direction.z);
    }
}
