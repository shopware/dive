import { DIVEScene } from '../../../engine/scene/Scene.ts';
import { DIVERenderPipeline } from '../../../engine/renderer/Renderer.ts';
import { OrbitController } from '../../orbitcontroller/index.ts';
import { MediaGenerationByPosition } from '../types/index.ts';
/**
 * @internal
 */
export declare class MediaCreator {
    private _renderer;
    private _scene;
    private _controller;
    constructor(renderer: DIVERenderPipeline, scene: DIVEScene, controller: OrbitController);
    generateMedia(options: MediaGenerationByPosition): string;
    drawCanvas(canvasElement?: HTMLCanvasElement): HTMLCanvasElement;
}
