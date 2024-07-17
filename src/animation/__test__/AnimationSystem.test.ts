import { DIVERenderer } from '../../renderer/Renderer';
import DIVEAnimationSystem from '../AnimationSystem';

jest.mock('@tweenjs/tween.js', () => {
    return {
        update: jest.fn(),
    }
});

const mockRenderer = {
    render: jest.fn(),
    OnResize: jest.fn(),
    getViewport: jest.fn(),
    setViewport: jest.fn(),
    AddPreRenderCallback: jest.fn((callback) => {
        callback();
    }),
    AddPostRenderCallback: jest.fn((callback) => {
        callback();
    }),
    RemovePreRenderCallback: jest.fn(),
    RemovePostRenderCallback: jest.fn(),
} as unknown as DIVERenderer;

describe('dive/animation/DIVEAnimationSystem', () => {
    it('should instantiate', () => {
        const anim = new DIVEAnimationSystem(mockRenderer);
        expect(anim).toBeDefined();
    });

    it('should update', () => {
        const anim = new DIVEAnimationSystem(mockRenderer);
        expect(() => anim.update()).not.toThrow();
    });

    it('should dispose', () => {
        const anim = new DIVEAnimationSystem(mockRenderer);
        expect(() => anim.Dispose()).not.toThrow();
    });
});