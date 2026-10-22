import {
    Color,
    Scene,
    type Box3,
    type ColorRepresentation,
    type Texture,
} from 'three/webgpu';
import defaultEnvUrl from '../../../assets/maps/env/default.hdr?url';
import { DIVERoot } from './root/Root.ts';
import {
    DIVEGridDefaultSettings,
    type DIVEGridSettings,
    GridComponent,
} from '../../components/grid/GridComponent.ts';
import { type DIVEComponent } from '../component/Component.ts';
import { disposeComponents } from '../../helpers/disposeComponents/disposeComponents.ts';
import { DIVENode } from '../node/Node.ts';
import { type DIVETicker } from '../clock/Clock.ts';
import { TextureResource } from '../resource/texture/TextureResource.ts';

/**
 * The light a scene gets from an equirectangular image around it.
 */
export type DIVEImageBasedLightSettings = {
    /**
     * The URL of the image, `null` for the bundled default HDR.
     *
     * @default null
     */
    image: string | null;
    /**
     * Rotation around Y in radians.
     *
     * @default 0
     */
    rotation: number;
    /**
     * @default 1
     */
    intensity: number;
};

export const DIVEImageBasedLightDefaultSettings: DIVEImageBasedLightSettings = {
    image: null,
    rotation: 0,
    intensity: 1,
};

/**
 * The image based light as requested, its image possibly still loading.
 */
export type DIVEImageBasedLight = Readonly<DIVEImageBasedLightSettings>;

/**
 * An equirectangular image at infinity behind the scene.
 */
export type DIVEBackgroundImageSettings = {
    /**
     * The URL of the image.
     */
    image: string;
    /**
     * Rotation around Y in radians.
     *
     * @default 0
     */
    rotation?: number;
};

/**
 * What to show behind the scene: a colour, an image, or `null` for nothing,
 * so that the page behind the canvas shows through. The colour
 * `'transparent'` is read as `null`.
 */
export type DIVEBackgroundSettings =
    ColorRepresentation | DIVEBackgroundImageSettings | null;

/**
 * The background as requested, `null` being transparent. An image may still
 * be loading.
 */
export type DIVEBackground =
    | Readonly<{ type: 'color'; color: Color }>
    | Readonly<{ type: 'image'; image: string; rotation: number }>
    | null;

export type DIVESceneSettings = {
    /**
     * Whether to add a floor to the scene.
     *
     * @default false
     */
    displayFloor: boolean;
    /**
     * Whether to add a grid to the scene.
     *
     * @default false
     */
    displayGrid: boolean;
    /**
     * How the grid looks: cell size, major line spacing, line colors.
     *
     * Whatever it leaves out keeps its default. Line colors come as a preset --
     * `DIVEGridOnLightColors`, `DIVEGridOnDarkColors`, `DIVEGridOnAnyColors` --
     * because which one reads well is a question about the ground the grid sits
     * on, and the engine cannot see it: that ground is a white floor in one
     * scene and the page behind a transparent canvas in the next.
     *
     * @default DIVEGridDefaultSettings
     */
    grid: Partial<DIVEGridSettings>;
    /**
     * What to show behind the scene: a colour, an image, or `null` for
     * transparent. Wins over `backgroundColor` when both are given.
     *
     * @default undefined, which leaves the background to `backgroundColor`
     */
    background: DIVEBackgroundSettings | undefined;
    /**
     * The background color of the scene.
     *
     * @deprecated Use `background` instead, which also takes an image or
     * `null` for transparent.
     * @default transparent
     */
    backgroundColor: ColorRepresentation;
    /**
     * The image based light, or `null` for none. Whatever it leaves out keeps
     * its default.
     *
     * @default DIVEImageBasedLightDefaultSettings
     */
    imageBasedLight: Partial<DIVEImageBasedLightSettings> | null;
};

export const DIVESceneDefaultSettings: Required<DIVESceneSettings> = {
    displayFloor: false,
    displayGrid: false,
    grid: DIVEGridDefaultSettings,
    background: undefined,
    backgroundColor: 'transparent',
    imageBasedLight: DIVEImageBasedLightDefaultSettings,
};

/**
 * A basic scene class.
 *
 * Comes with a root object that contains all the scene objects.
 *
 * @module
 */

/**
 * A basic scene class.
 *
 * Comes with a root object that contains all the scene objects, and drives the
 * per-frame tick of every component attached anywhere below it.
 */
export class DIVEScene extends Scene implements DIVETicker {
    public readonly isDIVEScene: true = true;

    private _settings: DIVESceneSettings;

    private _root: DIVERoot;
    private _grid: GridComponent | null = null;

    /**
     * Components that asked for a per-frame callback.
     *
     * Flat and enrolment-based: nothing walks the scene tree per frame, and
     * components without a `tick` never appear here at all. Nodes enrol and
     * withdraw their components as they enter and leave the tree, so the only
     * per-frame cost is iterating this array.
     */
    private _tickingComponents: DIVEComponent[] = [];

