import { type COMEntity } from '../../types';

export default interface SET_PARENT {
    DESCRIPTION: 'Attach an object to another object.';
    PAYLOAD: {
        object: Partial<COMEntity> & { id: string };
        parent: (Partial<COMEntity> & { id: string }) | null;
    };
    RETURN: boolean;
}
