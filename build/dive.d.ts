import { ShadowMapType, ToneMapping, WebGLRenderer, Scene, Camera, PerspectiveCamera, Vector3Like, Mesh, ColorRepresentation, Object3D } from 'three';
import { OrbitControls } from 'three/examples/jsm/Addons.js';

type DIVERendererSettings = {
    antialias: boolean;
    alpha: boolean;
    stencil: boolean;
    shadowMapEnabled: boolean;
    shadowMapType: ShadowMapType;
    toneMapping: ToneMapping;
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
    constructor(rendererSettings?: DIVERendererSettings);
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
    constructor(settings?: DIVEPerspectiveCameraSettings);
    OnResize(width: number, height: number): void;
    SetCameraLayer(layer: 'LIVE' | 'EDITOR'): void;
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
    private last;
    private animating;
    private locked;
    private stopMoveTo;
    private stopRevertLast;
    object: DIVEPerspectiveCamera;
    domElement: HTMLCanvasElement;
    constructor(camera: DIVEPerspectiveCamera, renderer: DIVERenderer, settings?: DIVEOrbitControlsSettings);
    ZoomIn(by?: number): void;
    ZoomOut(by?: number): void;
    MoveTo(pos: Vector3Like | undefined, target: Vector3Like | undefined, duration: number, lock: boolean): void;
    RevertLast(duration: number): void;
    private preRenderCallback;
}

