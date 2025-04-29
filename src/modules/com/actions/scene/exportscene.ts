import { type DIVESceneFileType } from '../../../../types';

export default interface EXPORT_SCENE {
    DESCRIPTION: 'Exports the current scene to a blob and returns the URL.';
    PAYLOAD: { type: keyof DIVESceneFileType };
    RETURN: Promise<ArrayBuffer | null>;
}
