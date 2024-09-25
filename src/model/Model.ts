import { Mesh, MeshStandardMaterial, Raycaster, Vector3 } from 'three';
import { PRODUCT_LAYER_MASK } from '../constant/VisibilityLayerMask';
import { DIVECommunication } from '../com/Communication';
import type { GLTF } from 'three/examples/jsm/Addons.js';
import { findSceneRecursive } from '../helper/findSceneRecursive/findSceneRecursive';
import { type COMMaterial } from '../com/types';
import { DIVENode } from '../node/Node';

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

    private _mesh: Mesh | null = null;
    private _material: MeshStandardMaterial | null = null;

    public SetModel(gltf: GLTF): void {
        this.clear();

        gltf.scene.traverse((child) => {
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
                    this._material = (child as Mesh).material as MeshStandardMaterial;
                }
            }
        });

        this.add(gltf.scene);
    }

    public SetMaterial(material: Partial<COMMaterial>): void {
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

    public PlaceOnFloor(): void {
        this.position.y = -this._boundingBox.min.y * this.scale.y;
        DIVECommunication.get(this.userData.id)?.PerformAction('UPDATE_OBJECT', { id: this.userData.id, position: this.position, rotation: this.rotation, scale: this.scale });
    }

    public DropIt(): void {
        if (!this.parent) {
            console.warn('DIVEModel: DropIt() called on a model that is not in the scene.', this);
            return;
        }

        // calculate the bottom center of the bounding box
        const bottomY = this._boundingBox.min.y * this.scale.y;
        const bbBottomCenter = this.localToWorld(this._boundingBox.getCenter(new Vector3()).multiply(this.scale));
        bbBottomCenter.y = bottomY + this.position.y;

        // set up raycaster and raycast all scene objects (product layer)
        const raycaster = new Raycaster(bbBottomCenter, new Vector3(0, -1, 0));
        raycaster.layers.mask = PRODUCT_LAYER_MASK;
        const intersections = raycaster.intersectObjects(findSceneRecursive(this).Root.children, true);

        // if we hit something, move the model to the top on the hit object's bounding box
        if (intersections.length > 0) {
            const mesh = intersections[0].object as Mesh;
            mesh.geometry.computeBoundingBox();
            const meshBB = mesh.geometry.boundingBox!;
            const worldPos = mesh.localToWorld(meshBB.max.clone());

            const oldPos = this.position.clone();
            const newPos = this.position.clone().setY(worldPos.y).sub(new Vector3(0, bottomY, 0));
            this.position.copy(newPos);

            // if the position changed, update the object in communication
            if (this.position.y === oldPos.y) return;
            DIVECommunication.get(this.userData.id)?.PerformAction('UPDATE_OBJECT', { id: this.userData.id, position: this.position, rotation: this.rotation, scale: this.scale });
        }
    }
}
