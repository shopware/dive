export interface DIVESelectable {
    isSelectable: true;
    onSelect?: () => void;
    onDeselect?: () => void;
}