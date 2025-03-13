import { COMEntity } from '../../types';
export default interface SELECT_OBJECT {
    DESCRIPTION: 'Selects an existing object.';
    PAYLOAD: Partial<COMEntity> & {
        id: string;
    };
    RETURN: boolean;
}
