import {
    BoxGeometry,
    BufferAttribute,
    BufferGeometry,
    ConeGeometry,
    CylinderGeometry,
    Mesh,
    MeshStandardMaterial,
} from 'three/webgpu';
import { SphereGeometry } from 'three/webgpu';
import { PRODUCT_LAYER_MASK } from '../../../constants/VisibilityLayerMask.ts';
import { MeshComponent } from '../MeshComponent.ts';
import { type DIVEGeometry } from '../../../types/geometry/DIVEGeometry.ts';

/**
 * How round a sphere gets.
 *
 * `256 × 256` built 130 560 triangles, and `Mesh.raycast` has no acceleration
 * structure: once the pointer is over the sphere it tests every one of them. That
 * measured 8 ms per raycast, and the toolbox raycasts on every `pointermove` — so
 * dragging the camera across a sphere saturated the main thread.
 *
 * `64 × 32` is 3 968 triangles and 0.24 ms, thirty times cheaper, and at product
 * scale not tellable apart from the old one.
 */
const SPHERE_WIDTH_SEGMENTS = 64;
const SPHERE_HEIGHT_SEGMENTS = 32;

/**
 * Procedurally generated geometry, built from a {@link DIVEGeometry} descriptor.
 *
 * Extends {@link MeshComponent} so material handling is shared -- and so
 * `getComponent(MeshComponent)` finds it, which is what lets one code path apply
 * materials to models and primitives alike.
 *
 * @module
 */
export class PrimitiveComponent extends MeshComponent {
    readonly isPrimitiveComponent: true = true;

    /**
     * The shape this component was last built from.
     *
     * Kept because the built `BufferGeometry` cannot be handed to a clone -- both
     * would dispose it -- while the descriptor rebuilds it for free.
     */
    private _geometry: DIVEGeometry | null = null;

    constructor() {
        super();

        this.name = 'PrimitiveComponent';

        this._material = new MeshStandardMaterial();

        this._mesh = new Mesh(new BufferGeometry(), this._material);
        this._mesh.name = 'PrimitiveMesh';
        this._mesh.layers.mask = PRODUCT_LAYER_MASK;
        this._mesh.castShadow = true;
        this._mesh.receiveShadow = true;
        this.contribute(this._mesh);
    }

    /** The shape this component was last built from, if any. */
    public get geometry(): DIVEGeometry | null {
        return this._geometry;
    }

    /**
     * Rebuilds the geometry from a descriptor.
     *
     * @param geometry - The shape to build.
     */
    public setGeometry(geometry: DIVEGeometry): void {
        const geo = this._assembleGeometry(geometry);
        if (!geo) return;

        this._geometry = geometry;

        geo.computeVertexNormals();
        geo.computeBoundingBox();
        geo.computeBoundingSphere();

        this._mesh!.geometry.dispose();
        this._mesh!.geometry = geo;
    }

    /**
     * Rebuilds the source's shape, rather than sharing the geometry it built.
     *
     * @param source - The component to copy from.
     */
    public copy(source: this): this {
        super.copy(source);

        if (source.geometry) this.setGeometry(source.geometry);

        return this;
    }

    private _assembleGeometry(geometry: DIVEGeometry): BufferGeometry | null {
        // reset material to smooth shading
        this._material!.flatShading = false;

        switch (geometry.name.toLowerCase()) {
            case 'cylinder':
                return this._createCylinderGeometry(geometry);
            case 'sphere':
                return this._createSphereGeometry(geometry);
            case 'pyramid':
                // set material to flat shading for pyramid
                this._material!.flatShading = true;
                return this._createPyramidGeometry(geometry);
            case 'cube':
            case 'box':
            case 'plane':
                return this._createBoxGeometry(geometry);
            case 'cone':
                return this._createConeGeometry(geometry);
            case 'wall':
                return this._createWallGeometry(geometry);
            default: {
                console.warn(
                    'PrimitiveComponent.setGeometry: Invalid geometry type:',
                    geometry.name.toLowerCase(),
                );
                return null;
            }
        }
    }

    private _createCylinderGeometry(geometry: DIVEGeometry): BufferGeometry {
        const geo = new CylinderGeometry(
            geometry.width / 2,
            geometry.width / 2,
            geometry.height,
            64,
        );
        geo.translate(0, geometry.height / 2, 0);
        return geo;
    }

    private _createSphereGeometry(geometry: DIVEGeometry): BufferGeometry {
        return new SphereGeometry(
            geometry.width / 2,
            SPHERE_WIDTH_SEGMENTS,
            SPHERE_HEIGHT_SEGMENTS,
        );
    }

    private _createPyramidGeometry(geometry: DIVEGeometry): BufferGeometry {
        const vertices = new Float32Array([
            -geometry.width / 2,
            0,
            -geometry.depth / 2, // 0
            geometry.width / 2,
            0,
            -geometry.depth / 2, // 1
            geometry.width / 2,
            0,
            geometry.depth / 2, // 2
            -geometry.width / 2,
            0,
            geometry.depth / 2, // 3
            0,
            geometry.height,
            0,
        ]);

        const indices = new Uint16Array([
            0, 1, 2, 0, 2, 3, 0, 4, 1, 1, 4, 2, 2, 4, 3, 3, 4, 0,
        ]);

        const geometryBuffer = new BufferGeometry();
        geometryBuffer.setAttribute(
            'position',
            new BufferAttribute(vertices, 3),
        );
        geometryBuffer.setIndex(new BufferAttribute(indices, 1));
        return geometryBuffer;
    }

    private _createBoxGeometry(geometry: DIVEGeometry): BufferGeometry {
        const geo = new BoxGeometry(
            geometry.width,
            geometry.height,
            geometry.depth,
        );
        geo.translate(0, geometry.height / 2, 0);
        return geo;
    }

    private _createConeGeometry(geometry: DIVEGeometry): BufferGeometry {
        const geo = new ConeGeometry(geometry.width / 2, geometry.height, 256);
        geo.translate(0, geometry.height / 2, 0);
        return geo;
    }

    private _createWallGeometry(geometry: DIVEGeometry): BufferGeometry {
        const geo = new BoxGeometry(
            geometry.width,
            geometry.height,
            geometry.depth || 0.05,
            16,
        );
        geo.translate(0, geometry.height / 2, 0);
        return geo;
    }
}