type COMBaseEntity = {
    id: string;
    name: string;
    entityType: 'pov' | 'light' | 'model';
    visible: boolean;
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
type COMModel = COMBaseEntity & {
    uri: string;
    position: Vector3Like;
    rotation: Vector3Like;
    scale: Vector3Like;
    loaded: boolean;
};
type COMEntity = COMPov | COMLight | COMModel;

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
 * A basic grid for the scene.
 *
 * @module
 */
declare class DIVEGrid extends Object3D {
    constructor();
}

/**
 * A basic scene node to hold grid, floor and all lower level roots.
 *
 * @module
 */
declare class DIVERoot extends Object3D {
    private lightRoot;
    private modelRoot;
    private floor;
    private grid;
    get Floor(): DIVEFloor;
    get Grid(): DIVEGrid;
    constructor();
    GetSceneObject(object: Partial<COMEntity>): Object3D | undefined;
    AddSceneObject(object: COMEntity): void;
    UpdateSceneObject(object: Partial<COMEntity>): void;
    DeleteSceneObject(object: Partial<COMEntity>): void;
    PlaceOnFloor(object: Partial<COMModel>): void;
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
    get Root(): DIVERoot;
    constructor();
    SetBackground(color: ColorRepresentation): void;
    GetSceneObject(object: Partial<COMEntity>): Object3D | undefined;
    AddSceneObject(object: COMEntity): void;
    UpdateSceneObject(object: Partial<COMEntity>): void;
    DeleteSceneObject(object: Partial<COMEntity>): void;
    PlaceOnFloor(object: Partial<COMModel>): void;
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

interface GET_ALL_OBJECTS {
    'PAYLOAD': Map<string, COMEntity>;
    'RETURN': Map<string, COMEntity>;
}

interface GET_OBJECTS {
    'PAYLOAD': {
        map: Map<string, COMEntity>;
        ids?: string[];
    };
    'RETURN': Map<string, COMEntity>;
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

type Actions = {
    GET_ALL_SCENE_DATA: GET_ALL_SCENE_DATA;
    GET_ALL_OBJECTS: GET_ALL_OBJECTS;
    GET_OBJECTS: GET_OBJECTS;
    ADD_OBJECT: ADD_OBJECT;
    UPDATE_OBJECT: UPDATE_OBJECT;
    DELETE_OBJECT: DELETE_OBJECT;
    SELECT_OBJECT: SELECT_OBJECT;
    SET_BACKGROUND: SET_BACKGROUND;
    DROP_IT: DROP_IT;
    PLACE_ON_FLOOR: PLACE_ON_FLOOR;
    SET_CAMERA_TRANSFORM: SET_CAMERA_TRANSFORM;
    GET_CAMERA_TRANSFORM: GET_CAMERA_TRANSFORM;
    MOVE_CAMERA: MOVE_CAMERA;
    RESET_CAMERA: RESET_CAMERA;
    SET_CAMERA_LAYER: SET_CAMERA_LAYER;
    ZOOM_CAMERA: ZOOM_CAMERA;
    SET_GIZMO_MODE: SET_GIZMO_MODE;
    MODEL_LOADED: MODEL_LOADED;
    UPDATE_SCENE: UPDATE_SCENE;
    GENERATE_MEDIA: GENERATE_MEDIA;
};

declare abstract class DIVEBaseTool {
    protected name: string;
    protected constructor();
    Activate(): void;
    Deactivate(): void;
    onPointerDown(e: PointerEvent): void;
    onPointerUp(e: PointerEvent): void;
    onWheel(e: WheelEvent): void;
}

/**
 * A Toolbox to activate and deactivate tools to use with the pointer.
 *
 * @module
 */
declare class DIVEToolbox {
    static readonly DefaultTool = "select";
    private activeTool;
    private selectTool;
    private removeListenersCallback;
    constructor(scene: DIVEScene, controller: DIVEOrbitControls);
    dispose(): void;
    GetActiveTool(): DIVEBaseTool;
    UseTool(tool: string): void;
    SetGizmoMode(mode: 'translate' | 'rotate' | 'scale'): void;
    onPointerDown(e: PointerEvent): void;
    onPointerUp(e: PointerEvent): void;
    onWheel(e: WheelEvent): void;
}

/**
 * Creates renderings of the current scene
 *
 * @module
 */
declare class DIVEMediaCreator {
    private renderer;
    private scene;
    private controller;
    constructor(renderer: DIVERenderer, scene: DIVEScene, controller: DIVEOrbitControls);
    GenerateMedia(position: Vector3Like, target: Vector3Like, width: number, height: number): string;
    DrawCanvas(canvasElement?: HTMLCanvasElement): HTMLCanvasElement;
}

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
    private id;
    private scene;
    private controller;
    private toolbox;
    private mediaGenerator;
    private registered;
    private listeners;
    constructor(scene: DIVEScene, controls: DIVEOrbitControls, toolbox: DIVEToolbox, mediaGenerator: DIVEMediaCreator);
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
    private setBackground;
    private dropIt;
    private placeOnFloor;
    private setCameraTransform;
    private getCameraTransform;
    private moveCamera;
    private setCameraLayer;
    private resetCamera;
    private zoomCamera;
    private setGizmoMode;
    private modelLoaded;
    private updateScene;
    private generateMedia;
}

declare function ceilExp(number: number, decimals?: number): number;

declare function floorExp(number: number, decimals?: number): number;

declare function roundExponential(number: number, decimals?: number): number;

declare function toFixedExp(number: number, decimals?: number): string;

declare function truncateExp(number: number, decimals?: number): number;

declare const DIVEMath: {
    ceilExp: typeof ceilExp;
    floorExp: typeof floorExp;
    roundExp: typeof roundExponential;
    toFixedExp: typeof toFixedExp;
    truncateExp: typeof truncateExp;
};

type DIVESettings = {
    autoResize: boolean;
    renderer: DIVERendererSettings;
    perspectiveCamera: DIVEPerspectiveCameraSettings;
    orbitControls: DIVEOrbitControlsSettings;
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
    private _settings;
    private _resizeObserverId;
    private _width;
    private _height;
    private renderer;
    private scene;
    private perspectiveCamera;
    private orbitControls;
    private mediaCreator;
    private toolbox;
    private communication;
    private animationSystem;
    private axisCamera;
    get Communication(): DIVECommunication;
    get Canvas(): HTMLCanvasElement;
    set Settings(settings: Partial<DIVESettings>);
    constructor(settings?: Partial<DIVESettings>);
    OnResize(width: number, height: number): void;
    private addResizeObserver;
    private removeResizeObserver;
}

export { type Actions, type COMEntity, type COMLight, type COMModel, type COMPov, DIVE, DIVECommunication, DIVEDefaultSettings, DIVEMath, type DIVESettings, DIVE as default };
