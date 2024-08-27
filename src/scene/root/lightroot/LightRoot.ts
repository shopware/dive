import { Color, Object3D } from "three";
import { type COMLight } from "../../../com/types.ts";
import DIVEAmbientLight from "../../../light/AmbientLight.ts";
import DIVEPointLight from "../../../light/PointLight.ts";
import DIVESceneLight from "../../../light/SceneLight.ts";
import { type TransformControls } from "three/examples/jsm/Addons";
import { type DIVEScene } from "../../Scene.ts";

/**
 * A basic scene node to hold all lights.
 *
 * @module
 */

export default class DIVELightRoot extends Object3D {
    constructor() {
        super();
        this.name = "LightRoot";
    }

    public GetLight(object: Partial<COMLight>): Object3D | undefined {
        if (object.id === undefined) {
            console.warn('LightRoot.GetLight: object.id is undefined')
            return undefined;
        }
        return this.children.find(object3D => object3D.userData.id === object.id);
    }

    public UpdateLight(light: Partial<COMLight>): void {
        // update scene here for light
        if (light.id === undefined) {
            console.warn(`LightRoot.UpdateLight: light.id is undefined`)
            return;
        }

        let sceneObject = this.children.find(object3D => object3D.userData.id === light.id);
        if (!sceneObject) {
            switch (light.type) {
                case 'scene': {
                    sceneObject = new DIVESceneLight();
                    break;
                }
                case 'ambient': {
                    sceneObject = new DIVEAmbientLight();
                    break;
                }
                case 'point': {
                    sceneObject = new DIVEPointLight();
                    break;
                }
                default: {
                    console.warn(`LightRoot.UpdateLight: Unknown light type: ${light.type}`);
                    return;
                }
            }
            sceneObject.userData.id = light.id;
            this.add(sceneObject);
        }

        if (light.name !== undefined && light.name !== null) sceneObject.name = light.name;
        if (light.position !== undefined && light.position !== null) sceneObject.position.set(light.position.x, light.position.y, light.position.z);
        if (light.intensity !== undefined && light.intensity !== null) (sceneObject as (DIVEAmbientLight | DIVEPointLight)).SetIntensity(light.intensity);
        if (light.enabled !== undefined && light.enabled !== null) (sceneObject as (DIVEAmbientLight | DIVEPointLight)).SetEnabled(light.enabled);
        if (light.color !== undefined && light.color !== null) (sceneObject as (DIVEAmbientLight | DIVEPointLight)).SetColor(new Color(light.color));
        if (light.visible !== undefined && light.visible !== null) (sceneObject as (DIVEAmbientLight | DIVEPointLight)).visible = light.visible;
    }

    public DeleteLight(light: Partial<COMLight>): void {
        if (light.id === undefined) {
            console.warn('LightRoot.DeleteLight: light.id is undefined')
            return;
        }

        const sceneObject = this.children.find(object3D => object3D.userData.id === light.id);
        if (!sceneObject) {
            console.warn(`LightRoot.DeleteLight: Light with id ${light.id} not found`);
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
}
