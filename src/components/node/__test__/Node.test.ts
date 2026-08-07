import { DIVENode } from '../Node.ts';
import { Vector3 } from 'three/webgpu';

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

        expect(() => node.setToWorldOrigin()).not.toThrow();
    });

    it('should onMove', () => {
        node.userData.id = 'something';
        node.parent = {
            isDIVEGroup: true,
            updateLineTo: vi.fn(),
        } as unknown as DIVENode;

        expect(() => node.onMove()).not.toThrow();

        expect(() => node.onMove()).not.toThrow();
    });

    it('should onSelect', () => {
        node.userData.id = 'something';

        expect(() => node.onSelect()).not.toThrow();

        expect(() => node.onSelect()).not.toThrow();
    });

    it('should onDeselect', () => {
        node.userData.id = 'something';

        expect(() => node.onDeselect()).not.toThrow();

        expect(() => node.onDeselect()).not.toThrow();
    });

    describe('reporting about itself', () => {
        // The engine only states facts; turning them into actions is the state
        // plugin's job, and it subscribes per object.

        it('should report a transform on move', () => {
            const onTransform = vi.fn();
            node.addEventListener('object-transform', onTransform);
            node.position.set(1, 2, 3);

            node.onMove();

            expect(onTransform).toHaveBeenCalledTimes(1);
            expect(onTransform).toHaveBeenCalledWith(
                expect.objectContaining({
                    position: expect.objectContaining({ x: 1, y: 2, z: 3 }),
                    rotation: node.rotation,
                    scale: node.scale,
                }),
            );
        });

        it('should report the world position, not the local one', () => {
            const parent = new DIVENode();
            parent.position.set(10, 0, 0);
            parent.add(node);
            node.position.set(1, 0, 0);
            vi.mocked(node.getWorldPosition).mockRestore();

            const onTransform = vi.fn();
            node.addEventListener('object-transform', onTransform);

            node.onMove();

            expect(onTransform).toHaveBeenCalledWith(
                expect.objectContaining({
                    position: expect.objectContaining({ x: 11 }),
                }),
            );
        });

        it('should report exactly once when moved to the world origin', () => {
            const onTransform = vi.fn();
            node.addEventListener('object-transform', onTransform);

            node.setToWorldOrigin();

            expect(node.position.x).toBe(0);
            expect(onTransform).toHaveBeenCalledTimes(1);
        });

        it('should report selection and deselection', () => {
            const onSelect = vi.fn();
            const onDeselect = vi.fn();
            node.addEventListener('object-select', onSelect);
            node.addEventListener('object-deselect', onDeselect);

            node.onSelect();
            node.onDeselect();

            expect(onSelect).toHaveBeenCalledTimes(1);
            expect(onDeselect).toHaveBeenCalledTimes(1);
        });

        it('should stay silent after the listener is removed', () => {
            const onTransform = vi.fn();
            node.addEventListener('object-transform', onTransform);
            node.removeEventListener('object-transform', onTransform);

            node.onMove();

            expect(onTransform).not.toHaveBeenCalled();
        });
    });
});
