import type { Mock } from 'vitest';
import { Vector2 } from 'three/webgpu';
import { PointerInput } from '../PointerInput.ts';

type PointerInit = {
    id?: number;
    x?: number;
    y?: number;
    kind?: 'mouse' | 'touch';
    button?: number;
    shiftKey?: boolean;
    ctrlKey?: boolean;
    metaKey?: boolean;
};

/** jsdom has no `PointerEvent`, so a mouse event carries its two fields. */
function pointer(type: string, init: PointerInit = {}): PointerEvent {
    const event = new MouseEvent(type, {
        clientX: init.x ?? 0,
        clientY: init.y ?? 0,
        button: init.button ?? 0,
        shiftKey: init.shiftKey,
        ctrlKey: init.ctrlKey,
        metaKey: init.metaKey,
        cancelable: true,
    });
    Object.defineProperties(event, {
        pointerId: { value: init.id ?? 1 },
        pointerType: { value: init.kind ?? 'mouse' },
    });

    return event as PointerEvent;
}

/** An element 100 pixels high, with the pointer capture API jsdom lacks. */
function makeElement(): HTMLElement & {
    setPointerCapture: Mock;
    hasPointerCapture: Mock;
    releasePointerCapture: Mock;
} {
    const element = document.createElement('div');
    Object.defineProperty(element, 'clientHeight', {
        value: 100,
        configurable: true,
    });

    return Object.assign(element, {
        setPointerCapture: vi.fn(),
        hasPointerCapture: vi.fn(() => true),
        releasePointerCapture: vi.fn(),
    });
}

