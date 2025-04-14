import { DIVEScene } from '../../engine/scene/Scene';
import { DIVERenderer } from '../../engine/renderer/Renderer';
import { default as DIVEOrbitControls } from '../../controls/OrbitControls';
import { Vector3Like } from 'three';
declare global {
    interface ModuleClasses {
        MediaCreator: MediaCreator;
    }
}
/**
 * @module MediaCreator
 *
 * Provides tools for creating media content from the 3D scene:
 *
 * ```ts
 * import { MediaCreator } from '@shopware-ag/dive/modules/mediacreator';
 * const mediaCreator = new MediaCreator();
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
export declare class MediaCreator {
    private renderer;
    private scene;
    private controller;
    constructor(renderer: DIVERenderer, scene: DIVEScene, controller: DIVEOrbitControls);
    GenerateMedia(position: Vector3Like, target: Vector3Like, width: number, height: number): string;
    DrawCanvas(canvasElement?: HTMLCanvasElement): HTMLCanvasElement;
}
