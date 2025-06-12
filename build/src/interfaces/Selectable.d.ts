/**
 * Interface for objects that can be selected in the scene.
 *
 * @module
 */
export declare class DIVESelectable {
    readonly isSelectable: true;
    onSelect?(): void;
    onDeselect?(): void;
}
