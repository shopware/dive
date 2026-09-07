import {
    Mesh,
    MeshStandardMaterial,
    type BufferGeometry,
    type Material,
    type Texture,
} from 'three/webgpu';
import { DIVEComponent } from '../../engine/component/Component.ts';
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
 * Contributes its content to the node rather than parenting it, and tracks
 * exactly what it contributed -- so replacing the content leaves the node's child
 * nodes and every other component's content alone.
 *
 * @module
 */
export abstract class MeshComponent extends DIVEComponent {
    readonly isMeshComponent: true = true;

    protected _mesh: Mesh | null = null;
    protected _material: MeshStandardMaterial | null = null;

    /**
     * Whether the material came from {@link setMaterial} rather than from content.
     *
     * A configured material outranks whatever an asset brings, and it has to
     * survive a load that happens afterwards -- `setMaterial` before `setFromURL`
     * is the ordinary case, since the caller has the schema before the file. Only
     * the origin distinguishes the two: a material adopted from a previous load
     * must not be pushed onto the next one.
     */
    protected _materialIsOwn: boolean = false;

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

        this._materialIsOwn = true;

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

    /**
     * Takes on the source's material, if the source configured one itself.
     *
     * Only a material from {@link setMaterial} is copied: one adopted from loaded
     * content belongs to that content, and the clone gets its own when it loads.
     * Copied into a fresh material rather than shared, so disposing either
     * component cannot take the other's material with it.
     *
     * @param source - The component to copy from.
     */
    public copy(source: this): this {
        super.copy(source);

        if (!source._materialIsOwn || !source._material) return this;

        if (!this._material) this._material = new MeshStandardMaterial();
        this._material.copy(source._material);
        this._materialIsOwn = true;

        if (this._mesh) this._mesh.material = this._material;

        return this;
    }

    /**
     * Frees everything the content this component contributed is made of.
     *
     * The policy, because releasing GPU memory needs one: a mesh component owns
     * the geometries, materials and textures of what it put into the node. Those
     * are produced per load -- the asset cache holds file bytes, not parsed
     * results -- so nothing here is shared with another component and there is
     * nothing to leave behind for someone else.
     *
     * Collected before anything is freed, and collected in sets: three allows a
     * mesh to carry `Material[]`, one glTF can point several meshes at the same
     * material, and several materials at the same texture. Disposing twice is
     * harmless in three, but counting once makes the intent checkable.
     */
    public dispose(): void {
        const geometries = new Set<BufferGeometry>();
        const materials = new Set<Material>();

        // over what this component put into the node, this.traverse finds nothing
        this.contributions.forEach((object) =>
            object.traverse((child) => {
                const mesh = child as Mesh;

                if (mesh.geometry) geometries.add(mesh.geometry);
                if (Array.isArray(mesh.material)) {
                    mesh.material.forEach((material) =>
                        materials.add(material),
                    );
                } else if (mesh.material) {
                    materials.add(mesh.material);
                }
            }),
        );

        // a material set before any content arrived sits on no mesh yet
        if (this._material) materials.add(this._material);

        const textures = new Set<Texture>();
        materials.forEach((material) => {
            Object.values(material).forEach((value: unknown) => {
                if ((value as Texture | null)?.isTexture) {
                    textures.add(value as Texture);
                }
            });
        });

        geometries.forEach((geometry) => geometry.dispose());
        materials.forEach((material) => material.dispose());
        textures.forEach((texture) => texture.dispose());
    }
}