    /** Set while `tick` is iterating, so mutations are deferred. */
    private _isTicking: boolean = false;

    /**
     * What was withdrawn while `tick` was iterating.
     *
     * Splicing under the loop would shift the indices, so a withdrawal that
     * arrives mid-frame is recorded and applied afterwards. Recorded by identity,
     * not derived from `tick`/`tickEnabled` state: a component that is removed
     * from its node still has both, so a state-based compaction kept it enrolled
     * and it went on ticking with no owner -- and, after a move, in two scenes.
     */
    private _withdrawn: Set<DIVEComponent> | null = null;

    /** the image based light as requested */
    private _imageBasedLight: DIVEImageBasedLight | null = null;

    private _lightImage = new TextureResource();

    /** the background as requested */
    private _background: DIVEBackground = null;

    private _backgroundImage = new TextureResource(() =>
        this._showBackground(),
    );

    constructor(settings?: Partial<DIVESceneSettings>) {
        super();

        this._settings = { ...DIVESceneDefaultSettings, ...(settings ?? {}) };

        this.setBackground(
            this._settings.background !== undefined
                ? this._settings.background
                : this._settings.backgroundColor,
        ).catch((error: unknown) => {
            // nobody awaits the constructor, so this is the only report
            console.error('DIVEScene: background failed', error);
        });

        this._root = new DIVERoot();
        this._root.floor.setVisibility(this._settings.displayFloor);
        this.add(this._root);

        if (this._settings.displayGrid) this._buildGrid();

        this.setImageBasedLight(this._settings.imageBasedLight).catch(
            (error: unknown) => {
                // nobody awaits the constructor, so this is the only report
                console.error('DIVEScene: image based light failed', error);
            },
        );
    }

    /**
     * The image based light as requested, or `null` for none.
     *
     * A new image shows up here at once and lights the scene once it has
     * loaded, the previous one lighting it until then.
     */
    public get imageBasedLight(): DIVEImageBasedLight | null {
        return this._imageBasedLight;
    }

    /**
     * The texture the scene is lit by, `null` before the first image has
     * loaded.
     *
     * @internal
     */
    public get imageBasedLightTexture(): Texture | null {
        return this._lightImage.value;
    }

    /**
     * Counts every change of {@link imageBasedLightTexture}, including to and
     * from none, so whoever bakes from it can compare against its last bake.
     *
     * @internal
     */
    public get imageBasedLightVersion(): number {
        return this._lightImage.version;
    }

    /**
     * Sets the image based light, or turns it off with `null`.
     *
     * Fields left out keep their value; after `null` they start from the
     * defaults again. An `image` of `null` is the bundled default HDR. Of
     * overlapping image changes the last one wins. An image used in several
     * places is loaded once.
     *
     * @param settings - What to change, or `null` for no image based light.
     * @returns Resolves once the image is loaded and in place.
     */
    public async setImageBasedLight(
        settings: Partial<DIVEImageBasedLightSettings> | null,
    ): Promise<void> {
        if (settings === null) {
            this._imageBasedLight = null;
            this._lightImage.clear();
            return;
        }

        const light: DIVEImageBasedLightSettings = {
            ...(this._imageBasedLight ?? DIVEImageBasedLightDefaultSettings),
        };
        if (settings.image !== undefined) {
            // the default's URL belongs to this build, so it is described as null
            light.image =
                settings.image === defaultEnvUrl ? null : settings.image;
        }
        if (settings.rotation !== undefined) light.rotation = settings.rotation;
        if (settings.intensity !== undefined) {
            light.intensity = settings.intensity;
        }
        this._imageBasedLight = light;

        return this._lightImage.request(light.image ?? defaultEnvUrl);
    }

    public get root(): DIVERoot {
        return this._root;
    }

    /**
     * The grid, built on first use.
     *
     * Lazy because a scene without one should not pay for the plane, the shader
     * material and its uniforms.
     */
    public get grid(): GridComponent {
        if (!this._grid) this._buildGrid();

        return this._grid!;
    }

    /**
     * Puts the grid on its own node in the scene.
     *
     * Its own node, and not the root: the grid is furniture the viewer sees, not
     * scene content, so it must stay out of everything that walks the root --
     * bounds, exports, the entity tree.
     */
    private _buildGrid(): void {
        const node = new DIVENode();
        node.name = 'DIVEGrid';

        this._grid = node
            .addComponent(new GridComponent())
            .applySettings(this._settings.grid)
            .setVisibility(this._settings.displayGrid);

        this.add(node);
    }

    /**
     * The background as requested, `null` being transparent.
     *
     * A new image shows up here at once and is shown once it has loaded, the
     * previous background staying until then.
     */
    public getBackground(): DIVEBackground {
        return this._background;
    }

