import { COMEntity } from '../../types';
export default interface GET_ALL_OBJECTS {
    readonly DESCRIPTION: 'Retrieves all objects in the scene.';
    PAYLOAD: Map<string, COMEntity>;
    RETURN: Map<string, COMEntity>;
}
