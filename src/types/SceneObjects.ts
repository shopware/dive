import { DIVEGroup } from "../group/Group";
import DIVEAmbientLight from "../light/AmbientLight";
import DIVEPointLight from "../light/PointLight";
import DIVESceneLight from "../light/SceneLight";
import { DIVEModel } from "../model/Model";
import { DIVEPrimitive } from "../primitive/Primitive";

export type DIVESceneObject =
    DIVEModel
    | DIVEGroup
    | DIVEPrimitive
    | DIVEAmbientLight
    | DIVEPointLight
    | DIVESceneLight;