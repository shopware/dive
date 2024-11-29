import { COMEntity } from '../../types';

export default interface DESELECT_OBJECT {
    DESCRIPTION: 'Deselects an existing object.';
    PAYLOAD: Partial<COMEntity> & { id: string };
    RETURN: boolean;
}
