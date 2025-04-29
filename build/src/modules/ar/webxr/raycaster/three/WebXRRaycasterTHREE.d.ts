import { DIVERenderPipeline } from '../../../../../engine/renderer/Renderer';
import { DIVEScene } from '../../../../../engine/scene/Scene';
import { DIVEHitResult } from '../WebXRRaycaster';
export declare class DIVEWebXRRaycasterTHREE {
    private _renderer;
    private _scene;
    private _controller;
    private _raycaster;
    constructor(renderer: DIVERenderPipeline, scene: DIVEScene);
    Init(): Promise<this>;
    GetIntersections(): DIVEHitResult[];
}
