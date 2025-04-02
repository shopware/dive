import { Box3, Color, Euler, Mesh, Object3D, Vector3 } from 'three';
import { DIVEScene } from '../../../scene/Scene';
import { ARSystemOptions } from '../../AR';
import { ARQuickLook } from '../ARQuickLook';
import { Converter } from '../../../converter/Converter';

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
jest.mock('../../../converter/Converter', () => {
    return {
        Converter: {
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

describe('DIVEARQuickLook', () => {
    let mockScene: DIVEScene;
    let mockOptions: ARSystemOptions;
    let mockModels: Object3D[];
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
        mockScene = new DIVEScene();
        mockOptions = {
            arPlacement: 'horizontal',
            arScale: 'auto',
        };
        jest.clearAllMocks();
    });

    describe('constructor', () => {
        it('should create an instance with URI and options', () => {
            const quickLook = new ARQuickLook(mockUri, mockOptions);
            expect(quickLook).toBeInstanceOf(ARQuickLook);
        });

        it('should create an instance with just URI', () => {
            const quickLook = new ARQuickLook(mockUri);
            expect(quickLook).toBeInstanceOf(ARQuickLook);
        });
    });

    describe('launch', () => {
        it('should convert and launch with default options', async () => {
            const quickLook = new ARQuickLook(mockUri);
            await quickLook.launch();

            expect(Converter.convert).toHaveBeenCalledWith(mockUri);
            expect((Converter as any).to).toHaveBeenCalledWith('usdz', {
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
            const quickLook = new ARQuickLook(mockUri, options);
            await quickLook.launch();

            expect(Converter.convert).toHaveBeenCalledWith(mockUri);
            expect((Converter as any).to).toHaveBeenCalledWith('usdz', {
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
            ((Converter as any).to as jest.Mock).mockRejectedValueOnce(error);

            const quickLook = new ARQuickLook(mockUri);
            await expect(quickLook.launch()).rejects.toThrow(error);
        });

        it('should create a blob with correct MIME type', async () => {
            const mockBuffer = new ArrayBuffer(100);
            ((Converter as any).to as jest.Mock).mockResolvedValueOnce(
                mockBuffer,
            );

            const quickLook = new ARQuickLook(mockUri);
            await quickLook.launch();

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
            const quickLook = new ARQuickLook(mockUri, options);
            await quickLook.launch();

            const anchor = document.createElement('a');
            expect(anchor.href).toContain('#allowsContentScaling=0');
        });
    });
});
