import { Mesh, MeshBasicMaterial, Object3D, PlaneGeometry } from "three";
import { UI_LAYER_MASK } from "../../constant/VisibilityLayerMask";
import { DIVEGizmoAxis, DIVEGizmoMode } from "../Gizmo";

export class DIVEGizmoPlane extends Object3D {
    private _meshX: Mesh;
    public get XPlane(): Mesh {
        return this._meshX;
    }
    private _meshY: Mesh;
    public get YPlane(): Mesh {
        return this._meshY;
    }
    private _meshZ: Mesh;
    public get ZPlane(): Mesh {
        return this._meshZ;
    }

    constructor() {
        super();
        this.name = "DIVEGizmoPlane";

        const material = new MeshBasicMaterial({
            transparent: true,
            opacity: 0.15,
            depthTest: false,
            depthWrite: false,
            side: 2,
        });

        const geoX = new PlaneGeometry(100, 100, 2, 2);
        const matX = material.clone();
        matX.color.set(0xff0000);
        this._meshX = new Mesh(geoX, matX);
        this._meshX.layers.mask = UI_LAYER_MASK;
        this._meshX.rotateY(Math.PI / 2);

        const geoY = new PlaneGeometry(100, 100, 2, 2);
        const matY = material.clone();
        matY.color.set(0x00ff00);
        this._meshY = new Mesh(geoY, matY);
        this._meshY.layers.mask = UI_LAYER_MASK;
        this._meshY.rotateX(-Math.PI / 2);

        const geoZ = new PlaneGeometry(100, 100, 2, 2);
        const matZ = material.clone();
        matZ.color.set(0x0000ff);
        this._meshZ = new Mesh(geoZ, matZ);
        this._meshZ.layers.mask = UI_LAYER_MASK;
    }

    public assemble(mode: DIVEGizmoMode, axis: DIVEGizmoAxis): void {
        this.clear();

        if (mode === 'translate' || mode === 'scale') {
            switch (axis) {
                case 'x':
                    this.add(this._meshY);
                    this.add(this._meshZ);
                    break;
                case 'y':
                    this.add(this._meshX);
                    this.add(this._meshZ);
                    break;
                case 'z':
                    this.add(this._meshX);
                    this.add(this._meshY);
                    break;
            }
        } else if (mode === 'rotate') {
            switch (axis) {
                case 'x':
                    this.add(this._meshX);
                    break;
                case 'y':
                    this.add(this._meshY);
                    break;
                case 'z':
                    this.add(this._meshZ);
                    break;
            }
        }

    }
}