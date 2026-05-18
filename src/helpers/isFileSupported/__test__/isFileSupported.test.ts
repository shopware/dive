import { afterAll, describe, expect, it, vi } from 'vitest';
import { isFileSupported } from '../isFileSupported.ts';

const OriginalDataTransferItem = globalThis.DataTransferItem;

class MockDataTransferItem {
    kind = 'file';

    constructor(public type: string) {}
}

vi.stubGlobal('DataTransferItem', MockDataTransferItem);

function createDataTransferItem(type: string) {
    return new MockDataTransferItem(type) as unknown as DataTransferItem;
}

describe('isFileSupported', () => {
    afterAll(() => {
        vi.stubGlobal('DataTransferItem', OriginalDataTransferItem);
    });

    it('should return true for supported file extensions', () => {
        expect(isFileSupported('glb')).toBe(true);
        expect(isFileSupported('gltf')).toBe(true);
        expect(isFileSupported('usdz')).toBe(true);
        expect(isFileSupported('step')).toBe(true);
        expect(isFileSupported('stp')).toBe(true);
        expect(isFileSupported('iges')).toBe(true);
        expect(isFileSupported('igs')).toBe(true);
    });

    it('should return true for supported file extensions regardless of case', () => {
        expect(isFileSupported('GLB')).toBe(true);
        expect(isFileSupported('GlTf')).toBe(true);
        expect(isFileSupported('STEP')).toBe(true);
    });

    it('should return true for supported MIME type strings', () => {
        expect(isFileSupported('model/gltf-binary')).toBe(true);
        expect(isFileSupported('model/gltf+json')).toBe(true);
        expect(isFileSupported('model/vnd.usdz+zip')).toBe(true);
        expect(isFileSupported('application/step')).toBe(true);
        expect(isFileSupported('model/iges+xml')).toBe(true);
    });

    it('should return true for strings with supported file extensions in URIs', () => {
        expect(isFileSupported('https://example.com/model.glb')).toBe(true);
        expect(isFileSupported('/assets/model.gltf?version=1')).toBe(true);
        expect(isFileSupported('file:///assets/model.step')).toBe(true);
    });

    it('should return false for unsupported strings', () => {
        expect(isFileSupported('jpg')).toBe(false);
        expect(isFileSupported('text/plain')).toBe(false);
        expect(isFileSupported('application/octet-stream')).toBe(false);
        expect(isFileSupported('https://example.com/model.txt')).toBe(false);
        expect(isFileSupported('')).toBe(false);
    });

    it('should return true for File instances with supported extensions', () => {
        expect(isFileSupported(new File(['model'], 'model.glb'))).toBe(true);
        expect(isFileSupported(new File(['model'], 'part.STEP'))).toBe(true);
    });

    it('should return true for File instances with supported MIME types', () => {
        expect(
            isFileSupported(
                new File(['model'], 'model-without-extension', {
                    type: 'model/gltf-binary',
                }),
            ),
        ).toBe(true);
    });

    it('should return false for File instances with unsupported type information', () => {
        expect(isFileSupported(new File(['model'], 'model.txt'))).toBe(false);
        expect(
            isFileSupported(
                new File(['model'], 'model-without-extension', {
                    type: 'text/plain',
                }),
            ),
        ).toBe(false);
    });

    it('should return true for DataTransferItem instances with supported MIME types', () => {
        expect(
            isFileSupported(createDataTransferItem('model/gltf-binary')),
        ).toBe(true);
        expect(
            isFileSupported(createDataTransferItem('application/step')),
        ).toBe(true);
        expect(isFileSupported(createDataTransferItem('model/iges'))).toBe(
            true,
        );
    });

    it('should return false for DataTransferItem instances with unsupported MIME types', () => {
        expect(isFileSupported(createDataTransferItem('text/plain'))).toBe(
            false,
        );
        expect(
            isFileSupported(createDataTransferItem('application/octet-stream')),
        ).toBe(false);
        expect(isFileSupported(createDataTransferItem(''))).toBe(false);
    });

    it('should return false for unsupported file-like objects', () => {
        expect(
            isFileSupported({
                name: 'model.glb',
                type: 'model/gltf-binary',
            } as File),
        ).toBe(false);
    });
});
