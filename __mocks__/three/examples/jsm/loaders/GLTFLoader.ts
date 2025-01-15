export const GLTFLoader = jest.fn(function () {
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
    this.setDRACOLoader = jest.fn();
    return this;
});
