import { DIVEScene } from '../../../engine/scene/Scene.ts';
import { DIVERenderPipeline } from '../../../engine/renderer/Renderer.ts';
import { OrbitController } from '../../orbitcontroller/index.ts';
import { Vector3Like } from 'three';
/**
 * @internal
 */
export declare class MediaCreator {
    private _renderer;
    private _scene;
    private _controller;
    constructor(renderer: DIVERenderPipeline, scene: DIVEScene, controller: OrbitController);
    generateMedia(position: Vector3Like, target: Vector3Like, width: number, height: number): string;
    drawCanvas(canvasElement?: HTMLCanvasElement): HTMLCanvasElement;
}
