import { DIVEModel } from '../../components/model/Model.ts';
import { DIVENode } from '../../components/node/Node.ts';
import { DIVEPrimitive } from '../../components/primitive/Primitive.ts';

/**
 * Anything the engine can put in the scene tree.
 *
 * Deliberately a plain union: the engine knows these classes, not what any of
 * them mean to a state. Picking one of them for a given entity type is the
 * state plugin's job and lives in its gateway.
 *
 * Lights and groups are plain `DIVENode`s carrying components rather than classes
 * of their own, so `DIVENode` covers them -- and covers every other node a
 * caller composes from components.
 */
export type DIVESceneObject = DIVEModel | DIVEPrimitive | DIVENode;
