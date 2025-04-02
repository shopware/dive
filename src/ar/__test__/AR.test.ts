import { ARSystem, type ARSystemOptions } from '../AR';
import { SystemInfo } from '../../info/Info';
import { ARQuickLook } from '../arquicklook/ARQuickLook';
import { SceneViewer } from '../sceneviewer/SceneViewer';

// Mock Info
jest.mock('../../info/Info', () => ({
    SystemInfo: {
        GetSystem: jest.fn(),
        GetSupportsARQuickLook: jest.fn(),
    },
}));

// Mock ARQuickLook
jest.mock('../arquicklook/ARQuickLook', () => ({
    ARQuickLook: jest.fn().mockImplementation(() => ({
        launch: jest.fn().mockResolvedValue(undefined),
    })),
}));

// Mock SceneViewer
jest.mock('../sceneviewer/SceneViewer', () => ({
    SceneViewer: jest.fn().mockImplementation(() => ({
        launch: jest.fn(),
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

                expect(ARQuickLook).toHaveBeenCalledWith(mockUri, undefined);
                expect(consoleLogSpy).toHaveBeenCalledWith(
                    'DIVE: Launching AR with ARQuickLook ...',
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

                expect(ARQuickLook).toHaveBeenCalledWith(mockUri, options);
                expect(consoleLogSpy).toHaveBeenCalledWith(
                    'DIVE: Launching AR with ARQuickLook ...',
                );
                consoleLogSpy.mockRestore();
            });

            it('should not launch ARQuickLook on iOS if not supported', async () => {
                (SystemInfo.GetSystem as jest.Mock).mockReturnValue('iOS');
                (
                    SystemInfo.GetSupportsARQuickLook as jest.Mock
                ).mockReturnValue(false);

                const consoleLogSpy = jest
                    .spyOn(console, 'log')
                    .mockImplementation();

                try {
                    await diveAR.launch(mockUri);
                    fail('Expected launch to reject');
                } catch (error: unknown) {
                    if (error instanceof Error) {
                        expect(error.message).toBe('ARQuickLook not supported');
                    } else {
                        fail('Expected error to be an Error instance');
                    }
                }
                expect(consoleLogSpy).toHaveBeenCalledWith(
                    'ARQuickLook not supported',
                );
                consoleLogSpy.mockRestore();
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

                const consoleLogSpy = jest
                    .spyOn(console, 'log')
                    .mockImplementation();
                const consoleErrorSpy = jest
                    .spyOn(console, 'error')
                    .mockImplementation();

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

                expect(consoleLogSpy).toHaveBeenCalledWith(
                    'DIVE: Launching AR with ARQuickLook ...',
                );
                expect(consoleErrorSpy).toHaveBeenCalledWith(
                    'Error launching ARQuickLook:',
                    mockError,
                );

                consoleLogSpy.mockRestore();
                consoleErrorSpy.mockRestore();
            });
        });

        describe('Scene Viewer', () => {
            it('should launch SceneViewer on Android', async () => {
                (SystemInfo.GetSystem as jest.Mock).mockReturnValue('Android');

                const consoleLogSpy = jest
                    .spyOn(console, 'log')
                    .mockImplementation();

                await diveAR.launch(mockUri);

                expect(SceneViewer).toHaveBeenCalledWith(mockUri, undefined);
                expect(consoleLogSpy).toHaveBeenCalledWith(
                    'DIVE: Launching AR with SceneViewer ...',
                );
                consoleLogSpy.mockRestore();
            });

            it('should launch SceneViewer on Android with options', async () => {
                (SystemInfo.GetSystem as jest.Mock).mockReturnValue('Android');

                const options: ARSystemOptions = {
                    arPlacement: 'vertical',
                    arScale: 'fixed',
                };

                const consoleLogSpy = jest
                    .spyOn(console, 'log')
                    .mockImplementation();

                await diveAR.launch(mockUri, options);

                expect(SceneViewer).toHaveBeenCalledWith(mockUri, options);
                expect(consoleLogSpy).toHaveBeenCalledWith(
                    'DIVE: Launching AR with SceneViewer ...',
                );
                consoleLogSpy.mockRestore();
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

                const consoleLogSpy = jest
                    .spyOn(console, 'log')
                    .mockImplementation();
                const consoleErrorSpy = jest
                    .spyOn(console, 'error')
                    .mockImplementation();

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

                expect(consoleLogSpy).toHaveBeenCalledWith(
                    'DIVE: Launching AR with SceneViewer ...',
                );
                expect(consoleErrorSpy).toHaveBeenCalledWith(
                    'Error launching SceneViewer:',
                    mockError,
                );

                consoleLogSpy.mockRestore();
                consoleErrorSpy.mockRestore();
            });
        });

        it('should reject on non-mobile systems', async () => {
            (SystemInfo.GetSystem as jest.Mock).mockReturnValue('Windows');

            const consoleLogSpy = jest
                .spyOn(console, 'log')
                .mockImplementation();

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
            expect(consoleLogSpy).toHaveBeenCalledWith(
                'DIVE: AR not supported. Not a mobile system. (System is Windows)',
            );
            consoleLogSpy.mockRestore();
        });
    });
});
