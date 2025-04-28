import { type DIVESceneFileType } from '../../../types';
import { Action } from './action';
import { type ActionDependencies } from '../Communication';

const TestAction1 = Action.define<
    keyof DIVESceneFileType,
    Promise<string | null>,
    Pick<ActionDependencies, 'scene'>
>({
    description: 'Exports the current scene to a blob and returns the URL.',
    execute: async (payload, { scene }) => {
        console.log('Trying to export as type:', payload);
        try {
            // TODO: Implement actual scene export logic here
            // This would typically involve:
            // 1. Getting the current scene data
            // 2. Converting it to the requested format
            // 3. Creating a blob
            // 4. Creating an object URL
            // 5. Returning the URL
            return null;
        } catch (error) {
            console.error('Failed to export scene:', error);
            return null;
        }
    },
});

declare global {
    interface ActionClasses {
        TestAction1: typeof TestAction1;
    }
}
