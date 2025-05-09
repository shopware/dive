import { Object3D } from 'three';
import { COMMaterial } from '../../modules/state/types/index.ts';
import { DIVENode } from '../node/Node.ts';
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
    private _assetLoader;
    private _getAssetLoader;
    setFromURL(url: string): Promise<void>;
    setFromGLTF(gltf: Object3D): void;
    setMaterial(material: Partial<COMMaterial>): void;
    placeOnFloor(): void;
    dropIt(): void;
}
