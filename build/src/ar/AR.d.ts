import { DIVEScene } from '../scene/Scene';
import { DIVERenderer } from '../renderer/Renderer';
import { default as DIVEOrbitControls } from '../controls/OrbitControls';
export type DIVEAROptions = {
    arPlacement: 'horizontal' | 'vertical';
    arScale: 'auto' | 'fixed';
    /**
     * experimental, currently deactivated
     */
    useWebXR: false;
};
export declare class DIVEAR {
    private _renderer;
    private _scene;
    private _controller;
    constructor(renderer: DIVERenderer, scene: DIVEScene, controller: DIVEOrbitControls);
    Launch(options?: DIVEAROptions): Promise<void>;
    private tryARQuickLook;
    private tryWebXR;
    private trySceneViewer;
}
