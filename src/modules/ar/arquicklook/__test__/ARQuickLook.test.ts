import { Object3D } from 'three';
import { type ARSystemOptions } from '../../ARSystem.ts';
import { ARQuickLook } from '../ARQuickLook.ts';
import { AssetConverter } from '../../../assetconverter/AssetConverter.ts';
import { SystemInfo, EBrowser } from '../../../systeminfo/SystemInfo.ts';
import {
    ARQuickLookNotSafariError,
    ARQuickLookVersionMismatchError,
    ARQuickLookUnknownError,
} from '../../error/ar-errors.ts';

vi.mock('../../../../engine/scene/Scene', () => {
    return {
        DIVEScene: vi.fn(function (this: any) {
            this.add = vi.fn();
            this.children = [];
            this.root = {
                children: [],
            };
            this.traverse = vi.fn((callback) => {
                this.root.children.forEach((child: Object3D) => {
                    callback(child);
                });
            });
            return this;
        }),
    };
});

// Mock the dependencies
const mockConvert = vi.fn().mockReturnThis();
const mockTo = vi.fn().mockResolvedValue(new ArrayBuffer(0));

vi.mock('../../../systeminfo/SystemInfo');
vi.mock('../../../asset/converter/AssetConverter', () => ({
    AssetConverter: vi.fn().mockImplementation(() => ({
        convert: mockConvert,
        to: mockTo,
    })),
}));

// Mock URL.createObjectURL
URL.createObjectURL = vi.fn(() => 'blob:http://localhost:8080/');

// Mock document.createElement
document.createElement = vi.fn().mockReturnValue({
    innerHTML: '',
    rel: '',
    href: '',
    download: '',
    click: vi.fn(),
    setAttribute: vi.fn(),
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
        vi.clearAllMocks();
        quickLook = new ARQuickLook();

        // Default mocks for SystemInfo to allow most tests to pass without specific setup
        vi.mocked(SystemInfo.getBrowser).mockReturnValue(EBrowser.SAFARI);
        vi.mocked(SystemInfo.getIOSVersion).mockReturnValue({
            major: 15,
            full: '15.0',
        });
        vi.mocked(SystemInfo.getSupportsARQuickLook).mockReturnValue(true);
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

            const anchor = document.createElement('a') as any;
            // Check if setAttribute was called with href
            expect(anchor.href).toContain('#allowsContentScaling=0');
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

            // Get the anchor element created in launchARQuickLook
            const anchorMock = vi
                .mocked(document.createElement)
                .mock.results.find(
                    (result) => result.value.rel === 'ar',
                )?.value;

            expect(anchorMock?.href).toContain('#allowsContentScaling=0');
        });

        it('should reject if browser is not Safari', async () => {
            vi.mocked(SystemInfo.getBrowser).mockReturnValue(EBrowser.CHROMIUM);
            await expect(quickLook.launch(mockUri)).rejects.toThrow(
                ARQuickLookNotSafariError,
            );
        });

        it('should reject if iOS version is too low', async () => {
            vi.mocked(SystemInfo.getIOSVersion).mockReturnValue({
                major: 11,
                full: '11.0',
            });
            await expect(quickLook.launch(mockUri)).rejects.toThrow(
                ARQuickLookVersionMismatchError,
            );
        });

        it('should reject if iOS version details are null', async () => {
            vi.mocked(SystemInfo.getIOSVersion).mockReturnValue(null);
            await expect(quickLook.launch(mockUri)).rejects.toThrow(
                ARQuickLookUnknownError, // Or a more specific error if defined for this case
            );
        });

        it('should reject if ARQuickLook is not supported by SystemInfo', async () => {
            vi.mocked(SystemInfo.getSupportsARQuickLook).mockReturnValue(false);
            await expect(quickLook.launch(mockUri)).rejects.toThrow(
                ARQuickLookUnknownError,
            );
        });
    });
});
