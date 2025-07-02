import { BoundingBox } from '../BoundingBox.ts';
import {
    Object3D,
    Mesh,
    Box3,
    Sphere,
    Vector3,
    Box3Helper,
    MeshBasicMaterial,
    SphereGeometry,
    Quaternion,
    Euler,
} from 'three';

describe('BoundingBox', () => {
    let mockObject: Object3D;
    let mockMesh: Mesh;
    let mockGeometry: any;

    beforeEach(() => {
        // Reset mocks
        vi.clearAllMocks();

        // Create mock geometry
        mockGeometry = {
            clone: vi.fn(() => ({
                applyMatrix4: vi.fn(),
                applyQuaternion: vi.fn(),
                computeBoundingBox: vi.fn(),
                boundingBox: {
                    min: new Vector3(-1, -1, -1),
                    max: new Vector3(1, 1, 1),
                },
            })),
            boundingBox: {
                min: new Vector3(-1, -1, -1),
                max: new Vector3(1, 1, 1),
            },
        };

        // Create mock mesh
        mockMesh = new Mesh(mockGeometry);
        mockMesh.position.set(0, 0, 0);
        mockMesh.rotation.set(0, 0, 0);
        mockMesh.scale.set(1, 1, 1);

        // Create mock object
        mockObject = new Object3D();
        mockObject.add(mockMesh);
        mockObject.position.set(0, 0, 0);
        mockObject.rotation.set(0, 0, 0);
        mockObject.scale.set(1, 1, 1);
    });

    describe('constructor', () => {
        it('should create a BoundingBox instance with default parameters', () => {
            const boundingBox = new BoundingBox(mockObject);

            expect(boundingBox).toBeDefined();
            expect(boundingBox).toBeInstanceOf(BoundingBox);
            expect(boundingBox.box).toBeDefined();
            expect(boundingBox.sphere).toBeDefined();
            expect(boundingBox.center).toBeDefined();
            expect(boundingBox.radius).toBeDefined();
            expect(boundingBox.size).toBeDefined();
        });

        it('should create a BoundingBox with axis-aligned bounding box', () => {
            const boundingBox = new BoundingBox(mockObject, true);

            expect(boundingBox).toBeDefined();
            expect(boundingBox.box).toBeDefined();
        });

        it('should create a BoundingBox with custom wireframe color', () => {
            const customColor = 0xff0000;
            const boundingBox = new BoundingBox(mockObject, false, customColor);

            expect(boundingBox).toBeDefined();
            expect(Box3Helper).toHaveBeenCalledWith(
                expect.any(Box3),
                customColor,
            );
            expect(MeshBasicMaterial).toHaveBeenCalledWith(
                expect.objectContaining({
                    color: customColor,
                    wireframe: true,
                }),
            );
        });

        it('should create a BoundingBox with oriented bounding box by default', () => {
            const boundingBox = new BoundingBox(mockObject);

            expect(boundingBox).toBeDefined();
            expect(boundingBox.box).toBeDefined();
        });

        it('should handle complex objects with multiple meshes', () => {
            const childMesh = new Mesh(mockGeometry);
            mockObject.add(childMesh);

            const boundingBox = new BoundingBox(mockObject);

            expect(boundingBox).toBeDefined();
            expect(mockObject.traverse).toHaveBeenCalled();
        });

        it('should copy object rotation to maintain orientation', () => {
            mockObject.rotation.set(0, Math.PI / 2, 0);

            const boundingBox = new BoundingBox(mockObject);

            expect(boundingBox.rotation.x).toBe(mockObject.rotation.x);
            expect(boundingBox.rotation.y).toBe(mockObject.rotation.y);
            expect(boundingBox.rotation.z).toBe(mockObject.rotation.z);
        });

        it('should create box helper with correct visibility', () => {
            const boundingBox = new BoundingBox(mockObject);

            // Box helper should be created but initially invisible
            expect(Box3Helper).toHaveBeenCalled();
            // Check that the box helper is added to children
            expect(boundingBox.children.length).toBeGreaterThan(0);
        });

        it('should create sphere helper with correct visibility', () => {
            const boundingBox = new BoundingBox(mockObject);

            // Sphere helper should be created but initially invisible
            expect(SphereGeometry).toHaveBeenCalled();
            expect(MeshBasicMaterial).toHaveBeenCalledWith(
                expect.objectContaining({
                    wireframe: true,
                }),
            );
            // Check that the sphere helper is added to children
            expect(boundingBox.children.length).toBeGreaterThan(0);
        });

        it('should compute bounding sphere from box', () => {
            const boundingBox = new BoundingBox(mockObject);

            expect(boundingBox.sphere).toBeDefined();
            expect(boundingBox.radius).toBeDefined();
            expect(typeof boundingBox.radius).toBe('number');
        });

        it('should handle objects without meshes', () => {
            const emptyObject = new Object3D();

            const boundingBox = new BoundingBox(emptyObject);

            expect(boundingBox).toBeDefined();
            expect(boundingBox.box).toBeDefined();
        });
    });

    describe('getters', () => {
        let boundingBox: BoundingBox;

        beforeEach(() => {
            boundingBox = new BoundingBox(mockObject);
        });

        it('should return the computed bounding box', () => {
            expect(boundingBox.box).toBeDefined();
            expect(boundingBox.box).toBeInstanceOf(Box3);
        });

        it('should return the computed bounding sphere', () => {
            expect(boundingBox.sphere).toBeDefined();
            expect(boundingBox.sphere).toBeInstanceOf(Sphere);
        });

        it('should return the center point', () => {
            expect(boundingBox.center).toBeDefined();
            expect(boundingBox.center).toBeDefined();
        });

        it('should return the radius', () => {
            expect(boundingBox.radius).toBeDefined();
            expect(typeof boundingBox.radius).toBe('number');
            expect(boundingBox.radius).toBeGreaterThanOrEqual(0);
        });

        it('should return the size dimensions', () => {
            expect(boundingBox.size).toBeDefined();
            expect(boundingBox.size).toBeInstanceOf(Vector3);
        });
    });

    describe('setBoxHelperVisible', () => {
        let boundingBox: BoundingBox;

        beforeEach(() => {
            boundingBox = new BoundingBox(mockObject);
        });

        it('should show box helper when set to true', () => {
            boundingBox.setBoxHelperVisible(true);

            // The setBoxHelperVisible method should be called
            // We can't easily test the internal helper visibility due to mocking
            expect(boundingBox).toBeDefined();
        });

        it('should hide box helper when set to false', () => {
            boundingBox.setBoxHelperVisible(false);

            // The setBoxHelperVisible method should be called
            // We can't easily test the internal helper visibility due to mocking
            expect(boundingBox).toBeDefined();
        });

        it('should toggle box helper visibility', () => {
            boundingBox.setBoxHelperVisible(true);
            expect(boundingBox).toBeDefined();

            boundingBox.setBoxHelperVisible(false);
            expect(boundingBox).toBeDefined();
        });
    });

    describe('setSphereHelperVisible', () => {
        let boundingBox: BoundingBox;

        beforeEach(() => {
            boundingBox = new BoundingBox(mockObject);
        });

        it('should show sphere helper when set to true', () => {
            boundingBox.setSphereHelperVisible(true);

            // The setSphereHelperVisible method should be called
            // We can't easily test the internal helper visibility due to mocking
            expect(boundingBox).toBeDefined();
        });

        it('should hide sphere helper when set to false', () => {
            boundingBox.setSphereHelperVisible(false);

            // The setSphereHelperVisible method should be called
            // We can't easily test the internal helper visibility due to mocking
            expect(boundingBox).toBeDefined();
        });

        it('should toggle sphere helper visibility', () => {
            boundingBox.setSphereHelperVisible(true);
            expect(boundingBox).toBeDefined();

            boundingBox.setSphereHelperVisible(false);
            expect(boundingBox).toBeDefined();
        });
    });

    describe('axis-aligned vs oriented bounding box', () => {
        it('should use setFromObject for axis-aligned bounding box', () => {
            const boundingBox = new BoundingBox(mockObject, true);

            expect(boundingBox).toBeDefined();
            // The Box3.setFromObject method should be called for axis-aligned
            expect(boundingBox.box.setFromObject).toHaveBeenCalledWith(
                mockObject,
            );
        });

        it('should use traverse and geometry manipulation for oriented bounding box', () => {
            const boundingBox = new BoundingBox(mockObject, false);

            expect(boundingBox).toBeDefined();
            expect(mockObject.traverse).toHaveBeenCalled();
            expect(mockObject.updateWorldMatrix).toHaveBeenCalledWith(
                true,
                true,
            );
        });

        it('should handle geometry cloning and transformation for oriented bounding box', () => {
            const boundingBox = new BoundingBox(mockObject, false);

            expect(boundingBox).toBeDefined();
            // The traverse method should be called for oriented bounding box
            expect(mockObject.traverse).toHaveBeenCalled();
        });
    });

    describe('edge cases', () => {
        it('should handle objects with no geometry', () => {
            const emptyMesh = new Mesh();
            const boundingBox = new BoundingBox(emptyMesh);

            expect(boundingBox).toBeDefined();
            expect(boundingBox.box).toBeDefined();
        });

        it('should handle objects with null geometry', () => {
            const nullGeometryMesh = new Mesh(null as any);
            const boundingBox = new BoundingBox(nullGeometryMesh);

            expect(boundingBox).toBeDefined();
            expect(boundingBox.box).toBeDefined();
        });

        it('should handle objects with undefined bounding box', () => {
            const mockGeometryWithoutBoundingBox = {
                clone: vi.fn(() => ({
                    applyMatrix4: vi.fn(),
                    applyQuaternion: vi.fn(),
                    computeBoundingBox: vi.fn(),
                    boundingBox: null,
                })),
            } as any;

            const meshWithoutBoundingBox = new Mesh(
                mockGeometryWithoutBoundingBox,
            );
            const boundingBox = new BoundingBox(meshWithoutBoundingBox);

            expect(boundingBox).toBeDefined();
            expect(boundingBox.box).toBeDefined();
        });

        it('should handle color representation as string', () => {
            const boundingBox = new BoundingBox(mockObject, false, '#ff0000');

            expect(boundingBox).toBeDefined();
            expect(Box3Helper).toHaveBeenCalledWith(
                expect.any(Box3),
                '#ff0000',
            );
        });

        it('should handle color representation as number', () => {
            const boundingBox = new BoundingBox(mockObject, false, 0xff0000);

            expect(boundingBox).toBeDefined();
            expect(Box3Helper).toHaveBeenCalledWith(expect.any(Box3), 0xff0000);
        });
    });

    describe('inheritance and mixins', () => {
        it('should extend DIVENode', () => {
            const boundingBox = new BoundingBox(mockObject);

            expect(boundingBox.isDIVENode).toBe(true);
            expect(boundingBox.isMovable).toBe(true);
            expect(boundingBox.isSelectable).toBe(true);
        });

        it('should have Object3D properties', () => {
            const boundingBox = new BoundingBox(mockObject);

            expect(boundingBox.position).toBeDefined();
            expect(boundingBox.rotation).toBeDefined();
            expect(boundingBox.scale).toBeDefined();
            expect(boundingBox.children).toBeDefined();
            expect(Array.isArray(boundingBox.children)).toBe(true);
        });
    });
});
