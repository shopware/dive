import { Box3, BoxGeometry, BufferGeometry, CylinderGeometry, Float32BufferAttribute, Mesh, Object3D, Raycaster, SphereGeometry, Uint32BufferAttribute, Vector3, Vector3Like } from 'three';
import DIVECommunication from '../com/Communication';
import { PRODUCT_LAYER_MASK } from '../constant/VisibilityLayerMask';
import { findSceneRecursive } from '../helper/findSceneRecursive/findSceneRecursive';
import { type DIVESelectable } from '../interface/Selectable';
import { type DIVEMoveable } from '../interface/Moveable';
import { type TransformControls } from 'three/examples/jsm/controls/TransformControls';

export type DIVEPrimitiveGeometry = {
    name: string
    width: number;
    height: number;
    depth: number;
};

/**
 * A basic model class.
 *
 * It does calculate it's own bounding box which is used for positioning on the floor.
 *
 * Can be moved and selected.
 *
 * @module
 */

export class DIVEPrimitive extends Object3D implements DIVESelectable, DIVEMoveable {
    public isSelectable: true = true;
    public isMoveable: true = true;

    public gizmo: TransformControls | null = null;

    private _mesh: Mesh;
    private _boundingBox: Box3;

    constructor() {
        super();

        this.layers.mask = PRODUCT_LAYER_MASK;

        this._mesh = new Mesh();
        this._mesh.layers.mask = PRODUCT_LAYER_MASK;
        this._mesh.castShadow = true;
        this._mesh.receiveShadow = true;
        this.add(this._mesh);

        this._boundingBox = new Box3();
    }

    public SetBufferGeometry(geometry: DIVEPrimitiveGeometry): void {
        this.clear();

        this._mesh.geometry = this.assembleGeometry(geometry);
        this._boundingBox.setFromObject(this._mesh);
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

    public SetToWorldOrigin(): void {
        this.position.set(0, 0, 0);
        DIVECommunication.get(this.userData.id)?.PerformAction('UPDATE_OBJECT', { id: this.userData.id, position: this.position, rotation: this.rotation, scale: this.scale });
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

    public onMove(): void {
        DIVECommunication.get(this.userData.id)?.PerformAction('UPDATE_OBJECT', { id: this.userData.id, position: this.position, rotation: this.rotation, scale: this.scale });
    }

    public onSelect(): void {
        DIVECommunication.get(this.userData.id)?.PerformAction('SELECT_OBJECT', { id: this.userData.id });
    }

    public onDeselect(): void {
        DIVECommunication.get(this.userData.id)?.PerformAction('DESELECT_OBJECT', { id: this.userData.id });
    }

    private assembleGeometry(geometry: DIVEPrimitiveGeometry): BufferGeometry {
        switch (geometry.name) {
            case 'cylinder':
                return this.createCylinderGeometry(geometry);
            case 'sphere':
                return this.createSphereGeometry(geometry);
            case 'pyramid':
                return this.createPyramidGeometry(geometry);
            case 'box':
                return this.createBoxGeometry(geometry);
            case 'cone':
                return this.createConeGeometry(geometry);
            case 'wall':
                return this.createWallGeometry(geometry);
            case 'plane':
                return this.createPlaneGeometry(geometry);
            default:
                return new BufferGeometry();
        }
    }

    private createCylinderGeometry(geometry: DIVEPrimitiveGeometry): BufferGeometry {
        const geo = new CylinderGeometry(geometry.width * 2, geometry.width * 2, geometry.height, 64);
        return geo;
    }

    private createSphereGeometry(geometry: DIVEPrimitiveGeometry): BufferGeometry {
        const geo = new SphereGeometry(geometry.width * 2, 64);
        return geo;
    }

    private createPyramidGeometry(geometry: DIVEPrimitiveGeometry): BufferGeometry {
        const geo = new BufferGeometry();
        const { width, height, depth } = geometry;
        geo.setAttribute('position', new Float32BufferAttribute([
            width / 2, 0, depth / 2, // right back
            width / 2, 0, -depth / 2, // right front
            -width / 2, 0, -depth / 2, // left front
            -width / 2, 0, depth / 2, // left back
            0, height, 0, // top
        ], 3));
        geo.setIndex(new Uint32BufferAttribute([
            1, 0, 4,
            2, 1, 4,
            3, 2, 4,
            3, 0, 4,
            0, 1, 2,
            0, 2, 3,
        ], 1));
        return geo;
    }

    private createBoxGeometry(geometry: DIVEPrimitiveGeometry): BufferGeometry {
        const geo = new BoxGeometry(geometry.width, geometry.height, geometry.depth);
        return geo;
    }

    private createConeGeometry(geometry: DIVEPrimitiveGeometry): BufferGeometry {
        const geo = new CylinderGeometry(0, geometry.width * 2, geometry.height, 64);
        return geo;
    }

    private createWallGeometry(geometry: DIVEPrimitiveGeometry): BufferGeometry {
        const geo = new BoxGeometry(geometry.width, geometry.height, geometry.depth, 16);
        return geo;
    }

    private createPlaneGeometry(geometry: DIVEPrimitiveGeometry): BufferGeometry {
        const geo = new BoxGeometry(geometry.width, geometry.height, geometry.depth);
        return geo;
    }
}