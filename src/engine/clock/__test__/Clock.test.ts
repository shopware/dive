import { DIVEClock, DIVETicker } from '../Clock.ts';

jest.useFakeTimers();

describe('DIVEClock', () => {
    let clock: DIVEClock;
    let mockTicker: DIVETicker;

    beforeEach(() => {
        jest.clearAllMocks();
        clock = new DIVEClock();
        mockTicker = {
            tick: jest.fn(),
        };
    });

    it('should instantiate', () => {
        expect(clock).toBeDefined();
    });

    it('should add and remove ticker', () => {
        clock.addTicker(mockTicker);
        expect(clock['_tickers']).toContain(mockTicker);

        clock.removeTicker(mockTicker);
        expect(clock['_tickers']).not.toContain(mockTicker);
    });

    it('should start and stop the clock', () => {
        clock.addTicker(mockTicker);

        clock.start();
        expect(clock['_isRunning']).toBe(true);

        // Advance time to trigger tick
        jest.advanceTimersByTime(16); // 16ms for ~60fps
        expect(mockTicker.tick).toHaveBeenCalled();

        clock.stop();
        expect(clock['_isRunning']).toBe(false);
    });

    it('should not tick when stopped', () => {
        clock.addTicker(mockTicker);

        clock.start();
        clock.stop();

        jest.advanceTimersByTime(16);
        expect(mockTicker.tick).not.toHaveBeenCalled();
    });

    it('should calculate delta time between ticks', () => {
        clock.addTicker(mockTicker);
        clock.start();

        // First tick
        jest.advanceTimersByTime(16);
        expect(mockTicker.tick).toHaveBeenCalledWith(expect.any(Number));

        // Second tick
        jest.advanceTimersByTime(16);
        expect(mockTicker.tick).toHaveBeenCalledWith(expect.any(Number));
    });

    it('should dispose by stopping and clearing tickers', () => {
        clock.addTicker(mockTicker);
        clock.start();

        clock.dispose();

        expect(clock['_isRunning']).toBe(false);
        expect(clock['_tickers']).toHaveLength(0);

        jest.advanceTimersByTime(16);
        expect(mockTicker.tick).not.toHaveBeenCalled();
    });

    it('should not restart if already running', () => {
        clock.start();
        const initialLastTime = clock['_lastTime'];

        // Try to start again
        clock.start();
        expect(clock['_lastTime']).toBe(initialLastTime);
    });

    it('should handle removing non-existent ticker', () => {
        const nonExistentTicker: DIVETicker = {
            tick: jest.fn(),
        };
        expect(() => clock.removeTicker(nonExistentTicker)).not.toThrow();
    });

    it('should call dispose on tickers that have it', () => {
        const tickerWithDispose: DIVETicker = {
            tick: jest.fn(),
            dispose: jest.fn(),
        };
        const tickerWithoutDispose: DIVETicker = {
            tick: jest.fn(),
        };

        clock.addTicker(tickerWithDispose);
        clock.addTicker(tickerWithoutDispose);

        clock.dispose();

        expect(tickerWithDispose.dispose).toHaveBeenCalled();
        expect(clock['_tickers']).toHaveLength(0);
    });
});
