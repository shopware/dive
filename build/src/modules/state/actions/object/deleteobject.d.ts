import { Action } from '../action.ts';
import { ActionDependencies, COMEntity } from '../../types/index.ts';
export declare const DeleteObjectAction: new (payload: Partial<COMEntity> & {
    id: string;
}, dependencies: Pick<ActionDependencies, "registered" | "engine">) => Action<Partial<COMEntity> & {
    id: string;
}, Pick<ActionDependencies, "registered" | "engine">, void>;
declare global {
    interface ActionTypes {
        DELETE_OBJECT: typeof DeleteObjectAction;
    }
}
