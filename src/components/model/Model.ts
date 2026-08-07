import {
    Box3,
    Mesh,
    MeshStandardMaterial,
    Object3D,
    Raycaster,
    Vector3,
} from 'three/webgpu';
import { PRODUCT_LAYER_MASK } from '../../constants/VisibilityLayerMask.ts';
import { findSceneRecursive } from '../../helpers/findSceneRecursive/findSceneRecursive.ts';
import { DIVENode } from '../node/Node.ts';
import { DIVEMaterial } from 'src/types/index.ts';
import { BoundingBox } from '../boundingbox/BoundingBox.ts';

/**
 * A basic model class.
 *
 * It does calculate it's own bounding box which is used for positioning on the floor.
 *
 * Can be moved and selected.
 *
 * @module
 */

export class DIVEModel extends DIVENode {
    readonly isDIVEModel: true = true;

    protected _gltf: Object3D | null = null;

    protected _mesh: Mesh | null = null;
    protected _material: MeshStandardMaterial | null = null;

    constructor() {
        super();

        this.name = 'DIVEModel';

        this.userData.isDIVEModel = true;
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

    public async setFromURL(url: string): Promise<this> {
        const assetLoader = await this._getAssetLoader();
        const gltf = await assetLoader.load(url);
        this.setFromGLTF(gltf);
        this.dispatchEvent({ type: 'object-load' });

        return this;
    }

    public setFromGLTF(gltf: Object3D): this {
        this.clear();
        this._boundingBox.makeEmpty();

        let root: Object3D | null = null;

        gltf.traverse((child) => {
            // check if we have a semantic root already
            if (!root && child.userData.isDIVEModel) {
                root = child;
            }

            child.castShadow = true;
            child.receiveShadow = true;

            child.layers.mask = this.layers.mask;
            this._boundingBox.expandByObject(child);

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

        this.position.copy(root.position);
        this.quaternion.copy(root.quaternion);
        this.scale.copy(root.scale);

        this.add(...root.children);

        this.animations = gltf.animations;

        return this;
    }

    public setMaterial(material: Partial<DIVEMaterial>): void {
        // if there is no material, create a new one
        if (!this._material) {
            this._material = new MeshStandardMaterial();
        }

        if (material.vertexColors !== undefined) {
            this._material.vertexColors = material.vertexColors;
        }

        // apply color if supplied
        if (material.color !== undefined) {
            this._material.color.set(material.color);
        }

        // apply albedo map if supplied
        if (material.map !== undefined) {
            this._material.map = material.map;
        }

        // apply normal map
        if (material.normalMap !== undefined) {
            this._material.normalMap = material.normalMap;
        }

        // set roughness value
        // if supplied, apply roughness map
        // if we applied a roughness map, set roughness to 1.0
        if (material.roughness !== undefined) {
            this._material.roughness = material.roughness;
        }

        if (material.roughnessMap !== undefined) {
            this._material.roughnessMap = material.roughnessMap;

            if (this._material.roughnessMap) {
                this._material.roughness = 1.0;
            }
        }

        // set metalness value
        // if supplied, apply metalness map
        // if we applied a metalness map, set metalness to 1.0
        if (material.metalness !== undefined) {
            this._material.metalness = material.metalness;
        }

        if (material.metalnessMap !== undefined) {
            this._material.metalnessMap = material.metalnessMap;

            if (this._material.metalnessMap) {
                this._material.metalness = 1.0;
            }
        }

        // if the mesh is already set, update the material
        if (this._mesh) {
            this._mesh.material = this._material;
        }
    }

    public placeOnFloor(): void {
        this.updateWorldMatrix(true, true);

        const worldPos = this.getWorldPosition(this._positionWorldBuffer);
        const oldWorldPos = worldPos.clone();

        // compute the world bounding box
        const box = new Box3();
        this.children.forEach((child) => {
            if (child instanceof BoundingBox) return;
            box.expandByObject(child, true);
        });
        const delta = -box.min.y;

        // skip any action when delta is too small
        if (Math.abs(delta) < 1e-9) return;

        worldPos.y += delta;

        // skip any action when the position did not change
        if (worldPos.y === oldWorldPos.y) return;

        this.setPosition(worldPos);

        this.onMove();
    }

    public dropIt(): void {
        if (!this.parent) {
            console.warn(
                'DIVEModel: dropIt() called on a model that is not in the scene.',
                this,
            );
            return;
        }

        const worldPos = this.getWorldPosition(this._positionWorldBuffer);
        const oldWorldPos = worldPos.clone();

        // compute the world bounding box
        const box = new Box3();
        this.children.forEach((child) => {
            if (child instanceof BoundingBox) return;
            box.expandByObject(child, true);
        });

        // calculate the bottom center of the bounding box
        const bottomCenter = box.getCenter(new Vector3());
        bottomCenter.y = box.min.y;

        // set up raycaster and raycast all scene objects (product layer)
        const raycaster = new Raycaster(bottomCenter, new Vector3(0, -1, 0));
        raycaster.layers.mask = PRODUCT_LAYER_MASK;
        const intersections = raycaster.intersectObjects(
            findSceneRecursive(this).root.children,
            true,
        );

        // if we hit something, move the model to the top on the hit object's bounding box
        if (intersections.length > 0) {
            const mesh = intersections[0].object as Mesh;

            const targetBox = new Box3().setFromObject(mesh);
            const targetBoxMaxY = targetBox.max.y;

            const delta = targetBoxMaxY - box.min.y;

            // skip any action when delta is too small
            if (Math.abs(delta) < 1e-9) return;

            worldPos.y += delta;

            // skip any action when the position did not change
            if (worldPos.y === oldWorldPos.y) return;

            this.setPosition(worldPos);

            this.onMove();
        } else {
            this.placeOnFloor();
        }
    }
}
