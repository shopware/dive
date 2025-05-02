import { vi } from 'vitest';
import {
    type Object3D as THREEObject3D,
    Mesh as THREEMesh,
    Vector3 as THREEVector3,
} from 'three';

export const TransformControls = vi.fn(function () {
    this.isTransformControls = true;
    this.addEventListener = vi.fn(
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
                onMove: vi.fn(),
                onMoveStart: vi.fn(),
                onMoveEnd: vi.fn(),
                scale: new THREEVector3(1, 1, 1),
            };
            callback({ value: false });
        },
    );
    this.attach = vi.fn();
    this.detach = vi.fn();
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

    this.traverse = vi.fn((callback) => {
        callback(this);
        this.children.forEach((child: THREEObject3D) => {
            callback(child);
        });
    });
    this.setMode = vi.fn();
    this.getRaycaster = vi.fn().mockReturnValue({
        layers: {
            mask: 0,
            disableAll: vi.fn(),
            enableAll: vi.fn(),
        },
    });
    this.layers = {
        mask: 0,
    };
    return this;
});
