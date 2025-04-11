export class FileTypeError extends Error {
    constructor(
        message: string,
        public readonly requestedFileType: string,
    ) {
        super(message);
        this.name = 'FileTypeError';
    }
}
