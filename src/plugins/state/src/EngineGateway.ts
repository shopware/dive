import { Color, MeshStandardMaterial, Vector3 } from 'three/webgpu';
import {
    AmbientLightComponent,
    detachTransformControls,
    DirectionalLightComponent,
    DIVELightComponent,
    DIVENode,
    HemisphereLightComponent,
    MultiLineComponent,
    type DIVELineHandle,
    MeshComponent,
    PrimitiveMeshComponent,
    PointLightComponent,
    type DIVE,
    type DIVEEntityTransformEvent,
    type DIVERoot,
    type DIVESceneObject,
} from '@shopware-ag/dive';
import {
    isCameraSchema,
    isGroupSchema,
    isLightSchema,
    isModelSchema,
    isPrimitiveSchema,
    type EntitySchema,
    type GroupSchema,
    type LightSchema,
    type MinimalSchema,
    type ModelSchema,
    type PartialSchema,
    type PrimitiveSchema,
} from '../types/index.ts';
import { type State } from './State.ts';

/** Link lines start at the group's own origin. */
const ORIGIN = new Vector3();

/**
 * The scene properties that are not entities.
 *
 * They live on three different engine objects — scene, grid and floor — and
 * used to be read and written in three places that had already drifted apart.
 */
export type SceneSettings = {
    name: string;
    backgroundColor: string;
    gridEnabled: boolean;
    floorEnabled: boolean;
    floorColor: string;
};

/**
 * What may be written back.
 *
 * Colours come out as hex strings but go in either way, because three accepts
 * both and callers pass whatever they happen to hold.
 */
export type SceneSettingsPatch = Partial<
    Omit<SceneSettings, 'backgroundColor' | 'floorColor'> & {
        backgroundColor: string | number;
        floorColor: string | number;
    }
>;

/**
 * Vectors arrive as live references into the emitting object, including a
 * scratch buffer the next frame overwrites. `UpdateObjectAction` merges the
 * payload into the registered schema, and lodash assigns by reference when the
 * target key is absent — so without this copy a moving object would keep
 * rewriting its own stored transform.
 */
const copyVec = (v: {
    x: number;
    y: number;
    z: number;
}): { x: number; y: number; z: number } => ({
    x: v.x,
    y: v.y,
    z: v.z,
});

/**
 * #### EngineGateway
 * is the single seam between the state plugin and the engine.
 *
 * The engine holds objects; it does not know what an entity, an action or a
 * state is. Everything that turns entity data into scene objects — and every
 * report travelling back the other way — passes through here.
 *
 * It is not a facade over the engine API. It offers what the state layer
 * needs, in the state layer's vocabulary: entities, scene settings, rendering.
 *
 * @module
 */
export class EngineGateway {
    private readonly _engine: DIVE;
    private readonly _state: State;

    /**
     * One teardown per entity id, so an object that leaves the scene stops
     * reporting. Keyed by id rather than held on the object because
     * `_deleteGroup` re-parents members to the root — those stay registered
     * and have to stay wired.
     */
    private readonly _unsubscribes: Map<string, () => void> = new Map();

    /**
     * The id the toolbox currently holds selected.
     *
     * `SELECT_OBJECT` runs `selectionState.select()`, which calls back into
     * `onSelect()` — this breaks that one loop without silencing the events in
     * general, which would also kill the wanted group cascade.
     */
    private _selectedId: string | null = null;

    /** id -> scene object, so lookups do not walk the tree. */
    private readonly _entities: Map<string, DIVESceneObject> = new Map();

    /**
     * Which link line belongs to which member.
     *
     * Only members of a node that carries a `MultiLineComponent` appear here.
     */
    private readonly _lineHandles: Map<DIVESceneObject, DIVELineHandle> =
        new Map();

    constructor(engine: DIVE, state: State) {
        this._engine = engine;
        this._state = state;
    }

    /** The scene root, for everything that needs the subtree as a whole. */
    public get root(): DIVERoot {
        return this._engine.scene.root;
    }

