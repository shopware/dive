import { Object3D, Vector3 } from 'three';
import { DIVEHoverable } from '../../../interfaces/Hoverable';
import { OrbitController } from '../../../modules/controller/orbit/OrbitController';
import { DIVEScaleHandle } from '../handles/ScaleHandle';
import { DraggableEvent } from '../../../modules/toolbox/BaseTool';
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
