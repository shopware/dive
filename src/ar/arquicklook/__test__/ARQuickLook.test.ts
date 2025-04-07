import { Box3, Color, Euler, Mesh, Object3D, Vector3 } from 'three';
import { DIVEScene } from '../../../scene/Scene';
import { ARSystemOptions } from '../../ARSystem';
import { ARQuickLook } from '../ARQuickLook';
import { AssetConverter } from '../../../asset/converter/AssetConverter';

jest.mock('../../../scene/Scene', () => {
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

// Mock the Converter class
jest.mock('../../../asset/converter/AssetConverter', () => {
    return {
        AssetConverter: {
            convert: jest.fn().mockReturnThis(),
            to: jest.fn().mockResolvedValue(new ArrayBuffer(0)),
        },
    };
});

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
        quickLook = new ARQuickLook();
        jest.clearAllMocks();
    });

    describe('constructor', () => {
        it('should create an instance', () => {
            expect(quickLook).toBeInstanceOf(ARQuickLook);
        });
    });

    describe('launch', () => {
        it('should convert and launch with default options', async () => {
            await quickLook.launch(mockUri);

            expect(AssetConverter.convert).toHaveBeenCalledWith(mockUri);
            expect((AssetConverter as any).to).toHaveBeenCalledWith('usdz', {
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

            expect(AssetConverter.convert).toHaveBeenCalledWith(mockUri);
            expect((AssetConverter as any).to).toHaveBeenCalledWith('usdz', {
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
            ((AssetConverter as any).to as jest.Mock).mockRejectedValueOnce(
                error,
            );

            await expect(quickLook.launch(mockUri)).rejects.toThrow(error);
        });

        it('should create a blob with correct MIME type', async () => {
            const mockBuffer = new ArrayBuffer(100);
            ((AssetConverter as any).to as jest.Mock).mockResolvedValueOnce(
                mockBuffer,
            );

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
