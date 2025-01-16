var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
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

// src/helper/isInterface/implementsInterface.ts
function implementsInterface(object, discriminator) {
  if (!object) return false;
  return discriminator in object;
}
var init_implementsInterface = __esm({
  "src/helper/isInterface/implementsInterface.ts"() {
    "use strict";
  }
});

// src/helper/findInterface/findInterface.ts
function findInterface(object, discriminator) {
  if (!object) return void 0;
  if (implementsInterface(object, discriminator)) return object;
  return findInterface(object.parent, discriminator);
}
var init_findInterface = __esm({
  "src/helper/findInterface/findInterface.ts"() {
    "use strict";
    init_implementsInterface();
  }
});

// src/toolbox/BaseTool.ts
import {
  Raycaster,
  Vector2,
  Vector3
} from "three";
var DIVEBaseTool;
var init_BaseTool = __esm({
  "src/toolbox/BaseTool.ts"() {
    "use strict";
    init_VisibilityLayerMask();
    init_findInterface();
    DIVEBaseTool = class {
      constructor(scene, controller) {
        this.POINTER_DRAG_THRESHOLD = 1e-3;
        this.name = "BaseTool";
        this._canvas = controller.domElement;
        this._scene = scene;
        this._controller = controller;
        this._pointer = new Vector2();
        this._pointerPrimaryDown = false;
        this._pointerMiddleDown = false;
        this._pointerSecondaryDown = false;
        this._lastPointerDown = new Vector2();
        this._lastPointerUp = new Vector2();
        this._raycaster = new Raycaster();
        this._raycaster.layers.mask = PRODUCT_LAYER_MASK | UI_LAYER_MASK;
        this._intersects = [];
        this._hovered = null;
        this._dragging = false;
        this._dragStart = new Vector3();
        this._dragCurrent = new Vector3();
        this._dragEnd = new Vector3();
        this._dragDelta = new Vector3();
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
          case 0: {
            this._pointerPrimaryDown = true;
            break;
          }
          case 1: {
            this._pointerMiddleDown = true;
            break;
          }
          case 2: {
            this._pointerSecondaryDown = true;
            break;
          }
          default: {
            console.warn(
              "DIVEBaseTool.onPointerDown: Unknown button: " + e.button
            );
          }
        }
        this._lastPointerDown.copy(this._pointer);
        this._draggable = findInterface(
          (_a = this._intersects[0]) == null ? void 0 : _a.object,
          "isDraggable"
        ) || null;
      }
      onDragStart(e) {
        if (!this._draggable) return;
        if (this._dragRaycastOnObjects !== null) {
          this._intersects = this._raycaster.intersectObjects(
            this._dragRaycastOnObjects,
            true
          );
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
        const hoverable = findInterface(
          (_a = this._intersects[0]) == null ? void 0 : _a.object,
          "isHoverable"
        );
        if (this._intersects[0] && hoverable) {
          if (!this._hovered) {
            if (hoverable.onPointerEnter)
              hoverable.onPointerEnter(this._intersects[0]);
            this._hovered = hoverable;
            return;
          }
          if (this._hovered.uuid !== hoverable.uuid) {
            if (this._hovered.onPointerLeave)
              this._hovered.onPointerLeave();
            if (hoverable.onPointerEnter)
              hoverable.onPointerEnter(this._intersects[0]);
            this._hovered = hoverable;
            return;
          }
          if (hoverable.onPointerOver)
            hoverable.onPointerOver(this._intersects[0]);
          this._hovered = hoverable;
        } else {
          if (this._hovered) {
            if (this._hovered.onPointerLeave)
              this._hovered.onPointerLeave();
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
          this._intersects = this._raycaster.intersectObjects(
            this._dragRaycastOnObjects,
            true
          );
        }
        const intersect = this._intersects[0];
        if (!intersect) return;
        this._dragCurrent.copy(intersect.point.clone());
        this._dragEnd.copy(intersect.point.clone());
        this._dragDelta.subVectors(
          this._dragCurrent.clone(),
          this._dragStart.clone()
        );
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
          this._dragDelta.subVectors(
            this._dragCurrent.clone(),
            this._dragStart.clone()
          );
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
        if (objects !== void 0)
          return this._raycaster.intersectObjects(objects, true).filter((i) => i.object.visible);
        return this._raycaster.intersectObjects(this._scene.children, true).filter((i) => i.object.visible);
      }
      pointerWasDragged() {
        return this._lastPointerDown.distanceTo(this._pointer) > this.POINTER_DRAG_THRESHOLD;
      }
    };
  }
});

// src/toolbox/transform/TransformTool.ts
import { TransformControls } from "three/examples/jsm/controls/TransformControls";
var DIVETransformTool;
var init_TransformTool = __esm({
  "src/toolbox/transform/TransformTool.ts"() {
    "use strict";
    init_BaseTool();
    init_implementsInterface();
    DIVETransformTool = class extends DIVEBaseTool {
      constructor(scene, controller) {
        super(scene, controller);
        this.isTransformTool = true;
        this.name = "DIVETransformTool";
        this._gizmo = this.initGizmo();
        this._scene.add(this._gizmo);
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
          if ("isTransformControls" in this._gizmo) {
            this._gizmo.getRaycaster().layers.enableAll();
          }
        } else if (!active && contains) {
          this._scene.remove(this._gizmo);
          if ("isTransformControls" in this._gizmo) {
            this._gizmo.getRaycaster().layers.disableAll();
          }
        }
      }
      // only used for optimizing pointer events with DIVEGizmo
      // public onPointerDown(e: PointerEvent): void {
      //     super.onPointerDown(e);
      //     if (this._hovered) {
      //         this._dragRaycastOnObjects = (
      //             this._gizmo as DIVEGizmo
      //         ).gizmoPlane?.children;
      //     }
      // }
      // only used for optimizing pointer events with DIVEGizmo
      // protected raycast(): Intersection[] {
      //     return super.raycast((this._gizmo as DIVEGizmo).gizmoNode.children);
      // }
      initGizmo() {
        const g = new TransformControls(
          // this._controller,
          this._controller.object,
          this._controller.domElement
        );
        g.mode = "translate";
        g.addEventListener("mouseDown", () => {
          this._controller.enabled = false;
          if (!implementsInterface(g.object, "isMovable"))
            return;
          if (!g.object.onMoveStart) return;
          g.object.onMoveStart();
        });
        g.addEventListener("objectChange", () => {
          if (!implementsInterface(g.object, "isMovable"))
            return;
          if (!g.object.onMove) return;
          g.object.onMove();
        });
        g.addEventListener("mouseUp", () => {
          this._controller.enabled = true;
          if (!implementsInterface(g.object, "isMovable"))
            return;
          if (!g.object.onMoveEnd) return;
          g.object.onMoveEnd();
        });
        return g;
      }
    };
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
    init_findInterface();
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
        this.AttachGizmo(selectable);
        if (selectable.onSelect) selectable.onSelect();
      }
      Deselect(selectable) {
        this.DetachGizmo();
        if (selectable.onDeselect) selectable.onDeselect();
      }
      AttachGizmo(selectable) {
        if ("isMovable" in selectable) {
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
        const selectable = findInterface(
          first == null ? void 0 : first.object,
          "isSelectable"
        );
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
import { PerspectiveCamera } from "three";
var DIVEPerspectiveCameraDefaultSettings, _DIVEPerspectiveCamera, DIVEPerspectiveCamera;
var init_PerspectiveCamera = __esm({
  "src/camera/PerspectiveCamera.ts"() {
    "use strict";
    init_VisibilityLayerMask();
    DIVEPerspectiveCameraDefaultSettings = {
      fov: 80,
      near: 0.1,
      far: 1e3
    };
    _DIVEPerspectiveCamera = class _DIVEPerspectiveCamera extends PerspectiveCamera {
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

// src/io/gltf/GLTFIO.ts
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { GLTFExporter } from "three/examples/jsm/exporters/GLTFExporter";
var DIVEGLTFIO;
var init_GLTFIO = __esm({
  "src/io/gltf/GLTFIO.ts"() {
    "use strict";
    DIVEGLTFIO = class {
      constructor() {
        this._importer = new GLTFLoader();
        this._exporter = new GLTFExporter();
      }
      Import(url, onProgress) {
        return this._importer.loadAsync(url, (progress) => {
          if (!onProgress) return;
          onProgress(progress.loaded / progress.total);
        });
      }
      Export(object, binary, onlyVisible) {
        if (binary) {
          return this._exporter.parseAsync(object, {
            binary,
            onlyVisible
          });
        } else {
          return this._exporter.parseAsync(object, {
            binary,
            onlyVisible
          });
        }
      }
    };
  }
});

// src/io/IO.ts
var IO_exports = {};
__export(IO_exports, {
  DIVEIO: () => DIVEIO
});
var DIVEIO;
var init_IO = __esm({
  "src/io/IO.ts"() {
    "use strict";
    init_GLTFIO();
    DIVEIO = class {
      constructor(scene) {
        this._scene = scene;
        this._gltfIO = new DIVEGLTFIO();
      }
      Import(type, url) {
        switch (type) {
          case "glb": {
            return this._gltfIO.Import(url).catch((error) => {
              console.error(error);
              return null;
            });
          }
          default: {
            console.error("DIVEIO.Import: Unsupported file type: " + type);
            return Promise.reject();
          }
        }
      }
      Export(type) {
        switch (type) {
          case "glb": {
            return this._gltfIO.Export(this._scene, true, true).then((data) => {
              return this._createBlobURL(data);
            }).catch((error) => {
              console.error(error);
              return null;
            });
          }
          default: {
            console.error("DIVEIO.Export: Unsupported file type: " + type);
            return Promise.reject();
          }
        }
      }
      _createBlobURL(data) {
        return URL.createObjectURL(new Blob([data]));
      }
    };
  }
});

// src/info/Info.ts
var WebXRUnsupportedReason, DIVEInfo;
var init_Info = __esm({
  "src/info/Info.ts"() {
    "use strict";
    WebXRUnsupportedReason = /* @__PURE__ */ ((WebXRUnsupportedReason2) => {
      WebXRUnsupportedReason2[WebXRUnsupportedReason2["UNKNWON_ERROR"] = 0] = "UNKNWON_ERROR";
      WebXRUnsupportedReason2[WebXRUnsupportedReason2["NO_HTTPS"] = 1] = "NO_HTTPS";
      WebXRUnsupportedReason2[WebXRUnsupportedReason2["IMMERSIVE_AR_NOT_SUPPORTED_BY_DEVICE"] = 2] = "IMMERSIVE_AR_NOT_SUPPORTED_BY_DEVICE";
      WebXRUnsupportedReason2[WebXRUnsupportedReason2["AR_SESSION_NOT_ALLOWED"] = 3] = "AR_SESSION_NOT_ALLOWED";
      return WebXRUnsupportedReason2;
    })(WebXRUnsupportedReason || {});
    DIVEInfo = class {
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
            if (window.isSecureContext === false) {
              this._webXRUnsupportedReason = 1 /* NO_HTTPS */;
            } else {
              this._webXRUnsupportedReason = 0 /* UNKNWON_ERROR */;
            }
            return this._supportsWebXR;
          }
          try {
            const supported = yield navigator.xr.isSessionSupported("immersive-ar");
            if (!supported) {
              this._webXRUnsupportedReason = 2 /* IMMERSIVE_AR_NOT_SUPPORTED_BY_DEVICE */;
            }
            this._supportsWebXR = supported;
          } catch (error) {
            this._supportsWebXR = false;
            this._webXRUnsupportedReason = 3 /* AR_SESSION_NOT_ALLOWED */;
          }
          return this._supportsWebXR;
        });
      }
      /**
       * @returns The reason why WebXR is not supported on the user's device. Returns null if WebXR is supported nor not has been checked yet.
       */
      static GetWebXRUnsupportedReason() {
        if (this._supportsWebXR === null) {
          console.log("WebXR support has not been checked yet.");
          return null;
        }
        return this._webXRUnsupportedReason;
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
    DIVEInfo._webXRUnsupportedReason = null;
  }
});

// src/exporters/usdz/USDZExporter.ts
import {
  USDZExporter
} from "three/examples/jsm/exporters/USDZExporter";
var DIVEUSDZExporter;
var init_USDZExporter = __esm({
  "src/exporters/usdz/USDZExporter.ts"() {
    "use strict";
    DIVEUSDZExporter = class extends USDZExporter {
      parse(scene, options) {
        return super.parse(scene, options);
      }
    };
  }
});

// src/ar/arquicklook/ARQuickLook.ts
import { Object3D as Object3D2 } from "three";
var DIVEARQuickLook;
var init_ARQuickLook = __esm({
  "src/ar/arquicklook/ARQuickLook.ts"() {
    "use strict";
    init_USDZExporter();
    DIVEARQuickLook = class {
      static Launch(scene, options) {
        const quickLookScene = new Object3D2();
        quickLookScene.add(...this.extractModels(scene));
        return this.launchARFromNode(quickLookScene, options);
      }
      static extractModels(scene) {
        return scene.Root.children;
      }
      static launchARFromNode(node, options) {
        return this._usdzExporter.parse(node, {
          quickLookCompatible: true,
          ar: {
            anchoring: { type: "plane" },
            planeAnchoring: {
              alignment: (options == null ? void 0 : options.arPlacement) === "vertical" ? "vertical" : "horizontal"
            }
          }
        }).then((usdz) => {
          const blob = new Blob([usdz], { type: "model/vnd.usdz+zip" });
          let url = URL.createObjectURL(blob);
          if ((options == null ? void 0 : options.arScale) === "fixed") {
            url = url.concat("#allowsContentScaling=0");
          }
          const a = document.createElement("a");
          a.innerHTML = "<picture></picture>";
          a.rel = "ar";
          a.href = url;
          a.download = "scene.usdz";
          a.click();
        });
      }
    };
    DIVEARQuickLook._usdzExporter = new DIVEUSDZExporter();
  }
});

// src/ar/webxr/overlay/Overlay.ts
var Overlay;
var init_Overlay = __esm({
  "src/ar/webxr/overlay/Overlay.ts"() {
    "use strict";
    Overlay = class {
      get Element() {
        return this._element;
      }
      get CloseButton() {
        return this._closeButton;
      }
      constructor() {
        this._element = document.createElement("div");
        this._closeButton = this.createCloseButton();
        this._element.appendChild(this._closeButton);
        document.body.appendChild(this._element);
      }
      createCloseButton() {
        const path = document.createElementNS(
          "http://www.w3.org/2000/svg",
          "path"
        );
        path.setAttribute("d", "M 12,12 L 28,28 M 28,12 12,28");
        path.setAttribute("stroke", "#fff");
        path.setAttribute("stroke-width", "2");
        const svg = document.createElementNS(
          "http://www.w3.org/2000/svg",
          "svg"
        );
        svg.setAttribute("width", "38");
        svg.setAttribute("height", "38");
        svg.style.position = "absolute";
        svg.style.right = "20px";
        svg.style.top = "20px";
        svg.appendChild(path);
        return svg;
      }
    };
  }
});

// src/ar/webxr/crosshair/WebXRCrosshair.ts
import { Mesh, MeshBasicMaterial, Object3D as Object3D3, RingGeometry } from "three";
var DIVEWebXRCrosshair;
var init_WebXRCrosshair = __esm({
  "src/ar/webxr/crosshair/WebXRCrosshair.ts"() {
    "use strict";
    DIVEWebXRCrosshair = class extends Object3D3 {
      set mesh(mesh) {
        this.clear();
        if (mesh) {
          this.add(mesh);
        }
      }
      constructor(mesh) {
        super();
        if (mesh) {
          this.mesh = mesh;
        } else {
          this.UseDefaultMesh();
        }
        this.matrixAutoUpdate = false;
        return this;
      }
      UseDefaultMesh() {
        const geometry = new RingGeometry(0.08, 0.1, 32).rotateX(-Math.PI / 2);
        const material = new MeshBasicMaterial();
        this.mesh = new Mesh(geometry, material);
      }
      UpdateFromPose(pose) {
        this.matrix.fromArray(pose.transform.matrix);
      }
    };
  }
});

// src/ar/webxr/raycaster/ar/WebXRRaycasterAR.ts
import { Matrix4, Vector3 as Vector32 } from "three";
var DIVEWebXRRaycasterAR;
var init_WebXRRaycasterAR = __esm({
  "src/ar/webxr/raycaster/ar/WebXRRaycasterAR.ts"() {
    "use strict";
    DIVEWebXRRaycasterAR = class {
      constructor(session, renderer) {
        this._referenceSpaceBuffer = null;
        this._requesting = false;
        this._initialized = false;
        this._session = session;
        this._renderer = renderer;
        this._hitMatrixBuffer = new Matrix4();
      }
      Dispose() {
        var _a;
        (_a = this._transientHitTestSource) == null ? void 0 : _a.cancel();
        this._transientHitTestSource = void 0;
        this._initialized = false;
      }
      Init() {
        return __async(this, null, function* () {
          if (!this._session) {
            console.error(
              "DIVEWebXRRaycaster: No session set in Init()! Aborting initialization..."
            );
            return Promise.reject();
          }
          if (this._requesting) {
            console.error(
              "DIVEWebXRRaycaster: Currently initializing! Aborting initialization..."
            );
            return Promise.reject();
          }
          if (this._initialized) {
            console.error(
              "DIVEWebXRRaycaster: Already initialized! Aborting initialization..."
            );
            return Promise.reject();
          }
          this._requesting = true;
          this._transientHitTestSource = yield this._session.requestHitTestSourceForTransientInput({
            profile: "generic-touchscreen"
          });
          this._referenceSpaceBuffer = this._renderer.xr.getReferenceSpace();
          this._requesting = false;
          if (!this._transientHitTestSource) {
            return Promise.reject();
          }
          this._initialized = true;
          console.log("DIVEWebXRRaycasterAR: Initialized");
          return Promise.resolve(this);
        });
      }
      GetIntersections(frame) {
        if (!this._transientHitTestSource) return [];
        const touches = frame.getHitTestResultsForTransientInput(
          this._transientHitTestSource
        );
        if (touches.length === 0) return [];
        const hits = touches.map((touch) => {
          if (!this._referenceSpaceBuffer) return void 0;
          if (!touch.results[0]) return void 0;
          if (!touch.results[0].getPose) return void 0;
          const pose = touch.results[0].getPose(this._referenceSpaceBuffer);
          if (!pose) return void 0;
          this._hitMatrixBuffer.fromArray(pose.transform.matrix);
          const position = new Vector32().setFromMatrixPosition(
            this._hitMatrixBuffer
          );
          return {
            point: position,
            matrix: this._hitMatrixBuffer,
            object: void 0
          };
        });
        return hits.filter((hit) => hit !== void 0);
      }
    };
  }
});

// src/ar/webxr/raycaster/three/WebXRRaycasterTHREE.ts
import {
  Raycaster as Raycaster2
} from "three";
var DIVEWebXRRaycasterTHREE;
var init_WebXRRaycasterTHREE = __esm({
  "src/ar/webxr/raycaster/three/WebXRRaycasterTHREE.ts"() {
    "use strict";
    DIVEWebXRRaycasterTHREE = class {
      constructor(renderer, scene) {
        // internal raycaster
        this._raycaster = new Raycaster2();
        this._renderer = renderer;
        this._scene = scene;
        this._controller = this._renderer.xr.getController(0);
      }
      Init() {
        return __async(this, null, function* () {
          console.log("DIVEWebXRRaycasterTHREE: Initialized");
          return Promise.resolve(this);
        });
      }
      GetIntersections() {
        this._controller.updateMatrixWorld();
        this._raycaster.setFromXRController(this._controller);
        const intersections = this._raycaster.intersectObjects(
          this._scene.XRRoot.XRModelRoot.children
        );
        if (intersections.length === 0) return [];
        return intersections.map((intersection) => {
          return {
            point: intersection.point,
            matrix: intersection.object.matrixWorld,
            object: intersection.object
          };
        });
      }
    };
  }
});

// src/events/EventExecutor.ts
var DIVEEventExecutor;
var init_EventExecutor = __esm({
  "src/events/EventExecutor.ts"() {
    "use strict";
    DIVEEventExecutor = class {
      constructor() {
        this._listeners = /* @__PURE__ */ new Map();
      }
      Subscribe(type, listener) {
        if (!this._listeners.get(type)) this._listeners.set(type, []);
        this._listeners.get(type).push(listener);
        return () => {
          const listenerArray = this._listeners.get(type);
          if (!listenerArray) return false;
          const existingIndex = listenerArray.findIndex(
            (entry) => entry === listener
          );
          if (existingIndex === -1) return false;
          listenerArray.splice(existingIndex, 1);
          return true;
        };
      }
      dispatch(type, payload) {
        const listenerArray = this._listeners.get(type);
        if (!listenerArray) return;
        listenerArray.forEach((listener) => listener(payload));
      }
    };
  }
});

// src/ar/webxr/raycaster/WebXRRaycaster.ts
var DIVEWebXRRaycaster;
var init_WebXRRaycaster = __esm({
  "src/ar/webxr/raycaster/WebXRRaycaster.ts"() {
    "use strict";
    init_WebXRRaycasterAR();
    init_WebXRRaycasterTHREE();
    init_EventExecutor();
    DIVEWebXRRaycaster = class extends DIVEEventExecutor {
      constructor(session, renderer, scene) {
        super();
        this._initialized = false;
        this._arHitResultBuffer = [];
        this._sceneHitResultBuffer = [];
        // buffers
        this._hasHit = false;
        this._session = session;
        this._threeRaycaster = new DIVEWebXRRaycasterTHREE(renderer, scene);
        this._arRaycaster = new DIVEWebXRRaycasterAR(session, renderer);
      }
      Dispose() {
        this._initialized = false;
      }
      Init() {
        return __async(this, null, function* () {
          if (!this._session) {
            console.error(
              "DIVEWebXRRaycaster: No session set in Init()! Aborting initialization..."
            );
            return Promise.reject();
          }
          if (this._initialized) {
            console.error(
              "DIVEWebXRRaycaster: Already initialized! Aborting initialization..."
            );
            return Promise.reject();
          }
          yield this._threeRaycaster.Init();
          yield this._arRaycaster.Init();
          console.log("DIVEWebXRRaycaster: Initialized");
          this._initialized = true;
          return Promise.resolve(this);
        });
      }
      GetARIntersections(frame) {
        this._arHitResultBuffer = this._arRaycaster.GetIntersections(frame);
        if (this._arHitResultBuffer.length > 0) {
          this.onARHitFound(this._arHitResultBuffer[0]);
        } else {
          this.onARHitLost();
        }
        return this._arHitResultBuffer;
      }
      GetSceneIntersections() {
        this._sceneHitResultBuffer = this._threeRaycaster.GetIntersections();
        if (this._sceneHitResultBuffer.length > 0) {
          this.onSceneHitFound(this._sceneHitResultBuffer[0]);
        } else {
          this.onSceneHitLost();
        }
        return this._sceneHitResultBuffer;
      }
      onARHitFound(hit) {
        this._hasHit = true;
        this.dispatch("AR_HIT_FOUND", { hit });
      }
      onARHitLost() {
        if (!this._hasHit) return;
        this._hasHit = false;
        this.dispatch("AR_HIT_LOST");
      }
      onSceneHitFound(hit) {
        this._hasHit = true;
        this.dispatch("SCENE_HIT_FOUND", { hit });
      }
      onSceneHitLost() {
        if (!this._hasHit) return;
        this._hasHit = false;
        this.dispatch("SCENE_HIT_LOST");
      }
    };
  }
});

// src/ar/webxr/origin/WebXROrigin.ts
import { Matrix4 as Matrix42, Quaternion, Vector3 as Vector33 } from "three";
var DIVEWebXROrigin;
var init_WebXROrigin = __esm({
  "src/ar/webxr/origin/WebXROrigin.ts"() {
    "use strict";
    DIVEWebXROrigin = class {
      constructor(session, renderer, entityTypes) {
        this._raycastHitCounter = 0;
        this._originSetResolve = () => {
        };
        this._renderer = renderer;
        this._session = session;
        this._originSet = new Promise((resolve) => {
          this._originSetResolve = resolve;
        });
        this._requesting = false;
        this._initialized = false;
        this._referenceSpaceBuffer = null;
        this._hitTestSource = null;
        this._entityTypes = entityTypes || ["plane"];
        this._hitTestResultBuffer = [];
        this._matrix = new Matrix42();
        this._position = new Vector33();
        this._quaternion = new Quaternion();
        this._scale = new Vector33();
        this._originSet.then(() => {
          this._matrix.decompose(
            this._position,
            this._quaternion,
            this._scale
          );
        });
      }
      get originSet() {
        return this._originSet;
      }
      get matrix() {
        return this._matrix;
      }
      set matrix(value) {
        this._matrix = value;
        this._matrix.decompose(this._position, this._quaternion, this._scale);
      }
      get position() {
        return this._position;
      }
      get quaternion() {
        return this._quaternion;
      }
      get scale() {
        return this._scale;
      }
      Init() {
        return __async(this, null, function* () {
          if (this._initialized) {
            return Promise.resolve(this);
          }
          if (!this._session) {
            console.error(
              "DIVEWebXROrigin: No session set in Init()! Aborting initialization..."
            );
            return Promise.reject();
          }
          if (this._requesting) {
            console.error(
              "DIVEWebXROrigin: Currently initializing! Aborting initialization..."
            );
            return Promise.reject();
          }
          this._requesting = true;
          const referenceSpace = yield this._session.requestReferenceSpace("viewer");
          this._hitTestSource = (yield this._session.requestHitTestSource({
            space: referenceSpace,
            entityTypes: this._entityTypes
          })) || null;
          this._requesting = false;
          if (!this._hitTestSource) {
            return Promise.reject();
          }
          this._initialized = true;
          return Promise.resolve(this);
        });
      }
      Dispose() {
        var _a;
        this._initialized = false;
        this._requesting = false;
        (_a = this._hitTestSource) == null ? void 0 : _a.cancel();
        this._hitTestSource = null;
        this._hitTestResultBuffer = [];
        this._matrix = new Matrix42();
        this._position = new Vector33();
        this._quaternion = new Quaternion();
        this._scale = new Vector33();
      }
      Update(frame) {
        if (!this._initialized) return;
        if (!this._hitTestSource) {
          throw new Error(
            "DIVEWebXRRaycaster: Critical Error: HitTestSource not available but WebXROrigin is initialized!"
          );
        }
        this._hitTestResultBuffer = frame.getHitTestResults(
          this._hitTestSource
        );
        if (this._hitTestResultBuffer.length > 0) {
          this._referenceSpaceBuffer = this._renderer.xr.getReferenceSpace();
          if (!this._referenceSpaceBuffer) {
            this.onHitLost();
            return;
          }
          const pose = this._hitTestResultBuffer[0].getPose(
            this._referenceSpaceBuffer
          );
          if (!pose) {
            this.onHitLost();
            return;
          }
          this.onHitFound(pose);
        } else {
          this.onHitLost();
        }
      }
      onHitFound(pose) {
        this._raycastHitCounter++;
        this.matrix.fromArray(pose.transform.matrix);
        if (this._raycastHitCounter > 50) {
          this._originSetResolve();
        }
      }
      onHitLost() {
        this._raycastHitCounter = 0;
      }
    };
  }
});

// src/ar/webxr/touchscreencontrols/WebXRTouchscreenControls.ts
import { Vector2 as Vector22 } from "three";
var DIVEWebXRTouchscreenControls;
var init_WebXRTouchscreenControls = __esm({
  "src/ar/webxr/touchscreencontrols/WebXRTouchscreenControls.ts"() {
    "use strict";
    init_EventExecutor();
    DIVEWebXRTouchscreenControls = class extends DIVEEventExecutor {
      constructor(session) {
        super();
        // touch members
        this._touchCount = 0;
        this._touches = [];
        // rotate members
        this._handleRotateStarted = false;
        this._handleRotateMoved = false;
        this._handleRotateEnded = false;
        this._startAngle = 0;
        this._lastAngle = 0;
        this._angleDelta = 0;
        // scale members
        this._handlePinchStarted = false;
        this._handlePinchMoved = false;
        this._handlePinchEnded = false;
        this._scaleDistanceStart = 0;
        this._currentDistance = 1;
        this._deltaDistance = 0;
        this._session = session;
        this._touches = [
          {
            start: new Vector22(),
            current: new Vector22(),
            delta: new Vector22()
          },
          {
            start: new Vector22(),
            current: new Vector22(),
            delta: new Vector22()
          }
        ];
        this._handleRotateStarted = false;
        window.addEventListener(
          "touchstart",
          (e) => this.onTouchStart(e)
        );
        window.addEventListener(
          "touchmove",
          (e) => this.onTouchMove(e)
        );
        window.addEventListener(
          "touchend",
          (e) => this.onTouchEnd(e)
        );
        this._session.addEventListener(
          "selectstart",
          () => this.onSessionSelectStart()
        );
        this._session.addEventListener(
          "selectend",
          () => this.onSessionSelectEnd()
        );
      }
      Dispose() {
        window.removeEventListener(
          "touchstart",
          (e) => this.onTouchStart(e)
        );
        window.removeEventListener(
          "touchmove",
          (e) => this.onTouchMove(e)
        );
        window.removeEventListener(
          "touchend",
          (e) => this.onTouchEnd(e)
        );
        this._session.removeEventListener(
          "selectstart",
          () => this.onSessionSelectStart()
        );
        this._session.removeEventListener(
          "selectend",
          () => this.onSessionSelectEnd()
        );
      }
      onTouchStart(event) {
        this._touchCount = event.touches.length;
        this._touches[0].start.set(
          event.touches[0].clientX,
          event.touches[0].clientY
        );
        this._touches[0].current.set(
          event.touches[0].clientX,
          event.touches[0].clientY
        );
        this._touches[0].delta.set(0, 0);
        if (this._touchCount > 1) {
          this._touches[1].start.set(
            event.touches[1].clientX,
            event.touches[1].clientY
          );
          this._touches[1].current.set(
            event.touches[1].clientX,
            event.touches[1].clientY
          );
          this._touches[1].delta.set(0, 0);
        }
        if (this._touchCount === 2) {
          this.handleRotateStart();
          this.handlePinchStart();
        }
        if (this._handleRotateStarted) {
          this.dispatch("ROTATE_START", {
            current: 0
          });
          this._handleRotateStarted = false;
        }
        if (this._handlePinchStarted) {
          this.dispatch("PINCH_START", {
            current: 0
          });
          this._handlePinchStarted = false;
        }
      }
      onTouchMove(event) {
        this._touchCount = event.touches.length;
        this._touches[0].start.set(
          event.touches[0].clientX,
          event.touches[0].clientY
        );
        this._touches[0].current.set(
          event.touches[0].clientX,
          event.touches[0].clientY
        );
        this._touches[0].delta.copy(
          this._touches[0].current.clone().sub(this._touches[0].start)
        );
        if (this._touchCount > 1) {
          this._touches[1].start.set(
            event.touches[1].clientX,
            event.touches[1].clientY
          );
          this._touches[1].current.set(
            event.touches[1].clientX,
            event.touches[1].clientY
          );
          this._touches[1].delta.copy(
            this._touches[1].current.clone().sub(this._touches[1].start)
          );
        }
        if (this._touchCount === 2) {
          this.handleRotateMoved();
          this.handlePinchMoved();
        }
        if (this._touchCount === 1) {
          this.dispatch("TOUCH_MOVE", {
            touches: [
              {
                current: this._touches[0].current.clone(),
                delta: this._touches[0].delta.clone()
              },
              {
                current: this._touches[1].current.clone(),
                delta: this._touches[1].delta.clone()
              }
            ],
            touchCount: this._touchCount
          });
        }
        if (this._touchCount === 2) {
          if (this._handleRotateMoved) {
            this.dispatch("ROTATE_MOVE", {
              current: this._lastAngle,
              delta: this._angleDelta
            });
            this._handleRotateMoved = false;
          }
          if (this._handlePinchMoved) {
            this.dispatch("PINCH_MOVE", {
              current: this._currentDistance,
              delta: this._deltaDistance
            });
            this._handlePinchMoved = false;
          }
        }
      }
      onTouchEnd(event) {
        this._touchCount = event.touches.length;
        if (this._touchCount === 0) {
          this._touches[0].start.set(0, 0);
          this._touches[0].current.set(0, 0);
          this._touches[0].delta.set(0, 0);
        }
        if (this._touchCount === 1) {
          this.handleRotateEnded();
          this.handlePinchEnded();
          this._touches[1].start.set(0, 0);
          this._touches[1].current.set(0, 0);
          this._touches[1].delta.set(0, 0);
        }
        if (this._handleRotateEnded) {
          this.dispatch("ROTATE_END", {
            current: this._lastAngle
          });
          this._handleRotateEnded = false;
        }
        if (this._handlePinchEnded) {
          this.dispatch("PINCH_END", {
            current: this._currentDistance
          });
          this._handlePinchEnded = false;
        }
      }
      onSessionSelectStart() {
        this.dispatch("TOUCH_START", {
          touches: [
            {
              current: this._touches[0].current.clone()
            },
            {
              current: this._touches[1].current.clone()
            }
          ],
          touchCount: this._touchCount
        });
      }
      onSessionSelectEnd() {
        this.dispatch("TOUCH_END", {
          touches: [
            {
              current: this._touches[0].current.clone()
            },
            {
              current: this._touches[1].current.clone()
            }
          ],
          touchCount: this._touchCount
        });
      }
      // rotation handler
      handleRotateStart() {
        this._handleRotateStarted = true;
        this._startAngle = this._touches[1].start.clone().sub(this._touches[0].current).angle();
      }
      handleRotateMoved() {
        this._handleRotateMoved = true;
        const currentAngle = this._touches[1].current.clone().sub(this._touches[0].current).angle();
        this._angleDelta = currentAngle - this._startAngle;
        this._lastAngle = this._angleDelta * -1;
      }
      handleRotateEnded() {
        this._handleRotateEnded = true;
      }
      // pinch handler
      handlePinchStart() {
        this._handlePinchStarted = true;
        this._scaleDistanceStart = this._touches[1].start.distanceTo(
          this._touches[0].current
        );
      }
      handlePinchMoved() {
        this._handlePinchMoved = true;
        const beforeDistance = this._currentDistance;
        const distance = this._touches[1].current.distanceTo(
          this._touches[0].current
        );
        this._currentDistance = distance / this._scaleDistanceStart;
        this._deltaDistance = this._currentDistance - beforeDistance;
      }
      handlePinchEnded() {
        this._handlePinchEnded = true;
      }
    };
  }
});

// src/ar/webxr/controller/WebXRController.ts
import {
  Mesh as Mesh2,
  Object3D as Object3D4,
  Quaternion as Quaternion2,
  Vector3 as Vector34
} from "three";
var DIVEWebXRController;
var init_WebXRController = __esm({
  "src/ar/webxr/controller/WebXRController.ts"() {
    "use strict";
    init_WebXRCrosshair();
    init_WebXRRaycaster();
    init_WebXROrigin();
    init_WebXRTouchscreenControls();
    init_findInterface();
    DIVEWebXRController = class extends Object3D4 {
      constructor(session, renderer, scene) {
        super();
        this._frameBuffer = null;
        this._handNodeInitialPosition = new Vector34();
        this._placed = false;
        // grabbing
        this._grabbedObject = null;
        this._arHitPosition = new Vector34();
        this._arHitQuaternion = new Quaternion2();
        this._arHitScale = new Vector34(1, 1, 1);
        // grabbing position
        this._initialObjectPosition = null;
        this._initialRaycastHit = null;
        this._deltaRaycastHit = new Vector34();
        // grabbing rotation
        this._touchQuaterion = new Quaternion2();
        // grabbing scale
        this._touchScale = 1;
        this._scaleThreshold = 0.1;
        this._startTouchQuaternion = new Quaternion2();
        this._startTouchScale = 1;
        this._renderer = renderer;
        this._scene = scene;
        this._session = session;
        this._xrRaycaster = new DIVEWebXRRaycaster(session, renderer, scene);
        this._origin = new DIVEWebXROrigin(this._session, this._renderer, [
          "plane"
        ]);
        this._crosshair = new DIVEWebXRCrosshair();
        this._crosshair.visible = false;
        this._xrCamera = this._renderer.xr.getCamera();
        this._scene.XRRoot.XRHandNode.position.set(0, -0.05, -0.25);
        this._handNodeInitialPosition = this._scene.XRRoot.XRHandNode.position.clone();
        this._touchscreenControls = new DIVEWebXRTouchscreenControls(
          this._session
        );
        this._touchscreenControls.Subscribe(
          "TOUCH_START",
          () => this.onTouchStart()
        );
        this._touchscreenControls.Subscribe(
          "TOUCH_MOVE",
          () => this.onTouchMove()
        );
        this._touchscreenControls.Subscribe(
          "TOUCH_END",
          (p) => this.onTouchEnd(p)
        );
        this._touchscreenControls.Subscribe(
          "ROTATE_START",
          () => this.onRotateStart()
        );
        this._touchscreenControls.Subscribe(
          "ROTATE_MOVE",
          (p) => this.onRotateMove(p)
        );
        this._touchscreenControls.Subscribe(
          "PINCH_START",
          () => this.onPinchStart()
        );
        this._touchscreenControls.Subscribe(
          "PINCH_MOVE",
          (p) => this.onPinchMove(p)
        );
      }
      Init() {
        return __async(this, null, function* () {
          this.prepareScene();
          yield this.initOrigin();
          yield this.initRaycaster();
          return Promise.resolve(this);
        });
      }
      Dispose() {
        this.restoreScene();
        this._origin.Dispose();
        this._xrRaycaster.Dispose();
        this._placed = false;
      }
      Update(frame) {
        this._frameBuffer = frame;
        if (!this._placed) {
          this.updateHandNode();
          if (this._origin) {
            this._origin.Update(frame);
          }
        }
      }
      updateHandNode() {
        this._xrCamera.updateMatrixWorld();
        this._scene.XRRoot.XRHandNode.position.copy(
          this._handNodeInitialPosition.clone().applyMatrix4(this._xrCamera.matrixWorld)
        );
        this._scene.XRRoot.XRHandNode.quaternion.setFromRotationMatrix(
          this._xrCamera.matrixWorld
        );
      }
      // placement
      initOrigin() {
        return __async(this, null, function* () {
          this._origin = yield this._origin.Init();
          this._origin.originSet.then(() => {
            this.placeObjects(this._origin.matrix);
          });
        });
      }
      placeObjects(matrix) {
        this._scene.XRRoot.XRModelRoot.matrix.copy(matrix);
        [...this._scene.XRRoot.XRHandNode.children].forEach((child) => {
          this._scene.XRRoot.XRModelRoot.add(child);
        });
        this._placed = true;
      }
      // grabbing
      updateObject() {
        if (!this._grabbedObject) return;
        this._grabbedObject.position.copy(this._arHitPosition);
        this._grabbedObject.quaternion.copy(
          this._arHitQuaternion.clone().multiply(this._touchQuaterion)
        );
        this._grabbedObject.scale.copy(
          new Vector34(
            this._touchScale,
            this._touchScale,
            this._touchScale
          ).multiply(this._arHitScale)
        );
      }
      onTouchStart() {
        const sceneHits = this._xrRaycaster.GetSceneIntersections();
        console.log("sceneHits", sceneHits);
        if (sceneHits.length === 0) return;
        if (!sceneHits[0].object) return;
        const moveable = findInterface(
          sceneHits[0].object,
          "isMovable"
        );
        if (!moveable) return;
        this._grabbedObject = moveable;
      }
      onTouchMove() {
        if (!this._frameBuffer) return;
        if (!this._grabbedObject) return;
        const intersections = this._xrRaycaster.GetARIntersections(
          this._frameBuffer
        );
        if (intersections.length === 0) {
          this._crosshair.visible = false;
          return;
        }
        const hit = intersections[0];
        this._crosshair.visible = true;
        this._crosshair.matrix.copy(hit.matrix);
        if (!this._grabbedObject) return;
        if (!this._initialObjectPosition || !this._initialRaycastHit) {
          this._initialObjectPosition = this._grabbedObject.position.clone();
          this._initialRaycastHit = hit.point.clone();
        }
        hit.matrix.decompose(
          this._arHitPosition,
          this._arHitQuaternion,
          this._arHitScale
        );
        this._deltaRaycastHit.copy(
          hit.point.clone().sub(this._initialRaycastHit)
        );
        this._arHitPosition.copy(
          this._initialObjectPosition.clone().add(this._deltaRaycastHit)
        );
        console.log("arHitPosition", this._arHitPosition);
        this.updateObject();
      }
      onTouchEnd(payload) {
        if (payload.touchCount === 0) {
          this._crosshair.visible = false;
          this._initialObjectPosition = null;
          this._initialRaycastHit = null;
          this._grabbedObject = null;
        }
      }
      onRotateStart() {
        this._startTouchQuaternion = this._touchQuaterion.clone();
      }
      onRotateMove(payload) {
        this._touchQuaterion.setFromAxisAngle(
          new Vector34(0, -1, 0),
          payload.delta * 3
        );
        this._touchQuaterion.multiply(this._startTouchQuaternion);
        this.updateObject();
      }
      onPinchStart() {
        this._startTouchScale = this._touchScale;
      }
      onPinchMove(payload) {
        this._touchScale = this._startTouchScale * payload.current;
        this.updateObject();
      }
      // prepare & cleanup scene
      prepareScene() {
        this._scene.XRRoot.XRModelRoot.matrixAutoUpdate = false;
        this._scene.add(this._crosshair);
        const children = [];
        this._scene.Root.children.forEach((child) => {
          const clone = child.clone();
          clone.layers.enableAll();
          clone.traverse((obj) => {
            obj.layers.enableAll();
            if (obj instanceof Mesh2) {
              obj.scale.set(0.1, 0.1, 0.1);
            }
          });
          clone.position.set(0, 0, 0);
          children.push(clone);
        });
        this._scene.XRRoot.XRHandNode.add(...children);
      }
      restoreScene() {
        this._scene.remove(this._crosshair);
        this._scene.XRRoot.XRHandNode.clear();
        this._scene.XRRoot.XRModelRoot.clear();
        this._scene.XRRoot.XRModelRoot.matrixAutoUpdate = true;
      }
      // raycast
      initRaycaster() {
        return __async(this, null, function* () {
          yield this._xrRaycaster.Init();
          if (!this._xrRaycaster) {
            console.error(
              "Raycaster not initialized successfully. Aborting WebXR..."
            );
            this.Dispose();
            return Promise.reject();
          }
        });
      }
    };
  }
});

// src/ar/webxr/WebXR.ts
var _DIVEWebXR, DIVEWebXR;
var init_WebXR = __esm({
  "src/ar/webxr/WebXR.ts"() {
    "use strict";
    init_Overlay();
    init_WebXRController();
    _DIVEWebXR = class _DIVEWebXR {
      static Launch(renderer, scene, controller) {
        return __async(this, null, function* () {
          this._renderer = renderer;
          this._scene = scene;
          this._controller = controller;
          this._cameraPosition = this._controller.object.position.clone();
          this._cameraTarget = this._controller.target.clone();
          if (!navigator.xr) {
            console.error("WebXR not supported");
            return Promise.reject();
          }
          this._renderer.xr.enabled = true;
          this._scene.InitXR(renderer);
          if (!_DIVEWebXR._overlay) {
            const overlay = new Overlay();
            _DIVEWebXR._overlay = overlay;
          }
          _DIVEWebXR._options.domOverlay = { root: _DIVEWebXR._overlay.Element };
          const session = yield navigator.xr.requestSession(
            "immersive-ar",
            this._options
          );
          session.addEventListener("end", () => {
            this._onSessionEnded();
          });
          renderer.xr.setReferenceSpaceType(this._referenceSpaceType);
          yield renderer.xr.setSession(session);
          _DIVEWebXR._overlay.Element.style.display = "";
          this._session = session;
          _DIVEWebXR._overlay.CloseButton.addEventListener(
            "click",
            () => this.End()
          );
          yield this._onSessionStarted();
          return Promise.resolve();
        });
      }
      static Update(_time, frame) {
        if (!this._session) return;
        if (this._xrController) {
          this._xrController.Update(frame);
        }
      }
      static End() {
        if (!this._session) return;
        this._session.end();
      }
      static _onSessionStarted() {
        return __async(this, null, function* () {
          if (!this._session) return;
          this._renderCallbackId = this._renderer.AddPreRenderCallback(
            (time, frame) => {
              this.Update(time, frame);
            }
          );
          this._xrController = new DIVEWebXRController(
            this._session,
            this._renderer,
            this._scene
          );
          yield this._xrController.Init().catch(() => {
            this.End();
          });
          return Promise.resolve();
        });
      }
      static _onSessionEnded() {
        if (!this._session) return;
        if (this._xrController) {
          this._xrController.Dispose();
        }
        if (this._renderCallbackId) {
          this._renderer.RemovePreRenderCallback(this._renderCallbackId);
          this._renderCallbackId = null;
        }
        this._renderer.xr.enabled = false;
        const canvasWrapper = this._renderer.domElement.parentElement;
        if (canvasWrapper) {
          const { clientWidth, clientHeight } = canvasWrapper;
          this._renderer.OnResize(clientWidth, clientHeight);
          this._controller.object.OnResize(clientWidth, clientHeight);
        }
        this._controller.object.position.copy(this._cameraPosition);
        this._controller.target.copy(this._cameraTarget);
        this._cameraPosition.set(0, 0, 0);
        this._cameraTarget.set(0, 0, 0);
        this._scene.DisposeXR();
        this._session.removeEventListener("end", this._onSessionEnded);
        _DIVEWebXR._overlay.Element.style.display = "none";
        this._session = null;
      }
    };
    // render loop members
    _DIVEWebXR._renderCallbackId = null;
    // setup members
    _DIVEWebXR._session = null;
    _DIVEWebXR._referenceSpaceType = "local";
    _DIVEWebXR._overlay = null;
    _DIVEWebXR._options = {
      requiredFeatures: [
        "local",
        "hit-test"
      ],
      optionalFeatures: [
        "light-estimation",
        "local-floor",
        "dom-overlay",
        "depth-sensing"
      ],
      depthSensing: {
        usagePreference: ["gpu-optimized"],
        dataFormatPreference: []
      },
      domOverlay: { root: {} }
    };
    _DIVEWebXR._xrController = null;
    DIVEWebXR = _DIVEWebXR;
  }
});

// src/ar/sceneviewer/SceneViewer.ts
var DIVESceneViewer;
var init_SceneViewer = __esm({
  "src/ar/sceneviewer/SceneViewer.ts"() {
    "use strict";
    DIVESceneViewer = class {
      static Launch(scene, options) {
        const url = this.findSceneViewerSrc(scene);
        this.launchSceneViewer(url, options);
      }
      static launchSceneViewer(url, options) {
        const anchor = document.createElement("a");
        const noArViewerSigil = "#model-viewer-no-ar-fallback";
        const location = self.location.toString();
        const locationUrl = new URL(location);
        const modelUrl = new URL(url, location);
        const params = new URLSearchParams(modelUrl.search);
        locationUrl.hash = noArViewerSigil;
        params.set("mode", "ar_only");
        if ((options == null ? void 0 : options.arScale) === "fixed") {
          params.set("resizable", "false");
        }
        if ((options == null ? void 0 : options.arPlacement) === "vertical") {
          params.set("enable_vertical_placement", "true");
        }
        const intent = `intent://arvr.google.com/scene-viewer/1.2?${params.toString() + "&file=" + modelUrl.toString()}#Intent;scheme=https;package=com.google.android.googlequicksearchbox;action=android.intent.action.VIEW;S.browser_fallback_url=${encodeURIComponent(
          locationUrl.toString()
        )};end;`;
        anchor.setAttribute("href", intent);
        anchor.click();
      }
      static findSceneViewerSrc(scene) {
        let uri = null;
        scene.traverse((object) => {
          if (uri) return;
          if (object.userData.uri) {
            uri = object.userData.uri;
          }
        });
        if (!uri) {
          throw new Error("No model found in scene");
        }
        return uri;
      }
    };
  }
});

// src/ar/AR.ts
var AR_exports = {};
__export(AR_exports, {
  DIVEAR: () => DIVEAR
});
var DIVEAR;
var init_AR = __esm({
  "src/ar/AR.ts"() {
    "use strict";
    init_Info();
    init_ARQuickLook();
    init_WebXR();
    init_SceneViewer();
    DIVEAR = class {
      constructor(renderer, scene, controller) {
        this._renderer = renderer;
        this._scene = scene;
        this._controller = controller;
      }
      Launch(options) {
        return __async(this, null, function* () {
          const system = DIVEInfo.GetSystem();
          if (system === "iOS") {
            return this.tryARQuickLook();
          }
          if (system === "Android") {
            if (options == null ? void 0 : options.useWebXR) {
              console.warn("DIVE: WebXR is experimental on Android.");
              return this.tryWebXR();
            }
            return this.trySceneViewer();
          }
          console.log(
            "DIVE: AR not supported. Not a mobile system. (System is " + system + ")"
          );
        });
      }
      tryARQuickLook(options) {
        return __async(this, null, function* () {
          const support = DIVEInfo.GetSupportsARQuickLook();
          if (!support) {
            console.log("ARQuickLook not supported");
            return Promise.reject();
          }
          console.log("DIVE: Launching AR with ARQuickLook ...");
          yield DIVEARQuickLook.Launch(this._scene, options);
          return Promise.resolve();
        });
      }
      tryWebXR() {
        return __async(this, null, function* () {
          const support = yield DIVEInfo.GetSupportsWebXR();
          if (!support) {
            console.log(
              "WebXR not supported. Reason: " + WebXRUnsupportedReason[DIVEInfo.GetWebXRUnsupportedReason()]
            );
            return Promise.reject();
          }
          console.log("DIVE: Launching AR with WebXR ...");
          yield DIVEWebXR.Launch(this._renderer, this._scene, this._controller);
          return Promise.resolve();
        });
      }
      trySceneViewer(options) {
        return __async(this, null, function* () {
          console.log("DIVE: Launching AR with SceneViewer ...");
          DIVESceneViewer.Launch(this._scene, options);
          return Promise.resolve();
        });
      }
    };
  }
});

// src/renderer/Renderer.ts
import {
  MathUtils,
  NoToneMapping,
  PCFSoftShadowMap,
  WebGLRenderer
} from "three";
var DIVERendererDefaultSettings = {
  antialias: true,
  alpha: true,
  stencil: false,
  shadowMapEnabled: true,
  shadowMapType: PCFSoftShadowMap,
  toneMapping: NoToneMapping,
  canvas: void 0
};
var DIVERenderer = class extends WebGLRenderer {
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
    this.setAnimationLoop((time, frame) => {
      this.internal_render(scene, cam, time, frame);
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
    const newUUID = MathUtils.generateUUID();
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
    const newUUID = MathUtils.generateUUID();
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
  internal_render(scene, cam, time, frame) {
    if ((this.paused || !this.running) && !this.force) return;
    this.preRenderCallbacks.forEach((callback) => {
      callback(time, frame);
    });
    this.render(scene, cam);
    this.postRenderCallbacks.forEach((callback) => {
      callback(time, frame);
    });
    this.force = false;
  }
};

// src/scene/Scene.ts
import { Color as Color7, Scene as Scene2 } from "three";

// src/scene/root/Root.ts
import { Box3 as Box32, Color as Color5, Object3D as Object3D8 } from "three";

// src/light/AmbientLight.ts
init_VisibilityLayerMask();
import { AmbientLight, Object3D } from "three";
var DIVEAmbientLight = class extends Object3D {
  constructor() {
    super();
    this.isDIVELight = true;
    this.isDIVEAmbientLight = true;
    this.name = "DIVEAmbientLight";
    this._light = new AmbientLight(16777215, 1);
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
import {
  PointLight,
  SphereGeometry,
  MeshBasicMaterial as MeshBasicMaterial2,
  Mesh as Mesh3,
  FrontSide,
  Object3D as Object3D5
} from "three";

// src/com/Communication.ts
init_SelectTool();
import { generateUUID } from "three/src/math/MathUtils";
import { merge } from "lodash";
var _DIVECommunication = class _DIVECommunication {
  constructor(renderer, scene, controls, toolbox) {
    this.registered = /* @__PURE__ */ new Map();
    // private listeners: { [key: string]: EventListener[] } = {};
    this.listeners = /* @__PURE__ */ new Map();
    this._id = generateUUID();
    this.renderer = renderer;
    this.scene = scene;
    this.controller = controls;
    this.toolbox = toolbox;
    this._mediaGenerator = null;
    this._io = null;
    this._ar = null;
    _DIVECommunication.__instances.push(this);
  }
  static get(id) {
    const fromComID = this.__instances.find(
      (instance) => instance.id === id
    );
    if (fromComID) return fromComID;
    return this.__instances.find(
      (instance) => Array.from(instance.registered.values()).find(
        (object) => object.id === id
      )
    );
  }
  get id() {
    return this._id;
  }
  get mediaGenerator() {
    if (!this._mediaGenerator) {
      const DIVEMediaCreator2 = (init_MediaCreator(), __toCommonJS(MediaCreator_exports)).DIVEMediaCreator;
      this._mediaGenerator = new DIVEMediaCreator2(
        this.renderer,
        this.scene,
        this.controller
      );
    }
    return this._mediaGenerator;
  }
  get io() {
    if (!this._io) {
      const DIVEIO2 = (init_IO(), __toCommonJS(IO_exports)).DIVEIO;
      this._io = new DIVEIO2(this.scene);
    }
    return this._io;
  }
  get ar() {
    if (!this._ar) {
      const DIVEAR2 = (init_AR(), __toCommonJS(AR_exports)).DIVEAR;
      this._ar = new DIVEAR2(this.renderer, this.scene, this.controller);
    }
    return this._ar;
  }
  DestroyInstance() {
    const existingIndex = _DIVECommunication.__instances.findIndex(
      (entry) => entry.id === this.id
    );
    if (existingIndex === -1) return false;
    _DIVECommunication.__instances.splice(existingIndex, 1);
    return true;
  }
  PerformAction(action, payload) {
    let returnValue = false;
    switch (action) {
      case "GET_ALL_SCENE_DATA": {
        returnValue = this.getAllSceneData(
          payload
        );
        break;
      }
      case "GET_ALL_OBJECTS": {
        returnValue = this.getAllObjects(
          payload
        );
        break;
      }
      case "GET_OBJECTS": {
        returnValue = this.getObjects(
          payload
        );
        break;
      }
      case "ADD_OBJECT": {
        returnValue = this.addObject(
          payload
        );
        break;
      }
      case "UPDATE_OBJECT": {
        returnValue = this.updateObject(
          payload
        );
        break;
      }
      case "DELETE_OBJECT": {
        returnValue = this.deleteObject(
          payload
        );
        break;
      }
      case "SELECT_OBJECT": {
        returnValue = this.selectObject(
          payload
        );
        break;
      }
      case "DESELECT_OBJECT": {
        returnValue = this.deselectObject(
          payload
        );
        break;
      }
      case "SET_BACKGROUND": {
        returnValue = this.setBackground(
          payload
        );
        break;
      }
      case "DROP_IT": {
        returnValue = this.dropIt(
          payload
        );
        break;
      }
      case "PLACE_ON_FLOOR": {
        returnValue = this.placeOnFloor(
          payload
        );
        break;
      }
      case "SET_CAMERA_TRANSFORM": {
        returnValue = this.setCameraTransform(
          payload
        );
        break;
      }
      case "GET_CAMERA_TRANSFORM": {
        returnValue = this.getCameraTransform(
          payload
        );
        break;
      }
      case "MOVE_CAMERA": {
        returnValue = this.moveCamera(
          payload
        );
        break;
      }
      case "RESET_CAMERA": {
        returnValue = this.resetCamera(
          payload
        );
        break;
      }
      case "COMPUTE_ENCOMPASSING_VIEW": {
        returnValue = this.computeEncompassingView(
          payload
        );
        break;
      }
      case "SET_CAMERA_LAYER": {
        returnValue = this.setCameraLayer(
          payload
        );
        break;
      }
      case "ZOOM_CAMERA": {
        returnValue = this.zoomCamera(
          payload
        );
        break;
      }
      case "SET_GIZMO_MODE": {
        returnValue = this.setGizmoMode(
          payload
        );
        break;
      }
      case "SET_GIZMO_VISIBILITY": {
        returnValue = this.setGizmoVisibility(
          payload
        );
        break;
      }
      case "USE_TOOL": {
        returnValue = this.useTool(
          payload
        );
        break;
      }
      case "MODEL_LOADED": {
        returnValue = this.modelLoaded(
          payload
        );
        break;
      }
      case "UPDATE_SCENE": {
        returnValue = this.updateScene(
          payload
        );
        break;
      }
      case "GENERATE_MEDIA": {
        returnValue = this.generateMedia(
          payload
        );
        break;
      }
      case "SET_PARENT": {
        returnValue = this.setParent(
          payload
        );
        break;
      }
      case "EXPORT_SCENE": {
        returnValue = this.exportScene(
          payload
        );
        break;
      }
      case "LAUNCH_AR": {
        returnValue = this.ar.Launch(
          payload
        );
        break;
      }
      default: {
        console.warn(
          `DIVECommunication.PerformAction: has been executed with unknown Action type ${action}`
        );
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
      const existingIndex = listenerArray.findIndex(
        (entry) => entry === listener
      );
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
      lights: Array.from(this.registered.values()).filter(
        (object) => object.entityType === "light"
      ),
      objects: Array.from(this.registered.values()).filter(
        (object) => object.entityType === "model"
      ),
      cameras: Array.from(this.registered.values()).filter(
        (object) => object.entityType === "pov"
      ),
      primitives: Array.from(this.registered.values()).filter(
        (object) => object.entityType === "primitive"
      ),
      groups: Array.from(this.registered.values()).filter(
        (object) => object.entityType === "group"
      )
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
    if (payload.parentId === void 0) payload.parentId = null;
    this.registered.set(payload.id, payload);
    this.scene.AddSceneObject(payload);
    return true;
  }
  updateObject(payload) {
    const objectToUpdate = this.registered.get(payload.id);
    if (!objectToUpdate) return false;
    this.registered.set(payload.id, merge(objectToUpdate, payload));
    const updatedObject = this.registered.get(payload.id);
    this.scene.UpdateSceneObject(__spreadProps(__spreadValues({}, payload), {
      id: updatedObject.id,
      entityType: updatedObject.entityType
    }));
    Object.assign(payload, updatedObject);
    return true;
  }
  deleteObject(payload) {
    const deletedObject = this.registered.get(payload.id);
    if (!deletedObject) return false;
    if (deletedObject.parentId) {
      this.setParent({
        object: { id: deletedObject.id },
        parent: null
      });
    }
    if (deletedObject.entityType === "group") {
      this.registered.forEach((object) => {
        if (object.parentId === deletedObject.id) {
          this.updateObject({
            id: object.id,
            parentId: null
          });
        }
      });
    }
    Object.assign(payload, deletedObject);
    this.registered.delete(payload.id);
    Array.from(this.registered.values()).forEach((object) => {
      if (!object.parentId) return;
      if (object.parentId !== payload.id) return;
      object.parentId = null;
    });
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
    const object = this.registered.get(payload.id);
    if (!object) return false;
    this.scene.PlaceOnFloor(object);
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
    this.controller.MoveTo(
      position,
      target,
      payload.duration,
      payload.locked
    );
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
    if (payload.backgroundColor !== void 0)
      this.scene.SetBackground(payload.backgroundColor);
    if (payload.gridEnabled !== void 0)
      this.scene.Grid.SetVisibility(payload.gridEnabled);
    if (payload.floorEnabled !== void 0)
      this.scene.Floor.SetVisibility(payload.floorEnabled);
    if (payload.floorColor !== void 0)
      this.scene.Floor.SetColor(payload.floorColor);
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
    payload.dataUri = this.mediaGenerator.GenerateMedia(
      position,
      target,
      payload.width,
      payload.height
    );
    return true;
  }
  setParent(payload) {
    const object = this.registered.get(payload.object.id);
    if (!object) return false;
    const sceneObject = this.scene.GetSceneObject(object);
    if (!sceneObject) return false;
    if (payload.parent === null) {
      this.scene.Root.attach(sceneObject);
      this.updateObject({
        id: object.id,
        parentId: null
      });
      return true;
    }
    if (payload.object.id === payload.parent.id) {
      return false;
    }
    const parent = this.registered.get(payload.parent.id);
    if (!parent) {
      this.scene.Root.attach(sceneObject);
      this.updateObject({
        id: object.id,
        parentId: null
      });
      return true;
    }
    const parentObject = this.scene.GetSceneObject(parent);
    if (!parentObject) {
      this.scene.Root.attach(sceneObject);
      this.updateObject({
        id: object.id,
        parentId: null
      });
      return true;
    }
    parentObject.attach(sceneObject);
    this.updateObject({
      id: object.id,
      parentId: parent.id
    });
    return true;
  }
  exportScene(payload) {
    return this.io.Export(payload.type);
  }
};
_DIVECommunication.__instances = [];
var DIVECommunication = _DIVECommunication;

// src/light/PointLight.ts
init_VisibilityLayerMask();
var DIVEPointLight = class extends Object3D5 {
  constructor() {
    super();
    this.isDIVELight = true;
    this.isDIVEPointLight = true;
    this.isMovable = true;
    this.isSelectable = true;
    this.gizmo = null;
    this.name = "DIVEPointLight";
    this.light = new PointLight(16777215, 1);
    this.light.layers.mask = PRODUCT_LAYER_MASK;
    this.light.castShadow = true;
    this.light.shadow.mapSize.width = 512;
    this.light.shadow.mapSize.height = 512;
    this.add(this.light);
    const geoSize = 0.1;
    const geometry = new SphereGeometry(
      geoSize,
      geoSize * 320,
      geoSize * 320
    );
    const material = new MeshBasicMaterial2({
      color: this.light.color,
      transparent: true,
      opacity: 0.8,
      side: FrontSide
    });
    this.mesh = new Mesh3(geometry, material);
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
    (_a = DIVECommunication.get(this.userData.id)) == null ? void 0 : _a.PerformAction(
      "UPDATE_OBJECT",
      { id: this.userData.id, position: this.position }
    );
  }
  onSelect() {
    var _a;
    (_a = DIVECommunication.get(this.userData.id)) == null ? void 0 : _a.PerformAction(
      "SELECT_OBJECT",
      { id: this.userData.id }
    );
  }
  onDeselect() {
    var _a;
    (_a = DIVECommunication.get(this.userData.id)) == null ? void 0 : _a.PerformAction(
      "DESELECT_OBJECT",
      { id: this.userData.id }
    );
  }
};

// src/light/SceneLight.ts
init_VisibilityLayerMask();
import { DirectionalLight, HemisphereLight, Object3D as Object3D6 } from "three";
var DIVESceneLight = class extends Object3D6 {
  constructor() {
    super();
    this.isDIVELight = true;
    this.isDIVESceneLight = true;
    this.name = "DIVESceneLight";
    this._hemiLight = new HemisphereLight(16777215, 16777215, 2);
    this._hemiLight.layers.mask = PRODUCT_LAYER_MASK;
    this._hemiLight.position.set(0, 50, 0);
    this.add(this._hemiLight);
    this._dirLight = new DirectionalLight(16777215, 3);
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
init_VisibilityLayerMask();
import { MeshStandardMaterial, Raycaster as Raycaster3, Vector3 as Vector36 } from "three";

// src/helper/findSceneRecursive/findSceneRecursive.ts
var findSceneRecursive = (object) => {
  if (object.parent) {
    return findSceneRecursive(object.parent);
  }
  return object;
};

// src/node/Node.ts
init_VisibilityLayerMask();
import { Box3, Object3D as Object3D7, Vector3 as Vector35 } from "three";
var DIVENode = class extends Object3D7 {
  constructor() {
    super();
    this.isDIVENode = true;
    this.isSelectable = true;
    this.isMovable = true;
    this.gizmo = null;
    this.layers.mask = PRODUCT_LAYER_MASK;
    this._positionWorldBuffer = new Vector35();
    this._boundingBox = new Box3();
  }
  SetPosition(position) {
    if (!this.parent) {
      this.position.set(position.x, position.y, position.z);
      return;
    }
    const newPosition = new Vector35(position.x, position.y, position.z);
    this.position.copy(this.parent.worldToLocal(newPosition));
    if ("isDIVEGroup" in this.parent) {
      this.parent.UpdateLineTo(this);
    }
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
    (_a = DIVECommunication.get(this.userData.id)) == null ? void 0 : _a.PerformAction(
      "UPDATE_OBJECT",
      {
        id: this.userData.id,
        position: this.getWorldPosition(this._positionWorldBuffer),
        rotation: this.rotation,
        scale: this.scale
      }
    );
  }
  /**
   * Can be called when the object is moved from a foreign object (gizmo, parent, etc.) to update the object's position.
   */
  onMove() {
    var _a;
    (_a = DIVECommunication.get(this.userData.id)) == null ? void 0 : _a.PerformAction(
      "UPDATE_OBJECT",
      {
        id: this.userData.id,
        position: this.getWorldPosition(this._positionWorldBuffer),
        rotation: this.rotation,
        scale: this.scale
      }
    );
  }
  onSelect() {
    var _a;
    (_a = DIVECommunication.get(this.userData.id)) == null ? void 0 : _a.PerformAction(
      "SELECT_OBJECT",
      { id: this.userData.id }
    );
  }
  onDeselect() {
    var _a;
    (_a = DIVECommunication.get(this.userData.id)) == null ? void 0 : _a.PerformAction(
      "DESELECT_OBJECT",
      { id: this.userData.id }
    );
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
    this._boundingBox.makeEmpty();
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
      this._material = new MeshStandardMaterial();
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
    var _a, _b, _c, _d, _e;
    const worldPos = this.getWorldPosition(this._positionWorldBuffer);
    const oldWorldPos = worldPos.clone();
    (_b = (_a = this._mesh) == null ? void 0 : _a.geometry) == null ? void 0 : _b.computeBoundingBox();
    const meshBB = (_d = (_c = this._mesh) == null ? void 0 : _c.geometry) == null ? void 0 : _d.boundingBox;
    if (!meshBB || !this._mesh) return;
    worldPos.y = worldPos.y - this._mesh.localToWorld(meshBB.min.clone()).y;
    if (worldPos.y === oldWorldPos.y) return;
    (_e = DIVECommunication.get(this.userData.id)) == null ? void 0 : _e.PerformAction(
      "UPDATE_OBJECT",
      {
        id: this.userData.id,
        position: worldPos,
        rotation: this.rotation,
        scale: this.scale
      }
    );
  }
  DropIt() {
    if (!this.parent) {
      console.warn(
        "DIVEModel: DropIt() called on a model that is not in the scene.",
        this
      );
      return;
    }
    const bottomY = this._boundingBox.min.y * this.scale.y;
    const bbBottomCenter = this.localToWorld(
      this._boundingBox.getCenter(new Vector36()).multiply(this.scale)
    );
    bbBottomCenter.y = bottomY + this.position.y;
    const raycaster = new Raycaster3(bbBottomCenter, new Vector36(0, -1, 0));
    raycaster.layers.mask = PRODUCT_LAYER_MASK;
    const intersections = raycaster.intersectObjects(
      findSceneRecursive(this).Root.children,
      true
    );
    if (intersections.length > 0) {
      const mesh = intersections[0].object;
      mesh.geometry.computeBoundingBox();
      const meshBB = mesh.geometry.boundingBox;
      const worldPos = mesh.localToWorld(meshBB.max.clone());
      const oldPos = this.position.clone();
      const newPos = this.position.clone().setY(worldPos.y).sub(new Vector36(0, bottomY, 0));
      this.position.copy(newPos);
      if (this.position.y === oldPos.y) return;
      this.onMove();
    }
  }
};

// src/loadingmanager/LoadingManager.ts
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader";
import { GLTFLoader as GLTFLoader2 } from "three/examples/jsm/loaders/GLTFLoader";
var DIVELoadingManager = class {
  // ... maybe extend with other loaders later
  constructor() {
    this.progress = /* @__PURE__ */ new Map();
    this.gltfloader = new GLTFLoader2();
    this.dracoloader = new DRACOLoader();
    this.dracoloader.setDecoderPath(
      "https://www.gstatic.com/draco/v1/decoders/"
    );
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
init_VisibilityLayerMask();
import {
  BoxGeometry,
  BufferAttribute,
  BufferGeometry,
  Color as Color4,
  ConeGeometry,
  CylinderGeometry,
  Mesh as Mesh5,
  MeshStandardMaterial as MeshStandardMaterial2,
  Raycaster as Raycaster4,
  SphereGeometry as SphereGeometry2,
  Vector3 as Vector37
} from "three";
var DIVEPrimitive = class extends DIVENode {
  constructor() {
    super();
    this.isDIVEPrimitive = true;
    this._mesh = new Mesh5();
    this._mesh.layers.mask = PRODUCT_LAYER_MASK;
    this._mesh.castShadow = true;
    this._mesh.receiveShadow = true;
    this._mesh.material = new MeshStandardMaterial2();
    this.add(this._mesh);
  }
  SetGeometry(geometry) {
    const geo = this.assembleGeometry(geometry);
    if (!geo) return;
    this._mesh.geometry = geo;
    this._boundingBox.setFromObject(this._mesh);
  }
  SetMaterial(material) {
    const primitiveMaterial = this._mesh.material;
    if (material.vertexColors !== void 0) {
      primitiveMaterial.vertexColors = material.vertexColors;
    }
    if (material.color !== void 0) {
      primitiveMaterial.color = new Color4(material.color);
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
    var _a, _b, _c, _d, _e;
    const worldPos = this.getWorldPosition(this._positionWorldBuffer);
    const oldWorldPos = worldPos.clone();
    (_b = (_a = this._mesh) == null ? void 0 : _a.geometry) == null ? void 0 : _b.computeBoundingBox();
    const meshBB = (_d = (_c = this._mesh) == null ? void 0 : _c.geometry) == null ? void 0 : _d.boundingBox;
    if (!meshBB || !this._mesh) return;
    worldPos.y = worldPos.y - this._mesh.localToWorld(meshBB.min.clone()).y;
    if (worldPos.y === oldWorldPos.y) return;
    (_e = DIVECommunication.get(this.userData.id)) == null ? void 0 : _e.PerformAction(
      "UPDATE_OBJECT",
      {
        id: this.userData.id,
        position: worldPos,
        rotation: this.rotation,
        scale: this.scale
      }
    );
  }
  DropIt() {
    if (!this.parent) {
      console.warn(
        "DIVEPrimitive: DropIt() called on a model that is not in the scene.",
        this
      );
      return;
    }
    const bottomY = this._boundingBox.min.y * this.scale.y;
    const bbBottomCenter = this.localToWorld(
      this._boundingBox.getCenter(new Vector37()).multiply(this.scale)
    );
    bbBottomCenter.y = bottomY + this.position.y;
    const raycaster = new Raycaster4(bbBottomCenter, new Vector37(0, -1, 0));
    raycaster.layers.mask = PRODUCT_LAYER_MASK;
    const intersections = raycaster.intersectObjects(
      findSceneRecursive(this).Root.children,
      true
    );
    if (intersections.length > 0) {
      const mesh = intersections[0].object;
      mesh.geometry.computeBoundingBox();
      const meshBB = mesh.geometry.boundingBox;
      const worldPos = mesh.localToWorld(meshBB.max.clone());
      const oldPos = this.position.clone();
      const newPos = this.position.clone().setY(worldPos.y).sub(new Vector37(0, bottomY, 0));
      this.position.copy(newPos);
      if (this.position.y === oldPos.y) return;
      this.onMove();
    }
  }
  assembleGeometry(geometry) {
    this._mesh.material.flatShading = false;
    switch (geometry.name.toLowerCase()) {
      case "cylinder":
        return this.createCylinderGeometry(geometry);
      case "sphere":
        return this.createSphereGeometry(geometry);
      case "pyramid":
        this._mesh.material.flatShading = true;
        return this.createPyramidGeometry(geometry);
      case "cube":
      case "box":
        return this.createBoxGeometry(geometry);
      case "cone":
        return this.createConeGeometry(geometry);
      case "wall":
        return this.createWallGeometry(geometry);
      case "plane":
        return this.createPlaneGeometry(geometry);
      default: {
        console.warn(
          "DIVEPrimitive.assembleGeometry: Invalid geometry type:",
          geometry.name.toLowerCase()
        );
        return null;
      }
    }
  }
  createCylinderGeometry(geometry) {
    const geo = new CylinderGeometry(
      geometry.width / 2,
      geometry.width / 2,
      geometry.height,
      64
    );
    geo.translate(0, geometry.height / 2, 0);
    return geo;
  }
  createSphereGeometry(geometry) {
    const geo = new SphereGeometry2(geometry.width / 2, 256, 256);
    return geo;
  }
  createPyramidGeometry(geometry) {
    const vertices = new Float32Array([
      -geometry.width / 2,
      0,
      -geometry.depth / 2,
      // 0
      geometry.width / 2,
      0,
      -geometry.depth / 2,
      // 1
      geometry.width / 2,
      0,
      geometry.depth / 2,
      // 2
      -geometry.width / 2,
      0,
      geometry.depth / 2,
      // 3
      0,
      geometry.height,
      0
    ]);
    const indices = new Uint16Array([
      0,
      1,
      2,
      0,
      2,
      3,
      0,
      4,
      1,
      1,
      4,
      2,
      2,
      4,
      3,
      3,
      4,
      0
    ]);
    const geometryBuffer = new BufferGeometry();
    geometryBuffer.setAttribute(
      "position",
      new BufferAttribute(vertices, 3)
    );
    geometryBuffer.setIndex(new BufferAttribute(indices, 1));
    geometryBuffer.computeVertexNormals();
    geometryBuffer.computeBoundingBox();
    geometryBuffer.computeBoundingSphere();
    return geometryBuffer;
  }
  createBoxGeometry(geometry) {
    const geo = new BoxGeometry(
      geometry.width,
      geometry.height,
      geometry.depth
    );
    geo.translate(0, geometry.height / 2, 0);
    return geo;
  }
  createConeGeometry(geometry) {
    const geo = new ConeGeometry(geometry.width / 2, geometry.height, 256);
    geo.translate(0, geometry.height / 2, 0);
    return geo;
  }
  createWallGeometry(geometry) {
    const geo = new BoxGeometry(
      geometry.width,
      geometry.height,
      geometry.depth || 0.05,
      16
    );
    geo.translate(0, geometry.height / 2, 0);
    return geo;
  }
  createPlaneGeometry(geometry) {
    const geo = new BoxGeometry(
      geometry.width,
      geometry.height,
      geometry.depth
    );
    geo.translate(0, geometry.height / 2, 0);
    return geo;
  }
};

// src/group/Group.ts
import {
  BufferGeometry as BufferGeometry2,
  Line,
  LineDashedMaterial,
  Vector3 as Vector38
} from "three";
var DIVEGroup = class extends DIVENode {
  // lines to children
  constructor() {
    super();
    this.isDIVEGroup = true;
    this.name = "DIVEGroup";
    this._members = [];
    this._lines = [];
  }
  // children objects
  get members() {
    return this._members;
  }
  SetPosition(position) {
    super.SetPosition(position);
    this._members.forEach((member) => {
      if ("isDIVENode" in member) {
        member.onMove();
      }
    });
  }
  SetLinesVisibility(visible, object) {
    if (!object) {
      this._lines.forEach((line) => {
        line.visible = visible;
      });
      return;
    }
    const index = this._members.indexOf(object);
    if (index === -1) return;
    this._lines[index].visible = visible;
  }
  attach(object) {
    if (this._members.includes(object)) {
      return this;
    }
    const line = this.createLine();
    this.add(line);
    this._lines.push(line);
    super.attach(object);
    this._members.push(object);
    this.updateLineTo(line, object);
    this.SetLinesVisibility(true, object);
    return this;
  }
  remove(object) {
    const index = this._members.indexOf(object);
    if (index === -1) return this;
    const line = this._lines[index];
    super.remove(line);
    this._lines.splice(index, 1);
    super.remove(object);
    this._members.splice(index, 1);
    return this;
  }
  UpdateLineTo(object) {
    const index = this._members.indexOf(object);
    if (index === -1) return;
    this.updateLineTo(this._lines[index], object);
  }
  /**
   * Adds a line to this grouo as last child.
   */
  createLine() {
    const geo = new BufferGeometry2();
    const mat = new LineDashedMaterial({
      color: 6710886,
      dashSize: 0.05,
      gapSize: 0.025
    });
    const line = new Line(geo, mat);
    line.visible = false;
    return line;
  }
  /**
   * Updates a line to the object.
   */
  updateLineTo(line, object) {
    line.geometry.setFromPoints([
      new Vector38(0, 0, 0),
      object.position.clone()
    ]);
    line.computeLineDistances();
  }
  // public SetBoundingBoxVisibility(visible: boolean): void {
  //     this._boxMesh.visible = visible;
  // }
  // /**
  //  * Recalculates the position of the group based on it's bounding box.
  //  * Children's world positions are kept.
  //  */
  // private recalculatePosition(): void {
  //     // store all children's world positions
  //     const childrensWorldPositions: Vector3[] = this.children.map((child) => child.getWorldPosition(new Vector3()));
  //     // calculate new center and set it as the group's position
  //     const bbcenter = this.updateBB();
  //     this.position.copy(bbcenter);
  //     // set childrens's positions so their world positions are kept
  //     this.children.forEach((child, i) => {
  //         if (child.uuid === this._boxMesh.uuid) return;
  //         child.position.copy(this.worldToLocal(childrensWorldPositions[i]));
  //     });
  //     DIVECommunication.get(this.userData.id)?.PerformAction('UPDATE_OBJECT', { id: this.userData.id, position: this.position });
  // }
  // /**
  //  * Updates the bounding box of the group.
  //  * @returns {Vector3} The new center of the bounding box.
  //  */
  // private updateBB(): Vector3 {
  //     this._boundingBox.makeEmpty();
  //     if (this.children.length === 1) {
  //         // because we always have the box mesh as 1 child
  //         return this.position.clone();
  //     }
  //     this.children.forEach((child) => {
  //         if (child.uuid === this._boxMesh.uuid) return;
  //         this._boundingBox.expandByObject(child);
  //     });
  //     return this._boundingBox.getCenter(new Vector3());
  // }
  // private updateBoxMesh(): void {
  //     if (this.children.length === 1) {
  //         // because we always have the box mesh as 1 child
  //         this._boxMesh.visible = false;
  //         return;
  //     }
  //     this._boxMesh.quaternion.copy(this.quaternion.clone().invert());
  //     this._boxMesh.scale.set(1 / this.scale.x, 1 / this.scale.y, 1 / this.scale.z);
  //     this._boxMesh.geometry = new BoxGeometry(this._boundingBox.max.x - this._boundingBox.min.x, this._boundingBox.max.y - this._boundingBox.min.y, this._boundingBox.max.z - this._boundingBox.min.z);
  //     this._boxMesh.visible = true;
  // }
};

// src/scene/root/Root.ts
var DIVERoot = class extends Object3D8 {
  constructor() {
    super();
    this.isDIVERoot = true;
    this.name = "Root";
    this.loadingManager = new DIVELoadingManager();
  }
  ComputeSceneBB() {
    const bb = new Box32();
    this.traverse((object) => {
      if ("isObject3D" in object) {
        bb.expandByObject(object);
      }
    });
    return bb;
  }
  GetSceneObject(object) {
    let foundObject;
    this.traverse((object3D) => {
      if (foundObject) return;
      if (object3D.userData.id === object.id) {
        foundObject = object3D;
      }
    });
    return foundObject;
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
      default: {
        console.warn(
          `DIVERoot.AddSceneObject: Unknown entity type: ${object.entityType}`
        );
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
      default: {
        console.warn(
          `DIVERoot.UpdateSceneObject: Unknown entity type: ${object.entityType}`
        );
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
      default: {
        console.warn(
          `DIVERoot.DeleteSceneObject: Unknown entity type: ${object.entityType}`
        );
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
      default: {
        console.warn(
          `DIVERoot.PlaceOnFloor: Unknown entity type: ${object.entityType}`
        );
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
          console.warn(
            `DIVERoot.updateLight: Unknown light type: ${light.type}`
          );
          return;
        }
      }
      sceneObject.userData.id = light.id;
      this.add(sceneObject);
    }
    if (light.name !== void 0 && light.name !== null)
      sceneObject.name = light.name;
    if (light.position !== void 0 && light.position !== null)
      sceneObject.position.set(
        light.position.x,
        light.position.y,
        light.position.z
      );
    if (light.intensity !== void 0 && light.intensity !== null)
      sceneObject.SetIntensity(
        light.intensity
      );
    if (light.enabled !== void 0 && light.enabled !== null)
      sceneObject.SetEnabled(
        light.enabled
      );
    if (light.color !== void 0 && light.color !== null)
      sceneObject.SetColor(
        new Color5(light.color)
      );
    if (light.visible !== void 0 && light.visible !== null)
      sceneObject.visible = light.visible;
    if (light.parentId !== void 0)
      this.setParent(__spreadProps(__spreadValues({}, light), { parentId: light.parentId }));
  }
  updateModel(model) {
    let sceneObject = this.GetSceneObject(model);
    if (!sceneObject) {
      const created = new DIVEModel();
      sceneObject = created;
      sceneObject.userData.id = model.id;
      sceneObject.userData.uri = model.uri;
      this.add(sceneObject);
    }
    if (model.uri !== void 0) {
      this.loadingManager.LoadGLTF(model.uri).then((gltf) => {
        var _a;
        sceneObject.SetModel(gltf);
        (_a = DIVECommunication.get(model.id)) == null ? void 0 : _a.PerformAction(
          "MODEL_LOADED",
          { id: model.id }
        );
      });
    }
    if (model.name !== void 0) sceneObject.name = model.name;
    if (model.position !== void 0)
      sceneObject.SetPosition(model.position);
    if (model.rotation !== void 0)
      sceneObject.SetRotation(model.rotation);
    if (model.scale !== void 0)
      sceneObject.SetScale(model.scale);
    if (model.visible !== void 0)
      sceneObject.SetVisibility(model.visible);
    if (model.material !== void 0)
      sceneObject.SetMaterial(model.material);
    if (model.parentId !== void 0)
      this.setParent(__spreadProps(__spreadValues({}, model), { parentId: model.parentId }));
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
    if (primitive.geometry !== void 0)
      sceneObject.SetGeometry(primitive.geometry);
    if (primitive.position !== void 0)
      sceneObject.SetPosition(primitive.position);
    if (primitive.rotation !== void 0)
      sceneObject.SetRotation(primitive.rotation);
    if (primitive.scale !== void 0)
      sceneObject.SetScale(primitive.scale);
    if (primitive.visible !== void 0)
      sceneObject.SetVisibility(primitive.visible);
    if (primitive.material !== void 0)
      sceneObject.SetMaterial(primitive.material);
    if (primitive.parentId !== void 0)
      this.setParent(__spreadProps(__spreadValues({}, primitive), { parentId: primitive.parentId }));
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
    if (group.position !== void 0)
      sceneObject.SetPosition(group.position);
    if (group.rotation !== void 0)
      sceneObject.SetRotation(group.rotation);
    if (group.scale !== void 0)
      sceneObject.SetScale(group.scale);
    if (group.visible !== void 0)
      sceneObject.SetVisibility(group.visible);
    if (group.bbVisible !== void 0)
      sceneObject.SetLinesVisibility(group.bbVisible);
    if (group.parentId !== void 0)
      this.setParent(__spreadProps(__spreadValues({}, group), { parentId: group.parentId }));
  }
  deleteLight(light) {
    const sceneObject = this.GetSceneObject(light);
    if (!sceneObject) {
      console.warn(
        `DIVERoot.deleteLight: Light with id ${light.id} not found`
      );
      return;
    }
    this.detachTransformControls(sceneObject);
    sceneObject.parent.remove(sceneObject);
  }
  deleteModel(model) {
    const sceneObject = this.GetSceneObject(model);
    if (!sceneObject) {
      console.warn(
        `DIVERoot.deleteModel: Model with id ${model.id} not found`
      );
      return;
    }
    this.detachTransformControls(sceneObject);
    sceneObject.parent.remove(sceneObject);
  }
  deletePrimitive(primitive) {
    const sceneObject = this.GetSceneObject(primitive);
    if (!sceneObject) {
      console.warn(
        `DIVERoot.deletePrimitive: Primitive with id ${primitive.id} not found`
      );
      return;
    }
    this.detachTransformControls(sceneObject);
    sceneObject.parent.remove(sceneObject);
  }
  deleteGroup(group) {
    const sceneObject = this.GetSceneObject(group);
    if (!sceneObject) {
      console.warn(
        `DIVERoot.deleteGroup: Group with id ${group.id} not found`
      );
      return;
    }
    this.detachTransformControls(sceneObject);
    for (let i = sceneObject.members.length - 1; i >= 0; i--) {
      this.attach(sceneObject.members[i]);
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
    if (object.parentId !== null) {
      const parent = this.GetSceneObject({
        id: object.parentId
      });
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
    return object;
  }
};

// src/constant/GridColors.ts
var GRID_CENTER_LINE_COLOR = "#888888";
var GRID_SIDE_LINE_COLOR = "#dddddd";

// src/grid/Grid.ts
init_VisibilityLayerMask();
import { GridHelper, Object3D as Object3D9 } from "three";
var DIVEGrid = class extends Object3D9 {
  constructor() {
    super();
    this.name = "Grid";
    const grid = new GridHelper(
      100,
      100,
      GRID_CENTER_LINE_COLOR,
      GRID_SIDE_LINE_COLOR
    );
    grid.material.depthTest = false;
    grid.layers.mask = HELPER_LAYER_MASK;
    this.add(grid);
  }
  SetVisibility(visible) {
    this.visible = visible;
  }
};

// src/primitive/floor/Floor.ts
init_VisibilityLayerMask();
import {
  Color as Color6,
  Mesh as Mesh6,
  MeshStandardMaterial as MeshStandardMaterial3,
  PlaneGeometry
} from "three";
var DIVEFloor = class extends Mesh6 {
  constructor() {
    super(
      new PlaneGeometry(1e4, 1e4),
      new MeshStandardMaterial3({
        color: new Color6(150 / 255, 150 / 255, 150 / 255)
      })
    );
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
    this.material.color = new Color6(color);
  }
};

// src/scene/xrroot/XRRoot.ts
import { Mesh as Mesh7, Object3D as Object3D11, PlaneGeometry as PlaneGeometry2, ShadowMaterial } from "three";

// src/scene/xrroot/xrlightroot/XRLightRoot.ts
init_VisibilityLayerMask();
import { XREstimatedLight } from "three/examples/jsm/webxr/XREstimatedLight";
import { Object3D as Object3D10 } from "three";
var DIVEXRLightRoot = class extends Object3D10 {
  constructor(scene) {
    super();
    this.name = "XRLightRoot";
    this._scene = scene;
    this._xrLight = null;
    this._lightRoot = new DIVERoot();
    this._lightRoot.UpdateSceneObject({
      id: "XRSceneLight",
      entityType: "light",
      name: "XRSceneLight",
      type: "scene",
      color: 16777215,
      intensity: 1,
      enabled: true,
      visible: true
    });
    this.add(this._lightRoot);
  }
  InitLightEstimation(renderer) {
    if (!this._xrLight) {
      this._xrLight = new XREstimatedLight(renderer, true);
      this._xrLight.layers.mask = PRODUCT_LAYER_MASK;
      this.add(this._xrLight);
    }
    this._xrLight.addEventListener("estimationstart", () => {
      this.onEstimationStart();
    });
    this._xrLight.addEventListener("estimationend", () => {
      this.onEstimationEnd();
    });
  }
  DisposeLightEstimation() {
    if (!this._xrLight) return;
    this._xrLight.removeEventListener("estimationstart", () => {
      this.onEstimationStart();
    });
    this._xrLight.removeEventListener("estimationend", () => {
      this.onEstimationEnd();
    });
  }
  onEstimationStart() {
    this._lightRoot.visible = false;
    if (!this._xrLight) return;
    if (this._xrLight.environment) {
      this._scene.environment = this._xrLight.environment;
    }
  }
  onEstimationEnd() {
    this._lightRoot.visible = true;
    this._scene.environment = null;
    if (!this._xrLight) return;
  }
};

// src/scene/xrroot/XRRoot.ts
var DIVEXRRoot = class extends Object3D11 {
  get XRModelRoot() {
    return this._xrModelRoot;
  }
  get XRLightRoot() {
    return this._xrLightRoot;
  }
  get XRHandNode() {
    return this._xrHandNode;
  }
  constructor(scene) {
    super();
    this.name = "XRRoot";
    this._xrModelRoot = new DIVERoot();
    this._xrModelRoot.name = "XRModelRoot";
    this.add(this._xrModelRoot);
    this._xrShadowPlane = new Mesh7(
      new PlaneGeometry2(100, 100),
      new ShadowMaterial({ opacity: 1, transparent: true })
    );
    this._xrModelRoot.add(this._xrShadowPlane);
    this._xrLightRoot = new DIVEXRLightRoot(scene);
    this._xrLightRoot.name = "XRLightRoot";
    this.add(this._xrLightRoot);
    this._xrHandNode = new Object3D11();
    this._xrHandNode.name = "XRHandNode";
    this.add(this._xrHandNode);
  }
  InitLightEstimation(renderer) {
    this._xrLightRoot.InitLightEstimation(renderer);
  }
  DisposeLightEstimation() {
    this._xrLightRoot.DisposeLightEstimation();
  }
};

// src/scene/Scene.ts
var DIVEScene = class extends Scene2 {
  get Root() {
    return this._root;
  }
  get XRRoot() {
    return this._xrRoot;
  }
  get Floor() {
    return this._floor;
  }
  get Grid() {
    return this._grid;
  }
  constructor() {
    super();
    this.background = new Color7(16777215);
    this._root = new DIVERoot();
    this.add(this._root);
    this._floor = new DIVEFloor();
    this.add(this._floor);
    this._grid = new DIVEGrid();
    this.add(this._grid);
    this._xrRoot = new DIVEXRRoot(this);
    this._xrRoot.visible = false;
    this.add(this._xrRoot);
  }
  InitXR(renderer) {
    this._root.visible = false;
    this._xrRoot.visible = true;
    this._xrRoot.InitLightEstimation(renderer);
  }
  DisposeXR() {
    this._root.visible = true;
    this._xrRoot.visible = false;
    this._xrRoot.DisposeLightEstimation();
  }
  SetBackground(color) {
    this.background = new Color7(color);
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
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { MathUtils as MathUtils2, Vector3 as Vector39 } from "three";
import { Easing } from "@tweenjs/tween.js";
var DIVEOrbitControlsDefaultSettings = {
  enableDamping: true,
  dampingFactor: 0.04
};
var _DIVEOrbitControls = class _DIVEOrbitControls extends OrbitControls {
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
    const center = bb.getCenter(new Vector39());
    const size = bb.getSize(new Vector39());
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
    this.minDistance = this.maxDistance = MathUtils2.clamp(
      this.getDistance() - zoomBy,
      minDistance + zoomBy,
      maxDistance - zoomBy
    );
    this.update();
    this.minDistance = minDistance;
    this.maxDistance = maxDistance;
  }
  ZoomOut(by) {
    const zoomBy = by || _DIVEOrbitControls.DEFAULT_ZOOM_FACTOR;
    const { minDistance, maxDistance } = this;
    this.minDistance = this.maxDistance = MathUtils2.clamp(
      this.getDistance() + zoomBy,
      minDistance + zoomBy,
      maxDistance - zoomBy
    );
    this.update();
    this.minDistance = minDistance;
    this.maxDistance = maxDistance;
  }
  MoveTo(pos, target, duration, lock) {
    if (this.animating) return;
    const toPosition = pos || this.object.position.clone();
    const toTarget = target || this.target.clone();
    this.stopRevertLast();
    if (!this.locked)
      this.last = {
        pos: this.object.position.clone(),
        target: this.target.clone()
      };
    this.animating = duration > 0;
    this.locked = lock;
    this.enabled = false;
    const tweenPos = this._animationSystem.Animate(this.object.position).to(toPosition, duration).easing(Easing.Quadratic.Out).start();
    const tweenQuat = this._animationSystem.Animate(this.target).to(toTarget, duration).easing(Easing.Quadratic.Out).onUpdate(() => {
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
    const tweenPos = this._animationSystem.Animate(this.object.position).to(pos, duration).easing(Easing.Quadratic.Out).start();
    const tweenQuat = this._animationSystem.Animate(this.target).to(target, duration).easing(Easing.Quadratic.Out).onUpdate(() => {
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
      this._selectTool = new DIVESelectTool2(
        this._scene,
        this._controller
      );
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
        console.warn(`DIVEToolBox.UseTool: Unknown tool: ${tool}`);
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
    this._controller.domElement.addEventListener(
      "pointermove",
      (e) => this.onPointerMove(e)
    );
    this._controller.domElement.addEventListener(
      "pointerdown",
      (e) => this.onPointerDown(e)
    );
    this._controller.domElement.addEventListener(
      "pointerup",
      (e) => this.onPointerUp(e)
    );
    this._controller.domElement.addEventListener(
      "wheel",
      (e) => this.onWheel(e)
    );
  }
  removeEventListeners() {
    this._controller.domElement.removeEventListener(
      "pointermove",
      (e) => this.onPointerMove(e)
    );
    this._controller.domElement.removeEventListener(
      "pointerdown",
      (e) => this.onPointerDown(e)
    );
    this._controller.domElement.removeEventListener(
      "pointerup",
      (e) => this.onPointerUp(e)
    );
    this._controller.domElement.removeEventListener(
      "wheel",
      (e) => this.onWheel(e)
    );
  }
};
DIVEToolbox.DefaultTool = "select";

// src/animation/AnimationSystem.ts
import { Tween, update as updateTween } from "@tweenjs/tween.js";
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
    updateTween();
  }
  Animate(object) {
    return new Tween(object);
  }
};

// src/axiscamera/AxisCamera.ts
init_VisibilityLayerMask();
import {
  AxesHelper,
  Color as Color8,
  Matrix4 as Matrix44,
  OrthographicCamera,
  Vector4
} from "three";
import SpriteText from "three-spritetext";

// src/constant/AxisHelperColors.ts
var AxesColorRedLetter = "#c20017";
var AxesColorGreenLetter = "#00ab26";
var AxesColorBlueLetter = "#0081d4";
var AxesColorRed = AxesColorRedLetter;
var AxesColorGreen = AxesColorGreenLetter;
var AxesColorBlue = AxesColorBlueLetter;

// src/axiscamera/AxisCamera.ts
var DIVEAxisCamera = class extends OrthographicCamera {
  constructor(renderer, scene, controls) {
    super(-1, 1, 1, -1, 0.1, 100);
    this.layers.mask = COORDINATE_LAYER_MASK;
    this.axesHelper = new AxesHelper(0.5);
    this.axesHelper.layers.mask = COORDINATE_LAYER_MASK;
    this.axesHelper.material.depthTest = false;
    this.axesHelper.position.set(0, 0, -1);
    this.axesHelper.setColors(
      new Color8(AxesColorRed),
      new Color8(AxesColorGreen),
      new Color8(AxesColorBlue)
    );
    const x = new SpriteText("X", 0.2, AxesColorRedLetter);
    const y = new SpriteText("Y", 0.2, AxesColorGreenLetter);
    const z = new SpriteText("Z", 0.2, AxesColorBlueLetter);
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
    const restoreViewport = new Vector4();
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
    this.axesHelper.rotation.setFromRotationMatrix(
      new Matrix44().extractRotation(matrix).invert()
    );
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
        const inArrayDelta = getObjectDelta(
          aArray[index],
          bArray[index]
        );
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
      const objectDelta = getObjectDelta(
        a[key],
        b[key]
      );
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
init_Info();
import { MathUtils as MathUtils5 } from "three";

// package.json
var package_default = {
  name: "@shopware-ag/dive",
  version: "1.18.0",
  description: "Shopware Spatial Framework",
  type: "module",
  main: "./build/dive.cjs",
  module: "./build/dive.js",
  types: "./build/dive.d.ts",
  files: [
    "build",
    "LICENSE",
    "package.json",
    "README.md",
    "src"
  ],
  keywords: [
    "dive",
    "shopware",
    "sw6",
    "three",
    "three.js",
    "3d",
    "typescript"
  ],
  repository: "git@github.com:shopware/dive.git",
  author: "ffrank <f.frank@shopware.com>",
  license: "MIT",
  browserslist: [
    "> 1%, not dead, not ie 11, not op_mini all"
  ],
  dependencies: {
    "@tweenjs/tween.js": "^23.1.1",
    lodash: "^4.17.21",
    three: "^0.163.0",
    "three-spritetext": "^1.8.2"
  },
  devDependencies: {
    "@eslint/js": "^9.1.1",
    "@types/jest": "^29.5.12",
    "@types/lodash": "^4.17.12",
    "@types/node": "^20.12.7",
    "@types/three": "^0.163.0",
    eslint: "^9.1.1",
    globals: "^15.0.0",
    jest: "^29.7.0",
    "jest-environment-jsdom": "^29.7.0",
    "jest-junit": "^16.0.0",
    jsdom: "^24.0.0",
    prettier: "^3.3.3",
    "prettier-plugin-multiline-arrays": "^3.0.6",
    "ts-jest": "^29.1.2",
    "ts-node": "^10.9.2",
    tsc: "^2.0.4",
    tsup: "^8.0.2",
    typescript: "^5.4.5",
    "typescript-eslint": "^7.7.1"
  },
  scripts: {
    build: "tsup --env.DIVE_NODE_ENV production",
    dev: "tsup --watch --env.DIVE_NODE_ENV development",
    lint: "eslint",
    "lint:actions": "yarn lint:actions:transpile && yarn lint:actions:check && yarn lint:actions:cleanup",
    "lint:actions:transpile": "yarn tsc --resolveJsonModule --esModuleInterop ci/lint/lint-actions.ts && mv ci/lint/lint-actions.js ci/lint/lint-actions.cjs",
    "lint:actions:check": "yarn node ci/lint/lint-actions.cjs",
    "lint:actions:cleanup": `node -e "require('fs').unlinkSync('ci/lint/lint-actions.cjs')"`,
    "prettier:check": "prettier --check .",
    "prettier:fix": "prettier --write .",
    unit: "jest",
    coverage: "jest --coverage",
    "generate-readme": "yarn generate-readme:transpile && yarn generate-readme:write && yarn generate-readme:cleanup",
    "generate-readme:transpile": "yarn tsc --resolveJsonModule --esModuleInterop ci/readme/generate-readme.ts && mv ci/readme/generate-readme.js ci/readme/generate-readme.cjs",
    "generate-readme:write": "node ci/readme/generate-readme.cjs",
    "generate-readme:cleanup": `node -e "require('fs').unlinkSync('ci/readme/generate-readme.cjs')"`,
    ci: "yarn lint && yarn coverage && yarn prettier:check && yarn build && bash ci/lint/lint-actions.sh"
  }
};

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
  return Math.atan2(
    vecA.clone().cross(vecB).dot(planeNormal),
    vecB.clone().dot(vecA)
  );
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

// src/math/radToDeg/radToDeg.ts
import { MathUtils as MathUtils3 } from "three";
function radToDeg(radians) {
  return (MathUtils3.radToDeg(radians) + 360) % 360;
}

// src/math/degToRad/degToRad.ts
import { MathUtils as MathUtils4 } from "three";
function degToRad(degrees) {
  return MathUtils4.degToRad(degrees);
}

// src/math/index.ts
var DIVEMath = {
  ceilExp,
  floorExp,
  roundExp: roundExponential,
  toFixedExp,
  truncateExp,
  signedAngleTo,
  radToDeg,
  degToRad
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
  static QuickView(uri, settings) {
    const dive = new _DIVE(settings);
    dive.Communication.PerformAction("SET_CAMERA_TRANSFORM", {
      position: { x: 0, y: 2, z: 2 },
      target: { x: 0, y: 0.5, z: 0 }
    });
    const lightid = MathUtils5.generateUUID();
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
    const modelid = MathUtils5.generateUUID();
    dive.Communication.Subscribe("MODEL_LOADED", (data) => {
      if (data.id !== modelid) return;
      const transform = dive.Communication.PerformAction(
        "COMPUTE_ENCOMPASSING_VIEW",
        {}
      );
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
    if (settingsDelta.renderer)
      this.renderer = new DIVERenderer(this._settings.renderer);
    if (settingsDelta.perspectiveCamera) {
      if (settingsDelta.perspectiveCamera.fov !== void 0)
        this.perspectiveCamera.fov = settingsDelta.perspectiveCamera.fov;
      if (settingsDelta.perspectiveCamera.near !== void 0)
        this.perspectiveCamera.near = settingsDelta.perspectiveCamera.near;
      if (settingsDelta.perspectiveCamera.far !== void 0)
        this.perspectiveCamera.far = settingsDelta.perspectiveCamera.far;
      this.perspectiveCamera.OnResize(
        this.renderer.domElement.width,
        this.renderer.domElement.height
      );
    }
    if (settingsDelta.orbitControls) {
      if (settingsDelta.orbitControls.enableDamping !== void 0)
        this.orbitControls.enableDamping = settingsDelta.orbitControls.enableDamping;
      if (settingsDelta.orbitControls.dampingFactor !== void 0)
        this.orbitControls.dampingFactor = settingsDelta.orbitControls.dampingFactor;
    }
    if (settingsDelta.autoResize !== this._settings.autoResize) {
      if (settingsDelta.autoResize) {
        this.addResizeObserver();
      } else {
        this.removeResizeObserver();
      }
    }
    if (settingsDelta.displayAxes) {
      this.axisCamera = new DIVEAxisCamera(
        this.renderer,
        this.scene,
        this.orbitControls
      );
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
    this.perspectiveCamera = new DIVEPerspectiveCamera(
      this._settings.perspectiveCamera
    );
    this.animationSystem = new DIVEAnimationSystem(this.renderer);
    this.orbitControls = new DIVEOrbitControls(
      this.perspectiveCamera,
      this.renderer,
      this.animationSystem,
      this._settings.orbitControls
    );
    this.toolbox = new DIVEToolbox(this.scene, this.orbitControls);
    this.communication = new DIVECommunication(
      this.renderer,
      this.scene,
      this.orbitControls,
      this.toolbox
    );
    if (this._settings.displayAxes) {
      this.axisCamera = new DIVEAxisCamera(
        this.renderer,
        this.scene,
        this.orbitControls
      );
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
    console.log(`DIVE ${package_default.version} initialized successfully!`);
    if (false) {
      console.log("DIVE is running in development mode.");
    }
    console.log(`
                    @@@@@@@@@@@@@@@@@@@@@@@              @@@@@@@@@@@@@@@@@@@@@@@
               @@@@+-:::::::---------------------==------------------------------=#@@@@
            @@%=::::.......::---------------------------------------------------------+@@
          @@+:::...........::-----------------------------------------------------------#@@
        @@=:::.........::::::-------------------------------------------------------------%@
       @%:::.......:::::::-----------------------------------------------------------------#@
      @*:::.....:::::-----------------------------------------------------------------------*@
     @%::::::.::::---------------------------------------------------------------------------@@
    @@-:::::::::-----------------------------------------------------------------------------=@
    @%::::::::--------------------------------------------------------------------------------%@
    @+::::::::--------------------------------=@@@@@%-----------------------------------------%@
    @=:::::::--------------------------------*@@    @@+---------------------------------------#@
    @+:::::::-------------------------------*@        @*--------------------------------------%@
    @#::::::::-----------------------------=@@        @@=-------------------------------------%@
    @@-::::::::----------------------------@@          @@------------------------------------=@
     @%:::::::::--------------------------*@            @*-----------------------------------@@
      @*:::::::::-------------------------@@            @@----------------------------------%@
       @#::::::::::----------------------%@              @%--------------------------------%@
        @#:::::::::::-------------------=@@              @@=------------------------------%@
         @@-::::::::::::----------------%@                @%----------------------------=@@
          @@#::::::::::::::------------*@                  @*--------------------------#@@
            @@+::::::::::::::::--------@@                  @@------------------------+@@
              @@*:::::::::::::::::----@@                    @@---------------------+@@
                @@@-:::::::::::::::--#@                      @#-----------------=%@@
                   @@%-::::::::::::-%@                        @%-------------=%@@
                      @@@@+:::::::#@@                          @@*-------*@@@@
                           @@@@@@@                                @@@@@@

        `);
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
      if (clientWidth === this._width && clientHeight === this._height)
        return;
      this.OnResize(clientWidth, clientHeight);
      this._width = clientWidth;
      this._height = clientHeight;
    });
  }
  removeResizeObserver() {
    this.renderer.RemovePreRenderCallback(this._resizeObserverId);
  }
};
export {
  DIVE,
  DIVECommunication,
  DIVEDefaultSettings,
  DIVEMath,
  DIVE as default
};
//# sourceMappingURL=dive.js.map