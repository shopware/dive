/**
 * Interface for objects that can be selected in the scene.
 *
 * @module
 */

export interface DIVESelectable {
    isSelectable: true;
    onSelect?: () => void;
    onDeselect?: () => void;
}
