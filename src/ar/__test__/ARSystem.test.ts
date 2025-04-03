import { ARSystem, type ARSystemOptions } from '../ARSystem';
import { SystemInfo } from '../../info/Info';
import { ARQuickLook } from '../arquicklook/ARQuickLook';
import { SceneViewer } from '../sceneviewer/SceneViewer';

// Helper for test failures
const fail = (message: string): never => {
    throw new Error(message);
};

// Mock Info
jest.mock('../../info/Info', () => ({
    SystemInfo: {
        GetSystem: jest.fn(),
        GetSupportsARQuickLook: jest.fn(),
    },
}));

// Mock ARQuickLook
const mockLaunchARQuickLook = jest.fn().mockResolvedValue(undefined);
jest.mock('../arquicklook/ARQuickLook', () => ({
    ARQuickLook: jest.fn().mockImplementation(() => ({
        launch: mockLaunchARQuickLook,
    })),
}));

// Mock SceneViewer
const mockSceneViewerLaunch = jest.fn().mockResolvedValue(undefined);
jest.mock('../sceneviewer/SceneViewer', () => ({
    SceneViewer: jest.fn().mockImplementation(() => ({
        launch: mockSceneViewerLaunch,
    })),
}));

describe('ARSystem', () => {
    let diveAR: ARSystem;
    const mockUri = 'https://example.com/model.glb';

    beforeEach(() => {
        diveAR = new ARSystem();
        jest.clearAllMocks();
    });

    describe('launch', () => {
        describe('AR Quick Look', () => {
            it('should launch ARQuickLook on iOS', async () => {
                (SystemInfo.GetSystem as jest.Mock).mockReturnValue('iOS');
                (
                    SystemInfo.GetSupportsARQuickLook as jest.Mock
                ).mockReturnValue(true);

                const consoleLogSpy = jest
                    .spyOn(console, 'log')
                    .mockImplementation();

                await diveAR.launch(mockUri);

                expect(mockLaunchARQuickLook).toHaveBeenCalledWith(
                    mockUri,
                    undefined,
                );
                consoleLogSpy.mockRestore();
            });

            it('should launch ARQuickLook on iOS with options', async () => {
                (SystemInfo.GetSystem as jest.Mock).mockReturnValue('iOS');
                (
                    SystemInfo.GetSupportsARQuickLook as jest.Mock
                ).mockReturnValue(true);

                const options: ARSystemOptions = {
                    arPlacement: 'vertical',
                    arScale: 'fixed',
                };

                const consoleLogSpy = jest
                    .spyOn(console, 'log')
                    .mockImplementation();

                await diveAR.launch(mockUri, options);

                expect(mockLaunchARQuickLook).toHaveBeenCalledWith(
                    mockUri,
                    options,
                );
                consoleLogSpy.mockRestore();
            });

            it('should not launch ARQuickLook on iOS if not supported', async () => {
                (SystemInfo.GetSystem as jest.Mock).mockReturnValue('iOS');

                // Mock GetSupportsARQuickLook to throw an error
                const mockError = new Error('ARQuickLook not supported');
                (
                    SystemInfo.GetSupportsARQuickLook as jest.Mock
                ).mockImplementation(() => {
                    throw mockError;
                });

                try {
                    await diveAR.launch(mockUri);
                    fail('Expected launch to reject');
                } catch (error: unknown) {
                    expect(error).toBe(mockError);
                }
            });

            it('should handle ARQuickLook launch errors', async () => {
                (SystemInfo.GetSystem as jest.Mock).mockReturnValue('iOS');
                (
                    SystemInfo.GetSupportsARQuickLook as jest.Mock
                ).mockReturnValue(true);

                const mockError = new Error('Launch failed');
                const mockInstance = {
                    launch: jest.fn().mockImplementation(() => {
                        throw mockError;
                    }),
                };
                (ARQuickLook as jest.Mock).mockImplementation(
                    () => mockInstance,
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
                (SystemInfo.GetSystem as jest.Mock).mockReturnValue('Android');

                await diveAR.launch(mockUri);

                expect(mockSceneViewerLaunch).toHaveBeenCalledWith(
                    mockUri,
                    undefined,
                );
            });

            it('should launch SceneViewer on Android with options', async () => {
                (SystemInfo.GetSystem as jest.Mock).mockReturnValue('Android');

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
                (SystemInfo.GetSystem as jest.Mock).mockReturnValue('Android');

                const mockError = new Error('Launch failed');
                const mockInstance = {
                    launch: jest.fn().mockImplementation(() => {
                        throw mockError;
                    }),
                };
                (SceneViewer as jest.Mock).mockImplementation(
                    () => mockInstance,
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

        it('should reject on non-mobile systems', async () => {
            (SystemInfo.GetSystem as jest.Mock).mockReturnValue('Windows');

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
