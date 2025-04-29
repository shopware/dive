import { DIVERenderPipeline } from '../renderer/Renderer';
export interface DIVETicker {
    uuid: string;
    tick(deltaTime: number): void;
    dispose?(): void;
}
export declare class DIVEClock {
    private _renderer;
    private _lastTime;
    private _isRunning;
    private _tickers;
    start(): void;
    stop(): void;
    setRenderer(renderer: DIVERenderPipeline): void;
    addTicker(ticker: DIVETicker): void;
    removeTicker(ticker: DIVETicker): void;
    dispose(): void;
    private _tick;
}
