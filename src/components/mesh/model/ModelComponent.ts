import {
    type AnimationClip,
    Mesh,
    MeshStandardMaterial,
    type Object3D,
} from 'three/webgpu';
import { PRODUCT_LAYER_MASK } from '../../../constants/VisibilityLayerMask.ts';
import { MeshComponent } from '../MeshComponent.ts';

/**
 * Geometry loaded from an asset.
 *
 * The only mesh component that fetches anything, which is why the asset loader
 * and {@link setFromGLTF} live here and not on {@link MeshComponent}: a primitive
 * or a floor has nothing to load, and inheriting `setFromGLTF` gave them a method
 * that would have overwritten their node's transform.
 *
 * @module
 */
export class ModelComponent extends MeshComponent {
    readonly isModelComponent: true = true;

    /**
     * The clips the asset came with.
     *
     * Its own field, not `Object3D.animations`: they belong to the asset, and the
     * mixer takes a root and its clips separately, so nothing needs them to sit
     * on a graph object.
     */
    public animations: AnimationClip[] = [];

    /** What {@link setFromURL} last loaded, so a clone can load it again. */
    private _url: string | null = null;

    constructor() {
        super();

        this.name = 'ModelComponent';
    }

    private _assetLoader:
        import('@shopware-ag/dive/assetloader').AssetLoader | null = null;

    private async _getAssetLoader(): Promise<
        import('@shopware-ag/dive/assetloader').AssetLoader
    > {
        if (!this._assetLoader) {
            this._assetLoader = new (
                await import('@shopware-ag/dive/assetloader')
            ).AssetLoader();
        }
        return this._assetLoader;
    }

    /**
     * Loads an asset and takes its content as this component's geometry.
     *
     * Reports the load on itself. Whoever wants to hear about an entity being
     * loaded listens to the component that loads it -- the node has nothing to
     * do with fetching, and a component with no owner yet had nowhere to report
     * before, which silently dropped the event.
     *
     * @param url - The asset to load.
     */
    public async setFromURL(url: string): Promise<this> {
        const assetLoader = await this._getAssetLoader();
        const gltf = await assetLoader.load(url);
        this.setFromGLTF(gltf);

        this._url = url;

        this.dispatchEvent({ type: 'object-load' });

        return this;
    }

    /**
     * Replaces the content with a loaded glTF hierarchy.
     *
     * @param gltf - What the loader returned: a glTF *scene*, whose children are
     * the file's root nodes.
     */
    public setFromGLTF(gltf: Object3D): this {
        // only what this component put there, and dispose it on the way out
        const replaced = [...this.contributions];
        this.withdraw(...replaced);
        replaced.forEach((object) =>
            object.traverse((child) => {
                (child as Mesh).geometry?.dispose();
            }),
        );

        this._mesh = null;

        /**
         * the owner's layer decides what this geometry counts as, and a component
         * built before it is attached has none yet
         */
        const layerMask = this.isAttached
            ? this.owner.layers.mask
            : PRODUCT_LAYER_MASK;

        gltf.traverse((child) => {
            child.castShadow = true;
            child.receiveShadow = true;
            child.layers.mask = layerMask;

            // only search for first mesh for now
            if (!this._mesh && 'isMesh' in child) {
                this._mesh = child as Mesh;

                /**
                 * a configured material wins over the asset's, since the caller
                 * has the schema before the file
                 */
                if (this._materialIsOwn) {
                    (child as Mesh).material = this._material!;
                } else {
                    this._material = (child as Mesh)
                        .material as MeshStandardMaterial;
                }
            }
        });

        this.animations = gltf.animations;

        /**
         * every root node of the file, with whatever transform it carries
         * a glTF scene has no transform of its own, so there is nothing to lift
         * a marked transform root is a save format and stays as it is; the side
         * that wrote it recognises it again
         */
        this.contribute(...gltf.children);

        return this;
    }

    /** The asset {@link setFromURL} last loaded, if any. */
    public get url(): string | null {
        return this._url;
    }

    /**
     * Carries over what identifies the content, not the content itself.
     *
     * The one component whose state a copy cannot reproduce on its own: a load is
     * asynchronous, and `copy` is not. So the clone comes back with the same
     * {@link url} and clips but no geometry, and the caller finishes it:
     *
     * ```ts
     * const clone = source.clone();
     * if (clone.url) await clone.setFromURL(clone.url);
     * ```
     *
     * Spelled out because the alternative is worse: cloning the loaded hierarchy
     * would share every geometry and material with the source, and either
     * component's `dispose` would then free what the other still draws.
     *
     * @param source - The component to copy from.
     */
    public copy(source: this): this {
        super.copy(source);

        this._url = source.url;

        // clips are read-only playback data, so sharing them costs nothing
        this.animations = source.animations;

        return this;
    }
}
