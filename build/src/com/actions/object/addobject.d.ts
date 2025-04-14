import { COMEntity } from '../../types';
export default interface ADD_OBJECT {
    DESCRIPTION: 'Adds an object to the scene.';
    PAYLOAD: COMEntity;
    RETURN: boolean;
}
