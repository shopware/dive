import { ShadowMapType, ToneMapping, WebGLRenderer, Scene, Camera, PerspectiveCamera, Box3, Vector3Like, Texture, Object3D, Color, Mesh, ColorRepresentation, Intersection, Vector2, Raycaster, Vector3 } from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { Tween } from '@tweenjs/tween.js';
import { TransformControls } from 'three/examples/jsm/controls/TransformControls';
import { TransformControls as TransformControls$1, GLTF } from 'three/examples/jsm/Addons.js';
import { TransformControls as TransformControls$2 } from 'three/examples/jsm/Addons';

type DIVERendererSettings = {
    antialias: boolean;
    alpha: boolean;
    stencil: boolean;
    shadowMapEnabled: boolean;
    shadowMapType: ShadowMapType;
    toneMapping: ToneMapping;
    canvas?: HTMLCanvasElement;
};
/**
 * A changed version of the WebGLRenderer.
 *
 * Has to be started manually by calling StartRenderer().
 *
 * @module
 */
declare class DIVERenderer extends WebGLRenderer {
    private paused;
    private running;
    private force;
    private preRenderCallbacks;
    private postRenderCallbacks;
    constructor(rendererSettings?: Partial<DIVERendererSettings>);
    Dispose(): void;
    StartRenderer(scene: Scene, cam: Camera): void;
    PauseRenderer(): void;
    ResumeRenderer(): void;
    StopRenderer(): void;
    OnResize(width: number, height: number): void;
    /**
     * Adds a callback to the render loop before actual render call.
     * @param callback Executed before rendering.
     * @returns uuid to remove the callback.
     */
    AddPreRenderCallback(callback: () => void): string;
    /**
     * Removes a callback from the render loop before actual render call.
     * @param uuid of callback to remove.
     * @returns if removing was successful.
     */
    RemovePreRenderCallback(uuid: string): boolean;
    /**
     * Adds a callback to the render loop after actual render call.
     * @param callback Executed after rendering.
     * @returns uuid to remove the callback.
     */
    AddPostRenderCallback(callback: () => void): string;
    /**
     * Removes a callback from the render loop after actual render call.
     * @param uuid of callback to remove.
     * @returns if removing was successful.
     */
    RemovePostRenderCallback(uuid: string): boolean;
    /**
     * Forces the renderer to render the next frame.
     */
    ForceRendering(): void;
    /**
     * Internal render loop.
     *
     * To control renderloop you can add callbacks via AddPreRenderCallback() and AddPostRenderCallback().
     * @param scene Scene to render.
     * @param cam Camera to render with.
     */
    private internal_render;
}

type DIVEPerspectiveCameraSettings = {
    fov: number;
    near: number;
    far: number;
};
/**
 * A Perspective camera. Can change the layer mask to show different objects.
 *
 * @module
 */
declare class DIVEPerspectiveCamera extends PerspectiveCamera {
    static readonly EDITOR_VIEW_LAYER_MASK: number;
    static readonly LIVE_VIEW_LAYER_MASK = 16;
    onSetCameraLayer: (mask: number) => void;
    constructor(settings?: Partial<DIVEPerspectiveCameraSettings>);
    OnResize(width: number, height: number): void;
    SetCameraLayer(layer: 'LIVE' | 'EDITOR'): void;
}

/**
 * Updates all animations.
 * DIVE uses Tween.js to handle animations.
 *
 * @module
 */
declare class DIVEAnimationSystem {
    private _renderer;
    private _rendererCallbackId;
    constructor(renderer: DIVERenderer);
    Dispose(): void;
    Update(): void;
    Animate<T extends object>(object: T): Tween<T>;
}

type DIVEOrbitControlsSettings = {
    enableDamping: boolean;
    dampingFactor: number;
};
/**
 * Orbit Controls. Basic functionality to orbit around a given target point in the scene.
 *
 * @module
 */
