import { Box3, Object3D, Sphere, Vector3, ColorRepresentation } from 'three';
import { DIVENode } from '../node/Node.ts';
/**
 * A bounding box component that provides both axis-aligned and oriented bounding boxes
 * along with bounding spheres for 3D objects.
 *
 * The BoundingBox class extends DIVENode and creates visual representations of the
 * bounding volumes of 3D objects. It supports two modes:
 * - **Axis-aligned bounding box (AABB)**: Aligned with the world coordinate system
 * - **Oriented bounding box (OBB)**: Aligned with the object's local coordinate system
 *
 * The class also automatically computes a bounding sphere that encompasses the entire object.
 * Both the bounding box and sphere can be visualized as wireframe helpers.
 *
 * @example
 * ```typescript
 * // Create a bounding box for a 3D object
 * const mesh = new Mesh(geometry, material);
 * const boundingBox = new BoundingBox(mesh, false, 0x00ff00);
 *
 * // Show the bounding box wireframe
 * boundingBox.setBoxHelperVisible(true);
 *
 * // Access bounding box properties
 * console.log('Center:', boundingBox.center);
 * console.log('Size:', boundingBox.size);
 * console.log('Radius:', boundingBox.radius);
 * ```
 *
 * @example
 * ```typescript
 * // Create an axis-aligned bounding box
 * const aabb = new BoundingBox(mesh, true, 0xff0000);
 *
 * // Show the bounding sphere wireframe
 * aabb.setSphereHelperVisible(true);
 * ```
 */
export declare class BoundingBox extends DIVENode {
    /** The computed bounding box (Box3) */
    private _box;
    /** The computed bounding sphere (Sphere) */
    private _sphere;
    /** The center point of the bounding box */
    private _center;
    /** The radius of the bounding sphere */
    private _radius;
    /** Visual helper for the bounding box wireframe */
    private _boxHelper;
    /** Visual helper for the bounding sphere wireframe */
    private _sphereHelper;
    /** The dimensions (width, height, depth) of the bounding box */
    private _size;
    /**
     * Gets the computed bounding box.
     * @returns The Box3 instance representing the bounding box
     */
    get box(): Box3;
    /**
     * Gets the computed bounding sphere.
     * @returns The Sphere instance representing the bounding sphere
     */
    get sphere(): Sphere;
    /**
     * Gets the center point of the bounding box.
     * @returns A Vector3 representing the center coordinates
     */
    get center(): Vector3;
    /**
     * Gets the radius of the bounding sphere.
     * @returns The radius as a number
     */
    get radius(): number;
    /**
     * Gets the dimensions of the bounding box.
     * @returns A Vector3 representing width, height, and depth
     */
    get size(): Vector3;
    /**
     * Creates a new BoundingBox instance for the specified 3D object.
     *
     * The constructor computes both a bounding box and bounding sphere for the given object.
     * It handles complex objects with multiple meshes and nested transformations.
     *
     * @param object - The 3D object to compute bounding volumes for
     * @param axisAligned - Whether to create an axis-aligned bounding box (true) or oriented bounding box (false). Defaults to false.
     * @param wireframeColor - The color for the wireframe helpers. Can be a hex number or ColorRepresentation. Defaults to green (0x00ff00).
     *
     * @example
     * ```typescript
     * // Create an oriented bounding box (aligned with object's rotation)
     * const obb = new BoundingBox(mesh, false, 0x00ff00);
     *
     * // Create an axis-aligned bounding box (aligned with world coordinates)
     * const aabb = new BoundingBox(mesh, true, 0xff0000);
     *
     * // Use default green color
     * const defaultBox = new BoundingBox(mesh);
     * ```
     */
    constructor(object: Object3D, axisAligned?: boolean, wireframeColor?: ColorRepresentation | number);
    /**
     * Sets the visibility of the bounding box wireframe helper.
     *
     * @param visible - Whether the box helper should be visible
     *
     * @example
     * ```typescript
     * const boundingBox = new BoundingBox(mesh);
     *
     * // Show the bounding box wireframe
     * boundingBox.setBoxHelperVisible(true);
     *
     * // Hide the bounding box wireframe
     * boundingBox.setBoxHelperVisible(false);
     * ```
     */
    setBoxHelperVisible(visible: boolean): void;
    /**
     * Sets the visibility of the bounding sphere wireframe helper.
     *
     * @param visible - Whether the sphere helper should be visible
     *
     * @example
     * ```typescript
     * const boundingBox = new BoundingBox(mesh);
     *
     * // Show the bounding sphere wireframe
     * boundingBox.setSphereHelperVisible(true);
     *
     * // Hide the bounding sphere wireframe
     * boundingBox.setSphereHelperVisible(false);
     * ```
     */
    setSphereHelperVisible(visible: boolean): void;
}
