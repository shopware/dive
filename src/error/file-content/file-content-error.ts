export class FileContentError extends Error {
    constructor(public readonly uri: string) {
        super(`Failed to create array buffer from fetched file! (Uri: ${uri})`);
        this.name = 'FileContentError';
    }
}