declare class DIVEOrbitControls extends OrbitControls {
    static readonly DEFAULT_ZOOM_FACTOR = 1;
    private _animationSystem;
    private last;
    private animating;
    private locked;
    private stopMoveTo;
    private stopRevertLast;
    object: DIVEPerspectiveCamera;
    domElement: HTMLCanvasElement;
    private _removePreRenderCallback;
    constructor(camera: DIVEPerspectiveCamera, renderer: DIVERenderer, animationSystem: DIVEAnimationSystem, settings?: Partial<DIVEOrbitControlsSettings>);
    Dispose(): void;
    ComputeEncompassingView(bb: Box3): {
        position: Vector3Like;
        target: Vector3Like;
    };
    ZoomIn(by?: number): void;
    ZoomOut(by?: number): void;
    MoveTo(pos: Vector3Like | undefined, target: Vector3Like | undefined, duration: number, lock: boolean): void;
    RevertLast(duration: number): void;
    private preRenderCallback;
}

interface SET_BACKGROUND {
    'PAYLOAD': {
        color: string | number;
    };
    'RETURN': boolean;
}

interface RESET_CAMERA {
    'PAYLOAD': {
        duration: number;
    };
    'RETURN': boolean;
}

interface SET_CAMERA_LAYER {
    'PAYLOAD': {
        layer: 'LIVE' | 'EDITOR';
    };
    'RETURN': boolean;
}

interface ZOOM_CAMERA {
    'PAYLOAD': {
        direction: 'IN' | 'OUT';
        by: number;
    };
    'RETURN': boolean;
}

interface SET_GIZMO_MODE {
    'PAYLOAD': {
        mode: 'translate' | 'rotate' | 'scale';
    };
    'RETURN': boolean;
}

interface SET_CAMERA_TRANSFORM {
    'PAYLOAD': {
        position: Vector3Like;
        target: Vector3Like;
    };
    'RETURN': boolean;
}

interface MOVE_CAMERA {
    'PAYLOAD': {
        position: Vector3Like;
        target: Vector3Like;
        locked: boolean;
        duration: number;
    } | {
        id: string;
        locked: boolean;
        duration: number;
    };
    'RETURN': boolean;
}

interface PLACE_ON_FLOOR {
    'PAYLOAD': {
        id: string;
    };
    'RETURN': boolean;
}

type COMEntityType = 'pov' | 'light' | 'model' | 'primitive' | 'group';

type COMBaseEntity = {
    id: string;
    name: string;
    entityType: COMEntityType;
    visible: boolean;
    parent?: Partial<COMBaseEntity> & {
        id: string;
    } | null;
};

type COMPov = COMBaseEntity & {
    position: Vector3Like;
    target: Vector3Like;
    locked?: boolean;
};

type COMLight = COMBaseEntity & {
    type: 'ambient' | 'point' | 'scene';
    intensity: number;
    color: string | number;
    enabled: boolean;
    position?: Vector3Like;
};

type COMMaterial = {
    vertexColors: boolean;
    color: string | number;
    map: Texture | null;
    normalMap: Texture | null;
    roughness: number;
    roughnessMap: Texture | null;
    metalness: number;
    metalnessMap: Texture | null;
};

type COMModel = COMBaseEntity & {
    uri: string;
    position: Vector3Like;
    rotation: Vector3Like;
    scale: Vector3Like;
    loaded: boolean;
    material?: Partial<COMMaterial>;
};

type COMGeometry = {
    name: string;
    width: number;
    height: number;
    depth: number;
};

type COMPrimitive = COMBaseEntity & {
    position: Vector3Like;
    rotation: Vector3Like;
    scale: Vector3Like;
    geometry: COMGeometry;
    material?: Partial<COMMaterial>;
};

type COMGroup = COMBaseEntity & {
    position: Vector3Like;
    rotation: Vector3Like;
    scale: Vector3Like;
    bbVisible?: boolean;
};

type COMEntity = COMPov | COMLight | COMModel | COMPrimitive | COMGroup;

interface GET_ALL_OBJECTS {
    'PAYLOAD': Map<string, COMEntity>;
    'RETURN': Map<string, COMEntity>;
}

interface GET_OBJECTS {
    'PAYLOAD': {
        ids: string[];
    };
    'RETURN': COMEntity[];
}

interface ADD_OBJECT {
    'PAYLOAD': COMEntity;
    'RETURN': boolean;
}

interface DELETE_OBJECT {
    'PAYLOAD': Partial<COMEntity> & {
        id: string;
    };
    'RETURN': boolean;
}

interface UPDATE_OBJECT {
    'PAYLOAD': Partial<COMEntity> & {
        id: string;
    };
    'RETURN': boolean;
}

