import { Object3D, Vector3 } from 'three';
import { DIVEHoverable } from '../../interface/Hoverable';
import { default as DIVEOrbitControls } from '../../controls/OrbitControls';
import { DIVEScaleHandle } from '../handles/ScaleHandle';
import { DraggableEvent } from '../../toolbox/BaseTool';
export declare class DIVEScaleGizmo extends Object3D implements DIVEHoverable {
    readonly isHoverable: true;
    children: DIVEScaleHandle[];
    private _controller;
    set debug(value: boolean);
    private _startScale;
    constructor(controller: DIVEOrbitControls);
    reset(): void;
    update(scale: Vector3): void;
    private handleHighlight;
    onHoverAxis(handle: DIVEScaleHandle, value: boolean): void;
    onAxisDragStart(handle: DIVEScaleHandle): void;
    onAxisDrag(axis: DIVEScaleHandle, e: DraggableEvent): void;
    onAxisDragEnd(handle: DIVEScaleHandle): void;
}
