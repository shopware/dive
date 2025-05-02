import { ARSystem, type ARSystemOptions } from '../ARSystem.ts';
import { SystemInfo } from '../../systeminfo/SystemInfo.ts';
import { ARQuickLook } from '../arquicklook/ARQuickLook.ts';
import { SceneViewer } from '../sceneviewer/SceneViewer.ts';
import { ESystem } from '../../../types/index.ts';

// Helper for test failures
const fail = (message: string): never => {
    throw new Error(message);
};

// Mock Info
vi.mock('../../systeminfo/SystemInfo', () => ({
    SystemInfo: {
        getSystem: vi.fn(),
        getSupportsARQuickLook: vi.fn(),
    },
}));

// Mock ARQuickLook
const mockLaunchARQuickLook = vi.fn().mockResolvedValue(undefined);
vi.mock('../arquicklook/ARQuickLook', () => ({
    ARQuickLook: vi.fn().mockImplementation(() => ({
        launch: mockLaunchARQuickLook,
    })),
}));

// Mock SceneViewer
const mockSceneViewerLaunch = vi.fn().mockResolvedValue(undefined);
vi.mock('../sceneviewer/SceneViewer', () => ({
    SceneViewer: vi.fn().mockImplementation(() => ({
        launch: mockSceneViewerLaunch,
    })),
}));

describe('ARSystem', () => {
    let diveAR: ARSystem;
    const mockUri = 'https://example.com/model.glb';

    beforeEach(() => {
        diveAR = new ARSystem();
        vi.clearAllMocks();
    });

    describe('launch', () => {
        describe('AR Quick Look', () => {
            it('should launch ARQuickLook on iOS', async () => {
                vi.mocked(SystemInfo.getSystem).mockReturnValue(ESystem.IOS);
                vi.mocked(SystemInfo.getSupportsARQuickLook).mockReturnValue(
                    true,
                );

                const consoleLogSpy = vi
                    .spyOn(console, 'log')
                    .mockImplementation(() => {});

                await diveAR.launch(mockUri);

                expect(mockLaunchARQuickLook).toHaveBeenCalledWith(
                    mockUri,
                    undefined,
                );
                consoleLogSpy.mockRestore();
            });

            it('should launch ARQuickLook on iOS with options', async () => {
                vi.mocked(SystemInfo.getSystem).mockReturnValue(ESystem.IOS);
                vi.mocked(SystemInfo.getSupportsARQuickLook).mockReturnValue(
                    true,
                );

                const options: ARSystemOptions = {
                    arPlacement: 'vertical',
                    arScale: 'fixed',
                };

                const consoleLogSpy = vi
                    .spyOn(console, 'log')
                    .mockImplementation(() => {});

                await diveAR.launch(mockUri, options);

                expect(mockLaunchARQuickLook).toHaveBeenCalledWith(
                    mockUri,
                    options,
                );
                consoleLogSpy.mockRestore();
            });

            it('should not launch ARQuickLook on iOS if not supported', async () => {
                vi.mocked(SystemInfo.getSystem).mockReturnValue(ESystem.IOS);

                // Mock GetSupportsARQuickLook to throw an error
                const mockError = new Error('ARQuickLook not supported');
                vi.mocked(SystemInfo.getSupportsARQuickLook).mockImplementation(
                    () => {
                        throw mockError;
                    },
                );

                try {
                    await diveAR.launch(mockUri);
                    fail('Expected launch to reject');
                } catch (error: unknown) {
                    expect(error).toBe(mockError);
                }
            });

            it('should handle ARQuickLook launch errors', async () => {
                vi.mocked(SystemInfo.getSystem).mockReturnValue(ESystem.IOS);
                vi.mocked(SystemInfo.getSupportsARQuickLook).mockReturnValue(
                    true,
                );

                const mockError = new Error('Launch failed');
                const mockInstance = {
                    launch: vi.fn().mockImplementation(() => {
                        throw mockError;
                    }),
                };
                vi.mocked(ARQuickLook).mockImplementation(
                    () =>
                        ({
                            launch: vi.fn().mockImplementation(() => {
                                throw mockError;
                            }),
                            convertToUSDZ: vi.fn(),
                            launchARQuickLook: vi.fn(),
                        }) as unknown as ARQuickLook,
                );

                try {
                    await diveAR.launch(mockUri);
                    fail('Expected launch to reject');
                } catch (error: unknown) {
                    if (error instanceof Error) {
                        expect(error.message).toBe('Launch failed');
                    } else {
                        fail('Expected error to be an Error instance');
                    }
                }
            });
        });

        describe('Scene Viewer', () => {
            it('should launch SceneViewer on Android', async () => {
                vi.mocked(SystemInfo.getSystem).mockReturnValue(
                    ESystem.ANDROID,
                );

                await diveAR.launch(mockUri);

                expect(mockSceneViewerLaunch).toHaveBeenCalledWith(
                    mockUri,
                    undefined,
                );
            });

            it('should launch SceneViewer on Android with options', async () => {
                vi.mocked(SystemInfo.getSystem).mockReturnValue(
                    ESystem.ANDROID,
                );

                const options: ARSystemOptions = {
                    arPlacement: 'vertical',
                    arScale: 'fixed',
                };

                await diveAR.launch(mockUri, options);

                expect(mockSceneViewerLaunch).toHaveBeenCalledWith(
                    mockUri,
                    options,
                );
            });

            it('should handle SceneViewer launch errors', async () => {
                vi.mocked(SystemInfo.getSystem).mockReturnValue(
                    ESystem.ANDROID,
                );

                const mockError = new Error('Launch failed');
                const mockInstance = {
                    launch: vi.fn().mockImplementation(() => {
                        throw mockError;
                    }),
                } as unknown as SceneViewer;
                vi.mocked(SceneViewer).mockImplementation(() => mockInstance);

                try {
                    await diveAR.launch(mockUri);
                    fail('Expected launch to reject');
                } catch (error: unknown) {
                    if (error instanceof Error) {
                        expect(error.message).toBe('Launch failed');
                    } else {
                        fail('Expected error to be an Error instance');
                    }
                }
            });
        });

        it('should reject on non-mobile systems', async () => {
            vi.mocked(SystemInfo.getSystem).mockReturnValue(ESystem.WINDOWS);

            // Mock navigator properties for the ARCompatibilityError constructor
            const originalNavigator = window.navigator;
            const mockNavigator = {
                userAgent:
                    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
                platform: 'Win32',
                vendor: 'Google Inc.',
            };

            // Replace navigator properties temporarily
            Object.defineProperty(window, 'navigator', {
                value: mockNavigator,
                writable: true,
                configurable: true,
            });

            try {
                await diveAR.launch(mockUri);
                fail('Expected launch to reject');
            } catch (error: unknown) {
                if (error instanceof Error) {
                    expect(error.message).toBe(
                        'AR not supported on non-mobile systems',
                    );
                } else {
                    fail('Expected error to be an Error instance');
                }
            }

            // Restore original navigator
            Object.defineProperty(window, 'navigator', {
                value: originalNavigator,
                writable: true,
                configurable: true,
            });
        });
    });
});
