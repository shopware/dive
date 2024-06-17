import { Box3, Object3D, Raycaster, Vector3, Vector3Like } from 'three';
import { DIVESelectable } from '../interface/Selectable';
import { PRODUCT_LAYER_MASK } from '../constant/VisibilityLayerMask';
import { DIVEMoveable } from '../interface/Moveable';
import DIVECommunication from '../com/Communication';
import type { GLTF, TransformControls } from 'three/examples/jsm/Addons.js';
import { findSceneRecursive } from '../helper/findSceneRecursive/findSceneRecursive';

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

        const bottomY = this.boundingBox.min.y * this.scale.y;
        const bbBottomCenter = this.boundingBox.getCenter(new Vector3()).multiply(this.scale);
        bbBottomCenter.y = bottomY;
        console.log(bbBottomCenter)
        const raycaster = new Raycaster(bbBottomCenter, new Vector3(0, -1, 0), 0, 100);
        const intersections = raycaster.intersectObjects(findSceneRecursive(this).Root.children, true);

        if (intersections.length > 0) {
            const oldPos = this.position.clone();
            this.position.copy(intersections[0].point);
            console.log(this.position, bottomY)
            this.position.y -= bottomY;

            if (this.position.y === oldPos.y) return;

            DIVECommunication.get(this.userData.id)?.PerformAction('UPDATE_OBJECT', { id: this.userData.id, position: this.position, rotation: this.rotation, scale: this.scale });
        }
    }

    public onMove(): void {
        DIVECommunication.get(this.userData.id)?.PerformAction('UPDATE_OBJECT', { id: this.userData.id, position: this.position, rotation: this.rotation, scale: this.scale });
    }
}
