import { Object3D } from 'three';
import { COMMaterial } from '../../modules/state/types/index.ts';
import { DIVENode } from '../node/Node';
/**
 * A basic model class.
 *
 * It does calculate it's own bounding box which is used for positioning on the floor.
 *
 * Can be moved and selected.
 *
 * @module
 */
export declare class DIVEModel extends DIVENode {
    readonly isDIVEModel: true;
    private _mesh;
    private _material;
    SetModel(gltf: Object3D): void;
    SetMaterial(material: Partial<COMMaterial>): void;
    PlaceOnFloor(): void;
    DropIt(): void;
}
