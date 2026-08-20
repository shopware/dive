import { HemisphereLight, Vector3, type Vector3Like } from 'three/webgpu';
import { DIVELightComponent } from '../LightComponent.ts';

/** Matches the sky axis the previous DIVESceneLight used. */
const DEFAULT_DIRECTION = new Vector3(0, 50, 0);

/**
 * Sky-and-ground light, brighter from above than from below.
 *
 * @module
 */
export class HemisphereLightComponent extends DIVELightComponent {
    readonly isHemisphereLightComponent: true = true;

    constructor() {
        // factor 2 preserves the balance the combined scene light had
        super(new HemisphereLight(0xffffff, 0xffffff, 2), 2);

        this.name = 'HemisphereLightComponent';

        this.setDirection(DEFAULT_DIRECTION);
    }

    /**
     * Sets which way is "up" for this light.
     *
     * three derives the sky axis from the light's normalised world position, so
     * this is a direction rather than a location -- moving the node does not
     * change it, and it must never be the zero vector.
     *
     * @param direction - The sky direction. Must not be zero-length.
     */
    public setDirection(direction: Vector3Like): void {
        if (direction.x === 0 && direction.y === 0 && direction.z === 0) {
            console.warn(
                'HemisphereLightComponent.setDirection: a zero direction leaves the light without a sky axis; ignoring.',
            );
            return;
        }

        this._light.position.set(direction.x, direction.y, direction.z);
    }
}
