import { Action } from '../action.ts';
import { ActionDependencies } from '../../../types/index.ts';
import { MediaGenerationByPosition, MediaGenerationById } from '../../../../mediacreator/index.ts';
export declare const GenerateMediaAction: new (payload: MediaGenerationByPosition | MediaGenerationById, dependencies: Pick<ActionDependencies, "registered" | "getMediaCreator">) => Action<MediaGenerationByPosition | MediaGenerationById, Pick<ActionDependencies, "registered" | "getMediaCreator">, Promise<string>>;
declare global {
    interface ActionTypes {
        GENERATE_MEDIA: typeof GenerateMediaAction;
    }
}
