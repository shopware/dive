import { type ActionDependencies } from '../types/index.ts';

/**
 * Abstract base class for implementing actions in the system.
 * Actions represent discrete units of work that can be executed with specific payloads and dependencies.
 * To define a new action, you can call `Action.define` method.
 *
 * @template P - The type of the payload that the action will receive (optional)
 * @template R - The return type of the action's execution
 * @template D - The type of dependencies required by the action, extending ActionDependencies
 */
export abstract class Action<
    P = void,
    D extends Partial<ActionDependencies> = Partial<ActionDependencies>,
    R = void,
> {
    protected abstract readonly _description: string;
    protected _payload: P;
    protected readonly _dependencies: D;

    /**
     * Executes the action with the provided payload and dependencies.
     * @returns A promise that resolves to the result of the action
     */
    public abstract execute(): R;

    constructor(payload: P, dependencies: D) {
        this._payload = payload;
        this._dependencies = dependencies;
    }

    /**
     * Factory method to create a new Action class with the specified description and execution logic.
     *
     * @template T - The type of the payload (use void for actions without payload)
     * @template D - The type of dependencies
     * @template R - The return type of the action
     * @param options - Configuration options for the action
     * @param options.description - A description of what the action does
     * @param options.execute - The function that implements the action's logic
     * @returns A new Action class that can be instantiated with payload and dependencies
     */
    public static define<
        T = void,
        D extends Partial<ActionDependencies> = Partial<ActionDependencies>,
        R = void,
    >({
        description,
        execute,
    }: {
        description: string;
        execute: (payload: T, dependencies: D) => R;
    }): new (payload: T, dependencies: D) => Action<T, D, R> {
        return class extends Action<T, D, R> {
            readonly _description = description;
            readonly _payload: T;

            constructor(payload: T, dependencies: D) {
                super(payload, dependencies);
                this._payload = payload;
            }

            execute(): R {
                return execute(this._payload, this._dependencies);
            }
        };
    }
}