interface MODEL_LOADED {
    'PAYLOAD': {
        id: string;
    };
    'RETURN': boolean;
}

interface UPDATE_SCENE {
    'PAYLOAD': {
        name?: string;
        backgroundColor?: string | number;
        gridEnabled?: boolean;
        floorEnabled?: boolean;
        floorColor?: string | number;
    };
    'RETURN': boolean;
}

interface GENERATE_MEDIA {
    'PAYLOAD': ({
        position: Vector3Like;
        target: Vector3Like;
    } | {
        id: string;
    }) & {
        width: number;
        height: number;
        dataUri: string;
    };
    'RETURN': boolean;
}

type SceneData = {
    name: string;
    mediaItem: null;
    backgroundColor: string;
    floorEnabled: boolean;
    floorColor: string;
    userCamera: {
        position: Vector3Like;
        target: Vector3Like;
    };
    spotmarks: object[];
    lights: COMLight[];
    objects: COMModel[];
    cameras: COMPov[];
    primitives: COMPrimitive[];
};
interface GET_ALL_SCENE_DATA {
    'PAYLOAD': object;
    'RETURN': SceneData;
}

interface SELECT_OBJECT {
    'PAYLOAD': Partial<COMEntity> & {
        id: string;
    };
    'RETURN': boolean;
}

interface DESELECT_OBJECT {
    'PAYLOAD': Partial<COMEntity> & {
        id: string;
    };
    'RETURN': boolean;
}

interface GET_CAMERA_TRANSFORM {
    'PAYLOAD': object;
    'RETURN': {
        position: Vector3Like;
        target: Vector3Like;
    };
}

interface DROP_IT {
    'PAYLOAD': {
        id: string;
    };
    'RETURN': boolean;
}

interface SET_GIZMO_VISIBILITY {
    'PAYLOAD': boolean;
    'RETURN': boolean;
}

interface COMPUTE_ENCOMPASSING_VIEW {
    'PAYLOAD': object;
    'RETURN': {
        position: Vector3Like;
        target: Vector3Like;
    };
}

/**
 * Interface for objects that can be moved in the scene.
 *
 * @module
 */
interface DIVEMovable {
    isMovable: true;
    onMoveStart?: () => void;
    onMove?: () => void;
    onMoveEnd?: () => void;
}

/**
 * Interface for objects that can be selected in the scene.
 *
 * @module
 */
interface DIVESelectable {
    isSelectable: true;
    onSelect?: () => void;
    onDeselect?: () => void;
}

declare class DIVENode extends Object3D implements DIVESelectable, DIVEMovable {
    readonly isDIVENode: true;
    readonly isSelectable: true;
    readonly isMovable: true;
    gizmo: TransformControls | null;
    protected _boundingBox: Box3;
    constructor();
    SetPosition(position: Vector3Like): void;
    SetRotation(rotation: Vector3Like): void;
    SetScale(scale: Vector3Like): void;
    SetVisibility(visible: boolean): void;
    SetToWorldOrigin(): void;
    onMove(): void;
    onSelect(): void;
    onDeselect(): void;
}

declare class DIVEGroup extends DIVENode {
    readonly isDIVEGroup: true;
    private _members;
    private _lines;
    constructor();
    SetLinesVisibility(visible: boolean, object?: Object3D): void;
    attach(object: DIVESceneObject): this;
    remove(object: DIVESceneObject): this;
    UpdateLineTo(object: Object3D): void;
    /**
     * Adds a line to this grouo as last child.
     */
    private createLine;
    /**
     * Updates a line to the object.
     */
    private updateLineTo;
}

/**
 * A basic ambient light.
 *
 * Can change the color, intensity, and visibility of the light.
 *
 * @module
 */
declare class DIVEAmbientLight extends Object3D {
    readonly isDIVELight: true;
    readonly isDIVEAmbientLight: true;
    private _light;
    constructor();
    SetColor(color: Color): void;
    SetIntensity(intensity: number): void;
    SetEnabled(enabled: boolean): void;
}

/**
 * A basic point light.
 *
 * Can change the color, intensity, and visibility of the light.
 *
 * Can be moved and selected.
 *
 * @module
 */
