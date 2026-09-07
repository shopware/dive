import { DirectionalLight } from 'three/webgpu';
import { DirectionalLightComponent } from '../DirectionalLightComponent.ts';

const lightOf = (component: DirectionalLightComponent): DirectionalLight =>
    component.light as DirectionalLight;

describe('dive/light/DirectionalLightComponent', () => {
    it('should own a DirectionalLight', () => {
        expect(new DirectionalLightComponent().light).toBeInstanceOf(
            DirectionalLight,
        );
    });

    it('should brand and name itself', () => {
        const component = new DirectionalLightComponent();

        expect(component.isDirectionalLightComponent).toBe(true);
        expect(component.name).toBe('DirectionalLightComponent');
    });

    it('should cast shadows', () => {
        expect(lightOf(new DirectionalLightComponent()).castShadow).toBe(true);
    });

    it('should ask for a shadow map big enough for a sun', () => {
        // a directional light covers the whole scene from one angle, so its map
        // is stretched much further than a point light's
        const shadow = lightOf(new DirectionalLightComponent()).shadow;

        expect(shadow.mapSize.width).toBe(2048);
        expect(shadow.mapSize.height).toBe(2048);
    });

    it('should frame its shadow camera symmetrically', () => {
        // an asymmetric frustum would clip shadows on one side of the scene only
        const camera = lightOf(new DirectionalLightComponent()).shadow.camera;

        expect(camera.right).toBe(-camera.left);
        expect(camera.top).toBe(-camera.bottom);
        expect(camera.right).toBeGreaterThan(0);
        expect(camera.far).toBeGreaterThan(camera.right);
    });

    it('should default to a non-zero direction', () => {
        expect(
            new DirectionalLightComponent().light.position.length(),
        ).toBeGreaterThan(0);
    });

    it('should default to shining from above', () => {
        // the sun sits higher than it is far, which is what the previous
        // DIVESceneLight did
        const position = new DirectionalLightComponent().light.position;

        expect(position.y).toBeGreaterThan(position.x);
        expect(position.y).toBeGreaterThan(position.z);
    });

    it('should set every axis of the direction', () => {
        const component = new DirectionalLightComponent();

        component.setDirection({ x: 1, y: 2, z: 3 });

        expect(component.light.position.toArray()).toEqual([1, 2, 3]);
    });

    it('should refuse a zero direction and keep the one it had', () => {
        const component = new DirectionalLightComponent();
        component.setDirection({ x: 5, y: 5, z: 5 });
        console.warn = vi.fn();

        component.setDirection({ x: 0, y: 0, z: 0 });

        expect(console.warn).toHaveBeenCalledWith(
            expect.stringContaining('direction'),
        );
        expect(component.light.position.toArray()).toEqual([5, 5, 5]);
    });
});
