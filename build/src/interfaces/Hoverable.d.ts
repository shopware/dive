import { Intersection } from 'three';
export interface DIVEHoverable {
    isHoverable: true;
    onPointerEnter?: (i: Intersection) => void;
    onPointerOver?: (i: Intersection) => void;
    onPointerLeave?: () => void;
}
