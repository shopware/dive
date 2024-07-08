var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
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

// src/dive.ts
import { Vector4 } from "three";

// src/renderer/Renderer.ts
import { MathUtils, NoToneMapping, PCFSoftShadowMap, WebGLRenderer } from "three";
var DIVERendererDefaultSettings = {
  antialias: true,
  alpha: true,
  stencil: false,
  shadowMapEnabled: true,
  shadowMapType: PCFSoftShadowMap,
  toneMapping: NoToneMapping
};
var DIVERenderer = class extends WebGLRenderer {
  constructor(rendererSettings = DIVERendererDefaultSettings) {
    super({
      antialias: rendererSettings.antialias,
      alpha: rendererSettings.alpha,
      preserveDrawingBuffer: true
    });
    // basic functionality members
    this.paused = false;
    this.running = false;
    this.force = false;
    // pre- and post-render callbacks
    this.preRenderCallbacks = /* @__PURE__ */ new Map();
    this.postRenderCallbacks = /* @__PURE__ */ new Map();
    this.setPixelRatio(window.devicePixelRatio);
    this.shadowMap.enabled = rendererSettings.shadowMapEnabled;
    this.shadowMap.type = rendererSettings.shadowMapType;
    this.toneMapping = rendererSettings.toneMapping;
    this.debug.checkShaderErrors = false;
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
import { Color as Color7, Scene as Scene2 } from "three";

// src/scene/root/Root.ts
import { Object3D as Object3D8 } from "three";

// src/scene/root/lightroot/LightRoot.ts
import { Color as Color5, Object3D as Object3D4 } from "three";

// src/light/AmbientLight.ts
import { AmbientLight, Object3D } from "three";

// src/constant/VisibilityLayerMask.ts
var DEFAULT_LAYER_MASK = 1;
var COORDINATE_LAYER_MASK = 2;
var UI_LAYER_MASK = 4;
var HELPER_LAYER_MASK = 8;
var PRODUCT_LAYER_MASK = 16;

// src/light/AmbientLight.ts
var DIVEAmbientLight = class extends Object3D {
  constructor() {
    super();
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
import { PointLight, SphereGeometry, MeshBasicMaterial, Mesh, FrontSide, Object3D as Object3D2 } from "three";

// src/com/Communication.ts
import { MathUtils as MathUtils2 } from "three";

// src/helper/platform/platform.ts
var getPlatform = () => {
  if (navigator.userAgent) {
    if (navigator.userAgent.includes("Macintosh")) return "Mac" /* MAC */;
    if (navigator.userAgent.includes("Windows")) return "Windows" /* WINDOWS */;
    if (navigator.userAgent.includes("Linux")) return "Linux" /* LINUX */;
  }
  if (navigator.platform.includes("Mac")) return "Mac" /* MAC */;
  if (navigator.platform.includes("Win")) return "Windows" /* WINDOWS */;
  if (navigator.platform.includes("Linux")) return "Linux" /* LINUX */;
  return "unknown" /* UNKNOWN */;
};
var isMac = () => getPlatform() === "Mac" /* MAC */;
var isWindows = () => getPlatform() === "Windows" /* WINDOWS */;

// src/com/Communication.ts
var _DIVECommunication = class _DIVECommunication {
  constructor(scene, controls, toolbox, mediaGenerator) {
    // all registered data
    this.registered = /* @__PURE__ */ new Map();
    // subscribe listeners
    this.listeners = /* @__PURE__ */ new Map();
    // undo: stores the actions that are used to undo a certain action
    this.undoStack = [];
    // redo: stores the actions that are used to redo a certain action
    this.redoStack = [];
    this.id = MathUtils2.generateUUID();
    this.scene = scene;
    this.controller = controls;
    this.toolbox = toolbox;
    this.mediaGenerator = mediaGenerator;
    window.addEventListener("keydown", (event) => {
      if (isMac()) {
        if (event.metaKey && event.key === "z") {
          event.shiftKey ? this.Redo() : this.Undo();
        }
      }
      if (isWindows()) {
        if (event.ctrlKey && event.key === "z") {
          event.shiftKey ? this.Redo() : this.Undo();
        }
      }
    });
    _DIVECommunication.__instances.push(this);
  }
  static get(id) {
    return this.__instances.find((instance) => Array.from(instance.registered.values()).find((object) => object.id === id));
  }
  DestroyInstance() {
    const existingIndex = _DIVECommunication.__instances.findIndex((entry) => entry.id === this.id);
    if (existingIndex === -1) return false;
    _DIVECommunication.__instances.splice(existingIndex, 1);
    return true;
  }
  PerformAction(action, payload, options) {
    this.redoStack = [];
    return this.internal_perform(action, payload, options);
  }
  internal_perform(action, payload, options) {
    let returnValue = false;
    switch (action) {
      case "GET_ALL_SCENE_DATA": {
        returnValue = this.getAllSceneData(payload, options);
        break;
      }
      case "GET_ALL_OBJECTS": {
        returnValue = this.getAllObjects(payload, options);
        break;
      }
      case "GET_OBJECTS": {
        returnValue = this.getObjects(payload, options);
        break;
      }
      case "ADD_OBJECT": {
        returnValue = this.addObject(payload, options);
        break;
      }
      case "UPDATE_OBJECT": {
        returnValue = this.updateObject(payload, options);
        break;
      }
      case "DELETE_OBJECT": {
        returnValue = this.deleteObject(payload, options);
        break;
      }
      case "SELECT_OBJECT": {
        returnValue = this.selectObject(payload, options);
        break;
      }
      case "DESELECT_OBJECT": {
        returnValue = this.deselectObject(payload);
        break;
      }
      case "SET_BACKGROUND": {
        returnValue = this.setBackground(payload, options);
        break;
      }
      case "DROP_IT": {
        returnValue = this.dropIt(payload);
        break;
      }
      case "PLACE_ON_FLOOR": {
        returnValue = this.placeOnFloor(payload, options);
        break;
      }
      case "SET_CAMERA_TRANSFORM": {
        returnValue = this.setCameraTransform(payload, options);
        break;
      }
      case "GET_CAMERA_TRANSFORM": {
        returnValue = this.getCameraTransform(payload, options);
        break;
      }
      case "MOVE_CAMERA": {
        returnValue = this.moveCamera(payload, options);
        break;
      }
      case "RESET_CAMERA": {
        returnValue = this.resetCamera(payload, options);
        break;
      }
      case "SET_CAMERA_LAYER": {
        returnValue = this.setCameraLayer(payload, options);
        break;
      }
      case "ZOOM_CAMERA": {
        returnValue = this.zoomCamera(payload, options);
        break;
      }
      case "SET_GIZMO_MODE": {
        returnValue = this.setGizmoMode(payload, options);
        break;
      }
      case "MODEL_LOADED": {
        returnValue = this.modelLoaded(payload, options);
        break;
      }
      case "UPDATE_SCENE": {
        returnValue = this.updateScene(payload, options);
        break;
      }
      case "GENERATE_MEDIA": {
        returnValue = this.generateMedia(payload, options);
        break;
      }
    }
    this.dispatch(action, payload);
    return returnValue;
  }
  Undo() {
    const undoAction = this.undoStack.pop();
    if (!undoAction) return;
    this.internal_perform(undoAction.action, undoAction.payload, { redoable: true });
  }
  Redo() {
    const redoAction = this.redoStack.pop();
    if (!redoAction) return;
    this.internal_perform(redoAction.action, redoAction.payload, { undoable: true });
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
  getAllSceneData(payload, options) {
    const sceneData = {
      name: this.scene.name,
      mediaItem: null,
      backgroundColor: "#" + this.scene.background.getHexString(),
      floorEnabled: this.scene.Root.Floor.visible,
      floorColor: "#" + this.scene.Root.Floor.material.color.getHexString(),
      userCamera: {
        position: this.controller.object.position.clone(),
        target: this.controller.target.clone()
      },
      spotmarks: [],
      lights: Array.from(this.registered.values()).filter((object) => object.entityType === "light"),
      objects: Array.from(this.registered.values()).filter((object) => object.entityType === "model"),
      cameras: Array.from(this.registered.values()).filter((object) => object.entityType === "pov")
    };
    Object.assign(payload, sceneData);
    return sceneData;
  }
  getAllObjects(payload, options) {
    Object.assign(payload, this.registered);
    return this.registered;
  }
  getObjects(payload, options) {
    if (payload.ids.length === 0) return [];
    const objects = [];
    this.registered.forEach((object) => {
      if (!payload.ids.includes(object.id)) return;
      objects.push(object);
    });
    return objects;
  }
  addObject(payload, options) {
    if (this.registered.get(payload.id)) return false;
    if (options == null ? void 0 : options.undoable) {
      this.undoStack.push({
        action: "DELETE_OBJECT",
        payload: {
          id: payload.id
        }
      });
    }
    if (options == null ? void 0 : options.redoable) {
      this.redoStack.push({
        action: "DELETE_OBJECT",
        payload: {
          id: payload.id
        }
      });
    }
    this.registered.set(payload.id, payload);
    this.scene.AddSceneObject(payload);
    return true;
  }
  updateObject(payload, options) {
    const objectToUpdate = this.registered.get(payload.id);
    if (!objectToUpdate) return false;
    if (options == null ? void 0 : options.undoable) {
      this.undoStack.push({
        action: "UPDATE_OBJECT",
        payload: __spreadValues({}, objectToUpdate)
      });
    }
    if (options == null ? void 0 : options.redoable) {
      this.redoStack.push({
        action: "UPDATE_OBJECT",
        payload: __spreadValues({}, objectToUpdate)
      });
    }
    this.registered.set(payload.id, __spreadValues(__spreadValues({}, objectToUpdate), payload));
    const updatedObject = this.registered.get(payload.id);
    this.scene.UpdateSceneObject(updatedObject);
    Object.assign(payload, updatedObject);
    return true;
  }
  deleteObject(payload, options) {
    const deletedObject = this.registered.get(payload.id);
    if (!deletedObject) return false;
    if (options == null ? void 0 : options.undoable) {
      this.undoStack.push({
        action: "ADD_OBJECT",
        payload: __spreadValues({}, deletedObject)
      });
    }
    if (options == null ? void 0 : options.redoable) {
      this.redoStack.push({
        action: "ADD_OBJECT",
        payload: __spreadValues({}, deletedObject)
      });
    }
    Object.assign(payload, deletedObject);
    this.registered.delete(payload.id);
    this.scene.DeleteSceneObject(deletedObject);
    return true;
  }
  selectObject(payload, options) {
    const object = this.registered.get(payload.id);
    if (!object) return false;
    const sceneObject = this.scene.GetSceneObject(object);
    if (!sceneObject) return false;
    if (!("isSelectable" in sceneObject)) return false;
    this.toolbox.UseTool("select");
    this.toolbox.GetActiveTool().AttachGizmo(sceneObject);
    Object.assign(payload, object);
    return true;
  }
  deselectObject(payload) {
    const object = this.registered.get(payload.id);
    if (!object) return false;
    const sceneObject = this.scene.GetSceneObject(object);
    if (!sceneObject) return false;
    if (!("isSelectable" in sceneObject)) return false;
    this.toolbox.UseTool("select");
    this.toolbox.GetActiveTool().DetachGizmo();
    Object.assign(payload, object);
    return true;
  }
  setBackground(payload, options) {
    if (options == null ? void 0 : options.undoable) {
      this.undoStack.push({
        action: "SET_BACKGROUND",
        payload: {
          color: this.scene.GetBackground()
        }
      });
    }
    if (options == null ? void 0 : options.redoable) {
      this.redoStack.push({
        action: "SET_BACKGROUND",
        payload: {
          color: this.scene.GetBackground()
        }
      });
    }
    this.scene.SetBackground(payload.color);
    return true;
  }
  dropIt(payload, options) {
    const object = this.registered.get(payload.id);
    if (!object) return false;
    if (options == null ? void 0 : options.undoable) {
      this.undoStack.push({
        action: "UPDATE_OBJECT",
        payload: __spreadValues({}, object)
      });
    }
    if (options == null ? void 0 : options.redoable) {
      this.redoStack.push({
        action: "DROP_IT",
        payload: __spreadValues({}, object)
      });
    }
    const model = this.scene.GetSceneObject(object);
    model.DropIt();
    return true;
  }
  placeOnFloor(payload, options) {
    const objectToPlaceOnFloor = this.registered.get(payload.id);
    if (!objectToPlaceOnFloor) return false;
    if (options == null ? void 0 : options.undoable) {
      this.undoStack.push({
        action: "UPDATE_OBJECT",
        payload: __spreadValues({}, objectToPlaceOnFloor)
      });
    }
    if (options == null ? void 0 : options.redoable) {
      this.redoStack.push({
        action: "PLACE_ON_FLOOR",
        payload: __spreadValues({}, objectToPlaceOnFloor)
      });
    }
    this.scene.PlaceOnFloor(payload);
    return true;
  }
  setCameraTransform(payload, options) {
    this.controller.object.position.copy(payload.position);
    this.controller.target.copy(payload.target);
    this.controller.update();
    return true;
  }
  getCameraTransform(payload, options) {
    const transform = {
      position: this.controller.object.position.clone(),
      target: this.controller.target.clone()
    };
    Object.assign(payload, transform);
    return transform;
  }
  moveCamera(payload, options) {
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
  setCameraLayer(payload, options) {
    this.controller.object.SetCameraLayer(payload.layer);
    return true;
  }
  resetCamera(payload, options) {
    this.controller.RevertLast(payload.duration);
    return true;
  }
  zoomCamera(payload, options) {
    if (payload.direction === "IN") this.controller.ZoomIn(payload.by);
    if (payload.direction === "OUT") this.controller.ZoomOut(payload.by);
    return true;
  }
  setGizmoMode(payload, options) {
    this.toolbox.SetGizmoMode(payload.mode);
    return true;
  }
  modelLoaded(payload, options) {
    this.registered.get(payload.id).loaded = true;
    return true;
  }
  updateScene(payload, options) {
    if (options == null ? void 0 : options.undoable) {
      this.undoStack.push({
        action: "UPDATE_SCENE",
        payload: {
          name: this.scene.name,
          backgroundColor: this.scene.GetBackground(),
          floorEnabled: this.scene.Root.Floor.visible,
          floorColor: "#" + this.scene.Root.Floor.material.color.getHexString()
        }
      });
    }
    if (options == null ? void 0 : options.redoable) {
      this.redoStack.push({
        action: "UPDATE_SCENE",
        payload: {
          name: this.scene.name,
          backgroundColor: this.scene.GetBackground(),
          floorEnabled: this.scene.Root.Floor.visible,
          floorColor: "#" + this.scene.Root.Floor.material.color.getHexString()
        }
      });
    }
    if (payload.name !== void 0) this.scene.name = payload.name;
    if (payload.backgroundColor !== void 0) this.scene.SetBackground(payload.backgroundColor);
    if (payload.floorEnabled !== void 0) this.scene.Root.Floor.SetVisibility(payload.floorEnabled);
    if (payload.floorColor !== void 0) this.scene.Root.Floor.SetColor(payload.floorColor);
    payload.name = this.scene.name;
    payload.backgroundColor = "#" + this.scene.background.getHexString();
    payload.floorEnabled = this.scene.Root.Floor.visible;
    payload.floorColor = "#" + this.scene.Root.Floor.material.color.getHexString();
    return true;
  }
  generateMedia(payload, options) {
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
};
_DIVECommunication.__instances = [];
var DIVECommunication = _DIVECommunication;

// src/light/PointLight.ts
var DIVEPointLight = class extends Object3D2 {
  constructor() {
    super();
    this.isMoveable = true;
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
    const geometry = new SphereGeometry(geoSize, geoSize * 320, geoSize * 320);
    const material = new MeshBasicMaterial({ color: this.light.color, transparent: true, opacity: 0.8, side: FrontSide });
    this.mesh = new Mesh(geometry, material);
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
import { DirectionalLight, HemisphereLight, Object3D as Object3D3 } from "three";
var DIVESceneLight = class extends Object3D3 {
  constructor() {
    super();
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

// src/scene/root/lightroot/LightRoot.ts
var DIVELightRoot = class extends Object3D4 {
  constructor() {
    super();
    this.name = "LightRoot";
  }
  GetLight(object) {
    if (object.id === void 0) {
      console.warn("LightRoot.GetLight: object.id is undefined");
      return void 0;
    }
    return this.children.find((object3D) => object3D.userData.id === object.id);
  }
  UpdateLight(light) {
    if (light.id === void 0) {
      console.warn(`LightRoot.UpdateLight: light.id is undefined`);
      return;
    }
    let sceneObject = this.children.find((object3D) => object3D.userData.id === light.id);
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
          console.warn(`LightRoot.UpdateLight: Unknown light type: ${light.type}`);
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
    if (light.color !== void 0 && light.color !== null) sceneObject.SetColor(new Color5(light.color));
    if (light.visible !== void 0 && light.visible !== null) sceneObject.visible = light.visible;
  }
  DeleteLight(light) {
    if (light.id === void 0) {
      console.warn("LightRoot.DeleteLight: light.id is undefined");
      return;
    }
    const sceneObject = this.children.find((object3D) => object3D.userData.id === light.id);
    if (!sceneObject) {
      console.warn(`LightRoot.DeleteLight: Light with id ${light.id} not found`);
      return;
    }
    const findScene = (object) => {
      if (object.parent !== null) {
        return findScene(object.parent);
      }
      ;
      return object;
    };
    const scene = findScene(sceneObject);
    scene.children.find((object) => {
      if ("isTransformControls" in object) {
        object.detach();
      }
    });
    this.remove(sceneObject);
  }
};

// src/scene/root/modelroot/ModelRoot.ts
import { Object3D as Object3D6 } from "three";

// src/model/Model.ts
import { Box3, Object3D as Object3D5, Raycaster, Vector3 } from "three";

// src/helper/findSceneRecursive/findSceneRecursive.ts
var findSceneRecursive = (object) => {
  if (object.parent) {
    return findSceneRecursive(object.parent);
  }
  return object;
};

// src/model/Model.ts
var DIVEModel = class extends Object3D5 {
  constructor() {
    super();
    this.isSelectable = true;
    this.isMoveable = true;
    this.gizmo = null;
    this.layers.mask = PRODUCT_LAYER_MASK;
    this.boundingBox = new Box3();
  }
  SetModel(gltf) {
    this.clear();
    gltf.scene.traverse((child) => {
      child.castShadow = true;
      child.receiveShadow = true;
      child.layers.mask = this.layers.mask;
      this.boundingBox.expandByObject(child);
    });
    this.add(gltf.scene);
  }
  SetPosition(position) {
    this.position.set(position.x, position.y, position.z);
  }
  SetRotation(rotation) {
    this.rotation.setFromVector3(new Vector3(rotation.x, rotation.y, rotation.z));
  }
  SetScale(scale) {
    this.scale.set(scale.x, scale.y, scale.z);
  }
  SetToWorldOrigin() {
    var _a;
    this.position.set(0, 0, 0);
    (_a = DIVECommunication.get(this.userData.id)) == null ? void 0 : _a.PerformAction("UPDATE_OBJECT", {
      id: this.userData.id,
      position: this.position,
      rotation: this.rotation,
      scale: this.scale
    });
  }
  PlaceOnFloor() {
    var _a;
    this.position.y = -this.boundingBox.min.y * this.scale.y;
    (_a = DIVECommunication.get(this.userData.id)) == null ? void 0 : _a.PerformAction("UPDATE_OBJECT", {
      id: this.userData.id,
      position: this.position,
      rotation: this.rotation,
      scale: this.scale
    });
  }
  DropIt() {
    var _a;
    if (!this.parent) {
      console.warn("DIVEModel: DropIt() called on a model that is not in the scene.", this);
      return;
    }
    const bottomY = this.boundingBox.min.y * this.scale.y;
    const bbBottomCenter = this.localToWorld(this.boundingBox.getCenter(new Vector3()).multiply(this.scale));
    bbBottomCenter.y = bottomY + this.position.y;
    const raycaster = new Raycaster(bbBottomCenter, new Vector3(0, -1, 0));
    raycaster.layers.mask = PRODUCT_LAYER_MASK;
    const intersections = raycaster.intersectObjects(findSceneRecursive(this).Root.children, true);
    if (intersections.length > 0) {
      const mesh = intersections[0].object;
      mesh.geometry.computeBoundingBox();
      const meshBB = mesh.geometry.boundingBox;
      const worldPos = mesh.localToWorld(meshBB.max.clone());
      const oldPos = this.position.clone();
      const newPos = this.position.clone().setY(worldPos.y).add(new Vector3(0, bottomY, 0));
      this.position.copy(newPos);
      if (this.position.y === oldPos.y) return;
      (_a = DIVECommunication.get(this.userData.id)) == null ? void 0 : _a.PerformAction("UPDATE_OBJECT", { id: this.userData.id, position: this.position, rotation: this.rotation, scale: this.scale });
    }
  }
  onMove() {
    var _a;
    (_a = DIVECommunication.get(this.userData.id)) == null ? void 0 : _a.PerformAction("UPDATE_OBJECT", {
      id: this.userData.id,
      position: this.position,
      rotation: this.rotation,
      scale: this.scale
    });
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

// src/loadingmanager/LoadingManager.ts
import { DRACOLoader, GLTFLoader } from "three/examples/jsm/Addons.js";
var DIVELoadingManager = class {
  // ... maybe extend with other loaders later
  constructor() {
    this.progress = /* @__PURE__ */ new Map();
    this.gltfloader = new GLTFLoader();
    this.dracoloader = new DRACOLoader();
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

// src/scene/root/modelroot/ModelRoot.ts
var DIVEModelRoot = class extends Object3D6 {
  constructor() {
    super();
    this.name = "ModelRoot";
    this.loadingManager = new DIVELoadingManager();
  }
  GetModel(object) {
    if (object.id === void 0) {
      console.warn("ModelRoot.GetModel: object.id is undefined");
      return void 0;
    }
    return this.children.find((object3D) => object3D.userData.id === object.id);
  }
  UpdateModel(object) {
    if (object.id === void 0) {
      console.warn("ModelRoot.UpdateModel: object.id is undefined");
      return;
    }
    let sceneObject = this.children.find((object3D) => object3D.userData.id === object.id);
    if (!sceneObject && object.uri !== void 0) {
      const model = new DIVEModel();
      sceneObject = model;
      sceneObject.userData.id = object.id;
      this.add(sceneObject);
      this.loadingManager.LoadGLTF(object.uri).then((gltf) => {
        var _a;
        model.SetModel(gltf);
        (_a = DIVECommunication.get(object.id)) == null ? void 0 : _a.PerformAction("MODEL_LOADED", { id: object.id });
      });
    }
    if (object.position !== void 0) sceneObject.SetPosition(object.position);
    if (object.rotation !== void 0) sceneObject.SetRotation(object.rotation);
    if (object.scale !== void 0) sceneObject.SetScale(object.scale);
    if (object.visible !== void 0) sceneObject.visible = object.visible;
  }
  DeleteModel(object) {
    if (object.id === void 0) {
      console.warn(`ModelRoot.DeleteModel: object.id is undefined`);
      return;
    }
    const sceneObject = this.children.find((object3D) => object3D.userData.id === object.id);
    if (!sceneObject) {
      console.warn(`ModelRoot.DeleteModel: Model with id ${object.id} not found`);
      return;
    }
    const findScene = (object2) => {
      if (object2.parent !== null) {
        return findScene(object2.parent);
      }
      ;
      return object2;
    };
    const scene = findScene(sceneObject);
    scene.children.find((object2) => {
      if ("isTransformControls" in object2) {
        object2.detach();
      }
    });
    this.remove(sceneObject);
  }
  PlaceOnFloor(object) {
    if (object.id === void 0) console.warn("ModelRoot.PlaceOnFloor: object.id is undefined");
    const sceneObject = this.children.find((object3D) => object3D.userData.id === object.id);
    if (!sceneObject) return;
    sceneObject.PlaceOnFloor();
  }
};

// src/primitive/floor/Floor.ts
import { Color as Color6, Mesh as Mesh2, MeshStandardMaterial as MeshStandardMaterial2, PlaneGeometry } from "three";
var DIVEFloor = class extends Mesh2 {
  constructor() {
    super(new PlaneGeometry(1e4, 1e4), new MeshStandardMaterial2({ color: new Color6(150 / 255, 150 / 255, 150 / 255) }));
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

// src/constant/GridColors.ts
var GRID_CENTER_LINE_COLOR = "#888888";
var GRID_SIDE_LINE_COLOR = "#dddddd";

// src/grid/Grid.ts
import { GridHelper, Object3D as Object3D7 } from "three";
var DIVEGrid = class extends Object3D7 {
  constructor() {
    super();
    this.name = "Grid";
    const grid = new GridHelper(100, 100, GRID_CENTER_LINE_COLOR, GRID_SIDE_LINE_COLOR);
    grid.material.depthTest = false;
    grid.layers.mask = HELPER_LAYER_MASK;
    this.add(grid);
  }
};

// src/scene/root/Root.ts
var DIVERoot = class extends Object3D8 {
  get Floor() {
    return this.floor;
  }
  get Grid() {
    return this.grid;
  }
  constructor() {
    super();
    this.name = "Root";
    this.lightRoot = new DIVELightRoot();
    this.add(this.lightRoot);
    this.modelRoot = new DIVEModelRoot();
    this.add(this.modelRoot);
    this.floor = new DIVEFloor();
    this.add(this.floor);
    this.grid = new DIVEGrid();
    this.add(this.grid);
  }
  GetSceneObject(object) {
    switch (object.entityType) {
      case "pov": {
        return void 0;
      }
      case "light": {
        return this.lightRoot.GetLight(object);
      }
      case "model": {
        return this.modelRoot.GetModel(object);
      }
    }
  }
  AddSceneObject(object) {
    switch (object.entityType) {
      case "pov": {
        break;
      }
      case "light": {
        this.lightRoot.UpdateLight(object);
        break;
      }
      case "model": {
        this.modelRoot.UpdateModel(object);
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
        this.lightRoot.UpdateLight(object);
        break;
      }
      case "model": {
        this.modelRoot.UpdateModel(object);
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
        this.lightRoot.DeleteLight(object);
        break;
      }
      case "model": {
        this.modelRoot.DeleteModel(object);
        break;
      }
    }
  }
  PlaceOnFloor(object) {
    this.modelRoot.PlaceOnFloor(object);
  }
};

// src/scene/Scene.ts
var DIVEScene = class extends Scene2 {
  get Root() {
    return this.root;
  }
  constructor() {
    super();
    this.root = new DIVERoot();
    this.add(this.root);
  }
  GetBackground() {
    return `#${this.background ? this.background.getHexString() : "000000"}`;
  }
  SetBackground(color) {
    this.background = new Color7(color);
  }
  GetSceneObject(object) {
    return this.Root.GetSceneObject(object);
  }
  AddSceneObject(object) {
    this.Root.UpdateSceneObject(object);
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

// src/camera/PerspectiveCamera.ts
import { PerspectiveCamera } from "three";
var DIVEPerspectiveCameraDefaultSettings = {
  fov: 80,
  near: 0.1,
  far: 1e3
};
var _DIVEPerspectiveCamera = class _DIVEPerspectiveCamera extends PerspectiveCamera {
  constructor(settings = DIVEPerspectiveCameraDefaultSettings) {
    super(settings.fov, 1, settings.near, settings.far);
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
var DIVEPerspectiveCamera = _DIVEPerspectiveCamera;

// src/controls/OrbitControls.ts
import { OrbitControls } from "three/examples/jsm/Addons.js";
import { MathUtils as MathUtils3 } from "three";
import { Easing, Tween } from "@tweenjs/tween.js";
var DIVEOrbitControlsDefaultSettings = {
  enableDamping: true,
  dampingFactor: 0.04
};
var _DIVEOrbitControls = class _DIVEOrbitControls extends OrbitControls {
  constructor(camera, renderer, settings = DIVEOrbitControlsDefaultSettings) {
    super(camera, renderer.domElement);
    this.last = null;
    this.animating = false;
    this.locked = false;
    this.stopMoveTo = () => {
    };
    this.stopRevertLast = () => {
    };
    this.preRenderCallback = () => {
      if (this.locked) return;
      this.update();
    };
    this.domElement = renderer.domElement;
    this.object = camera;
    renderer.AddPreRenderCallback(() => {
      this.preRenderCallback();
    });
    this.enableDamping = settings.enableDamping;
    this.dampingFactor = settings.dampingFactor;
  }
  ZoomIn(by) {
    const zoomBy = by || _DIVEOrbitControls.DEFAULT_ZOOM_FACTOR;
    const { minDistance, maxDistance } = this;
    this.minDistance = this.maxDistance = MathUtils3.clamp(this.getDistance() - zoomBy, minDistance + zoomBy, maxDistance - zoomBy);
    this.update();
    this.minDistance = minDistance;
    this.maxDistance = maxDistance;
  }
  ZoomOut(by) {
    const zoomBy = by || _DIVEOrbitControls.DEFAULT_ZOOM_FACTOR;
    const { minDistance, maxDistance } = this;
    this.minDistance = this.maxDistance = MathUtils3.clamp(this.getDistance() + zoomBy, minDistance + zoomBy, maxDistance - zoomBy);
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
    const tweenPos = new Tween(this.object.position).to(toPosition, duration).easing(Easing.Quadratic.Out).start();
    const tweenQuat = new Tween(this.target).to(toTarget, duration).easing(Easing.Quadratic.Out).onUpdate(() => {
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
    const tweenPos = new Tween(this.object.position).to(pos, duration).easing(Easing.Quadratic.Out).start();
    const tweenQuat = new Tween(this.target).to(target, duration).easing(Easing.Quadratic.Out).onUpdate(() => {
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

// src/mediacreator/MediaCreator.ts
var DIVEMediaCreator = class {
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

// src/interface/Selectable.ts
function isSelectable(object) {
  return "isSelectable" in object;
}

// src/toolbox/BaseTool.ts
import { Raycaster as Raycaster2, Vector2, Vector3 as Vector32 } from "three";

// src/interface/Draggable.ts
var isDraggable = (object) => {
  return "isDraggable" in object;
};
var findDraggableInterface = (child) => {
  if (child === void 0) return void 0;
  if (child.parent === null) {
    return void 0;
  }
  if (isDraggable(child)) {
    return child;
  }
  return findDraggableInterface(child.parent);
};

// src/interface/Hoverable.ts
var isHoverable = (object) => {
  return "isHoverable" in object;
};
var findHoverableInterface = (child) => {
  if (child === void 0) return void 0;
  if (child.parent === null) {
    return void 0;
  }
  if (isHoverable(child)) {
    return child;
  }
  return findHoverableInterface(child.parent);
};

// src/toolbox/BaseTool.ts
var DIVEBaseTool = class {
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
    this._raycaster = new Raycaster2();
    this._raycaster.layers.mask = PRODUCT_LAYER_MASK | UI_LAYER_MASK;
    this._intersects = [];
    this._hovered = null;
    this._dragging = false;
    this._dragStart = new Vector32();
    this._dragCurrent = new Vector32();
    this._dragEnd = new Vector32();
    this._dragDelta = new Vector32();
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
    if (objects !== void 0) return this._raycaster.intersectObjects(objects, true);
    return this._raycaster.intersectObjects(this._scene.children, true);
  }
  pointerWasDragged() {
    return this._lastPointerDown.distanceTo(this._pointer) > this.POINTER_DRAG_THRESHOLD;
  }
};

// src/toolbox/transform/TransformTool.ts
import { TransformControls } from "three/examples/jsm/Addons";
var DIVETransformTool = class extends DIVEBaseTool {
  constructor(scene, controller) {
    super(scene, controller);
    this.name = "DIVETransformTool";
    this._gizmo = new TransformControls(this._controller.object, this._controller.domElement);
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

// src/toolbox/select/SelectTool.ts
var DIVESelectTool = class extends DIVETransformTool {
  constructor(scene, controller) {
    super(scene, controller);
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
  DetachGizmo() {
    this._gizmo.detach();
  }
  AttachGizmo(selectable) {
    if ("isMoveable" in selectable) {
      const movable = selectable;
      this._gizmo.attach(movable);
    }
  }
  onClick(e) {
    super.onClick(e);
    const first = this._raycaster.intersectObjects(this._scene.Root.children, true)[0];
    const selectable = this.findSelectableInterface(first == null ? void 0 : first.object);
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
  findSelectableInterface(child) {
    if (child === void 0) return void 0;
    if (child.parent === null) {
      return void 0;
    }
    if (isSelectable(child)) {
      return child;
    }
    return this.findSelectableInterface(child.parent);
  }
};

// src/toolbox/Toolbox.ts
var DIVEToolbox = class {
  constructor(scene, controller) {
    this.removeListenersCallback = () => {
    };
    this.selectTool = new DIVESelectTool(scene, controller);
    controller.domElement.addEventListener("pointermove", this.onPointerMove.bind(this));
    controller.domElement.addEventListener("pointerdown", this.onPointerDown.bind(this));
    controller.domElement.addEventListener("pointerup", this.onPointerUp.bind(this));
    controller.domElement.addEventListener("wheel", this.onWheel.bind(this));
    this.removeListenersCallback = () => {
      controller.domElement.removeEventListener("pointermove", this.onPointerMove.bind(this));
      controller.domElement.removeEventListener("pointerdown", this.onPointerDown.bind(this));
      controller.domElement.removeEventListener("pointerup", this.onPointerUp.bind(this));
      controller.domElement.removeEventListener("wheel", this.onWheel.bind(this));
    };
    this.activeTool = this.selectTool;
    this.activeTool.Activate();
  }
  dispose() {
    this.removeListenersCallback();
  }
  GetActiveTool() {
    return this.activeTool;
  }
  UseTool(tool) {
    this.activeTool.Deactivate();
    switch (tool) {
      case "select": {
        this.selectTool.Activate();
        this.activeTool = this.selectTool;
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
  onPointerMove(e) {
    this.activeTool.onPointerMove(e);
  }
  onPointerDown(e) {
    this.activeTool.onPointerDown(e);
  }
  onPointerUp(e) {
    this.activeTool.onPointerUp(e);
  }
  onWheel(e) {
    this.activeTool.onWheel(e);
  }
};
DIVEToolbox.DefaultTool = "select";

// src/animation/AnimationSystem.ts
import { update as updateTween } from "@tweenjs/tween.js";
var DIVEAnimationSystem = class {
  update() {
    updateTween();
  }
};

// src/axiscamera/AxisCamera.ts
import { AxesHelper, Color as Color8, Matrix4, OrthographicCamera } from "three";
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
  constructor() {
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
  }
  SetFromCameraMatrix(matrix) {
    this.axesHelper.rotation.setFromRotationMatrix(new Matrix4().extractRotation(matrix).invert());
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
  renderer: DIVERendererDefaultSettings,
  perspectiveCamera: DIVEPerspectiveCameraDefaultSettings,
  orbitControls: DIVEOrbitControlsDefaultSettings
};
var DIVE = class {
  // getters
  get Communication() {
    return this.communication;
  }
  get Canvas() {
    return this.renderer.domElement;
  }
  // setters
  set Settings(settings) {
    const settingsDelta = getObjectDelta(this._settings, settings);
    if (settingsDelta.renderer) this.renderer = new DIVERenderer(this._settings.renderer);
    if (settingsDelta.perspectiveCamera) {
      this.perspectiveCamera.fov = settingsDelta.perspectiveCamera.fov;
      this.perspectiveCamera.near = settingsDelta.perspectiveCamera.near;
      this.perspectiveCamera.far = settingsDelta.perspectiveCamera.far;
      this.perspectiveCamera.OnResize(this.renderer.domElement.width, this.renderer.domElement.height);
    }
    if (settingsDelta.orbitControls) {
      this.orbitControls.enableDamping = settingsDelta.orbitControls.enableDamping;
      this.orbitControls.dampingFactor = settingsDelta.orbitControls.dampingFactor;
    }
    if (settingsDelta.autoResize !== this._settings.autoResize) {
      if (settingsDelta.autoResize) {
        this.addResizeObserver();
      } else {
        this.removeResizeObserver();
      }
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
    this.orbitControls = new DIVEOrbitControls(this.perspectiveCamera, this.renderer, this._settings.orbitControls);
    this.mediaCreator = new DIVEMediaCreator(this.renderer, this.scene, this.orbitControls);
    this.toolbox = new DIVEToolbox(this.scene, this.orbitControls);
    this.communication = new DIVECommunication(this.scene, this.orbitControls, this.toolbox, this.mediaCreator);
    this.animationSystem = new DIVEAnimationSystem();
    this.renderer.AddPreRenderCallback(() => {
      this.animationSystem.update();
    });
    this.axisCamera = new DIVEAxisCamera();
    this.scene.add(this.axisCamera);
    const restoreViewport = new Vector4();
    this.renderer.AddPostRenderCallback(() => {
      const restoreBackground = this.scene.background;
      this.scene.background = null;
      this.renderer.getViewport(restoreViewport);
      this.renderer.setViewport(0, 0, 150, 150);
      this.renderer.autoClear = false;
      this.axisCamera.SetFromCameraMatrix(this.perspectiveCamera.matrix);
      this.renderer.render(this.scene, this.axisCamera);
      this.renderer.setViewport(restoreViewport);
      this.renderer.autoClear = true;
      this.scene.background = restoreBackground;
    });
    if (this._settings.autoResize) {
      this.addResizeObserver();
    }
    this.renderer.StartRenderer(this.scene, this.perspectiveCamera);
    window.DIVE = {
      PrintScene: () => {
        console.log(this.scene);
      }
    };
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
export {
  DIVE,
  DIVECommunication,
  DIVEDefaultSettings,
  DIVEMath,
  DIVE as default
};
//# sourceMappingURL=dive.js.map