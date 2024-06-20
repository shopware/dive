import { Mesh, MeshBasicMaterial, Object3D, PlaneGeometry } from "three";

export class DIVEGizmoPlane extends Object3D {
    constructor() {
        super();
        this.name = "DIVEGizmoPlane";

        const material = new MeshBasicMaterial({
            color: 0xff00ff,
            transparent: true,
            opacity: 0.15,
            depthTest: false,
            depthWrite: false,
        });

        const geo = new PlaneGeometry(100, 100, 2, 2);

        const mesh = new Mesh(geo, material);

        this.add(mesh);
    }
}