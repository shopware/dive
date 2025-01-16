import { Box3, Color, Euler, Mesh, Object3D, Vector3 } from 'three';
import { DIVEScene } from '../../../scene/Scene';
import { DIVEAROptions } from '../../AR';
import { DIVESceneViewer } from '../SceneViewer';

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

describe('DIVESceneViewer', () => {
    let mockScene: DIVEScene;
    let mockOptions: DIVEAROptions;
    let mockModels: Object3D[];

    beforeEach(() => {
        mockModels = [
            new Object3D(),
            new Object3D(),
            new Object3D(),
        ];
        mockModels[1].userData = {
            uri: 'https://example.com',
        };
        mockScene = new DIVEScene();
        mockOptions = {
            arPlacement: 'horizontal',
            arScale: 'auto',
        } as DIVEAROptions;
    });

    describe('Launch', () => {
        it('should be a function', () => {
            expect(DIVESceneViewer.Launch).toBeInstanceOf(Function);
        });

        it('should not throw without options', () => {
            mockScene.Root.children = mockModels;

            expect(() => {
                DIVESceneViewer.Launch(mockScene);
            }).not.toThrow();
        });

        it('should not throw with options', () => {
            mockScene.Root.children = mockModels;

            expect(() => {
                DIVESceneViewer.Launch(mockScene, mockOptions);
            }).not.toThrow();
        });

        it('should not throw with alternated options', () => {
            mockScene.Root.children = mockModels;

            mockOptions = {
                arPlacement: 'vertical',
                arScale: 'fixed',
            } as DIVEAROptions;

            expect(() => {
                DIVESceneViewer.Launch(mockScene, mockOptions);
            }).not.toThrow();
        });

        it('should throw if no url is found', () => {
            mockScene.Root.children = [
                new Object3D(),
                new Object3D(),
                new Object3D(),
            ];

            expect(() => {
                DIVESceneViewer.Launch(mockScene, mockOptions);
            }).toThrow();
        });
    });
});
