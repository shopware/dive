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
import { PRODUCT_LAYER_MASK } from '../../constants/VisibilityLayerMask.ts';
import { MeshComponent } from './MeshComponent.ts';
import { type DIVEGeometry } from '../../types/geometry/DIVEGeometry.ts';

/**
 * Procedurally generated geometry, built from a {@link DIVEGeometry} descriptor.
 *
 * Extends {@link MeshComponent} so material handling is shared -- and so
 * `getComponent(MeshComponent)` finds it, which is what lets one code path apply
 * materials to models and primitives alike.
 *
 * @module
 */
export class PrimitiveMeshComponent extends MeshComponent {
    readonly isPrimitiveMeshComponent: true = true;

    constructor() {
        super();

        this.name = 'PrimitiveMeshComponent';

        this._material = new MeshStandardMaterial();

        this._mesh = new Mesh(new BufferGeometry(), this._material);
        this._mesh.name = 'PrimitiveMesh';
        this._mesh.layers.mask = PRODUCT_LAYER_MASK;
        this._mesh.castShadow = true;
        this._mesh.receiveShadow = true;
        this.add(this._mesh);
    }

    /**
     * Rebuilds the geometry from a descriptor.
     *
     * @param geometry - The shape to build.
     */
    public setGeometry(geometry: DIVEGeometry): void {
        const geo = this._assembleGeometry(geometry);
        if (!geo) return;

        geo.computeVertexNormals();
        geo.computeBoundingBox();
        geo.computeBoundingSphere();

        this._mesh!.geometry.dispose();
        this._mesh!.geometry = geo;
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
                    'PrimitiveMeshComponent.setGeometry: Invalid geometry type:',
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
        return new SphereGeometry(geometry.width / 2, 256, 256);
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
