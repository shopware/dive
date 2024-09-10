import { BufferGeometry, Object3D } from "three";
import { DIVEPrimitive } from "../../../primitive/Primitive.ts";
import type DIVEScene from "../../Scene.ts";
import { type COMPrimitive } from "../../../com/types.ts";
import { type TransformControls } from "three/examples/jsm/controls/TransformControls";

/**
 * A basic scene node to hold all models.
 *
 * @module
 */
export class DIVEPrimitiveRoot extends Object3D {
    constructor() {
        super();
        this.name = "PrimitiveRoot";
    }

    public GetPrimitive(object: Partial<COMPrimitive>): Object3D | undefined {
        if (object.id === undefined) {
            console.warn('PrimititveRoot.GetPrimitive: object.id is undefined')
            return undefined;
        }
        return this.children.find(object3D => object3D.userData.id === object.id);
    }

    public UpdatePrimitive(object: Partial<COMPrimitive>): void {
        if (object.id === undefined) {
            console.warn('PrimititveRoot.UpdatePrimitive: object.id is undefined')
            return;
        }

        let sceneObject = this.children.find(object3D => object3D.userData.id === object.id);
        if (!sceneObject && object.uri !== undefined) {
            const model = new DIVEPrimitive();
            sceneObject = model;
            sceneObject.userData.id = object.id;
            this.add(sceneObject);


            model.SetBufferGeometry(new BufferGeometry());
        }

        if (object.position !== undefined) (sceneObject as DIVEPrimitive).SetPosition(object.position);
        if (object.rotation !== undefined) (sceneObject as DIVEPrimitive).SetRotation(object.rotation);
        if (object.scale !== undefined) (sceneObject as DIVEPrimitive).SetScale(object.scale);
        if (object.visible !== undefined) (sceneObject as DIVEPrimitive).SetVisibility(object.visible);
    }

    public DeletePrimitive(object: Partial<COMPrimitive>): void {
        if (object.id === undefined) {
            console.warn(`PrimititveRoot.DeletePrimitive: object.id is undefined`)
            return;
        }

        const sceneObject = this.children.find(object3D => object3D.userData.id === object.id);
        if (!sceneObject) {
            console.warn(`PrimititveRoot.DeletePrimitive: Model with id ${object.id} not found`);
            return;
        }

        // _______________________________________________________
        // this is only neccessary due to using the old TransformControls instead of the new DIVEGizmo
        const findScene = (object: Object3D): DIVEScene => {
            if (object.parent !== null) {
                return findScene(object.parent);
            };
            return object as DIVEScene;
        }

        const scene = findScene(sceneObject);
        scene.children.find((object) => {
            if ('isTransformControls' in object) {
                (object as TransformControls).detach();
            }
        });
        // _______________________________________________________

        this.remove(sceneObject);
    }

    public PlaceOnFloor(object: Partial<COMPrimitive>): void {
        if (object.id === undefined) console.warn('PrimititveRoot.PlaceOnFloor: object.id is undefined');

        const sceneObject = this.children.find(object3D => object3D.userData.id === object.id);
        if (!sceneObject) return;

        (sceneObject as DIVEPrimitive).PlaceOnFloor();
    }
}