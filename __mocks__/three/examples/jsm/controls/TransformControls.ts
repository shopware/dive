export const TransformControls = jest.fn(function () {
    this.isTransformControls = true;
    this.addEventListener = jest.fn(
        (type: string, callback: (e: object) => void) => {
            this.object = null;
            callback({ value: false });
            this.object = {};
            callback({ value: false });
            this.object = {
                isMovable: true,
            };
            callback({ value: false });
            this.object = {
                isMovable: true,
                onMove: jest.fn(),
                onMoveStart: jest.fn(),
                onMoveEnd: jest.fn(),
            };
            callback({ value: false });
        },
    );
    this.attach = jest.fn();
    this.detach = jest.fn();
    this.traverse = jest.fn((callback: (obj: object) => void) => {
        callback(this);
    });
    this.setMode = jest.fn();
    this.getRaycaster = jest.fn().mockReturnValue({
        layers: {
            mask: 0,
            disableAll: jest.fn(),
            enableAll: jest.fn(),
        },
    });
    this.layers = {
        mask: 0,
    };
    return this;
});
