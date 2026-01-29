import { type HoverTool } from '../src/hover/HoverTool.ts';
import { type SelectTool } from '../src/select/SelectTool.ts';
import { type TransformTool } from '../src/transform/TransformTool.ts';
import { type DragTool } from '../src/drag/DragTool.ts';

export type ToolType = 'hover' | 'select' | 'transform' | 'drag';

/**
 * Maps ToolType to the corresponding Tool class.
 */
export interface ToolTypeMap {
    hover: HoverTool;
    select: SelectTool;
    transform: TransformTool;
    drag: DragTool;
}
