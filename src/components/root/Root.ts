import { type Box3, Object3D } from 'three/webgpu';
import { computeProductBounds } from '../../helpers/computeProductBounds/computeProductBounds.ts';
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

    /**
     * The world bounding box of everything the scene actually contains.
     *
     * Helpers, gizmo handles and the floor are excluded by their layer, so no
     * per-class exceptions are needed here.
     */
    public computeSceneBB(): Box3 {
        return computeProductBounds(this);
    }
}
