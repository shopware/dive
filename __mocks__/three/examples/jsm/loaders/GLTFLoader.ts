import { vi } from 'vitest';

export const GLTFLoader = vi.fn(function () {
    this.loadAsync = (
        uri: string,
        progEvent: (p: ProgressEvent<EventTarget>) => void,
    ) =>
        new Promise<void>((resolve) => {
            progEvent({
                loaded: 0,
                total: 1,
            } as ProgressEvent<EventTarget>);

            resolve();
        });
    this.setDRACOLoader = vi.fn();
    return this;
});
