vi.mock('@shopware-ag/dive/shader', () => ({
    GridNode: vi.fn(function (this: any, uniforms) {
        this.uniforms = uniforms;
        return this;
    }),
    DIVEShaderLib: {
        grid: { uniforms: {}, vertexShader: '', fragmentShader: '' },
    },
    DIVEShaderMaterial: vi.fn(),
}));

import { DIVENode } from '../Node.ts';
import { State } from '@shopware-ag/dive/state';
import { Vector3 } from 'three/webgpu';

vi.mock('../../../modules/state/State', () => {
    return {
        State: {
            get: vi.fn(() => {
                return {
                    performAction: vi.fn(),
                };
            }),
        },
    };
});

vi.spyOn(State, 'get').mockReturnValue({
    performAction: vi.fn(),
} as unknown as State);

let node: DIVENode;

describe('dive/node/DIVENode', () => {
    beforeEach(() => {
        node = new DIVENode();
        vi.spyOn(node, 'getWorldPosition').mockImplementation(
            (target?: Vector3) => {
                if (target) return target.copy(node.position);
                return node.position.clone();
            },
        );
    });

    afterEach(() => {
        vi.clearAllMocks();
    });

    it('should instantiate', () => {
        expect(node).toBeDefined();
    });

    it('should have mixin properties and methods', () => {
        expect(node.isObject3D).toBe(true);
        expect(node.isMovable).toBe(true);
        expect(node.isSelectable).toBe(true);
    });

    it('should set position', () => {
        const spySet = vi.spyOn(node.position, 'set');
        const spyCopy = vi.spyOn(node.position, 'copy');

        // without a parent, the node should only set it's local position
        node.parent = null;
        expect(() => node.setPosition({ x: 1, y: 2, z: 3 })).not.toThrow();
        expect(spySet).toHaveBeenCalledWith(1, 2, 3);
        expect(spyCopy).not.toHaveBeenCalled();

        // with a parent, the node should set it's position relative to the parent
        spySet.mockClear();
        spyCopy.mockClear();
        node.parent = {
            worldToLocal: vi.fn(() => new Vector3(4, 5, 6)),
            isDIVEGroup: true,
            updateLineTo: vi.fn(),
        } as unknown as DIVENode;
        expect(() => node.setPosition({ x: 4, y: 5, z: 6 })).not.toThrow();
        expect(spySet).not.toHaveBeenCalled();
        expect(spyCopy).toHaveBeenCalledWith(
            expect.objectContaining({ x: 4, y: 5, z: 6 }),
        );
    });

    it('should set rotation', () => {
        expect(() => node.setRotation({ x: 0, y: 0, z: 0 })).not.toThrow();
    });

    it('should set scale', () => {
        expect(() => node.setScale({ x: 1, y: 1, z: 1 })).not.toThrow();
    });

    it('should set visibility', () => {
        expect(() => node.setVisibility(true)).not.toThrow();
    });

    it('should set to world origin', () => {
        node.userData.id = 'something';

        expect(() => node.setToWorldOrigin()).not.toThrow();
        expect(node.position.x).toBe(0);
        expect(node.position.y).toBe(0);
        expect(node.position.z).toBe(0);

        vi.spyOn(State, 'get').mockReturnValueOnce(undefined);
        expect(() => node.setToWorldOrigin()).not.toThrow();
    });

    it('should onMove', () => {
        node.userData.id = 'something';
        node.parent = {
            isDIVEGroup: true,
            updateLineTo: vi.fn(),
        } as unknown as DIVENode;

        expect(() => node.onMove()).not.toThrow();

        vi.spyOn(State, 'get').mockReturnValueOnce(undefined);
        expect(() => node.onMove()).not.toThrow();
    });

    it('should onSelect', () => {
        node.userData.id = 'something';

        expect(() => node.onSelect()).not.toThrow();

        vi.spyOn(State, 'get').mockReturnValueOnce(undefined);
        expect(() => node.onSelect()).not.toThrow();
    });

    it('should onDeselect', () => {
        node.userData.id = 'something';

        expect(() => node.onDeselect()).not.toThrow();

        vi.spyOn(State, 'get').mockReturnValueOnce(undefined);
        expect(() => node.onDeselect()).not.toThrow();
    });
});
