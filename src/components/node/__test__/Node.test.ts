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

    describe('applyTransform', () => {
        // The silent write: for a caller that announces the change itself, so it
        // does not get a second report on top of its own.
        let parent: DIVENode;
        let onTransform: ReturnType<typeof vi.fn>;

        beforeEach(() => {
            parent = new DIVENode();
            parent.add(node);
            onTransform = vi.fn();
            node.addEventListener('object-transform', onTransform);
        });

        it('should not report for itself', () => {
            node.applyTransform({
                position: { x: 1, y: 2, z: 3 },
                rotation: { x: 0, y: 1, z: 0 },
                scale: { x: 2, y: 2, z: 2 },
            });

            expect(onTransform).not.toHaveBeenCalled();
        });

        it('should write everything the patch carries', () => {
            node.applyTransform({
                position: { x: 1, y: 2, z: 3 },
                rotation: { x: 0, y: 1, z: 0 },
                scale: { x: 2, y: 2, z: 2 },
            });

            expect(node.position.toArray()).toEqual([1, 2, 3]);
            expect(node.rotation.y).toBe(1);
            expect(node.scale.toArray()).toEqual([2, 2, 2]);
        });

        it('should leave out what the patch does not carry', () => {
            node.applyTransform({ position: { x: 1, y: 0, z: 0 } });

            expect(node.scale.toArray()).toEqual([1, 1, 1]);
        });

        it('should treat null like absent', () => {
            // a schema may carry null for a field it does not set
            node.applyTransform({
                position: null,
                rotation: null,
                scale: null,
            });

            expect(node.position.toArray()).toEqual([0, 0, 0]);
        });

        it('should convert the position out of world space', () => {
            parent.position.set(10, 0, 0);

            node.applyTransform({ position: { x: 11, y: 0, z: 0 } });

            // the schema speaks world, the node stores local
            expect(node.position.x).toBeCloseTo(1);
        });

        describe('members', () => {
            let member: DIVENode;
            let onMemberTransform: ReturnType<typeof vi.fn>;

            beforeEach(() => {
                member = new DIVENode();
                node.add(member);
                onMemberTransform = vi.fn();
                member.addEventListener('object-transform', onMemberTransform);
            });

            it('should still wake them, because nothing else does', () => {
                node.applyTransform({ position: { x: 10, y: 0, z: 0 } });

                expect(onMemberTransform).toHaveBeenCalledTimes(1);
            });

            it('should wake them once for a patch that changes all three', () => {
                node.applyTransform({
                    position: { x: 10, y: 0, z: 0 },
                    rotation: { x: 0, y: 1, z: 0 },
                    scale: { x: 2, y: 2, z: 2 },
                });

                expect(onMemberTransform).toHaveBeenCalledTimes(1);
            });

            it('should leave them alone when nothing changed', () => {
                node.applyTransform({
                    position: { x: 0, y: 0, z: 0 },
                    scale: { x: 1, y: 1, z: 1 },
                });

                expect(onMemberTransform).not.toHaveBeenCalled();
            });
        });
    });

    describe('reporting a transform it was told to make', () => {
        // One event for every kind of move: a listener cannot tell a gizmo drag
        // from a setPosition, and does not need to.
        let parent: DIVENode;
        let onTransform: ReturnType<typeof vi.fn>;

        beforeEach(() => {
            parent = new DIVENode();
            parent.add(node);
            onTransform = vi.fn();
            node.addEventListener('object-transform', onTransform);
        });

        it('should report a position it was given', () => {
            node.setPosition({ x: 1, y: 2, z: 3 });

            expect(onTransform).toHaveBeenCalledTimes(1);
        });

        it('should report a rotation it was given', () => {
            node.setRotation({ x: 0, y: 1, z: 0 });

            expect(onTransform).toHaveBeenCalledTimes(1);
        });

        it('should report a scale it was given', () => {
            node.setScale({ x: 2, y: 2, z: 2 });

            expect(onTransform).toHaveBeenCalledTimes(1);
        });

        it('should stay silent when the position does not change', () => {
            // a patch carrying all three transform fields must not report three
            // moves for one changed value
            node.setPosition({ x: 1, y: 2, z: 3 });
            onTransform.mockClear();

            node.setPosition({ x: 1, y: 2, z: 3 });

            expect(onTransform).not.toHaveBeenCalled();
        });

        it('should stay silent when the rotation does not change', () => {
            node.setRotation({ x: 0, y: 1, z: 0 });
            onTransform.mockClear();

            node.setRotation({ x: 0, y: 1, z: 0 });

            expect(onTransform).not.toHaveBeenCalled();
        });

        it('should stay silent when the scale does not change', () => {
            node.setScale({ x: 2, y: 2, z: 2 });
            onTransform.mockClear();

            node.setScale({ x: 2, y: 2, z: 2 });

            expect(onTransform).not.toHaveBeenCalled();
        });

        it('should stay silent while it has no parent', () => {
            // there is no world position to report yet
            parent.remove(node);

            node.setPosition({ x: 5, y: 5, z: 5 });

            expect(onTransform).not.toHaveBeenCalled();
        });

        describe('members', () => {
            let member: DIVENode;
            let grandMember: DIVENode;
            let onMemberTransform: ReturnType<typeof vi.fn>;
            let onGrandMemberTransform: ReturnType<typeof vi.fn>;

            beforeEach(() => {
                member = new DIVENode();
                grandMember = new DIVENode();
                member.add(grandMember);
                node.add(member);

                onMemberTransform = vi.fn();
                onGrandMemberTransform = vi.fn();
                member.addEventListener('object-transform', onMemberTransform);
                grandMember.addEventListener(
                    'object-transform',
                    onGrandMemberTransform,
                );
            });

            it('should report their new world position when the group moves', () => {
                node.setPosition({ x: 10, y: 0, z: 0 });

                expect(onMemberTransform).toHaveBeenCalledTimes(1);
            });

            it('should report when the group rotates', () => {
                // used to fire for setPosition only, so a rotated group left its
                // members' reported positions stale
                node.setRotation({ x: 0, y: 1, z: 0 });

                expect(onMemberTransform).toHaveBeenCalledTimes(1);
            });

            it('should report when the group is scaled', () => {
                node.setScale({ x: 2, y: 2, z: 2 });

                expect(onMemberTransform).toHaveBeenCalledTimes(1);
            });

            it('should reach a nested group, not just the first level', () => {
                node.setPosition({ x: 10, y: 0, z: 0 });

                expect(onGrandMemberTransform).toHaveBeenCalledTimes(1);
            });
        });
    });
});
