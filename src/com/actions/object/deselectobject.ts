import { COMEntity } from "../../types.ts";

export default interface DESELECT_OBJECT {
    'PAYLOAD': Partial<COMEntity> & { id: string },
    'RETURN': boolean,
};