    // ---------------------------------------------------------------- entities

    /**
     * Resolves an entity id to its scene object.
     *
     * Backed by a map rather than a tree walk: this runs on every frame a gizmo
     * is dragged, via `object-transform` -> `UPDATE_OBJECT` -> `updateEntity`,
     * and a `traverse` visits every mesh of every loaded asset on the way.
     */
    public findEntity(
        entity: MinimalSchema<EntitySchema>,
    ): DIVESceneObject | undefined {
        return this._entities.get(entity.id);
    }

    public async addEntity(
        entity: EntitySchema,
    ): Promise<DIVESceneObject | undefined> {
        const existing = this.findEntity(entity);
        if (existing) {
            console.warn(
                `EngineGateway.addEntity: Scene object with id ${entity.id} already exists`,
            );
            return existing;
        }

        // A camera is state-only, there is nothing to put in the scene.
        if (isCameraSchema(entity)) return undefined;

        const sceneObject = this._instantiate(entity);

        sceneObject.name = entity.name;
        sceneObject.userData.id = entity.id;
        this._entities.set(entity.id, sceneObject);
        this.root.add(sceneObject);

        // Wired before the schema is applied, not after: applying a model
        // schema awaits `setFromURL`, and that is exactly where `object-load`
        // fires. Listening afterwards would miss it.
        this._wire(entity, sceneObject);

        await this._apply(sceneObject, entity);

        return sceneObject;
    }

    public async updateEntity(patch: PartialSchema): Promise<void> {
        const sceneObject = this.findEntity(patch);
        if (!sceneObject) {
            console.warn(
                `EngineGateway.updateEntity: Scene object with id ${patch.id} does not exist`,
            );
            return;
        }

        await this._apply(sceneObject, patch);
    }

    public removeEntity(entity: MinimalSchema<EntitySchema>): void {
        const sceneObject = this.findEntity(entity);
        if (!sceneObject) {
            console.warn(
                `EngineGateway.removeEntity: Object with id ${entity.id} not found`,
            );
            return;
        }

        this._unsubscribes.get(entity.id)?.();
        this._unsubscribes.delete(entity.id);
        this._entities.delete(entity.id);
        this._unlinkFromParent(sceneObject);

        detachTransformControls(sceneObject);

        // Child nodes outlive their parent at the root -- deleting a group must
        // not take its members with it. Their own wiring is keyed by their own id
        // and stays untouched. No group special case needed: every node's child
        // nodes are simply its `nodes`.
        if ('isDIVENode' in sceneObject) {
            const children = (sceneObject as DIVENode).nodes;
            for (let i = children.length - 1; i >= 0; i--) {
                this.root.attach(children[i]);
            }
        }

        sceneObject.parent!.remove(sceneObject);
    }

    /** Drops every listener this gateway ever attached. */
    public dispose(): void {
        this._unsubscribes.forEach((unsubscribe) => unsubscribe());
        this._unsubscribes.clear();
        this._entities.clear();
        this._lineHandles.clear();
    }

    // ----------------------------------------------------------------- scene

    public readSceneSettings(): SceneSettings {
        const scene = this._engine.scene;
        return {
            name: scene.name,
            backgroundColor: '#' + (scene.background as Color).getHexString(),
            gridEnabled: scene.grid.visible,
            floorEnabled: scene.root.floor.visible,
            floorColor:
                '#' +
                (
                    scene.root.floor.material as MeshStandardMaterial
                ).color.getHexString(),
        };
    }

    public applySceneSettings(patch: SceneSettingsPatch): void {
        const scene = this._engine.scene;
        if (patch.name !== undefined) scene.name = patch.name;
        if (patch.backgroundColor !== undefined)
            scene.setBackground(patch.backgroundColor);
        if (patch.gridEnabled !== undefined)
            scene.grid.setVisibility(patch.gridEnabled);
        if (patch.floorEnabled !== undefined)
            scene.root.floor.setVisibility(patch.floorEnabled);
        if (patch.floorColor !== undefined)
            scene.root.floor.setColor(patch.floorColor);
    }

