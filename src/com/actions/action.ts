import { type ActionDependencies } from '../Communication';

export abstract class Action<
    P = unknown,
    R = void,
    D extends Partial<ActionDependencies> = Partial<ActionDependencies>,
> {
    protected abstract readonly _description: string;
    protected readonly _dependencies: D;
    protected _payload: P;
    public abstract execute(): R;

    constructor(payload: P, dependencies: D) {
        this._payload = payload;
        this._dependencies = dependencies;
    }

    public static define<
        T,
        R,
        D extends Partial<ActionDependencies> = Partial<ActionDependencies>,
    >(
        description: string,
        execute: (payload: T, dependencies: D) => R,
    ): new (payload: T, dependencies: D) => Action<T, R, D> {
        return class extends Action<T, R, D> {
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
