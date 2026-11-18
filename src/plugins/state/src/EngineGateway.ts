import { Color, MeshStandardMaterial, type Vector3Like } from 'three/webgpu';
import {
    AmbientLightComponent,
    BoxColliderComponent,
    MeshColliderComponent,
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
    PROXY_LAYER_MASK,
    SphereColliderComponent,
    SpriteComponent,
    type DIVE,
    type DIVEBackgroundSettings,
    type DIVEImageBasedLightSettings,
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
    type StateBackground,
    type StateImageBasedLight,
} from '../types/index.ts';
import {
    aimCamera,
    readCameraTarget,
} from './helpers/cameraTarget/cameraTarget.ts';
import { GroupLinksComponent } from './components/grouplinks/GroupLinksComponent.ts';
import { updateParentLink } from './helpers/updateParentLink/updateParentLink.ts';
import lightBulbUrl from '../../../../assets/svg/light-bulb.svg?url';

/** The edge length of a point light's bulb, in metres. */
const BULB_SIZE = 0.2;

/** The bulb never gets more opaque than this, however bright the light. */
const MAX_BULB_OPACITY = 0.8;

/** The corners of an axis-aligned rectangle at depth `z`, in order. */
const rectangle = (
    halfWidth: number,
    halfHeight: number,
    z: number,
): Vector3Like[] => [
    { x: -halfWidth, y: -halfHeight, z },
    { x: halfWidth, y: -halfHeight, z },
    { x: halfWidth, y: halfHeight, z },
    { x: -halfWidth, y: halfHeight, z },
];

/** The edges of a closed polygon. */
const outline = (
    corners: Vector3Like[],
): { start: Vector3Like; end: Vector3Like }[] =>
    corners.map((start, i) => ({
        start,
        end: corners[(i + 1) % corners.length],
    }));

/** how far the lens reaches back from its base */
const CAMERA_LENS_DEPTH = 0.15;
/** how deep the body is, behind the lens */
const CAMERA_BODY_DEPTH = 0.25;

/**
 * the lens, a pyramid whose base faces the view and lies in the node's own
 * plane, so the whole icon sits behind the eye
 */
const CAMERA_LENS_BASE = rectangle(0.12, 0.09, 0);
const CAMERA_LENS_APEX: Vector3Like = { x: 0, y: 0, z: -CAMERA_LENS_DEPTH };
/** the body, a box behind the lens, its front face on the apex */
const CAMERA_BODY_FRONT = rectangle(0.1, 0.075, -CAMERA_LENS_DEPTH);
const CAMERA_BODY_BACK = rectangle(
    0.1,
    0.075,
    -CAMERA_LENS_DEPTH - CAMERA_BODY_DEPTH,
);

/**
 * The lines of a camera's icon, in the node's own space, looking along +Z:
 * `Object3D.lookAt` turns a non-camera object's +Z towards the target.
 *
 * Nothing lies in front of the node's origin: a view camera moved onto the node
 * looks along +Z, and its near plane is always in front of it, so it never
 * shows its own icon.
 */
const CAMERA_ICON_LINES: { start: Vector3Like; end: Vector3Like }[] = [
    ...outline(CAMERA_BODY_BACK),
    ...outline(CAMERA_BODY_FRONT),
    ...CAMERA_BODY_BACK.map((start, i) => ({
        start,
        end: CAMERA_BODY_FRONT[i],
    })),
    ...CAMERA_LENS_BASE.map((end) => ({ start: CAMERA_LENS_APEX, end })),
    ...outline(CAMERA_LENS_BASE),
];

/**
 * The scene properties that are not entities.
 *
 * They live on three different engine objects — scene, grid and floor — and
 * used to be read and written in three places that had already drifted apart.
 */
