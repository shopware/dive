import { ActionDependencies } from './types';

export abstract class Action<P = unknown, R = void> {
    protected abstract readonly _description: string;
    protected _payload: P;
    protected readonly _dependencies: Partial<ActionDependencies>;
    public abstract execute(): R;

    constructor(payload: P, dependencies: Partial<ActionDependencies>) {
        this._payload = payload;
        this._dependencies = dependencies;
    }

    public static define<T, R>(
        description: string,
        execute: (payload: T, dependencies: Partial<ActionDependencies>) => R,
    ): new (
        payload: T,
        dependencies: Partial<ActionDependencies>,
    ) => Action<T, R> {
        return class extends Action<T, R> {
            readonly _description = description;
            readonly _payload: T;

            constructor(payload: T, dependencies: Partial<ActionDependencies>) {
                super(payload, dependencies);
                this._payload = payload;
            }

            execute(): R {
                return execute(this._payload, this._dependencies);
            }
        };
    }
}
