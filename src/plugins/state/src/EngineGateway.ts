import { Color, MeshStandardMaterial } from 'three/webgpu';
import {
    AmbientLightComponent,
    detachTransformControls,
    DirectionalLightComponent,
    disposeComponents,
    DIVELightComponent,
    DIVENode,
    HemisphereLightComponent,
    MultiLineComponent,
    MeshComponent,
    ModelComponent,
    PrimitiveComponent,
    PointLightComponent,
    type DIVE,
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
import { updateParentLink } from './helpers/updateParentLink/updateParentLink.ts';

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
 * #### EngineGateway
 * is the single seam between the state plugin and the engine.
 *
 * The engine holds objects; it does not know what an entity, an action or a
 * state is. Everything that turns entity data into scene objects passes through
 * here.
 *
 * One direction only. Reports coming back the other way are `watchEntity`'s
 * business — which is why this class holds no reference to the state and has no
 * way to command it.
 *
 * It is not a facade over the engine API. It offers what the state layer
 * needs, in the state layer's vocabulary: entities, scene settings, rendering.
 *
 * @module
 */
export class EngineGateway {
    private readonly _engine: DIVE;

    /** id -> scene object, so lookups do not walk the tree. */
    private readonly _entities: Map<string, DIVESceneObject> = new Map();

    constructor(engine: DIVE) {
        this._engine = engine;
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

    /**
     * Puts an empty scene object for this entity into the scene.
     *
     * Separate from {@link applyEntity} because of what happens in between:
     * applying a model schema awaits the asset load, and `object-load` fires
     * inside that await. Whoever wants to hear it has to be listening — and
     * registered, or the report writes to an id the state does not know yet.
     * One combined call left no moment for that.
     *
     * Synchronous, so nothing can slip in front of the caller either.
     *
     * @returns The scene object, or `undefined` for a state-only entity.
     */
    public createEntity(entity: EntitySchema): DIVESceneObject | undefined {
        const existing = this.findEntity(entity);
        if (existing) {
            console.warn(
                `EngineGateway.createEntity: Scene object with id ${entity.id} already exists`,
            );
            return existing;
        }

        // a camera is state-only, there is nothing to put in the scene
        if (isCameraSchema(entity)) return undefined;

        const sceneObject = this._instantiate(entity);

        sceneObject.name = entity.name;
        sceneObject.userData.id = entity.id;
        this._entities.set(entity.id, sceneObject);
        this.root.add(sceneObject);

        return sceneObject;
    }

    /** Writes an entity's data onto the scene object created for it. */
    public async applyEntity(
        sceneObject: DIVESceneObject,
        entity: PartialSchema,
    ): Promise<void> {
        await this._apply(sceneObject, entity);
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

        this._entities.delete(entity.id);

        detachTransformControls(sceneObject);

        /**
         * re-parent the child nodes to the root so deleting a group does not
         * take its members with it
         * they have to leave before the teardown below, or their components
         * would be disposed along with the entity that merely contained them
         */
        if ('isDIVENode' in sceneObject) {
            const children = (sceneObject as DIVENode).nodes;
            for (let i = children.length - 1; i >= 0; i--) {
                this.root.attach(children[i]);
            }
        }

        /**
         * unparenting frees nothing, and a detached node is out of reach of the
         * final `Scene.dispose`, so an add/delete cycle would leak every geometry
         * the entity held
         */
        disposeComponents(sceneObject);

        // removeFromParent, because a node someone else detached has no parent
        sceneObject.removeFromParent();
    }

    /** Forgets every scene object. Listener teardown belongs to the registry. */
    public dispose(): void {
        this._entities.clear();
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
            model.addComponent(new ModelComponent());
            return model;
        }
        if (isPrimitiveSchema(entity)) {
            const primitive = new DIVENode();
            primitive.name = 'DIVEPrimitive';
            primitive.addComponent(new PrimitiveComponent());
            return primitive;
        }
        if (isGroupSchema(entity)) {
            const group = new DIVENode();
            group.name = 'DIVEGroup';
            const lines = group.addComponent(new MultiLineComponent());

            /**
             * the group has to drop the line itself, because Object3D.remove
             * nulls child.parent before announcing anything
             * childremoved also covers re-parenting and contributed content;
             * removeLineFor with an unknown child does nothing
             */
            group.addEventListener('childremoved', (event) =>
                lines.removeLineFor(event.child),
            );

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
        // state-only: there is nothing in the scene to write to
        if (patch.entityType === 'camera') return;

        const node = sceneObject as DIVENode;

        /**
         * what only this kind of entity has, and first, so an unknown type is
         * rejected before anything gets written
         */
        switch (patch.entityType) {
            case 'light':
                this._applyLight(node, patch);
                break;
            case 'model':
                await this._applyModel(node, patch);
                break;
            case 'primitive':
                this._applyPrimitive(node, patch);
                break;
            case 'group':
                this._applyGroup(node, patch);
                break;
            default:
                throw new Error(
                    `EngineGateway.updateEntity: Unknown entity type: ${(patch as EntitySchema).entityType}`,
                );
        }

        /**
         * what every entity with a body in the scene has
         * applyTransform, not position.set: a schema position is a world position
         */
        if (patch.name !== undefined) node.name = patch.name;
        node.applyTransform(patch);
        if (patch.visible !== undefined) node.setVisibility(patch.visible);

        // re-parent last, so the object is fully written before it moves
        if (patch.parentId !== undefined)
            this._setParent({ ...patch, parentId: patch.parentId });

        // redraw the link to the group, since applyTransform reports nothing
        updateParentLink(node);
    }

    private _applyLight(
        sceneObject: DIVENode,
        props: PartialSchema<LightSchema>,
    ): void {
        // every light component on the node, whatever kind: a scene light has two
        const lights = sceneObject.getComponents(DIVELightComponent);
        lights.forEach((light) => {
            if (props.intensity !== undefined)
                light.setIntensity(props.intensity);
            if (props.enabled !== undefined) light.setEnabled(props.enabled);
            if (props.color !== undefined)
                light.setColor(new Color(props.color));
        });
    }

    private async _applyModel(
        sceneObject: DIVENode,
        model: PartialSchema<ModelSchema>,
    ): Promise<void> {
        // userData.uri holds what is loaded, so moving a model does not refetch it
        if (model.uri !== undefined && model.uri !== sceneObject.userData.uri) {
            await sceneObject
                .requireComponent(ModelComponent)
                .setFromURL(model.uri);
            sceneObject.userData.uri = model.uri;
        }

        // after the asset, so it lands on the mesh that was just loaded
        if (model.material !== undefined && model.material !== null)
            sceneObject
                .requireComponent(MeshComponent)
                .setMaterial(model.material);
    }

    private _applyPrimitive(
        sceneObject: DIVENode,
        primitive: PartialSchema<PrimitiveSchema>,
    ): void {
        if (primitive.geometry !== undefined && primitive.geometry !== null)
            sceneObject
                .requireComponent(PrimitiveComponent)
                .setGeometry(primitive.geometry);

        // after the geometry, so it lands on the mesh that was just built
        if (primitive.material !== undefined && primitive.material !== null)
            sceneObject
                .requireComponent(MeshComponent)
                .setMaterial(primitive.material);
    }

    private _applyGroup(
        sceneObject: DIVENode,
        props: PartialSchema<GroupSchema>,
    ): void {
        if (props.linksVisible !== undefined)
            sceneObject
                .requireComponent(MultiLineComponent)
                .setVisible(props.linksVisible);
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
        updateParentLink(sceneObject);
    }
}
