import { COMEntity } from '../../types';

export default interface DELETE_OBJECT {
    DESCRIPTION: 'Deletes an object from the scene.';
    PAYLOAD: Partial<COMEntity> & { id: string };
    RETURN: boolean;
}
