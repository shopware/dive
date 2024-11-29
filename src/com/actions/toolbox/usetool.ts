import { type ToolType } from '../../../toolbox/Toolbox';

export default interface USE_TOOL {
    DESCRIPTION: 'Activates a specific tool from the toolbox.';
    PAYLOAD: { tool: ToolType };
    RETURN: boolean;
}