    // ---------------------------------------------------------------- engine

    public startRendering(): Promise<void> {
        return this._engine.startAsync();
    }

    public registerTicker(
        ticker: Parameters<DIVE['clock']['addTicker']>[0],
    ): void {
        if (!this._engine.clock.hasTicker(ticker)) {
            this._engine.clock.addTicker(ticker);
        }
    }

    // --------------------------------------------------------------- private

    /**
     * Builds the node for an entity by composing the components its type needs.
     *
     * This is the whole "which entity type means which capabilities" mapping.
     * Note a `scene` light is not one component but two: a hemisphere and a
     * directional one, each carrying its own intensity factor, which is what
     * lets {@link _applyLight} stay free of per-type branching.
     */
    private _instantiate(entity: EntitySchema): DIVESceneObject {
        if (isModelSchema(entity)) {
            const model = new DIVENode();
            model.name = 'DIVEModel';
            // marks the semantic root for a later re-import of an exported scene
            model.userData.isDIVEModel = true;
            model.addComponent(new MeshComponent());
            return model;
        }
        if (isPrimitiveSchema(entity)) {
            const primitive = new DIVENode();
            primitive.name = 'DIVEPrimitive';
            primitive.addComponent(new PrimitiveMeshComponent());
            return primitive;
        }
        if (isGroupSchema(entity)) {
            const group = new DIVENode();
            group.name = 'DIVEGroup';
            group.addComponent(new MultiLineComponent());
            return group;
        }
        if (isLightSchema(entity)) return this._instantiateLight(entity);

        throw new Error(
            `EngineGateway.addEntity: Unknown entity type: ${(entity as EntitySchema).entityType}`,
        );
    }

    private _instantiateLight(entity: LightSchema): DIVESceneObject {
        const node = new DIVENode();
        node.name = 'DIVELight';

        switch (entity.type) {
            case 'scene':
                node.addComponent(new HemisphereLightComponent());
                node.addComponent(new DirectionalLightComponent());
                break;
            case 'ambient':
                node.addComponent(new AmbientLightComponent());
                break;
            case 'point':
                node.addComponent(new PointLightComponent());
                break;
            default:
                throw new Error(
                    `EngineGateway.addEntity: Unknown light type: ${(entity as LightSchema).type}`,
                );
        }

        return node;
    }

    private async _apply(
        sceneObject: DIVESceneObject,
        patch: PartialSchema,
    ): Promise<void> {
        switch (patch.entityType) {
            case 'camera':
                return;
            case 'light':
                this._applyLight(sceneObject as DIVENode, patch);
                this._refreshParentLink(sceneObject);
                return;
            case 'model':
                await this._applyModel(sceneObject as DIVENode, patch);
                this._refreshParentLink(sceneObject);
                return;
            case 'primitive':
                this._applyPrimitive(sceneObject as DIVENode, patch);
                this._refreshParentLink(sceneObject);
                return;
            case 'group':
                this._applyGroup(sceneObject as DIVENode, patch);
                this._refreshParentLink(sceneObject);
                return;
            default:
                throw new Error(
                    `EngineGateway.updateEntity: Unknown entity type: ${(patch as EntitySchema).entityType}`,
                );
        }
    }

    private _applyLight(
        sceneObject: DIVENode,
        props: PartialSchema<LightSchema>,
    ): void {
        if (props.name !== undefined) sceneObject.name = props.name;

        // setPosition, not position.set: a light is a node like any other entity,
        // so its schema position is a world position. Setting the local vector
        // directly put a light inside a group in group space.
        if (props.position !== undefined && props.position !== null)
            sceneObject.setPosition(props.position);

        // every light component on the node, whatever kind: a scene light has two
        const lights = sceneObject.getComponents(DIVELightComponent);
        lights.forEach((light) => {
            if (props.intensity !== undefined)
                light.setIntensity(props.intensity);
            if (props.enabled !== undefined) light.setEnabled(props.enabled);
            if (props.color !== undefined)
                light.setColor(new Color(props.color));
        });

        if (props.visible !== undefined) sceneObject.visible = props.visible;
        if (props.parentId !== undefined)
            this._setParent({ ...props, parentId: props.parentId });
    }

