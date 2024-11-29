import { COMEntity } from '../../types';

export default interface GET_OBJECTS {
    DESCRIPTION: 'Returns a list of objects of given IDs.';
    PAYLOAD: { ids: string[] };
    RETURN: COMEntity[];
}