describe('plugins/input/PointerInput', () => {
    let element: ReturnType<typeof makeElement>;
    let input: PointerInput;
    let events: { type: string; [key: string]: unknown }[];

    const record = (target: PointerInput): void => {
        (['start', 'end', 'move', 'scale'] as const).forEach((type) =>
            target.addEventListener(type, (event) => {
                const { target: _, ...rest } = event as typeof event & {
                    target: unknown;
                };
                events.push(rest);
            }),
        );
    };

    const fire = (event: Event, on: HTMLElement = element): Event => {
        on.dispatchEvent(event);

        return event;
    };

    beforeEach(() => {
        element = makeElement();
        input = new PointerInput(element);
        events = [];
        record(input);
    });

    afterEach(() => {
        input.dispose();
    });

    describe('mouse', () => {
        it('should report a left drag on primary, in viewport heights', () => {
            fire(pointer('pointerdown', { x: 10, y: 10 }));
            fire(pointer('pointermove', { x: 20, y: 30 }));
            fire(pointer('pointerup', { x: 20, y: 30 }));

            expect(events).toEqual([
                { type: 'start', channel: 'primary' },
                {
                    type: 'move',
                    channel: 'primary',
                    delta: new Vector2(0.1, 0.2),
                    unit: 'viewport',
                },
                { type: 'end', channel: 'primary' },
            ]);
        });

        it.each<[string, PointerInit, string | null]>([
            ['left', { button: 0 }, 'primary'],
            ['left with shift', { button: 0, shiftKey: true }, 'secondary'],
            ['left with ctrl', { button: 0, ctrlKey: true }, 'secondary'],
            ['left with meta', { button: 0, metaKey: true }, 'secondary'],
            ['middle', { button: 1 }, 'tertiary'],
            ['right', { button: 2 }, 'secondary'],
            ['right with shift', { button: 2, shiftKey: true }, 'primary'],
            ['a fourth button', { button: 3 }, null],
        ])('should map %s', (_, init, channel) => {
            fire(pointer('pointerdown', init));

            expect(events).toEqual(channel ? [{ type: 'start', channel }] : []);
        });

        it('should not report movement for a button with no channel', () => {
            fire(pointer('pointerdown', { button: 3 }));
            fire(pointer('pointermove', { x: 10 }));

            expect(events).toEqual([]);
        });

        it('should hold on to the pointer while it is down', () => {
            fire(pointer('pointerdown', { id: 7 }));
            expect(element.setPointerCapture).toHaveBeenCalledWith(7);

            fire(pointer('pointerup', { id: 7 }));
            expect(element.releasePointerCapture).toHaveBeenCalledWith(7);
        });

        it('should not release a capture it no longer holds', () => {
            element.hasPointerCapture.mockReturnValue(false);

            fire(pointer('pointerdown'));
            fire(pointer('pointerup'));

            expect(element.releasePointerCapture).not.toHaveBeenCalled();
        });

        it('should treat a cancelled pointer like a released one', () => {
            fire(pointer('pointerdown'));
            fire(pointer('pointercancel'));

            expect(events.at(-1)).toEqual({ type: 'end', channel: 'primary' });
        });

        it('should ignore a pointer it does not track', () => {
            fire(pointer('pointermove', { x: 10 }));
            fire(pointer('pointerup'));

            expect(events).toEqual([]);
        });

        it('should ignore a second down of the same pointer', () => {
            fire(pointer('pointerdown'));
            fire(pointer('pointerdown', { button: 2 }));

            expect(events).toEqual([{ type: 'start', channel: 'primary' }]);
        });

        it('should keep the context menu off the canvas', () => {
            const event = fire(
                new MouseEvent('contextmenu', { cancelable: true }),
            );

            expect(event.defaultPrevented).toBe(true);
        });
    });

    describe('touch', () => {
        it('should keep the page from scrolling on the element', () => {
            expect(element.style.touchAction).toBe('none');
        });

        const touch = (type: string, id: number, x: number, y: number) =>
            fire(pointer(type, { id, x, y, kind: 'touch' }));

        it('should report one finger on primary', () => {
            touch('pointerdown', 1, 0, 0);
            touch('pointermove', 1, 0, 10);

            expect(events).toEqual([
                { type: 'start', channel: 'primary' },
                {
                    type: 'move',
                    channel: 'primary',
                    delta: new Vector2(0, 0.1),
                    unit: 'viewport',
                },
            ]);
        });

        it('should hand over to secondary when a second finger lands', () => {
            touch('pointerdown', 1, 0, 0);
            touch('pointerdown', 2, 10, 0);

            expect(events).toEqual([
                { type: 'start', channel: 'primary' },
                { type: 'end', channel: 'primary' },
                { type: 'start', channel: 'secondary' },
            ]);
        });

        it('should pan with the centre of two fingers and pinch with their distance', () => {
            touch('pointerdown', 1, 0, 0);
            touch('pointerdown', 2, 10, 0);
            events.length = 0;

            touch('pointermove', 2, 20, 0);

            expect(events).toEqual([
                {
                    type: 'move',
                    channel: 'secondary',
                    delta: new Vector2(0.05, 0),
                    unit: 'viewport',
                },
                { type: 'scale', factor: 2 },
            ]);
        });

        it('should not pinch from two fingers on the same spot', () => {
            touch('pointerdown', 1, 0, 0);
            touch('pointerdown', 2, 0, 0);
            events.length = 0;

            touch('pointermove', 2, 10, 0);
            touch('pointermove', 2, 20, 0);

            const scales = events.filter(({ type }) => type === 'scale');
            expect(scales).toEqual([{ type: 'scale', factor: 2 }]);
        });

        it('should go back to primary when one of two fingers lifts', () => {
            touch('pointerdown', 1, 0, 0);
            touch('pointerdown', 2, 10, 0);
            events.length = 0;

            touch('pointerup', 2, 10, 0);
            touch('pointermove', 1, 0, 10);

            expect(events).toEqual([
                { type: 'end', channel: 'secondary' },
                { type: 'start', channel: 'primary' },
                {
                    type: 'move',
                    channel: 'primary',
                    delta: new Vector2(0, 0.1),
                    unit: 'viewport',
                },
            ]);
        });

        it('should stop reporting with a third finger down', () => {
            touch('pointerdown', 1, 0, 0);
            touch('pointerdown', 2, 10, 0);
            touch('pointerdown', 3, 20, 0);
            events.length = 0;

            touch('pointermove', 3, 30, 0);

            expect(events).toEqual([]);
        });

        it('should leave the touches be when a mouse beside them lets go', () => {
            fire(pointer('pointerdown', { id: 1 }));
            touch('pointerdown', 2, 0, 0);
            events.length = 0;

            fire(pointer('pointerup', { id: 1 }));

            expect(events).toEqual([]);
        });

        it('should end when the last finger lifts', () => {
            touch('pointerdown', 1, 0, 0);
            touch('pointerup', 1, 0, 0);

            expect(events.at(-1)).toEqual({ type: 'end', channel: 'primary' });
        });
    });

    describe('wheel', () => {
        const wheel = (deltaY: number) =>
            fire(new WheelEvent('wheel', { deltaY, cancelable: true }));

        it('should move closer on an upward wheel', () => {
            const event = wheel(-120);

            expect(events).toEqual([{ type: 'scale', factor: 1 / 0.95 }]);
            expect(event.defaultPrevented).toBe(true);
        });

        it('should move away on a downward wheel', () => {
            wheel(3);

            expect(events).toEqual([{ type: 'scale', factor: 0.95 }]);
        });

        it('should ignore a wheel that did not turn', () => {
            wheel(0);

            expect(events).toEqual([]);
        });

        it('should ignore the wheel during a drag', () => {
            fire(pointer('pointerdown'));
            events.length = 0;

            wheel(-1);

            expect(events).toEqual([]);
        });
    });

    describe('while disabled', () => {
        beforeEach(() => {
            input.enabled = false;
        });

        it('should not start anything', () => {
            fire(pointer('pointerdown'));

            expect(events).toEqual([]);
        });

        it('should leave the wheel and the context menu to the page', () => {
            const scroll = fire(
                new WheelEvent('wheel', { deltaY: 1, cancelable: true }),
            );
            const menu = fire(
                new MouseEvent('contextmenu', { cancelable: true }),
            );

            expect(events).toEqual([]);
            expect(scroll.defaultPrevented).toBe(false);
            expect(menu.defaultPrevented).toBe(false);
        });

        it('should still follow a drag, so it resumes from where it is', () => {
            input.enabled = true;
            fire(pointer('pointerdown', { x: 0 }));
            input.enabled = false;
            fire(pointer('pointermove', { x: 50 }));
            input.enabled = true;
            events.length = 0;

            fire(pointer('pointermove', { x: 60 }));

            expect(events).toEqual([
                {
                    type: 'move',
                    channel: 'primary',
                    delta: new Vector2(0.1, 0),
                    unit: 'viewport',
                },
            ]);
        });
    });

    it('should not report movement on an element with no height', () => {
        Object.defineProperty(element, 'clientHeight', { value: 0 });
        fire(pointer('pointerdown'));
        events.length = 0;

        fire(pointer('pointermove', { x: 10 }));

        expect(events).toEqual([]);
    });

    describe('setElement', () => {
        it('should move over to another element', () => {
            const other = makeElement();

            input.setElement(other);
            fire(pointer('pointerdown'));
            fire(pointer('pointerdown'), other);

            expect(input.element).toBe(other);
            expect(element.style.touchAction).not.toBe('none');
            expect(other.style.touchAction).toBe('none');
            expect(events).toEqual([{ type: 'start', channel: 'primary' }]);
        });

        it('should end a drag on the element it leaves', () => {
            fire(pointer('pointerdown', { id: 4 }));

            input.setElement(makeElement());

            expect(element.releasePointerCapture).toHaveBeenCalledWith(4);
            expect(events.at(-1)).toEqual({ type: 'end', channel: 'primary' });
        });

        it('should do nothing for the element it already has', () => {
            fire(pointer('pointerdown'));

            input.setElement(element);

            expect(events).toEqual([{ type: 'start', channel: 'primary' }]);
        });
    });

    it('should give the element its own touch-action back on dispose', () => {
        const own = makeElement();
        own.style.touchAction = 'pan-y';
        const other = new PointerInput(own);

        other.dispose();

        expect(own.style.touchAction).toBe('pan-y');
    });

    it('should end a drag and stop listening on dispose', () => {
        fire(pointer('pointerdown'));

        input.dispose();
        fire(pointer('pointermove', { x: 10 }));
        fire(pointer('pointerdown', { id: 2 }));

        expect(events).toEqual([
            { type: 'start', channel: 'primary' },
            { type: 'end', channel: 'primary' },
        ]);
    });
});
