import { registerAction, getActionClass } from '../ActionRegistry';

describe('modules/state/ActionRegistry', () => {
    beforeEach(() => {
        // Clear any registered actions
        (global as any).ActionTypes = {};
    });

    it('should register and get action class', () => {
        class TestAction {}
        const actionType = 'TEST_ACTION';

        // Register the action
        registerAction(actionType as keyof ActionTypes, TestAction as any);

        // Get the action class
        const retrievedAction = getActionClass(actionType as keyof ActionTypes);

        expect(retrievedAction).toBe(TestAction);
    });

    it('should handle multiple action registrations', () => {
        class TestAction1 {}
        class TestAction2 {}
        const actionType1 = 'TEST_ACTION_1';
        const actionType2 = 'TEST_ACTION_2';

        // Register multiple actions
        registerAction(actionType1 as keyof ActionTypes, TestAction1 as any);
        registerAction(actionType2 as keyof ActionTypes, TestAction2 as any);

        // Get the action classes
        const retrievedAction1 = getActionClass(
            actionType1 as keyof ActionTypes,
        );
        const retrievedAction2 = getActionClass(
            actionType2 as keyof ActionTypes,
        );

        expect(retrievedAction1).toBe(TestAction1);
        expect(retrievedAction2).toBe(TestAction2);
    });

    it('should override existing action registration', () => {
        class TestAction1 {}
        class TestAction2 {}
        const actionType = 'TEST_ACTION';

        // Register the first action
        registerAction(actionType as keyof ActionTypes, TestAction1 as any);

        // Override with second action
        registerAction(actionType as keyof ActionTypes, TestAction2 as any);

        // Get the action class
        const retrievedAction = getActionClass(actionType as keyof ActionTypes);

        expect(retrievedAction).toBe(TestAction2);
    });
});
