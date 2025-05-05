import { Object3D } from 'three';
import { DIVERoot } from '../../../components/root/Root.ts';
import { DIVERenderPipeline } from '../../renderer/Renderer.ts';
import { DIVEXRLightRoot } from './xrlightroot/XRLightRoot.ts';
import { DIVEScene } from '../Scene.ts';
export declare class DIVEXRRoot extends Object3D {
    private _xrLightRoot;
    private _xrModelRoot;
    private _xrHandNode;
    get XRModelRoot(): DIVERoot;
    get XRLightRoot(): DIVEXRLightRoot;
    get XRHandNode(): Object3D;
    private _xrShadowPlane;
    constructor(scene: DIVEScene);
    InitLightEstimation(renderer: DIVERenderPipeline): void;
    DisposeLightEstimation(): void;
}
