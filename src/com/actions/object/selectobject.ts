import { COMEntity } from "../../types";

export default interface SELECT_OBJECT {
    'PAYLOAD': Partial<COMEntity> & { id: string },
    'RETURN': boolean,
};