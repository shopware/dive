import { type ARSystemOptions } from '../../ARSystem.ts';
import { SceneViewer } from '../SceneViewer.ts';

// Mock browser APIs that SceneViewer relies on
const mockAnchorElement = {
    setAttribute: vi.fn(),
    click: vi.fn(),
    href: '', // Allow href to be set and read for verification if needed
};
const mockCreateElement = vi.fn().mockReturnValue(mockAnchorElement);
const mockSelfLocationToString = vi.fn();

// Mock document.createElement
Object.defineProperty(document, 'createElement', {
    value: mockCreateElement,
    writable: true,
    configurable: true,
});

// Mock self.location.toString()
// SceneViewer uses `self.location.toString()`
Object.defineProperty(self, 'location', {
    value: {
        toString: mockSelfLocationToString,
        // Add other properties like hash if SceneViewer uses them directly
        // For now, SceneViewer.ts uses `new URL(location)` and `locationUrl.hash`
        // so a full mock of URL object might be better if we were testing URL parts directly.
        // However, SceneViewer.ts reconstructs locationUrl.hash = noArViewerSigil, so toString is key.
        hash: '',
    },
    writable: true,
    configurable: true,
});

describe('SceneViewer', () => {
    let sceneViewer: SceneViewer;
    const baseMockUri = 'model.glb'; // Relative URI
    const mockPageLocation = 'https://example.com/path/';
    const absoluteMockUri = `${mockPageLocation}${baseMockUri}`;

    let defaultOptions: ARSystemOptions;

    beforeEach(() => {
        vi.clearAllMocks();

        // Set up default mocks for each test
        mockSelfLocationToString.mockReturnValue(mockPageLocation);
        // Reset anchor properties for each test if they are modified directly
        mockAnchorElement.href = '';
        // mockAnchorElement.setAttribute.mockClear(); // already cleared by vi.clearAllMocks()
        // mockAnchorElement.click.mockClear();

        sceneViewer = new SceneViewer();
        defaultOptions = {
            arPlacement: 'horizontal',
            arScale: 'auto',
        };
    });

    describe('launch', () => {
        it('should create an anchor element', () => {
            sceneViewer.launch(baseMockUri, defaultOptions);
            expect(mockCreateElement).toHaveBeenCalledWith('a');
        });

        it('should click the anchor element', () => {
            sceneViewer.launch(baseMockUri, defaultOptions);
            expect(mockAnchorElement.click).toHaveBeenCalledTimes(1);
        });

        it('should set the anchor href with a valid intent URL structure', () => {
            sceneViewer.launch(baseMockUri, defaultOptions);
            expect(mockAnchorElement.setAttribute).toHaveBeenCalledWith(
                'href',
                expect.stringMatching(
                    /^intent:\/\/arvr\.google\.com\/scene-viewer\/1\.2\?/,
                ),
            );
            const intentUrl = mockAnchorElement.setAttribute.mock
                .calls[0][1] as string;
            expect(intentUrl).toContain(
                'package=com.google.android.googlequicksearchbox',
            );
            expect(intentUrl).toContain('action=android.intent.action.VIEW');
            expect(intentUrl).toContain('scheme=https');
            expect(intentUrl).toContain('S.browser_fallback_url=');
        });

        describe('Intent Parameter Construction', () => {
            it('should include mode=ar_preferred by default', () => {
                sceneViewer.launch(baseMockUri, defaultOptions);
                const intentUrl = mockAnchorElement.setAttribute.mock
                    .calls[0][1] as string;
                expect(
                    new URLSearchParams(
                        new URL(intentUrl, 'intent://').search,
                    ).get('mode'),
                ).toBe('ar_preferred');
            });

            it('should correctly set file parameter with absolute model URI', () => {
                sceneViewer.launch(baseMockUri, defaultOptions);
                const intentUrl = mockAnchorElement.setAttribute.mock
                    .calls[0][1] as string;
                // The file param is added separately from the other search params in the implementation
                expect(intentUrl).toContain(`&file=${absoluteMockUri}`);
            });

            it('should handle an already absolute model URI for the file parameter', () => {
                const alreadyAbsoluteUri =
                    'https://another.domain.com/model.glb';
                sceneViewer.launch(alreadyAbsoluteUri, defaultOptions);
                const intentUrl = mockAnchorElement.setAttribute.mock
                    .calls[0][1] as string;
                expect(intentUrl).toContain(`&file=${alreadyAbsoluteUri}`);
            });

            it('should encode special characters in the model URI for file parameter', () => {
                const uriWithSpaces = 'model with spaces.glb';
                // absoluteUriWithSpaces was `${mockPageLocation}${uriWithSpaces}`
                // We need the version with path encoding, e.g. space to %20
                const expectedFileValue = new URL(
                    uriWithSpaces,
                    mockPageLocation,
                ).href;
                sceneViewer.launch(uriWithSpaces, defaultOptions);
                const intentUrl = mockAnchorElement.setAttribute.mock
                    .calls[0][1] as string;
                expect(intentUrl).toContain(`&file=${expectedFileValue}`);
            });

            describe('arScale option', () => {
                it('should not include resizable=false if arScale is "auto"', () => {
                    defaultOptions.arScale = 'auto';
                    sceneViewer.launch(baseMockUri, defaultOptions);
                    const intentUrl = mockAnchorElement.setAttribute.mock
                        .calls[0][1] as string;
                    expect(
                        new URLSearchParams(
                            new URL(intentUrl, 'intent://').search,
                        ).has('resizable'),
                    ).toBe(false);
                });

                it('should include resizable=false if arScale is "fixed"', () => {
                    defaultOptions.arScale = 'fixed';
                    sceneViewer.launch(baseMockUri, defaultOptions);
                    const intentUrl = mockAnchorElement.setAttribute.mock
                        .calls[0][1] as string;
                    expect(
                        new URLSearchParams(
                            new URL(intentUrl, 'intent://').search,
                        ).get('resizable'),
                    ).toBe('false');
                });
                it('should default to no resizable if options are undefined', () => {
                    sceneViewer.launch(baseMockUri, undefined);
                    const intentUrl = mockAnchorElement.setAttribute.mock
                        .calls[0][1] as string;
                    expect(
                        new URLSearchParams(
                            new URL(intentUrl, 'intent://').search,
                        ).has('resizable'),
                    ).toBe(false);
                });
            });

            describe('arPlacement option', () => {
                it('should not include enable_vertical_placement if arPlacement is "horizontal"', () => {
                    defaultOptions.arPlacement = 'horizontal';
                    sceneViewer.launch(baseMockUri, defaultOptions);
                    const intentUrl = mockAnchorElement.setAttribute.mock
                        .calls[0][1] as string;
                    expect(
                        new URLSearchParams(
                            new URL(intentUrl, 'intent://').search,
                        ).has('enable_vertical_placement'),
                    ).toBe(false);
                });

                it('should include enable_vertical_placement=true if arPlacement is "vertical"', () => {
                    defaultOptions.arPlacement = 'vertical';
                    sceneViewer.launch(baseMockUri, defaultOptions);
                    const intentUrl = mockAnchorElement.setAttribute.mock
                        .calls[0][1] as string;
                    expect(
                        new URLSearchParams(
                            new URL(intentUrl, 'intent://').search,
                        ).get('enable_vertical_placement'),
                    ).toBe('true');
                });
                it('should default to no enable_vertical_placement if options are undefined', () => {
                    sceneViewer.launch(baseMockUri, undefined);
                    const intentUrl = mockAnchorElement.setAttribute.mock
                        .calls[0][1] as string;
                    expect(
                        new URLSearchParams(
                            new URL(intentUrl, 'intent://').search,
                        ).has('enable_vertical_placement'),
                    ).toBe(false);
                });
            });

            describe('sound option from input URI query params', () => {
                it('should resolve relative sound URL from input URI to absolute and include it', () => {
                    const uriWithSound = `${baseMockUri}?sound=./sound.mp3`;
                    const absoluteSoundUrl = `${mockPageLocation}sound.mp3`; // Resolved from ./sound.mp3
                    sceneViewer.launch(uriWithSound, defaultOptions);
                    const intentUrl = mockAnchorElement.setAttribute.mock
                        .calls[0][1] as string;
                    expect(
                        new URLSearchParams(
                            new URL(intentUrl, 'intent://').search,
                        ).get('sound'),
                    ).toBe(absoluteSoundUrl);
                });

                it('should keep absolute sound URL from input URI as is', () => {
                    const soundUrl = 'https://cdn.com/sound.mp3';
                    const uriWithSound = `${baseMockUri}?sound=${encodeURIComponent(soundUrl)}`;
                    sceneViewer.launch(uriWithSound, defaultOptions);
                    const intentUrl = mockAnchorElement.setAttribute.mock
                        .calls[0][1] as string;
                    expect(
                        new URLSearchParams(
                            new URL(intentUrl, 'intent://').search,
                        ).get('sound'),
                    ).toBe(soundUrl);
                });

                it('should not include sound if not in input URI', () => {
                    sceneViewer.launch(baseMockUri, defaultOptions);
                    const intentUrl = mockAnchorElement.setAttribute.mock
                        .calls[0][1] as string;
                    expect(
                        new URLSearchParams(
                            new URL(intentUrl, 'intent://').search,
                        ).has('sound'),
                    ).toBe(false);
                });
            });

            describe('link option from input URI query params', () => {
                it('should resolve relative link URL from input URI to absolute and include it', () => {
                    const uriWithLink = `${baseMockUri}?link=details.html`;
                    const absoluteLinkUrl = `${mockPageLocation}details.html`;
                    sceneViewer.launch(uriWithLink, defaultOptions);
                    const intentUrl = mockAnchorElement.setAttribute.mock
                        .calls[0][1] as string;
                    expect(
                        new URLSearchParams(
                            new URL(intentUrl, 'intent://').search,
                        ).get('link'),
                    ).toBe(absoluteLinkUrl);
                });

                it('should keep absolute link URL from input URI as is', () => {
                    const linkUrl = 'https://example.com/product-details';
                    const uriWithLink = `${baseMockUri}?link=${encodeURIComponent(linkUrl)}`;
                    sceneViewer.launch(uriWithLink, defaultOptions);
                    const intentUrl = mockAnchorElement.setAttribute.mock
                        .calls[0][1] as string;
                    expect(
                        new URLSearchParams(
                            new URL(intentUrl, 'intent://').search,
                        ).get('link'),
                    ).toBe(linkUrl);
                });

                it('should not include link if not in input URI', () => {
                    sceneViewer.launch(baseMockUri, defaultOptions);
                    const intentUrl = mockAnchorElement.setAttribute.mock
                        .calls[0][1] as string;
                    expect(
                        new URLSearchParams(
                            new URL(intentUrl, 'intent://').search,
                        ).has('link'),
                    ).toBe(false);
                });
            });

            it('should correctly construct the browser_fallback_url', () => {
                sceneViewer.launch(baseMockUri, defaultOptions);
                const intentUrl = mockAnchorElement.setAttribute.mock
                    .calls[0][1] as string;
                const fallbackMatch = intentUrl.match(
                    /S\.browser_fallback_url=([^;]+);/,
                );
                expect(fallbackMatch).not.toBeNull();
                const fallbackUrl = decodeURIComponent(fallbackMatch![1]);
                expect(fallbackUrl).toBe(
                    `${mockPageLocation}#model-viewer-no-ar-fallback`,
                );
            });

            it('should correctly combine all parameters in the intent URL', () => {
                const complexUri = `${baseMockUri}?sound=s.mp3&link=l.html`;
                const complexOptions: ARSystemOptions = {
                    arPlacement: 'vertical',
                    arScale: 'fixed',
                };
                sceneViewer.launch(complexUri, complexOptions);

                const intentUrl = mockAnchorElement.setAttribute.mock
                    .calls[0][1] as string;
                const params = new URLSearchParams(
                    new URL(intentUrl, 'intent://').search,
                );

                expect(params.get('mode')).toBe('ar_preferred');
                expect(params.get('resizable')).toBe('false');
                expect(params.get('enable_vertical_placement')).toBe('true');
                expect(params.get('sound')).toBe(`${mockPageLocation}s.mp3`);
                expect(params.get('link')).toBe(`${mockPageLocation}l.html`);
                // The file parameter should be the full resolved URI including its original query params, path-encoded.
                const expectedFileValue = new URL(complexUri, mockPageLocation)
                    .href;
                expect(intentUrl).toContain(`&file=${expectedFileValue}`);
                expect(intentUrl).toContain(
                    `S.browser_fallback_url=${encodeURIComponent(mockPageLocation + '#model-viewer-no-ar-fallback')}`,
                );
            });
        });
    });
});
