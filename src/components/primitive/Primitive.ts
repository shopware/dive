import {
    BoxGeometry,
    BufferAttribute,
    BufferGeometry,
    ConeGeometry,
    CylinderGeometry,
    Mesh,
    MeshStandardMaterial,
    SphereGeometry,
} from 'three';
import { PRODUCT_LAYER_MASK } from '../../constants/VisibilityLayerMask.ts';
import { DIVEModel } from '../model/Model.ts';
import { type GeometrySchema } from '../../types/index.ts';

/**
 * A basic model class.
 *
 * It does calculate it's own bounding box which is used for positioning on the floor.
 *
 * Can be moved and selected.
 *
 * @module
 */
export class DIVEPrimitive extends DIVEModel {
    readonly isDIVEPrimitive: true = true;

    protected _mesh: Mesh;
    protected _material: MeshStandardMaterial;

    constructor() {
        super();

        this._mesh = new Mesh();
        this._mesh.name = 'PrimitiveMesh';
        this._mesh.layers.mask = PRODUCT_LAYER_MASK;
        this._mesh.castShadow = true;
        this._mesh.receiveShadow = true;
        this.add(this._mesh);

        this._material = new MeshStandardMaterial();
        this._mesh.material = this._material;
    }

    public setGeometry(geometry: GeometrySchema): void {
        const geo = this.assembleGeometry(geometry);
        if (!geo) return;

        geo.computeVertexNormals();
        geo.computeBoundingBox();
        geo.computeBoundingSphere();
        this._mesh.geometry = geo;
        this._boundingBox.setFromObject(this._mesh);
    }

    protected assembleGeometry(geometry: GeometrySchema): BufferGeometry | null {
        // reset material to smooth shading
        this._material.flatShading = false;

        switch (geometry.name.toLowerCase()) {
            case 'cylinder':
                return this.createCylinderGeometry(geometry);
            case 'sphere':
                return this.createSphereGeometry(geometry);
            case 'pyramid':
                // set material to flat shading for pyramid
                this._material.flatShading = true;
                return this.createPyramidGeometry(geometry);
            case 'cube':
            case 'box':
                return this.createBoxGeometry(geometry);
            case 'cone':
                return this.createConeGeometry(geometry);
            case 'wall':
                return this.createWallGeometry(geometry);
            case 'plane':
                return this.createPlaneGeometry(geometry);
            default: {
                console.warn(
                    'DIVEPrimitive.assembleGeometry: Invalid geometry type:',
                    geometry.name.toLowerCase(),
                );
                return null;
            }
        }
    }

    private createCylinderGeometry(geometry: GeometrySchema): BufferGeometry {
        const geo = new CylinderGeometry(
            geometry.width / 2,
            geometry.width / 2,
            geometry.height,
            64,
        );
        geo.translate(0, geometry.height / 2, 0);
        return geo;
    }

    private createSphereGeometry(geometry: GeometrySchema): BufferGeometry {
        const geo = new SphereGeometry(geometry.width / 2, 256, 256);
        return geo;
    }

    private createPyramidGeometry(geometry: GeometrySchema): BufferGeometry {
        // prettier-multiline-arrays-next-line-pattern: 3
        const vertices = new Float32Array([
            -geometry.width / 2, 0, -geometry.depth / 2, // 0
            geometry.width / 2, 0, -geometry.depth / 2, // 1
            geometry.width / 2, 0, geometry.depth / 2, // 2
            -geometry.width / 2, 0, geometry.depth / 2, // 3
            0, geometry.height, 0,
        ]);

        // prettier-multiline-arrays-next-line-pattern: 3
        const indices = new Uint16Array([
            0, 1, 2,
            0, 2, 3,
            0, 4, 1,
            1, 4, 2,
            2, 4, 3,
            3, 4, 0,
        ]);

        const geometryBuffer = new BufferGeometry();
        geometryBuffer.setAttribute(
            'position',
            new BufferAttribute(vertices, 3),
        );
        geometryBuffer.setIndex(new BufferAttribute(indices, 1));
        return geometryBuffer;
    }

    private createBoxGeometry(geometry: GeometrySchema): BufferGeometry {
        const geo = new BoxGeometry(
            geometry.width,
            geometry.height,
            geometry.depth,
        );
        geo.translate(0, geometry.height / 2, 0);
        return geo;
    }

    private createConeGeometry(geometry: GeometrySchema): BufferGeometry {
        const geo = new ConeGeometry(geometry.width / 2, geometry.height, 256);
        geo.translate(0, geometry.height / 2, 0);
        return geo;
    }

    private createWallGeometry(geometry: GeometrySchema): BufferGeometry {
        const geo = new BoxGeometry(
            geometry.width,
            geometry.height,
            geometry.depth || 0.05,
            16,
        );
        geo.translate(0, geometry.height / 2, 0);
        return geo;
    }

    private createPlaneGeometry(geometry: GeometrySchema): BufferGeometry {
        const geo = new BoxGeometry(
            geometry.width,
            geometry.height,
            geometry.depth,
        );
        geo.translate(0, geometry.height / 2, 0);
        return geo;
    }
}
