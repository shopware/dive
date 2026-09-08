import { Object3D } from 'three/webgpu';
import { isVisibleInHierarchy } from '../isVisibleInHierarchy.ts';

describe('dive/helper/isVisibleInHierarchy', () => {
    it('should return false for nullish objects', () => {
        expect(isVisibleInHierarchy(null)).toBe(false);
        expect(isVisibleInHierarchy(undefined)).toBe(false);
    });

    it('should return true for a visible detached object', () => {
        expect(isVisibleInHierarchy(new Object3D())).toBe(true);
    });

    it('should return false when the object itself is hidden', () => {
        const object = new Object3D();
        object.visible = false;

        expect(isVisibleInHierarchy(object)).toBe(false);
    });

    it('should return true when the whole chain is visible', () => {
        const root = new Object3D();
        const parent = new Object3D();
        const child = new Object3D();
        root.add(parent);
        parent.add(child);

        expect(isVisibleInHierarchy(child)).toBe(true);
    });

    it('should return false when an ancestor is hidden', () => {
        const root = new Object3D();
        const parent = new Object3D();
        const child = new Object3D();
        root.add(parent);
        parent.add(child);

        parent.visible = false;

        expect(isVisibleInHierarchy(child)).toBe(false);
    });

    it('should return false when the topmost ancestor is hidden', () => {
        const root = new Object3D();
        const parent = new Object3D();
        const child = new Object3D();
        root.add(parent);
        parent.add(child);

        root.visible = false;

        expect(isVisibleInHierarchy(child)).toBe(false);
    });
});
