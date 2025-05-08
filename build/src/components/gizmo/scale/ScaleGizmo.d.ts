import { Object3D, Vector3 } from 'three';
import { DIVEHoverable } from '../../../interfaces/Hoverable.ts';
import { OrbitController } from '../../../modules/controller/orbit/OrbitController.ts';
import { DIVEScaleHandle } from '../handles/ScaleHandle.ts';
import { DraggableEvent } from '../../../modules/toolbox/BaseTool.ts';
export declare class DIVEScaleGizmo extends Object3D implements DIVEHoverable {
    readonly isHoverable: true;
    children: DIVEScaleHandle[];
    private _controller;
    set debug(value: boolean);
    private _startScale;
    constructor(controller: OrbitController);
    reset(): void;
    update(scale: Vector3): void;
    private handleHighlight;
    onHoverAxis(handle: DIVEScaleHandle, value: boolean): void;
    onAxisDragStart(handle: DIVEScaleHandle): void;
    onAxisDrag(axis: DIVEScaleHandle, e: DraggableEvent): void;
    onAxisDragEnd(handle: DIVEScaleHandle): void;
}
