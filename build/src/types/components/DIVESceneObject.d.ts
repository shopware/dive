import { DIVEGroup } from '../../components/group/Group.ts';
import { DIVEModel } from '../../components/model/Model.ts';
import { DIVEPrimitive } from '../../components/primitive/Primitive.ts';
import { DIVELight } from './DIVELight.ts';
import { EntityTypeSchema } from '../index.ts';
export type DIVESceneObject<T extends EntityTypeSchema | void = void> = T extends 'model' ? DIVEModel : T extends 'group' ? DIVEGroup : T extends 'primitive' ? DIVEPrimitive : T extends 'light' ? DIVELight : DIVEModel | DIVEGroup | DIVEPrimitive | DIVELight;
