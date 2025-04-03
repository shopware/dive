import { DIVERenderer } from '../../../../renderer/Renderer';
import { DIVEScene } from '../../../../scene/Scene';
import { DIVEHitResult } from '../WebXRRaycaster';
export declare class DIVEWebXRRaycasterTHREE {
    private _renderer;
    private _scene;
    private _controller;
    private _raycaster;
    constructor(renderer: DIVERenderer, scene: DIVEScene);
    Init(): Promise<this>;
    GetIntersections(): DIVEHitResult[];
}