declare class DIVEPointLight extends Object3D implements DIVESelectable, DIVEMovable {
    readonly isDIVELight: true;
    readonly isDIVEPointLight: true;
    readonly isMovable: true;
    readonly isSelectable: true;
    gizmo: TransformControls$1 | null;
    private light;
    private mesh;
    constructor();
    SetColor(color: Color): void;
    SetIntensity(intensity: number): void;
    SetEnabled(enabled: boolean): void;
    onMove(): void;
    onSelect(): void;
    onDeselect(): void;
}

/**
 * A complex scene light.
 *
 * Can change the color, intensity, and visibility of the light.
 *
 * @module
 */
declare class DIVESceneLight extends Object3D {
    readonly isDIVELight: true;
    readonly isDIVESceneLight: true;
    private _hemiLight;
    private _dirLight;
    constructor();
    SetColor(color: Color): void;
    SetIntensity(intensity: number): void;
    SetEnabled(enabled: boolean): void;
}

/**
 * A basic model class.
 *
 * It does calculate it's own bounding box which is used for positioning on the floor.
 *
 * Can be moved and selected.
 *
 * @module
 */
declare class DIVEModel extends DIVENode {
    readonly isDIVEModel: true;
    private _mesh;
    private _material;
    SetModel(gltf: GLTF): void;
    SetMaterial(material: Partial<COMMaterial>): void;
    PlaceOnFloor(): void;
    DropIt(): void;
}

/**
 * A basic model class.
 *
 * It does calculate it's own bounding box which is used for positioning on the floor.
 *
 * Can be moved and selected.
 *
 * @module
 */
declare class DIVEPrimitive extends DIVENode {
    readonly isDIVEPrimitive: true;
    private _mesh;
    constructor();
    SetGeometry(geometry: COMGeometry): void;
    SetMaterial(material: Partial<COMMaterial>): void;
    PlaceOnFloor(): void;
    DropIt(): void;
    private assembleGeometry;
    private createCylinderGeometry;
    private createSphereGeometry;
    private createPyramidGeometry;
    private createBoxGeometry;
    private createConeGeometry;
    private createWallGeometry;
    private createPlaneGeometry;
}

type DIVESceneObject = DIVEModel | DIVEGroup | DIVEPrimitive | DIVEAmbientLight | DIVEPointLight | DIVESceneLight;

/**
 * A basic scene node to hold grid, floor and all lower level roots.
 *
 * @module
 */
declare class DIVERoot extends Object3D {
    readonly isDIVERoot: true;
    private loadingManager;
    constructor();
    ComputeSceneBB(): Box3;
    GetSceneObject<T extends DIVESceneObject>(object: Partial<COMEntity> & {
        id: string;
    }): T | undefined;
    AddSceneObject(object: COMEntity): void;
    UpdateSceneObject(object: Partial<COMEntity> & {
        id: string;
    }): void;
    DeleteSceneObject(object: Partial<COMEntity> & {
        id: string;
    }): void;
    PlaceOnFloor(object: Partial<COMEntity> & {
        id: string;
    }): void;
    private updateLight;
    private updateModel;
    private updatePrimitive;
    private updateGroup;
    private deleteLight;
    private deleteModel;
    private deletePrimitive;
    private deleteGroup;
    private placeOnFloor;
    private setParent;
    private detachTransformControls;
    private findScene;
}

/**
 * A basic grid for the scene.
 *
 * @module
 */
declare class DIVEGrid extends Object3D {
    constructor();
    SetVisibility(visible: boolean): void;
}

/**
 * A basic floor geometry.
 *
 * Can change the color and visibility of the floor.
 *
 * @module
 */
declare class DIVEFloor extends Mesh {
    isFloor: true;
    constructor();
    SetVisibility(visible: boolean): void;
    SetColor(color: ColorRepresentation): void;
}

/**
 * A basic scene class.
 *
 * Comes with a root object that contains all the scene objects.
 *
 * @module
 */
declare class DIVEScene extends Scene {
    private root;
    private floor;
    private grid;
    get Root(): DIVERoot;
    get Floor(): DIVEFloor;
    get Grid(): DIVEGrid;
    constructor();
    SetBackground(color: ColorRepresentation): void;
    ComputeSceneBB(): Box3;
    GetSceneObject<T extends DIVESceneObject>(object: Partial<COMEntity> & {
        id: string;
    }): T | undefined;
    AddSceneObject(object: COMEntity): void;
    UpdateSceneObject(object: Partial<COMEntity> & {
        id: string;
    }): void;
    DeleteSceneObject(object: Partial<COMEntity> & {
        id: string;
    }): void;
    PlaceOnFloor(object: Partial<COMModel> & {
        id: string;
    }): void;
}