    /**
     * Sets what is shown behind the scene: a colour, an equirectangular image,
     * or `null` for transparent.
     *
     * An image is shown as it is, without a cube capture, and rotated through
     * the scene's background rotation, so a new rotation for the same image
     * costs no reload. Of overlapping calls the last one wins. An image used
     * in several places is loaded once.
     *
     * @param value - The new background.
     * @returns Resolves once the background is in place, for an image once it
     * has loaded.
     */
    public async setBackground(value: DIVEBackgroundSettings): Promise<void> {
        if (!isBackgroundImage(value)) {
            this._background = toColorBackground(value);
            this._backgroundImage.clear();
            this._showBackground();
            return;
        }

        this._background = {
            type: 'image',
            image: value.image,
            rotation: value.rotation ?? 0,
        };
        const done = this._backgroundImage.request(value.image);
        this._showBackground();
        return done;
    }

    /** puts the requested background on the scene, an image once it has loaded */
    private _showBackground(): void {
        const background = this._background;

        if (background?.type !== 'image') {
            this.background = background?.color ?? null;
            this.backgroundRotation.set(0, 0, 0);
            return;
        }

        // the previous background stays until the image has loaded
        if (this._backgroundImage.url !== background.image) return;

        this.background = this._backgroundImage.value;
        this.backgroundRotation.set(0, background.rotation, 0);
    }

    public computeSceneBB(): Box3 {
        return this._root.computeSceneBB();
    }

    /**
     * Drives every enrolled component once per frame.
     *
     * @param deltaTime - Seconds since the previous frame.
     */
    public tick(deltaTime: number): void {
        this._isTicking = true;

        /**
         * index-based and length-checked, so a component that disables itself
         * from inside its own tick cannot make the loop skip its neighbour
         */
        for (let i = 0; i < this._tickingComponents.length; i++) {
            const component = this._tickingComponents[i];
            if (!component.tickEnabled) continue;

            // withdrawn earlier in this very frame, so it is already gone
            if (this._withdrawn?.has(component)) continue;

            component.tick?.(deltaTime);
        }

        this._isTicking = false;

        if (this._withdrawn) {
            const withdrawn = this._withdrawn;
            this._withdrawn = null;
            this._tickingComponents = this._tickingComponents.filter(
                (component) => !withdrawn.has(component),
            );
        }
    }

    /**
     * Registers a component for the per-frame tick.
     *
     * Called by {@link DIVENode} when a component becomes live; not part of the
     * component-authoring surface.
     *
     * @param component - The component to enrol.
     * @internal
     */
    public enlistComponent(component: DIVEComponent): void {
        if (!component.tick || !component.tickEnabled) return;

        // enrolled again after being withdrawn in the same frame, so the pending
        // withdrawal no longer applies
        this._withdrawn?.delete(component);

        if (this._tickingComponents.includes(component)) return;

        this._tickingComponents.push(component);
    }

    /**
     * Removes a component from the per-frame tick.
     *
     * @param component - The component to withdraw.
     * @internal
     */
    public withdrawComponent(component: DIVEComponent): void {
        const index = this._tickingComponents.indexOf(component);
        if (index === -1) return;

        if (this._isTicking) {
            // compacted after the loop finishes
            (this._withdrawn ??= new Set()).add(component);
            return;
        }

        this._tickingComponents.splice(index, 1);
    }

    /**
     * Gives up everything in the scene, GPU resources included.
     *
     * Every component gets its `dispose` called, which is what actually frees
     * geometries, materials and textures: three hangs a `dispose` listener on each
     * of those and destroys the GPU object when it fires. Its own
     * `Renderer.dispose` does not do this -- it only drops its bookkeeping -- so
     * without this pass the only thing that ever released GPU memory was ending
     * the canvas's WebGL context, which is not something DIVE may do to a canvas
     * it was handed.
     *
     * Found through the nodes rather than by looking for components in the graph:
     * a component is not in the graph -- only what it contributed is -- so
     * `node.components` is the only place they can be reached.
     *
     * Collects first and disposes afterwards, because a component is free to
     * change the tree it sits in while being disposed.
     */
    public dispose(): void {
        disposeComponents(this);

        this.remove(this._root);

        // already disposed by the traverse above, since it sits on a node
        // kept rather than nulled, the getter would build a fresh one on demand
        if (this._grid) this.remove(this._grid.owner);

        this._tickingComponents = [];

        this._lightImage.dispose();
        this._backgroundImage.dispose();
    }
}

function isBackgroundImage(
    value: DIVEBackgroundSettings,
): value is DIVEBackgroundImageSettings {
    return typeof value === 'object' && value !== null && 'image' in value;
}

/** a colour background, `null` and `'transparent'` being transparent */
function toColorBackground(
    value: Exclude<DIVEBackgroundSettings, DIVEBackgroundImageSettings>,
): DIVEBackground {
    if (value === null || value === 'transparent') return null;

    // a Color passed in is used as it is
    return {
        type: 'color',
        color: value instanceof Color ? value : new Color(value),
    };
}
