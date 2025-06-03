type EasingFunction = (amount: number) => number;

export type TAnimatorParameters<T> = {
    easing?: EasingFunction;
    onUpdate?: (object: T, elapsed: number) => void;
    onComplete?: (object: T) => void;
};
