import { Mesh, MeshStandardMaterial } from 'three/webgpu';
import { DIVEComponent } from '../component/Component.ts';
import { type DIVEMaterial } from '../../types/material/DIVEMaterial.ts';

/**
 * Base for every component that owns a mesh and its material.
 *
 * Holds only what a mesh needs whatever produced it: the mesh, the material, and
 * {@link setMaterial}. Where the geometry comes from is the subclass's business --
 * {@link ModelComponent} loads it, {@link PrimitiveComponent} builds it, and
 * {@link FloorComponent} is one fixed plane. That split exists because those two
 * loading methods used to live here, which meant a primitive and a floor
 * inherited a `setFromGLTF` that would have overwritten their node's transform
 * with a glTF root's.
 *
 * Abstract, because a mesh component that owns no mesh has nothing to offer: the
 * subclass is what puts one there.
 *
 * Owns its content as *its own* children rather than putting it in the node's, so
 * replacing the content leaves the node's other components alone.
 *
 * @module
 */
export abstract class MeshComponent extends DIVEComponent {
    readonly isMeshComponent: true = true;

    protected _mesh: Mesh | null = null;
    protected _material: MeshStandardMaterial | null = null;

    /** The first mesh found in the content, if any. */
    public get mesh(): Mesh | null {
        return this._mesh;
    }

    /** The material shared across the content, if one was set or found. */
    public get material(): MeshStandardMaterial | null {
        return this._material;
    }

    /**
     * Applies material properties, creating a material if there is none yet.
     *
     * @param material - The properties to apply.
     */
    public setMaterial(material: Partial<DIVEMaterial>): void {
        if (!this._material) {
            this._material = new MeshStandardMaterial();
        }

        if (material.vertexColors !== undefined) {
            this._material.vertexColors = material.vertexColors;
        }

        if (material.color !== undefined) {
            this._material.color.set(material.color);
        }

        if (material.map !== undefined) {
            this._material.map = material.map;
        }

        if (material.normalMap !== undefined) {
            this._material.normalMap = material.normalMap;
        }

        // a roughness map takes over, so the scalar has to be neutral
        if (material.roughness !== undefined) {
            this._material.roughness = material.roughness;
        }

        if (material.roughnessMap !== undefined) {
            this._material.roughnessMap = material.roughnessMap;

            if (this._material.roughnessMap) {
                this._material.roughness = 1.0;
            }
        }

        // same for metalness
        if (material.metalness !== undefined) {
            this._material.metalness = material.metalness;
        }

        if (material.metalnessMap !== undefined) {
            this._material.metalnessMap = material.metalnessMap;

            if (this._material.metalnessMap) {
                this._material.metalness = 1.0;
            }
        }

        if (this._mesh) {
            this._mesh.material = this._material;
        }
    }

    public dispose(): void {
        this.traverse((child) => {
            const mesh = child as Mesh;
            mesh.geometry?.dispose();
        });

        this._material?.dispose();
    }
}
