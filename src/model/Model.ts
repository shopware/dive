import { Box3, Color, Mesh, MeshStandardMaterial, Object3D, Raycaster, Vector3, Vector3Like } from 'three';
import { DIVESelectable } from '../interface/Selectable';
import { PRODUCT_LAYER_MASK } from '../constant/VisibilityLayerMask';
import { DIVEMoveable } from '../interface/Moveable';
import DIVECommunication from '../com/Communication';
import type { GLTF, TransformControls } from 'three/examples/jsm/Addons.js';
import { findSceneRecursive } from '../helper/findSceneRecursive/findSceneRecursive';
import { type COMMaterial } from '../com/types';

/**
 * A basic model class.
 *
 * It does calculate it's own bounding box which is used for positioning on the floor.
 *
 * Can be moved and selected.
 *
 * @module
 */

export default class DIVEModel extends Object3D implements DIVESelectable, DIVEMoveable {
    public isSelectable: true = true;
    public isMoveable: true = true;
    public gizmo: TransformControls | null = null;

    private boundingBox: Box3;

    private _mesh: Mesh | null = null;
    private _material: MeshStandardMaterial | null = null;

    constructor() {
        super();

        this.layers.mask = PRODUCT_LAYER_MASK;

        this.boundingBox = new Box3();
    }

    public SetModel(gltf: GLTF): void {
        this.clear();

        gltf.scene.traverse((child) => {
            child.castShadow = true;
            child.receiveShadow = true;

            child.layers.mask = this.layers.mask;
            this.boundingBox.expandByObject(child);

            // only search for first mesh for now
            if (!this._mesh && child instanceof Mesh) {
                this._mesh = child;

                // if the material is already set, use it, otherwise set it from the model's material
                if (this._material) {
                    this._mesh.material = this._material;
                } else {
                    this._material = child.material as MeshStandardMaterial;
                }
            }
        });

        this.add(gltf.scene);
    }

    public SetPosition(position: Vector3Like): void {
        this.position.set(position.x, position.y, position.z);
    }

    public SetRotation(rotation: Vector3Like): void {
        this.rotation.setFromVector3(new Vector3(rotation.x, rotation.y, rotation.z));
    }

    public SetScale(scale: Vector3Like): void {
        this.scale.set(scale.x, scale.y, scale.z);
    }

    public SetVisibility(visible: boolean): void {
        this.traverse((child) => {
            child.visible = visible;
        });
    }

    public SetMaterial(material: COMMaterial): void {
        // if there is no material, create a new one
        if (!this._material) {
            this._material = new MeshStandardMaterial();
        }

        this._material.color = new Color(material.color);

        // if there is a roughness map, use it, otherwise use the roughness value
        if (material.roughnessMap) {
            this._material.roughnessMap = material.roughnessMap;
            this._material.roughness = 1.0;
        } else {
            this._material.roughness = material.roughness;
        }

        // if there is a metalness map, use it, otherwise use the metalness value
        if (material.metalnessMap) {
            this._material.metalnessMap = material.metalnessMap;
            this._material.metalness = 0.0;
        } else {
            this._material.metalness = material.metalness;
        }

        // if the mesh is already set, update the material
        if (this._mesh) {
            this._mesh.material = this._material;
        }
    }

    public SetToWorldOrigin(): void {
        this.position.set(0, 0, 0);
        DIVECommunication.get(this.userData.id)?.PerformAction('UPDATE_OBJECT', { id: this.userData.id, position: this.position, rotation: this.rotation, scale: this.scale });
    }

    public PlaceOnFloor(): void {
        this.position.y = -this.boundingBox.min.y * this.scale.y;
        DIVECommunication.get(this.userData.id)?.PerformAction('UPDATE_OBJECT', { id: this.userData.id, position: this.position, rotation: this.rotation, scale: this.scale });
    }

    public DropIt(): void {
        if (!this.parent) {
            console.warn('DIVEModel: DropIt() called on a model that is not in the scene.', this);
            return;
        }

        // calculate the bottom center of the bounding box
        const bottomY = this.boundingBox.min.y * this.scale.y;
        const bbBottomCenter = this.localToWorld(this.boundingBox.getCenter(new Vector3()).multiply(this.scale));
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

    public onMove(): void {
        DIVECommunication.get(this.userData.id)?.PerformAction('UPDATE_OBJECT', { id: this.userData.id, position: this.position, rotation: this.rotation, scale: this.scale });
    }

    public onSelect(): void {
        DIVECommunication.get(this.userData.id)?.PerformAction('SELECT_OBJECT', { id: this.userData.id });
    }

    public onDeselect(): void {
        DIVECommunication.get(this.userData.id)?.PerformAction('DESELECT_OBJECT', { id: this.userData.id });
    }
}
