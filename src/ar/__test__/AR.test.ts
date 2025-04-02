import { DIVEAR, type DIVEAROptions } from '../AR';
import { DIVEInfo } from '../../info/Info';
import { DIVEScene } from '../../scene/Scene';
import { DIVEARQuickLook } from '../arquicklook/ARQuickLook';
import { DIVESceneViewer } from '../sceneviewer/SceneViewer';

// Mock ARQuickLook
jest.mock('../arquicklook/ARQuickLook', () => ({
    DIVEARQuickLook: jest.fn().mockImplementation(() => ({
        launch: jest.fn().mockResolvedValue(undefined),
    })),
}));

// Mock SceneViewer
jest.mock('../sceneviewer/SceneViewer', () => ({
    DIVESceneViewer: {
        Launch: jest.fn(),
    },
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
                jest.spyOn(DIVEInfo, 'GetSystem').mockReturnValue('iOS');
                jest.spyOn(DIVEInfo, 'GetSupportsARQuickLook').mockReturnValue(
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
                jest.spyOn(DIVEInfo, 'GetSystem').mockReturnValue('iOS');
                jest.spyOn(DIVEInfo, 'GetSupportsARQuickLook').mockReturnValue(
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
                jest.spyOn(DIVEInfo, 'GetSystem').mockReturnValue('iOS');
                jest.spyOn(DIVEInfo, 'GetSupportsARQuickLook').mockReturnValue(
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
        });

        describe('Scene Viewer', () => {
            it('should launch SceneViewer on Android', async () => {
                jest.spyOn(DIVEInfo, 'GetSystem').mockReturnValue('Android');

                const consoleLogSpy = jest
                    .spyOn(console, 'log')
                    .mockImplementation();

                await diveAR.launch(mockUri);

                expect(DIVESceneViewer.Launch).toHaveBeenCalledWith(
                    scene,
                    undefined,
                );
                expect(consoleLogSpy).toHaveBeenCalledWith(
                    'DIVE: Launching AR with SceneViewer ...',
                );
                consoleLogSpy.mockRestore();
            });

            it('should launch SceneViewer on Android with options', async () => {
                jest.spyOn(DIVEInfo, 'GetSystem').mockReturnValue('Android');

                const options: DIVEAROptions = {
                    arPlacement: 'vertical',
                    arScale: 'fixed',
                };

                const consoleLogSpy = jest
                    .spyOn(console, 'log')
                    .mockImplementation();

                await diveAR.launch(mockUri, options);

                expect(DIVESceneViewer.Launch).toHaveBeenCalledWith(
                    scene,
                    options,
                );
                expect(consoleLogSpy).toHaveBeenCalledWith(
                    'DIVE: Launching AR with SceneViewer ...',
                );
                consoleLogSpy.mockRestore();
            });
        });

        it('should reject on non-mobile systems', async () => {
            jest.spyOn(DIVEInfo, 'GetSystem').mockReturnValue('Windows');

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
