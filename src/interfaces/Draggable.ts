/**
 * Interface for objects that can be hovered in the scene.
 *
 * @module
 */

import { type DraggableEvent } from '@shopware-ag/dive/toolbox';

export interface DIVEDraggable {
    isDraggable: true;
    onDragStart?: (e: DraggableEvent) => void;
    onDrag?: (e: DraggableEvent) => void;
    onDragEnd?: (e: DraggableEvent) => void;
}
