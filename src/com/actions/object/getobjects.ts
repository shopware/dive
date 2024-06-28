import { COMEntity } from "../../types.ts";

export default interface GET_OBJECTS {
    'PAYLOAD': { ids: string[] },
    'RETURN': COMEntity[],
};