export type SceneSettings = {
    name: string;
    background: StateBackground;
    /**
     * The colour when the background is a colour, otherwise `'transparent'`.
     *
     * @deprecated Use `background` instead.
     */
    backgroundColor: string;
    imageBasedLight: StateImageBasedLight;
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
    Omit<
        SceneSettings,
        'background' | 'backgroundColor' | 'imageBasedLight' | 'floorColor'
    > & {
        /** Wins over `backgroundColor` when both are given. */
        background: DIVEBackgroundSettings;
        /** @deprecated Use `background` instead. */
        backgroundColor: string | number;
        /** `null` turns the image based light off. */
        imageBasedLight: Partial<DIVEImageBasedLightSettings> | null;
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
     * @returns The scene object.
     */
    public createEntity(entity: EntitySchema): DIVESceneObject {
        const existing = this.findEntity(entity);
        if (existing) {
            console.warn(
                `EngineGateway.createEntity: Scene object with id ${entity.id} already exists`,
            );
            return existing;
        }

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
        const background = this._readBackground();
        return {
            name: scene.name,
            background,
            backgroundColor:
                typeof background === 'string' ? background : 'transparent',
            imageBasedLight: this._readImageBasedLight(),
            gridEnabled: scene.grid.visible,
            floorEnabled: scene.root.floor.visible,
            floorColor:
                '#' +
                (
                    scene.root.floor.material as MeshStandardMaterial
                ).color.getHexString(),
        };
    }

    /**
     * Writes what the patch carries onto the scene.
     *
     * @returns Resolves once every image the patch asked for has loaded.
     */
    public async applySceneSettings(patch: SceneSettingsPatch): Promise<void> {
        const scene = this._engine.scene;
        const loads: Promise<void>[] = [];

        if (patch.name !== undefined) scene.name = patch.name;
        if (patch.background !== undefined) {
            loads.push(scene.setBackground(patch.background));
        } else if (patch.backgroundColor !== undefined) {
            loads.push(scene.setBackground(patch.backgroundColor));
        }
        if (patch.imageBasedLight !== undefined)
            loads.push(scene.setImageBasedLight(patch.imageBasedLight));
        if (patch.gridEnabled !== undefined)
            scene.grid.setVisibility(patch.gridEnabled);
        if (patch.floorEnabled !== undefined)
            scene.root.floor.setVisibility(patch.floorEnabled);
        if (patch.floorColor !== undefined)
            scene.root.floor.setColor(patch.floorColor);

        await Promise.all(loads);
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

    /** what the state stores of the background */
    private _readBackground(): StateBackground {
        const background = this._engine.scene.getBackground();
        if (background === null) return null;
        if (background.type === 'color')
            return '#' + background.color.getHexString();
        return { image: background.image, rotation: background.rotation };
    }

    /** what the state stores of the image based light */
    private _readImageBasedLight(): StateImageBasedLight {
        const light = this._engine.scene.imageBasedLight;
        if (light === null) return null;
        return {
            image: light.image,
            rotation: light.rotation,
            intensity: light.intensity,
        };
    }

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
            model.addComponent(new MeshColliderComponent());
            return model;
        }
        if (isPrimitiveSchema(entity)) {
            const primitive = new DIVENode();
            primitive.name = 'DIVEPrimitive';
            primitive.addComponent(new PrimitiveComponent());
            primitive.addComponent(new MeshColliderComponent());
            return primitive;
        }
        if (isGroupSchema(entity)) {
            const group = new DIVENode();
            group.name = 'DIVEGroup';
            group.addComponent(new GroupLinksComponent());
            return group;
        }
        if (isLightSchema(entity)) return this._instantiateLight(entity);
        if (isCameraSchema(entity)) {
            const camera = new DIVENode();
            camera.name = 'DIVECamera';
            const icon = camera.addComponent(new MultiLineComponent());
            CAMERA_ICON_LINES.forEach(({ start, end }, i) =>
                icon.setLineFor(i, start, end),
            );

            // spanned once, the icon does not change
            icon.computeBoundingBox();
            const collider = camera.addComponent(new BoxColliderComponent());
            collider.layers.mask = PROXY_LAYER_MASK;
            collider.set(icon.boundingBox!.min, icon.boundingBox!.max);
            return camera;
        }

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
            case 'point': {
                node.addComponent(new PointLightComponent());

                const bulb = node
                    .addComponent(new SpriteComponent())
                    .setSize(BULB_SIZE, BULB_SIZE)
                    .setOpacity(MAX_BULB_OPACITY);
                bulb.setImage(lightBulbUrl).catch((error: unknown) => {
                    // nobody awaits a composition, so this is the only report
                    console.error('EngineGateway: light bulb failed', error);
                });

                // the bulb faces the camera, so a sphere fits it from every side
                const collider = node.addComponent(
                    new SphereColliderComponent(),
                );
                collider.layers.mask = PROXY_LAYER_MASK;
                collider.radius = BULB_SIZE / 2;
                break;
            }
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
        const node = sceneObject as DIVENode;

        /** read before the move, so a camera keeps looking at its target */
        const cameraTarget =
            patch.entityType === 'camera'
                ? (patch.target ?? readCameraTarget(node))
                : undefined;

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
            case 'camera':
                // aimed after the transform, see below
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
        if (cameraTarget !== undefined) aimCamera(node, cameraTarget);
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

        // a point light's bulb shows its colour and fades with its intensity
        const bulb = sceneObject.getComponent(SpriteComponent);
        if (!bulb) return;
        if (props.color !== undefined) bulb.setColor(props.color);
        if (props.intensity !== undefined)
            bulb.setOpacity(
                Math.min(props.intensity * MAX_BULB_OPACITY, MAX_BULB_OPACITY),
            );
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
                .requireComponent(GroupLinksComponent)
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
