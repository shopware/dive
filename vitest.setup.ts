import { Vector3 } from 'three';
import { vi } from 'vitest';
// this will be hoisted before all your tests:
vi.mock('three');
vi.mock('three/examples/jsm/controls/TransformControls.js');
vi.mock('three/examples/jsm/controls/OrbitControls.js', () => ({
    OrbitControls: vi.fn(function (this: any) {
        this.target = new Vector3();
        this.update = vi.fn();
        this.dispose = vi.fn();
        this.getDistance = vi.fn();
        return this;
    }),
}));
vi.mock('three-spritetext');
vi.mock('@tweenjs/tween.js');
