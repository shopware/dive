var z = Object.defineProperty;
var F = (n, i, e) => i in n ? z(n, i, { enumerable: !0, configurable: !0, writable: !0, value: e }) : n[i] = e;
var r = (n, i, e) => F(n, typeof i != "symbol" ? i + "" : i, e);
import { O as U, a as I } from "./chunks/OrbitController-CXu1ko6E.mjs";
import { D as W } from "./chunks/AxisCamera-lXJLIPLK.mjs";
import { Object3D as p, AmbientLight as N, PointLight as J, SphereGeometry as C, MeshBasicMaterial as Y, FrontSide as M, Mesh as E, HemisphereLight as $, DirectionalLight as H, Vector3 as m, Box3 as V, MeshStandardMaterial as b, Raycaster as P, Color as f, CylinderGeometry as Q, BufferGeometry as T, BufferAttribute as S, BoxGeometry as y, ConeGeometry as K, LineDashedMaterial as q, Line as X, PlaneGeometry as Z, GridHelper as j, Scene as ee, WebGLRenderer as L, PCFSoftShadowMap as te, PCFShadowMap as ie, BasicShadowMap as se, MathUtils as w } from "three";
import { P as g, U as ne, H as re } from "./chunks/VisibilityLayerMask-CXgt1fJc.mjs";
import { g as d } from "./chunks/ModuleRegistry-CBfx1EVd.mjs";
import { a as oe, D as ae } from "./chunks/PerspectiveCamera-PMJPzAn3.mjs";
import { F as Ne, N as Je, S as Ye, g as $e, i as He } from "./chunks/FileTypes-DuVGjbcR.mjs";
import { f as Ke, i as qe } from "./chunks/findInterface-DbJ5qzbc.mjs";
import { F as Ze, P as je } from "./chunks/parse-error-BFRJyIxM.mjs";
import { E as tt, a as it } from "./chunks/index-C_uFFwT2.mjs";
class he extends p {
  constructor() {
    super();
    r(this, "isDIVELight", !0);
    r(this, "isDIVEAmbientLight", !0);
    r(this, "_light");
    this.name = "DIVEAmbientLight", this._light = new N(16777215, 1), this._light.layers.mask = g, this.add(this._light);
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
class le extends p {
  constructor() {
    super();
    r(this, "isDIVELight", !0);
    r(this, "isDIVEPointLight", !0);
    r(this, "isMovable", !0);
    r(this, "isSelectable", !0);
    r(this, "gizmo", null);
    r(this, "light");
    r(this, "mesh");
    this.name = "DIVEPointLight", this.light = new J(16777215, 1), this.light.layers.mask = g, this.light.castShadow = !0, this.light.shadow.mapSize.width = 512, this.light.shadow.mapSize.height = 512, this.add(this.light);
    const e = 0.1, t = new C(
      e,
      e * 320,
      e * 320
    ), s = new Y({
      color: this.light.color,
      transparent: !0,
      opacity: 0.8,
      side: M
    });
    this.mesh = new E(t, s), this.mesh.layers.mask = ne, this.add(this.mesh);
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
    d("State").then((e) => {
      var t;
      (t = e.get(this.userData.id)) == null || t.performAction("UPDATE_OBJECT", {
        id: this.userData.id,
        position: this.position
      });
    });
  }
  onSelect() {
    d("State").then((e) => {
      var t;
      (t = e.get(this.userData.id)) == null || t.performAction("SELECT_OBJECT", {
        id: this.userData.id
      });
    });
  }
  onDeselect() {
    d("State").then((e) => {
      var t;
      (t = e.get(this.userData.id)) == null || t.performAction("DESELECT_OBJECT", {
        id: this.userData.id
      });
    });
  }
}
class B extends p {
  constructor() {
    super();
    r(this, "isDIVELight", !0);
    r(this, "isDIVESceneLight", !0);
    r(this, "_hemiLight");
    r(this, "_dirLight");
    this.name = "DIVESceneLight", this._hemiLight = new $(16777215, 16777215, 2), this._hemiLight.layers.mask = g, this._hemiLight.position.set(0, 50, 0), this.add(this._hemiLight), this._dirLight = new H(16777215, 3), this._dirLight.layers.mask = g, this._dirLight.position.set(1, 1.75, 1), this._dirLight.position.multiplyScalar(30), this._dirLight.castShadow = !0, this._dirLight.shadow.mapSize.width = 2048, this._dirLight.shadow.mapSize.height = 2048;
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
const v = (n) => n.parent ? v(n.parent) : n;
class D extends p {
  constructor() {
    super();
    r(this, "isSelectable", !0);
    r(this, "isMovable", !0);
    r(this, "isDIVENode", !0);
    r(this, "gizmo", null);
    r(this, "_positionWorldBuffer");
    r(this, "_boundingBox");
    this.layers.mask = g, this._positionWorldBuffer = new m(), this._boundingBox = new V();
  }
  setPosition(e) {
    if (!this.parent) {
      this.position.set(e.x, e.y, e.z);
      return;
    }
    const t = new m(e.x, e.y, e.z);
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
    this.position.set(0, 0, 0), d("State").then((e) => {
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
    d("State").then((e) => {
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
    d("State").then((e) => {
      var t;
      (t = e.get(this.userData.id)) == null || t.performAction("SELECT_OBJECT", {
        id: this.userData.id
      });
    });
  }
  onDeselect() {
    d("State").then((e) => {
      var t;
      (t = e.get(this.userData.id)) == null || t.performAction("DESELECT_OBJECT", {
        id: this.userData.id
      });
    });
  }
}
class k extends D {
  constructor() {
    super(...arguments);
    r(this, "isDIVEModel", !0);
    r(this, "_mesh", null);
    r(this, "_material", null);
    r(this, "_assetLoader", null);
  }
  async _getAssetLoader() {
    return this._assetLoader || (this._assetLoader = new (await d("AssetLoader"))()), this._assetLoader;
  }
  async setFromURL(e) {
    const s = await (await this._getAssetLoader()).load(e);
    this.setFromGLTF(s), d("State").then((o) => {
      var a;
      (a = o.get(this.userData.id)) == null || a.performAction("MODEL_LOADED", {
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
    this._material || (this._material = new b()), e.vertexColors !== void 0 && (this._material.vertexColors = e.vertexColors), e.color !== void 0 && this._material.color.set(e.color), e.map !== void 0 && (this._material.map = e.map), e.normalMap !== void 0 && (this._material.normalMap = e.normalMap), e.roughness !== void 0 && (this._material.roughness = e.roughness), e.roughnessMap !== void 0 && (this._material.roughnessMap = e.roughnessMap, this._material.roughnessMap && (this._material.roughness = 1)), e.metalness !== void 0 && (this._material.metalness = e.metalness), e.metalnessMap !== void 0 && (this._material.metalnessMap = e.metalnessMap, this._material.metalnessMap && (this._material.metalness = 1)), this._mesh && (this._mesh.material = this._material);
  }
  placeOnFloor() {
    var o, a, h, l;
    const e = this.getWorldPosition(this._positionWorldBuffer), t = e.clone();
    (a = (o = this._mesh) == null ? void 0 : o.geometry) == null || a.computeBoundingBox();
    const s = (l = (h = this._mesh) == null ? void 0 : h.geometry) == null ? void 0 : l.boundingBox;
    !s || !this._mesh || (e.y = e.y - this._mesh.localToWorld(s.min.clone()).y, e.y !== t.y && d("State").then((u) => {
      var _;
      (_ = u.get(this.userData.id)) == null || _.performAction("UPDATE_OBJECT", {
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
      this._boundingBox.getCenter(new m()).multiply(this.scale)
    );
    t.y = e + this.position.y;
    const s = new P(t, new m(0, -1, 0));
    s.layers.mask = g;
    const o = s.intersectObjects(
      v(this).root.children,
      !0
    );
    if (o.length > 0) {
      const a = o[0].object;
      a.geometry.computeBoundingBox();
      const h = a.geometry.boundingBox, l = a.localToWorld(h.max.clone()), u = this.position.clone(), _ = this.position.clone().setY(l.y).sub(new m(0, e, 0));
      if (this.position.copy(_), this.position.y === u.y) return;
      this.onMove();
    }
  }
}
class de extends D {
  constructor() {
    super();
    r(this, "isDIVEPrimitive", !0);
    r(this, "_mesh");
    this._mesh = new E(), this._mesh.layers.mask = g, this._mesh.castShadow = !0, this._mesh.receiveShadow = !0, this._mesh.material = new b(), this.add(this._mesh);
  }
  setGeometry(e) {
    const t = this.assembleGeometry(e);
    t && (this._mesh.geometry = t, this._boundingBox.setFromObject(this._mesh));
  }
  setMaterial(e) {
    const t = this._mesh.material;
    e.vertexColors !== void 0 && (t.vertexColors = e.vertexColors), e.color !== void 0 && (t.color = new f(e.color)), e.map !== void 0 && (t.map = e.map), e.normalMap !== void 0 && (t.normalMap = e.normalMap), e.roughness !== void 0 && (t.roughness = e.roughness), e.roughnessMap !== void 0 && (t.roughnessMap = e.roughnessMap, t.roughnessMap && (t.roughness = 1)), e.metalness !== void 0 && (t.metalness = e.metalness), e.metalnessMap !== void 0 && (t.metalnessMap = e.metalnessMap, t.metalnessMap && (t.metalness = 0)), this._mesh && (this._mesh.material = t);
  }
  placeOnFloor() {
    var o, a, h, l;
    const e = this.getWorldPosition(this._positionWorldBuffer), t = e.clone();
    (a = (o = this._mesh) == null ? void 0 : o.geometry) == null || a.computeBoundingBox();
    const s = (l = (h = this._mesh) == null ? void 0 : h.geometry) == null ? void 0 : l.boundingBox;
    !s || !this._mesh || (e.y = e.y - this._mesh.localToWorld(s.min.clone()).y, e.y !== t.y && d("State").then((u) => {
      var _;
      (_ = u.get(this.userData.id)) == null || _.performAction("UPDATE_OBJECT", {
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
      this._boundingBox.getCenter(new m()).multiply(this.scale)
    );
    t.y = e + this.position.y;
    const s = new P(t, new m(0, -1, 0));
    s.layers.mask = g;
    const o = s.intersectObjects(
      v(this).root.children,
      !0
    );
    if (o.length > 0) {
      const a = o[0].object;
      a.geometry.computeBoundingBox();
      const h = a.geometry.boundingBox, l = a.localToWorld(h.max.clone()), u = this.position.clone(), _ = this.position.clone().setY(l.y).sub(new m(0, e, 0));
      if (this.position.copy(_), this.position.y === u.y) return;
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
    const t = new Q(
      e.width / 2,
      e.width / 2,
      e.height,
      64
    );
    return t.translate(0, e.height / 2, 0), t;
  }
  createSphereGeometry(e) {
    return new C(e.width / 2, 256, 256);
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
    ]), s = new Uint16Array([
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
    ]), o = new T();
    return o.setAttribute(
      "position",
      new S(t, 3)
    ), o.setIndex(new S(s, 1)), o.computeVertexNormals(), o.computeBoundingBox(), o.computeBoundingSphere(), o;
  }
  createBoxGeometry(e) {
    const t = new y(
      e.width,
      e.height,
      e.depth
    );
    return t.translate(0, e.height / 2, 0), t;
  }
  createConeGeometry(e) {
    const t = new K(e.width / 2, e.height, 256);
    return t.translate(0, e.height / 2, 0), t;
  }
  createWallGeometry(e) {
    const t = new y(
      e.width,
      e.height,
      e.depth || 0.05,
      16
    );
    return t.translate(0, e.height / 2, 0), t;
  }
  createPlaneGeometry(e) {
    const t = new y(
      e.width,
      e.height,
      e.depth
    );
    return t.translate(0, e.height / 2, 0), t;
  }
}
class ce extends D {
  // lines to children
  constructor() {
    super();
    r(this, "isDIVEGroup", !0);
    r(this, "_members");
    r(this, "_lines");
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
      this._lines.forEach((o) => {
        o.visible = e;
      });
      return;
    }
    const s = this._members.indexOf(t);
    s !== -1 && (this._lines[s].visible = e);
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
    const s = this._lines[t];
    return super.remove(s), this._lines.splice(t, 1), super.remove(e), this._members.splice(t, 1), this;
  }
  updateLineTo(e) {
    const t = this._members.indexOf(e);
    t !== -1 && this._updateLineTo(this._lines[t], e);
  }
  /**
   * Creates a line for visualization.
   */
  createLine() {
    const e = new T(), t = new q({
      color: 6710886,
      dashSize: 0.05,
      gapSize: 0.025
    }), s = new X(e, t);
    return s.visible = !1, s;
  }
  /**
   * Updates a line to the object.
   */
  _updateLineTo(e, t) {
    const s = [
      new m(0, 0, 0),
      t.position.clone()
    ];
    e.geometry.setFromPoints(s), e.computeLineDistances();
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
class ue extends E {
  constructor() {
    const e = new Z(1, 1);
    e.scale(1e3, 1e3, 1), e.rotateX(-Math.PI / 2);
    const t = new b({
      color: new f(16777215),
      side: M
    });
    super(e, t);
    r(this, "isDIVEFloor", !0);
    this.name = "Floor", this.layers.mask = g, this.receiveShadow = !0;
  }
  setVisibility(e) {
    this.visible = e;
  }
  setColor(e) {
    this.material.color = new f(e);
  }
}
class _e extends p {
  constructor() {
    super();
    r(this, "isDIVERoot", !0);
    r(this, "_floor");
    r(this, "_assetLoader", null);
    this.name = "Root", this._floor = new ue(), this.add(this._floor);
  }
  get floor() {
    return this._floor;
  }
  async _getAssetLoader() {
    return this._assetLoader || (this._assetLoader = new (await d("AssetLoader"))()), this._assetLoader;
  }
  computeSceneBB() {
    const e = new V();
    return this.children.forEach((t) => {
      "isDIVEFloor" in t || t.traverse((s) => {
        "isObject3D" in s && e.expandByObject(s);
      });
    }), e;
  }
  getSceneObject(e) {
    let t;
    return this.traverse((s) => {
      t || s.userData.id === e.id && (t = s);
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
            t = new B();
            break;
          }
          case "ambient": {
            t = new he();
            break;
          }
          case "point": {
            t = new le();
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
        t = new k(), t.name = e.name, t.userData.id = e.id, t.userData.uri = e.uri, this.add(t), this._updateModel(t, e);
        break;
      }
      case "primitive": {
        t = new de(), t.name = e.name, t.userData.id = e.id, this.add(t), this._updatePrimitive(t, e);
        break;
      }
      case "group": {
        t = new ce(), t.name = e.name, t.userData.id = e.id, this.add(t), this._updateGroup(t, e);
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
    ), t.intensity !== void 0 && t.intensity !== null && e.setIntensity(t.intensity), t.enabled !== void 0 && t.enabled !== null && e.setEnabled(t.enabled), t.color !== void 0 && t.color !== null && e.setColor(new f(t.color)), t.visible !== void 0 && t.visible !== null && (e.visible = t.visible), t.parentId !== void 0 && this._setParent({ ...t, parentId: t.parentId });
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
      const s = this.getSceneObject({
        id: e.parentId,
        entityType: e.entityType
      });
      if (!s) return;
      s.attach(t);
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
const me = "#888888", ge = "#dddddd";
class fe extends p {
  constructor() {
    super(), this.name = "Grid";
    const i = new j(
      100,
      100,
      me,
      ge
    );
    i.material.depthTest = !1, i.layers.mask = re, this.add(i);
  }
  setVisibility(i) {
    this.visible = i;
  }
}
class pe extends ee {
  constructor() {
    super();
    r(this, "_root");
    r(this, "_grid");
    this.background = new f(16777215), this._root = new _e(), this.add(this._root), this._grid = new fe(), this.add(this._grid);
  }
  get root() {
    return this._root;
  }
  get grid() {
    return this._grid;
  }
  setBackground(e) {
    this.background = new f(e);
  }
  computeSceneBB() {
    return this.root.computeSceneBB();
  }
}
const R = {
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
class we {
  constructor(i, e, t) {
    r(this, "_webglrenderer");
    r(this, "_settings");
    this._scene = i, this._camera = e, this._settings = {
      ...R,
      ...t ?? {}
    }, this._webglrenderer = new L(this._settings), this._webglrenderer.shadowMap.enabled = this._settings.shadows, this._webglrenderer.shadowMap.type = this._settings.shadowQuality === "high" ? te : this._settings.shadowQuality === "medium" ? ie : se;
  }
  get webglrenderer() {
    return this._webglrenderer;
  }
  setCanvas(i) {
    this._webglrenderer.dispose(), this._settings.canvas = i, this._webglrenderer = new L(this._settings);
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
class ye {
  constructor() {
    r(this, "_renderer", null);
    r(this, "_lastTime", 0);
    r(this, "_isRunning", !1);
    r(this, "_tickers", []);
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
    this._lastTime = i, this._tickers.forEach((s) => s.tick(e)), (t = this._renderer) == null || t.render(), requestAnimationFrame(this._tick.bind(this));
  }
}
class Ee {
  constructor(i, e) {
    r(this, "_resizeObserver");
    r(this, "_width", 0);
    r(this, "_height", 0);
    this._resizeObserver = new ResizeObserver((t) => {
      for (const s of t) {
        const { width: o, height: a } = s.contentRect;
        o === this._width && a === this._height || (i.onResize(o, a), e.onResize(o, a), this._width = o, this._height = a);
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
const O = {
  autoStart: !0,
  displayAxes: !1,
  ...oe,
  ...R
};
class be {
  constructor(i) {
    r(this, "_renderer");
    r(this, "_scene");
    r(this, "_camera");
    r(this, "_resizeManager");
    r(this, "_clock");
    r(this, "_settings");
    this._settings = {
      ...O,
      ...i ?? {}
    }, this._scene = new pe(), this._camera = new ae(this._settings), this._renderer = new we(
      this._scene,
      this._camera,
      this._settings
    ), this._resizeManager = new Ee(
      this._renderer,
      this._camera
    ), this._clock = new ye(), this._clock.setRenderer(this._renderer), this._settings.autoStart && this.start();
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
function c(n, i) {
  const e = (n + "e").split("e");
  return +(e[0] + "e" + (+e[1] + (i || 0)));
}
function ve(n, i = 0) {
  const e = c(n, +i);
  return c(Math.ceil(e), -i);
}
function De(n, i = 0) {
  const e = c(n, +i);
  return c(Math.floor(e), -i);
}
function A(n, i = 0) {
  if (n < 0) return -A(-n, i);
  const e = c(n, +i);
  return c(Math.round(e), -i);
}
function Ie(n, i, e) {
  return Math.atan2(
    n.clone().cross(i).dot(e),
    i.clone().dot(n)
  );
}
function Se(n, i = 0) {
  const e = c(n, +i);
  return c(Math.round(e), -i).toFixed(i);
}
function Le(n, i = 0) {
  const e = c(n, +i);
  return c(Math.trunc(e), -i);
}
function xe(n) {
  return (w.radToDeg(n) + 360) % 360;
}
function Ce(n) {
  return w.degToRad(n);
}
const Ae = {
  ceilExp: ve,
  floorExp: De,
  roundExp: A,
  toFixedExp: Se,
  truncateExp: Le,
  signedAngleTo: Ie,
  radToDeg: xe,
  degToRad: Ce
};
window.DIVE = {
  instances: [],
  get instance() {
    return window.DIVE.instances[0];
  }
};
const Me = {
  ...O,
  ...U
};
class G {
  constructor(i) {
    // descriptive members
    r(this, "_instanceId", w.generateUUID());
    r(this, "_settings");
    r(this, "_engine");
    r(this, "orbitController");
    r(this, "axisCamera");
    this._settings = {
      ...Me,
      ...i ?? {}
    }, this._engine = new be(i), this.orbitController = new I(
      this._engine.camera,
      this._engine.renderer.webglrenderer.domElement,
      this._settings
    ), this._engine.clock.addTicker(this.orbitController), this._settings.displayAxes ? (this.axisCamera = new W(
      this._engine.renderer,
      this._engine.scene,
      this._engine.camera
    ), this._engine.clock.addTicker(this.axisCamera)) : this.axisCamera = null, import("./chunks/package-CIkS9WF6.mjs").then((e) => {
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
    const t = new G(e);
    t.engine.scene.background = new f(16777215), t.engine.scene.grid.setVisibility(!1), t.engine.scene.root.floor.setVisibility(!0), t.engine.camera.position.set(0, 2, 2), t.orbitController.target.set(0, 0.5, 0);
    const s = new B();
    s.name = "SceneLight", s.userData.id = w.generateUUID(), s.setEnabled(!0), s.visible = !0, s.setIntensity((e == null ? void 0 : e.lightIntensity) ?? 1), s.setColor(new f(16777215)), t.engine.scene.root.add(s);
    const o = new k();
    o.name = "object", o.userData.id = w.generateUUID(), o.userData.uri = i, o.visible = !0, t.engine.scene.root.add(o), await o.setFromURL(i);
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
    this._engine.setCanvas(i), this._engine.clock.removeTicker(this.orbitController), this.orbitController.dispose(), this.orbitController = new I(
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
class Ge {
  constructor() {
    r(this, "isMovable", !0);
  }
}
class ze {
  constructor() {
    r(this, "isSelectable", !0);
  }
}
const x = (n, i) => {
  if (Object.keys(n).length === 0 && Object.keys(i).length === 0)
    return {};
  if (typeof n != "object" || typeof i != "object")
    return i;
  let e = {};
  return Object.keys(i).forEach((t) => {
    if (!Object.keys(n).includes(t)) {
      e = { ...e, [t]: i[t] };
      return;
    }
    if (Array.isArray(i[t])) {
      if (!Array.isArray(n[t])) {
        e = { ...e, [t]: i[t] };
        return;
      }
      const s = n[t], o = i[t];
      if (s.length === 0 && o.length === 0) {
        e = { ...e };
        return;
      }
      if (s.length !== o.length) {
        e = { ...e, [t]: i[t] };
        return;
      }
      const a = [];
      if (o.forEach((h, l) => {
        const u = x(
          s[l],
          o[l]
        );
        Object.keys(u).length && a.push(o[l]);
      }), Object.keys(a).length) {
        e = { ...e, [t]: a };
        return;
      }
      return;
    }
    if (typeof i[t] == "object") {
      if (typeof n[t] != "object") {
        e = { ...e, [t]: i[t] };
        return;
      }
      const s = x(
        n[t],
        i[t]
      );
      if (Object.keys(s).length) {
        e = { ...e, [t]: s };
        return;
      }
    }
    n[t] !== i[t] && (e = { ...e, [t]: i[t] });
  }), e;
};
function Fe(n, i) {
  return i.forEach((e) => {
    Object.getOwnPropertyNames(e.prototype).forEach((s) => {
      if (s === "constructor")
        return;
      const o = Object.getOwnPropertyDescriptor(
        e.prototype,
        s
      );
      Object.defineProperty(n.prototype, s, o);
    });
    const t = new e();
    Object.getOwnPropertyNames(t).forEach((s) => {
      const o = Object.getOwnPropertyDescriptor(
        t,
        s
      );
      Object.defineProperty(n.prototype, s, o);
    });
  }), n;
}
export {
  G as DIVE,
  ye as DIVEClock,
  Me as DIVEDefaultSettings,
  be as DIVEEngine,
  Ae as DIVEMath,
  Ge as DIVEMovable,
  ae as DIVEPerspectiveCamera,
  oe as DIVEPerspectiveCameraDefaultSettings,
  we as DIVERenderPipeline,
  R as DIVERenderPipelineDefaultSettings,
  Ee as DIVEResizeManager,
  pe as DIVEScene,
  ze as DIVESelectable,
  tt as ESystem,
  it as EWebXRUnsupportedReason,
  O as EngineDefaultSettings,
  Ne as FILE_TYPES,
  Ze as FileTypeError,
  Je as NetworkError,
  je as ParseError,
  Ye as SUPPORTED_FILE_TYPES,
  Fe as applyMixins,
  Ke as findInterface,
  v as findSceneRecursive,
  $e as getFileTypeFromUri,
  d as getModule,
  x as getObjectDelta,
  qe as implementsInterface,
  He as isFileTypeSupported
};
