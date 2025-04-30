import { DIVERenderPipeline } from '../renderer/Renderer.ts';

export interface DIVETicker {
    uuid: string;
    tick(deltaTime: number): void;
    dispose?(): void;
}

export class DIVEClock {
    private _renderer: DIVERenderPipeline | null = null;

    private _lastTime: number = 0;
    private _isRunning: boolean = false;
    private _tickers: DIVETicker[] = [];

    public start(): void {
        if (this._isRunning) return;
        this._isRunning = true;
        this._lastTime = performance.now();
        requestAnimationFrame(this._tick.bind(this));
    }

    public stop(): void {
        this._isRunning = false;
    }

    public setRenderer(renderer: DIVERenderPipeline): void {
        this._renderer = renderer;
    }

    public addTicker(ticker: DIVETicker): void {
        if (this._tickers.find((t) => t.uuid === ticker.uuid)) return;
        this._tickers.push(ticker);
    }

    public removeTicker(ticker: DIVETicker): void {
        const index = this._tickers.findIndex((t) => t.uuid === ticker.uuid);
        if (index !== -1) {
            this._tickers.splice(index, 1);
        }
    }

    public dispose(): void {
        this.stop();
        this._tickers.forEach((ticker) => ticker.dispose?.());
        this._tickers = [];
        this._isRunning = false;
        this._lastTime = 0;
    }

    private _tick(currentTime: number): void {
        if (!this._isRunning) return;

        const deltaTime = (currentTime - this._lastTime) / 1000;
        this._lastTime = currentTime;

        this._tickers.forEach((ticker) => ticker.tick(deltaTime));

        this._renderer?.render();

        requestAnimationFrame(this._tick.bind(this));
    }
}
