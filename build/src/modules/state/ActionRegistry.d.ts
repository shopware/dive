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
    interface ActionTypes {
    }
}
/**
 * Register an action class with the state system.
 * This should be called by action files to register their actions.
 */
export declare function registerAction<ActionType extends keyof ActionTypes>(type: ActionType, actionClass: ActionTypes[ActionType]): void;
/**
 * Get an action class by its type.
 * This is used internally by the State class.
 */
export declare function getActionClass<ActionType extends keyof ActionTypes>(type: ActionType): ActionTypes[ActionType];
export type { ActionTypes };
