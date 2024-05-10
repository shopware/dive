import { Color, Object3D } from "three";
import { type COMLight } from "../../../com/types.ts";
import DIVEAmbientLight from "../../../light/AmbientLight.ts";
import DIVEPointLight from "../../../light/PointLight.ts";
import type { DIVEMoveable } from "../../../interface/Moveable.ts";
import DIVESceneLight from "../../../light/SceneLight.ts";

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

        if ('isMoveable' in sceneObject) {
            (sceneObject as unknown as DIVEMoveable).gizmo?.detach();
        }

        this.remove(sceneObject);
    }
}
