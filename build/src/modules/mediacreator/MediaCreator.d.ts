import { DIVEScene } from '../../engine/scene/Scene';
import { DIVERenderPipeline } from '../../engine/renderer/Renderer';
import { OrbitController } from '../../modules/controller/orbit/OrbitController';
import { Vector3Like } from 'three';
declare global {
    interface ModuleClasses {
        MediaCreator: typeof MediaCreator;
    }
}
/**
 * @module MediaCreator
 *
 * Provides tools for creating media content from the 3D scene:
 *
 * ```ts
 * import { MediaCreator } from '@shopware-ag/dive/modules/MediaCreator';
 *
 * const mediaCreator = new MediaCreator(renderer, scene, controller);
 *
 * // Generate a screenshot
 * const screenshot = await mediaCreator.GenerateMedia(
 *     { x: 0, y: 0, z: 0 }, // camera position
 *     { x: 0, y: 0, z: 0 }, // camera target
 *     1920, // width
 *     1080  // height
 * );
 * ```
 *
 * Features:
 * - High-quality screenshot generation
 * - Customizable camera position and target
 * - Configurable output resolution
 */
/**
 * @internal
 */
export declare class MediaCreator {
    private _renderer;
    private _scene;
    private _controller;
    constructor(renderer: DIVERenderPipeline, scene: DIVEScene, controller: OrbitController);
    GenerateMedia(position: Vector3Like, target: Vector3Like, width: number, height: number): string;
    DrawCanvas(canvasElement?: HTMLCanvasElement): HTMLCanvasElement;
}
