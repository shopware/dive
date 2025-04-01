/**
 * Interface for objects that can be selected in the scene.
 *
 * @module
 */

export class DIVESelectable {
    readonly isSelectable: true = true;
    public onSelect?(): void;
    public onDeselect?(): void;
}
