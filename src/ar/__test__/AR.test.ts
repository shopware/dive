import { DIVEAR, type DIVEAROptions } from '../AR';
import { DIVEInfo } from '../../info/Info';
import { DIVEScene } from '../../scene/Scene';
import { DIVEARQuickLook } from '../arquicklook/ARQuickLook';
import { DIVESceneViewer } from '../sceneviewer/SceneViewer';

// Mock DIVEInfo
jest.mock('../../info/Info', () => ({
    DIVEInfo: {
        GetSystem: jest.fn(),
        GetSupportsARQuickLook: jest.fn(),
    },
}));

// Mock ARQuickLook
jest.mock('../arquicklook/ARQuickLook', () => ({
    DIVEARQuickLook: jest.fn().mockImplementation(() => ({
        launch: jest.fn().mockResolvedValue(undefined),
    })),
}));

// Mock SceneViewer
jest.mock('../sceneviewer/SceneViewer', () => ({
    DIVESceneViewer: jest.fn().mockImplementation(() => ({
        launch: jest.fn(),
    })),
}));

describe('DIVEAR', () => {
    let scene: DIVEScene;
    let diveAR: DIVEAR;
    const mockUri = 'https://example.com/model.glb';

    beforeEach(() => {
        scene = {} as DIVEScene;
        diveAR = new DIVEAR(scene);
        jest.clearAllMocks();
    });

    describe('launch', () => {
        describe('AR Quick Look', () => {
            it('should launch ARQuickLook on iOS', async () => {
                (DIVEInfo.GetSystem as jest.Mock).mockReturnValue('iOS');
                (DIVEInfo.GetSupportsARQuickLook as jest.Mock).mockReturnValue(
                    true,
                );

                const consoleLogSpy = jest
                    .spyOn(console, 'log')
                    .mockImplementation();

                await diveAR.launch(mockUri);

                expect(DIVEARQuickLook).toHaveBeenCalledWith(
                    mockUri,
                    undefined,
                );
                expect(consoleLogSpy).toHaveBeenCalledWith(
                    'DIVE: Launching AR with ARQuickLook ...',
                );
                consoleLogSpy.mockRestore();
            });

            it('should launch ARQuickLook on iOS with options', async () => {
                (DIVEInfo.GetSystem as jest.Mock).mockReturnValue('iOS');
                (DIVEInfo.GetSupportsARQuickLook as jest.Mock).mockReturnValue(
                    true,
                );

                const options: DIVEAROptions = {
                    arPlacement: 'vertical',
                    arScale: 'fixed',
                };

                const consoleLogSpy = jest
                    .spyOn(console, 'log')
                    .mockImplementation();

                await diveAR.launch(mockUri, options);

                expect(DIVEARQuickLook).toHaveBeenCalledWith(mockUri, options);
                expect(consoleLogSpy).toHaveBeenCalledWith(
                    'DIVE: Launching AR with ARQuickLook ...',
                );
                consoleLogSpy.mockRestore();
            });

            it('should not launch ARQuickLook on iOS if not supported', async () => {
                (DIVEInfo.GetSystem as jest.Mock).mockReturnValue('iOS');
                (DIVEInfo.GetSupportsARQuickLook as jest.Mock).mockReturnValue(
                    false,
                );

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
                (DIVEInfo.GetSystem as jest.Mock).mockReturnValue('iOS');
                (DIVEInfo.GetSupportsARQuickLook as jest.Mock).mockReturnValue(
                    true,
                );

                const mockError = new Error('Launch failed');
                const mockInstance = {
                    launch: jest.fn().mockImplementation(() => {
                        throw mockError;
                    }),
                };
                (DIVEARQuickLook as jest.Mock).mockImplementation(
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
                (DIVEInfo.GetSystem as jest.Mock).mockReturnValue('Android');

                const consoleLogSpy = jest
                    .spyOn(console, 'log')
                    .mockImplementation();

                await diveAR.launch(mockUri);

                expect(DIVESceneViewer).toHaveBeenCalledWith(
                    mockUri,
                    undefined,
                );
                expect(consoleLogSpy).toHaveBeenCalledWith(
                    'DIVE: Launching AR with SceneViewer ...',
                );
                consoleLogSpy.mockRestore();
            });

            it('should launch SceneViewer on Android with options', async () => {
                (DIVEInfo.GetSystem as jest.Mock).mockReturnValue('Android');

                const options: DIVEAROptions = {
                    arPlacement: 'vertical',
                    arScale: 'fixed',
                };

                const consoleLogSpy = jest
                    .spyOn(console, 'log')
                    .mockImplementation();

                await diveAR.launch(mockUri, options);

                expect(DIVESceneViewer).toHaveBeenCalledWith(mockUri, options);
                expect(consoleLogSpy).toHaveBeenCalledWith(
                    'DIVE: Launching AR with SceneViewer ...',
                );
                consoleLogSpy.mockRestore();
            });

            it('should handle SceneViewer launch errors', async () => {
                (DIVEInfo.GetSystem as jest.Mock).mockReturnValue('Android');

                const mockError = new Error('Launch failed');
                const mockInstance = {
                    launch: jest.fn().mockImplementation(() => {
                        throw mockError;
                    }),
                };
                (DIVESceneViewer as jest.Mock).mockImplementation(
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
            (DIVEInfo.GetSystem as jest.Mock).mockReturnValue('Windows');

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
