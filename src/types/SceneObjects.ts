import { DIVEGroup } from '../components/group/Group';
import { DIVEAmbientLight } from '../components/light/AmbientLight';
import { DIVEPointLight } from '../components/light/PointLight';
import { DIVESceneLight } from '../components/light/SceneLight';
import { DIVEModel } from '../components/model/Model';
import { DIVEPrimitive } from '../components/primitive/Primitive';

export type DIVESceneObject =
    | DIVEModel
    | DIVEGroup
    | DIVEPrimitive
    | DIVEAmbientLight
    | DIVEPointLight
    | DIVESceneLight;
