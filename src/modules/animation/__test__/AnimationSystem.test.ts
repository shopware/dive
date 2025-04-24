import { DIVEAnimationSystem } from '../AnimationSystem';

describe('dive/animation/DIVEAnimationSystem', () => {
    it('should instantiate', () => {
        const anim = new DIVEAnimationSystem();
        expect(anim).toBeDefined();
    });

    it('should Animate', () => {
        const anim = new DIVEAnimationSystem();
        const tween = anim.Animate({});
        expect(tween).toBeDefined();
    });

    it('should update', () => {
        const anim = new DIVEAnimationSystem();
        expect(() => anim.Update()).not.toThrow();
    });

    it('should dispose', () => {
        const anim = new DIVEAnimationSystem();
        expect(() => anim.Dispose()).not.toThrow();
    });
});
