/**
 * Interface for objects that can be moved in the scene.
 *
 * @module
 */

export class DIVEMovable {
    readonly isMovable: true = true;
    public onMoveStart?(): void;
    public onMove?(): void;
    public onMoveEnd?(): void;
}
