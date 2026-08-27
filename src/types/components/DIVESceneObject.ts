import { DIVENode } from '../../engine/node/Node.ts';

/**
 * Anything the engine can put in the scene tree.
 *
 * Every entity is a `DIVENode`: what it *is* comes from the components attached
 * to it, not from its class. Lights, models, primitives and groups are all
 * plain nodes with different component sets, and the state plugin's gateway is
 * what decides which set an entity type gets.
 *
 * Kept as a named type because it reads better at the boundary and leaves room
 * to narrow again later.
 */
export type DIVESceneObject = DIVENode;
