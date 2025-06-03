import { ARSystem, type ARSystemOptions } from '../ARSystem.ts';
import { SystemInfo } from '@shopware-ag/dive/systeminfo'; // This will be mocked
import { ARQuickLook } from '../arquicklook/ARQuickLook.ts'; // This will be mocked
import { SceneViewer } from '../sceneviewer/SceneViewer.ts'; // This will be mocked
// Make sure ESystem is correctly imported based on ARSystem.ts's actual import path
// ARSystem.ts uses: import { ESystem } from '../../types/info/index.ts';
// So, for the test file, the relative path is:
import { ESystem } from '../../../../types/info/index.ts';
import { ARDesktopPlatformError } from '../error/ar-errors.ts';

// Mock the modules ARSystem depends on
vi.mock('@shopware-ag/dive/systeminfo');
vi.mock('../arquicklook/ARQuickLook');
vi.mock('../sceneviewer/SceneViewer');

describe('ARSystem', () => {
    let arSystem: ARSystem;
    const mockUri = 'test/model.glb';
    const mockOptions: ARSystemOptions = {
        arPlacement: 'vertical',
        arScale: 'fixed',
    };

    // Create mock launch functions for ARQuickLook and SceneViewer instances
    const mockARQuickLookLaunch = vi.fn();
    const mockSceneViewerLaunch = vi.fn();

    beforeEach(() => {
        // Reset all mocks before each test
        vi.clearAllMocks();

        // Setup mock implementations for ARQuickLook and SceneViewer
        // When `new ARQuickLook()` is called in ARSystem, it will return an object with a mocked launch function.
        vi.mocked(ARQuickLook).mockImplementation(() => {
            return {
                launch: mockARQuickLookLaunch,
            } as unknown as ARQuickLook;
        });

        // When `new SceneViewer()` is called in ARSystem, it will return an object with a mocked launch function.
        vi.mocked(SceneViewer).mockImplementation(() => {
            return {
                launch: mockSceneViewerLaunch,
            } as unknown as SceneViewer;
        });

        arSystem = new ARSystem();
    });

    describe('launch', () => {
        describe('when on iOS platform', () => {
            beforeEach(() => {
                // Mock SystemInfo.getSystem() to return the actual ESystem.IOS value
                vi.mocked(SystemInfo.getSystem).mockReturnValue(ESystem.IOS);
            });

            it('should instantiate ARQuickLook and call its launch method with URI and options', async () => {
                mockARQuickLookLaunch.mockResolvedValue(undefined); // ARQuickLook.launch is async
                await arSystem.launch(mockUri, mockOptions);

                expect(ARQuickLook).toHaveBeenCalledTimes(1);
                expect(mockARQuickLookLaunch).toHaveBeenCalledWith(
                    mockUri,
                    mockOptions,
                );
                expect(SceneViewer).not.toHaveBeenCalled(); // Ensure SceneViewer is not involved
            });

            it('should call ARQuickLook.launch with URI if no options are provided', async () => {
                mockARQuickLookLaunch.mockResolvedValue(undefined);
                await arSystem.launch(mockUri);

                expect(ARQuickLook).toHaveBeenCalledTimes(1);
                expect(mockARQuickLookLaunch).toHaveBeenCalledWith(
                    mockUri,
                    undefined,
                );
            });

            it('should return the promise from ARQuickLook.launch when successful', async () => {
                const successPromise = Promise.resolve(); // A distinct promise
                mockARQuickLookLaunch.mockReturnValue(successPromise);

                const resultPromise = arSystem.launch(mockUri, mockOptions);
                // ARSystem.launch wraps the call, so it's not the *exact* same promise object usually.
                // We should check that it resolves when the underlying promise resolves.
                await expect(resultPromise).resolves.toBeUndefined(); // ARSystem.launch is Promise<void>
                expect(mockARQuickLookLaunch).toHaveBeenCalled();
            });

            it('should propagate rejection if ARQuickLook.launch rejects', async () => {
                const expectedError = new Error(
                    'ARQuickLook specific launch failure',
                );
                mockARQuickLookLaunch.mockRejectedValue(expectedError);

                await expect(
                    arSystem.launch(mockUri, mockOptions),
                ).rejects.toThrow(expectedError);
                expect(ARQuickLook).toHaveBeenCalledTimes(1); // Ensure it was attempted
            });
        });

        describe('when on Android platform', () => {
            beforeEach(() => {
                // Mock SystemInfo.getSystem() to return the actual ESystem.ANDROID value
                vi.mocked(SystemInfo.getSystem).mockReturnValue(
                    ESystem.ANDROID,
                );
            });

            it('should instantiate SceneViewer and call its launch method with URI and options', async () => {
                mockSceneViewerLaunch.mockImplementation(() => {}); // SceneViewer.launch is sync void

                // ARSystem.launch itself is async, wrapping the synchronous or asynchronous nature of platform-specific launches
                await arSystem.launch(mockUri, mockOptions);

                expect(SceneViewer).toHaveBeenCalledTimes(1);
                expect(mockSceneViewerLaunch).toHaveBeenCalledWith(
                    mockUri,
                    mockOptions,
                );
                expect(ARQuickLook).not.toHaveBeenCalled(); // Ensure ARQuickLook is not involved
            });

            it('should call SceneViewer.launch with URI if no options are provided', async () => {
                mockSceneViewerLaunch.mockImplementation(() => {});
                await arSystem.launch(mockUri);

                expect(SceneViewer).toHaveBeenCalledTimes(1);
                expect(mockSceneViewerLaunch).toHaveBeenCalledWith(
                    mockUri,
                    undefined,
                );
            });

            it('should resolve to undefined when SceneViewer.launch completes synchronously', async () => {
                mockSceneViewerLaunch.mockImplementation(() => {});
                await expect(
                    arSystem.launch(mockUri, mockOptions),
                ).resolves.toBeUndefined();
            });

            it('should propagate synchronous errors from SceneViewer.launch as rejections in the returned promise', async () => {
                const expectedError = new Error(
                    'SceneViewer sync launch failure',
                );
                mockSceneViewerLaunch.mockImplementation(() => {
                    throw expectedError;
                });

                await expect(
                    arSystem.launch(mockUri, mockOptions),
                ).rejects.toThrow(expectedError);
                expect(SceneViewer).toHaveBeenCalledTimes(1); // Ensure it was attempted
            });
        });

        describe('when on an unsupported platform (e.g., Desktop or Unknown)', () => {
            it('should reject with ARDesktopPlatformError if system is not iOS or Android', async () => {
                // Use a value that is not ESystem.IOS or ESystem.ANDROID
                // This assumes ESystem might have other values like DESKTOP, or getSystem might return something else
                vi.mocked(SystemInfo.getSystem).mockReturnValue(
                    'OTHER_SYSTEM' as ESystem,
                );

                await expect(
                    arSystem.launch(mockUri, mockOptions),
                ).rejects.toThrow(ARDesktopPlatformError);
                expect(ARQuickLook).not.toHaveBeenCalled();
                expect(SceneViewer).not.toHaveBeenCalled();
            });

            it('should reject with ARDesktopPlatformError if SystemInfo.getSystem() returns null', async () => {
                vi.mocked(SystemInfo.getSystem).mockReturnValue(null as any);
                await expect(
                    arSystem.launch(mockUri, mockOptions),
                ).rejects.toThrow(ARDesktopPlatformError);
            });

            it('should reject with ARDesktopPlatformError if SystemInfo.getSystem() returns undefined', async () => {
                vi.mocked(SystemInfo.getSystem).mockReturnValue(
                    undefined as any,
                );
                await expect(
                    arSystem.launch(mockUri, mockOptions),
                ).rejects.toThrow(ARDesktopPlatformError);
            });
        });
    });
});
