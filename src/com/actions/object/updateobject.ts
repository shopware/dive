import { COMEntity } from "../../types";

export default interface UPDATE_OBJECT {
    'PAYLOAD': Partial<COMEntity> & { id: string },
    'RETURN': boolean,
};