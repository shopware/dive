import { FileTypeError } from '../file-type-error';

describe('FileTypeError', () => {
    it('should create a FileTypeError with message and requested file type', () => {
        const error = new FileTypeError('Unsupported file type', 'pdf');
        expect(error.message).toBe('Unsupported file type');
        expect(error.name).toBe('FileTypeError');
        expect(error.requestedFileType).toBe('pdf');
    });
});
