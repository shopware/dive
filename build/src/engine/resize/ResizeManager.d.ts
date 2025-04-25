import { DIVEPerspectiveCamera } from '../camera/PerspectiveCamera.ts';
import { DIVERenderer } from '../renderer/Renderer.ts';
export declare class DIVEResizeManager {
    private _resizeObserver;
    private _width;
    private _height;
    constructor(renderer: DIVERenderer, camera: DIVEPerspectiveCamera);
    dispose(): void;
}
