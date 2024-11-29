import { Mesh, MeshBasicMaterial, Object3D, RingGeometry } from "three";

export class DIVEWebXRCrosshair extends Object3D {
    public set mesh(mesh: Mesh | undefined) {
        this.clear();

        if (mesh) {
            this.add(mesh);
        }
    }

    constructor(mesh?: Mesh) {
        super();

        if (mesh) {
            this.mesh = mesh;
        } else {
            this.UseDefaultMesh();
        }

        this.matrixAutoUpdate = false;

        return this;


    }

    public UseDefaultMesh(): void {
        const geometry = new RingGeometry(0.08, 0.10, 32).rotateX(-Math.PI / 2);
        const material = new MeshBasicMaterial();
        this.mesh = new Mesh(geometry, material);
    }

    public UpdateFromPose(pose: XRPose): void {
        this.matrix.fromArray(pose.transform.matrix);
    }
}
