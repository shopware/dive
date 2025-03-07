import {
    type Object3D as THREEObject3D,
    Mesh as THREEMesh,
    Vector3 as THREEVector3,
} from 'three';

export const TransformControls = jest.fn(function () {
    this.isTransformControls = true;
    this.addEventListener = jest.fn(
        (type: string, callback: (e: object) => void) => {
            this.object = null;
            callback({ value: false });
            this.object = {};
            callback({ value: false });
            this.object = {
                isMovable: true,
            };
            callback({ value: false });
            this.object = {
                isMovable: true,
                onMove: jest.fn(),
                onMoveStart: jest.fn(),
                onMoveEnd: jest.fn(),
                scale: new THREEVector3(1, 1, 1),
            };
            callback({ value: false });
        },
    );
    this.attach = jest.fn();
    this.detach = jest.fn();
    this.children = [];
    const x = new THREEMesh();
    x.name = 'X';
    this.children.push(x);

    const y = new THREEMesh();
    y.name = 'Y';
    this.children.push(y);

    const z = new THREEMesh();
    z.name = 'Z';
    this.children.push(z);

    const xy = new THREEMesh();
    xy.name = 'XY';
    this.children.push(xy);

    const yz = new THREEMesh();
    yz.name = 'YZ';
    this.children.push(yz);

    const xz = new THREEMesh();
    xz.name = 'XZ';
    this.children.push(xz);

    this.traverse = jest.fn((callback) => {
        callback(this);
        this.children.forEach((child: THREEObject3D) => {
            callback(child);
        });
    });
    this.setMode = jest.fn();
    this.getRaycaster = jest.fn().mockReturnValue({
        layers: {
            mask: 0,
            disableAll: jest.fn(),
            enableAll: jest.fn(),
        },
    });
    this.layers = {
        mask: 0,
    };
    return this;
});
