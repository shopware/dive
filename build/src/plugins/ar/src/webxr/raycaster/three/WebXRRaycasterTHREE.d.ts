import { DIVERenderPipeline } from '../../../../../../engine/renderer/Renderer.ts';
import { DIVEScene } from '../../../../../../engine/scene/Scene.ts';
import { DIVEHitResult } from '../WebXRRaycaster.ts';
export declare class DIVEWebXRRaycasterTHREE {
    private _renderer;
    private _scene;
    private _controller;
    private _raycaster;
    constructor(renderer: DIVERenderPipeline, scene: DIVEScene);
    init(): Promise<this>;
    getIntersections(): DIVEHitResult[];
}
