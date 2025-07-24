import { DIVEPerspectiveCamera, DIVEScene } from '@shopware-ag/dive';
import { DIVEView } from '../View.ts';

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
