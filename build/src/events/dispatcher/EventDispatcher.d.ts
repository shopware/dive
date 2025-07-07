export declare class EventDispatcher<T> {
    private _listeners;
    addEventListener<S extends keyof T>(type: S, listener: (payload: T[S]) => void): () => boolean;
    removeEventListener<S extends keyof T>(type: S, listener: (payload: T[S]) => void): void;
    dispatchEvent<S extends keyof T>(type: S, payload?: T[S]): void;
}
