import { Box3, Object3D } from 'three/webgpu';
import { DIVEFloor } from '../floor/Floor.ts';

/**
 * A basic scene node to hold grid, floor and all lower level roots.
 *
 * It holds objects, it does not interpret them: turning entity data into
 * scene objects is the state plugin's job and lives in its `EngineGateway`.
 *
 * @module
 */

export class DIVERoot extends Object3D {
    readonly isDIVERoot: true = true;

    public get floor(): DIVEFloor {
        return this._floor;
    }

    private _floor: DIVEFloor;

    constructor() {
        super();
        this.name = 'Root';

        this._floor = new DIVEFloor();
        this.add(this._floor);
    }

    public computeSceneBB(): Box3 {
        const bb = new Box3();
        this.children.forEach((object) => {
            if ('isDIVEFloor' in object) return;
            object.traverse((child) => {
                if ('isObject3D' in child) {
                    bb.expandByObject(child);
                }
            });
        });
        return bb;
    }
}
