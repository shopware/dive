import { type COMEntity } from "../../types";

export default interface SET_PARENT {
    'PAYLOAD': {
        object: Partial<COMEntity> & { id: string },
        parent: Partial<COMEntity> & { id: string } | null,
    },
    'RETURN': boolean,
};