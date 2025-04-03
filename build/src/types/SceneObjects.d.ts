import { DIVEGroup } from '../group/Group';
import { default as DIVEAmbientLight } from '../light/AmbientLight';
import { default as DIVEPointLight } from '../light/PointLight';
import { default as DIVESceneLight } from '../light/SceneLight';
import { DIVEModel } from '../model/Model';
import { DIVEPrimitive } from '../primitive/Primitive';
export type DIVESceneObject = DIVEModel | DIVEGroup | DIVEPrimitive | DIVEAmbientLight | DIVEPointLight | DIVESceneLight;
