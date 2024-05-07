import { COMEntity } from "../../types.ts";

export default interface DELETE_OBJECT {
    'PAYLOAD': Partial<COMEntity> & { id: string },
    'RETURN': boolean,
}