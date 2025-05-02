import { vi } from 'vitest';

export const Easing = {
    Quadratic: {
        In: vi.fn(),
        Out: vi.fn(),
        InOut: vi.fn(),
    },
};

export const Tween = vi.fn(() => {
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

export const update = vi.fn();