/**
 * Interface for objects that can be hovered in the scene.
 *
 * @module
 */

interface DIVEDraggable {
    isDraggable: true;
    onDragStart?: (e: DraggableEvent) => void;
    onDrag?: (e: DraggableEvent) => void;
    onDragEnd?: (e: DraggableEvent) => void;
}

/**
 * Interface for objects that can be hovered in the scene.
 *
 * @module
 */

interface DIVEHoverable {
    isHoverable: true;
    onPointerEnter?: (i: Intersection) => void;
    onPointerOver?: (i: Intersection) => void;
    onPointerLeave?: () => void;
}

type DraggableEvent = {
    dragStart: Vector3;
    dragCurrent: Vector3;
    dragEnd: Vector3;
    dragDelta: Vector3;
};
declare abstract class DIVEBaseTool {
    readonly POINTER_DRAG_THRESHOLD: number;
    name: string;
    protected _canvas: HTMLElement;
    protected _scene: DIVEScene;
    protected _controller: DIVEOrbitControls;
    protected _pointer: Vector2;
    protected get _pointerAnyDown(): boolean;
    protected _pointerPrimaryDown: boolean;
    protected _pointerMiddleDown: boolean;
    protected _pointerSecondaryDown: boolean;
    protected _lastPointerDown: Vector2;
    protected _lastPointerUp: Vector2;
    protected _raycaster: Raycaster;
    protected _intersects: Intersection[];
    protected _hovered: (Object3D & DIVEHoverable) | null;
    protected _dragging: boolean;
    protected _dragStart: Vector3;
    protected _dragCurrent: Vector3;
    protected _dragEnd: Vector3;
    protected _dragDelta: Vector3;
    protected _draggable: DIVEDraggable | null;
    protected _dragRaycastOnObjects: Object3D[] | null;
    protected constructor(scene: DIVEScene, controller: DIVEOrbitControls);
    Activate(): void;
    Deactivate(): void;
    onPointerDown(e: PointerEvent): void;
    onDragStart(e: PointerEvent): void;
    onPointerMove(e: PointerEvent): void;
    onDrag(e: PointerEvent): void;
    onPointerUp(e: PointerEvent): void;
    onClick(e: PointerEvent): void;
    onDragEnd(e: PointerEvent): void;
    onWheel(e: WheelEvent): void;
    protected raycast(objects?: Object3D[]): Intersection[];
    private pointerWasDragged;
}

/**
 * A Tool to select and move objects in the scene.
 *
 * Objects have to implement the DIVESelectable interface to be selectable and DIVEMovable to be movable.
 *
 * @module
 */
declare class DIVETransformTool extends DIVEBaseTool {
    readonly isTransformTool: boolean;
    protected _gizmo: TransformControls$2;
    constructor(scene: DIVEScene, controller: DIVEOrbitControls);
    Activate(): void;
    SetGizmoMode(mode: 'translate' | 'rotate' | 'scale'): void;
    SetGizmoVisibility(active: boolean): void;
}

/**
 * A Tool to select and move objects in the scene.
 *
 * Objects have to implement the DIVESelectable interface to be selectable and DIVEMovable to be movable.
 *
 * @module
 */
declare class DIVESelectTool extends DIVETransformTool {
    readonly isSelectTool: boolean;
    constructor(scene: DIVEScene, controller: DIVEOrbitControls);
    Activate(): void;
    Select(selectable: DIVESelectable): void;
    Deselect(selectable: DIVESelectable): void;
    AttachGizmo(selectable: DIVESelectable): void;
    DetachGizmo(): void;
    onClick(e: PointerEvent): void;
}

type ToolType = 'select' | 'none';
/**
 * A Toolbox to activate and deactivate tools to use with the pointer.
 *
 * @module
 */
