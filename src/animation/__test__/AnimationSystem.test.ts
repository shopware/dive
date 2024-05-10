import DIVEAnimationSystem from '../AnimationSystem';

jest.mock('@tweenjs/tween.js', () => {
    return {
        update: jest.fn(),
    }
});

describe('dive/animation/DIVEAnimationSystem', () => {
    it('should instantiate', () => {
        const anim = new DIVEAnimationSystem();
        expect(anim).toBeDefined();
    });

    it('should update', () => {
        const anim = new DIVEAnimationSystem();
        expect(() => anim.update()).not.toThrow();
    });
});