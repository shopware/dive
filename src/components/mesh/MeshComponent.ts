import { Mesh, MeshStandardMaterial, type Object3D } from 'three/webgpu';
import { PRODUCT_LAYER_MASK } from '../../constants/VisibilityLayerMask.ts';
import { DIVEComponent } from '../component/Component.ts';
import { type DIVEMaterial } from '../../types/material/DIVEMaterial.ts';

/**
 * Renderable geometry attached to a node.
 *
 * Owns its content as *its own* children rather than putting it in the node's.
 * That is what makes loading an asset safe: `setFromGLTF` clears this component,
 * not the node, so the node's other components survive it. Doing it the other
 * way round -- which is what `DIVEModel` used to do -- wiped every attached
 * component the moment an asset arrived.
 *
 * @module
 */
export class MeshComponent extends DIVEComponent {
    readonly isMeshComponent: true = true;

    protected _mesh: Mesh | null = null;
    protected _material: MeshStandardMaterial | null = null;

    constructor() {
        super();

        this.name = 'MeshComponent';
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

    /** The first mesh found in the content, if any. */
    public get mesh(): Mesh | null {
        return this._mesh;
    }

    /** The material shared across the content, if one was set or found. */
    public get material(): MeshStandardMaterial | null {
        return this._material;
    }

    /**
     * Replaces the content with a loaded glTF hierarchy.
     *
     * @param gltf - The loaded object hierarchy.
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

        let root: Object3D | null = null;

        gltf.traverse((child) => {
            // check if we have a semantic root already
            if (!root && child.userData.isDIVEModel) {
                root = child;
            }

            child.castShadow = true;
            child.receiveShadow = true;
            child.layers.mask = layerMask;

            // only search for first mesh for now
            if (!this._mesh && 'isMesh' in child) {
                this._mesh = child as Mesh;

                // if the material is already set, use it, otherwise set it from the model's material
                if (this._material) {
                    this._mesh.material = this._material;
                } else {
                    this._material = (child as Mesh)
                        .material as MeshStandardMaterial;
                }
            }
        });

        if (!root) {
            root = gltf;
        }

        // The glTF root's own transform belongs to the node, not to this
        // component: components sit at their owner's transform.
        if (this.isAttached) {
            const owner = this.owner;
            owner.position.copy(root.position);
            owner.quaternion.copy(root.quaternion);
            owner.scale.copy(root.scale);
            owner.animations = gltf.animations;
        }

        this.add(...root.children);

        return this;
    }

    /**
     * Applies material properties, creating a material if there is none yet.
     *
     * @param material - The properties to apply.
     */
    public setMaterial(material: Partial<DIVEMaterial>): void {
        if (!this._material) {
            this._material = new MeshStandardMaterial();
        }

        if (material.vertexColors !== undefined) {
            this._material.vertexColors = material.vertexColors;
        }

        if (material.color !== undefined) {
            this._material.color.set(material.color);
        }

        if (material.map !== undefined) {
            this._material.map = material.map;
        }

        if (material.normalMap !== undefined) {
            this._material.normalMap = material.normalMap;
        }

        // a roughness map takes over, so the scalar has to be neutral
        if (material.roughness !== undefined) {
            this._material.roughness = material.roughness;
        }

        if (material.roughnessMap !== undefined) {
            this._material.roughnessMap = material.roughnessMap;

            if (this._material.roughnessMap) {
                this._material.roughness = 1.0;
            }
        }

        // same for metalness
        if (material.metalness !== undefined) {
            this._material.metalness = material.metalness;
        }

        if (material.metalnessMap !== undefined) {
            this._material.metalnessMap = material.metalnessMap;

            if (this._material.metalnessMap) {
                this._material.metalness = 1.0;
            }
        }

        if (this._mesh) {
            this._mesh.material = this._material;
        }
    }

    public dispose(): void {
        this.traverse((child) => {
            const mesh = child as Mesh;
            mesh.geometry?.dispose();
        });

        this._material?.dispose();
    }
}
