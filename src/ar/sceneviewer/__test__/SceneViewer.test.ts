import { Box3, Color, Euler, Mesh, Object3D, Vector3 } from 'three';
import { DIVEScene } from '../../../scene/Scene';
import { DIVEAROptions } from '../../AR';
import { DIVESceneViewer } from '../SceneViewer';
import { DIVEInfo } from '../../../info/Info';

// Mock DIVEInfo
jest.mock('../../../info/Info', () => ({
    DIVEInfo: {
        GetSystem: jest.fn().mockReturnValue('Android'),
        GetSupportsARQuickLook: jest.fn().mockReturnValue(false),
    },
}));

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

// Mock URL and document APIs
const mockLocation = new URL('https://example.com');
const mockCreateElement = jest.fn();
const mockSetAttribute = jest.fn();
const mockClick = jest.fn();

Object.defineProperty(window, 'location', {
    value: mockLocation,
    writable: true,
});

document.createElement = mockCreateElement.mockReturnValue({
    setAttribute: mockSetAttribute,
    click: mockClick,
});

describe('DIVESceneViewer', () => {
    const mockUri = 'https://example.com/model.glb';
    let mockOptions: DIVEAROptions;

    beforeEach(() => {
        mockOptions = {
            arPlacement: 'horizontal',
            arScale: 'auto',
        };
        jest.clearAllMocks();
    });

    describe('constructor', () => {
        it('should create an instance with URI and options', () => {
            const sceneViewer = new DIVESceneViewer(mockUri, mockOptions);
            expect(sceneViewer).toBeInstanceOf(DIVESceneViewer);
        });

        it('should create an instance with just URI', () => {
            const sceneViewer = new DIVESceneViewer(mockUri);
            expect(sceneViewer).toBeInstanceOf(DIVESceneViewer);
        });
    });

    describe('launch', () => {
        it('should launch with default options', () => {
            const sceneViewer = new DIVESceneViewer(mockUri);
            sceneViewer.launch();

            expect(mockCreateElement).toHaveBeenCalledWith('a');
            expect(mockSetAttribute).toHaveBeenCalledWith(
                'href',
                expect.stringContaining('mode=ar_preferred'),
            );
            expect(mockClick).toHaveBeenCalled();
        });

        it('should launch with custom options', () => {
            const options: DIVEAROptions = {
                arPlacement: 'vertical',
                arScale: 'fixed',
            };
            const sceneViewer = new DIVESceneViewer(mockUri, options);
            sceneViewer.launch();

            expect(mockCreateElement).toHaveBeenCalledWith('a');
            expect(mockSetAttribute).toHaveBeenCalledWith(
                'href',
                expect.stringContaining('enable_vertical_placement=true'),
            );
            expect(mockSetAttribute).toHaveBeenCalledWith(
                'href',
                expect.stringContaining('resizable=false'),
            );
            expect(mockClick).toHaveBeenCalled();
        });

        it('should handle sound parameter in URL', () => {
            const sceneViewer = new DIVESceneViewer(mockUri);
            const params = new URLSearchParams();
            params.set('sound', 'sound.mp3');

            // Access private method for testing
            const applySoundOption = (sceneViewer as any)._applySoundOption;
            applySoundOption(params, mockLocation.toString());

            expect(params.get('sound')).toBe('https://example.com/sound.mp3');
        });

        it('should handle link parameter in URL', () => {
            const sceneViewer = new DIVESceneViewer(mockUri);
            const params = new URLSearchParams();
            params.set('link', 'details.html');

            // Access private method for testing
            const applyLinkOption = (sceneViewer as any)._applyLinkOption;
            applyLinkOption(params, mockLocation.toString());

            expect(params.get('link')).toBe('https://example.com/details.html');
        });

        it('should create intent URL with correct parameters', () => {
            const sceneViewer = new DIVESceneViewer(mockUri);
            const params = new URLSearchParams();
            params.set('mode', 'ar_preferred');

            // Access private method for testing and bind it to the instance
            const createIntent = (sceneViewer as any)._createIntent.bind(
                sceneViewer,
            );
            const intentUrl = createIntent(params, mockLocation.toString());

            expect(intentUrl).toContain(
                'intent://arvr.google.com/scene-viewer/1.2',
            );
            expect(intentUrl).toContain('mode=ar_preferred');
            expect(intentUrl).toContain('file=' + mockUri);
            expect(intentUrl).toContain('scheme=https');
            expect(intentUrl).toContain(
                'package=com.google.android.googlequicksearchbox',
            );
        });

        it('should handle relative model URLs', () => {
            const relativeUri = '/models/model.glb';
            const sceneViewer = new DIVESceneViewer(relativeUri);
            sceneViewer.launch();

            expect(mockSetAttribute).toHaveBeenCalledWith(
                'href',
                expect.stringContaining(
                    'file=https://example.com/models/model.glb',
                ),
            );
        });

        it('should handle absolute model URLs', () => {
            const absoluteUri = 'https://cdn.example.com/model.glb';
            const sceneViewer = new DIVESceneViewer(absoluteUri);
            sceneViewer.launch();

            expect(mockSetAttribute).toHaveBeenCalledWith(
                'href',
                expect.stringContaining(
                    'file=https://cdn.example.com/model.glb',
                ),
            );
        });

        it('should handle special characters in model URL', () => {
            const specialUri = 'https://example.com/model with spaces.glb';
            const sceneViewer = new DIVESceneViewer(specialUri);
            sceneViewer.launch();

            expect(mockSetAttribute).toHaveBeenCalledWith(
                'href',
                expect.stringContaining(
                    'file=https://example.com/model%20with%20spaces.glb',
                ),
            );
        });
    });
});
