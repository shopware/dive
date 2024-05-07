import DIVEMediaCreator from '../MediaCreator';
import DIVERenderer from '../../renderer/Renderer';
import DIVEScene from '../../scene/Scene';
import DIVEPerspectiveCamera from '../../camera/PerspectiveCamera';
import { COMPov } from '../../com';
import DIVEOrbitControls from '../../controls/OrbitControls';

const mock_render = jest.fn();
const mock_toDataURL = jest.fn();

jest.mock('../../scene/Scene', () => {
    return jest.fn(() => {
        return {};
    });
});

jest.mock('../../camera/PerspectiveCamera', () => {
    return jest.fn(function () {
        this.position = {
            clone: jest.fn(),
            copy: jest.fn(),
        };
        this.quaternion = {
            clone: jest.fn(),
            copy: jest.fn(),
        };
        this.orbitControls = {
            target: {
                clone: jest.fn(),
                copy: jest.fn(),
            },
            update: jest.fn(),
        };
        this.layers = {
            mask: 0,
        }
        return this;
    });
});

jest.mock('../../controls/OrbitControls', () => {
    return jest.fn(function () {
        this.object = {
            position: {
                clone: jest.fn(),
                copy: jest.fn(),
            },
            quaternion: {
                clone: jest.fn(),
                copy: jest.fn(),
            },
            layers: {
                mask: 0,
            },
        };

        this.target = {
            clone: jest.fn(),
            copy: jest.fn(),
        };

        this.update = jest.fn();

        return this;
    });
});

jest.mock('../../renderer/Renderer', () => {
    return jest.fn(function () {
        this.domElement = {
            toDataURL: mock_toDataURL,
        }
        this.render = mock_render;
        return this;
    });
});

describe('dive/mediacreator/DIVEMediaCreator', () => {
    it('should instantiate', () => {
        const mc = new DIVEMediaCreator(new DIVERenderer(), new DIVEScene(), new DIVEOrbitControls(new DIVEPerspectiveCamera(80, 1), new DIVERenderer()));
        expect(mc).toBeDefined();
    });

    it('should generate media', () => {
        const mc = new DIVEMediaCreator(new DIVERenderer(), new DIVEScene(), new DIVEOrbitControls(new DIVEPerspectiveCamera(80, 1), new DIVERenderer()));
        const mock_POV = {
            position: { x: 0, y: 0, z: 0 },
            target: { x: 0, y: 0, z: 0 }
        } as COMPov;
        expect(() => {
            mc.GenerateMedia(mock_POV)
        }).not.toThrow();
        expect(mock_render).toHaveBeenCalledTimes(1);
        expect(mock_toDataURL).toHaveBeenCalledTimes(1);
    });
});
