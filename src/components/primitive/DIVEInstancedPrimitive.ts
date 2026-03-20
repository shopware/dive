import { DIVEPrimitive, type GeometrySchema } from '@shopware-ag/dive';
import { Euler, InstancedMesh, Matrix4, Quaternion, Vector3, Vector3Like } from 'three';

export type InstancedMeshOptions = Partial<{ position: Vector3Like, rotation: Vector3Like, scale: Vector3Like | number }>

export interface DIVEMeshInstance {
    get position(): Vector3Like;
    setPosition(position: Vector3Like): void;
    setRotation(rotation: Vector3Like): void;
    setScale(scale: Vector3Like): void;
}

class MeshInstance implements DIVEMeshInstance {
    private _parent: DIVEInstancedPrimitive;
    private _pos: Vector3;
    private _rotation: Quaternion;
    private _scale: Vector3;
    private readonly _mat4: Matrix4;

    constructor(of: DIVEInstancedPrimitive, { position, rotation, scale }: InstancedMeshOptions = {}) {
        this._parent = of;
        this._mat4 = new Matrix4();
        this._pos = new Vector3(position?.x, position?.y, position?.z);
        this._rotation = new Quaternion().setFromEuler(new Euler(rotation?.x, rotation?.y, rotation?.z));
        if (typeof scale === 'number') {
            this._scale = new Vector3(scale, scale, scale);
        } else {
            this._scale = new Vector3(scale?.x, scale?.y, scale?.z);
        }
        this._updateMatrix();
    }

    private _updateMatrix(): void {
        this._mat4.compose(
            this._pos,
            this._rotation,
            this._scale,
        )
    }

    public get position(): Vector3Like {
        return this._pos.clone();
    }

    public setPosition(position: Vector3Like): void {
        this._pos = new Vector3(position?.x, position?.y, position?.z);
        this._updateMatrix();
        this._parent._updateInstance(this);
    }

    public setRotation(rotation: Vector3Like): void {
        this._rotation = new Quaternion().setFromEuler(new Euler(rotation?.x, rotation?.y, rotation?.z));
        this._updateMatrix();
        this._parent._updateInstance(this);
    }

    public setScale(scale: Vector3Like | number): void {
        if (typeof scale === 'number') {
            this._scale = new Vector3(scale, scale, scale);
        } else {
            this._scale = new Vector3(scale?.x, scale?.y, scale?.z);
        }
        this._updateMatrix();
        this._parent._updateInstance(this);
    }

    public getMatrix(): Matrix4 {
        return this._mat4;
    }
}

export class DIVEInstancedPrimitive extends DIVEPrimitive {
    private _instancedMesh: InstancedMesh;
    private _instanceCapacity: number;
    private _instances: MeshInstance[] = [];

    constructor({ initialCapacity = 256 }: Partial<{ initialCapacity: number }> = {}) {
        super();
        this._instanceCapacity = initialCapacity;

        this.remove(this._mesh);
        this._instancedMesh = new InstancedMesh(
            this._mesh.geometry,
            this._mesh.material,
            initialCapacity
        )
        this.add(this._instancedMesh);
    }

    private updateCapacity(capacity: number): void {
        this._instanceCapacity = capacity;
        this._instancedMesh = new InstancedMesh(
            this._mesh.geometry,
            this._mesh.material,
            capacity
        )
    }

    public setGeometry(geometry: GeometrySchema): void {
        const geo = this.assembleGeometry(geometry);
        if (!geo) return;

        geo.computeVertexNormals();
        geo.computeBoundingBox();
        geo.computeBoundingSphere();
        this._instancedMesh.geometry = geo;
    }

    public createInstances(meshOptions: InstancedMeshOptions[]): DIVEMeshInstance[] {
        let newCapacity = this._instanceCapacity;
        while (this._instances.length + meshOptions.length > newCapacity) newCapacity *= 2;
        if (newCapacity != this._instanceCapacity) {
            this.updateCapacity(newCapacity);
        }

        const meshes = meshOptions.map(p => new MeshInstance(this, p));
        const prevCount = this._instances.length;
        for (let i = prevCount; i < prevCount + meshOptions.length; i++) {
            this._instancedMesh.setMatrixAt(i, meshes[i].getMatrix());
            this._instances.push(meshes[i]);
        }
        this._instancedMesh.count = this._instances.length;
        this._instancedMesh.instanceMatrix.needsUpdate = true;
        return meshes;
    }

    public _updateInstance(mesh: MeshInstance): void {
        const index = this._instances.indexOf(mesh);
        if (index < 0) return;

        this._instancedMesh.setMatrixAt(index, mesh.getMatrix());

        this._instancedMesh.instanceMatrix.needsUpdate = true;
    }

    public removeAllInstances(): void {
        this._instancedMesh.count = 0;
        this._instances = [];
        this._instancedMesh.instanceMatrix.needsUpdate = true;
    }
}