import { type Box3 } from 'three/webgpu';
import { computeProductBounds } from '../../helpers/computeProductBounds/computeProductBounds.ts';
import { FloorComponent } from '../mesh/floor/FloorComponent.ts';
import { DIVENode } from '../node/Node.ts';

/**
 * The scene node every entity hangs off, and the owner of the ground plane.
 *
 * It holds objects, it does not interpret them: turning entity data into
 * scene objects is the state plugin's job and lives in its `EngineGateway`.
 *
 * @module
 */
export class DIVERoot extends DIVENode {
    readonly isDIVERoot: true = true;

    /**
     * The ground plane component.
     *
     * Kept as a named accessor because scene settings address the floor
     * directly, rather than as an entity.
     */
    public get floor(): FloorComponent {
        return this.requireComponent(FloorComponent);
    }

    constructor() {
        super();
        this.name = 'Root';

        this.addComponent(new FloorComponent());
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
