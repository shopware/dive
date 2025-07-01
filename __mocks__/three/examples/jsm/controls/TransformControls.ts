import { vi } from 'vitest';
import {
    type Object3D as THREEObject3D,
    Mesh as THREEMesh,
    Vector3 as THREEVector3,
} from 'three';

// Global event listeners storage
let eventListeners: { [key: string]: Function[] } = {};

export const TransformControls = vi.fn(function () {
    this.isTransformControls = true;
    this.mode = 'translate';
    this.object = null;
    this.enabled = true;

    // Store event listeners for testing
    this.addEventListener = vi.fn((event: string, listener: Function) => {
        if (!eventListeners[event]) {
            eventListeners[event] = [];
        }
        eventListeners[event].push(listener);
    });

    this.removeEventListener = vi.fn();
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

    // Create a persistent raycaster object for this instance
    const raycaster = {
        layers: {
            mask: 0,
            disableAll: vi.fn(),
            enableAll: vi.fn(),
        },
    };
    this.getRaycaster = vi.fn(() => raycaster);

    this.layers = {
        mask: 0,
    };
    return this;
});

// Export event listeners for testing
export { eventListeners };
