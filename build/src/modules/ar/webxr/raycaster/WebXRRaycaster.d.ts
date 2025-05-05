import { Matrix4, Mesh, Vector3 } from 'three';
import { DIVERenderPipeline } from '../../../../engine/renderer/Renderer.ts';
import { DIVEScene } from '../../../../engine/scene/Scene.ts';
import { DIVEEventExecutor } from '../../../../modules/events/EventExecutor.ts';
/**
 * object is undefined when AR world is hit.
 */
export type DIVEHitResult = {
    point: Vector3;
    matrix: Matrix4;
    object?: Mesh;
};
export type DIVEWebXRRaycasterEvents = {
    AR_HIT_FOUND: {
        hit: DIVEHitResult;
    };
    AR_HIT_LOST: undefined;
    SCENE_HIT_FOUND: {
        hit: DIVEHitResult;
    };
    SCENE_HIT_LOST: undefined;
};
export declare class DIVEWebXRRaycaster extends DIVEEventExecutor<DIVEWebXRRaycasterEvents> {
    private _session;
    private _initialized;
    private _threeRaycaster;
    private _arRaycaster;
    private _arHitResultBuffer;
    private _sceneHitResultBuffer;
    private _hasHit;
    constructor(session: XRSession, renderer: DIVERenderPipeline, scene: DIVEScene);
    Dispose(): void;
    Init(): Promise<this>;
    GetARIntersections(frame: XRFrame): DIVEHitResult[];
    GetSceneIntersections(): DIVEHitResult[];
    private onARHitFound;
    private onARHitLost;
    private onSceneHitFound;
    private onSceneHitLost;
}
