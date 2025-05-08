import { DIVERenderPipeline } from '../../../renderer/Renderer.ts';
import { Object3D } from 'three';
import { DIVEScene } from '../../Scene.ts';
export declare class DIVEXRLightRoot extends Object3D {
    private _scene;
    private _xrLight;
    private _lightRoot;
    constructor(scene: DIVEScene);
    InitLightEstimation(renderer: DIVERenderPipeline): void;
    DisposeLightEstimation(): void;
    private onEstimationStart;
    private onEstimationEnd;
}
