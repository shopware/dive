export const Easing = {
    Quadratic: {
        In: jest.fn(),
        Out: jest.fn(),
        InOut: jest.fn(),
    },
};

export const Tween = jest.fn(() => {
    const instance: object = {
        easing: () => {
            return instance;
        },
        to: () => {
            return instance;
        },
        start: () => {
            return instance;
        },
        stop: () => {
            return instance;
        },
        onComplete: (callback: () => typeof instance) => {
            callback();
            return instance;
        },
        onUpdate: (callback: () => typeof instance) => {
            callback();
            return instance;
        },
    };
    return instance;
});

export const update = jest.fn();
