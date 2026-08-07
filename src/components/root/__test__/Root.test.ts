import { DIVERoot } from '../Root.ts';
import { Object3D, Vector3, Box3 } from 'three/webgpu';

vi.mock('three/webgpu', async () => {
    const actual =
        await vi.importActual<typeof import('three/webgpu')>('three/webgpu');

    const Object3D = vi.fn(function (this: any) {
        this.isObject3D = true;
        this.children = [];
        this.parent = null;
        this.name = '';
        this.userData = {};
        this.visible = true;
        this.layers = { mask: 0 };
        this.position = new actual.Vector3();
        this.rotation = new actual.Euler();
        this.quaternion = new actual.Quaternion();
        this.scale = new actual.Vector3(1, 1, 1);
        this.add = vi.fn((...objects: any[]) => {
            objects.forEach((object) => {
                this.children.push(object);
                if (object && typeof object === 'object') {
                    object.parent = this;
                }
            });
            return this;
        });
        this.attach = vi.fn((object: any) => {
            this.children.push(object);
            if (object && typeof object === 'object') {
                object.parent = this;
            }
            return this;
        });
        this.remove = vi.fn((object: any) => {
            this.children = this.children.filter(
                (child: any) => child !== object,
            );
            if (object && typeof object === 'object') {
                object.parent = null;
            }
            return this;
        });
        this.removeFromParent = vi.fn(() => {
            this.parent?.remove?.(this);
        });
        this.dispatchEvent = vi.fn();
        this.updateWorldMatrix = vi.fn();
        this.applyMatrix4 = vi.fn();
        this.worldToLocal = vi.fn((vector: any) => vector);
        this.traverse = vi.fn((callback: (object: any) => void) => {
            callback(this);
            this.children.forEach((child: any) => {
                if (child?.traverse && child !== this) {
                    child.traverse(callback);
                } else {
                    callback(child);
                }
            });
        });
        return this;
    });

    return {
        ...actual,
        Object3D,
    };
});

vi.mock('../../floor/Floor', () => {
    return {
        DIVEFloor: vi.fn(function (this: any) {
            this.isDIVEFloor = true;
            this.isObject3D = true;
            this.parent = null;
            this.dispatchEvent = vi.fn();
            this.removeFromParent = vi.fn();
            this.userData = {
                id: undefined,
            };
            return this;
        }),
    };
});

describe('components/root/DIVERoot', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    describe('constructor', () => {
        it('should initialize with correct properties', () => {
            const root = new DIVERoot();
            expect(root.isDIVERoot).toBe(true);
            expect(root.name).toBe('Root');
            expect(root.floor).toBeDefined();
        });
    });

    describe('computeSceneBB', () => {
        it('should compute bounding box for scene objects', () => {
            const mockObject = new Object3D();
            mockObject.position.set(1, 2, 3);

            Object3D.prototype.traverse = vi.fn((callback) =>
                callback(mockObject as Object3D),
            );

            const root = new DIVERoot();
            const bb = root.computeSceneBB();
            expect(bb).toBeDefined();
            expect(bb).toBeInstanceOf(Box3);
        });

        it('should handle empty scene', () => {
            Object3D.prototype.traverse = vi.fn((callback) => {});

            const root = new DIVERoot();
            const bb = root.computeSceneBB();
            expect(bb).toBeDefined();
            expect(bb).toBeInstanceOf(Box3);
        });

        it('should handle multiple objects', () => {
            const mockObject1 = new Object3D();
            mockObject1.position.set(1, 2, 3);
            mockObject1.traverse = vi.fn((callback) => callback(mockObject1));

            const mockObject2 = new Object3D();
            mockObject2.position.set(4, 5, 6);
            mockObject2.traverse = vi.fn((callback) => callback(mockObject2));

            const root = new DIVERoot();
            root.children = [mockObject1, mockObject2];

            const bb = root.computeSceneBB();
            expect(bb).toBeDefined();
            expect(bb).toBeInstanceOf(Box3);
            expect(mockObject1.traverse).toHaveBeenCalled();
            expect(mockObject2.traverse).toHaveBeenCalled();
        });
    });
});
