// define global action classes
declare global {
    /**
     * Provides types of action classes.
     * For example:
     * ```ts
     * interface ActionTypes {
     *     UPDATE_SCENE: typeof UpdateSceneAction;
     * }
     * ```
     *
     * This will be used to define the action classes.
     */
    interface ActionTypes {}
}

/**
 * Provides constructable action classes.
 * For example:
 * ```ts
 * ActionClasses['UPDATE_SCENE'] = UpdateSceneAction;
 * ```
 *
 * This will be used to define the action classes.
 */
const ActionClasses: ActionTypes = {} as ActionTypes;

/**
 * Register an action class with the state system.
 * This should be called by action files to register their actions.
 */
export function registerAction<ActionType extends keyof ActionTypes>(
    type: ActionType,
    actionClass: ActionTypes[ActionType],
): void {
    ActionClasses[type] = actionClass;
}

/**
 * Get an action class by its type.
 * This is used internally by the State class.
 */
export function getActionClass<ActionType extends keyof ActionTypes>(
    type: ActionType,
): ActionTypes[ActionType] {
    return ActionClasses[type];
}

export type { ActionTypes };
