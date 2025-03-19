import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { default as DIVEPerspectiveCamera } from '../camera/PerspectiveCamera.ts';
import { DIVERenderer } from '../renderer/Renderer.ts';
import { Box3, Vector3Like } from 'three';
import { DIVEAnimationSystem } from '../animation/AnimationSystem.ts';
export type DIVEOrbitControlsSettings = {
    enableDamping: boolean;
    dampingFactor: number;
};
export declare const DIVEOrbitControlsDefaultSettings: DIVEOrbitControlsSettings;
/**
 * Orbit Controls. Basic functionality to orbit around a given target point in the scene.
 *
 * @module
 */
export default class DIVEOrbitControls extends OrbitControls {
    static readonly DEFAULT_ZOOM_FACTOR = 1;
    private _animationSystem;
    private last;
    private animating;
    private locked;
    private stopMoveTo;
    private stopRevertLast;
    object: DIVEPerspectiveCamera;
    domElement: HTMLCanvasElement;
    private _removePreRenderCallback;
    constructor(camera: DIVEPerspectiveCamera, renderer: DIVERenderer, animationSystem: DIVEAnimationSystem, settings?: Partial<DIVEOrbitControlsSettings>);
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
