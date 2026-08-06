import { BoundingBox } from '../BoundingBox.ts';
import {
    Object3D,
    Mesh,
    Box3,
    Sphere,
    Vector3,
    Box3Helper,
    MeshBasicMaterial,
    BoxGeometry,
    SphereGeometry,
} from 'three/webgpu';

describe('BoundingBox', () => {
    let mockObject: Object3D;
    let mockMesh: Mesh;
    let mockGeometry: any;

    beforeEach(() => {
        vi.restoreAllMocks();

        mockGeometry = new BoxGeometry(1, 2, 3);

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
            const boxHelper = boundingBox.children[0] as Box3Helper;
            const sphereHelper = boundingBox.children[1] as Mesh;
            const sphereMaterial = sphereHelper.material as MeshBasicMaterial;

            expect(boundingBox).toBeDefined();
            expect(boxHelper).toBeInstanceOf(Box3Helper);
            expect((boxHelper.material as any).color.getHex()).toBe(
                customColor,
            );
            expect(sphereMaterial.color.getHex()).toBe(customColor);
            expect(sphereMaterial.wireframe).toBe(true);
        });

        it('should create a BoundingBox with oriented bounding box by default', () => {
            const boundingBox = new BoundingBox(mockObject);

            expect(boundingBox).toBeDefined();
            expect(boundingBox.box).toBeDefined();
        });

        it('should handle complex objects with multiple meshes', () => {
            const childMesh = new Mesh(mockGeometry);
            mockObject.add(childMesh);
            const traverseSpy = vi.spyOn(mockObject, 'traverse');

            const boundingBox = new BoundingBox(mockObject);

            expect(boundingBox).toBeDefined();
            expect(traverseSpy).toHaveBeenCalled();
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
            const boxHelper = boundingBox.children[0] as Box3Helper;

            // Box helper should be created but initially invisible
            expect(boxHelper).toBeInstanceOf(Box3Helper);
            expect(boxHelper.visible).toBe(false);
            expect(boundingBox.children.length).toBeGreaterThan(0);
        });

        it('should create sphere helper with correct visibility', () => {
            const boundingBox = new BoundingBox(mockObject);
            const sphereHelper = boundingBox.children[1] as Mesh;
            const sphereMaterial = sphereHelper.material as MeshBasicMaterial;

            // Sphere helper should be created but initially invisible
            expect(sphereHelper.geometry).toBeInstanceOf(SphereGeometry);
            expect(sphereMaterial.wireframe).toBe(true);
            expect(sphereHelper.visible).toBe(false);
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
        let boxHelper: Box3Helper;

        beforeEach(() => {
            boundingBox = new BoundingBox(mockObject);
            boxHelper = boundingBox.children[0] as Box3Helper;
        });

        it('should show box helper when set to true', () => {
            boundingBox.setBoxHelperVisible(true);

            expect(boxHelper.visible).toBe(true);
        });

        it('should hide box helper when set to false', () => {
            boundingBox.setBoxHelperVisible(true);
            boundingBox.setBoxHelperVisible(false);

            expect(boxHelper.visible).toBe(false);
        });

        it('should toggle box helper visibility', () => {
            boundingBox.setBoxHelperVisible(true);
            expect(boxHelper.visible).toBe(true);

            boundingBox.setBoxHelperVisible(false);
            expect(boxHelper.visible).toBe(false);
        });
    });

    describe('setSphereHelperVisible', () => {
        let boundingBox: BoundingBox;
        let sphereHelper: Mesh;

        beforeEach(() => {
            boundingBox = new BoundingBox(mockObject);
            sphereHelper = boundingBox.children[1] as Mesh;
        });

        it('should show sphere helper when set to true', () => {
            boundingBox.setSphereHelperVisible(true);

            expect(sphereHelper.visible).toBe(true);
        });

        it('should hide sphere helper when set to false', () => {
            boundingBox.setSphereHelperVisible(true);
            boundingBox.setSphereHelperVisible(false);

            expect(sphereHelper.visible).toBe(false);
        });

        it('should toggle sphere helper visibility', () => {
            boundingBox.setSphereHelperVisible(true);
            expect(sphereHelper.visible).toBe(true);

            boundingBox.setSphereHelperVisible(false);
            expect(sphereHelper.visible).toBe(false);
        });
    });

    describe('multiple objects', () => {
        /** Two unit cubes, four units apart on X. */
        const twoSeparatedCubes = (): Object3D[] => {
            const left = new Mesh(new BoxGeometry(1, 1, 1));
            left.position.set(-2, 0, 0);

            const right = new Mesh(new BoxGeometry(1, 1, 1));
            right.position.set(2, 0, 0);

            return [left, right];
        };

        it('should encompass every object it is given', () => {
            const [left, right] = twoSeparatedCubes();

            const combined = new BoundingBox([left, right]);

            // -2.5 .. 2.5 on X, -0.5 .. 0.5 on Y and Z
            expect(combined.size.x).toBeCloseTo(5);
            expect(combined.size.y).toBeCloseTo(1);
            expect(combined.size.z).toBeCloseTo(1);
            expect(combined.center.x).toBeCloseTo(0);
        });

        it('should be wider than a box around a single one of them', () => {
            const [left, right] = twoSeparatedCubes();

            const single = new BoundingBox(left);
            const combined = new BoundingBox([left, right]);

            expect(combined.size.x).toBeGreaterThan(single.size.x);
            expect(combined.radius).toBeGreaterThan(single.radius);
        });

        it('should encompass every object for axis-aligned boxes as well', () => {
            const [left, right] = twoSeparatedCubes();

            const combined = new BoundingBox([left, right], true);

            expect(combined.size.x).toBeCloseTo(5);
            expect(combined.center.x).toBeCloseTo(0);
        });

        it('should treat a single element array like the object itself', () => {
            const fromArray = new BoundingBox([mockObject]);
            const fromObject = new BoundingBox(mockObject);

            expect(fromArray.size).toEqual(fromObject.size);
            expect(fromArray.center).toEqual(fromObject.center);
            expect(fromArray.radius).toBe(fromObject.radius);
        });

        it('should adopt the rotation of a single object', () => {
            mockObject.rotation.set(0, Math.PI / 4, 0);

            const boundingBox = new BoundingBox([mockObject]);

            expect(boundingBox.rotation.y).toBeCloseTo(Math.PI / 4);
        });

        it('should stay unrotated for several objects, which share no orientation', () => {
            const [left, right] = twoSeparatedCubes();
            left.rotation.set(0, Math.PI / 4, 0);
            right.rotation.set(0, -Math.PI / 3, 0);

            const combined = new BoundingBox([left, right]);

            expect(combined.rotation.x).toBe(0);
            expect(combined.rotation.y).toBe(0);
            expect(combined.rotation.z).toBe(0);
        });

        it('should not build an invalid sphere helper for an empty list', () => {
            const boundingBox = new BoundingBox([]);

            expect(boundingBox.box.isEmpty()).toBe(true);
            expect(() =>
                boundingBox.setSphereHelperVisible(true),
            ).not.toThrow();
        });
    });

    describe('axis-aligned vs oriented bounding box', () => {
        it('should use expandByObject for axis-aligned bounding box', () => {
            const expandByObjectSpy = vi.spyOn(
                Box3.prototype,
                'expandByObject',
            );
            const boundingBox = new BoundingBox(mockObject, true);

            expect(boundingBox).toBeDefined();
            expect(expandByObjectSpy).toHaveBeenCalledWith(mockObject);
        });

        it('should use traverse and geometry manipulation for oriented bounding box', () => {
            const traverseSpy = vi.spyOn(mockObject, 'traverse');
            const updateWorldMatrixSpy = vi.spyOn(
                mockObject,
                'updateWorldMatrix',
            );
            const boundingBox = new BoundingBox(mockObject, false);

            expect(boundingBox).toBeDefined();
            expect(traverseSpy).toHaveBeenCalled();
            expect(updateWorldMatrixSpy).toHaveBeenCalledWith(true, true);
        });

        it('should handle geometry cloning and transformation for oriented bounding box', () => {
            const traverseSpy = vi.spyOn(mockObject, 'traverse');
            const boundingBox = new BoundingBox(mockObject, false);

            expect(boundingBox).toBeDefined();
            expect(traverseSpy).toHaveBeenCalled();
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
            const nullGeometryMesh = new Mesh(new BoxGeometry(1, 1, 1));
            nullGeometryMesh.geometry = {
                computeBoundingBox: vi.fn(),
                boundingBox: null,
            } as any;
            const boundingBox = new BoundingBox(nullGeometryMesh);

            expect(boundingBox).toBeDefined();
            expect(boundingBox.box).toBeDefined();
        });

        it('should handle objects with undefined bounding box', () => {
            const meshWithoutBoundingBox = new Mesh(new BoxGeometry(1, 1, 1));
            meshWithoutBoundingBox.geometry = {
                computeBoundingBox: vi.fn(),
                boundingBox: undefined,
            } as any;
            const boundingBox = new BoundingBox(meshWithoutBoundingBox);

            expect(boundingBox).toBeDefined();
            expect(boundingBox.box).toBeDefined();
        });

        it('should handle color representation as string', () => {
            const boundingBox = new BoundingBox(mockObject, false, '#ff0000');
            const boxHelper = boundingBox.children[0] as Box3Helper;
            const sphereHelper = boundingBox.children[1] as Mesh;
            const sphereMaterial = sphereHelper.material as MeshBasicMaterial;

            expect(boundingBox).toBeDefined();
            expect((boxHelper.material as any).color.getHex()).toBe(0xff0000);
            expect(sphereMaterial.color.getHex()).toBe(0xff0000);
        });

        it('should handle color representation as number', () => {
            const boundingBox = new BoundingBox(mockObject, false, 0xff0000);
            const boxHelper = boundingBox.children[0] as Box3Helper;
            const sphereHelper = boundingBox.children[1] as Mesh;
            const sphereMaterial = sphereHelper.material as MeshBasicMaterial;

            expect(boundingBox).toBeDefined();
            expect((boxHelper.material as any).color.getHex()).toBe(0xff0000);
            expect(sphereMaterial.color.getHex()).toBe(0xff0000);
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
