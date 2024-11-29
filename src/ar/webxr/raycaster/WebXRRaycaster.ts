export class DIVEWebXRRaycaster {
    private _session: XRSession;
    private _referenceSpace: XRReferenceSpace;
    private _entityTypes: XRHitTestTrackableType[] | undefined;

    private _hitTestSource: XRHitTestSource | undefined;

    constructor(session: XRSession, referenceSpace: XRReferenceSpace, entityTypes?: XRHitTestTrackableType[]) {
        this._session = session;
        this._referenceSpace = referenceSpace;
        this._entityTypes = entityTypes;
    }

    public Dispose(): void {
        // dispose code here
    }

    public async Init(session: XRSession): Promise<void> {
        if ('requestHitTestSource' in this._session) {
            this.Dispose();
            return Promise.reject();
        }

        this._hitTestSource = await session.requestHitTestSource!({ space: this._referenceSpace, entityTypes: this._entityTypes });

        if (!this._hitTestSource) {
            this.Dispose();
            return Promise.reject();
        }

        return Promise.resolve();
    }
}