/**
 * Interface for objects that can be hovered in the scene.
 *
 * @module
 */

import { type Intersection } from "three";

export interface DIVEHoverable {
    isHoverable: true;
    onPointerEnter?: (i: Intersection) => void;
    onPointerOver?: (i: Intersection) => void;
    onPointerLeave?: () => void;
}