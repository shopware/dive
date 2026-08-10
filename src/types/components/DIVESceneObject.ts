import { DIVEGroup } from '../../components/group/Group.ts';
import { DIVEModel } from '../../components/model/Model.ts';
import { DIVEPrimitive } from '../../components/primitive/Primitive.ts';
import { DIVELight } from './DIVELight.ts';

/**
 * Everything that can sit in the scene as a thing of its own.
 *
 * Deliberately a plain union: the engine knows these classes, not what any of
 * them mean to a state. Picking one of them for a given entity type is the
 * state plugin's job and lives in its gateway.
 */
export type DIVESceneObject = DIVEModel | DIVEGroup | DIVEPrimitive | DIVELight;
