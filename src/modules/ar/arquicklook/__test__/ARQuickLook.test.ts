import { Object3D } from 'three';
import { ARSystemOptions } from '../../ARSystem';
import { ARQuickLook } from '../ARQuickLook';
import { AssetConverter } from '../../../asset/converter/AssetConverter';

jest.mock('../../../../scene/Scene', () => {
    return {
        DIVEScene: jest.fn(function () {
            this.add = jest.fn();
            this.children = [];
            this.Root = {
                children: [],
            };
            this.traverse = jest.fn((callback) => {
                this.Root.children.forEach((child: Object3D) => {
                    callback(child);
                });
            });
            return this;
        }),
    };
});

// Mock the dependencies
const mockConvert = jest.fn().mockReturnThis();
const mockTo = jest.fn().mockResolvedValue(new ArrayBuffer(0));

jest.mock('../../../asset/converter/AssetConverter', () => ({
    AssetConverter: jest.fn().mockImplementation(() => ({
        convert: mockConvert,
        to: mockTo,
    })),
}));

// Mock URL.createObjectURL
URL.createObjectURL = jest.fn(() => 'blob:http://localhost:8080/');

// Mock document.createElement
document.createElement = jest.fn().mockReturnValue({
    innerHTML: '',
    rel: '',
    href: '',
    download: '',
    click: jest.fn(),
});

describe('ARQuickLook', () => {
    let mockOptions: ARSystemOptions;
    let mockModels: Object3D[];
    let quickLook: ARQuickLook;
    const mockUri = 'https://example.com/model.glb';

    beforeEach(() => {
        mockModels = [
            new Object3D(),
            new Object3D(),
            new Object3D(),
        ];
        mockModels[1].userData = {
            uri: 'https://example.com',
        };
        mockOptions = {
            arPlacement: 'horizontal',
            arScale: 'auto',
        };
        jest.clearAllMocks();
        quickLook = new ARQuickLook();
    });

    describe('constructor', () => {
        it('should create an instance', () => {
            expect(quickLook).toBeInstanceOf(ARQuickLook);
            expect(AssetConverter).toHaveBeenCalledTimes(1);
        });
    });

    describe('launch', () => {
        it('should convert and launch with default options', async () => {
            await quickLook.launch(mockUri);

            expect(mockConvert).toHaveBeenCalledWith(mockUri);
            expect(mockTo).toHaveBeenCalledWith('usdz', {
                quickLookCompatible: true,
                ar: {
                    anchoring: { type: 'plane' },
                    planeAnchoring: { alignment: 'horizontal' },
                },
            });
            expect(URL.createObjectURL).toHaveBeenCalled();
            expect(document.createElement).toHaveBeenCalledWith('a');
        });

        it('should convert and launch with custom options', async () => {
            const options: ARSystemOptions = {
                arPlacement: 'vertical',
                arScale: 'fixed',
            };
            await quickLook.launch(mockUri, options);

            expect(mockConvert).toHaveBeenCalledWith(mockUri);
            expect(mockTo).toHaveBeenCalledWith('usdz', {
                quickLookCompatible: true,
                ar: {
                    anchoring: { type: 'plane' },
                    planeAnchoring: { alignment: 'vertical' },
                },
            });
            expect(URL.createObjectURL).toHaveBeenCalled();
            expect(document.createElement).toHaveBeenCalledWith('a');
        });

        it('should handle conversion errors', async () => {
            const error = new Error('Conversion failed');
            mockTo.mockRejectedValueOnce(error);

            await expect(quickLook.launch(mockUri)).rejects.toThrow(error);
        });

        it('should create a blob with correct MIME type', async () => {
            const mockBuffer = new ArrayBuffer(100);
            mockTo.mockResolvedValueOnce(mockBuffer);

            await quickLook.launch(mockUri);

            expect(URL.createObjectURL).toHaveBeenCalledWith(
                expect.objectContaining({
                    type: 'model/vnd.usdz+zip',
                }),
            );
        });

        it('should add scale parameter when arScale is fixed', async () => {
            const options: ARSystemOptions = {
                arPlacement: 'horizontal',
                arScale: 'fixed',
            };
            await quickLook.launch(mockUri, options);

            const anchor = document.createElement('a');
            expect(anchor.href).toContain('#allowsContentScaling=0');
        });
    });
});