    private async _applyModel(
        sceneObject: DIVENode,
        model: PartialSchema<ModelSchema>,
    ): Promise<void> {
        // awaited, so callers can tell when the model is actually in the scene.
        // userData.uri holds what is currently loaded, so an update that only
        // moves the model does not fetch the asset again.
        if (model.uri !== undefined && model.uri !== sceneObject.userData.uri) {
            await sceneObject
                .requireComponent(MeshComponent)
                .setFromURL(model.uri);
            sceneObject.userData.uri = model.uri;
        }
        if (model.name !== undefined) sceneObject.name = model.name;
        if (model.position !== undefined && model.position !== null)
            sceneObject.setPosition(model.position);
        if (model.rotation !== undefined && model.rotation !== null)
            sceneObject.setRotation(model.rotation);
        if (model.scale !== undefined && model.scale !== null)
            sceneObject.setScale(model.scale);
        if (model.visible !== undefined)
            sceneObject.setVisibility(model.visible);
        if (model.material !== undefined && model.material !== null)
            sceneObject
                .requireComponent(MeshComponent)
                .setMaterial(model.material);
        if (model.parentId !== undefined)
            this._setParent({ ...model, parentId: model.parentId });
    }

    private _applyPrimitive(
        sceneObject: DIVENode,
        primitive: PartialSchema<PrimitiveSchema>,
    ): void {
        if (primitive.name !== undefined) sceneObject.name = primitive.name;
        if (primitive.geometry !== undefined && primitive.geometry !== null)
            sceneObject
                .requireComponent(PrimitiveMeshComponent)
                .setGeometry(primitive.geometry);
        if (primitive.position !== undefined && primitive.position !== null)
            sceneObject.setPosition(primitive.position);
        if (primitive.rotation !== undefined && primitive.rotation !== null)
            sceneObject.setRotation(primitive.rotation);
        if (primitive.scale !== undefined && primitive.scale !== null)
            sceneObject.setScale(primitive.scale);
        if (primitive.visible !== undefined)
            sceneObject.setVisibility(primitive.visible);
        if (primitive.material !== undefined && primitive.material !== null)
            sceneObject
                .requireComponent(MeshComponent)
                .setMaterial(primitive.material);
        if (primitive.parentId !== undefined)
            this._setParent({ ...primitive, parentId: primitive.parentId });
    }

    private _applyGroup(
        sceneObject: DIVENode,
        props: PartialSchema<GroupSchema>,
    ): void {
        if (props.name !== undefined) sceneObject.name = props.name;
        if (props.position !== undefined && props.position !== null)
            sceneObject.setPosition(props.position);
        if (props.rotation !== undefined && props.rotation !== null)
            sceneObject.setRotation(props.rotation);
        if (props.scale !== undefined && props.scale !== null)
            sceneObject.setScale(props.scale);
        if (props.visible !== undefined)
            sceneObject.setVisibility(props.visible);
        if (props.bbVisible !== undefined)
            sceneObject
                .requireComponent(MultiLineComponent)
                .setVisible(props.bbVisible);
        if (props.parentId !== undefined)
            this._setParent({ ...props, parentId: props.parentId });
    }

    private _setParent(
        entity: MinimalSchema<EntitySchema> & { parentId: string | null },
    ): void {
        const sceneObject = this.findEntity(entity);
        if (!sceneObject) {
            console.warn(
                `EngineGateway._setParent: ${entity.id} is not in the scene`,
            );
            return;
        }

        this._unlinkFromParent(sceneObject);

        if (entity.parentId === null) {
            this.root.attach(sceneObject);
            return;
        }

        const parent = this.findEntity({
            id: entity.parentId,
            entityType: entity.entityType,
        });
        if (!parent) {
            console.warn(
                `EngineGateway._setParent: Parent with id ${entity.parentId} is not in the scene, ${entity.id} stays at the root`,
            );
            return;
        }

        parent.attach(sceneObject);
        this._linkToParent(sceneObject);
    }

