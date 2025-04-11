import { Object3D } from 'three';
import { ARSystemOptions } from '../../ARSystem';
import { SceneViewer } from '../SceneViewer';

// Mock DIVEInfo
jest.mock('../../../systeminfo/SystemInfo', () => ({
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
    let mockOptions: ARSystemOptions;

    beforeEach(() => {
        mockOptions = {
            arPlacement: 'horizontal',
            arScale: 'auto',
        };
        jest.clearAllMocks();
    });

    describe('constructor', () => {
        it('should create an instance', () => {
            const sceneViewer = new SceneViewer();
            expect(sceneViewer).toBeInstanceOf(SceneViewer);
        });
    });

    describe('launch', () => {
        it('should launch with default options', () => {
            const sceneViewer = new SceneViewer();
            sceneViewer.launch(mockUri);

            expect(mockCreateElement).toHaveBeenCalledWith('a');
            expect(mockSetAttribute).toHaveBeenCalledWith(
                'href',
                expect.stringContaining('mode=ar_preferred'),
            );
            expect(mockClick).toHaveBeenCalled();
        });

        it('should launch with custom options', () => {
            const options: ARSystemOptions = {
                arPlacement: 'vertical',
                arScale: 'fixed',
            };
            const sceneViewer = new SceneViewer();
            sceneViewer.launch(mockUri, options);

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
            const sceneViewer = new SceneViewer();
            const params = new URLSearchParams();
            params.set('sound', 'sound.mp3');

            // Access private method for testing
            const applySoundOption = (sceneViewer as any)._applySoundOption;
            applySoundOption(params, mockLocation.toString());

            expect(params.get('sound')).toBe('https://example.com/sound.mp3');
        });

        it('should handle link parameter in URL', () => {
            const sceneViewer = new SceneViewer();
            const params = new URLSearchParams();
            params.set('link', 'details.html');

            // Access private method for testing
            const applyLinkOption = (sceneViewer as any)._applyLinkOption;
            applyLinkOption(params, mockLocation.toString());

            expect(params.get('link')).toBe('https://example.com/details.html');
        });

        it('should create intent URL with correct parameters', () => {
            const sceneViewer = new SceneViewer();
            const params = new URLSearchParams();
            params.set('mode', 'ar_preferred');

            // Access private method for testing and bind it to the instance
            const createIntent = (sceneViewer as any)._createIntent.bind(
                sceneViewer,
            );
            const intentUrl = createIntent(
                mockLocation.toString(),
                mockUri,
                params,
            );

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

        it('should include all input parameters in the intent URL', () => {
            const sceneViewer = new SceneViewer();
            const options: ARSystemOptions = {
                arPlacement: 'vertical',
                arScale: 'fixed',
            };

            // Create a URL with additional parameters
            const uriWithParams = `${mockUri}?sound=sound.mp3&link=details.html`;

            sceneViewer.launch(uriWithParams, options);

            // Get the last call to setAttribute which contains the complete intent URL
            const lastCall =
                mockSetAttribute.mock.calls[
                    mockSetAttribute.mock.calls.length - 1
                ];
            const intentUrl = lastCall[1];

            // Verify all expected parameters are present
            expect(intentUrl).toContain('mode=ar_preferred');
            expect(intentUrl).toContain('enable_vertical_placement=true');
            expect(intentUrl).toContain('resizable=false');
            expect(intentUrl).toContain(
                'sound=https%3A%2F%2Fexample.com%2Fsound.mp3',
            );
            expect(intentUrl).toContain(
                'link=https%3A%2F%2Fexample.com%2Fdetails.html',
            );
            expect(intentUrl).toContain(`file=${mockUri}`);
            expect(intentUrl).toContain('scheme=https');
            expect(intentUrl).toContain(
                'package=com.google.android.googlequicksearchbox',
            );
            expect(intentUrl).toContain('action=android.intent.action.VIEW');
            expect(intentUrl).toContain('S.browser_fallback_url');
            expect(intentUrl).toContain('%23model-viewer-no-ar-fallback');
        });

        it('should handle relative model URLs', () => {
            const relativeUri = '/models/model.glb';
            const sceneViewer = new SceneViewer();
            sceneViewer.launch(relativeUri);

            expect(mockSetAttribute).toHaveBeenCalledWith(
                'href',
                expect.stringContaining(
                    'file=https://example.com/models/model.glb',
                ),
            );
        });

        it('should handle absolute model URLs', () => {
            const absoluteUri = 'https://cdn.example.com/model.glb';
            const sceneViewer = new SceneViewer();
            sceneViewer.launch(absoluteUri);

            expect(mockSetAttribute).toHaveBeenCalledWith(
                'href',
                expect.stringContaining(
                    'file=https://cdn.example.com/model.glb',
                ),
            );
        });

        it('should handle special characters in model URL', () => {
            const specialUri = 'https://example.com/model with spaces.glb';
            const sceneViewer = new SceneViewer();
            sceneViewer.launch(specialUri);

            expect(mockSetAttribute).toHaveBeenCalledWith(
                'href',
                expect.stringContaining(
                    'file=https://example.com/model%20with%20spaces.glb',
                ),
            );
        });
    });
});
