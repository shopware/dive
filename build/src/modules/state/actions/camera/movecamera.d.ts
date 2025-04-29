import { Action } from '../action.ts';
import { ActionDependencies } from '../../types/index.ts';
import { Vector3Like } from 'three';
export declare const MoveCameraAction: new (payload: {
    position: Vector3Like;
    target: Vector3Like;
    locked: boolean;
    duration: number;
} | {
    id: string;
    locked: boolean;
    duration: number;
}, dependencies: Pick<ActionDependencies, "AnimationSystem" | "registered" | "engine" | "controller">) => Action<{
    position: Vector3Like;
    target: Vector3Like;
    locked: boolean;
    duration: number;
} | {
    id: string;
    locked: boolean;
    duration: number;
}, Pick<ActionDependencies, "AnimationSystem" | "registered" | "engine" | "controller">, Promise<{
    stop: () => void;
}>>;
declare global {
    interface ActionTypes {
        MOVE_CAMERA: typeof MoveCameraAction;
    }
}
