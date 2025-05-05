import { DIVEGroup } from '../components/group/Group.ts';
import { DIVEAmbientLight } from '../components/light/AmbientLight.ts';
import { DIVEPointLight } from '../components/light/PointLight.ts';
import { DIVESceneLight } from '../components/light/SceneLight.ts';
import { DIVEModel } from '../components/model/Model.ts';
import { DIVEPrimitive } from '../components/primitive/Primitive.ts';
export type DIVESceneObject = DIVEModel | DIVEGroup | DIVEPrimitive | DIVEAmbientLight | DIVEPointLight | DIVESceneLight;
