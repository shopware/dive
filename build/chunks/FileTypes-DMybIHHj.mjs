var F = Object.defineProperty;
var U = (o, i, e) => i in o ? F(o, i, { enumerable: !0, configurable: !0, writable: !0, value: e }) : o[i] = e;
var s = (o, i, e) => U(o, typeof i != "symbol" ? i + "" : i, e);
import { O as W, a as x } from "./OrbitController-D-WNei2f.mjs";
import { OrthographicCamera as H, Vector4 as Y, AxesHelper as J, Color as l, Matrix4 as N, Object3D as g, AmbientLight as $, PointLight as K, SphereGeometry as L, MeshBasicMaterial as Q, FrontSide as S, Mesh as b, HemisphereLight as q, DirectionalLight as X, Vector3 as u, Box3 as k, MeshStandardMaterial as v, Raycaster as V, CylinderGeometry as Z, BufferGeometry as B, BufferAttribute as I, BoxGeometry as w, ConeGeometry as j, LineDashedMaterial as ee, Line as te, PlaneGeometry as ie, GridHelper as se, Scene as re, WebGLRenderer as C, PCFSoftShadowMap as ne, PCFShadowMap as oe, BasicShadowMap as ae, MathUtils as f } from "three";
import y from "three-spritetext";
import { C as p, P as _, U as he, H as le, a as de, D as ce } from "./PerspectiveCamera-DUiWJJIj.mjs";
class ue extends H {
  constructor(e, t, r) {
    super(-1, 1, 1, -1, 0.1, 100);
    s(this, "axesHelper");
    s(this, "_renderer");
    s(this, "_scene");
    s(this, "_camera");
    s(this, "_restoreViewport", new Y());
    this.layers.mask = p, this.axesHelper = new J(0.5), this.axesHelper.layers.mask = p, this.axesHelper.material.depthTest = !1, this.axesHelper.position.set(0, 0, -1), this.axesHelper.setColors(
      new l(Le),
      new l(Se),
      new l(ke)
    );
    const n = new y("X", 0.2, A), a = new y("Y", 0.2, G), h = new y("Z", 0.2, z);
    n.layers.mask = p, a.layers.mask = p, h.layers.mask = p, n.position.set(0.7, 0, 0), a.position.set(0, 0.7, 0), h.position.set(0, 0, 0.7), this.axesHelper.add(n), this.axesHelper.add(a), this.axesHelper.add(h), this.add(this.axesHelper), this._renderer = e, this._scene = t, this._camera = r, this._scene.add(this);
  }
  tick() {
    const e = this._scene.background;
    this._scene.background = null, this._renderer.webglrenderer.getViewport(this._restoreViewport), this._renderer.webglrenderer.setViewport(0, 0, 150, 150), this._renderer.webglrenderer.autoClear = !1, this.setFromCameraMatrix(this._camera.matrix), this._renderer.webglrenderer.render(this._scene, this), this._renderer.webglrenderer.setViewport(this._restoreViewport), this._renderer.webglrenderer.autoClear = !0, this._scene.background = e;
  }
  dispose() {
    this._scene.remove(this);
  }
  setFromCameraMatrix(e) {
    this.axesHelper.rotation.setFromRotationMatrix(
      new N().extractRotation(e).invert()
    );
  }
}
class _e extends g {
  constructor() {
    super();
    s(this, "isDIVELight", !0);
    s(this, "isDIVEAmbientLight", !0);
    s(this, "_light");
    this.name = "DIVEAmbientLight", this._light = new $(16777215, 1), this._light.layers.mask = _, this.add(this._light);
  }
  setColor(e) {
    this._light.color = e;
  }
  setIntensity(e) {
    this._light.intensity = e;
  }
  setEnabled(e) {
    this._light.visible = e;
  }
}
class me extends g {
  constructor() {
    super();
    s(this, "isDIVELight", !0);
    s(this, "isDIVEPointLight", !0);
    s(this, "isMovable", !0);
    s(this, "isSelectable", !0);
    s(this, "gizmo", null);
    s(this, "light");
    s(this, "mesh");
    this.name = "DIVEPointLight", this.light = new K(16777215, 1), this.light.layers.mask = _, this.light.castShadow = !0, this.light.shadow.mapSize.width = 512, this.light.shadow.mapSize.height = 512, this.add(this.light);
    const e = 0.1, t = new L(
      e,
      e * 320,
      e * 320
    ), r = new Q({
      color: this.light.color,
      transparent: !0,
      opacity: 0.8,
      side: S
    });
    this.mesh = new b(t, r), this.mesh.layers.mask = he, this.add(this.mesh);
  }
  setColor(e) {
    this.light.color = e, this.mesh.material.color = e;
  }
  setIntensity(e) {
    this.light.intensity = e, this.mesh.material.opacity = e > 0.8 ? 0.8 : e * 0.8;
  }
  setEnabled(e) {
    this.light.visible = e;
  }
  onMove() {
    import("../plugins/state/index.mjs").then(({ State: e }) => {
      var t;
      (t = e.get(this.userData.id)) == null || t.performAction("UPDATE_OBJECT", {
        id: this.userData.id,
        position: this.position
      });
    });
  }
  onSelect() {
    import("../plugins/state/index.mjs").then(({ State: e }) => {
      var t;
      (t = e.get(this.userData.id)) == null || t.performAction("SELECT_OBJECT", {
        id: this.userData.id
      });
    });
  }
  onDeselect() {
    import("../plugins/state/index.mjs").then(({ State: e }) => {
      var t;
      (t = e.get(this.userData.id)) == null || t.performAction("DESELECT_OBJECT", {
        id: this.userData.id
      });
    });
  }
}
class M extends g {
  constructor() {
    super();
    s(this, "isDIVELight", !0);
    s(this, "isDIVESceneLight", !0);
    s(this, "_hemiLight");
    s(this, "_dirLight");
    this.name = "DIVESceneLight", this._hemiLight = new q(16777215, 16777215, 2), this._hemiLight.layers.mask = _, this._hemiLight.position.set(0, 50, 0), this.add(this._hemiLight), this._dirLight = new X(16777215, 3), this._dirLight.layers.mask = _, this._dirLight.position.set(1, 1.75, 1), this._dirLight.position.multiplyScalar(30), this._dirLight.castShadow = !0, this._dirLight.shadow.mapSize.width = 2048, this._dirLight.shadow.mapSize.height = 2048;
    const e = 5;
    this._dirLight.shadow.camera.left = -5, this._dirLight.shadow.camera.right = e, this._dirLight.shadow.camera.top = e, this._dirLight.shadow.camera.bottom = -5, this._dirLight.shadow.camera.far = 3500, this.add(this._dirLight);
  }
  setColor(e) {
    this._hemiLight.color = e, this._dirLight.color = e;
  }
  setIntensity(e) {
    this._hemiLight.intensity = e * 2, this._dirLight.intensity = e * 3;
  }
  setEnabled(e) {
    this._hemiLight.visible = e, this._dirLight.visible = e;
  }
}
const E = (o) => o.parent ? E(o.parent) : o;
class D extends g {
  constructor() {
    super();
    s(this, "isSelectable", !0);
    s(this, "isMovable", !0);
    s(this, "isDIVENode", !0);
    s(this, "gizmo", null);
    s(this, "_positionWorldBuffer");
    s(this, "_boundingBox");
    this.layers.mask = _, this._positionWorldBuffer = new u(), this._boundingBox = new k();
  }
  setPosition(e) {
    if (!this.parent) {
      this.position.set(e.x, e.y, e.z);
      return;
    }
    const t = new u(e.x, e.y, e.z);
    this.position.copy(this.parent.worldToLocal(t)), "isDIVEGroup" in this.parent && this.parent.updateLineTo(this);
  }
  setRotation(e) {
    this.rotation.set(e.x, e.y, e.z);
  }
  setScale(e) {
    this.scale.set(e.x, e.y, e.z);
  }
  setVisibility(e) {
    this.visible = e;
  }
  setToWorldOrigin() {
    this.position.set(0, 0, 0), import("../plugins/state/index.mjs").then(({ State: e }) => {
      var t;
      (t = e.get(this.userData.id)) == null || t.performAction("UPDATE_OBJECT", {
        id: this.userData.id,
        position: this.getWorldPosition(this._positionWorldBuffer),
        rotation: this.rotation,
        scale: this.scale
      });
    });
  }
  /**
   * Can be called when the object is moved from a foreign object (gizmo, parent, etc.) to update the object's position.
   */
  onMove() {
    import("../plugins/state/index.mjs").then(({ State: e }) => {
      var t;
      (t = e.get(this.userData.id)) == null || t.performAction("UPDATE_OBJECT", {
        id: this.userData.id,
        position: this.getWorldPosition(this._positionWorldBuffer),
        rotation: this.rotation,
        scale: this.scale
      });
    });
  }
  onSelect() {
    import("../plugins/state/index.mjs").then(({ State: e }) => {
      var t;
      (t = e.get(this.userData.id)) == null || t.performAction("SELECT_OBJECT", {
        id: this.userData.id
      });
    });
  }
  onDeselect() {
    import("../plugins/state/index.mjs").then(({ State: e }) => {
      var t;
      (t = e.get(this.userData.id)) == null || t.performAction("DESELECT_OBJECT", {
        id: this.userData.id
      });
    });
  }
}
class T extends D {
  constructor() {
    super(...arguments);
    s(this, "isDIVEModel", !0);
    s(this, "_mesh", null);
    s(this, "_material", null);
    s(this, "_assetLoader", null);
  }
  async _getAssetLoader() {
    return this._assetLoader || (this._assetLoader = new (await import("../plugins/assetloader/index.mjs")).AssetLoader()), this._assetLoader;
  }
  async setFromURL(e) {
    const r = await (await this._getAssetLoader()).load(e);
    this.setFromGLTF(r), import("../plugins/state/index.mjs").then(({ State: n }) => {
      var a;
      (a = n.get(this.userData.id)) == null || a.performAction("MODEL_LOADED", {
        id: this.userData.id
      });
    });
  }
  setFromGLTF(e) {
    this.clear(), this._boundingBox.makeEmpty(), e.traverse((t) => {
      t.castShadow = !0, t.receiveShadow = !0, t.layers.mask = this.layers.mask, this._boundingBox.expandByObject(t), !this._mesh && "isMesh" in t && (this._mesh = t, this._material ? this._mesh.material = this._material : this._material = t.material);
    }), this.add(e);
  }
  setMaterial(e) {
    this._material || (this._material = new v()), e.vertexColors !== void 0 && (this._material.vertexColors = e.vertexColors), e.color !== void 0 && this._material.color.set(e.color), e.map !== void 0 && (this._material.map = e.map), e.normalMap !== void 0 && (this._material.normalMap = e.normalMap), e.roughness !== void 0 && (this._material.roughness = e.roughness), e.roughnessMap !== void 0 && (this._material.roughnessMap = e.roughnessMap, this._material.roughnessMap && (this._material.roughness = 1)), e.metalness !== void 0 && (this._material.metalness = e.metalness), e.metalnessMap !== void 0 && (this._material.metalnessMap = e.metalnessMap, this._material.metalnessMap && (this._material.metalness = 1)), this._mesh && (this._mesh.material = this._material);
  }
  placeOnFloor() {
    var n, a, h, d;
    const e = this.getWorldPosition(this._positionWorldBuffer), t = e.clone();
    (a = (n = this._mesh) == null ? void 0 : n.geometry) == null || a.computeBoundingBox();
    const r = (d = (h = this._mesh) == null ? void 0 : h.geometry) == null ? void 0 : d.boundingBox;
    !r || !this._mesh || (e.y = e.y - this._mesh.localToWorld(r.min.clone()).y, e.y !== t.y && import("../plugins/state/index.mjs").then(({ State: m }) => {
      var c;
      (c = m.get(this.userData.id)) == null || c.performAction("UPDATE_OBJECT", {
        id: this.userData.id,
        position: e,
        rotation: this.rotation,
        scale: this.scale
      });
    }));
  }
  dropIt() {
    if (!this.parent) {
      console.warn(
        "DIVEModel: dropIt() called on a model that is not in the scene.",
        this
      );
      return;
    }
    const e = this._boundingBox.min.y * this.scale.y, t = this.localToWorld(
      this._boundingBox.getCenter(new u()).multiply(this.scale)
    );
    t.y = e + this.position.y;
    const r = new V(t, new u(0, -1, 0));
    r.layers.mask = _;
    const n = r.intersectObjects(
      E(this).root.children,
      !0
    );
    if (n.length > 0) {
      const a = n[0].object;
      a.geometry.computeBoundingBox();
      const h = a.geometry.boundingBox, d = a.localToWorld(h.max.clone()), m = this.position.clone(), c = this.position.clone().setY(d.y).sub(new u(0, e, 0));
      if (this.position.copy(c), this.position.y === m.y) return;
      this.onMove();
    }
  }
}
class ge extends D {
  constructor() {
    super();
    s(this, "isDIVEPrimitive", !0);
    s(this, "_mesh");
    this._mesh = new b(), this._mesh.layers.mask = _, this._mesh.castShadow = !0, this._mesh.receiveShadow = !0, this._mesh.material = new v(), this.add(this._mesh);
  }
  setGeometry(e) {
    const t = this.assembleGeometry(e);
    t && (this._mesh.geometry = t, this._boundingBox.setFromObject(this._mesh));
  }
  setMaterial(e) {
    const t = this._mesh.material;
    e.vertexColors !== void 0 && (t.vertexColors = e.vertexColors), e.color !== void 0 && (t.color = new l(e.color)), e.map !== void 0 && (t.map = e.map), e.normalMap !== void 0 && (t.normalMap = e.normalMap), e.roughness !== void 0 && (t.roughness = e.roughness), e.roughnessMap !== void 0 && (t.roughnessMap = e.roughnessMap, t.roughnessMap && (t.roughness = 1)), e.metalness !== void 0 && (t.metalness = e.metalness), e.metalnessMap !== void 0 && (t.metalnessMap = e.metalnessMap, t.metalnessMap && (t.metalness = 0)), this._mesh && (this._mesh.material = t);
  }
  placeOnFloor() {
    var n, a, h, d;
    const e = this.getWorldPosition(this._positionWorldBuffer), t = e.clone();
    (a = (n = this._mesh) == null ? void 0 : n.geometry) == null || a.computeBoundingBox();
    const r = (d = (h = this._mesh) == null ? void 0 : h.geometry) == null ? void 0 : d.boundingBox;
    !r || !this._mesh || (e.y = e.y - this._mesh.localToWorld(r.min.clone()).y, e.y !== t.y && import("../plugins/state/index.mjs").then(({ State: m }) => {
      var c;
      (c = m.get(this.userData.id)) == null || c.performAction("UPDATE_OBJECT", {
        id: this.userData.id,
        position: e,
        rotation: this.rotation,
        scale: this.scale
      });
    }));
  }
  dropIt() {
    if (!this.parent) {
      console.warn(
        "DIVEPrimitive: dropIt() called on a model that is not in the scene.",
        this
      );
      return;
    }
    const e = this._boundingBox.min.y * this.scale.y, t = this.localToWorld(
      this._boundingBox.getCenter(new u()).multiply(this.scale)
    );
    t.y = e + this.position.y;
    const r = new V(t, new u(0, -1, 0));
    r.layers.mask = _;
    const n = r.intersectObjects(
      E(this).root.children,
      !0
    );
    if (n.length > 0) {
      const a = n[0].object;
      a.geometry.computeBoundingBox();
      const h = a.geometry.boundingBox, d = a.localToWorld(h.max.clone()), m = this.position.clone(), c = this.position.clone().setY(d.y).sub(new u(0, e, 0));
      if (this.position.copy(c), this.position.y === m.y) return;
      this.onMove();
    }
  }
  assembleGeometry(e) {
    switch (this._mesh.material.flatShading = !1, e.name.toLowerCase()) {
      case "cylinder":
        return this.createCylinderGeometry(e);
      case "sphere":
        return this.createSphereGeometry(e);
      case "pyramid":
        return this._mesh.material.flatShading = !0, this.createPyramidGeometry(e);
      case "cube":
      case "box":
        return this.createBoxGeometry(e);
      case "cone":
        return this.createConeGeometry(e);
      case "wall":
        return this.createWallGeometry(e);
      case "plane":
        return this.createPlaneGeometry(e);
      default:
        return console.warn(
          "DIVEPrimitive.assembleGeometry: Invalid geometry type:",
          e.name.toLowerCase()
        ), null;
    }
  }
  createCylinderGeometry(e) {
    const t = new Z(
      e.width / 2,
      e.width / 2,
      e.height,
      64
    );
    return t.translate(0, e.height / 2, 0), t;
  }
  createSphereGeometry(e) {
    return new L(e.width / 2, 256, 256);
  }
  createPyramidGeometry(e) {
    const t = new Float32Array([
      -e.width / 2,
      0,
      -e.depth / 2,
      // 0
      e.width / 2,
      0,
      -e.depth / 2,
      // 1
      e.width / 2,
      0,
      e.depth / 2,
      // 2
      -e.width / 2,
      0,
      e.depth / 2,
      // 3
      0,
      e.height,
      0
    ]), r = new Uint16Array([
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
    ]), n = new B();
    return n.setAttribute(
      "position",
      new I(t, 3)
    ), n.setIndex(new I(r, 1)), n.computeVertexNormals(), n.computeBoundingBox(), n.computeBoundingSphere(), n;
  }
  createBoxGeometry(e) {
    const t = new w(
      e.width,
      e.height,
      e.depth
    );
    return t.translate(0, e.height / 2, 0), t;
  }
  createConeGeometry(e) {
    const t = new j(e.width / 2, e.height, 256);
    return t.translate(0, e.height / 2, 0), t;
  }
  createWallGeometry(e) {
    const t = new w(
      e.width,
      e.height,
      e.depth || 0.05,
      16
    );
    return t.translate(0, e.height / 2, 0), t;
  }
  createPlaneGeometry(e) {
    const t = new w(
      e.width,
      e.height,
      e.depth
    );
    return t.translate(0, e.height / 2, 0), t;
  }
}
class pe extends D {
  // lines to children
  constructor() {
    super();
    s(this, "isDIVEGroup", !0);
    s(this, "_members");
    s(this, "_lines");
    this.name = "DIVEGroup", this._members = [], this._lines = [];
  }
  // children objects
  get members() {
    return this._members;
  }
  setPosition(e) {
    super.setPosition(e), this._members.forEach((t) => {
      "isDIVENode" in t && t.onMove();
    });
  }
  setLinesVisibility(e, t) {
    if (!t) {
      this._lines.forEach((n) => {
        n.visible = e;
      });
      return;
    }
    const r = this._members.indexOf(t);
    r !== -1 && (this._lines[r].visible = e);
  }
  attach(e) {
    if (this._members.includes(e))
      return this;
    const t = this.createLine();
    return this.add(t), this._lines.push(t), super.attach(e), this._members.push(e), this._updateLineTo(t, e), this.setLinesVisibility(!0, e), this;
  }
  /**
   * Removes an object from the group.
   * @param object - The object to remove.
   * @returns The group instance.
   */
  remove(e) {
    const t = this._members.indexOf(e);
    if (t === -1)
      return this;
    const r = this._lines[t];
    return super.remove(r), this._lines.splice(t, 1), super.remove(e), this._members.splice(t, 1), this;
  }
  updateLineTo(e) {
    const t = this._members.indexOf(e);
    t !== -1 && this._updateLineTo(this._lines[t], e);
  }
  /**
   * Creates a line for visualization.
   */
  createLine() {
    const e = new B(), t = new ee({
      color: 6710886,
      dashSize: 0.05,
      gapSize: 0.025
    }), r = new te(e, t);
    return r.visible = !1, r;
  }
  /**
   * Updates a line to the object.
   */
  _updateLineTo(e, t) {
    const r = [
      new u(0, 0, 0),
      t.position.clone()
    ];
    e.geometry.setFromPoints(r), e.computeLineDistances();
  }
  // public setBoundingBoxVisibility(visible: boolean): void {
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
  //     DIVECommunication.get(this.userData.id)?.performAction('UPDATE_OBJECT', { id: this.userData.id, position: this.position });
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
}
class we extends b {
  constructor() {
    const e = new ie(1, 1);
    e.scale(1e3, 1e3, 1), e.rotateX(-Math.PI / 2);
    const t = new v({
      color: new l(16777215),
      side: S
    });
    super(e, t);
    s(this, "isDIVEFloor", !0);
    this.name = "Floor", this.layers.mask = _, this.receiveShadow = !0;
  }
  setVisibility(e) {
    this.visible = e;
  }
  setColor(e) {
    this.material.color = new l(e);
  }
}
class fe extends g {
  constructor() {
    super();
    s(this, "isDIVERoot", !0);
    s(this, "_floor");
    this.name = "Root", this._floor = new we(), this.add(this._floor);
  }
  get floor() {
    return this._floor;
  }
  computeSceneBB() {
    const e = new k();
    return this.children.forEach((t) => {
      "isDIVEFloor" in t || t.traverse((r) => {
        "isObject3D" in r && e.expandByObject(r);
      });
    }), e;
  }
  getSceneObject(e) {
    let t;
    return this.traverse((r) => {
      t || r.userData.id === e.id && (t = r);
    }), t;
  }
  addSceneObject(e) {
    let t = this.getSceneObject(e);
    if (t)
      return console.warn(
        `DIVERoot.addSceneObject: Scene object with id ${e.id} already exists`
      ), t;
    switch (e.entityType) {
      case "pov":
        break;
      case "light": {
        switch (e.type) {
          case "scene": {
            t = new M();
            break;
          }
          case "ambient": {
            t = new _e();
            break;
          }
          case "point": {
            t = new me();
            break;
          }
          default:
            throw new Error(
              `DIVERoot.addSceneObject: Unknown light type: ${e.type}`
            );
        }
        t.name = e.name, t.userData.id = e.id, this.add(t), this._updateLight(t, e);
        break;
      }
      case "model": {
        t = new T(), t.name = e.name, t.userData.id = e.id, t.userData.uri = e.uri, this.add(t), this._updateModel(t, e);
        break;
      }
      case "primitive": {
        t = new ge(), t.name = e.name, t.userData.id = e.id, this.add(t), this._updatePrimitive(t, e);
        break;
      }
      case "group": {
        t = new pe(), t.name = e.name, t.userData.id = e.id, this.add(t), this._updateGroup(t, e);
        break;
      }
      default:
        throw new Error(
          `DIVERoot.addSceneObject: Unknown entity type: ${e.entityType}`
        );
    }
    return t;
  }
  updateSceneObject(e) {
    const t = this.getSceneObject(e);
    if (!t) {
      console.warn(
        `DIVERoot.updateSceneObject: Scene object with id ${e.id} does not exist`
      );
      return;
    }
    switch (e.entityType) {
      case "pov":
        break;
      case "light": {
        this._updateLight(t, e);
        break;
      }
      case "model": {
        this._updateModel(t, e);
        break;
      }
      case "primitive": {
        this._updatePrimitive(t, e);
        break;
      }
      case "group": {
        this._updateGroup(t, e);
        break;
      }
      default:
        throw new Error(
          `DIVERoot.updateSceneObject: Unknown entity type: ${e.entityType}`
        );
    }
  }
  deleteSceneObject(e) {
    const t = this.getSceneObject(e);
    if (!t) {
      console.warn(
        `DIVERoot.deleteSceneObject: Object with id ${e.id} not found`
      );
      return;
    }
    switch (e.entityType) {
      case "pov":
        break;
      case "light": {
        this._deleteLight(t);
        break;
      }
      case "model": {
        this._deleteModel(t);
        break;
      }
      case "primitive": {
        this._deletePrimitive(t);
        break;
      }
      case "group": {
        this._deleteGroup(t);
        break;
      }
      default:
        throw new Error(
          `DIVERoot.deleteSceneObject: Unknown entity type: ${e.entityType}`
        );
    }
  }
  _updateLight(e, t) {
    t.name !== void 0 && t.name !== null && (e.name = t.name), t.position !== void 0 && t.position !== null && e.position.set(
      t.position.x,
      t.position.y,
      t.position.z
    ), t.intensity !== void 0 && t.intensity !== null && e.setIntensity(t.intensity), t.enabled !== void 0 && t.enabled !== null && e.setEnabled(t.enabled), t.color !== void 0 && t.color !== null && e.setColor(new l(t.color)), t.visible !== void 0 && t.visible !== null && (e.visible = t.visible), t.parentId !== void 0 && this._setParent({ ...t, parentId: t.parentId });
  }
  _updateModel(e, t) {
    t.uri !== void 0 && e.setFromURL(t.uri), t.name !== void 0 && (e.name = t.name), t.position !== void 0 && e.setPosition(t.position), t.rotation !== void 0 && e.setRotation(t.rotation), t.scale !== void 0 && e.setScale(t.scale), t.visible !== void 0 && e.setVisibility(t.visible), t.material !== void 0 && e.setMaterial(t.material), t.parentId !== void 0 && this._setParent({ ...t, parentId: t.parentId });
  }
  _updatePrimitive(e, t) {
    t.name !== void 0 && (e.name = t.name), t.geometry !== void 0 && e.setGeometry(t.geometry), t.position !== void 0 && e.setPosition(t.position), t.rotation !== void 0 && e.setRotation(t.rotation), t.scale !== void 0 && e.setScale(t.scale), t.visible !== void 0 && e.setVisibility(t.visible), t.material !== void 0 && e.setMaterial(t.material), t.parentId !== void 0 && this._setParent({ ...t, parentId: t.parentId });
  }
  _updateGroup(e, t) {
    t.name !== void 0 && (e.name = t.name), t.position !== void 0 && e.setPosition(t.position), t.rotation !== void 0 && e.setRotation(t.rotation), t.scale !== void 0 && e.setScale(t.scale), t.visible !== void 0 && e.setVisibility(t.visible), t.bbVisible !== void 0 && e.setLinesVisibility(t.bbVisible), t.parentId !== void 0 && this._setParent({ ...t, parentId: t.parentId });
  }
  _deleteLight(e) {
    this._detachTransformControls(e), e.parent.remove(e);
  }
  _deleteModel(e) {
    this._detachTransformControls(e), e.parent.remove(e);
  }
  _deletePrimitive(e) {
    this._detachTransformControls(e), e.parent.remove(e);
  }
  _deleteGroup(e) {
    this._detachTransformControls(e);
    for (let t = e.members.length - 1; t >= 0; t--)
      this.attach(e.members[t]);
    e.parent.remove(e);
  }
  _setParent(e) {
    const t = this.getSceneObject(e);
    if (e.parentId !== null) {
      const r = this.getSceneObject({
        id: e.parentId,
        entityType: e.entityType
      });
      if (!r) return;
      r.attach(t);
    } else
      this.attach(t);
  }
  _detachTransformControls(e) {
    this._findScene(e).children.find((t) => {
      "isTransformControls" in t && t.detach();
    });
  }
  _findScene(e) {
    return e.parent !== null ? this._findScene(e.parent) : e;
  }
}
const ye = "#888888", be = "#dddddd";
class ve extends g {
  constructor() {
    super(), this.name = "Grid";
    const i = new se(
      100,
      100,
      ye,
      be
    );
    i.material.depthTest = !1, i.layers.mask = le, this.add(i);
  }
  setVisibility(i) {
    this.visible = i;
  }
}
class Ee extends re {
  constructor() {
    super();
    s(this, "_root");
    s(this, "_grid");
    this.background = new l(16777215), this._root = new fe(), this.add(this._root), this._grid = new ve(), this.add(this._grid);
  }
  get root() {
    return this._root;
  }
  get grid() {
    return this._grid;
  }
  setBackground(e) {
    this.background = new l(e);
  }
  computeSceneBB() {
    return this.root.computeSceneBB();
  }
}
const P = {
  canvas: void 0,
  antialias: !0,
  alpha: !0,
  powerPreference: "high-performance",
  precision: "highp",
  stencil: !1,
  depth: !0,
  logarithmicDepthBuffer: !1,
  shadows: !0,
  shadowQuality: "high"
};
class De {
  constructor(i, e, t) {
    s(this, "_webglrenderer");
    s(this, "_settings");
    this._scene = i, this._camera = e, this._settings = {
      ...P,
      ...t ?? {}
    }, this._webglrenderer = new C(this._settings), this._webglrenderer.shadowMap.enabled = this._settings.shadows, this._webglrenderer.shadowMap.type = this._settings.shadowQuality === "high" ? ne : this._settings.shadowQuality === "medium" ? oe : ae;
  }
  get webglrenderer() {
    return this._webglrenderer;
  }
  setCanvas(i) {
    this._webglrenderer.dispose(), this._settings.canvas = i, this._webglrenderer = new C(this._settings);
  }
  render() {
    this._webglrenderer.render(this._scene, this._camera);
  }
  onResize(i, e) {
    this._webglrenderer.setSize(i, e, !1);
  }
  dispose() {
    this._webglrenderer.dispose();
  }
}
class xe {
  constructor() {
    s(this, "_renderer", null);
    s(this, "_lastTime", 0);
    s(this, "_isRunning", !1);
    s(this, "_tickers", []);
  }
  start() {
    this._isRunning || (this._isRunning = !0, this._lastTime = performance.now(), requestAnimationFrame(this._tick.bind(this)));
  }
  stop() {
    this._isRunning = !1;
  }
  setRenderer(i) {
    this._renderer = i;
  }
  addTicker(i) {
    this._tickers.find((e) => e.uuid === i.uuid) || this._tickers.push(i);
  }
  hasTicker(i) {
    return this._tickers.find((e) => e.uuid === i.uuid) !== void 0;
  }
  removeTicker(i) {
    const e = this._tickers.findIndex((t) => t.uuid === i.uuid);
    e !== -1 && this._tickers.splice(e, 1);
  }
  dispose() {
    this.stop(), this._tickers.forEach((i) => {
      var e;
      return (e = i.dispose) == null ? void 0 : e.call(i);
    }), this._tickers = [], this._isRunning = !1, this._lastTime = 0;
  }
  _tick(i) {
    var t;
    if (!this._isRunning) return;
    const e = (i - this._lastTime) / 1e3;
    this._lastTime = i, this._tickers.forEach((r) => r.tick(e)), (t = this._renderer) == null || t.render(), requestAnimationFrame(this._tick.bind(this));
  }
}
class Ie {
  constructor(i, e) {
    s(this, "_resizeObserver");
    s(this, "_width", 0);
    s(this, "_height", 0);
    this._resizeObserver = new ResizeObserver((t) => {
      for (const r of t) {
        const { width: n, height: a } = r.contentRect;
        n === this._width && a === this._height || (i.onResize(n, a), e.onResize(n, a), this._width = n, this._height = a);
      }
    }), this._observeCanvas(i.webglrenderer.domElement);
  }
  setCanvas(i) {
    this._resizeObserver.disconnect(), this._observeCanvas(i);
  }
  dispose() {
    this._resizeObserver.disconnect();
  }
  _observeCanvas(i) {
    if (i.parentElement)
      this._resizeObserver.observe(i.parentElement);
    else {
      const e = setInterval(() => {
        i.parentElement && (this._resizeObserver.observe(i.parentElement), clearInterval(e));
      }, 16);
    }
  }
}
const R = {
  autoStart: !0,
  displayAxes: !1,
  ...de,
  ...P
};
class Ce {
  constructor(i) {
    s(this, "_renderer");
    s(this, "_scene");
    s(this, "_camera");
    s(this, "_resizeManager");
    s(this, "_clock");
    s(this, "_settings");
    this._settings = {
      ...R,
      ...i ?? {}
    }, this._scene = new Ee(), this._camera = new ce(this._settings), this._renderer = new De(
      this._scene,
      this._camera,
      this._settings
    ), this._resizeManager = new Ie(
      this._renderer,
      this._camera
    ), this._clock = new xe(), this._clock.setRenderer(this._renderer), this._settings.autoStart && this.start();
  }
  get scene() {
    return this._scene;
  }
  get camera() {
    return this._camera;
  }
  get renderer() {
    return this._renderer;
  }
  setCanvas(i) {
    this._renderer.setCanvas(i), this._resizeManager.setCanvas(i);
  }
  get clock() {
    return this._clock;
  }
  start() {
    this._clock.start();
  }
  stop() {
    this._clock.stop();
  }
  dispose() {
    this._clock.dispose(), this._resizeManager.dispose(), this._renderer.dispose();
  }
}
const A = "#c20017", G = "#00ab26", z = "#0081d4", Le = A, Se = G, ke = z;
window.DIVE = {
  instances: [],
  get instance() {
    return window.DIVE.instances[0];
  }
};
const Ve = {
  ...R,
  ...W
};
class O {
  constructor(i) {
    // descriptive members
    s(this, "_instanceId", f.generateUUID());
    s(this, "_settings");
    s(this, "_engine");
    s(this, "orbitController");
    s(this, "axisCamera");
    this._settings = {
      ...Ve,
      ...i ?? {}
    }, this._engine = new Ce(i), this.orbitController = new x(
      this._engine.camera,
      this._engine.renderer.webglrenderer.domElement,
      this._settings
    ), this._engine.clock.addTicker(this.orbitController), this._settings.displayAxes ? (this.axisCamera = new ue(
      this._engine.renderer,
      this._engine.scene,
      this._engine.camera
    ), this._engine.clock.addTicker(this.axisCamera)) : this.axisCamera = null, import("./package-ZPbjnXun.mjs").then((e) => {
      console.log(
        `DIVE ${e.default.version} initialized successfully!`
      ), console.log(`
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
    }), window.DIVE.instances.push(this);
  }
  // static members
  static async QuickView(i, e) {
    const t = new O(e);
    t.engine.scene.background = new l(16777215), t.engine.scene.grid.setVisibility(!1), t.engine.scene.root.floor.setVisibility(!0), t.engine.camera.position.set(0, 2, 2), t.orbitController.target.set(0, 0.5, 0);
    const r = new M();
    r.name = "SceneLight", r.userData.id = f.generateUUID(), r.setEnabled(!0), r.visible = !0, r.setIntensity((e == null ? void 0 : e.lightIntensity) ?? 1), r.setColor(new l(16777215)), t.engine.scene.root.add(r);
    const n = new T();
    n.name = "object", n.userData.id = f.generateUUID(), n.userData.uri = i, n.visible = !0, t.engine.scene.root.add(n), await n.setFromURL(i);
    const a = t.engine.scene.computeSceneBB(), h = t.orbitController.computeEncompassingView(a);
    return t.engine.camera.position.copy(h.position), t.orbitController.target.copy(h.target), t;
  }
  get engine() {
    return this._engine;
  }
  get canvas() {
    return this._engine.renderer.webglrenderer.domElement;
  }
  setCanvas(i) {
    this._engine.setCanvas(i), this._engine.clock.removeTicker(this.orbitController), this.orbitController.dispose(), this.orbitController = new x(
      this._engine.camera,
      i,
      this._settings
    ), this._engine.clock.addTicker(this.orbitController);
  }
  async dispose() {
    return new Promise((i) => {
      this._engine.clock.removeTicker(this.orbitController), this.orbitController.dispose(), this.axisCamera && (this._engine.clock.removeTicker(this.axisCamera), this.axisCamera.dispose()), window.DIVE.instances = window.DIVE.instances.filter(
        (e) => e._instanceId !== this._instanceId
      ), i();
    });
  }
}
const Be = {
  glb: {
    key: "glb",
    extension: "glb"
  },
  gltf: {
    key: "gltf",
    extension: "gltf"
  },
  usdz: {
    key: "usdz",
    extension: "usdz"
  }
}, Ge = Object.values(Be).map(
  (o) => o.extension
);
export {
  Le as A,
  ue as D,
  R as E,
  Be as F,
  ye as G,
  Ge as S,
  Se as a,
  ke as b,
  Ve as c,
  O as d,
  A as e,
  G as f,
  z as g,
  be as h,
  we as i,
  ve as j,
  pe as k,
  _e as l,
  me as m,
  M as n,
  T as o,
  D as p,
  ge as q,
  fe as r,
  xe as s,
  P as t,
  De as u,
  Ie as v,
  Ee as w,
  Ce as x,
  E as y
};
