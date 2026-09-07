import { type Color, type Light } from 'three/webgpu';
import { PRODUCT_LAYER_MASK } from '../../constants/VisibilityLayerMask.ts';
import { DIVEComponent } from '../../engine/component/Component.ts';

/**
 * Base class for every light a node can carry.
 *
 * Exists so callers never have to know *which* kind of light a node holds: a
 * scene light is a node with a hemisphere and a directional component, and
 * applying colour or intensity to it is the same loop as for a single point
 * light. That is what keeps the state layer free of per-light-type branching.
 *
 * Takes constructor arguments, unlike concrete components: it is abstract and
 * therefore never the target of `new this.constructor()` in `clone()`.
 *
 * @module
 */
export abstract class DIVELightComponent extends DIVEComponent {
    readonly isDIVELightComponent: true = true;

    protected _light: Light;

    /**
     * Scales the intensity handed to {@link setIntensity}.
     *
     * Lets a multi-light node keep its relative balance -- a scene light's
     * directional part has always been brighter than its hemisphere part -- while
     * callers still deal in a single value.
     */
    private _intensityFactor: number;

    /**
     * @param light - The three light this component owns.
     * @param intensityFactor - Multiplier applied to the requested intensity.
     */
    constructor(light: Light, intensityFactor: number = 1) {
        super();

        this._light = light;
        this._intensityFactor = intensityFactor;

        this._light.layers.mask = PRODUCT_LAYER_MASK;
        this.contribute(this._light);
    }

    /**
     * The three light this component owns.
     */
    public get light(): Light {
        return this._light;
    }

    /**
     * @param color - The light colour.
     */
    public setColor(color: Color): void {
        this._light.color = color;
    }

    /**
     * @param intensity - The light intensity, before the component's factor.
     */
    public setIntensity(intensity: number): void {
        this._light.intensity = intensity * this._intensityFactor;
    }

    /**
     * @param enabled - Whether the light contributes to the scene.
     */
    public setEnabled(enabled: boolean): void {
        this._light.visible = enabled;
    }

    /**
     * Takes on the source's colour, brightness, direction and on/off state.
     *
     * Goes through the setters rather than writing the light, so a subclass that
     * mirrors them onto a proxy -- `PointLightComponent` and its handle -- keeps
     * up. {@link setIntensity} applies the factor, so the stored value has to be
     * divided back out first; both components are the same class and therefore
     * carry the same factor.
     *
     * The light's position is direction rather than placement for a hemisphere or
     * a directional light, and unused for the others, so copying it is right in
     * every case.
     *
     * @param source - The component to copy from.
     */
    public copy(source: this): this {
        super.copy(source);

        this.setColor(source._light.color.clone());
        this.setIntensity(source._light.intensity / source._intensityFactor);
        this.setEnabled(source._light.visible);

        this._light.position.copy(source._light.position);

        return this;
    }

    public dispose(): void {
        this._light.dispose?.();
    }
}
