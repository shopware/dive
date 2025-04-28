import { AnimationSystem } from '../AnimationSystem';

describe('dive/animation/DIVEAnimationSystem', () => {
    it('should instantiate', () => {
        const anim = new AnimationSystem();
        expect(anim).toBeDefined();
    });

    it('should Animate', () => {
        const anim = new AnimationSystem();
        const tween = anim.Animate({});
        expect(tween).toBeDefined();
    });

    it('should tick', () => {
        const anim = new AnimationSystem();
        expect(() => anim.tick()).not.toThrow();
    });

    it('should dispose', () => {
        const anim = new AnimationSystem();
        expect(() => anim.Dispose()).not.toThrow();
    });
});
