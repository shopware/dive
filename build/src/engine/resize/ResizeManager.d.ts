import { DIVEPerspectiveCamera } from '../camera/PerspectiveCamera.ts';
import { DIVERenderPipeline } from '../renderer/Renderer.ts';
export declare class DIVEResizeManager {
    private _resizeObserver;
    private _width;
    private _height;
    constructor(renderer: DIVERenderPipeline, camera: DIVEPerspectiveCamera);
    dispose(): void;
}
