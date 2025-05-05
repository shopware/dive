import { Action } from '../action.ts';
import { ActionDependencies } from '../../types/index.ts';
import { Vector3Like } from 'three';
export declare const GenerateMediaAction: new (payload: ({
    position: Vector3Like;
    target: Vector3Like;
} | {
    id: string;
}) & {
    width: number;
    height: number;
}, dependencies: Pick<ActionDependencies, "registered" | "getMediaCreator">) => Action<({
    position: Vector3Like;
    target: Vector3Like;
} | {
    id: string;
}) & {
    width: number;
    height: number;
}, Pick<ActionDependencies, "registered" | "getMediaCreator">, Promise<string>>;
declare global {
    interface ActionTypes {
        GENERATE_MEDIA: typeof GenerateMediaAction;
    }
}
