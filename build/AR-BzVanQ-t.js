import { O as p, t as y, u as w, M as S, e as d, V as o, v as E, Q as c, w as h, x as u, y as H } from "./dive-Dk0rFfvA.js";
function T(r, t) {
  return r ? t in r : !1;
}
function m(r, t) {
  if (r)
    return T(r, t) ? r : m(r.parent, t);
}
class v {
  static Launch(t, e) {
    const s = this.findARQuickLookSrc(t);
    return this.launchARQuickLook(s, e);
  }
  static launchARQuickLook(t, e) {
    return new Promise((s) => {
      (e == null ? void 0 : e.arScale) === "fixed" && (t = t.concat("#allowsContentScaling=0"));
      const i = document.createElement("a");
      i.innerHTML = "<picture></picture>", i.rel = "ar", i.href = t, i.download = "scene.usdz", s(), i.click();
    });
  }
  static findARQuickLookSrc(t) {
    let e = null;
    if (t.traverse((s) => {
      e || s.userData.uri && (e = s.userData.uri);
    }), !e)
      throw new Error("No model found in scene");
    return e;
  }
  // private static extractModels(scene: DIVEScene): Object3D[] {
  //     // extract models
  //     return scene.Root.children;
  // }
  // private static launchARFromNode(
  //     node: Object3D,
  //     options?: DIVEAROptions,
  // ): Promise<void> {
  //     // bundle USDZ
  //     return this._usdzExporter
  //         .parse(node, {
  //             quickLookCompatible: true,
  //             ar: {
  //                 anchoring: { type: 'plane' },
  //                 planeAnchoring: {
  //                     alignment:
  //                         options?.arPlacement === 'vertical'
  //                             ? 'vertical'
  //                             : 'horizontal',
  //                 },
  //             },
  //         })
  //         .then((usdz: Uint8Array) => {
  //             // create blob
  //             const blob = new Blob([usdz], { type: 'model/vnd.usdz+zip' });
  //             let url = URL.createObjectURL(blob);
  //             if (options?.arScale === 'fixed') {
  //                 url = url.concat('#allowsContentScaling=0');
  //             }
  //             // launch ARQuickLook
  //             const a = document.createElement('a');
  //             a.innerHTML = '<picture></picture>'; // This is actually needed so the viewer opens instantly
  //             a.rel = 'ar';
  //             a.href = url;
  //             a.download = 'scene.usdz';
  //             a.click();
  //         });
  // }
}
class P {
  get Element() {
    return this._element;
  }
  get CloseButton() {
    return this._closeButton;
  }
  constructor() {
    this._element = document.createElement("div"), this._closeButton = this.createCloseButton(), this._element.appendChild(this._closeButton), document.body.appendChild(this._element);
  }
  createCloseButton() {
    const t = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "path"
    );
    t.setAttribute("d", "M 12,12 L 28,28 M 28,12 12,28"), t.setAttribute("stroke", "#fff"), t.setAttribute("stroke-width", "2");
    const e = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "svg"
    );
    return e.setAttribute("width", "38"), e.setAttribute("height", "38"), e.style.position = "absolute", e.style.right = "20px", e.style.top = "20px", e.appendChild(t), e;
  }
}
class x extends p {
  set mesh(t) {
    this.clear(), t && this.add(t);
  }
  constructor(t) {
    return super(), t ? this.mesh = t : this.UseDefaultMesh(), this.matrixAutoUpdate = !1, this;
  }
  UseDefaultMesh() {
    const t = new y(0.08, 0.1, 32).rotateX(-Math.PI / 2), e = new w();
    this.mesh = new S(t, e);
  }
  UpdateFromPose(t) {
    this.matrix.fromArray(t.transform.matrix);
  }
}
class C {
  constructor(t, e) {
    this._referenceSpaceBuffer = null, this._requesting = !1, this._initialized = !1, this._session = t, this._renderer = e, this._hitMatrixBuffer = new d();
  }
  Dispose() {
    var t;
    (t = this._transientHitTestSource) == null || t.cancel(), this._transientHitTestSource = void 0, this._initialized = !1;
  }
  async Init() {
    return this._session ? this._requesting ? (console.error(
      "DIVEWebXRRaycaster: Currently initializing! Aborting initialization..."
    ), Promise.reject()) : this._initialized ? (console.error(
      "DIVEWebXRRaycaster: Already initialized! Aborting initialization..."
    ), Promise.reject()) : (this._requesting = !0, this._transientHitTestSource = await this._session.requestHitTestSourceForTransientInput({
      profile: "generic-touchscreen"
    }), this._referenceSpaceBuffer = this._renderer.xr.getReferenceSpace(), this._requesting = !1, this._transientHitTestSource ? (this._initialized = !0, console.log("DIVEWebXRRaycasterAR: Initialized"), Promise.resolve(this)) : Promise.reject()) : (console.error(
      "DIVEWebXRRaycaster: No session set in Init()! Aborting initialization..."
    ), Promise.reject());
  }
  GetIntersections(t) {
    if (!this._transientHitTestSource) return [];
    const e = t.getHitTestResultsForTransientInput(
      this._transientHitTestSource
    );
    return e.length === 0 ? [] : e.map((i) => {
      if (!this._referenceSpaceBuffer || !i.results[0] || !i.results[0].getPose) return;
      const a = i.results[0].getPose(this._referenceSpaceBuffer);
      return a ? (this._hitMatrixBuffer.fromArray(a.transform.matrix), {
        point: new o().setFromMatrixPosition(
          this._hitMatrixBuffer
        ),
        matrix: this._hitMatrixBuffer,
        object: void 0
      }) : void 0;
    }).filter((i) => i !== void 0);
  }
}
class A {
  constructor(t, e) {
    this._raycaster = new E(), this._renderer = t, this._scene = e, this._controller = this._renderer.xr.getController(0);
  }
  async Init() {
    return console.log("DIVEWebXRRaycasterTHREE: Initialized"), Promise.resolve(this);
  }
  GetIntersections() {
    this._controller.updateMatrixWorld(), this._raycaster.setFromXRController(this._controller);
    const t = this._raycaster.intersectObjects(
      this._scene.XRRoot.XRModelRoot.children
    );
    return t.length === 0 ? [] : t.map((e) => ({
      point: e.point,
      matrix: e.object.matrixWorld,
      object: e.object
    }));
  }
}
class g {
  constructor() {
    this._listeners = /* @__PURE__ */ new Map();
  }
  Subscribe(t, e) {
    return this._listeners.get(t) || this._listeners.set(t, []), this._listeners.get(t).push(e), () => {
      const s = this._listeners.get(t);
      if (!s) return !1;
      const i = s.findIndex(
        (a) => a === e
      );
      return i === -1 ? !1 : (s.splice(i, 1), !0);
    };
  }
  dispatch(t, e) {
    const s = this._listeners.get(t);
    s && s.forEach((i) => i(e));
  }
}
class I extends g {
  constructor(t, e, s) {
    super(), this._initialized = !1, this._arHitResultBuffer = [], this._sceneHitResultBuffer = [], this._hasHit = !1, this._session = t, this._threeRaycaster = new A(e, s), this._arRaycaster = new C(t, e);
  }
  Dispose() {
    this._initialized = !1;
  }
  async Init() {
    return this._session ? this._initialized ? (console.error(
      "DIVEWebXRRaycaster: Already initialized! Aborting initialization..."
    ), Promise.reject()) : (await this._threeRaycaster.Init(), await this._arRaycaster.Init(), console.log("DIVEWebXRRaycaster: Initialized"), this._initialized = !0, Promise.resolve(this)) : (console.error(
      "DIVEWebXRRaycaster: No session set in Init()! Aborting initialization..."
    ), Promise.reject());
  }
  GetARIntersections(t) {
    return this._arHitResultBuffer = this._arRaycaster.GetIntersections(t), this._arHitResultBuffer.length > 0 ? this.onARHitFound(this._arHitResultBuffer[0]) : this.onARHitLost(), this._arHitResultBuffer;
  }
  GetSceneIntersections() {
    return this._sceneHitResultBuffer = this._threeRaycaster.GetIntersections(), this._sceneHitResultBuffer.length > 0 ? this.onSceneHitFound(this._sceneHitResultBuffer[0]) : this.onSceneHitLost(), this._sceneHitResultBuffer;
  }
  onARHitFound(t) {
    this._hasHit = !0, this.dispatch("AR_HIT_FOUND", { hit: t });
  }
  onARHitLost() {
    this._hasHit && (this._hasHit = !1, this.dispatch("AR_HIT_LOST"));
  }
  onSceneHitFound(t) {
    this._hasHit = !0, this.dispatch("SCENE_HIT_FOUND", { hit: t });
  }
  onSceneHitLost() {
    this._hasHit && (this._hasHit = !1, this.dispatch("SCENE_HIT_LOST"));
  }
}
class D {
  constructor(t, e, s) {
    this._raycastHitCounter = 0, this._originSetResolve = () => {
    }, this._renderer = e, this._session = t, this._originSet = new Promise((i) => {
      this._originSetResolve = i;
    }), this._requesting = !1, this._initialized = !1, this._referenceSpaceBuffer = null, this._hitTestSource = null, this._entityTypes = s || ["plane"], this._hitTestResultBuffer = [], this._matrix = new d(), this._position = new o(), this._quaternion = new c(), this._scale = new o(), this._originSet.then(() => {
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
  set matrix(t) {
    this._matrix = t, this._matrix.decompose(this._position, this._quaternion, this._scale);
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
  async Init() {
    if (this._initialized)
      return Promise.resolve(this);
    if (!this._session)
      return console.error(
        "DIVEWebXROrigin: No session set in Init()! Aborting initialization..."
      ), Promise.reject();
    if (this._requesting)
      return console.error(
        "DIVEWebXROrigin: Currently initializing! Aborting initialization..."
      ), Promise.reject();
    this._requesting = !0;
    const t = await this._session.requestReferenceSpace("viewer");
    return this._hitTestSource = await this._session.requestHitTestSource({
      space: t,
      entityTypes: this._entityTypes
    }) || null, this._requesting = !1, this._hitTestSource ? (this._initialized = !0, Promise.resolve(this)) : Promise.reject();
  }
  Dispose() {
    var t;
    this._initialized = !1, this._requesting = !1, (t = this._hitTestSource) == null || t.cancel(), this._hitTestSource = null, this._hitTestResultBuffer = [], this._matrix = new d(), this._position = new o(), this._quaternion = new c(), this._scale = new o();
  }
  Update(t) {
    if (this._initialized) {
      if (!this._hitTestSource)
        throw new Error(
          "DIVEWebXRRaycaster: Critical Error: HitTestSource not available but WebXROrigin is initialized!"
        );
      if (this._hitTestResultBuffer = t.getHitTestResults(
        this._hitTestSource
      ), this._hitTestResultBuffer.length > 0) {
        if (this._referenceSpaceBuffer = this._renderer.xr.getReferenceSpace(), !this._referenceSpaceBuffer) {
          this.onHitLost();
          return;
        }
        const e = this._hitTestResultBuffer[0].getPose(
          this._referenceSpaceBuffer
        );
        if (!e) {
          this.onHitLost();
          return;
        }
        this.onHitFound(e);
      } else
        this.onHitLost();
    }
  }
  onHitFound(t) {
    this._raycastHitCounter++, this.matrix.fromArray(t.transform.matrix), this._raycastHitCounter > 50 && this._originSetResolve();
  }
  onHitLost() {
    this._raycastHitCounter = 0;
  }
}
class X extends g {
  constructor(t) {
    super(), this._touchCount = 0, this._touches = [], this._handleRotateStarted = !1, this._handleRotateMoved = !1, this._handleRotateEnded = !1, this._startAngle = 0, this._lastAngle = 0, this._angleDelta = 0, this._handlePinchStarted = !1, this._handlePinchMoved = !1, this._handlePinchEnded = !1, this._scaleDistanceStart = 0, this._currentDistance = 1, this._deltaDistance = 0, this._session = t, this._touches = [
      {
        start: new h(),
        current: new h(),
        delta: new h()
      },
      {
        start: new h(),
        current: new h(),
        delta: new h()
      }
    ], this._handleRotateStarted = !1, window.addEventListener(
      "touchstart",
      (e) => this.onTouchStart(e)
    ), window.addEventListener(
      "touchmove",
      (e) => this.onTouchMove(e)
    ), window.addEventListener(
      "touchend",
      (e) => this.onTouchEnd(e)
    ), this._session.addEventListener(
      "selectstart",
      () => this.onSessionSelectStart()
    ), this._session.addEventListener(
      "selectend",
      () => this.onSessionSelectEnd()
    );
  }
  Dispose() {
    window.removeEventListener(
      "touchstart",
      (t) => this.onTouchStart(t)
    ), window.removeEventListener(
      "touchmove",
      (t) => this.onTouchMove(t)
    ), window.removeEventListener(
      "touchend",
      (t) => this.onTouchEnd(t)
    ), this._session.removeEventListener(
      "selectstart",
      () => this.onSessionSelectStart()
    ), this._session.removeEventListener(
      "selectend",
      () => this.onSessionSelectEnd()
    );
  }
  onTouchStart(t) {
    this._touchCount = t.touches.length, this._touches[0].start.set(
      t.touches[0].clientX,
      t.touches[0].clientY
    ), this._touches[0].current.set(
      t.touches[0].clientX,
      t.touches[0].clientY
    ), this._touches[0].delta.set(0, 0), this._touchCount > 1 && (this._touches[1].start.set(
      t.touches[1].clientX,
      t.touches[1].clientY
    ), this._touches[1].current.set(
      t.touches[1].clientX,
      t.touches[1].clientY
    ), this._touches[1].delta.set(0, 0)), this._touchCount === 2 && (this.handleRotateStart(), this.handlePinchStart()), this._handleRotateStarted && (this.dispatch("ROTATE_START", {
      current: 0
    }), this._handleRotateStarted = !1), this._handlePinchStarted && (this.dispatch("PINCH_START", {
      current: 0
    }), this._handlePinchStarted = !1);
  }
  onTouchMove(t) {
    this._touchCount = t.touches.length, this._touches[0].start.set(
      t.touches[0].clientX,
      t.touches[0].clientY
    ), this._touches[0].current.set(
      t.touches[0].clientX,
      t.touches[0].clientY
    ), this._touches[0].delta.copy(
      this._touches[0].current.clone().sub(this._touches[0].start)
    ), this._touchCount > 1 && (this._touches[1].start.set(
      t.touches[1].clientX,
      t.touches[1].clientY
    ), this._touches[1].current.set(
      t.touches[1].clientX,
      t.touches[1].clientY
    ), this._touches[1].delta.copy(
      this._touches[1].current.clone().sub(this._touches[1].start)
    )), this._touchCount === 2 && (this.handleRotateMoved(), this.handlePinchMoved()), this._touchCount === 1 && this.dispatch("TOUCH_MOVE", {
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
    }), this._touchCount === 2 && (this._handleRotateMoved && (this.dispatch("ROTATE_MOVE", {
      current: this._lastAngle,
      delta: this._angleDelta
    }), this._handleRotateMoved = !1), this._handlePinchMoved && (this.dispatch("PINCH_MOVE", {
      current: this._currentDistance,
      delta: this._deltaDistance
    }), this._handlePinchMoved = !1));
  }
  onTouchEnd(t) {
    this._touchCount = t.touches.length, this._touchCount === 0 && (this._touches[0].start.set(0, 0), this._touches[0].current.set(0, 0), this._touches[0].delta.set(0, 0)), this._touchCount === 1 && (this.handleRotateEnded(), this.handlePinchEnded(), this._touches[1].start.set(0, 0), this._touches[1].current.set(0, 0), this._touches[1].delta.set(0, 0)), this._handleRotateEnded && (this.dispatch("ROTATE_END", {
      current: this._lastAngle
    }), this._handleRotateEnded = !1), this._handlePinchEnded && (this.dispatch("PINCH_END", {
      current: this._currentDistance
    }), this._handlePinchEnded = !1);
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
    this._handleRotateStarted = !0, this._startAngle = this._touches[1].start.clone().sub(this._touches[0].current).angle();
  }
  handleRotateMoved() {
    this._handleRotateMoved = !0;
    const t = this._touches[1].current.clone().sub(this._touches[0].current).angle();
    this._angleDelta = t - this._startAngle, this._lastAngle = this._angleDelta * -1;
  }
  handleRotateEnded() {
    this._handleRotateEnded = !0;
  }
  // pinch handler
  handlePinchStart() {
    this._handlePinchStarted = !0, this._scaleDistanceStart = this._touches[1].start.distanceTo(
      this._touches[0].current
    );
  }
  handlePinchMoved() {
    this._handlePinchMoved = !0;
    const t = this._currentDistance, e = this._touches[1].current.distanceTo(
      this._touches[0].current
    );
    this._currentDistance = e / this._scaleDistanceStart, this._deltaDistance = this._currentDistance - t;
  }
  handlePinchEnded() {
    this._handlePinchEnded = !0;
  }
}
class O extends p {
  constructor(t, e, s) {
    super(), this._frameBuffer = null, this._handNodeInitialPosition = new o(), this._placed = !1, this._grabbedObject = null, this._arHitPosition = new o(), this._arHitQuaternion = new c(), this._arHitScale = new o(1, 1, 1), this._initialObjectPosition = null, this._initialRaycastHit = null, this._deltaRaycastHit = new o(), this._touchQuaterion = new c(), this._touchScale = 1, this._scaleThreshold = 0.1, this._startTouchQuaternion = new c(), this._startTouchScale = 1, this._renderer = e, this._scene = s, this._session = t, this._xrRaycaster = new I(t, e, s), this._origin = new D(this._session, this._renderer, [
      "plane"
    ]), this._crosshair = new x(), this._crosshair.visible = !1, this._xrCamera = this._renderer.xr.getCamera(), this._scene.XRRoot.XRHandNode.position.set(0, -0.05, -0.25), this._handNodeInitialPosition = this._scene.XRRoot.XRHandNode.position.clone(), this._touchscreenControls = new X(
      this._session
    ), this._touchscreenControls.Subscribe(
      "TOUCH_START",
      () => this.onTouchStart()
    ), this._touchscreenControls.Subscribe(
      "TOUCH_MOVE",
      () => this.onTouchMove()
    ), this._touchscreenControls.Subscribe(
      "TOUCH_END",
      (i) => this.onTouchEnd(i)
    ), this._touchscreenControls.Subscribe(
      "ROTATE_START",
      () => this.onRotateStart()
    ), this._touchscreenControls.Subscribe(
      "ROTATE_MOVE",
      (i) => this.onRotateMove(i)
    ), this._touchscreenControls.Subscribe(
      "PINCH_START",
      () => this.onPinchStart()
    ), this._touchscreenControls.Subscribe(
      "PINCH_MOVE",
      (i) => this.onPinchMove(i)
    );
  }
  async Init() {
    return this.prepareScene(), await this.initOrigin(), await this.initRaycaster(), Promise.resolve(this);
  }
  Dispose() {
    this.restoreScene(), this._origin.Dispose(), this._xrRaycaster.Dispose(), this._placed = !1;
  }
  Update(t) {
    this._frameBuffer = t, this._placed || (this.updateHandNode(), this._origin && this._origin.Update(t));
  }
  updateHandNode() {
    this._xrCamera.updateMatrixWorld(), this._scene.XRRoot.XRHandNode.position.copy(
      this._handNodeInitialPosition.clone().applyMatrix4(this._xrCamera.matrixWorld)
    ), this._scene.XRRoot.XRHandNode.quaternion.setFromRotationMatrix(
      this._xrCamera.matrixWorld
    );
  }
  // placement
  async initOrigin() {
    this._origin = await this._origin.Init(), this._origin.originSet.then(() => {
      this.placeObjects(this._origin.matrix);
    });
  }
  placeObjects(t) {
    this._scene.XRRoot.XRModelRoot.matrix.copy(t), [...this._scene.XRRoot.XRHandNode.children].forEach((e) => {
      this._scene.XRRoot.XRModelRoot.add(e);
    }), this._placed = !0;
  }
  // grabbing
  updateObject() {
    this._grabbedObject && (this._grabbedObject.position.copy(this._arHitPosition), this._grabbedObject.quaternion.copy(
      this._arHitQuaternion.clone().multiply(this._touchQuaterion)
    ), this._grabbedObject.scale.copy(
      new o(
        this._touchScale,
        this._touchScale,
        this._touchScale
      ).multiply(this._arHitScale)
    ));
  }
  onTouchStart() {
    const t = this._xrRaycaster.GetSceneIntersections();
    if (console.log("sceneHits", t), t.length === 0 || !t[0].object) return;
    const e = m(
      t[0].object,
      "isMovable"
    );
    e && (this._grabbedObject = e);
  }
  onTouchMove() {
    if (!this._frameBuffer || !this._grabbedObject) return;
    const t = this._xrRaycaster.GetARIntersections(
      this._frameBuffer
    );
    if (t.length === 0) {
      this._crosshair.visible = !1;
      return;
    }
    const e = t[0];
    this._crosshair.visible = !0, this._crosshair.matrix.copy(e.matrix), this._grabbedObject && ((!this._initialObjectPosition || !this._initialRaycastHit) && (this._initialObjectPosition = this._grabbedObject.position.clone(), this._initialRaycastHit = e.point.clone()), e.matrix.decompose(
      this._arHitPosition,
      this._arHitQuaternion,
      this._arHitScale
    ), this._deltaRaycastHit.copy(
      e.point.clone().sub(this._initialRaycastHit)
    ), this._arHitPosition.copy(
      this._initialObjectPosition.clone().add(this._deltaRaycastHit)
    ), console.log("arHitPosition", this._arHitPosition), this.updateObject());
  }
  onTouchEnd(t) {
    t.touchCount === 0 && (this._crosshair.visible = !1, this._initialObjectPosition = null, this._initialRaycastHit = null, this._grabbedObject = null);
  }
  onRotateStart() {
    this._startTouchQuaternion = this._touchQuaterion.clone();
  }
  onRotateMove(t) {
    this._touchQuaterion.setFromAxisAngle(
      new o(0, -1, 0),
      t.delta * 3
    ), this._touchQuaterion.multiply(this._startTouchQuaternion), this.updateObject();
  }
  onPinchStart() {
    this._startTouchScale = this._touchScale;
  }
  onPinchMove(t) {
    this._touchScale = this._startTouchScale * t.current, this.updateObject();
  }
  // prepare & cleanup scene
  prepareScene() {
    this._scene.XRRoot.XRModelRoot.matrixAutoUpdate = !1, this._scene.add(this._crosshair);
    const t = [];
    this._scene.Root.children.forEach((e) => {
      const s = e.clone();
      s.layers.enableAll(), s.traverse((i) => {
        i.layers.enableAll(), i instanceof S && i.scale.set(0.1, 0.1, 0.1);
      }), s.position.set(0, 0, 0), t.push(s);
    }), this._scene.XRRoot.XRHandNode.add(...t);
  }
  restoreScene() {
    this._scene.remove(this._crosshair), this._scene.XRRoot.XRHandNode.clear(), this._scene.XRRoot.XRModelRoot.clear(), this._scene.XRRoot.XRModelRoot.matrixAutoUpdate = !0;
  }
  // raycast
  async initRaycaster() {
    if (await this._xrRaycaster.Init(), !this._xrRaycaster)
      return console.error(
        "Raycaster not initialized successfully. Aborting WebXR..."
      ), this.Dispose(), Promise.reject();
  }
}
const n = class n {
  static async Launch(t, e, s) {
    if (this._renderer = t, this._scene = e, this._controller = s, this._cameraPosition = this._controller.object.position.clone(), this._cameraTarget = this._controller.target.clone(), !navigator.xr)
      return console.error("WebXR not supported"), Promise.reject();
    if (this._renderer.xr.enabled = !0, this._scene.InitXR(t), !n._overlay) {
      const a = new P();
      n._overlay = a;
    }
    n._options.domOverlay = { root: n._overlay.Element };
    const i = await navigator.xr.requestSession(
      "immersive-ar",
      this._options
    );
    return i.addEventListener("end", () => {
      this._onSessionEnded();
    }), t.xr.setReferenceSpaceType(this._referenceSpaceType), await t.xr.setSession(i), n._overlay.Element.style.display = "", this._session = i, n._overlay.CloseButton.addEventListener(
      "click",
      () => this.End()
    ), await this._onSessionStarted(), Promise.resolve();
  }
  static Update(t, e) {
    this._session && this._xrController && this._xrController.Update(e);
  }
  static End() {
    this._session && this._session.end();
  }
  static async _onSessionStarted() {
    if (this._session)
      return this._renderCallbackId = this._renderer.AddPreRenderCallback(
        (t, e) => {
          this.Update(t, e);
        }
      ), this._xrController = new O(
        this._session,
        this._renderer,
        this._scene
      ), await this._xrController.Init().catch(() => {
        this.End();
      }), Promise.resolve();
  }
  static _onSessionEnded() {
    if (!this._session) return;
    this._xrController && this._xrController.Dispose(), this._renderCallbackId && (this._renderer.RemovePreRenderCallback(this._renderCallbackId), this._renderCallbackId = null), this._renderer.xr.enabled = !1;
    const t = this._renderer.domElement.parentElement;
    if (t) {
      const { clientWidth: e, clientHeight: s } = t;
      this._renderer.OnResize(e, s), this._controller.object.OnResize(e, s);
    }
    this._controller.object.position.copy(this._cameraPosition), this._controller.target.copy(this._cameraTarget), this._cameraPosition.set(0, 0, 0), this._cameraTarget.set(0, 0, 0), this._scene.DisposeXR(), this._session.removeEventListener("end", this._onSessionEnded), n._overlay.Element.style.display = "none", this._session = null;
  }
};
n._renderCallbackId = null, n._session = null, n._referenceSpaceType = "local", n._overlay = null, n._options = {
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
}, n._xrController = null;
let f = n;
class M {
  static Launch(t, e) {
    const s = this.findSceneViewerSrc(t);
    this.launchSceneViewer(s, e);
  }
  static launchSceneViewer(t, e) {
    const s = document.createElement("a"), i = "#model-viewer-no-ar-fallback", a = self.location.toString(), _ = new URL(a), R = new URL(t, a), l = new URLSearchParams(R.search);
    _.hash = i, l.set("mode", "ar_only"), (e == null ? void 0 : e.arScale) === "fixed" && l.set("resizable", "false"), (e == null ? void 0 : e.arPlacement) === "vertical" && l.set("enable_vertical_placement", "true");
    const b = `intent://arvr.google.com/scene-viewer/1.2?${l.toString() + "&file=" + R.toString()}#Intent;scheme=https;package=com.google.android.googlequicksearchbox;action=android.intent.action.VIEW;S.browser_fallback_url=${encodeURIComponent(
      _.toString()
    )};end;`;
    s.setAttribute("href", b), s.click();
  }
  static findSceneViewerSrc(t) {
    let e = null;
    if (t.traverse((s) => {
      e || s.userData.uri && (e = s.userData.uri);
    }), !e)
      throw new Error("No model found in scene");
    return e;
  }
}
class V {
  constructor(t, e, s) {
    this._renderer = t, this._scene = e, this._controller = s;
  }
  async Launch(t) {
    const e = u.GetSystem();
    if (e === "iOS")
      return this.tryARQuickLook();
    if (e === "Android")
      return t != null && t.useWebXR ? (console.warn("DIVE: WebXR is experimental on Android."), this.tryWebXR()) : this.trySceneViewer();
    console.log(
      "DIVE: AR not supported. Not a mobile system. (System is " + e + ")"
    );
  }
  async tryARQuickLook(t) {
    return u.GetSupportsARQuickLook() ? (console.log("DIVE: Launching AR with ARQuickLook ..."), await v.Launch(this._scene, t), Promise.resolve()) : (console.log("ARQuickLook not supported"), Promise.reject());
  }
  async tryWebXR() {
    return await u.GetSupportsWebXR() ? (console.log("DIVE: Launching AR with WebXR ..."), await f.Launch(this._renderer, this._scene, this._controller), Promise.resolve()) : (console.log(
      "WebXR not supported. Reason: " + H[u.GetWebXRUnsupportedReason()]
    ), Promise.reject());
  }
  async trySceneViewer(t) {
    return console.log("DIVE: Launching AR with SceneViewer ..."), M.Launch(this._scene, t), Promise.resolve();
  }
}
export {
  V as DIVEAR
};
//# sourceMappingURL=AR-BzVanQ-t.js.map
