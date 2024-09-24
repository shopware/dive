import { COMEntity } from "../../types";

export default interface DELETE_OBJECT {
    'PAYLOAD': Partial<COMEntity> & { id: string },
    'RETURN': boolean,
}