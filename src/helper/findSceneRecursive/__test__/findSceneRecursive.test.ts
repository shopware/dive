import type { Object3D } from 'three';
import { findSceneRecursive } from '../findSceneRecursive.ts';

describe('dive/helper/findSceneRecursive', () => {
    it('should find itself if parent is not set', () => {
        const obj = {} as Object3D;

        const found = findSceneRecursive(obj);

        expect(found).toStrictEqual(obj);
    });

    it('should find itself if it has no parent', () => {
        const obj = {
            parent: null,
        } as Object3D;

        const found = findSceneRecursive(obj);

        expect(found).toStrictEqual(obj);
    });

    it('should find itself if it has no parent', () => {
        const scene = {
            parent: null,
        } as Object3D;

        const objparent = {
            parent: scene,
        } as Object3D;

        const obj = {
            parent: objparent,
        } as Object3D;

        const found = findSceneRecursive(obj);

        expect(found).toStrictEqual(scene);
    });
});