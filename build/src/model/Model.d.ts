import { GLTF } from 'three/examples/jsm/loaders/GLTFLoader';
import { COMMaterial } from '../com/types';
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
    SetModel(gltf: GLTF): void;
    SetMaterial(material: Partial<COMMaterial>): void;
    PlaceOnFloor(): void;
    DropIt(): void;
}
