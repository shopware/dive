/**
 * Interface for objects that can be moved in the scene.
 *
 * @module
 */
export declare class DIVEMovable {
    readonly isMovable: true;
    onMoveStart?(): void;
    onMove?(): void;
    onMoveEnd?(): void;
}
