import type { Object3D } from 'three/webgpu';
import { findSceneRecursive } from '../findSceneRecursive.ts';

describe('dive/helper/findSceneRecursive', () => {
    it('should return null for nullish input', () => {
        expect(findSceneRecursive(null)).toBeNull();
        expect(findSceneRecursive(undefined)).toBeNull();
    });

    it('should return null for a detached object', () => {
        expect(findSceneRecursive({} as Object3D)).toBeNull();
        expect(findSceneRecursive({ parent: null } as Object3D)).toBeNull();
    });

    it('should return null when the topmost ancestor is not a scene', () => {
        const notAScene = { parent: null } as Object3D;
        const obj = { parent: notAScene } as Object3D;

        expect(findSceneRecursive(obj)).toBeNull();
    });

    it('should find the scene itself', () => {
        const scene = {
            isDIVEScene: true,
            parent: null,
        } as unknown as Object3D;

        expect(findSceneRecursive(scene)).toStrictEqual(scene);
    });

    it('should find the scene through the parent chain', () => {
        const scene = {
            isDIVEScene: true,
            parent: null,
        } as unknown as Object3D;
        const objparent = { parent: scene } as Object3D;
        const obj = { parent: objparent } as Object3D;

        expect(findSceneRecursive(obj)).toStrictEqual(scene);
    });
});
