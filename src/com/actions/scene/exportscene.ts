import { type DIVESceneFileType } from "../../../types";

export default interface EXPORT_SCENE {
    'PAYLOAD': { type: keyof DIVESceneFileType },
    'RETURN': Promise<string | null>,
};