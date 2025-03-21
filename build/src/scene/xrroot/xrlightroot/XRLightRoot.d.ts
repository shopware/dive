import { DIVERenderer } from '../../../renderer/Renderer';
import { Object3D } from 'three';
import { DIVEScene } from '../../Scene';
export declare class DIVEXRLightRoot extends Object3D {
    private _scene;
    private _xrLight;
    private _lightRoot;
    constructor(scene: DIVEScene);
    InitLightEstimation(renderer: DIVERenderer): void;
    DisposeLightEstimation(): void;
    private onEstimationStart;
    private onEstimationEnd;
}
