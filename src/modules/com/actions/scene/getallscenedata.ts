import { DIVESceneData } from '../../../../types';

export default interface GET_ALL_SCENE_DATA {
    DESCRIPTION: 'Retrieves all current scene data.';
    PAYLOAD: object;
    RETURN: DIVESceneData;
}
