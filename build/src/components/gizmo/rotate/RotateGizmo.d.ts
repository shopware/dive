import { Object3D } from 'three';
import { OrbitController } from '../../../plugins/orbitcontroller/index.ts';
import { DIVERadialHandle } from '../handles/RadialHandle.ts';
import { DraggableEvent } from '../../../plugins/toolbox/index.ts';
export declare class DIVERotateGizmo extends Object3D {
    children: DIVERadialHandle[];
    private _controller;
    set debug(value: boolean);
    private _startRot;
    constructor(controller: OrbitController);
    reset(): void;
    private handleHighlight;
    onHandleHover(handle: DIVERadialHandle, value: boolean): void;
    onHandleDragStart(handle: DIVERadialHandle): void;
    onHandleDrag(handle: DIVERadialHandle, e: DraggableEvent): void;
    onHandleDragEnd(handle: DIVERadialHandle): void;
}
