import { Vector3Like } from 'three';
import { Action } from '../action';

const TestAction2 = Action.define<Vector3Like, Promise<string | null>>(
    'Exports the current scene to a blob and returns the URL.',
    async (payload) => {
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
);

declare global {
    interface ActionClasses {
        TestAction2: typeof TestAction2;
    }
}
