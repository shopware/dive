import { describe, expect, it } from 'vitest';
import {
    FILE_TYPES,
    SUPPORTED_MIME_TYPES,
} from '../../../types/file/FileTypes.ts';
import { isMimeTypeSupported } from '../isMimeTypeSupported.ts';

describe('isMimeTypeSupported', () => {
    it('should return true for all supported MIME types', () => {
        SUPPORTED_MIME_TYPES.forEach((mimeType) => {
            expect(isMimeTypeSupported(mimeType)).toBe(true);
        });
    });

    it('should return true for MIME types regardless of case', () => {
        expect(isMimeTypeSupported('MODEL/GLTF-BINARY')).toBe(true);
        expect(isMimeTypeSupported('Model/Gltf+Json')).toBe(true);
        expect(isMimeTypeSupported('APPLICATION/STEP')).toBe(true);
        expect(isMimeTypeSupported('MODEL/IGES+XML')).toBe(true);
    });

    it('should return false for unsupported MIME types', () => {
        expect(isMimeTypeSupported('text/plain')).toBe(false);
        expect(isMimeTypeSupported('image/png')).toBe(false);
        expect(isMimeTypeSupported('application/pdf')).toBe(false);
        expect(isMimeTypeSupported('application/octet-stream')).toBe(false);
        expect(isMimeTypeSupported('')).toBe(false);
    });

    it('should include each configured file type MIME type in supported MIME types', () => {
        Object.values(FILE_TYPES).forEach((fileType) => {
            fileType.mimeTypes.forEach((mimeType) => {
                expect(SUPPORTED_MIME_TYPES).toContain(mimeType);
            });
        });
    });
});
