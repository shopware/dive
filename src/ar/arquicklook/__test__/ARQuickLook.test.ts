import { Object3D } from 'three';
import { DIVEScene } from '../../../scene/Scene';
import { DIVEAROptions } from '../../AR';
import { DIVEARQuickLook } from '../ARQuickLook';

jest.mock('../../../exporters/usdz/USDZExporter', () => {
    return {
        DIVEUSDZExporter: jest.fn().mockImplementation(() => {
            return {
                parse: jest.fn(() => {
                    return Promise.resolve(new Uint8Array());
                }),
            };
        }),
    };
});

URL.createObjectURL = jest.fn(() => 'blob:http://localhost:8080/');

describe('DIVEARQuickLook', () => {
    let mockScene: DIVEScene;
    let mockOptions: DIVEAROptions;
    let mockModels: Object3D[];

    beforeEach(() => {
        mockModels = [
            new Object3D(),
            new Object3D(),
        ];
        mockScene = {
            Root: new Object3D(),
        } as DIVEScene;
        mockOptions = {
            arPlacement: 'horizontal',
            arScale: 'auto',
        } as DIVEAROptions;
    });

    describe('Launch', () => {
        it('should be a function', () => {
            expect(DIVEARQuickLook.Launch).toBeInstanceOf(Function);
        });

        it('should return a promise', () => {
            expect(
                DIVEARQuickLook.Launch(mockScene, mockOptions),
            ).toBeInstanceOf(Promise);
        });

        it('should not throw when called without options', () => {
            const usdzParseSpy = jest.spyOn(
                DIVEARQuickLook['_usdzExporter'],
                'parse',
            );

            expect(
                async () => await DIVEARQuickLook.Launch(mockScene),
            ).not.toThrow();

            expect(usdzParseSpy).toHaveBeenCalled();
        });

        it('should not throw when called with empty scene', () => {
            const usdzParseSpy = jest.spyOn(
                DIVEARQuickLook['_usdzExporter'],
                'parse',
            );

            expect(
                async () =>
                    await DIVEARQuickLook.Launch(mockScene, mockOptions),
            ).not.toThrow();

            expect(usdzParseSpy).toHaveBeenCalled();
        });

        it('should not throw when called with filled scene', () => {
            const usdzParseSpy = jest.spyOn(
                DIVEARQuickLook['_usdzExporter'],
                'parse',
            );

            mockScene.Root.children = mockModels;

            expect(
                async () =>
                    await DIVEARQuickLook.Launch(mockScene, mockOptions),
            ).not.toThrow();

            expect(usdzParseSpy).toHaveBeenCalled();
        });

        it('should pass options to exporter', async () => {
            const usdzParseSpy = jest.spyOn(
                DIVEARQuickLook['_usdzExporter'],
                'parse',
            );

            mockOptions.arPlacement = 'vertical';
            mockOptions.arScale = 'fixed';

            await DIVEARQuickLook.Launch(mockScene, mockOptions);

            expect(usdzParseSpy).toHaveBeenCalledWith(expect.any(Object3D), {
                quickLookCompatible: true,
                ar: {
                    anchoring: { type: 'plane' },
                    planeAnchoring: {
                        alignment: 'vertical',
                    },
                },
            });
        });

        it('should reject when USDZExporter fails', async () => {
            const usdzParseSpy = jest.spyOn(
                DIVEARQuickLook['_usdzExporter'],
                'parse',
            );

            usdzParseSpy.mockReturnValueOnce(Promise.reject());

            await expect(
                DIVEARQuickLook.Launch(mockScene, mockOptions),
            ).rejects.toBeUndefined();
        });
    });
});
