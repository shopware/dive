import { Box3, Color, Euler, Mesh, Object3D, Vector3 } from 'three';
import { DIVEScene } from '../../../scene/Scene';
import { DIVEAROptions } from '../../AR';
import { DIVEARQuickLook } from '../ARQuickLook';
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
    let mockOptions: DIVEAROptions;
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
            const quickLook = new DIVEARQuickLook(mockUri, mockOptions);
            expect(quickLook).toBeInstanceOf(DIVEARQuickLook);
        });

        it('should create an instance with just URI', () => {
            const quickLook = new DIVEARQuickLook(mockUri);
            expect(quickLook).toBeInstanceOf(DIVEARQuickLook);
        });
    });

    describe('launch', () => {
        it('should convert and launch with default options', async () => {
            const quickLook = new DIVEARQuickLook(mockUri);
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
            const options: DIVEAROptions = {
                arPlacement: 'vertical',
                arScale: 'fixed',
            };
            const quickLook = new DIVEARQuickLook(mockUri, options);
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

            const quickLook = new DIVEARQuickLook(mockUri);
            await expect(quickLook.launch()).rejects.toThrow(error);
        });

        it('should create a blob with correct MIME type', async () => {
            const mockBuffer = new ArrayBuffer(100);
            ((Converter as any).to as jest.Mock).mockResolvedValueOnce(
                mockBuffer,
            );

            const quickLook = new DIVEARQuickLook(mockUri);
            await quickLook.launch();

            expect(URL.createObjectURL).toHaveBeenCalledWith(
                expect.objectContaining({
                    type: 'model/vnd.usdz+zip',
                }),
            );
        });

        it('should add scale parameter when arScale is fixed', async () => {
            const options: DIVEAROptions = {
                arPlacement: 'horizontal',
                arScale: 'fixed',
            };
            const quickLook = new DIVEARQuickLook(mockUri, options);
            await quickLook.launch();

            const anchor = document.createElement('a');
            expect(anchor.href).toContain('#allowsContentScaling=0');
        });
    });
});
