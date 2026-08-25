import { Mesh, MeshStandardMaterial, type Object3D } from 'three/webgpu';
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
     * Reports the load on the owning node, because that is the entity a state
     * layer knows about.
     *
     * @param url - The asset to load.
     */
    public async setFromURL(url: string): Promise<this> {
        const assetLoader = await this._getAssetLoader();
        const gltf = await assetLoader.load(url);
        this.setFromGLTF(gltf);

        // a component nobody has attached yet has nobody to tell
        if (this.isAttached) {
            this.owner.dispatchEvent({ type: 'object-load' });
        }

        return this;
    }

    /**
     * Replaces the content with a loaded glTF hierarchy.
     *
     * @param gltf - What the loader returned: a glTF *scene*, whose children are
     * the file's root nodes.
     */
    public setFromGLTF(gltf: Object3D): this {
        this.clear();
        this._mesh = null;

        // The owner's layer decides what this geometry counts as. There may be no
        // owner yet when a caller builds the component before attaching it, in
        // which case product geometry is the sensible default.
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

                this._material = (child as Mesh)
                    .material as MeshStandardMaterial;
            }
        });

        this.animations = gltf.animations;

        // Every root node of the file, with whatever transform it carries. A glTF
        // has none of its own -- the format gives a scene no such field -- so its
        // roots and their placements are simply what the model is made of.
        //
        // Nothing here looks for a transform root, and nothing here drops one. A
        // transform root is a save format, and the side that wrote it is the side
        // that recognises it again.
        this.add(...gltf.children);

        return this;
    }
}
