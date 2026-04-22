import { DIVEClock, DIVETicker } from '../Clock.ts';

describe('DIVEClock', () => {
    let clock: DIVEClock;
    let mockTicker: DIVETicker;

    beforeEach(() => {
        vi.useFakeTimers();
        vi.clearAllMocks();
        clock = new DIVEClock();
        mockTicker = {
            uuid: 'test-uuid',
            tick: vi.fn(),
        };
    });

    afterEach(() => {
        vi.useRealTimers();
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

    it('should start and stop the clock', async () => {
        clock.addTicker(mockTicker);

        await clock.startAsync();
        expect(clock['_isRunning']).toBe(true);

        // Advance time to trigger tick
        vi.advanceTimersByTime(16); // 16ms for ~60fps
        expect(mockTicker.tick).toHaveBeenCalled();

        clock.stop();
        expect(clock['_isRunning']).toBe(false);
    });

    it('should tick multiple registered tickers even if one no-ops internally', async () => {
        let canvasIsValid = true;
        const noOpTicker: DIVETicker = {
            uuid: 'noop-ticker',
            tick: vi.fn(() => {
                if (canvasIsValid) {
                    return;
                }
            }),
        };
        const activeTicker: DIVETicker = {
            uuid: 'active-ticker',
            tick: vi.fn(),
        };

        clock.addTicker(noOpTicker);
        clock.addTicker(activeTicker);
        await clock.startAsync();

        vi.advanceTimersByTime(16);

        expect(noOpTicker.tick).toHaveBeenCalledTimes(1);
        expect(activeTicker.tick).toHaveBeenCalledTimes(1);

        canvasIsValid = false;
        vi.advanceTimersByTime(16);

        expect(noOpTicker.tick).toHaveBeenCalledTimes(2);
        expect(activeTicker.tick).toHaveBeenCalledTimes(2);
    });

    it('should stop ticking a removed ticker during runtime', async () => {
        const removableTicker: DIVETicker = {
            uuid: 'removable-ticker',
            tick: vi.fn(),
        };
        const persistentTicker: DIVETicker = {
            uuid: 'persistent-ticker',
            tick: vi.fn(),
        };

        clock.addTicker(removableTicker);
        clock.addTicker(persistentTicker);
        await clock.startAsync();

        vi.advanceTimersByTime(16);
        clock.removeTicker(removableTicker);
        vi.advanceTimersByTime(16);

        expect(removableTicker.tick).toHaveBeenCalledTimes(1);
        expect(persistentTicker.tick).toHaveBeenCalledTimes(2);
    });

    it('should not tick when stopped', async () => {
        clock.addTicker(mockTicker);

        await clock.startAsync();
        clock.stop();

        vi.advanceTimersByTime(16);
        expect(mockTicker.tick).not.toHaveBeenCalled();
    });

    it('should calculate delta time between ticks', async () => {
        clock.addTicker(mockTicker);
        await clock.startAsync();

        // First tick
        vi.advanceTimersByTime(16);
        expect(mockTicker.tick).toHaveBeenCalledWith(expect.any(Number));

        // Second tick
        vi.advanceTimersByTime(16);
        expect(mockTicker.tick).toHaveBeenCalledWith(expect.any(Number));
    });

    it('should dispose by stopping and clearing tickers', async () => {
        clock.addTicker(mockTicker);
        await clock.startAsync();

        clock.dispose();

        expect(clock['_isRunning']).toBe(false);
        expect(clock['_tickers']).toHaveLength(0);

        vi.advanceTimersByTime(16);
        expect(mockTicker.tick).not.toHaveBeenCalled();
    });

    it('should not restart if already running', async () => {
        await clock.startAsync();
        const initialLastTime = clock['_lastTime'];

        // Try to start again
        await clock.startAsync();
        expect(clock['_lastTime']).toBe(initialLastTime);
    });

    it('should handle removing non-existent ticker', () => {
        const nonExistentTicker: DIVETicker = {
            uuid: 'non-existent-uuid',
            tick: vi.fn(),
        };
        expect(() => clock.removeTicker(nonExistentTicker)).not.toThrow();
    });

    it('should not add ticker with duplicate UUID', () => {
        const ticker1: DIVETicker = {
            uuid: 'same-uuid',
            tick: vi.fn(),
        };
        const ticker2: DIVETicker = {
            uuid: 'same-uuid',
            tick: vi.fn(),
        };

        clock.addTicker(ticker1);
        clock.addTicker(ticker2);

        expect(clock['_tickers']).toHaveLength(1);
        expect(clock['_tickers'][0]).toBe(ticker1);
    });
});
