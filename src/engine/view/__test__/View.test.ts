import {
    DIVEPerspectiveCamera,
    DIVEPerspectiveCameraDefaultSettings,
    DIVEScene,
} from '@shopware-ag/dive';
import { DIVEView } from '../View.ts';

vi.mock('../../resize/ResizeManager.ts', async () => {
    return {
        DIVEResizeManager: vi.fn().mockImplementation(() => ({
            dispose: vi.fn(),
        })),
    };
});

vi.mock('../../renderer/Renderer.ts', async (importOriginal) => {
    const actual =
        await importOriginal<typeof import('../../renderer/Renderer.ts')>();
    return {
        ...actual,
        DIVERenderer: vi.fn().mockImplementation(() => ({
            onResize: vi.fn(),
            canvas: {
                parentElement: document.createElement('div'),
            },
        })),
    };
});

vi.mock('../../camera/PerspectiveCamera.ts', async (importOriginal) => {
    const actual =
        await importOriginal<
            typeof import('../../camera/PerspectiveCamera.ts')
        >();
    return {
        ...actual,
        DIVEPerspectiveCamera: vi.fn().mockImplementation(() => ({
            onResize: vi.fn(),
        })),
    };
});

vi.useFakeTimers();

describe('DIVEView', () => {
    let view: DIVEView;

    beforeEach(() => {
        vi.clearAllMocks();
        view = new DIVEView(new DIVEScene(), new DIVEPerspectiveCamera(), {});
    });

    it('should instantiate', () => {
        expect(view).toBeDefined();
    });
});
