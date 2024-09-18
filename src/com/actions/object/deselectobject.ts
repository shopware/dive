import { COMEntity } from "../../types";

export default interface DESELECT_OBJECT {
    'PAYLOAD': Partial<COMEntity> & { id: string },
    'RETURN': boolean,
};