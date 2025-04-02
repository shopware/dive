import { DIVEAR, type DIVEAROptions } from '../AR';
import { DIVEInfo } from '../../info/Info';
import { DIVERenderer } from '../../renderer/Renderer';
import { DIVEScene } from '../../scene/Scene';
import DIVEOrbitControls from '../../controls/OrbitControls';
import { DIVEARQuickLook } from '../arquicklook/ARQuickLook';
import { DIVESceneViewer } from '../sceneviewer/SceneViewer';
import { DIVEWebXR } from '../webxr/WebXR';

jest.mock('../arquicklook/ARQuickLook', () => ({
    DIVEARQuickLook: {
        Launch: jest.fn(),
    },
}));

jest.mock('../webxr/WebXR', () => ({
    DIVEWebXR: {
        Launch: jest.fn(() => Promise.resolve()),
    },
}));

jest.mock('../sceneviewer/SceneViewer', () => ({
    DIVESceneViewer: {
        Launch: jest.fn(),
    },
}));

describe('DIVEAR', () => {
    let renderer: DIVERenderer;
    let scene: DIVEScene;
    let controller: DIVEOrbitControls;
    let diveAR: DIVEAR;

    beforeEach(() => {
        renderer = {} as DIVERenderer;
        scene = {} as DIVEScene;
        controller = {} as DIVEOrbitControls;
        diveAR = new DIVEAR(renderer, scene, controller);
    });

    describe('Launch', () => {
        describe('AR Quick Look', () => {
            it('should launch ARQuickLook on iOS', async () => {
                jest.spyOn(DIVEInfo, 'GetSystem').mockReturnValue('iOS');
                jest.spyOn(DIVEInfo, 'GetSupportsARQuickLook').mockReturnValue(
                    true,
                );
                const arQuickLookLaunchSpy = jest.spyOn(
                    DIVEARQuickLook,
                    'Launch',
                );

                const consoleLogSpy = jest
                    .spyOn(console, 'log')
                    .mockImplementation();

                await diveAR.Launch();

                expect(arQuickLookLaunchSpy).toHaveBeenCalledWith(
                    scene,
                    undefined,
                );
                arQuickLookLaunchSpy.mockRestore();

                expect(consoleLogSpy).toHaveBeenCalled();
                consoleLogSpy.mockRestore();
            });

            it('should not launch ARQuickLook on iOS if not supported', async () => {
                jest.spyOn(DIVEInfo, 'GetSystem').mockReturnValue('iOS');
                jest.spyOn(DIVEInfo, 'GetSupportsARQuickLook').mockReturnValue(
                    false,
                );
                const arQuickLookLaunchSpy = jest.spyOn(
                    DIVEARQuickLook,
                    'Launch',
                );

                const consoleLogSpy = jest
                    .spyOn(console, 'log')
                    .mockImplementation();

                await diveAR.Launch().catch(() => {});

                expect(arQuickLookLaunchSpy).not.toHaveBeenCalled();
                arQuickLookLaunchSpy.mockRestore();

                expect(consoleLogSpy).toHaveBeenCalled();
                consoleLogSpy.mockRestore();
            });
        });

        describe('Scene Viewer', () => {
            it('should launch SceneViewer on Android', async () => {
                jest.spyOn(DIVEInfo, 'GetSystem').mockReturnValue('Android');

                const consoleLogSpy = jest
                    .spyOn(console, 'log')
                    .mockImplementation();

                await diveAR.Launch();

                expect(DIVESceneViewer.Launch).toHaveBeenCalledWith(
                    scene,
                    undefined,
                );

                expect(consoleLogSpy).toHaveBeenCalled();
                consoleLogSpy.mockRestore();
            });
        });

        describe('WebXR', () => {
            it('should launch WebXR on Android with useWebXR option', async () => {
                jest.spyOn(DIVEInfo, 'GetSystem').mockReturnValue('Android');
                jest.spyOn(DIVEInfo, 'GetSupportsWebXR').mockResolvedValue(
                    true,
                );

                const consoleLogSpy = jest
                    .spyOn(console, 'log')
                    .mockImplementation();
                const consoleWarnSpy = jest
                    .spyOn(console, 'warn')
                    .mockImplementation();

                await diveAR.Launch({
                    useWebXR: true,
                } as unknown as DIVEAROptions);

                expect(DIVEWebXR.Launch).toHaveBeenCalledWith(
                    renderer,
                    scene,
                    controller,
                );
                expect(consoleWarnSpy).toHaveBeenCalled();
                consoleWarnSpy.mockRestore();

                expect(consoleLogSpy).toHaveBeenCalled();
                consoleLogSpy.mockRestore();
            });

            it('should not launch WebXR on Android with useWebXR option', async () => {
                jest.spyOn(DIVEInfo, 'GetSystem').mockReturnValue('Android');
                jest.spyOn(DIVEInfo, 'GetSupportsWebXR').mockResolvedValue(
                    false,
                );

                const consoleLogSpy = jest
                    .spyOn(console, 'log')
                    .mockImplementation();
                const consoleWarnSpy = jest
                    .spyOn(console, 'warn')
                    .mockImplementation();

                await diveAR
                    .Launch({
                        useWebXR: true,
                    } as unknown as DIVEAROptions)
                    .catch(() => {});

                expect(DIVEWebXR.Launch).toHaveBeenCalledWith(
                    renderer,
                    scene,
                    controller,
                );
                expect(consoleWarnSpy).toHaveBeenCalled();
                consoleWarnSpy.mockRestore();

                expect(consoleLogSpy).toHaveBeenCalled();
                consoleLogSpy.mockRestore();
            });
        });

        it('should log AR not supported on non-mobile systems', async () => {
            const consoleLogSpy = jest
                .spyOn(console, 'log')
                .mockImplementation();

            jest.spyOn(DIVEInfo, 'GetSystem').mockReturnValue('Windows');

            await diveAR.Launch();

            expect(consoleLogSpy).toHaveBeenCalled();
        });
    });
});
