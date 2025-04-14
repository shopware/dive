import { COMEntity } from '../../types';
export default interface UPDATE_OBJECT {
    DESCRIPTION: 'Updates an existing object.';
    PAYLOAD: Partial<COMEntity> & {
        id: string;
    };
    RETURN: boolean;
}
