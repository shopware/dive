import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { DIVEPerspectiveCamera } from '../../../engine/camera/PerspectiveCamera';
import { DIVERenderer } from '../../../engine/renderer/Renderer';
import { Box3, Vector3Like } from 'three';
import { DIVEAnimationSystem } from '../../animation/AnimationSystem';
import { DIVERenderPipeline } from '../../../engine/pipeline/RenderPipeline';
export type DIVEOrbitControllerSettings = {
    /** Whether to enable damping for smooth camera movement */
    enableDamping: boolean;
    /** Damping factor for camera movement */
    dampingFactor: number;
};
export declare const DIVEOrbitControllerDefaultSettings: Required<DIVEOrbitControllerSettings>;
/**
 * Orbit Controls. Basic functionality to orbit around a given target point in the scene.
 *
 * @module
 */
export declare class DIVEOrbitController extends OrbitControls {
    static readonly DEFAULT_ZOOM_FACTOR = 1;
    private _animationSystem;
    private _pipeline;
    private last;
    private animating;
    private locked;
    private stopMoveTo;
    private stopRevertLast;
    object: DIVEPerspectiveCamera;
    domElement: HTMLCanvasElement;
    constructor(camera: DIVEPerspectiveCamera, renderer: DIVERenderer, pipeline: DIVERenderPipeline, animationSystem: DIVEAnimationSystem, settings?: Partial<DIVEOrbitControllerSettings>);
    Dispose(): void;
    ComputeEncompassingView(bb: Box3): {
        position: Vector3Like;
        target: Vector3Like;
    };
    ZoomIn(by?: number): void;
    ZoomOut(by?: number): void;
    MoveTo(pos: Vector3Like | undefined, target: Vector3Like | undefined, duration: number, lock: boolean): void;
    RevertLast(duration: number): void;
    private preRenderCallback;
}
