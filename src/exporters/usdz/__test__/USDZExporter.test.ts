import { Object3D } from 'three';
import { DIVEUSDZExporter, DIVEUSDZExporterOptions } from '../USDZExporter';

describe('DIVEUSDZExporter', () => {
    let exporter: DIVEUSDZExporter;
    let scene: Object3D;

    beforeEach(() => {
        exporter = new DIVEUSDZExporter();
        scene = new Object3D();
    });

    test('should create an instance of DIVEUSDZExporter', () => {
        expect(exporter).toBeInstanceOf(DIVEUSDZExporter);
    });

    test('should call parse method with scene and options', async () => {
        const options: DIVEUSDZExporterOptions = {
            ar: {
                anchoring: { type: 'plane' },
                planeAnchoring: { alignment: 'horizontal' },
            },
        };

        const result = await exporter.parse(scene, options);
        expect(result).toBeInstanceOf(Uint8Array);
    });

    test('should call parse method without options', async () => {
        const result = await exporter.parse(scene);
        expect(result).toBeInstanceOf(Uint8Array);
    });

    test('should handle parse method with different anchoring types', async () => {
        const options: DIVEUSDZExporterOptions = {
            ar: {
                anchoring: { type: 'image' },
                planeAnchoring: { alignment: 'vertical' },
            },
        };

        const result = await exporter.parse(scene, options);
        expect(result).toBeInstanceOf(Uint8Array);
    });

    test('should handle parse method with different plane anchoring alignments', async () => {
        const options: DIVEUSDZExporterOptions = {
            ar: {
                anchoring: { type: 'face' },
                planeAnchoring: { alignment: 'any' },
            },
        };

        const result = await exporter.parse(scene, options);
        expect(result).toBeInstanceOf(Uint8Array);
    });
});
