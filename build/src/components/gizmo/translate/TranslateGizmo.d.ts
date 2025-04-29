import { Object3D } from 'three';
import { OrbitController } from '../../../modules/controller/orbit/OrbitController';
import { DIVEAxisHandle } from '../handles/AxisHandle';
import { DraggableEvent } from '../../../modules/toolbox/BaseTool';
export declare class DIVETranslateGizmo extends Object3D {
    private _controller;
    set debug(value: boolean);
    children: DIVEAxisHandle[];
    private _startPos;
    constructor(controller: OrbitController);
    reset(): void;
    private handleHighlight;
    onHandleHover(handle: DIVEAxisHandle, value: boolean): void;
    onHandleDragStart(handle: DIVEAxisHandle): void;
    onHandleDrag(handle: DIVEAxisHandle, e: DraggableEvent): void;
    onHandleDragEnd(handle: DIVEAxisHandle): void;
}
