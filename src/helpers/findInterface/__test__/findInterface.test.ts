import { Object3D } from 'three/webgpu';
import { findInterface } from '../findInterface.ts';

describe('dive/helper/findInterface', () => {
    it('should not find interface', () => {
        expect(findInterface(null, 'isInterface')).toBe(undefined);

        const obj = {} as unknown as Object3D;

        expect(findInterface(obj, 'isInterface')).toBe(undefined);

        // add traverse function
        obj.traverseAncestors = vi.fn((callback: (object: Object3D) => any) => {
            callback(obj);
        });

        expect(findInterface(obj, 'isInterface')).toBe(undefined);
    });

    it('should find interface in object', () => {
        const obj = {
            isInterface: true,
            traverseAncestors: vi.fn((callback: (object: Object3D) => any) => {
                callback(obj);
            }),
        } as unknown as Object3D;

        expect(findInterface(obj, 'isInterface')).toBe(obj);
    });

    it('should find interface in parent', () => {
        const obj = {
            traverseAncestors: vi.fn((callback: (object: Object3D) => any) => {
                callback(obj);
            }),
            parent: {
                isInterface: true,

                traverseAncestors: vi.fn(
                    (callback: (object: Object3D) => any) => {
                        callback(obj.parent!);
                    },
                ),

                parent: {
                    traverseAncestors: vi.fn(
                        (callback: (object: Object3D) => any) => {
                            callback(obj.parent!);
                        },
                    ),
                },
            },
        } as unknown as Object3D;

        expect(findInterface(obj, 'isInterface')).toBe(obj.parent);
    });
});
