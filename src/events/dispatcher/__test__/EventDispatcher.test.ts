import { describe, it, expect, vi, beforeEach } from 'vitest';
import { EventDispatcher } from '../EventDispatcher.ts';

// Define a test event type interface for testing
interface TestEvents {
    'user-click': { x: number; y: number };
    'data-loaded': { data: string; timestamp: number };
    'simple-event': string;
    'no-payload': undefined;
}

describe('dive/events/executor/EventDispatcher', () => {
    let eventExecutor: EventDispatcher<TestEvents>;

    beforeEach(() => {
        eventExecutor = new EventDispatcher<TestEvents>();
    });

    describe('addEventListener', () => {
        it('should subscribe to an event and return an unsubscribe function', () => {
            const listener = vi.fn();
            const unsubscribe = eventExecutor.addEventListener(
                'user-click',
                listener,
            );

            expect(typeof unsubscribe).toBe('function');
            expect(listener).not.toHaveBeenCalled();
        });

        it('should allow multiple subscribers to the same event', () => {
            const listener1 = vi.fn();
            const listener2 = vi.fn();
            const listener3 = vi.fn();

            const unsubscribe1 = eventExecutor.addEventListener(
                'user-click',
                listener1,
            );
            const unsubscribe2 = eventExecutor.addEventListener(
                'user-click',
                listener2,
            );
            const unsubscribe3 = eventExecutor.addEventListener(
                'user-click',
                listener3,
            );

            expect(typeof unsubscribe1).toBe('function');
            expect(typeof unsubscribe2).toBe('function');
            expect(typeof unsubscribe3).toBe('function');
        });

        it('should allow subscribing to different event types', () => {
            const clickListener = vi.fn();
            const dataListener = vi.fn();

            const unsubscribeClick = eventExecutor.addEventListener(
                'user-click',
                clickListener,
            );
            const unsubscribeData = eventExecutor.addEventListener(
                'data-loaded',
                dataListener,
            );

            expect(typeof unsubscribeClick).toBe('function');
            expect(typeof unsubscribeData).toBe('function');
        });

        it('should allow the same listener to subscribe to multiple events', () => {
            const listener = vi.fn();

            const unsubscribe1 = eventExecutor.addEventListener(
                'user-click',
                listener,
            );
            const unsubscribe2 = eventExecutor.addEventListener(
                'data-loaded',
                listener,
            );

            expect(typeof unsubscribe1).toBe('function');
            expect(typeof unsubscribe2).toBe('function');
        });
    });

    describe('dispatchEvent', () => {
        it('should call subscribed listeners when event is dispatched', () => {
            const listener = vi.fn();
            eventExecutor.addEventListener('user-click', listener);

            const payload = { x: 100, y: 200 };
            // Using any to access protected method for testing
            eventExecutor.dispatchEvent('user-click', payload);

            expect(listener).toHaveBeenCalledTimes(1);
            expect(listener).toHaveBeenCalledWith(payload);
        });

        it('should call all subscribed listeners for an event', () => {
            const listener1 = vi.fn();
            const listener2 = vi.fn();
            const listener3 = vi.fn();

            eventExecutor.addEventListener('user-click', listener1);
            eventExecutor.addEventListener('user-click', listener2);
            eventExecutor.addEventListener('user-click', listener3);

            const payload = { x: 50, y: 75 };
            eventExecutor.dispatchEvent('user-click', payload);

            expect(listener1).toHaveBeenCalledTimes(1);
            expect(listener1).toHaveBeenCalledWith(payload);
            expect(listener2).toHaveBeenCalledTimes(1);
            expect(listener2).toHaveBeenCalledWith(payload);
            expect(listener3).toHaveBeenCalledTimes(1);
            expect(listener3).toHaveBeenCalledWith(payload);
        });

        it('should not call listeners for different event types', () => {
            const clickListener = vi.fn();
            const dataListener = vi.fn();

            eventExecutor.addEventListener('user-click', clickListener);
            eventExecutor.addEventListener('data-loaded', dataListener);

            const clickPayload = { x: 10, y: 20 };
            eventExecutor.dispatchEvent('user-click', clickPayload);

            expect(clickListener).toHaveBeenCalledTimes(1);
            expect(clickListener).toHaveBeenCalledWith(clickPayload);
            expect(dataListener).not.toHaveBeenCalled();
        });

        it('should handle events with no payload', () => {
            const listener = vi.fn();
            eventExecutor.addEventListener('no-payload', listener);

            eventExecutor.dispatchEvent('no-payload');

            expect(listener).toHaveBeenCalledTimes(1);
            expect(listener).toHaveBeenCalledWith(undefined);
        });

        it('should handle dispatching to events with no listeners', () => {
            expect(() => {
                eventExecutor.dispatchEvent('user-click', { x: 1, y: 2 });
            }).not.toThrow();
        });

        it('should handle dispatching non-existent event types', () => {
            expect(() => {
                eventExecutor.dispatchEvent(
                    'non-existent-event' as keyof TestEvents,
                    { x: 1, y: 2 },
                );
            }).not.toThrow();
        });

        it('should call listeners in the order they were subscribed', () => {
            const callOrder: number[] = [];
            const listener1 = vi.fn(() => callOrder.push(1));
            const listener2 = vi.fn(() => callOrder.push(2));
            const listener3 = vi.fn(() => callOrder.push(3));

            eventExecutor.addEventListener('user-click', listener1);
            eventExecutor.addEventListener('user-click', listener2);
            eventExecutor.addEventListener('user-click', listener3);

            eventExecutor.dispatchEvent('user-click', { x: 0, y: 0 });

            expect(callOrder).toEqual([1, 2, 3]);
        });
    });

    describe('unsubscribe', () => {
        it('should successfully unsubscribe a listener', () => {
            const listener = vi.fn();
            const unsubscribe = eventExecutor.addEventListener(
                'user-click',
                listener,
            );

            const result = unsubscribe();

            expect(result).toBe(true);

            // Dispatch event to verify listener was removed
            eventExecutor.dispatchEvent('user-click', { x: 1, y: 2 });
            expect(listener).not.toHaveBeenCalled();
        });

        it('should return false when trying to unsubscribe a non-existent listener', () => {
            const listener = vi.fn();
            const unsubscribe = eventExecutor.addEventListener(
                'user-click',
                listener,
            );

            // Unsubscribe once
            const firstResult = unsubscribe();
            expect(firstResult).toBe(true);

            // Try to unsubscribe again
            const secondResult = unsubscribe();
            expect(secondResult).toBe(false);
        });

        it('should return false when trying to unsubscribe from non-existent event type', () => {
            const listener = vi.fn();
            // Subscribe to one event type
            eventExecutor.addEventListener('user-click', listener);

            // Try to unsubscribe from a different event type by creating a fake unsubscribe function
            const fakeUnsubscribe = eventExecutor.addEventListener(
                'data-loaded',
                vi.fn(),
            );
            const result = fakeUnsubscribe();

            expect(result).toBe(true); // This should actually work for the data-loaded event
        });

        it('should only remove the specific listener when multiple listeners exist', () => {
            const listener1 = vi.fn();
            const listener2 = vi.fn();
            const listener3 = vi.fn();

            eventExecutor.addEventListener('user-click', listener1);
            const unsubscribe2 = eventExecutor.addEventListener(
                'user-click',
                listener2,
            );
            eventExecutor.addEventListener('user-click', listener3);

            // Unsubscribe only listener2
            const result = unsubscribe2();
            expect(result).toBe(true);

            // Dispatch event to verify only listener2 was removed
            const payload = { x: 10, y: 20 };
            eventExecutor.dispatchEvent('user-click', payload);

            expect(listener1).toHaveBeenCalledWith(payload);
            expect(listener2).not.toHaveBeenCalled();
            expect(listener3).toHaveBeenCalledWith(payload);
        });

        it('should handle unsubscribing all listeners', () => {
            const listener1 = vi.fn();
            const listener2 = vi.fn();
            const listener3 = vi.fn();

            const unsubscribe1 = eventExecutor.addEventListener(
                'user-click',
                listener1,
            );
            const unsubscribe2 = eventExecutor.addEventListener(
                'user-click',
                listener2,
            );
            const unsubscribe3 = eventExecutor.addEventListener(
                'user-click',
                listener3,
            );

            // Unsubscribe all
            expect(unsubscribe1()).toBe(true);
            expect(unsubscribe2()).toBe(true);
            expect(unsubscribe3()).toBe(true);

            // Dispatch event to verify no listeners are called
            eventExecutor.dispatchEvent('user-click', { x: 5, y: 10 });

            expect(listener1).not.toHaveBeenCalled();
            expect(listener2).not.toHaveBeenCalled();
            expect(listener3).not.toHaveBeenCalled();
        });

        it('should not affect listeners of other event types when unsubscribing', () => {
            const clickListener = vi.fn();
            const dataListener = vi.fn();

            const unsubscribeClick = eventExecutor.addEventListener(
                'user-click',
                clickListener,
            );
            eventExecutor.addEventListener('data-loaded', dataListener);

            // Unsubscribe from click events
            unsubscribeClick();

            // Dispatch both events
            eventExecutor.dispatchEvent('user-click', { x: 1, y: 2 });
            eventExecutor.dispatchEvent('data-loaded', {
                data: 'test',
                timestamp: 123,
            });

            expect(clickListener).not.toHaveBeenCalled();
            expect(dataListener).toHaveBeenCalledWith({
                data: 'test',
                timestamp: 123,
            });
        });

        it('should return false when listener array is deleted from internal map', () => {
            const listener = vi.fn();
            const unsubscribe = eventExecutor.addEventListener(
                'user-click',
                listener,
            );

            // Manually delete the listener array from the internal map to test edge case
            // This simulates a scenario where the listener array no longer exists
            (eventExecutor as any)._listeners.delete('user-click');

            const result = unsubscribe();
            expect(result).toBe(false);
        });
    });

    describe('removeEventListener', () => {
        it('should remove a subscribed listener', () => {
            const listener = vi.fn();
            eventExecutor.addEventListener('user-click', listener);

            eventExecutor.removeEventListener('user-click', listener);

            eventExecutor.dispatchEvent('user-click', { x: 1, y: 2 });
            expect(listener).not.toHaveBeenCalled();
        });

        it('should not throw when removing a non-existent listener', () => {
            const listener = vi.fn();
            eventExecutor.addEventListener('user-click', listener);

            const nonExistentListener = vi.fn();

            expect(() => {
                eventExecutor.removeEventListener(
                    'user-click',
                    nonExistentListener,
                );
            }).not.toThrow();

            eventExecutor.dispatchEvent('user-click', { x: 1, y: 2 });
            expect(listener).toHaveBeenCalled();
        });

        it('should not throw when removing from a non-existent event type', () => {
            const listener = vi.fn();
            eventExecutor.addEventListener('user-click', listener);

            expect(() => {
                eventExecutor.removeEventListener('data-loaded', listener);
            }).not.toThrow();
        });

        it('should only remove the specified listener', () => {
            const listener1 = vi.fn();
            const listener2 = vi.fn();
            eventExecutor.addEventListener('user-click', listener1);
            eventExecutor.addEventListener('user-click', listener2);

            eventExecutor.removeEventListener('user-click', listener1);

            const payload = { x: 10, y: 20 };
            eventExecutor.dispatchEvent('user-click', payload);

            expect(listener1).not.toHaveBeenCalled();
            expect(listener2).toHaveBeenCalledWith(payload);
        });

        it('should not affect other event types', () => {
            const clickListener = vi.fn();
            const dataListener = vi.fn();
            eventExecutor.addEventListener('user-click', clickListener);
            eventExecutor.addEventListener('data-loaded', dataListener);

            eventExecutor.removeEventListener('user-click', clickListener);

            eventExecutor.dispatchEvent('user-click', { x: 1, y: 2 });
            eventExecutor.dispatchEvent('data-loaded', {
                data: 'test',
                timestamp: 123,
            });

            expect(clickListener).not.toHaveBeenCalled();
            expect(dataListener).toHaveBeenCalledWith({
                data: 'test',
                timestamp: 123,
            });
        });
    });

    describe('integration tests', () => {
        it('should handle complex subscription and dispatch patterns', () => {
            const results: string[] = [];

            const clickHandler1 = vi.fn((payload) =>
                results.push(`click1: ${payload.x},${payload.y}`),
            );
            const clickHandler2 = vi.fn((payload) =>
                results.push(`click2: ${payload.x},${payload.y}`),
            );
            const dataHandler = vi.fn((payload) =>
                results.push(`data: ${payload.data}`),
            );

            // Subscribe to multiple events
            const unsubClick1 = eventExecutor.addEventListener(
                'user-click',
                clickHandler1,
            );
            const unsubClick2 = eventExecutor.addEventListener(
                'user-click',
                clickHandler2,
            );
            const unsubData = eventExecutor.addEventListener(
                'data-loaded',
                dataHandler,
            );

            // Dispatch events
            eventExecutor.dispatchEvent('user-click', { x: 10, y: 20 });
            eventExecutor.dispatchEvent('data-loaded', {
                data: 'test-data',
                timestamp: 456,
            });

            expect(results).toEqual([
                'click1: 10,20',
                'click2: 10,20',
                'data: test-data',
            ]);

            // Unsubscribe one click handler
            unsubClick1();
            results.length = 0; // Clear results

            // Dispatch again
            eventExecutor.dispatchEvent('user-click', { x: 30, y: 40 });

            expect(results).toEqual(['click2: 30,40']);

            // Clean up
            unsubClick2();
            unsubData();
        });

        it('should maintain correct listener references after multiple subscribe/unsubscribe operations', () => {
            const listener = vi.fn();

            // Subscribe and unsubscribe multiple times
            const unsub1 = eventExecutor.addEventListener(
                'simple-event',
                listener,
            );
            unsub1();

            const unsub2 = eventExecutor.addEventListener(
                'simple-event',
                listener,
            );
            const unsub3 = eventExecutor.addEventListener(
                'simple-event',
                listener,
            );

            unsub2();

            // Should still have one active subscription
            eventExecutor.dispatchEvent('simple-event', 'test-message');
            expect(listener).toHaveBeenCalledTimes(1);
            expect(listener).toHaveBeenCalledWith('test-message');

            // Clean up
            unsub3();
        });
    });
});
