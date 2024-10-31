import { COMEntity } from '../../types';

export default interface NEW_ACTION {
    DESCRIPTION: 'Returns a list of objects of given IDs.';
    PAYLOAD: { ids: string[] };
    RETURN: COMEntity[];
}