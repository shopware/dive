import { COMEntity } from "../../types.ts";

export default interface SELECT_OBJECT {
    'PAYLOAD': Partial<COMEntity> & { id: string },
    'RETURN': boolean,
};