    // ------------------------------------------------------------ group links

    /**
     * Draws a link from a group to a member it just gained.
     *
     * Grouping is a state-level idea: the engine only knows that some node holds
     * a `MultiLineComponent`. So the knowledge that "a member gets a line from
     * its parent's origin" lives here, and the line component stays a plain
     * drawing primitive that watches nothing.
     */
    private _linkToParent(sceneObject: DIVESceneObject): void {
        const lines = this._parentLines(sceneObject);
        if (!lines) return;

        this._lineHandles.set(
            sceneObject,
            lines.addLine(ORIGIN, sceneObject.position),
        );
    }

    /** Drops the link a member had to its previous parent. */
    private _unlinkFromParent(sceneObject: DIVESceneObject): void {
        const handle = this._lineHandles.get(sceneObject);
        if (handle === undefined) return;

        this._lineHandles.delete(sceneObject);
        this._parentLines(sceneObject)?.removeLine(handle);
    }

    /**
     * Redraws a member's link after it moved.
     *
     * Called from the transform report and after a patch writes a position, so
     * both a gizmo drag and an `UPDATE_OBJECT` keep the line attached.
     */
    private _refreshParentLink(sceneObject: DIVESceneObject): void {
        const handle = this._lineHandles.get(sceneObject);
        if (handle === undefined) return;

        this._parentLines(sceneObject)?.setLine(
            handle,
            ORIGIN,
            sceneObject.position,
        );
    }

    /** The line component of this object's parent, if it has one. */
    private _parentLines(
        sceneObject: DIVESceneObject,
    ): MultiLineComponent | undefined {
        const parent = sceneObject.parent;
        if (!parent || !('isDIVENode' in parent)) return undefined;

        return (parent as unknown as DIVENode).getComponent(MultiLineComponent);
    }

    /**
     * Subscribe to what the object reports about itself.
     *
     * This closure is the routing: the id comes from the entity that was just
     * created, so nothing has to search for it later. The engine never learns
     * that any of this happens.
     */
    private _wire(entity: EntitySchema, sceneObject: DIVESceneObject): void {
        const { id, entityType } = entity;
        const state = this._state;

        const onTransform = (event: DIVEEntityTransformEvent): void => {
            // a member that moved needs its link to the group redrawn. This is
            // the gizmo path: the object reports its own move.
            this._refreshParentLink(sceneObject);

            void state.performAction('UPDATE_OBJECT', {
                id,
                entityType,
                position: copyVec(event.position),
                rotation: copyVec(event.rotation),
                scale: copyVec(event.scale),
            });
        };

        const onSelect = (): void => {
            if (this._selectedId === id) return;
            this._selectedId = id;
            void state.performAction('SELECT_OBJECT', { id, entityType });
        };

        const onDeselect = (): void => {
            if (this._selectedId !== id) return;
            this._selectedId = null;
            void state.performAction('DESELECT_OBJECT', { id, entityType });
        };

        const onLoad = (): void => {
            state.performAction('MODEL_LOADED', { id });
        };

        sceneObject.addEventListener('object-transform', onTransform);
        sceneObject.addEventListener('object-select', onSelect);
        sceneObject.addEventListener('object-deselect', onDeselect);
        sceneObject.addEventListener('object-load', onLoad);

        this._unsubscribes.set(id, () => {
            sceneObject.removeEventListener('object-transform', onTransform);
            sceneObject.removeEventListener('object-select', onSelect);
            sceneObject.removeEventListener('object-deselect', onDeselect);
            sceneObject.removeEventListener('object-load', onLoad);
            if (this._selectedId === id) this._selectedId = null;
        });
    }
}
