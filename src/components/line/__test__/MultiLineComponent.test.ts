import {
    type BufferAttribute,
    type LineDashedMaterial,
    LineSegments,
} from 'three/webgpu';
import { MultiLineComponent } from '../MultiLineComponent.ts';
import { DIVENode } from '../../node/Node.ts';
import { HELPER_LAYER_MASK } from '../../../constants/VisibilityLayerMask.ts';

/**
 * Tests the drawing primitive only. It has no idea what a member or a group is;
 * `GroupLinksComponent` owns that and is tested separately.
 */

const ORIGIN = { x: 0, y: 0, z: 0 };

describe('dive/line/MultiLineComponent', () => {
    let lines: MultiLineComponent;

    beforeEach(() => {
        lines = new MultiLineComponent();
    });

    /** Reads the endpoint written for a slot. */
    const endpointAt = (slot: number): number[] => {
        const array = lines.lines.geometry.attributes.position
            .array as Float32Array;
        return Array.from(array.slice(slot * 6 + 3, slot * 6 + 6));
    };

    const startAt = (slot: number): number[] => {
        const array = lines.lines.geometry.attributes.position
            .array as Float32Array;
        return Array.from(array.slice(slot * 6, slot * 6 + 3));
    };

    const drawnVertices = (): number => lines.lines.geometry.drawRange.count;

    /** `material` is a union of one-or-many; these lines always have one. */
    const material = (): LineDashedMaterial =>
        lines.lines.material as LineDashedMaterial;

    /** `attributes.position` is a union; only BufferAttribute tracks ranges. */
    const positionAttribute = (): BufferAttribute =>
        lines.lines.geometry.attributes.position as BufferAttribute;

    describe('single draw call', () => {
        it('should draw every line from one LineSegments', () => {
            lines.addLine(ORIGIN, { x: 1, y: 0, z: 0 });
            lines.addLine(ORIGIN, { x: 2, y: 0, z: 0 });
            lines.addLine(ORIGIN, { x: 3, y: 0, z: 0 });

            expect(lines.children).toHaveLength(1);
            expect(lines.children[0]).toBeInstanceOf(LineSegments);
            expect(lines.lineCount).toBe(3);
        });

        it('should keep its geometry on the helper layer', () => {
            expect(lines.lines.layers.mask).toBe(HELPER_LAYER_MASK);
        });

        it('should draw two vertices per line', () => {
            lines.addLine(ORIGIN, { x: 1, y: 0, z: 0 });
            expect(drawnVertices()).toBe(2);

            lines.addLine(ORIGIN, { x: 2, y: 0, z: 0 });
            expect(drawnVertices()).toBe(4);
        });

        it('should draw nothing while empty', () => {
            expect(drawnVertices()).toBe(0);
        });
    });

    describe('geometry contents', () => {
        it('should write both endpoints as given', () => {
            lines.addLine({ x: 1, y: 2, z: 3 }, { x: 4, y: 5, z: 6 });

            expect(startAt(0)).toEqual([1, 2, 3]);
            expect(endpointAt(0)).toEqual([4, 5, 6]);
        });

        it('should copy the input vectors', () => {
            // a caller reusing a scratch vector must not corrupt the line
            const end = { x: 1, y: 0, z: 0 };
            lines.addLine(ORIGIN, end);

            end.x = 99;

            expect(endpointAt(0)).toEqual([1, 0, 0]);
        });

        it('should restart the dash pattern for every line', () => {
            // LineSegments.computeLineDistances() accumulates across segments,
            // which can drop a short line entirely into a gap
            lines.addLine(ORIGIN, { x: 1, y: 0, z: 0 });
            lines.addLine(ORIGIN, { x: 2, y: 0, z: 0 });

            const distances = lines.lines.geometry.attributes.lineDistance
                .array as Float32Array;
            expect(distances[0]).toBe(0);
            expect(distances[1]).toBeCloseTo(1);
            expect(distances[2]).toBe(0);
            expect(distances[3]).toBeCloseTo(2);
        });

        it('should measure the distance between the endpoints', () => {
            lines.addLine({ x: 1, y: 0, z: 0 }, { x: 4, y: 0, z: 0 });

            const distances = lines.lines.geometry.attributes.lineDistance
                .array as Float32Array;
            expect(distances[1]).toBeCloseTo(3);
        });

        it('should move a line', () => {
            const handle = lines.addLine(ORIGIN, { x: 1, y: 0, z: 0 });

            lines.setLine(handle, { x: 1, y: 1, z: 1 }, { x: 9, y: 0, z: 0 });

            expect(startAt(0)).toEqual([1, 1, 1]);
            expect(endpointAt(0)).toEqual([9, 0, 0]);
        });

        it('should ignore setLine for an unknown handle', () => {
            expect(() => lines.setLine(42, ORIGIN, ORIGIN)).not.toThrow();
        });

        it('should upload only the changed range', () => {
            lines.addLine(ORIGIN, { x: 1, y: 0, z: 0 });
            const second = lines.addLine(ORIGIN, { x: 2, y: 0, z: 0 });
            positionAttribute().clearUpdateRanges();

            lines.setLine(second, ORIGIN, { x: 7, y: 0, z: 0 });

            // second slot only: offset 6, six floats
            expect(positionAttribute().updateRanges).toEqual([
                { start: 6, count: 6 },
            ]);
        });
    });

    describe('slots', () => {
        it('should collapse a removed line', () => {
            const handle = lines.addLine(ORIGIN, { x: 4, y: 0, z: 0 });

            lines.removeLine(handle);

            expect(lines.lineCount).toBe(0);
            expect(endpointAt(0)).toEqual([0, 0, 0]);
        });

        it('should ignore removing an unknown handle', () => {
            expect(() => lines.removeLine(42)).not.toThrow();
        });

        it('should reuse a freed slot', () => {
            const first = lines.addLine(ORIGIN, { x: 1, y: 0, z: 0 });
            lines.addLine(ORIGIN, { x: 2, y: 0, z: 0 });

            lines.removeLine(first);
            const reused = lines.addLine(ORIGIN, { x: 3, y: 0, z: 0 });

            expect(reused).toBe(first);
            expect(endpointAt(0)).toEqual([3, 0, 0]);
            expect(drawnVertices()).toBe(4);
        });

        it('should not disturb other lines when one is removed', () => {
            lines.addLine(ORIGIN, { x: 1, y: 0, z: 0 });
            const second = lines.addLine(ORIGIN, { x: 2, y: 0, z: 0 });
            lines.addLine(ORIGIN, { x: 3, y: 0, z: 0 });

            lines.removeLine(second);

            expect(endpointAt(0)).toEqual([1, 0, 0]);
            expect(endpointAt(2)).toEqual([3, 0, 0]);
        });

        it('should grow beyond its initial capacity', () => {
            // initial capacity is 8
            for (let i = 0; i < 20; i++) {
                lines.addLine(ORIGIN, { x: i + 1, y: 0, z: 0 });
            }

            expect(lines.lineCount).toBe(20);
            expect(drawnVertices()).toBe(40);
            expect(endpointAt(19)).toEqual([20, 0, 0]);
        });

        it('should keep earlier lines intact after growing', () => {
            for (let i = 0; i < 12; i++) {
                lines.addLine(ORIGIN, { x: i + 1, y: 0, z: 0 });
            }

            expect(endpointAt(0)).toEqual([1, 0, 0]);
            expect(endpointAt(7)).toEqual([8, 0, 0]);
        });

        it('should drop everything on clearLines', () => {
            lines.addLine(ORIGIN, { x: 1, y: 0, z: 0 });
            lines.addLine(ORIGIN, { x: 2, y: 0, z: 0 });

            lines.clearLines();

            expect(lines.lineCount).toBe(0);
            expect(drawnVertices()).toBe(0);
        });

        it('should not shadow Object3D.clear', () => {
            // clear() removes children; clearLines() removes lines
            expect(lines.children).toHaveLength(1);
            lines.clearLines();
            expect(lines.children).toHaveLength(1);
        });
    });

    describe('visibility', () => {
        it('should hide and show the whole set', () => {
            lines.addLine(ORIGIN, { x: 1, y: 0, z: 0 });

            lines.setVisible(false);
            expect(lines.lines.visible).toBe(false);

            lines.setVisible(true);
            expect(lines.lines.visible).toBe(true);
        });

        it('should cover lines added after being hidden', () => {
            lines.setVisible(false);

            lines.addLine(ORIGIN, { x: 1, y: 0, z: 0 });

            expect(lines.lines.visible).toBe(false);
        });

        it('should collapse a single hidden line', () => {
            lines.addLine(ORIGIN, { x: 1, y: 0, z: 0 });
            const second = lines.addLine(ORIGIN, { x: 2, y: 0, z: 0 });

            lines.setLineVisible(second, false);

            expect(endpointAt(0)).toEqual([1, 0, 0]);
            expect(endpointAt(1)).toEqual([0, 0, 0]);
        });

        it('should restore a single line', () => {
            const handle = lines.addLine(ORIGIN, { x: 4, y: 0, z: 0 });

            lines.setLineVisible(handle, false);
            lines.setLineVisible(handle, true);

            expect(endpointAt(0)).toEqual([4, 0, 0]);
        });

        it('should keep a hidden line collapsed when it moves', () => {
            const handle = lines.addLine(ORIGIN, { x: 1, y: 0, z: 0 });
            lines.setLineVisible(handle, false);

            lines.setLine(handle, ORIGIN, { x: 6, y: 0, z: 0 });

            expect(endpointAt(0)).toEqual([0, 0, 0]);
        });

        it('should forget the hidden flag when the slot is reused', () => {
            const handle = lines.addLine(ORIGIN, { x: 1, y: 0, z: 0 });
            lines.setLineVisible(handle, false);
            lines.removeLine(handle);

            lines.addLine(ORIGIN, { x: 5, y: 0, z: 0 });

            expect(endpointAt(0)).toEqual([5, 0, 0]);
        });

        it('should ignore visibility for an unknown handle', () => {
            expect(() => lines.setLineVisible(42, false)).not.toThrow();
        });
    });

    describe('appearance', () => {
        it('should set the colour', () => {
            lines.setColor(0xff0000);

            expect(material().color.getHexString()).toBe('ff0000');
        });

        it('should set the dash pattern', () => {
            lines.setDashPattern(1, 2);

            expect(material().dashSize).toBe(1);
            expect(material().gapSize).toBe(2);
        });
    });

    it('should not watch the scene graph', () => {
        // the whole point of the split: adding children means nothing here
        const node = new DIVENode();
        node.addComponent(lines);
        node.add(new DIVENode());

        expect(lines.lineCount).toBe(0);
    });

    it('should dispose its geometry and material', () => {
        const geometry = vi.spyOn(lines.lines.geometry, 'dispose');
        const materialDispose = vi.spyOn(material(), 'dispose');

        lines.dispose();

        expect(geometry).toHaveBeenCalled();
        expect(materialDispose).toHaveBeenCalled();
    });
});
