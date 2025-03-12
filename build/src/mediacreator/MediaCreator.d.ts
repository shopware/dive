import { DIVEScene } from '../scene/Scene.ts';
import { DIVERenderer } from '../renderer/Renderer.ts';
import { default as DIVEOrbitControls } from '../controls/OrbitControls.ts';
import { Vector3Like } from 'three';
/**
 * Creates renderings of the current scene
 *
 * @module
 */
export declare class DIVEMediaCreator {
    private renderer;
    private scene;
    private controller;
    constructor(renderer: DIVERenderer, scene: DIVEScene, controller: DIVEOrbitControls);
    GenerateMedia(position: Vector3Like, target: Vector3Like, width: number, height: number): string;
    DrawCanvas(canvasElement?: HTMLCanvasElement): HTMLCanvasElement;
}
