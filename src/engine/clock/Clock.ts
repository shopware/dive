export interface DIVETicker {
    uuid: string;
    tick(deltaTime: number): void;
}

export class DIVEClock {
    public readonly isDIVEClock: true = true;

    private _lastTime: number = 0;
    private _isRunning: boolean = false;
    private _tickers: DIVETicker[] = [];
    private _animationRequestId: number | null = null;

    public async startAsync(): Promise<void> {
        return new Promise<void>((resolve) => {
            if (this._isRunning) {
                resolve();
                return;
            }

            this._isRunning = true;
            this._lastTime = performance.now();
            this._animationRequestId = requestAnimationFrame(() => {
                this._tick(performance.now());
                resolve();
            });
        });
    }

    public stop(): void {
        this._isRunning = false;
    }

    public addTicker(ticker: DIVETicker): void {
        if (this._tickers.find((t) => t.uuid === ticker.uuid)) return;
        this._tickers.push(ticker);
    }

    public hasTicker(ticker: DIVETicker): boolean {
        return this._tickers.find((t) => t.uuid === ticker.uuid) !== undefined;
    }

    public removeTicker(ticker: DIVETicker): void {
        const index = this._tickers.findIndex((t) => t.uuid === ticker.uuid);
        if (index !== -1) {
            this._tickers.splice(index, 1);
        }
    }

    public dispose(): void {
        this.stop();
        this._tickers = [];
        this._isRunning = false;
        this._lastTime = 0;
        if (this._animationRequestId !== null) {
            cancelAnimationFrame(this._animationRequestId);
            this._animationRequestId = null;
        }
    }

    private _tick(currentTime: number): void {
        if (!this._isRunning) return;

        const deltaTime = (currentTime - this._lastTime) / 1000;
        this._lastTime = currentTime;

        /**
         * one try per ticker, or a throw takes every ticker behind it with it,
         * the view that draws the frame among them
         * reported rather than swallowed, so a broken ticker stays findable
         */
        this._tickers.forEach((ticker) => {
            try {
                ticker.tick(deltaTime);
            } catch (error) {
                console.error(
                    'DIVEClock: a ticker threw and was skipped for this frame.',
                    error,
                );
            }
        });

        // compute first, draw, then book the next frame
        this._animationRequestId = requestAnimationFrame(this._tick.bind(this));
    }
}
