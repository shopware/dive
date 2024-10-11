"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
var __esm = (fn, res) => function __init() {
  return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var __async = (__this, __arguments, generator) => {
  return new Promise((resolve, reject) => {
    var fulfilled = (value) => {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    };
    var rejected = (value) => {
      try {
        step(generator.throw(value));
      } catch (e) {
        reject(e);
      }
    };
    var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
    step((generator = generator.apply(__this, __arguments)).next());
  });
};

// src/constant/VisibilityLayerMask.ts
var DEFAULT_LAYER_MASK, COORDINATE_LAYER_MASK, UI_LAYER_MASK, HELPER_LAYER_MASK, PRODUCT_LAYER_MASK;
var init_VisibilityLayerMask = __esm({
  "src/constant/VisibilityLayerMask.ts"() {
    "use strict";
    DEFAULT_LAYER_MASK = 1;
    COORDINATE_LAYER_MASK = 2;
    UI_LAYER_MASK = 4;
    HELPER_LAYER_MASK = 8;
    PRODUCT_LAYER_MASK = 16;
  }
});

// src/interface/Draggable.ts
var isDraggable, findDraggableInterface;
var init_Draggable = __esm({
  "src/interface/Draggable.ts"() {
    "use strict";
    isDraggable = (object) => {
      return "isDraggable" in object;
    };
    findDraggableInterface = (child) => {
      if (child === void 0) return void 0;
      if (child.parent === null) {
        return void 0;
      }
      if (isDraggable(child)) {
        return child;
      }
      return findDraggableInterface(child.parent);
    };
  }
});

// src/interface/Hoverable.ts
var isHoverable, findHoverableInterface;
var init_Hoverable = __esm({
  "src/interface/Hoverable.ts"() {
    "use strict";
    isHoverable = (object) => {
      return "isHoverable" in object;
    };
    findHoverableInterface = (child) => {
      if (child === void 0) return void 0;
      if (child.parent === null) {
        return void 0;
      }
      if (isHoverable(child)) {
        return child;
      }
      return findHoverableInterface(child.parent);
    };
  }
});

// src/toolbox/BaseTool.ts
var import_three3, DIVEBaseTool;
var init_BaseTool = __esm({
  "src/toolbox/BaseTool.ts"() {
    "use strict";
    import_three3 = require("three");
    init_VisibilityLayerMask();
    init_Draggable();
    init_Hoverable();
    DIVEBaseTool = class {
      constructor(scene, controller) {
        this.POINTER_DRAG_THRESHOLD = 1e-3;
        this.name = "BaseTool";
        this._canvas = controller.domElement;
        this._scene = scene;
        this._controller = controller;
        this._pointer = new import_three3.Vector2();
        this._pointerPrimaryDown = false;
        this._pointerMiddleDown = false;
        this._pointerSecondaryDown = false;
        this._lastPointerDown = new import_three3.Vector2();
        this._lastPointerUp = new import_three3.Vector2();
        this._raycaster = new import_three3.Raycaster();
        this._raycaster.layers.mask = PRODUCT_LAYER_MASK | UI_LAYER_MASK;
        this._intersects = [];
        this._hovered = null;
        this._dragging = false;
        this._dragStart = new import_three3.Vector3();
        this._dragCurrent = new import_three3.Vector3();
        this._dragEnd = new import_three3.Vector3();
        this._dragDelta = new import_three3.Vector3();
        this._draggable = null;
        this._dragRaycastOnObjects = null;
      }
      get _pointerAnyDown() {
        return this._pointerPrimaryDown || this._pointerMiddleDown || this._pointerSecondaryDown;
      }
      Activate() {
      }
      Deactivate() {
      }
      onPointerDown(e) {
        var _a;
        switch (e.button) {
          case 0:
            this._pointerPrimaryDown = true;
            break;
          case 1:
            this._pointerMiddleDown = true;
            break;
          case 2:
            this._pointerSecondaryDown = true;
            break;
        }
        this._lastPointerDown.copy(this._pointer);
        this._draggable = findDraggableInterface((_a = this._intersects[0]) == null ? void 0 : _a.object) || null;
      }
      onDragStart(e) {
        if (!this._draggable) return;
        if (this._dragRaycastOnObjects !== null) {
          this._intersects = this._raycaster.intersectObjects(this._dragRaycastOnObjects, true);
        }
        if (this._intersects.length === 0) return;
        this._dragStart.copy(this._intersects[0].point.clone());
        this._dragCurrent.copy(this._intersects[0].point.clone());
        this._dragEnd.copy(this._dragStart.clone());
        this._dragDelta.set(0, 0, 0);
        if (this._draggable && this._draggable.onDragStart) {
          this._draggable.onDragStart({
            dragStart: this._dragStart,
            dragCurrent: this._dragCurrent,
            dragEnd: this._dragEnd,
            dragDelta: this._dragDelta
          });
          this._dragging = true;
          this._controller.enabled = false;
        }
      }
      onPointerMove(e) {
        var _a;
        this._pointer.x = e.offsetX / this._canvas.clientWidth * 2 - 1;
        this._pointer.y = -(e.offsetY / this._canvas.clientHeight) * 2 + 1;
        this._raycaster.setFromCamera(this._pointer, this._controller.object);
        this._intersects = this.raycast(this._scene.children);
        const hoverable = findHoverableInterface((_a = this._intersects[0]) == null ? void 0 : _a.object);
        if (this._intersects[0] && hoverable) {
          if (!this._hovered) {
            if (hoverable.onPointerEnter) hoverable.onPointerEnter(this._intersects[0]);
            this._hovered = hoverable;
            return;
          }
          if (this._hovered.uuid !== hoverable.uuid) {
            if (this._hovered.onPointerLeave) this._hovered.onPointerLeave();
            if (hoverable.onPointerEnter) hoverable.onPointerEnter(this._intersects[0]);
            this._hovered = hoverable;
            return;
          }
          if (hoverable.onPointerOver) hoverable.onPointerOver(this._intersects[0]);
          this._hovered = hoverable;
        } else {
          if (this._hovered) {
            if (this._hovered.onPointerLeave) this._hovered.onPointerLeave();
          }
          this._hovered = null;
        }
        if (this._pointerAnyDown) {
          if (!this._dragging) {
            this.onDragStart(e);
          }
          this.onDrag(e);
        }
      }
      onDrag(e) {
        if (this._dragRaycastOnObjects !== null) {
          this._intersects = this._raycaster.intersectObjects(this._dragRaycastOnObjects, true);
        }
        const intersect = this._intersects[0];
        if (!intersect) return;
        this._dragCurrent.copy(intersect.point.clone());
        this._dragEnd.copy(intersect.point.clone());
        this._dragDelta.subVectors(this._dragCurrent.clone(), this._dragStart.clone());
        if (this._draggable && this._draggable.onDrag) {
          this._draggable.onDrag({
            dragStart: this._dragStart,
            dragCurrent: this._dragCurrent,
            dragEnd: this._dragEnd,
            dragDelta: this._dragDelta
          });
        }
      }
      onPointerUp(e) {
        if (this.pointerWasDragged() || this._dragging) {
          if (this._draggable) {
            this.onDragEnd(e);
          }
        } else {
          this.onClick(e);
        }
        switch (e.button) {
          case 0:
            this._pointerPrimaryDown = false;
            break;
          case 1:
            this._pointerMiddleDown = false;
            break;
          case 2:
            this._pointerSecondaryDown = false;
            break;
        }
        this._lastPointerUp.copy(this._pointer);
      }
      onClick(e) {
      }
      onDragEnd(e) {
        const intersect = this._intersects[0];
        if (intersect) {
          this._dragEnd.copy(intersect.point.clone());
          this._dragCurrent.copy(intersect.point.clone());
          this._dragDelta.subVectors(this._dragCurrent.clone(), this._dragStart.clone());
        }
        if (this._draggable && this._draggable.onDragEnd) {
          this._draggable.onDragEnd({
            dragStart: this._dragStart,
            dragCurrent: this._dragCurrent,
            dragEnd: this._dragEnd,
            dragDelta: this._dragDelta
          });
        }
        this._draggable = null;
        this._dragging = false;
        this._dragStart.set(0, 0, 0);
        this._dragCurrent.set(0, 0, 0);
        this._dragEnd.set(0, 0, 0);
        this._dragDelta.set(0, 0, 0);
        this._controller.enabled = true;
      }
      onWheel(e) {
      }
      raycast(objects) {
        if (objects !== void 0) return this._raycaster.intersectObjects(objects, true).filter((i) => i.object.visible);
        return this._raycaster.intersectObjects(this._scene.children, true).filter((i) => i.object.visible);
      }
      pointerWasDragged() {
        return this._lastPointerDown.distanceTo(this._pointer) > this.POINTER_DRAG_THRESHOLD;
      }
    };
  }
});

// src/toolbox/transform/TransformTool.ts
var import_Addons, DIVETransformTool;
var init_TransformTool = __esm({
  "src/toolbox/transform/TransformTool.ts"() {
    "use strict";
    init_BaseTool();
    import_Addons = require("three/examples/jsm/Addons");
    DIVETransformTool = class extends DIVEBaseTool {
      constructor(scene, controller) {
        super(scene, controller);
        this.isTransformTool = true;
        this.name = "DIVETransformTool";
        this._gizmo = new import_Addons.TransformControls(this._controller.object, this._controller.domElement);
        this._gizmo.mode = "translate";
        this._gizmo.addEventListener("mouseDown", () => {
          controller.enabled = false;
        });
        this._gizmo.addEventListener("mouseUp", () => {
          controller.enabled = true;
        });
        this._gizmo.addEventListener("objectChange", () => {
          if (!this._gizmo.object) return;
          if (!("isMoveable" in this._gizmo.object)) return;
          if (!("onMove" in this._gizmo.object)) return;
          this._gizmo.object.onMove();
        });
        scene.add(this._gizmo);
      }
      Activate() {
      }
      SetGizmoMode(mode) {
        this._gizmo.mode = mode;
      }
      SetGizmoVisibility(active) {
        const contains = this._scene.children.includes(this._gizmo);
        if (active && !contains) {
          this._scene.add(this._gizmo);
        } else if (!active && contains) {
          this._scene.remove(this._gizmo);
        }
      }
      // public onPointerDown(e: PointerEvent): void {
      //     super.onPointerDown(e);
      //     // if (this._hovered) {
      //     //     this._dragRaycastOnObjects = this._gizmo.gizmoPlane.children;
      //     // }
      // }
      // protected raycast(): Intersection[] {
      //     return super.raycast(this._gizmo.gizmoNode.children);
      // }
    };
  }
});

// src/interface/Selectable.ts
function isSelectable(object) {
  return "isSelectable" in object;
}
function findSelectableInterface(child) {
  if (child === void 0) return void 0;
  if (child.parent === null) {
    return void 0;
  }
  if (isSelectable(child)) {
    return child;
  }
  return findSelectableInterface(child.parent);
}
var init_Selectable = __esm({
  "src/interface/Selectable.ts"() {
    "use strict";
  }
});

// src/toolbox/select/SelectTool.ts
var SelectTool_exports = {};
__export(SelectTool_exports, {
  DIVESelectTool: () => DIVESelectTool,
  isSelectTool: () => isSelectTool
});
var isSelectTool, DIVESelectTool;
var init_SelectTool = __esm({
  "src/toolbox/select/SelectTool.ts"() {
    "use strict";
    init_TransformTool();
    init_Selectable();
    isSelectTool = (tool) => {
      return tool.isSelectTool !== void 0;
    };
    DIVESelectTool = class extends DIVETransformTool {
      constructor(scene, controller) {
        super(scene, controller);
        this.isSelectTool = true;
        this.name = "SelectTool";
      }
      Activate() {
      }
      Select(selectable) {
        if (selectable.onSelect) selectable.onSelect();
        this.AttachGizmo(selectable);
      }
      Deselect(selectable) {
        if (selectable.onDeselect) selectable.onDeselect();
        this.DetachGizmo();
      }
      AttachGizmo(selectable) {
        if ("isMoveable" in selectable) {
          const movable = selectable;
          this._gizmo.attach(movable);
          this.SetGizmoVisibility(movable.visible);
        }
      }
      DetachGizmo() {
        this._gizmo.detach();
      }
      onClick(e) {
        super.onClick(e);
        const first = this._raycaster.intersectObjects(this._scene.Root.children, true).filter((intersect) => intersect.object.visible)[0];
        const selectable = findSelectableInterface(first == null ? void 0 : first.object);
        if (!first || !selectable) {
          if (this._gizmo.object) {
            this.Deselect(this._gizmo.object);
          }
          return;
        }
        if (this._gizmo.object) {
          if (this._gizmo.object.uuid === selectable.uuid) return;
          this.Deselect(this._gizmo.object);
        }
        this.Select(selectable);
      }
    };
  }
});

// src/camera/PerspectiveCamera.ts
var import_three4, DIVEPerspectiveCameraDefaultSettings, _DIVEPerspectiveCamera, DIVEPerspectiveCamera;
var init_PerspectiveCamera = __esm({
  "src/camera/PerspectiveCamera.ts"() {
    "use strict";
    import_three4 = require("three");
    init_VisibilityLayerMask();
    DIVEPerspectiveCameraDefaultSettings = {
      fov: 80,
      near: 0.1,
      far: 1e3
    };
    _DIVEPerspectiveCamera = class _DIVEPerspectiveCamera extends import_three4.PerspectiveCamera {
      constructor(settings = DIVEPerspectiveCameraDefaultSettings) {
        super(
          settings.fov || DIVEPerspectiveCameraDefaultSettings.fov,
          1,
          settings.near || DIVEPerspectiveCameraDefaultSettings.near,
          settings.far || DIVEPerspectiveCameraDefaultSettings.far
        );
        this.onSetCameraLayer = () => {
        };
        this.layers.mask = _DIVEPerspectiveCamera.EDITOR_VIEW_LAYER_MASK;
      }
      OnResize(width, height) {
        this.aspect = width / height;
        this.updateProjectionMatrix();
      }
      SetCameraLayer(layer) {
        this.layers.mask = layer === "LIVE" ? _DIVEPerspectiveCamera.LIVE_VIEW_LAYER_MASK : _DIVEPerspectiveCamera.EDITOR_VIEW_LAYER_MASK;
        this.onSetCameraLayer(this.layers.mask);
      }
    };
    _DIVEPerspectiveCamera.EDITOR_VIEW_LAYER_MASK = DEFAULT_LAYER_MASK | UI_LAYER_MASK | HELPER_LAYER_MASK | PRODUCT_LAYER_MASK;
    _DIVEPerspectiveCamera.LIVE_VIEW_LAYER_MASK = PRODUCT_LAYER_MASK;
    DIVEPerspectiveCamera = _DIVEPerspectiveCamera;
  }
});

// src/mediacreator/MediaCreator.ts
var MediaCreator_exports = {};
__export(MediaCreator_exports, {
  DIVEMediaCreator: () => DIVEMediaCreator
});
var DIVEMediaCreator;
var init_MediaCreator = __esm({
  "src/mediacreator/MediaCreator.ts"() {
    "use strict";
    init_PerspectiveCamera();
    DIVEMediaCreator = class {
      constructor(renderer, scene, controller) {
        this.renderer = renderer;
        this.scene = scene;
        this.controller = controller;
      }
      GenerateMedia(position, target, width, height) {
        const resetPosition = this.controller.object.position.clone();
        const resetRotation = this.controller.object.quaternion.clone();
        this.renderer.OnResize(width, height);
        this.controller.object.OnResize(width, height);
        this.controller.object.position.copy(position);
        this.controller.target.copy(target);
        this.controller.update();
        const dataUri = this.DrawCanvas().toDataURL();
        this.controller.object.position.copy(resetPosition);
        this.controller.object.quaternion.copy(resetRotation);
        return dataUri;
      }
      DrawCanvas(canvasElement) {
        const restore = this.renderer.domElement;
        if (canvasElement) {
          this.renderer.domElement = canvasElement;
        }
        this.controller.object.layers.mask = DIVEPerspectiveCamera.LIVE_VIEW_LAYER_MASK;
        this.renderer.render(this.scene, this.controller.object);
        this.controller.object.layers.mask = DIVEPerspectiveCamera.EDITOR_VIEW_LAYER_MASK;
        const returnCanvas = this.renderer.domElement;
        if (canvasElement) {
          this.renderer.domElement = restore;
        }
        return returnCanvas;
      }
    };
  }
});

// src/dive.ts
var dive_exports = {};
__export(dive_exports, {
  DIVE: () => DIVE,
  DIVECommunication: () => DIVECommunication,
  DIVEDefaultSettings: () => DIVEDefaultSettings,
  DIVEMath: () => DIVEMath,
  default: () => DIVE
});
module.exports = __toCommonJS(dive_exports);

// src/renderer/Renderer.ts
var import_three = require("three");
var DIVERendererDefaultSettings = {
  antialias: true,
  alpha: true,
  stencil: false,
  shadowMapEnabled: true,
  shadowMapType: import_three.PCFSoftShadowMap,
  toneMapping: import_three.NoToneMapping,
  canvas: void 0
};
var DIVERenderer = class extends import_three.WebGLRenderer {
  constructor(rendererSettings = DIVERendererDefaultSettings) {
    super({
      antialias: rendererSettings.antialias || DIVERendererDefaultSettings.antialias,
      alpha: rendererSettings.alpha || DIVERendererDefaultSettings.alpha,
      preserveDrawingBuffer: true,
      canvas: rendererSettings.canvas
    });
    // basic functionality members
    this.paused = false;
    this.running = false;
    this.force = false;
    // pre- and post-render callbacks
    this.preRenderCallbacks = /* @__PURE__ */ new Map();
    this.postRenderCallbacks = /* @__PURE__ */ new Map();
    this.setPixelRatio(window.devicePixelRatio);
    this.shadowMap.enabled = rendererSettings.shadowMapEnabled || DIVERendererDefaultSettings.shadowMapEnabled;
    this.shadowMap.type = rendererSettings.shadowMapType || DIVERendererDefaultSettings.shadowMapType;
    this.toneMapping = rendererSettings.toneMapping || DIVERendererDefaultSettings.toneMapping;
    this.debug.checkShaderErrors = false;
  }
  // Stops renderings and disposes the renderer.
  Dispose() {
    this.StopRenderer();
    this.dispose();
  }
  // Starts the renderer with the given scene and camera.
  StartRenderer(scene, cam) {
    this.setAnimationLoop(() => {
      this.internal_render(scene, cam);
    });
    this.running = true;
  }
  // Pauses the renderer.
  PauseRenderer() {
    this.paused = true;
  }
  // Resumes the renderer after pausing.
  ResumeRenderer() {
    this.paused = false;
  }
  // Stops the renderer completely. Has to be started again with StartRenderer().
  StopRenderer() {
    this.setAnimationLoop(null);
    this.running = false;
  }
  // Resizes the renderer to the given width and height.
  OnResize(width, height) {
    this.setSize(width, height);
  }
  /**
   * Adds a callback to the render loop before actual render call.
   * @param callback Executed before rendering.
   * @returns uuid to remove the callback.
   */
  AddPreRenderCallback(callback) {
    const newUUID = import_three.MathUtils.generateUUID();
    this.preRenderCallbacks.set(newUUID, callback);
    return newUUID;
  }
  /**
   * Removes a callback from the render loop before actual render call.
   * @param uuid of callback to remove.
   * @returns if removing was successful.
   */
  RemovePreRenderCallback(uuid) {
    if (!this.preRenderCallbacks.has(uuid)) return false;
    this.preRenderCallbacks.delete(uuid);
    return true;
  }
  /**
   * Adds a callback to the render loop after actual render call.
   * @param callback Executed after rendering.
   * @returns uuid to remove the callback.
   */
  AddPostRenderCallback(callback) {
    const newUUID = import_three.MathUtils.generateUUID();
    this.postRenderCallbacks.set(newUUID, callback);
    return newUUID;
  }
  /**
   * Removes a callback from the render loop after actual render call.
   * @param uuid of callback to remove.
   * @returns if removing was successful.
   */
  RemovePostRenderCallback(uuid) {
    if (!this.postRenderCallbacks.has(uuid)) return false;
    this.postRenderCallbacks.delete(uuid);
    return true;
  }
  /**
   * Forces the renderer to render the next frame.
   */
  ForceRendering() {
    this.force = true;
  }
  /**
   * Internal render loop.
   *
   * To control renderloop you can add callbacks via AddPreRenderCallback() and AddPostRenderCallback().
   * @param scene Scene to render.
   * @param cam Camera to render with.
   */
  internal_render(scene, cam) {
    if ((this.paused || !this.running) && !this.force) return;
    this.preRenderCallbacks.forEach((callback) => {
      callback();
    });
    this.render(scene, cam);
    this.postRenderCallbacks.forEach((callback) => {
      callback();
    });
    this.force = false;
  }
};

// src/scene/Scene.ts
var import_three14 = require("three");

// src/scene/root/Root.ts
var import_three11 = require("three");

// src/light/AmbientLight.ts
var import_three2 = require("three");
init_VisibilityLayerMask();
var DIVEAmbientLight = class extends import_three2.Object3D {
  constructor() {
    super();
    this.isDIVELight = true;
    this.isDIVEAmbientLight = true;
    this.name = "DIVEAmbientLight";
    this._light = new import_three2.AmbientLight(16777215, 1);
    this._light.layers.mask = PRODUCT_LAYER_MASK;
    this.add(this._light);
  }
  SetColor(color) {
    this._light.color = color;
  }
  SetIntensity(intensity) {
    this._light.intensity = intensity;
  }
  SetEnabled(enabled) {
    this._light.visible = enabled;
  }
};

// src/light/PointLight.ts
var import_three5 = require("three");

// src/com/Communication.ts
var import_MathUtils = require("three/src/math/MathUtils");
init_SelectTool();
var _DIVECommunication = class _DIVECommunication {
  constructor(renderer, scene, controls, toolbox) {
    this.registered = /* @__PURE__ */ new Map();
    // private listeners: { [key: string]: EventListener[] } = {};
    this.listeners = /* @__PURE__ */ new Map();
    this._id = (0, import_MathUtils.generateUUID)();
    this.renderer = renderer;
    this.scene = scene;
    this.controller = controls;
    this.toolbox = toolbox;
    this._mediaGenerator = null;
    _DIVECommunication.__instances.push(this);
  }
  static get(id) {
    const fromComID = this.__instances.find((instance) => instance.id === id);
    if (fromComID) return fromComID;
    return this.__instances.find((instance) => Array.from(instance.registered.values()).find((object) => object.id === id));
  }
  get id() {
    return this._id;
  }
  get mediaGenerator() {
    if (!this._mediaGenerator) {
      const DIVEMediaCreator2 = (init_MediaCreator(), __toCommonJS(MediaCreator_exports)).DIVEMediaCreator;
      this._mediaGenerator = new DIVEMediaCreator2(this.renderer, this.scene, this.controller);
    }
    return this._mediaGenerator;
  }
  DestroyInstance() {
    const existingIndex = _DIVECommunication.__instances.findIndex((entry) => entry.id === this.id);
    if (existingIndex === -1) return false;
    _DIVECommunication.__instances.splice(existingIndex, 1);
    return true;
  }
  PerformAction(action, payload) {
    let returnValue = false;
    switch (action) {
      case "GET_ALL_SCENE_DATA": {
        returnValue = this.getAllSceneData(payload);
        break;
      }
      case "GET_ALL_OBJECTS": {
        returnValue = this.getAllObjects(payload);
        break;
      }
      case "GET_OBJECTS": {
        returnValue = this.getObjects(payload);
        break;
      }
      case "ADD_OBJECT": {
        returnValue = this.addObject(payload);
        break;
      }
      case "UPDATE_OBJECT": {
        returnValue = this.updateObject(payload);
        break;
      }
      case "DELETE_OBJECT": {
        returnValue = this.deleteObject(payload);
        break;
      }
      case "SELECT_OBJECT": {
        returnValue = this.selectObject(payload);
        break;
      }
      case "DESELECT_OBJECT": {
        returnValue = this.deselectObject(payload);
        break;
      }
      case "SET_BACKGROUND": {
        returnValue = this.setBackground(payload);
        break;
      }
      case "DROP_IT": {
        returnValue = this.dropIt(payload);
        break;
      }
      case "PLACE_ON_FLOOR": {
        returnValue = this.placeOnFloor(payload);
        break;
      }
      case "SET_CAMERA_TRANSFORM": {
        returnValue = this.setCameraTransform(payload);
        break;
      }
      case "GET_CAMERA_TRANSFORM": {
        returnValue = this.getCameraTransform(payload);
        break;
      }
      case "MOVE_CAMERA": {
        returnValue = this.moveCamera(payload);
        break;
      }
      case "RESET_CAMERA": {
        returnValue = this.resetCamera(payload);
        break;
      }
      case "COMPUTE_ENCOMPASSING_VIEW": {
        returnValue = this.computeEncompassingView(payload);
        break;
      }
      case "SET_CAMERA_LAYER": {
        returnValue = this.setCameraLayer(payload);
        break;
      }
      case "ZOOM_CAMERA": {
        returnValue = this.zoomCamera(payload);
        break;
      }
      case "SET_GIZMO_MODE": {
        returnValue = this.setGizmoMode(payload);
        break;
      }
      case "SET_GIZMO_VISIBILITY": {
        returnValue = this.setGizmoVisibility(payload);
        break;
      }
      case "USE_TOOL": {
        returnValue = this.useTool(payload);
        break;
      }
      case "MODEL_LOADED": {
        returnValue = this.modelLoaded(payload);
        break;
      }
      case "UPDATE_SCENE": {
        returnValue = this.updateScene(payload);
        break;
      }
      case "GENERATE_MEDIA": {
        returnValue = this.generateMedia(payload);
        break;
      }
      case "SET_PARENT": {
        returnValue = this.setParent(payload);
        break;
      }
    }
    this.dispatch(action, payload);
    return returnValue;
  }
  Subscribe(type, listener) {
    if (!this.listeners.get(type)) this.listeners.set(type, []);
    this.listeners.get(type).push(listener);
    return () => {
      const listenerArray = this.listeners.get(type);
      if (!listenerArray) return false;
      const existingIndex = listenerArray.findIndex((entry) => entry === listener);
      if (existingIndex === -1) return false;
      listenerArray.splice(existingIndex, 1);
      return true;
    };
  }
  dispatch(type, payload) {
    const listenerArray = this.listeners.get(type);
    if (!listenerArray) return;
    listenerArray.forEach((listener) => listener(payload));
  }
  getAllSceneData(payload) {
    const sceneData = {
      name: this.scene.name,
      mediaItem: null,
      backgroundColor: "#" + this.scene.background.getHexString(),
      floorEnabled: this.scene.Floor.visible,
      floorColor: "#" + this.scene.Floor.material.color.getHexString(),
      userCamera: {
        position: this.controller.object.position.clone(),
        target: this.controller.target.clone()
      },
      spotmarks: [],
      lights: Array.from(this.registered.values()).filter((object) => object.entityType === "light"),
      objects: Array.from(this.registered.values()).filter((object) => object.entityType === "model"),
      cameras: Array.from(this.registered.values()).filter((object) => object.entityType === "pov"),
      primitives: Array.from(this.registered.values()).filter((object) => object.entityType === "primitive"),
      groups: Array.from(this.registered.values()).filter((object) => object.entityType === "group")
    };
    Object.assign(payload, sceneData);
    return sceneData;
  }
  getAllObjects(payload) {
    Object.assign(payload, this.registered);
    return this.registered;
  }
  getObjects(payload) {
    if (payload.ids.length === 0) return [];
    const objects = [];
    this.registered.forEach((object) => {
      if (!payload.ids.includes(object.id)) return;
      objects.push(object);
    });
    return objects;
  }
  addObject(payload) {
    if (this.registered.get(payload.id)) return false;
    if (payload.parent === void 0) payload.parent = null;
    this.registered.set(payload.id, payload);
    this.scene.AddSceneObject(payload);
    return true;
  }
  updateObject(payload) {
    const objectToUpdate = this.registered.get(payload.id);
    if (!objectToUpdate) return false;
    this.registered.set(payload.id, __spreadValues(__spreadValues({}, objectToUpdate), payload));
    const updatedObject = this.registered.get(payload.id);
    this.scene.UpdateSceneObject(__spreadProps(__spreadValues({}, payload), { id: updatedObject.id, entityType: updatedObject.entityType }));
    Object.assign(payload, updatedObject);
    return true;
  }
  deleteObject(payload) {
    const deletedObject = this.registered.get(payload.id);
    if (!deletedObject) return false;
    Object.assign(payload, deletedObject);
    this.registered.delete(payload.id);
    this.scene.DeleteSceneObject(deletedObject);
    return true;
  }
  selectObject(payload) {
    const object = this.registered.get(payload.id);
    if (!object) return false;
    const sceneObject = this.scene.GetSceneObject(object);
    if (!sceneObject) return false;
    if (!("isSelectable" in sceneObject)) return false;
    const activeTool = this.toolbox.GetActiveTool();
    if (activeTool && isSelectTool(activeTool)) {
      activeTool.AttachGizmo(sceneObject);
    }
    Object.assign(payload, object);
    return true;
  }
  deselectObject(payload) {
    const object = this.registered.get(payload.id);
    if (!object) return false;
    const sceneObject = this.scene.GetSceneObject(object);
    if (!sceneObject) return false;
    if (!("isSelectable" in sceneObject)) return false;
    const activeTool = this.toolbox.GetActiveTool();
    if (activeTool && isSelectTool(activeTool)) {
      activeTool.DetachGizmo();
    }
    Object.assign(payload, object);
    return true;
  }
  setBackground(payload) {
    this.scene.SetBackground(payload.color);
    return true;
  }
  dropIt(payload) {
    const object = this.registered.get(payload.id);
    if (!object) return false;
    const model = this.scene.GetSceneObject(object);
    model.DropIt();
    return true;
  }
  placeOnFloor(payload) {
    if (!this.registered.get(payload.id)) return false;
    this.scene.PlaceOnFloor(payload);
    return true;
  }
  setCameraTransform(payload) {
    this.controller.object.position.copy(payload.position);
    this.controller.target.copy(payload.target);
    this.controller.update();
    return true;
  }
  getCameraTransform(payload) {
    const transform = {
      position: this.controller.object.position.clone(),
      target: this.controller.target.clone()
    };
    Object.assign(payload, transform);
    return transform;
  }
  moveCamera(payload) {
    let position = { x: 0, y: 0, z: 0 };
    let target = { x: 0, y: 0, z: 0 };
    if ("id" in payload) {
      position = this.registered.get(payload.id).position;
      target = this.registered.get(payload.id).target;
    } else {
      position = payload.position;
      target = payload.target;
    }
    this.controller.MoveTo(position, target, payload.duration, payload.locked);
    return true;
  }
  setCameraLayer(payload) {
    this.controller.object.SetCameraLayer(payload.layer);
    return true;
  }
  resetCamera(payload) {
    this.controller.RevertLast(payload.duration);
    return true;
  }
  computeEncompassingView(payload) {
    const sceneBB = this.scene.ComputeSceneBB();
    const transform = this.controller.ComputeEncompassingView(sceneBB);
    Object.assign(payload, transform);
    return transform;
  }
  zoomCamera(payload) {
    if (payload.direction === "IN") this.controller.ZoomIn(payload.by);
    if (payload.direction === "OUT") this.controller.ZoomOut(payload.by);
    return true;
  }
  setGizmoMode(payload) {
    this.toolbox.SetGizmoMode(payload.mode);
    return true;
  }
  setGizmoVisibility(payload) {
    this.toolbox.SetGizmoVisibility(payload);
    return payload;
  }
  useTool(payload) {
    this.toolbox.UseTool(payload.tool);
    return true;
  }
  modelLoaded(payload) {
    this.registered.get(payload.id).loaded = true;
    return true;
  }
  updateScene(payload) {
    if (payload.name !== void 0) this.scene.name = payload.name;
    if (payload.backgroundColor !== void 0) this.scene.SetBackground(payload.backgroundColor);
    if (payload.gridEnabled !== void 0) this.scene.Grid.SetVisibility(payload.gridEnabled);
    if (payload.floorEnabled !== void 0) this.scene.Floor.SetVisibility(payload.floorEnabled);
    if (payload.floorColor !== void 0) this.scene.Floor.SetColor(payload.floorColor);
    payload.name = this.scene.name;
    payload.backgroundColor = "#" + this.scene.background.getHexString();
    payload.gridEnabled = this.scene.Grid.visible;
    payload.floorEnabled = this.scene.Floor.visible;
    payload.floorColor = "#" + this.scene.Floor.material.color.getHexString();
    return true;
  }
  generateMedia(payload) {
    let position = { x: 0, y: 0, z: 0 };
    let target = { x: 0, y: 0, z: 0 };
    if ("id" in payload) {
      position = this.registered.get(payload.id).position;
      target = this.registered.get(payload.id).target;
    } else {
      position = payload.position;
      target = payload.target;
    }
    payload.dataUri = this.mediaGenerator.GenerateMedia(position, target, payload.width, payload.height);
    return true;
  }
  setParent(payload) {
    const object = this.registered.get(payload.object.id);
    if (!object) return false;
    const sceneObject = this.scene.GetSceneObject(object);
    if (!sceneObject) return false;
    if (payload.parent === null) {
      this.scene.Root.attach(sceneObject);
      return true;
    }
    if (payload.object.id === payload.parent.id) {
      return false;
    }
    const parent = this.registered.get(payload.parent.id);
    if (!parent) {
      this.scene.Root.attach(sceneObject);
      return true;
    }
    const parentObject = this.scene.GetSceneObject(parent);
    if (!parentObject) {
      this.scene.Root.attach(sceneObject);
      return true;
    }
    parentObject.attach(sceneObject);
    return true;
  }
};
_DIVECommunication.__instances = [];
var DIVECommunication = _DIVECommunication;

// src/light/PointLight.ts
init_VisibilityLayerMask();
var DIVEPointLight = class extends import_three5.Object3D {
  constructor() {
    super();
    this.isDIVELight = true;
    this.isDIVEPointLight = true;
    this.isMoveable = true;
    this.isSelectable = true;
    this.gizmo = null;
    this.name = "DIVEPointLight";
    this.light = new import_three5.PointLight(16777215, 1);
    this.light.layers.mask = PRODUCT_LAYER_MASK;
    this.light.castShadow = true;
    this.light.shadow.mapSize.width = 512;
    this.light.shadow.mapSize.height = 512;
    this.add(this.light);
    const geoSize = 0.1;
    const geometry = new import_three5.SphereGeometry(geoSize, geoSize * 320, geoSize * 320);
    const material = new import_three5.MeshBasicMaterial({ color: this.light.color, transparent: true, opacity: 0.8, side: import_three5.FrontSide });
    this.mesh = new import_three5.Mesh(geometry, material);
    this.mesh.layers.mask = UI_LAYER_MASK;
    this.add(this.mesh);
  }
  SetColor(color) {
    this.light.color = color;
    this.mesh.material.color = color;
  }
  SetIntensity(intensity) {
    this.light.intensity = intensity;
    this.mesh.material.opacity = intensity > 0.8 ? 0.8 : intensity * 0.8;
  }
  SetEnabled(enabled) {
    this.light.visible = enabled;
  }
  onMove() {
    var _a;
    (_a = DIVECommunication.get(this.userData.id)) == null ? void 0 : _a.PerformAction("UPDATE_OBJECT", { id: this.userData.id, position: this.position });
  }
  onSelect() {
    var _a;
    (_a = DIVECommunication.get(this.userData.id)) == null ? void 0 : _a.PerformAction("SELECT_OBJECT", { id: this.userData.id });
  }
  onDeselect() {
    var _a;
    (_a = DIVECommunication.get(this.userData.id)) == null ? void 0 : _a.PerformAction("DESELECT_OBJECT", { id: this.userData.id });
  }
};

// src/light/SceneLight.ts
init_VisibilityLayerMask();
var import_three6 = require("three");
var DIVESceneLight = class extends import_three6.Object3D {
  constructor() {
    super();
    this.isDIVELight = true;
    this.isDIVESceneLight = true;
    this.name = "DIVESceneLight";
    this._hemiLight = new import_three6.HemisphereLight(16777215, 16777215, 2);
    this._hemiLight.layers.mask = PRODUCT_LAYER_MASK;
    this._hemiLight.position.set(0, 50, 0);
    this.add(this._hemiLight);
    this._dirLight = new import_three6.DirectionalLight(16777215, 3);
    this._dirLight.layers.mask = PRODUCT_LAYER_MASK;
    this._dirLight.position.set(1, 1.75, 1);
    this._dirLight.position.multiplyScalar(30);
    this._dirLight.castShadow = true;
    this._dirLight.shadow.mapSize.width = 2048;
    this._dirLight.shadow.mapSize.height = 2048;
    const d = 5;
    this._dirLight.shadow.camera.left = -d;
    this._dirLight.shadow.camera.right = d;
    this._dirLight.shadow.camera.top = d;
    this._dirLight.shadow.camera.bottom = -d;
    this._dirLight.shadow.camera.far = 3500;
    this.add(this._dirLight);
  }
  SetColor(color) {
    this._hemiLight.color = color;
    this._dirLight.color = color;
  }
  SetIntensity(intensity) {
    this._hemiLight.intensity = intensity * 2;
    this._dirLight.intensity = intensity * 3;
  }
  SetEnabled(enabled) {
    this._hemiLight.visible = enabled;
    this._dirLight.visible = enabled;
  }
};

// src/model/Model.ts
var import_three8 = require("three");
init_VisibilityLayerMask();

// src/helper/findSceneRecursive/findSceneRecursive.ts
var findSceneRecursive = (object) => {
  if (object.parent) {
    return findSceneRecursive(object.parent);
  }
  return object;
};

// src/node/Node.ts
var import_three7 = require("three");
init_VisibilityLayerMask();
var DIVENode = class extends import_three7.Object3D {
  constructor() {
    super();
    this.isDIVENode = true;
    this.isSelectable = true;
    this.isMoveable = true;
    this.gizmo = null;
    this.layers.mask = PRODUCT_LAYER_MASK;
    this._boundingBox = new import_three7.Box3();
  }
  SetPosition(position) {
    this.position.set(position.x, position.y, position.z);
  }
  SetRotation(rotation) {
    this.rotation.set(rotation.x, rotation.y, rotation.z);
  }
  SetScale(scale) {
    this.scale.set(scale.x, scale.y, scale.z);
  }
  SetVisibility(visible) {
    this.visible = visible;
  }
  SetToWorldOrigin() {
    var _a;
    this.position.set(0, 0, 0);
    (_a = DIVECommunication.get(this.userData.id)) == null ? void 0 : _a.PerformAction("UPDATE_OBJECT", { id: this.userData.id, position: this.position, rotation: this.rotation, scale: this.scale });
  }
  onMove() {
    var _a;
    (_a = DIVECommunication.get(this.userData.id)) == null ? void 0 : _a.PerformAction("UPDATE_OBJECT", { id: this.userData.id, position: this.position, rotation: this.rotation, scale: this.scale });
  }
  onSelect() {
    var _a;
    (_a = DIVECommunication.get(this.userData.id)) == null ? void 0 : _a.PerformAction("SELECT_OBJECT", { id: this.userData.id });
  }
  onDeselect() {
    var _a;
    (_a = DIVECommunication.get(this.userData.id)) == null ? void 0 : _a.PerformAction("DESELECT_OBJECT", { id: this.userData.id });
  }
};

// src/model/Model.ts
var DIVEModel = class extends DIVENode {
  constructor() {
    super(...arguments);
    this.isDIVEModel = true;
    this._mesh = null;
    this._material = null;
  }
  SetModel(gltf) {
    this.clear();
    gltf.scene.traverse((child) => {
      child.castShadow = true;
      child.receiveShadow = true;
      child.layers.mask = this.layers.mask;
      this._boundingBox.expandByObject(child);
      if (!this._mesh && "isMesh" in child) {
        this._mesh = child;
        if (this._material) {
          this._mesh.material = this._material;
        } else {
          this._material = child.material;
        }
      }
    });
    this.add(gltf.scene);
  }
  SetMaterial(material) {
    if (!this._material) {
      this._material = new import_three8.MeshStandardMaterial();
    }
    if (material.vertexColors !== void 0) {
      this._material.vertexColors = material.vertexColors;
    }
    if (material.color !== void 0) {
      this._material.color.set(material.color);
    }
    if (material.map !== void 0) {
      this._material.map = material.map;
    }
    if (material.normalMap !== void 0) {
      this._material.normalMap = material.normalMap;
    }
    if (material.roughness !== void 0) {
      this._material.roughness = material.roughness;
    }
    if (material.roughnessMap !== void 0) {
      this._material.roughnessMap = material.roughnessMap;
      if (this._material.roughnessMap) {
        this._material.roughness = 1;
      }
    }
    if (material.metalness !== void 0) {
      this._material.metalness = material.metalness;
    }
    if (material.metalnessMap !== void 0) {
      this._material.metalnessMap = material.metalnessMap;
      if (this._material.metalnessMap) {
        this._material.metalness = 1;
      }
    }
    if (this._mesh) {
      this._mesh.material = this._material;
    }
  }
  PlaceOnFloor() {
    var _a;
    this.position.y = -this._boundingBox.min.y * this.scale.y;
    (_a = DIVECommunication.get(this.userData.id)) == null ? void 0 : _a.PerformAction("UPDATE_OBJECT", { id: this.userData.id, position: this.position, rotation: this.rotation, scale: this.scale });
  }
  DropIt() {
    var _a;
    if (!this.parent) {
      console.warn("DIVEModel: DropIt() called on a model that is not in the scene.", this);
      return;
    }
    const bottomY = this._boundingBox.min.y * this.scale.y;
    const bbBottomCenter = this.localToWorld(this._boundingBox.getCenter(new import_three8.Vector3()).multiply(this.scale));
    bbBottomCenter.y = bottomY + this.position.y;
    const raycaster = new import_three8.Raycaster(bbBottomCenter, new import_three8.Vector3(0, -1, 0));
    raycaster.layers.mask = PRODUCT_LAYER_MASK;
    const intersections = raycaster.intersectObjects(findSceneRecursive(this).Root.children, true);
    if (intersections.length > 0) {
      const mesh = intersections[0].object;
      mesh.geometry.computeBoundingBox();
      const meshBB = mesh.geometry.boundingBox;
      const worldPos = mesh.localToWorld(meshBB.max.clone());
      const oldPos = this.position.clone();
      const newPos = this.position.clone().setY(worldPos.y).sub(new import_three8.Vector3(0, bottomY, 0));
      this.position.copy(newPos);
      if (this.position.y === oldPos.y) return;
      (_a = DIVECommunication.get(this.userData.id)) == null ? void 0 : _a.PerformAction("UPDATE_OBJECT", { id: this.userData.id, position: this.position, rotation: this.rotation, scale: this.scale });
    }
  }
};

// src/loadingmanager/LoadingManager.ts
var import_Addons2 = require("three/examples/jsm/Addons.js");
var DIVELoadingManager = class {
  // ... maybe extend with other loaders later
  constructor() {
    this.progress = /* @__PURE__ */ new Map();
    this.gltfloader = new import_Addons2.GLTFLoader();
    this.dracoloader = new import_Addons2.DRACOLoader();
    this.dracoloader.setDecoderPath("https://www.gstatic.com/draco/v1/decoders/");
    this.gltfloader.setDRACOLoader(this.dracoloader);
  }
  LoadGLTF(uri) {
    return __async(this, null, function* () {
      const progEvent = (p) => {
        this.progress.set(uri, p.loaded / p.total);
      };
      this.progress.set(uri, 0);
      return new Promise((resolve, reject) => {
        this.gltfloader.loadAsync(uri, progEvent).then(resolve).catch(reject);
      });
    });
  }
  PollProgress() {
    let total = 0;
    this.progress.forEach((progress) => {
      total += progress;
    });
    if (this.progress.size === 0) return 1;
    return total / this.progress.size;
  }
};

// src/primitive/Primitive.ts
var import_three9 = require("three");
init_VisibilityLayerMask();
var DIVEPrimitive = class extends DIVENode {
  constructor() {
    super();
    this.isDIVEPrimitive = true;
    this._mesh = new import_three9.Mesh();
    this._mesh.layers.mask = PRODUCT_LAYER_MASK;
    this._mesh.castShadow = true;
    this._mesh.receiveShadow = true;
    this._mesh.material = new import_three9.MeshStandardMaterial();
    this.add(this._mesh);
  }
  SetGeometry(geometry) {
    this._mesh.geometry = this.assembleGeometry(geometry);
    this._boundingBox.setFromObject(this._mesh);
  }
  SetMaterial(material) {
    const primitiveMaterial = this._mesh.material;
    if (material.vertexColors !== void 0) {
      primitiveMaterial.vertexColors = material.vertexColors;
    }
    if (material.color !== void 0) {
      primitiveMaterial.color = new import_three9.Color(material.color);
    }
    if (material.map !== void 0) {
      primitiveMaterial.map = material.map;
    }
    if (material.normalMap !== void 0) {
      primitiveMaterial.normalMap = material.normalMap;
    }
    if (material.roughness !== void 0) {
      primitiveMaterial.roughness = material.roughness;
    }
    if (material.roughnessMap !== void 0) {
      primitiveMaterial.roughnessMap = material.roughnessMap;
      if (primitiveMaterial.roughnessMap) {
        primitiveMaterial.roughness = 1;
      }
    }
    if (material.metalness !== void 0) {
      primitiveMaterial.metalness = material.metalness;
    }
    if (material.metalnessMap !== void 0) {
      primitiveMaterial.metalnessMap = material.metalnessMap;
      if (primitiveMaterial.metalnessMap) {
        primitiveMaterial.metalness = 0;
      }
    }
    if (this._mesh) this._mesh.material = primitiveMaterial;
  }
  PlaceOnFloor() {
    var _a;
    this.position.y = -this._boundingBox.min.y * this.scale.y;
    (_a = DIVECommunication.get(this.userData.id)) == null ? void 0 : _a.PerformAction("UPDATE_OBJECT", { id: this.userData.id, position: this.position, rotation: this.rotation, scale: this.scale });
  }
  DropIt() {
    var _a;
    if (!this.parent) {
      console.warn("DIVEModel: DropIt() called on a model that is not in the scene.", this);
      return;
    }
    const bottomY = this._boundingBox.min.y * this.scale.y;
    const bbBottomCenter = this.localToWorld(this._boundingBox.getCenter(new import_three9.Vector3()).multiply(this.scale));
    bbBottomCenter.y = bottomY + this.position.y;
    const raycaster = new import_three9.Raycaster(bbBottomCenter, new import_three9.Vector3(0, -1, 0));
    raycaster.layers.mask = PRODUCT_LAYER_MASK;
    const intersections = raycaster.intersectObjects(findSceneRecursive(this).Root.children, true);
    if (intersections.length > 0) {
      const mesh = intersections[0].object;
      mesh.geometry.computeBoundingBox();
      const meshBB = mesh.geometry.boundingBox;
      const worldPos = mesh.localToWorld(meshBB.max.clone());
      const oldPos = this.position.clone();
      const newPos = this.position.clone().setY(worldPos.y).sub(new import_three9.Vector3(0, bottomY, 0));
      this.position.copy(newPos);
      if (this.position.y === oldPos.y) return;
      (_a = DIVECommunication.get(this.userData.id)) == null ? void 0 : _a.PerformAction("UPDATE_OBJECT", { id: this.userData.id, position: this.position, rotation: this.rotation, scale: this.scale });
    }
  }
  assembleGeometry(geometry) {
    switch (geometry.name) {
      case "cylinder":
        return this.createCylinderGeometry(geometry);
      case "sphere":
        return this.createSphereGeometry(geometry);
      case "pyramid":
        return this.createPyramidGeometry(geometry);
      case "box":
        return this.createBoxGeometry(geometry);
      case "cone":
        return this.createConeGeometry(geometry);
      case "wall":
        return this.createWallGeometry(geometry);
      case "plane":
        return this.createPlaneGeometry(geometry);
      default:
        return new import_three9.BufferGeometry();
    }
  }
  createCylinderGeometry(geometry) {
    const geo = new import_three9.CylinderGeometry(geometry.width / 2, geometry.width / 2, geometry.height, 64);
    geo.translate(0, geometry.height / 2, 0);
    return geo;
  }
  createSphereGeometry(geometry) {
    const geo = new import_three9.SphereGeometry(geometry.width / 2, 256, 256);
    return geo;
  }
  createPyramidGeometry(geometry) {
    const geo = new import_three9.ConeGeometry(geometry.width / 2, geometry.height, 4, 1, true);
    geo.rotateY(Math.PI / 4);
    geo.translate(0, geometry.height / 2, 0);
    return geo;
  }
  createBoxGeometry(geometry) {
    const geo = new import_three9.BoxGeometry(geometry.width, geometry.height, geometry.depth);
    geo.translate(0, geometry.height / 2, 0);
    return geo;
  }
  createConeGeometry(geometry) {
    const geo = new import_three9.ConeGeometry(geometry.width / 2, geometry.height, 256);
    geo.translate(0, geometry.height / 2, 0);
    return geo;
  }
  createWallGeometry(geometry) {
    const geo = new import_three9.BoxGeometry(geometry.width, geometry.height, geometry.depth || 0.05, 16);
    geo.translate(0, geometry.height / 2, 0);
    return geo;
  }
  createPlaneGeometry(geometry) {
    const geo = new import_three9.BoxGeometry(geometry.width, geometry.height, geometry.depth);
    geo.translate(0, geometry.height / 2, 0);
    return geo;
  }
};

// src/group/Group.ts
var import_three10 = require("three");
var DIVEGroup = class extends DIVENode {
  constructor() {
    super();
    this.isDIVEGroup = true;
    this.name = "DIVEGroup";
    this._boxMesh = new import_three10.Mesh(new import_three10.BoxGeometry(0, 0, 0), new import_three10.MeshBasicMaterial({ color: 16711680, wireframe: true }));
    this._boxMesh.visible = false;
    this.add(this._boxMesh);
  }
  SetBoundingBoxVisibility(visible) {
    this._boxMesh.visible = visible;
  }
  attach(object) {
    super.attach(object);
    this.recalculatePosition();
    this.updateBoxMesh();
    return this;
  }
  remove(object) {
    super.remove(object);
    this.recalculatePosition();
    this.updateBoxMesh();
    return this;
  }
  /**
   * Recalculates the position of the group based on it's bounding box.
   * Children's world positions are kept.
   */
  recalculatePosition() {
    var _a;
    const childrensWorldPositions = this.children.map((child) => child.getWorldPosition(new import_three10.Vector3()));
    const bbcenter = this.updateBB();
    this.position.copy(bbcenter);
    this.children.forEach((child, i) => {
      if (child.uuid === this._boxMesh.uuid) return;
      child.position.copy(this.worldToLocal(childrensWorldPositions[i]));
    });
    (_a = DIVECommunication.get(this.userData.id)) == null ? void 0 : _a.PerformAction("UPDATE_OBJECT", { id: this.userData.id, position: this.position });
  }
  /**
   * Updates the bounding box of the group.
   * @returns {Vector3} The new center of the bounding box.
   */
  updateBB() {
    this._boundingBox.makeEmpty();
    this.children.forEach((child) => {
      if (child.uuid === this._boxMesh.uuid) return;
      this._boundingBox.expandByObject(child);
    });
    return this._boundingBox.getCenter(new import_three10.Vector3());
  }
  updateBoxMesh() {
    this._boxMesh.quaternion.copy(this.quaternion.clone().invert());
    this._boxMesh.scale.set(1 / this.scale.x, 1 / this.scale.y, 1 / this.scale.z);
    this._boxMesh.geometry = new import_three10.BoxGeometry(this._boundingBox.max.x - this._boundingBox.min.x, this._boundingBox.max.y - this._boundingBox.min.y, this._boundingBox.max.z - this._boundingBox.min.z);
  }
  onMove() {
    super.onMove();
    this.updateBB();
    this.updateBoxMesh();
  }
};

// src/scene/root/Root.ts
var DIVERoot = class extends import_three11.Object3D {
  constructor() {
    super();
    this.isDIVERoot = true;
    this.name = "Root";
    this.loadingManager = new DIVELoadingManager();
  }
  ComputeSceneBB() {
    const bb = new import_three11.Box3();
    this.traverse((object) => {
      if ("isObject3D" in object) {
        bb.expandByObject(object);
      }
    });
    return bb;
  }
  GetSceneObject(object) {
    return this.children.find((object3D) => object3D.userData.id === object.id);
  }
  AddSceneObject(object) {
    switch (object.entityType) {
      case "pov": {
        break;
      }
      case "light": {
        this.updateLight(object);
        break;
      }
      case "model": {
        this.updateModel(object);
        break;
      }
      case "primitive": {
        this.updatePrimitive(object);
        break;
      }
      case "group": {
        this.updateGroup(object);
        break;
      }
    }
  }
  UpdateSceneObject(object) {
    switch (object.entityType) {
      case "pov": {
        break;
      }
      case "light": {
        this.updateLight(object);
        break;
      }
      case "model": {
        this.updateModel(object);
        break;
      }
      case "primitive": {
        this.updatePrimitive(object);
        break;
      }
      case "group": {
        this.updateGroup(object);
        break;
      }
    }
  }
  DeleteSceneObject(object) {
    switch (object.entityType) {
      case "pov": {
        break;
      }
      case "light": {
        this.deleteLight(object);
        break;
      }
      case "model": {
        this.deleteModel(object);
        break;
      }
      case "primitive": {
        this.deletePrimitive(object);
        break;
      }
      case "group": {
        this.deleteGroup(object);
        break;
      }
    }
  }
  PlaceOnFloor(object) {
    switch (object.entityType) {
      case "pov":
      case "light": {
        break;
      }
      case "model":
      case "primitive": {
        this.placeOnFloor(object);
        break;
      }
    }
  }
  updateLight(light) {
    let sceneObject = this.GetSceneObject(light);
    if (!sceneObject) {
      switch (light.type) {
        case "scene": {
          sceneObject = new DIVESceneLight();
          break;
        }
        case "ambient": {
          sceneObject = new DIVEAmbientLight();
          break;
        }
        case "point": {
          sceneObject = new DIVEPointLight();
          break;
        }
        default: {
          console.warn(`Root.updateLight: Unknown light type: ${light.type}`);
          return;
        }
      }
      sceneObject.userData.id = light.id;
      this.add(sceneObject);
    }
    if (light.name !== void 0 && light.name !== null) sceneObject.name = light.name;
    if (light.position !== void 0 && light.position !== null) sceneObject.position.set(light.position.x, light.position.y, light.position.z);
    if (light.intensity !== void 0 && light.intensity !== null) sceneObject.SetIntensity(light.intensity);
    if (light.enabled !== void 0 && light.enabled !== null) sceneObject.SetEnabled(light.enabled);
    if (light.color !== void 0 && light.color !== null) sceneObject.SetColor(new import_three11.Color(light.color));
    if (light.visible !== void 0 && light.visible !== null) sceneObject.visible = light.visible;
    if (light.parent !== void 0) this.setParent(__spreadProps(__spreadValues({}, light), { parent: light.parent }));
  }
  updateModel(model) {
    let sceneObject = this.GetSceneObject(model);
    if (!sceneObject) {
      const created = new DIVEModel();
      sceneObject = created;
      sceneObject.userData.id = model.id;
      this.add(sceneObject);
    }
    if (model.uri !== void 0) {
      this.loadingManager.LoadGLTF(model.uri).then((gltf) => {
        var _a;
        sceneObject.SetModel(gltf);
        (_a = DIVECommunication.get(model.id)) == null ? void 0 : _a.PerformAction("MODEL_LOADED", { id: model.id });
      });
    }
    if (model.name !== void 0) sceneObject.name = model.name;
    if (model.position !== void 0) sceneObject.SetPosition(model.position);
    if (model.rotation !== void 0) sceneObject.SetRotation(model.rotation);
    if (model.scale !== void 0) sceneObject.SetScale(model.scale);
    if (model.visible !== void 0) sceneObject.SetVisibility(model.visible);
    if (model.material !== void 0) sceneObject.SetMaterial(model.material);
    if (model.parent !== void 0) this.setParent(__spreadProps(__spreadValues({}, model), { parent: model.parent }));
  }
  updatePrimitive(primitive) {
    let sceneObject = this.GetSceneObject(primitive);
    if (!sceneObject) {
      const created = new DIVEPrimitive();
      sceneObject = created;
      sceneObject.userData.id = primitive.id;
      this.add(sceneObject);
    }
    if (primitive.name !== void 0) sceneObject.name = primitive.name;
    if (primitive.geometry !== void 0) sceneObject.SetGeometry(primitive.geometry);
    if (primitive.position !== void 0) sceneObject.SetPosition(primitive.position);
    if (primitive.rotation !== void 0) sceneObject.SetRotation(primitive.rotation);
    if (primitive.scale !== void 0) sceneObject.SetScale(primitive.scale);
    if (primitive.visible !== void 0) sceneObject.SetVisibility(primitive.visible);
    if (primitive.material !== void 0) sceneObject.SetMaterial(primitive.material);
    if (primitive.parent !== void 0) this.setParent(__spreadProps(__spreadValues({}, primitive), { parent: primitive.parent }));
  }
  updateGroup(group) {
    let sceneObject = this.GetSceneObject(group);
    if (!sceneObject) {
      const created = new DIVEGroup();
      sceneObject = created;
      sceneObject.userData.id = group.id;
      this.add(sceneObject);
    }
    if (group.name !== void 0) sceneObject.name = group.name;
    if (group.position !== void 0) sceneObject.SetPosition(group.position);
    if (group.rotation !== void 0) sceneObject.SetRotation(group.rotation);
    if (group.scale !== void 0) sceneObject.SetScale(group.scale);
    if (group.visible !== void 0) sceneObject.SetVisibility(group.visible);
    if (group.bbVisible !== void 0) sceneObject.SetBoundingBoxVisibility(group.bbVisible);
    if (group.parent !== void 0) this.setParent(__spreadProps(__spreadValues({}, group), { parent: group.parent }));
  }
  deleteLight(light) {
    const sceneObject = this.GetSceneObject(light);
    if (!sceneObject) {
      console.warn(`Root.deleteLight: Light with id ${light.id} not found`);
      return;
    }
    this.detachTransformControls(sceneObject);
    this.remove(sceneObject);
  }
  deleteModel(model) {
    const sceneObject = this.GetSceneObject(model);
    if (!sceneObject) {
      console.warn(`Root.deleteModel: Model with id ${model.id} not found`);
      return;
    }
    this.detachTransformControls(sceneObject);
    this.remove(sceneObject);
  }
  deletePrimitive(primitive) {
    const sceneObject = this.GetSceneObject(primitive);
    if (!sceneObject) {
      console.warn(`Root.deletePrimitive: Primitive with id ${primitive.id} not found`);
      return;
    }
    this.detachTransformControls(sceneObject);
    this.remove(sceneObject);
  }
  deleteGroup(group) {
    const sceneObject = this.GetSceneObject(group);
    if (!sceneObject) {
      console.warn(`Root.deleteGroup: Group with id ${group.id} not found`);
      return;
    }
    this.detachTransformControls(sceneObject);
    for (let i = sceneObject.children.length - 1; i >= 0; i--) {
      this.attach(sceneObject.children[i]);
    }
    sceneObject.parent.remove(sceneObject);
  }
  placeOnFloor(object) {
    const sceneObject = this.GetSceneObject(object);
    if (!sceneObject) return;
    sceneObject.PlaceOnFloor();
  }
  setParent(object) {
    const sceneObject = this.GetSceneObject(object);
    if (!sceneObject) return;
    if (sceneObject.parent) {
      sceneObject.parent.remove(sceneObject);
    }
    if (object.parent !== null) {
      const parent = this.GetSceneObject(object.parent);
      if (!parent) return;
      parent.attach(sceneObject);
    } else {
      this.attach(sceneObject);
    }
  }
  detachTransformControls(object) {
    this.findScene(object).children.find((object2) => {
      if ("isTransformControls" in object2) {
        object2.detach();
      }
    });
  }
  findScene(object) {
    if (object.parent !== null) {
      return this.findScene(object.parent);
    }
    ;
    return object;
  }
};

// src/constant/GridColors.ts
var GRID_CENTER_LINE_COLOR = "#888888";
var GRID_SIDE_LINE_COLOR = "#dddddd";

// src/grid/Grid.ts
init_VisibilityLayerMask();
var import_three12 = require("three");
var DIVEGrid = class extends import_three12.Object3D {
  constructor() {
    super();
    this.name = "Grid";
    const grid = new import_three12.GridHelper(100, 100, GRID_CENTER_LINE_COLOR, GRID_SIDE_LINE_COLOR);
    grid.material.depthTest = false;
    grid.layers.mask = HELPER_LAYER_MASK;
    this.add(grid);
  }
  SetVisibility(visible) {
    this.visible = visible;
  }
};

// src/primitive/floor/Floor.ts
var import_three13 = require("three");
init_VisibilityLayerMask();
var DIVEFloor = class extends import_three13.Mesh {
  constructor() {
    super(new import_three13.PlaneGeometry(1e4, 1e4), new import_three13.MeshStandardMaterial({ color: new import_three13.Color(150 / 255, 150 / 255, 150 / 255) }));
    this.isFloor = true;
    this.name = "Floor";
    this.layers.mask = PRODUCT_LAYER_MASK;
    this.receiveShadow = true;
    this.rotateX(-Math.PI / 2);
  }
  SetVisibility(visible) {
    this.visible = visible;
  }
  SetColor(color) {
    this.material.color = new import_three13.Color(color);
  }
};

// src/scene/Scene.ts
var DIVEScene = class extends import_three14.Scene {
  get Root() {
    return this.root;
  }
  get Floor() {
    return this.floor;
  }
  get Grid() {
    return this.grid;
  }
  constructor() {
    super();
    this.background = new import_three14.Color(16777215);
    this.root = new DIVERoot();
    this.add(this.root);
    this.floor = new DIVEFloor();
    this.add(this.floor);
    this.grid = new DIVEGrid();
    this.add(this.grid);
  }
  SetBackground(color) {
    this.background = new import_three14.Color(color);
  }
  ComputeSceneBB() {
    return this.Root.ComputeSceneBB();
  }
  GetSceneObject(object) {
    return this.Root.GetSceneObject(object);
  }
  AddSceneObject(object) {
    this.Root.AddSceneObject(object);
  }
  UpdateSceneObject(object) {
    this.Root.UpdateSceneObject(object);
  }
  DeleteSceneObject(object) {
    this.Root.DeleteSceneObject(object);
  }
  PlaceOnFloor(object) {
    this.Root.PlaceOnFloor(object);
  }
};

// src/dive.ts
init_PerspectiveCamera();

// src/controls/OrbitControls.ts
var import_OrbitControls = require("three/examples/jsm/controls/OrbitControls");
var import_three15 = require("three");
var import_tween = require("@tweenjs/tween.js");
var DIVEOrbitControlsDefaultSettings = {
  enableDamping: true,
  dampingFactor: 0.04
};
var _DIVEOrbitControls = class _DIVEOrbitControls extends import_OrbitControls.OrbitControls {
  constructor(camera, renderer, animationSystem, settings = DIVEOrbitControlsDefaultSettings) {
    super(camera, renderer.domElement);
    this.last = null;
    this.animating = false;
    this.locked = false;
    this.stopMoveTo = () => {
    };
    this.stopRevertLast = () => {
    };
    this._removePreRenderCallback = () => {
    };
    this.preRenderCallback = () => {
      if (this.locked) return;
      this.update();
    };
    this._animationSystem = animationSystem;
    this.domElement = renderer.domElement;
    this.object = camera;
    const id = renderer.AddPreRenderCallback(() => {
      this.preRenderCallback();
    });
    this._removePreRenderCallback = () => {
      renderer.RemovePreRenderCallback(id);
    };
    this.enableDamping = settings.enableDamping || DIVEOrbitControlsDefaultSettings.enableDamping;
    this.dampingFactor = settings.dampingFactor || DIVEOrbitControlsDefaultSettings.dampingFactor;
    this.object.position.set(0, 2, 2);
    this.target.copy({ x: 0, y: 0.5, z: 0 });
    this.update();
  }
  Dispose() {
    this._removePreRenderCallback();
    this.dispose();
  }
  ComputeEncompassingView(bb) {
    const center = bb.getCenter(new import_three15.Vector3());
    const size = bb.getSize(new import_three15.Vector3());
    const distance = Math.max(size.x, size.y, size.z) * 1.25;
    const direction = this.object.position.clone().normalize();
    return {
      position: direction.multiplyScalar(distance),
      target: center
    };
  }
  ZoomIn(by) {
    const zoomBy = by || _DIVEOrbitControls.DEFAULT_ZOOM_FACTOR;
    const { minDistance, maxDistance } = this;
    this.minDistance = this.maxDistance = import_three15.MathUtils.clamp(this.getDistance() - zoomBy, minDistance + zoomBy, maxDistance - zoomBy);
    this.update();
    this.minDistance = minDistance;
    this.maxDistance = maxDistance;
  }
  ZoomOut(by) {
    const zoomBy = by || _DIVEOrbitControls.DEFAULT_ZOOM_FACTOR;
    const { minDistance, maxDistance } = this;
    this.minDistance = this.maxDistance = import_three15.MathUtils.clamp(this.getDistance() + zoomBy, minDistance + zoomBy, maxDistance - zoomBy);
    this.update();
    this.minDistance = minDistance;
    this.maxDistance = maxDistance;
  }
  MoveTo(pos, target, duration, lock) {
    if (this.animating) return;
    const toPosition = pos || this.object.position.clone();
    const toTarget = target || this.target.clone();
    this.stopRevertLast();
    if (!this.locked) this.last = { pos: this.object.position.clone(), target: this.target.clone() };
    this.animating = duration > 0;
    this.locked = lock;
    this.enabled = false;
    const tweenPos = this._animationSystem.Animate(this.object.position).to(toPosition, duration).easing(import_tween.Easing.Quadratic.Out).start();
    const tweenQuat = this._animationSystem.Animate(this.target).to(toTarget, duration).easing(import_tween.Easing.Quadratic.Out).onUpdate(() => {
      this.object.lookAt(this.target);
    }).onComplete(() => {
      this.animating = false;
      this.enabled = !lock;
    }).start();
    this.stopMoveTo = () => {
      tweenPos.stop();
      tweenQuat.stop();
    };
  }
  RevertLast(duration) {
    if (this.animating || !this.locked) return;
    this.stopMoveTo();
    this.animating = duration > 0;
    this.enabled = false;
    const { pos, target } = this.last;
    const tweenPos = this._animationSystem.Animate(this.object.position).to(pos, duration).easing(import_tween.Easing.Quadratic.Out).start();
    const tweenQuat = this._animationSystem.Animate(this.target).to(target, duration).easing(import_tween.Easing.Quadratic.Out).onUpdate(() => {
      this.object.lookAt(this.target);
    }).onComplete(() => {
      this.animating = false;
      this.locked = false;
      this.enabled = true;
    }).start();
    this.stopRevertLast = () => {
      tweenPos.stop();
      tweenQuat.stop();
    };
  }
};
_DIVEOrbitControls.DEFAULT_ZOOM_FACTOR = 1;
var DIVEOrbitControls = _DIVEOrbitControls;

// src/toolbox/Toolbox.ts
var DIVEToolbox = class {
  get selectTool() {
    if (!this._selectTool) {
      const DIVESelectTool2 = (init_SelectTool(), __toCommonJS(SelectTool_exports)).DIVESelectTool;
      this._selectTool = new DIVESelectTool2(this._scene, this._controller);
    }
    return this._selectTool;
  }
  constructor(scene, controller) {
    this._scene = scene;
    this._controller = controller;
    this._selectTool = null;
    this._activeTool = null;
  }
  Dispose() {
    this.removeEventListeners();
  }
  GetActiveTool() {
    return this._activeTool;
  }
  UseTool(tool) {
    var _a;
    (_a = this._activeTool) == null ? void 0 : _a.Deactivate();
    switch (tool) {
      case "select": {
        this.addEventListeners();
        this.selectTool.Activate();
        this._activeTool = this.selectTool;
        break;
      }
      case "none": {
        this.removeEventListeners();
        this._activeTool = null;
        break;
      }
      default: {
        throw new Error(`ToolBox.UseTool: Unknown tool: ${tool}`);
      }
    }
  }
  SetGizmoMode(mode) {
    this.selectTool.SetGizmoMode(mode);
  }
  SetGizmoVisibility(active) {
    this.selectTool.SetGizmoVisibility(active);
  }
  onPointerMove(e) {
    var _a;
    (_a = this._activeTool) == null ? void 0 : _a.onPointerMove(e);
  }
  onPointerDown(e) {
    var _a;
    (_a = this._activeTool) == null ? void 0 : _a.onPointerDown(e);
  }
  onPointerUp(e) {
    var _a;
    (_a = this._activeTool) == null ? void 0 : _a.onPointerUp(e);
  }
  onWheel(e) {
    var _a;
    (_a = this._activeTool) == null ? void 0 : _a.onWheel(e);
  }
  addEventListeners() {
    this._controller.domElement.addEventListener("pointermove", (e) => this.onPointerMove(e));
    this._controller.domElement.addEventListener("pointerdown", (e) => this.onPointerDown(e));
    this._controller.domElement.addEventListener("pointerup", (e) => this.onPointerUp(e));
    this._controller.domElement.addEventListener("wheel", (e) => this.onWheel(e));
  }
  removeEventListeners() {
    this._controller.domElement.removeEventListener("pointermove", (e) => this.onPointerMove(e));
    this._controller.domElement.removeEventListener("pointerdown", (e) => this.onPointerDown(e));
    this._controller.domElement.removeEventListener("pointerup", (e) => this.onPointerUp(e));
    this._controller.domElement.removeEventListener("wheel", (e) => this.onWheel(e));
  }
};
DIVEToolbox.DefaultTool = "select";

// src/animation/AnimationSystem.ts
var import_tween2 = require("@tweenjs/tween.js");
var DIVEAnimationSystem = class {
  constructor(renderer) {
    this._renderer = renderer;
    this._rendererCallbackId = this._renderer.AddPreRenderCallback(() => {
      this.Update();
    });
  }
  Dispose() {
    this._renderer.RemovePreRenderCallback(this._rendererCallbackId);
  }
  Update() {
    (0, import_tween2.update)();
  }
  Animate(object) {
    return new import_tween2.Tween(object);
  }
};

// src/axiscamera/AxisCamera.ts
var import_three16 = require("three");
var import_three_spritetext = __toESM(require("three-spritetext"), 1);
init_VisibilityLayerMask();

// src/constant/AxisHelperColors.ts
var AxesColorRedLetter = "#c20017";
var AxesColorGreenLetter = "#00ab26";
var AxesColorBlueLetter = "#0081d4";
var AxesColorRed = AxesColorRedLetter;
var AxesColorGreen = AxesColorGreenLetter;
var AxesColorBlue = AxesColorBlueLetter;

// src/axiscamera/AxisCamera.ts
var DIVEAxisCamera = class extends import_three16.OrthographicCamera {
  constructor(renderer, scene, controls) {
    super(-1, 1, 1, -1, 0.1, 100);
    this.layers.mask = COORDINATE_LAYER_MASK;
    this.axesHelper = new import_three16.AxesHelper(0.5);
    this.axesHelper.layers.mask = COORDINATE_LAYER_MASK;
    this.axesHelper.material.depthTest = false;
    this.axesHelper.position.set(0, 0, -1);
    this.axesHelper.setColors(
      new import_three16.Color(AxesColorRed),
      new import_three16.Color(AxesColorGreen),
      new import_three16.Color(AxesColorBlue)
    );
    const x = new import_three_spritetext.default("X", 0.2, AxesColorRedLetter);
    const y = new import_three_spritetext.default("Y", 0.2, AxesColorGreenLetter);
    const z = new import_three_spritetext.default("Z", 0.2, AxesColorBlueLetter);
    x.layers.mask = COORDINATE_LAYER_MASK;
    y.layers.mask = COORDINATE_LAYER_MASK;
    z.layers.mask = COORDINATE_LAYER_MASK;
    x.position.set(0.7, 0, 0);
    y.position.set(0, 0.7, 0);
    z.position.set(0, 0, 0.7);
    this.axesHelper.add(x);
    this.axesHelper.add(y);
    this.axesHelper.add(z);
    this.add(this.axesHelper);
    this._renderer = renderer;
    this._scene = scene;
    this._scene.add(this);
    const restoreViewport = new import_three16.Vector4();
    this._renderCallbackId = renderer.AddPostRenderCallback(() => {
      const restoreBackground = scene.background;
      scene.background = null;
      renderer.getViewport(restoreViewport);
      renderer.setViewport(0, 0, 150, 150);
      renderer.autoClear = false;
      this.SetFromCameraMatrix(controls.object.matrix);
      renderer.render(scene, this);
      renderer.setViewport(restoreViewport);
      renderer.autoClear = true;
      scene.background = restoreBackground;
    });
  }
  Dispose() {
    this._renderer.RemovePostRenderCallback(this._renderCallbackId);
    this._scene.remove(this);
  }
  SetFromCameraMatrix(matrix) {
    this.axesHelper.rotation.setFromRotationMatrix(new import_three16.Matrix4().extractRotation(matrix).invert());
  }
};

// src/helper/getObjectDelta/getObjectDelta.ts
var getObjectDelta = (a, b) => {
  if (Object.keys(a).length === 0 && Object.keys(b).length === 0) {
    return {};
  }
  if (typeof a !== "object" || typeof b !== "object") {
    return b;
  }
  let delta = {};
  Object.keys(b).forEach((key) => {
    if (!Object.keys(a).includes(key)) {
      delta = __spreadProps(__spreadValues({}, delta), { [key]: b[key] });
      return;
    }
    if (Array.isArray(b[key])) {
      if (!Array.isArray(a[key])) {
        delta = __spreadProps(__spreadValues({}, delta), { [key]: b[key] });
        return;
      }
      const aArray = a[key];
      const bArray = b[key];
      if (aArray.length === 0 && bArray.length === 0) {
        delta = __spreadValues({}, delta);
        return;
      }
      if (aArray.length !== bArray.length) {
        delta = __spreadProps(__spreadValues({}, delta), { [key]: b[key] });
        return;
      }
      const arrayDeltas = [];
      bArray.forEach((entry, index) => {
        const inArrayDelta = getObjectDelta(aArray[index], bArray[index]);
        if (Object.keys(inArrayDelta).length) {
          arrayDeltas.push(bArray[index]);
        }
      });
      if (Object.keys(arrayDeltas).length) {
        delta = __spreadProps(__spreadValues({}, delta), { [key]: arrayDeltas });
        return;
      }
      return;
    }
    if (typeof b[key] === "object") {
      if (typeof a[key] !== "object") {
        delta = __spreadProps(__spreadValues({}, delta), { [key]: b[key] });
        return;
      }
      const objectDelta = getObjectDelta(a[key], b[key]);
      if (Object.keys(objectDelta).length) {
        delta = __spreadProps(__spreadValues({}, delta), { [key]: objectDelta });
        return;
      }
    }
    if (a[key] !== b[key]) {
      delta = __spreadProps(__spreadValues({}, delta), { [key]: b[key] });
    }
  });
  return delta;
};

// src/dive.ts
var import_MathUtils2 = require("three/src/math/MathUtils");

// src/info/Info.ts
var DIVEInfo = class {
  /**
   *
   * @returns The system the user is using. Possible values are "Android", "iOS", "Windows", "MacOS", "Linux" or "Unknown".
   */
  static GetSystem() {
    const platform = navigator.platform;
    if (/Android/.test(navigator.userAgent)) {
      return "Android";
    } else if (/iPhone|iPad|iPod/.test(navigator.userAgent)) {
      return "iOS";
    } else if (platform.startsWith("Win")) {
      return "Windows";
    } else if (platform.startsWith("Mac")) {
      return "MacOS";
    } else if (platform.startsWith("Linux")) {
      return "Linux";
    } else {
      return "Unknown";
    }
  }
  /**
   * @returns A promise that resolves to a boolean indicating whether the user's device supports WebXR.
   */
  static GetSupportsWebXR() {
    return __async(this, null, function* () {
      if (this._supportsWebXR !== null) {
        return this._supportsWebXR;
      }
      if (!navigator.xr) {
        this._supportsWebXR = false;
        return this._supportsWebXR;
      }
      try {
        const supported = yield navigator.xr.isSessionSupported("immersive-ar");
        this._supportsWebXR = supported;
      } catch (error) {
        this._supportsWebXR = false;
      }
      return this._supportsWebXR;
    });
  }
  /**
   * @returns A boolean indicating whether the user's device supports AR Quick Look.
   */
  static GetSupportsARQuickLook() {
    const a = document.createElement("a");
    if (a.relList.supports("ar")) {
      return true;
    }
    const userAgent = navigator.userAgent;
    const isIOS = /iPad|iPhone|iPod/.test(userAgent) && !window.MSStream;
    if (!isIOS) {
      return false;
    }
    const match = userAgent.match(/OS (\d+)_/);
    if (!match || match.length < 2) {
      return false;
    }
    const iOSVersion = parseInt(match[1], 10);
    const minQuickLookVersion = 12;
    if (iOSVersion < minQuickLookVersion) {
      return false;
    }
    const isSupportedBrowser = /^((?!chrome|android).)*safari|CriOS|FxiOS/i.test(userAgent);
    if (isSupportedBrowser) {
      return true;
    }
    return false;
  }
  /**
   * @returns A boolean indicating whether the user's device is a mobile device.
   */
  static get isMobile() {
    return this.GetSystem() === "Android" || this.GetSystem() === "iOS";
  }
  /**
   * @returns A boolean indicating whether the user's device is a desktop device.
   */
  static get isDesktop() {
    return !this.isMobile;
  }
  /**
   * @returns A promise that resolves to a boolean indicating whether the user's device is capable of AR.
   */
  static GetIsARCapable() {
    return __async(this, null, function* () {
      if (this.GetSupportsARQuickLook()) {
        return true;
      }
      return yield this.GetSupportsWebXR();
    });
  }
};
DIVEInfo._supportsWebXR = null;

// src/math/helper/shift.ts
function shift(value, exponent) {
  const subvalues = (value + "e").split("e");
  return +(subvalues[0] + "e" + (+subvalues[1] + (exponent || 0)));
}

// src/math/ceil/ceilExp.ts
function ceilExp(number, decimals = 0) {
  const n = shift(number, +decimals);
  return shift(Math.ceil(n), -decimals);
}

// src/math/floor/floorExp.ts
function floorExp(number, decimals = 0) {
  const n = shift(number, +decimals);
  return shift(Math.floor(n), -decimals);
}

// src/math/round/roundExp.ts
function roundExponential(number, decimals = 0) {
  if (number < 0) return -roundExponential(-number, decimals);
  const n = shift(number, +decimals);
  return shift(Math.round(n), -decimals);
}

// src/math/signedAngleTo/signedAngleTo.ts
function signedAngleTo(vecA, vecB, planeNormal) {
  return Math.atan2(vecA.clone().cross(vecB).dot(planeNormal), vecB.clone().dot(vecA));
}

// src/math/toFixed/toFixedExp.ts
function toFixedExp(number, decimals = 0) {
  const n = shift(number, +decimals);
  return shift(Math.round(n), -decimals).toFixed(decimals);
}

// src/math/truncate/truncateExp.ts
function truncateExp(number, decimals = 0) {
  const n = shift(number, +decimals);
  return shift(Math.trunc(n), -decimals);
}

// src/math/index.ts
var DIVEMath = {
  ceilExp,
  floorExp,
  roundExp: roundExponential,
  toFixedExp,
  truncateExp,
  signedAngleTo
};

// src/dive.ts
var DIVEDefaultSettings = {
  autoResize: true,
  displayAxes: false,
  renderer: DIVERendererDefaultSettings,
  perspectiveCamera: DIVEPerspectiveCameraDefaultSettings,
  orbitControls: DIVEOrbitControlsDefaultSettings
};
var DIVE = class _DIVE {
  // static members
  static QuickView(uri) {
    const dive = new _DIVE();
    dive.Communication.PerformAction("SET_CAMERA_TRANSFORM", {
      position: { x: 0, y: 2, z: 2 },
      target: { x: 0, y: 0.5, z: 0 }
    });
    const lightid = (0, import_MathUtils2.generateUUID)();
    dive.Communication.PerformAction("ADD_OBJECT", {
      entityType: "light",
      type: "scene",
      name: "light",
      id: lightid,
      enabled: true,
      visible: true,
      intensity: 1,
      color: 16777215
    });
    const modelid = (0, import_MathUtils2.generateUUID)();
    dive.Communication.Subscribe("MODEL_LOADED", (data) => {
      if (data.id !== modelid) return;
      dive.Communication.PerformAction("PLACE_ON_FLOOR", {
        id: modelid
      });
      const transform = dive.Communication.PerformAction("COMPUTE_ENCOMPASSING_VIEW", {});
      dive.Communication.PerformAction("SET_CAMERA_TRANSFORM", {
        position: transform.position,
        target: transform.target
      });
    });
    dive.Communication.PerformAction("ADD_OBJECT", {
      entityType: "model",
      name: "object",
      id: modelid,
      position: { x: 0, y: 0, z: 0 },
      rotation: { x: 0, y: 0, z: 0 },
      scale: { x: 1, y: 1, z: 1 },
      uri,
      visible: true,
      loaded: false
    });
    dive.Communication.PerformAction("UPDATE_SCENE", {
      backgroundColor: 16777215,
      gridEnabled: false,
      floorColor: 16777215
    });
    return dive;
  }
  // getters
  get Communication() {
    return this.communication;
  }
  get Canvas() {
    return this.renderer.domElement;
  }
  get Info() {
    return DIVEInfo;
  }
  // setters
  set Settings(settings) {
    var _a;
    const settingsDelta = getObjectDelta(this._settings, settings);
    if (settingsDelta.renderer) this.renderer = new DIVERenderer(this._settings.renderer);
    if (settingsDelta.perspectiveCamera) {
      if (settingsDelta.perspectiveCamera.fov !== void 0) this.perspectiveCamera.fov = settingsDelta.perspectiveCamera.fov;
      if (settingsDelta.perspectiveCamera.near !== void 0) this.perspectiveCamera.near = settingsDelta.perspectiveCamera.near;
      if (settingsDelta.perspectiveCamera.far !== void 0) this.perspectiveCamera.far = settingsDelta.perspectiveCamera.far;
      this.perspectiveCamera.OnResize(this.renderer.domElement.width, this.renderer.domElement.height);
    }
    if (settingsDelta.orbitControls) {
      if (settingsDelta.orbitControls.enableDamping !== void 0) this.orbitControls.enableDamping = settingsDelta.orbitControls.enableDamping;
      if (settingsDelta.orbitControls.dampingFactor !== void 0) this.orbitControls.dampingFactor = settingsDelta.orbitControls.dampingFactor;
    }
    if (settingsDelta.autoResize !== this._settings.autoResize) {
      if (settingsDelta.autoResize) {
        this.addResizeObserver();
      } else {
        this.removeResizeObserver();
      }
    }
    if (settingsDelta.displayAxes) {
      this.axisCamera = new DIVEAxisCamera(this.renderer, this.scene, this.orbitControls);
    } else {
      (_a = this.axisCamera) == null ? void 0 : _a.Dispose();
      this.axisCamera = null;
    }
    Object.assign(this._settings, settings);
  }
  constructor(settings) {
    this._settings = __spreadValues(__spreadValues({}, DIVEDefaultSettings), settings !== void 0 ? settings : {});
    this._resizeObserverId = "";
    this._width = 0;
    this._height = 0;
    this.renderer = new DIVERenderer(this._settings.renderer);
    this.scene = new DIVEScene();
    this.perspectiveCamera = new DIVEPerspectiveCamera(this._settings.perspectiveCamera);
    this.animationSystem = new DIVEAnimationSystem(this.renderer);
    this.orbitControls = new DIVEOrbitControls(this.perspectiveCamera, this.renderer, this.animationSystem, this._settings.orbitControls);
    this.toolbox = new DIVEToolbox(this.scene, this.orbitControls);
    this.communication = new DIVECommunication(this.renderer, this.scene, this.orbitControls, this.toolbox);
    if (this._settings.displayAxes) {
      this.axisCamera = new DIVEAxisCamera(this.renderer, this.scene, this.orbitControls);
    } else {
      this.axisCamera = null;
    }
    if (this._settings.autoResize) {
      this.addResizeObserver();
    }
    this.renderer.StartRenderer(this.scene, this.perspectiveCamera);
    window.DIVE = {
      PrintScene: () => {
        console.log(this.scene);
      }
    };
    console.log("DIVE initialized");
  }
  Dispose() {
    var _a;
    this.removeResizeObserver();
    this.renderer.Dispose();
    this.orbitControls.Dispose();
    (_a = this.axisCamera) == null ? void 0 : _a.Dispose();
    this.animationSystem.Dispose();
    this.toolbox.Dispose();
    this.communication.DestroyInstance();
  }
  // methods
  OnResize(width, height) {
    this.renderer.OnResize(width, height);
    this.perspectiveCamera.OnResize(width, height);
  }
  addResizeObserver() {
    this._resizeObserverId = this.renderer.AddPreRenderCallback(() => {
      const canvasWrapper = this.renderer.domElement.parentElement;
      if (!canvasWrapper) return;
      const { clientWidth, clientHeight } = canvasWrapper;
      if (clientWidth === this._width && clientHeight === this._height) return;
      this.OnResize(clientWidth, clientHeight);
      this._width = clientWidth;
      this._height = clientHeight;
    });
  }
  removeResizeObserver() {
    this.renderer.RemovePreRenderCallback(this._resizeObserverId);
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  DIVE,
  DIVECommunication,
  DIVEDefaultSettings,
  DIVEMath
});
//# sourceMappingURL=dive.cjs.map