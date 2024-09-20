import { Box3, BoxGeometry, BufferGeometry, Color, ConeGeometry, CylinderGeometry, Mesh, MeshStandardMaterial, Object3D, Raycaster, SphereGeometry, Vector3, Vector3Like } from 'three';
import { DIVECommunication } from '../com/Communication';
import { PRODUCT_LAYER_MASK } from '../constant/VisibilityLayerMask';
import { findSceneRecursive } from '../helper/findSceneRecursive/findSceneRecursive';
import { type DIVESelectable } from '../interface/Selectable';
import { type DIVEMoveable } from '../interface/Moveable';
import { type TransformControls } from 'three/examples/jsm/controls/TransformControls';
import { type COMGeometry, type COMMaterial } from '../com/types';

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
    readonly isDIVEPrimitive: true = true;
    readonly isSelectable: true = true;
    readonly isMoveable: true = true;

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
        this._mesh.material = new MeshStandardMaterial();
        this.add(this._mesh);

        this._boundingBox = new Box3();
    }

    public SetGeometry(geometry: COMGeometry): void {
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

    public SetMaterial(material: Partial<COMMaterial>): void {
        const primitiveMaterial = this._mesh.material as MeshStandardMaterial;

        if (material.vertexColors !== undefined) {
            primitiveMaterial.vertexColors = material.vertexColors;
        }

        // apply color if supplied
        if (material.color !== undefined) {
            primitiveMaterial.color = new Color(material.color);
        }

        // apply albedo map if supplied
        if (material.map !== undefined) {
            primitiveMaterial.map = material.map;
        }

        // apply normal map
        if (material.normalMap !== undefined) {
            primitiveMaterial.normalMap = material.normalMap;
        }

        // set roughness value
        // if supplied, apply roughness map
        // if we applied a roughness map, set roughness to 1.0
        if (material.roughness !== undefined) {
            primitiveMaterial.roughness = material.roughness;
        }

        if (material.roughnessMap !== undefined) {
            primitiveMaterial.roughnessMap = material.roughnessMap;

            if (primitiveMaterial.roughnessMap) {
                primitiveMaterial.roughness = 1.0;
            }
        }

        // set metalness value
        // if supplied, apply metalness map
        // if we applied a metalness map, set metalness to 1.0
        if (material.metalness !== undefined) {
            primitiveMaterial.metalness = material.metalness;
        }

        if (material.metalnessMap !== undefined) {
            primitiveMaterial.metalnessMap = material.metalnessMap;

            if (primitiveMaterial.metalnessMap) {
                primitiveMaterial.metalness = 0.0;
            }
        }

        // if the mesh is already set, update the material
        if (this._mesh) this._mesh.material = primitiveMaterial;
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

    private assembleGeometry(geometry: COMGeometry): BufferGeometry {
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

    private createCylinderGeometry(geometry: COMGeometry): BufferGeometry {
        const geo = new CylinderGeometry(geometry.width / 2, geometry.width / 2, geometry.height, 64);
        geo.translate(0, geometry.height / 2, 0);
        return geo;
    }

    private createSphereGeometry(geometry: COMGeometry): BufferGeometry {
        const geo = new SphereGeometry(geometry.width / 2, 256, 256);
        return geo;
    }

    private createPyramidGeometry(geometry: COMGeometry): BufferGeometry {
        const geo = new ConeGeometry(geometry.width / 2, geometry.height, 4, 1, true);
        geo.rotateY(Math.PI / 4);
        geo.translate(0, geometry.height / 2, 0);
        return geo;
    }

    private createBoxGeometry(geometry: COMGeometry): BufferGeometry {
        const geo = new BoxGeometry(geometry.width, geometry.height, geometry.depth);
        geo.translate(0, geometry.height / 2, 0);
        return geo;
    }

    private createConeGeometry(geometry: COMGeometry): BufferGeometry {
        const geo = new ConeGeometry(geometry.width / 2, geometry.height, 256);
        geo.translate(0, geometry.height / 2, 0);
        return geo;
    }

    private createWallGeometry(geometry: COMGeometry): BufferGeometry {
        const geo = new BoxGeometry(geometry.width, geometry.height, geometry.depth || 0.05, 16);
        geo.translate(0, geometry.height / 2, 0);
        return geo;
    }

    private createPlaneGeometry(geometry: COMGeometry): BufferGeometry {
        const geo = new BoxGeometry(geometry.width, geometry.height, geometry.depth);
        geo.translate(0, geometry.height / 2, 0);
        return geo;
    }
}