declare class DIVEToolbox {
    static readonly DefaultTool = "select";
    private _scene;
    private _controller;
    private _activeTool;
    private _selectTool;
    get selectTool(): DIVESelectTool;
    constructor(scene: DIVEScene, controller: DIVEOrbitControls);
    Dispose(): void;
    GetActiveTool(): DIVEBaseTool | null;
    UseTool(tool: ToolType): void;
    SetGizmoMode(mode: 'translate' | 'rotate' | 'scale'): void;
    SetGizmoVisibility(active: boolean): void;
    onPointerMove(e: PointerEvent): void;
    onPointerDown(e: PointerEvent): void;
    onPointerUp(e: PointerEvent): void;
    onWheel(e: WheelEvent): void;
    private addEventListeners;
    private removeEventListeners;
}

interface USE_TOOL {
    'PAYLOAD': {
        tool: ToolType;
    };
    'RETURN': boolean;
}

interface SET_PARENT {
    'PAYLOAD': {
        object: Partial<COMEntity> & {
            id: string;
        };
        parent: Partial<COMEntity> & {
            id: string;
        } | null;
    };
    'RETURN': boolean;
}

type Actions = {
    GET_ALL_SCENE_DATA: GET_ALL_SCENE_DATA;
    GET_ALL_OBJECTS: GET_ALL_OBJECTS;
    GET_OBJECTS: GET_OBJECTS;
    ADD_OBJECT: ADD_OBJECT;
    UPDATE_OBJECT: UPDATE_OBJECT;
    DELETE_OBJECT: DELETE_OBJECT;
    SELECT_OBJECT: SELECT_OBJECT;
    DESELECT_OBJECT: DESELECT_OBJECT;
    SET_BACKGROUND: SET_BACKGROUND;
    DROP_IT: DROP_IT;
    PLACE_ON_FLOOR: PLACE_ON_FLOOR;
    SET_CAMERA_TRANSFORM: SET_CAMERA_TRANSFORM;
    GET_CAMERA_TRANSFORM: GET_CAMERA_TRANSFORM;
    MOVE_CAMERA: MOVE_CAMERA;
    RESET_CAMERA: RESET_CAMERA;
    COMPUTE_ENCOMPASSING_VIEW: COMPUTE_ENCOMPASSING_VIEW;
    SET_CAMERA_LAYER: SET_CAMERA_LAYER;
    ZOOM_CAMERA: ZOOM_CAMERA;
    SET_GIZMO_MODE: SET_GIZMO_MODE;
    SET_GIZMO_VISIBILITY: SET_GIZMO_VISIBILITY;
    USE_TOOL: USE_TOOL;
    MODEL_LOADED: MODEL_LOADED;
    UPDATE_SCENE: UPDATE_SCENE;
    GENERATE_MEDIA: GENERATE_MEDIA;
    SET_PARENT: SET_PARENT;
};

type EventListener<Action extends keyof Actions> = (payload: Actions[Action]['PAYLOAD']) => void;
type Unsubscribe = () => boolean;
/**
 * Main class for communicating with DIVE.
 *
 * You can subscribe to actions and perform them from outside and inside DIVE.
 *
 * ```ts
 * import { DIVE } from "@shopware-ag/dive";
 *
 * const dive = new DIVE();
 *
 * dive.Communication.Subscribe('GET_ALL_SCENE_DATA', () => {
 *  // do something
 * }));
 *
 * dive.Communication.PerformAction('GET_ALL_SCENE_DATA', {});
 * ```
 *
 * @module
 */
declare class DIVECommunication {
    private static __instances;
    static get(id: string): DIVECommunication | undefined;
    private _id;
    get id(): string;
    private renderer;
    private scene;
    private controller;
    private toolbox;
    private _mediaGenerator;
    private get mediaGenerator();
    private registered;
    private listeners;
    constructor(renderer: DIVERenderer, scene: DIVEScene, controls: DIVEOrbitControls, toolbox: DIVEToolbox);
    DestroyInstance(): boolean;
    PerformAction<Action extends keyof Actions>(action: Action, payload: Actions[Action]['PAYLOAD']): Actions[Action]['RETURN'];
    Subscribe<Action extends keyof Actions>(type: Action, listener: EventListener<Action>): Unsubscribe;
    private dispatch;
    private getAllSceneData;
    private getAllObjects;
    private getObjects;
    private addObject;
    private updateObject;
    private deleteObject;
    private selectObject;
    private deselectObject;
    private setBackground;
    private dropIt;
    private placeOnFloor;
    private setCameraTransform;
    private getCameraTransform;
    private moveCamera;
    private setCameraLayer;
    private resetCamera;
    private computeEncompassingView;
    private zoomCamera;
    private setGizmoMode;
    private setGizmoVisibility;
    private useTool;
    private modelLoaded;
    private updateScene;
    private generateMedia;
    private setParent;
}

