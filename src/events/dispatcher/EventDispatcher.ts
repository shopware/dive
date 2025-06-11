export class EventDispatcher<T> {
    private _listeners: Map<keyof T, ((payload: T[keyof T]) => void)[]> =
        new Map();

    public addEventListener<S extends keyof T>(
        type: S,
        listener: (payload: T[S]) => void,
    ): () => boolean {
        if (!this._listeners.get(type)) this._listeners.set(type, []);

        this._listeners
            .get(type)!
            .push(listener as (payload: T[keyof T]) => void);

        return () => {
            const listenerArray = this._listeners.get(type);
            if (!listenerArray) return false;

            const existingIndex = listenerArray.findIndex(
                (entry) => entry === listener,
            );
            if (existingIndex === -1) return false;

            listenerArray.splice(existingIndex, 1);
            return true;
        };
    }

    public removeEventListener<S extends keyof T>(
        type: S,
        listener: (payload: T[S]) => void,
    ): void {
        const listenerArray = this._listeners.get(type);
        if (!listenerArray) return;

        const existingIndex = listenerArray.findIndex(
            (entry) => entry === listener,
        );
        if (existingIndex === -1) return;

        listenerArray.splice(existingIndex, 1);
    }

    public dispatchEvent<S extends keyof T>(type: S, payload?: T[S]): void {
        const listenerArray = this._listeners.get(type);
        if (!listenerArray) return;

        listenerArray.forEach((listener) => listener(payload as T[S]));
    }
}
