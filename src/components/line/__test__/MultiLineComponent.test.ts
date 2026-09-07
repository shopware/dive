import {
    type BufferAttribute,
    type Vector3Like,
    type LineDashedMaterial,
    LineSegments,
} from 'three/webgpu';
import { MultiLineComponent } from '../MultiLineComponent.ts';
import { DIVENode } from '../../node/Node.ts';
import { HELPER_LAYER_MASK } from '../../../constants/VisibilityLayerMask.ts';

/**
 * Tests the drawing primitive only. It has no idea what a member or a group is;
 * `groupLines` in the state plugin owns that and is tested separately.
 */

const ORIGIN = { x: 0, y: 0, z: 0 };

describe('dive/line/MultiLineComponent', () => {
    let lines: MultiLineComponent;
    let nextKey = 0;

    beforeEach(() => {
        lines = new MultiLineComponent();
        nextKey = 0;
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

    /**
     * Places a line under a key nobody else uses, and returns that key.
     *
     * Most tests here are about slots, buffers and draw ranges, and only need
     * *some* identity per line.
     */
    const addLine = (start: Vector3Like, end: Vector3Like): number => {
        const key = nextKey++;
        lines.setLineFor(key, start, end);

        return key;
    };

    /** `material` is a union of one-or-many; these lines always have one. */
    const material = (): LineDashedMaterial =>
        lines.lines.material as LineDashedMaterial;

    /** `attributes.position` is a union; only BufferAttribute tracks ranges. */
    const positionAttribute = (): BufferAttribute =>
        lines.lines.geometry.attributes.position as BufferAttribute;

    describe('single draw call', () => {
        it('should draw every line from one LineSegments', () => {
            addLine(ORIGIN, { x: 1, y: 0, z: 0 });
            addLine(ORIGIN, { x: 2, y: 0, z: 0 });
            addLine(ORIGIN, { x: 3, y: 0, z: 0 });

            expect(lines.children).toHaveLength(1);
            expect(lines.children[0]).toBeInstanceOf(LineSegments);
            expect(lines.lineCount).toBe(3);
        });

        it('should keep its geometry on the helper layer', () => {
            expect(lines.lines.layers.mask).toBe(HELPER_LAYER_MASK);
        });

        it('should draw two vertices per line', () => {
            addLine(ORIGIN, { x: 1, y: 0, z: 0 });
            expect(drawnVertices()).toBe(2);

            addLine(ORIGIN, { x: 2, y: 0, z: 0 });
            expect(drawnVertices()).toBe(4);
        });

        it('should draw nothing while empty', () => {
            expect(drawnVertices()).toBe(0);
        });
    });

    describe('geometry contents', () => {
        it('should write both endpoints as given', () => {
            addLine({ x: 1, y: 2, z: 3 }, { x: 4, y: 5, z: 6 });

            expect(startAt(0)).toEqual([1, 2, 3]);
            expect(endpointAt(0)).toEqual([4, 5, 6]);
        });

        it('should copy the input vectors', () => {
            // a caller reusing a scratch vector must not corrupt the line
            const end = { x: 1, y: 0, z: 0 };
            addLine(ORIGIN, end);

            end.x = 99;

            expect(endpointAt(0)).toEqual([1, 0, 0]);
        });

        it('should restart the dash pattern for every line', () => {
            // LineSegments.computeLineDistances() accumulates across segments,
            // which can drop a short line entirely into a gap
            addLine(ORIGIN, { x: 1, y: 0, z: 0 });
            addLine(ORIGIN, { x: 2, y: 0, z: 0 });

            const distances = lines.lines.geometry.attributes.lineDistance
                .array as Float32Array;
            expect(distances[0]).toBe(0);
            expect(distances[1]).toBeCloseTo(1);
            expect(distances[2]).toBe(0);
            expect(distances[3]).toBeCloseTo(2);
        });

        it('should measure the distance between the endpoints', () => {
            addLine({ x: 1, y: 0, z: 0 }, { x: 4, y: 0, z: 0 });

            const distances = lines.lines.geometry.attributes.lineDistance
                .array as Float32Array;
            expect(distances[1]).toBeCloseTo(3);
        });

        it('should move a line', () => {
            const key = addLine(ORIGIN, { x: 1, y: 0, z: 0 });

            lines.setLineFor(key, { x: 1, y: 1, z: 1 }, { x: 9, y: 0, z: 0 });

            expect(startAt(0)).toEqual([1, 1, 1]);
            expect(endpointAt(0)).toEqual([9, 0, 0]);
        });

        it('should add a line for a key it does not know yet', () => {
            // placing and moving are one call, so a caller redrawing a line
            // cannot get the two cases the wrong way round
            lines.setLineFor('fresh', ORIGIN, { x: 1, y: 0, z: 0 });

            expect(lines.lineCount).toBe(1);
            expect(endpointAt(0)).toEqual([1, 0, 0]);
        });

        it('should upload only the changed range', () => {
            addLine(ORIGIN, { x: 1, y: 0, z: 0 });
            const second = addLine(ORIGIN, { x: 2, y: 0, z: 0 });
            positionAttribute().clearUpdateRanges();

            lines.setLineFor(second, ORIGIN, { x: 7, y: 0, z: 0 });

            // second slot only: offset 6, six floats
            expect(positionAttribute().updateRanges).toEqual([
                { start: 6, count: 6 },
            ]);
        });
    });

    describe('keys', () => {
        // A key is opaque to the component: it never inspects one, only compares
        // them. This is what replaced handing out a line handle the caller had to
        // keep beside whatever the line belonged to.
        const member = { name: 'a member' };
        const other = { name: 'another member' };

        it('should move the same line when a key is placed again', () => {
            lines.setLineFor(member, ORIGIN, { x: 1, y: 0, z: 0 });
            lines.setLineFor(member, ORIGIN, { x: 2, y: 0, z: 0 });

            expect(lines.lineCount).toBe(1);
            expect(endpointAt(0)).toEqual([2, 0, 0]);
        });

        it('should keep separate keys apart', () => {
            lines.setLineFor(member, ORIGIN, { x: 1, y: 0, z: 0 });
            lines.setLineFor(other, ORIGIN, { x: 2, y: 0, z: 0 });

            expect(lines.lineCount).toBe(2);
            expect(endpointAt(0)).toEqual([1, 0, 0]);
            expect(endpointAt(1)).toEqual([2, 0, 0]);
        });

        it('should report whether a key has a line', () => {
            expect(lines.hasLineFor(member)).toBe(false);

            lines.setLineFor(member, ORIGIN, { x: 1, y: 0, z: 0 });
            expect(lines.hasLineFor(member)).toBe(true);

            lines.removeLineFor(member);
            expect(lines.hasLineFor(member)).toBe(false);
        });

        it('should accept the same key again after a removal', () => {
            lines.setLineFor(member, ORIGIN, { x: 1, y: 0, z: 0 });
            lines.removeLineFor(member);

            lines.setLineFor(member, ORIGIN, { x: 3, y: 0, z: 0 });

            expect(lines.lineCount).toBe(1);
            expect(endpointAt(0)).toEqual([3, 0, 0]);
        });

        it('should forget its keys when every line is cleared', () => {
            lines.setLineFor(member, ORIGIN, { x: 1, y: 0, z: 0 });

            lines.clearLines();

            expect(lines.hasLineFor(member)).toBe(false);
        });

        it('should forget its keys on dispose', () => {
            lines.setLineFor(member, ORIGIN, { x: 1, y: 0, z: 0 });

            lines.dispose();

            expect(lines.hasLineFor(member)).toBe(false);
        });
    });

    describe('slots', () => {
        it('should collapse a removed line', () => {
            const key = addLine(ORIGIN, { x: 4, y: 0, z: 0 });

            lines.removeLineFor(key);

            expect(lines.lineCount).toBe(0);
            expect(endpointAt(0)).toEqual([0, 0, 0]);
        });

        it('should ignore removing an unknown key', () => {
            expect(() => lines.removeLineFor(42)).not.toThrow();
        });

        it('should reuse a freed slot', () => {
            const first = addLine(ORIGIN, { x: 1, y: 0, z: 0 });
            addLine(ORIGIN, { x: 2, y: 0, z: 0 });

            lines.removeLineFor(first);
            addLine(ORIGIN, { x: 3, y: 0, z: 0 });

            // the freed slot took the new line, so the buffer did not grow
            expect(endpointAt(0)).toEqual([3, 0, 0]);
            expect(drawnVertices()).toBe(4);
        });

        it('should not disturb other lines when one is removed', () => {
            addLine(ORIGIN, { x: 1, y: 0, z: 0 });
            const second = addLine(ORIGIN, { x: 2, y: 0, z: 0 });
            addLine(ORIGIN, { x: 3, y: 0, z: 0 });

            lines.removeLineFor(second);

            expect(endpointAt(0)).toEqual([1, 0, 0]);
            expect(endpointAt(2)).toEqual([3, 0, 0]);
        });

        it('should grow beyond its initial capacity', () => {
            // initial capacity is 8
            for (let i = 0; i < 20; i++) {
                addLine(ORIGIN, { x: i + 1, y: 0, z: 0 });
            }

            expect(lines.lineCount).toBe(20);
            expect(drawnVertices()).toBe(40);
            expect(endpointAt(19)).toEqual([20, 0, 0]);
        });

        it('should keep earlier lines intact after growing', () => {
            for (let i = 0; i < 12; i++) {
                addLine(ORIGIN, { x: i + 1, y: 0, z: 0 });
            }

            expect(endpointAt(0)).toEqual([1, 0, 0]);
            expect(endpointAt(7)).toEqual([8, 0, 0]);
        });

        it('should drop everything on clearLines', () => {
            addLine(ORIGIN, { x: 1, y: 0, z: 0 });
            addLine(ORIGIN, { x: 2, y: 0, z: 0 });

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
            addLine(ORIGIN, { x: 1, y: 0, z: 0 });

            lines.setVisible(false);
            expect(lines.lines.visible).toBe(false);

            lines.setVisible(true);
            expect(lines.lines.visible).toBe(true);
        });

        it('should cover lines added after being hidden', () => {
            lines.setVisible(false);

            addLine(ORIGIN, { x: 1, y: 0, z: 0 });

            expect(lines.lines.visible).toBe(false);
        });

        it('should collapse a single hidden line', () => {
            addLine(ORIGIN, { x: 1, y: 0, z: 0 });
            const second = addLine(ORIGIN, { x: 2, y: 0, z: 0 });

            lines.setLineVisibleFor(second, false);

            expect(endpointAt(0)).toEqual([1, 0, 0]);
            expect(endpointAt(1)).toEqual([0, 0, 0]);
        });

        it('should restore a single line', () => {
            const key = addLine(ORIGIN, { x: 4, y: 0, z: 0 });

            lines.setLineVisibleFor(key, false);
            lines.setLineVisibleFor(key, true);

            expect(endpointAt(0)).toEqual([4, 0, 0]);
        });

        it('should keep a hidden line collapsed when it moves', () => {
            const key = addLine(ORIGIN, { x: 1, y: 0, z: 0 });
            lines.setLineVisibleFor(key, false);

            lines.setLineFor(key, ORIGIN, { x: 6, y: 0, z: 0 });

            expect(endpointAt(0)).toEqual([0, 0, 0]);
        });

        it('should make a line visible again when its slot is reused', () => {
            const key = addLine(ORIGIN, { x: 1, y: 0, z: 0 });
            lines.setLineVisibleFor(key, false);
            lines.removeLineFor(key);

            addLine(ORIGIN, { x: 5, y: 0, z: 0 });

            expect(endpointAt(0)).toEqual([5, 0, 0]);
        });

        it('should ignore visibility for an unknown key', () => {
            expect(() => lines.setLineVisibleFor(42, false)).not.toThrow();
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
