import { Object3D } from 'three';
import { DIVEGLTFIO } from '../GLTFIO';

import { type GLTF } from 'three/examples/jsm/loaders/GLTFLoader';
import { GLTFExporterOptions } from 'three/examples/jsm/exporters/GLTFExporter';

jest.mock('three', () => {
    return {
        Object3D: jest.fn(function () {
            this.clear = jest.fn();
            this.color = {};
            this.intensity = 0;
            this.layers = {
                mask: 0,
            };
            this.shadow = {
                radius: 0,
                mapSize: { width: 0, height: 0 },
                bias: 0,
                camera: {
                    near: 0,
                    far: 0,
                    fov: 0,
                },
            }
            this.add = jest.fn();
            this.sub = jest.fn();
            this.children = [{
                visible: true,
                material: {
                    color: {},
                },
            }];
            this.userData = {};
            this.traverse = jest.fn((callback) => {
                callback(this.children[0])
            });
            return this;
        }),
    }
});

jest.mock('three/examples/jsm/loaders/GLTFLoader', () => {
    return {
        GLTFLoader: jest.fn(function () {

            this.loadAsync = (uri: string, progEvent: (p: ProgressEvent<EventTarget>) => void) => new Promise<void>((resolve) => {

                progEvent({ loaded: 0, total: 1 } as ProgressEvent<EventTarget>);

                resolve();

            });

            return this;
        }),
    }
});

jest.mock('three/examples/jsm/exporters/GLTFExporter', () => {

    return {

        GLTFExporter: jest.fn(function () {

            this.parseAsync = (object: Object3D, options?: GLTFExporterOptions) => new Promise<ArrayBuffer | { [key: string]: unknown }>((resolve) => {

                resolve(new ArrayBuffer(0));

            });

            return this;

        })
    }

});

let testGLTFIO: DIVEGLTFIO;

describe('dive/io/gltf/DIVEGLTFIO', () => {
    beforeEach(() => {

        testGLTFIO = new DIVEGLTFIO();

    });

    afterEach(() => {

        jest.clearAllMocks();

    });

    it('should instantiate', () => {

        expect(testGLTFIO).toBeDefined();

    });

    it('should import from URL', async () => {

        const mockGLTF = {} as GLTF;



        // test without progress callback

        jest.spyOn(testGLTFIO['_importer'], 'loadAsync').mockImplementationOnce((uri: string, progEvent?: (p: ProgressEvent<EventTarget>) => void) => new Promise<GLTF>((resolve) => {

            if (progEvent) progEvent({ loaded: 0, total: 1 } as ProgressEvent<EventTarget>);

            resolve(mockGLTF);

        }));

        const resultWithoutProgress = await testGLTFIO.Import('test url', undefined);

        expect(resultWithoutProgress).toStrictEqual(mockGLTF);



        // test with progress callback

        jest.spyOn(testGLTFIO['_importer'], 'loadAsync').mockImplementationOnce((uri: string, progEvent?: (p: ProgressEvent<EventTarget>) => void) => new Promise<GLTF>((resolve) => {

            if (progEvent) progEvent({ loaded: 0, total: 1 } as ProgressEvent<EventTarget>);

            resolve(mockGLTF);

        }));

        const onProgress = jest.fn();

        const resultWithProgress = await testGLTFIO.Import('test url', onProgress);

        expect(resultWithProgress).toStrictEqual(mockGLTF);

        expect(onProgress).toHaveBeenCalledTimes(1);

    });

    it('should export to URL', async () => {

        const mockObject = new Object3D();

        // export as JSON object

        jest.spyOn(testGLTFIO['_exporter'], 'parseAsync').mockResolvedValueOnce({});

        const json = await testGLTFIO.Export(mockObject, false, false);

        expect(json).toBeDefined();



        // export as array buffer

        jest.spyOn(testGLTFIO['_exporter'], 'parseAsync').mockResolvedValueOnce(new ArrayBuffer(0));

        const binary = await testGLTFIO.Export(mockObject, true, false);

        expect(binary).toBeDefined();



        // export as array buffer (only visible)

        jest.spyOn(testGLTFIO['_exporter'], 'parseAsync').mockResolvedValueOnce(new ArrayBuffer(0));

        const binaryOnlyVisible = await testGLTFIO.Export(mockObject, true, true);

        expect(binaryOnlyVisible).toBeDefined();

    });
});