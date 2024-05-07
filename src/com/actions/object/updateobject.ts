import { COMEntity } from "../../types.ts";

export default interface UPDATE_OBJECT {
    'PAYLOAD': Partial<COMEntity> & { id: string },
    'RETURN': boolean,
};