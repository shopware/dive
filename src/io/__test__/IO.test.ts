import { DIVEIO } from '../IO';
import { DIVEScene } from '../../scene/Scene';

import { type GLTF } from 'three/examples/jsm/loaders/GLTFLoader';

jest.mock('../gltf/GLTFIO', () => {

    return {

        DIVEGLTFIO: jest.fn(function () {

            this.Import = jest.fn();

            this.Export = jest.fn();

            return this;

        })

    };

});

jest.mock('../../scene/Scene.ts', () => {

    return {

        DIVEScene: jest.fn(function () {

            this.add = jest.fn();

            this.isObject3D = true;

            this.parent = null;

            this.dispatchEvent = jest.fn();

            this.position = {

                set: jest.fn(),

            }

            this.SetIntensity = jest.fn();

            this.SetEnabled = jest.fn();

            this.SetColor = jest.fn();

            this.userData = {

                id: undefined,

            }

            this.removeFromParent = jest.fn();

            return this;
        })

    };

});

let testIO: DIVEIO;

describe('dive/io/DIVEIO', () => {
    beforeEach(() => {

        testIO = new DIVEIO(new DIVEScene());

    });

    afterEach(() => {

        jest.clearAllMocks();

    });

    it('should instantiate', () => {

        expect(testIO).toBeDefined();

    });

    it('should import from URL', async () => {

        const mockGLTF = {} as GLTF;

        jest.spyOn(testIO['_gltfIO'], 'Import').mockResolvedValueOnce(mockGLTF);

        const result = await testIO.Import('glb', 'test.glb');

        expect(result).toStrictEqual(mockGLTF);

    });

    it('should reject when importing with unsupported file type', async () => {

        jest.spyOn(console, 'error').mockImplementationOnce(() => { });

        const result = await testIO.Import('unsupported file type' as "glb", 'test.glb');

        expect(result).toStrictEqual(null);

    });

    it('should export to URL', async () => {

        const mockObject = {};

        const mockURL = 'blob://mockURL';

        jest.spyOn(testIO['_gltfIO'], 'Export').mockResolvedValueOnce(mockObject);

        URL.createObjectURL = jest.fn().mockReturnValueOnce(mockURL);

        const result = await testIO.Export('glb');

        expect(result).toBeDefined();

    });

    it('should handle rejection from gltf io', async () => {

        jest.spyOn(console, 'error').mockImplementationOnce(() => { });

        jest.spyOn(testIO['_gltfIO'], 'Export').mockRejectedValueOnce('Error');

        const result = await testIO.Export('glb');

        expect(result).toBeDefined();

    });

    it('should reject when exporting with unsupported file type', async () => {

        jest.spyOn(console, 'error').mockImplementationOnce(() => { });

        const result = await testIO.Export('unsupported file type' as "glb");

        expect(result).toStrictEqual(null);

    });
});