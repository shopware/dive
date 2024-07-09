import { Box3, Color, MeshBasicMaterial, Object3D, Vector3 } from 'three';
import { LineMaterial } from 'three/examples/jsm/Addons';
import { DIVECubeSelectionPlaneHandle } from '../handle/plane/CubeSelectionPlaneHandle';
import { DIVECubeSelectionEdgeHandle } from '../handle/edge/CubeSelectionEdgeHandle';

export class DIVECubeSelectionMesh extends Object3D {
    private _planeMaterial: MeshBasicMaterial;
    private _lineMaterial: LineMaterial;

    /**
     * Order: posX, negX, posY, negY, posZ, negZ
     */
    private _planes: DIVECubeSelectionPlaneHandle[] = [];
    public get planes(): DIVECubeSelectionPlaneHandle[] {
        return this._planes;
    }

    private _planesNode: Object3D;
    private _edgesNode: Object3D;

    constructor() {
        super();

        this._planeMaterial = new MeshBasicMaterial({
            color: 0x4e5cff,
            transparent: true,
            opacity: 0.2,
        });

        this._planesNode = new Object3D();
        this.add(this._planesNode);

        const hsl = this._planeMaterial.color.getHSL({ h: 0, s: 0, l: 0 });
        this._lineMaterial = new LineMaterial({
            color: new Color().setHSL(hsl.h, hsl.s, hsl.l * 1.5).getHex(),
            linewidth: 5, // in world units with size attenuation, pixels otherwise
            vertexColors: false,
            dashed: false,
            alphaToCoverage: true,
        });

        this._edgesNode = new Object3D();
        this.add(this._edgesNode);
    }

    public updateBox(box: Box3): void {
        this.updateBoxMesh(box);
    }

    private updateBoxMesh(box: Box3): void {
        this._planes = [];
        this._planesNode.clear();
        this._edgesNode.clear();

        // when there are no children, set the geometry dimensions to 0
        const size = new Vector3();
        box.getSize(size);
        if (size.length() === 0) return;

        const center = new Vector3();
        box.getCenter(center);
        const width = box.max.x - box.min.x;
        const height = box.max.y - box.min.y;
        const depth = box.max.z - box.min.z;

        this._planes = [
            new DIVECubeSelectionPlaneHandle(this._planeMaterial).setPoints([ // posX
                new Vector3(width / 2, height / 2, - depth / 2),
                new Vector3(width / 2, -height / 2, - depth / 2),
                new Vector3(width / 2, height / 2, depth / 2),
                new Vector3(width / 2, -height / 2, depth / 2),
            ]).translateX(center.x).translateY(center.y).translateZ(center.z),

            new DIVECubeSelectionPlaneHandle(this._planeMaterial).setPoints([ // negX
                new Vector3(-width / 2, height / 2, depth / 2),
                new Vector3(-width / 2, -height / 2, depth / 2),
                new Vector3(-width / 2, height / 2, - depth / 2),
                new Vector3(-width / 2, -height / 2, - depth / 2),
            ]).translateX(center.x).translateY(center.y).translateZ(center.z),

            new DIVECubeSelectionPlaneHandle(this._planeMaterial).setPoints([ // posY
                new Vector3(-width / 2, height / 2, - depth / 2),
                new Vector3(width / 2, height / 2, - depth / 2),
                new Vector3(-width / 2, height / 2, depth / 2),
                new Vector3(width / 2, height / 2, depth / 2),
            ]).translateX(center.x).translateY(center.y).translateZ(center.z),

            new DIVECubeSelectionPlaneHandle(this._planeMaterial).setPoints([ // negY
                new Vector3(-width / 2, -height / 2, - depth / 2),
                new Vector3(-width / 2, -height / 2, depth / 2),
                new Vector3(width / 2, -height / 2, - depth / 2),
                new Vector3(width / 2, -height / 2, depth / 2),
            ]).translateX(center.x).translateY(center.y).translateZ(center.z),

            new DIVECubeSelectionPlaneHandle(this._planeMaterial).setPoints([ // posZ
                new Vector3(width / 2, -height / 2, depth / 2),
                new Vector3(-width / 2, -height / 2, depth / 2),
                new Vector3(width / 2, height / 2, depth / 2),
                new Vector3(-width / 2, height / 2, depth / 2),
            ]).translateX(center.x).translateY(center.y).translateZ(center.z),

            new DIVECubeSelectionPlaneHandle(this._planeMaterial).setPoints([ // negZ
                new Vector3(-width / 2, height / 2, - depth / 2),
                new Vector3(-width / 2, -height / 2, - depth / 2),
                new Vector3(width / 2, height / 2, - depth / 2),
                new Vector3(width / 2, -height / 2, - depth / 2),
            ]).translateX(center.x).translateY(center.y).translateZ(center.z),
        ];

        this._planesNode.clear();
        this._planesNode.add(...this._planes);

        const points = [
            width / 2, height / 2, depth / 2,
            width / 2, height / 2, - depth / 2,

            width / 2, - height / 2, depth / 2,
            width / 2, - height / 2, - depth / 2,

            - width / 2, height / 2, depth / 2,
            - width / 2, height / 2, - depth / 2,

            - width / 2, - height / 2, depth / 2,
            - width / 2, - height / 2, - depth / 2,


            width / 2, height / 2, depth / 2,
            width / 2, - height / 2, depth / 2,

            width / 2, height / 2, - depth / 2,
            width / 2, - height / 2, - depth / 2,

            - width / 2, height / 2, depth / 2,
            - width / 2, - height / 2, depth / 2,

            - width / 2, height / 2, - depth / 2,
            - width / 2, - height / 2, - depth / 2,


            width / 2, height / 2, depth / 2,
            - width / 2, height / 2, depth / 2,

            width / 2, height / 2, - depth / 2,
            - width / 2, height / 2, - depth / 2,

            width / 2, - height / 2, depth / 2,
            - width / 2, - height / 2, depth / 2,

            width / 2, - height / 2, - depth / 2,
            - width / 2, - height / 2, - depth / 2,
        ];

        points.forEach((point, index) => {
            if (index % 6 === 0) {
                const edge = new DIVECubeSelectionEdgeHandle(this._lineMaterial);
                edge.setPoints([
                    points[index] + center.x, points[index + 1] + center.y, points[index + 2] + center.z,
                    points[index + 3] + center.x, points[index + 4] + center.y, points[index + 5] + center.z,
                ]);
                this._edgesNode.add(edge);
            }
        });
    }
}