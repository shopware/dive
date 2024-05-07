import { COMEntity } from "../../types.ts";

export default interface GET_OBJECTS {
    'PAYLOAD': { map: Map<string, COMEntity>, ids?: string[] },
    'RETURN': Map<string, COMEntity>,
};