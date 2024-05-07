import { MeshStandardMaterial } from 'three';
import DIVEFloor from '../Floor';

describe('dive/primitive/floor/DIVEFloor', () => {
    it('should instantiate', () => {
        const floor = new DIVEFloor();
        expect(floor).toBeDefined();
    });

    it('should set visibility', () => {
        const floor = new DIVEFloor();
        expect(() => { floor.SetVisibility(false) }).not.toThrow();
        expect(floor.visible).toBe(false);
    });

    it('should set color', () => {
        const floor = new DIVEFloor();
        expect(() => { floor.SetColor('#ff00ff') }).not.toThrow();
        expect('#' + (floor.material as MeshStandardMaterial).color.getHexString()).toBe('#ff00ff');
    });
});