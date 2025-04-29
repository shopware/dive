import { DIVEClock, DIVETicker } from '../Clock.ts';

jest.useFakeTimers();

describe('DIVEClock', () => {
    let clock: DIVEClock;
    let mockTicker: DIVETicker;

    beforeEach(() => {
        jest.clearAllMocks();
        clock = new DIVEClock();
        mockTicker = {
            uuid: 'test-uuid',
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
            uuid: 'non-existent-uuid',
            tick: jest.fn(),
        };
        expect(() => clock.removeTicker(nonExistentTicker)).not.toThrow();
    });

    it('should call dispose on tickers that have it', () => {
        const tickerWithDispose: DIVETicker = {
            uuid: 'ticker-with-dispose',
            tick: jest.fn(),
            dispose: jest.fn(),
        };
        const tickerWithoutDispose: DIVETicker = {
            uuid: 'ticker-without-dispose',
            tick: jest.fn(),
        };

        clock.addTicker(tickerWithDispose);
        clock.addTicker(tickerWithoutDispose);

        clock.dispose();

        expect(tickerWithDispose.dispose).toHaveBeenCalled();
        expect(clock['_tickers']).toHaveLength(0);
    });

    it('should not add ticker with duplicate UUID', () => {
        const ticker1: DIVETicker = {
            uuid: 'same-uuid',
            tick: jest.fn(),
        };
        const ticker2: DIVETicker = {
            uuid: 'same-uuid',
            tick: jest.fn(),
        };

        clock.addTicker(ticker1);
        clock.addTicker(ticker2);

        expect(clock['_tickers']).toHaveLength(1);
        expect(clock['_tickers'][0]).toBe(ticker1);
    });

    it('should set renderer and call render on tick', () => {
        const mockRenderer = {
            render: jest.fn(),
        };

        clock.setRenderer(mockRenderer as any);
        clock.start();

        jest.advanceTimersByTime(16);

        expect(mockRenderer.render).toHaveBeenCalled();
    });
});
