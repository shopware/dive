export interface DIVETicker {
    tick(deltaTime: number): void;
    dispose?(): void;
}
export declare class DIVEClock {
    private _lastTime;
    private _isRunning;
    private _tickers;
    start(): void;
    stop(): void;
    addTicker(ticker: DIVETicker): void;
    removeTicker(ticker: DIVETicker): void;
    dispose(): void;
    private _tick;
}
