import { DIVENode } from '../node/Node.ts';
import { COMGeometry, COMMaterial } from '../../modules/state/types/index.ts';
/**
 * A basic model class.
 *
 * It does calculate it's own bounding box which is used for positioning on the floor.
 *
 * Can be moved and selected.
 *
 * @module
 */
export declare class DIVEPrimitive extends DIVENode {
    readonly isDIVEPrimitive: true;
    private _mesh;
    constructor();
    setGeometry(geometry: COMGeometry): void;
    setMaterial(material: Partial<COMMaterial>): void;
    placeOnFloor(): void;
    dropIt(): void;
    private assembleGeometry;
    private createCylinderGeometry;
    private createSphereGeometry;
    private createPyramidGeometry;
    private createBoxGeometry;
    private createConeGeometry;
    private createWallGeometry;
    private createPlaneGeometry;
}
