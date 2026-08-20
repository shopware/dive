import { AmbientLight } from 'three/webgpu';
import { AmbientLightComponent } from '../AmbientLightComponent.ts';

describe('dive/light/AmbientLightComponent', () => {
    it('should own an AmbientLight', () => {
        expect(new AmbientLightComponent().light).toBeInstanceOf(AmbientLight);
    });

    it('should brand itself', () => {
        expect(new AmbientLightComponent().isAmbientLightComponent).toBe(true);
    });

    it('should name itself', () => {
        expect(new AmbientLightComponent().name).toBe('AmbientLightComponent');
    });

    it('should not pretend to have a direction', () => {
        // an ambient light lights everything equally; three ignores its position,
        // so leaving it at the origin is the honest state
        expect(new AmbientLightComponent().light.position.length()).toBe(0);
    });

    it('should cast no shadow', () => {
        expect(new AmbientLightComponent().light.castShadow).toBe(false);
    });
});
