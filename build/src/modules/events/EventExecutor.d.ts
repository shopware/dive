export declare class DIVEEventExecutor<T> {
    private _listeners;
    Subscribe<S extends keyof T>(type: S, listener: (payload: T[S]) => void): () => boolean;
    protected dispatch<S extends keyof T>(type: S, payload?: T[S]): void;
}
