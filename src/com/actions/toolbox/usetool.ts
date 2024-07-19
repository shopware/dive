import { type ToolType } from "../../../toolbox/Toolbox";

export default interface USE_TOOL {
    'PAYLOAD': { tool: ToolType },
    'RETURN': boolean,
}