declare class DIVEInfo {
    private static _supportsWebXR;
    /**
     *
     * @returns The system the user is using. Possible values are "Android", "iOS", "Windows", "MacOS", "Linux" or "Unknown".
     */
    static GetSystem(): string;
    /**
     * @returns A promise that resolves to a boolean indicating whether the user's device supports WebXR.
     */
    static GetSupportsWebXR(): Promise<boolean>;
    /**
     * @returns A boolean indicating whether the user's device supports AR Quick Look.
     */
    static GetSupportsARQuickLook(): boolean;
    /**
     * @returns A boolean indicating whether the user's device is a mobile device.
     */
    static get isMobile(): boolean;
    /**
     * @returns A boolean indicating whether the user's device is a desktop device.
     */
    static get isDesktop(): boolean;
    /**
     * @returns A promise that resolves to a boolean indicating whether the user's device is capable of AR.
     */
    static GetIsARCapable(): Promise<boolean>;
}

declare function ceilExp(number: number, decimals?: number): number;

declare function floorExp(number: number, decimals?: number): number;

declare function roundExponential(number: number, decimals?: number): number;

/**
 * Calculate the signed angle between two vectors. Only works when the vectors are on the same plane.
 * @param vecB Start Vector
 * @param vecA Target Vector
 * @param planeNormal The vector's plane normal
 * @returns Signed angle in radians
 */
declare function signedAngleTo(vecA: Vector3, vecB: Vector3, planeNormal: Vector3): number;

declare function toFixedExp(number: number, decimals?: number): string;

declare function truncateExp(number: number, decimals?: number): number;

declare const DIVEMath: {
    ceilExp: typeof ceilExp;
    floorExp: typeof floorExp;
    roundExp: typeof roundExponential;
    toFixedExp: typeof toFixedExp;
    truncateExp: typeof truncateExp;
    signedAngleTo: typeof signedAngleTo;
};

type DIVESettings = {
    autoResize: boolean;
    displayAxes: boolean;
    renderer: Partial<DIVERendererSettings>;
    perspectiveCamera: Partial<DIVEPerspectiveCameraSettings>;
    orbitControls: Partial<DIVEOrbitControlsSettings>;
};
declare const DIVEDefaultSettings: DIVESettings;
/**
 * #### DIVE
 * is the main class of the DIVE framework.
 *
 * An instance of this class delivers a complete 3D environment with a perspective camera, orbit controls, a toolbox, and a communication system.
 * ```ts
 * import { DIVE } from "@shopware-ag/dive";
 *
 * const myWrapper = document.getElementById('myWrapper');
 *
 * const dive = new DIVE();
 *
 * myWrapper.appendChild(dive.Canvas);
 *
 * dive.Communication.Subscribe('GET_ALL_SCENE_DATA', () => {
 *  // do something
 * }));
 *
 * dive.Communication.PerformAction('GET_ALL_SCENE_DATA', {});
 * ```
 * @module
 */
declare class DIVE {
    static QuickView(uri: string): DIVE;
    private _settings;
    private _resizeObserverId;
    private _width;
    private _height;
    private renderer;
    private scene;
    private perspectiveCamera;
    private orbitControls;
    private toolbox;
    private communication;
    private animationSystem;
    private axisCamera;
    get Communication(): DIVECommunication;
    get Canvas(): HTMLCanvasElement;
    get Info(): DIVEInfo;
    set Settings(settings: Partial<DIVESettings>);
    constructor(settings?: Partial<DIVESettings>);
    Dispose(): void;
    OnResize(width: number, height: number): void;
    private addResizeObserver;
    private removeResizeObserver;
}

export { type Actions, type COMEntity, type COMEntityType, type COMGeometry, type COMGroup, type COMLight, type COMMaterial, type COMModel, type COMPov, type COMPrimitive, DIVE, DIVECommunication, DIVEDefaultSettings, DIVEMath, type DIVESettings, DIVE as default };
