import { COMEntity } from "../../types";

export default interface GET_OBJECTS {
    'PAYLOAD': { ids: string[] },
    'RETURN': COMEntity[],
};