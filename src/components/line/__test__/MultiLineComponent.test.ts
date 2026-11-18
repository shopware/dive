import {
    Line2NodeMaterial,
    type InterleavedBufferAttribute,
    type Vector3Like,
} from 'three/webgpu';
import { LineSegments2 } from 'three/examples/jsm/lines/webgpu/LineSegments2.js';
import { MultiLineComponent } from '../MultiLineComponent.ts';
import { DIVENode } from '../../../engine/node/Node.ts';
import { HELPER_LAYER_MASK } from '../../../constants/VisibilityLayerMask.ts';

/**
 * Tests the drawing primitive only. It has no idea what a member or a group is;
 * `updateParentLink` in the state plugin owns that and is tested separately.
 */

const ORIGIN = { x: 0, y: 0, z: 0 };

describe('dive/line/MultiLineComponent', () => {
    let lines: MultiLineComponent;
    let nextKey = 0;

    beforeEach(() => {
        lines = new MultiLineComponent();
        nextKey = 0;
    });

    /** One instance attribute of the line geometry, read per instance. */
    const instanceAttribute = (name: string): InterleavedBufferAttribute =>
        lines.lines.geometry.getAttribute(name) as InterleavedBufferAttribute;

    const pointAt = (name: string, slot: number): number[] => {
        const attribute = instanceAttribute(name);
        return [
            attribute.getX(slot),
            attribute.getY(slot),
            attribute.getZ(slot),
        ];
    };

    /** Reads the endpoint written for an instance. */
    const endpointAt = (slot: number): number[] => pointAt('instanceEnd', slot);

    const startAt = (slot: number): number[] => pointAt('instanceStart', slot);

    /** Line distances of an instance's start and end, which dashes are measured by. */
    const distancesAt = (slot: number): number[] => [
        instanceAttribute('instanceDistanceStart').getX(slot),
        instanceAttribute('instanceDistanceEnd').getX(slot),
    ];

    /** One instance per line, so this is how many lines are drawn. */
    const drawnLines = (): number => lines.lines.geometry.instanceCount;

    /** Every instance the GPU draws, as start and end, in buffer order. */
    const drawnSegments = (): number[][][] =>
        Array.from({ length: drawnLines() }, (_, i) => [
            startAt(i),
            endpointAt(i),
        ]);

    /** The drawn instances' end points, sorted, so the order does not matter. */
    const drawnEnds = (): number[][] =>
        drawnSegments()
            .map(([, end]) => end)
            .sort((a, b) => a[0] - b[0] || a[1] - b[1] || a[2] - b[2]);

    /** How many drawn instances start and end in the same point. */
    const degenerateSegments = (): number =>
        drawnSegments().filter(([start, end]) =>
            start.every((value, i) => value === end[i]),
        ).length;

    /**
     * Places a line under a key nobody else uses, and returns that key.
     *
     * Most tests here are about instances, buffers and upload ranges, and only
     * need *some* identity per line.
     */
    const addLine = (start: Vector3Like, end: Vector3Like): number => {
        const key = nextKey++;
        lines.setLineFor(key, start, end);

        return key;
    };

    const material = (): Line2NodeMaterial => lines.lines.material;

    /** start and end share one interleaved buffer, which tracks the ranges */
    const positionBuffer = () => instanceAttribute('instanceStart').data;

    describe('single draw call', () => {
        it('should draw every line from one LineSegments2', () => {
            addLine(ORIGIN, { x: 1, y: 0, z: 0 });
            addLine(ORIGIN, { x: 2, y: 0, z: 0 });
            addLine(ORIGIN, { x: 3, y: 0, z: 0 });

            // one LineSegments2 for every line, contributed to the node
            expect(lines.contributions).toEqual([lines.lines]);
            expect(lines.lines).toBeInstanceOf(LineSegments2);
            expect(lines.lines.material).toBeInstanceOf(Line2NodeMaterial);
            expect(lines.lineCount).toBe(3);
        });

        it('should keep its geometry on the helper layer', () => {
            expect(lines.lines.layers.mask).toBe(HELPER_LAYER_MASK);
        });

        it('should draw one instance per line', () => {
            addLine(ORIGIN, { x: 1, y: 0, z: 0 });
            expect(drawnLines()).toBe(1);

            addLine(ORIGIN, { x: 2, y: 0, z: 0 });
            expect(drawnLines()).toBe(2);
        });

        it('should draw nothing while empty', () => {
            expect(drawnLines()).toBe(0);
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
            /**
             * LineSegments2.computeLineDistances() accumulates across segments,
             * which can drop a short line entirely into a gap
             */
            addLine(ORIGIN, { x: 1, y: 0, z: 0 });
            addLine({ x: 5, y: 0, z: 0 }, { x: 7, y: 0, z: 0 });

            expect(distancesAt(0)).toEqual([0, 1]);
            expect(distancesAt(1)).toEqual([0, 2]);
        });

        it('should measure the distance between the endpoints', () => {
            addLine({ x: 1, y: 0, z: 0 }, { x: 4, y: 0, z: 0 });

            expect(distancesAt(0)[1]).toBeCloseTo(3);
        });

        it('should restart the dash pattern when a line moves', () => {
            const key = addLine(ORIGIN, { x: 1, y: 0, z: 0 });
            addLine(ORIGIN, { x: 2, y: 0, z: 0 });

            lines.setLineFor(key, { x: 1, y: 1, z: 0 }, { x: 4, y: 5, z: 0 });

            expect(distancesAt(0)).toEqual([0, 5]);
            expect(distancesAt(1)).toEqual([0, 2]);
        });

        it('should keep the dash distances of earlier lines after growing', () => {
            for (let i = 0; i < 12; i++) {
                addLine(ORIGIN, { x: i + 1, y: 0, z: 0 });
            }

            expect(distancesAt(0)).toEqual([0, 1]);
            expect(distancesAt(11)).toEqual([0, 12]);
        });

        it('should move a line', () => {
            const key = addLine(ORIGIN, { x: 1, y: 0, z: 0 });

            lines.setLineFor(key, { x: 1, y: 1, z: 1 }, { x: 9, y: 0, z: 0 });

            expect(startAt(0)).toEqual([1, 1, 1]);
            expect(endpointAt(0)).toEqual([9, 0, 0]);
        });

        it('should add a line for a key it does not know yet', () => {
            /**
             * placing and moving are one call, so a caller redrawing a line
             * cannot get the two cases the wrong way round
             */
            lines.setLineFor('fresh', ORIGIN, { x: 1, y: 0, z: 0 });

            expect(lines.lineCount).toBe(1);
            expect(endpointAt(0)).toEqual([1, 0, 0]);
        });

        it('should upload only the changed range', () => {
            addLine(ORIGIN, { x: 1, y: 0, z: 0 });
            const second = addLine(ORIGIN, { x: 2, y: 0, z: 0 });
            positionBuffer().clearUpdateRanges();

            lines.setLineFor(second, ORIGIN, { x: 7, y: 0, z: 0 });

            // the second instance only, six floats from offset 6
            expect(positionBuffer().updateRanges).toEqual([
                { start: 6, count: 6 },
            ]);
        });
    });

    describe('keys', () => {
        /**
         * a key is opaque to the component, it never inspects one, only compares
         * them
         */
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

    describe('instances', () => {
        it('should stop drawing a removed line', () => {
            const key = addLine(ORIGIN, { x: 4, y: 0, z: 0 });

            lines.removeLineFor(key);

            expect(lines.lineCount).toBe(0);
            expect(drawnLines()).toBe(0);
        });

        it('should ignore removing an unknown key', () => {
            expect(() => lines.removeLineFor(42)).not.toThrow();
        });

        it('should draw a line added after a removal', () => {
            const first = addLine(ORIGIN, { x: 1, y: 0, z: 0 });
            addLine(ORIGIN, { x: 2, y: 0, z: 0 });

            lines.removeLineFor(first);
            addLine(ORIGIN, { x: 3, y: 0, z: 0 });

            expect(drawnEnds()).toEqual([
                [2, 0, 0],
                [3, 0, 0],
            ]);
        });

        it('should keep the other lines when one is removed', () => {
            addLine(ORIGIN, { x: 1, y: 0, z: 0 });
            const second = addLine(ORIGIN, { x: 2, y: 0, z: 0 });
            addLine(ORIGIN, { x: 3, y: 0, z: 0 });

            lines.removeLineFor(second);

            expect(drawnEnds()).toEqual([
                [1, 0, 0],
                [3, 0, 0],
            ]);
        });

        it('should grow beyond its initial capacity', () => {
            // initial capacity is 8
            for (let i = 0; i < 20; i++) {
                addLine(ORIGIN, { x: i + 1, y: 0, z: 0 });
            }

            expect(lines.lineCount).toBe(20);
            expect(drawnLines()).toBe(20);
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
            expect(drawnLines()).toBe(0);
        });

        it('should not shadow Object3D.clear', () => {
            // clear() removes children; clearLines() removes lines
            expect(lines.contributions).toEqual([lines.lines]);
            lines.clearLines();
            expect(lines.contributions).toEqual([lines.lines]);
        });
    });

    describe('drawn instances', () => {
        /**
         * a zero-length segment makes Line2NodeMaterial normalize a zero
         * direction, which is undefined in WGSL, so none may be drawn
         */
        it('should draw only the visible lines after hiding, removing and clearing', () => {
            const a = addLine(ORIGIN, { x: 1, y: 0, z: 0 });
            const b = addLine(ORIGIN, { x: 2, y: 0, z: 0 });
            addLine(ORIGIN, { x: 3, y: 0, z: 0 });
            const d = addLine(ORIGIN, { x: 4, y: 0, z: 0 });

            lines.setLineVisibleFor(b, false);
            lines.removeLineFor(a);

            expect(drawnEnds()).toEqual([
                [3, 0, 0],
                [4, 0, 0],
            ]);
            expect(degenerateSegments()).toBe(0);

            lines.setLineVisibleFor(b, true);
            lines.setLineVisibleFor(d, false);

            expect(drawnEnds()).toEqual([
                [2, 0, 0],
                [3, 0, 0],
            ]);
            expect(degenerateSegments()).toBe(0);

            lines.clearLines();

            expect(drawnSegments()).toEqual([]);
        });

        it('should keep each drawn line with its own dash distances', () => {
            const a = addLine(ORIGIN, { x: 1, y: 0, z: 0 });
            addLine({ x: 5, y: 0, z: 0 }, { x: 7, y: 0, z: 0 });

            lines.removeLineFor(a);

            expect(drawnLines()).toBe(1);
            expect(endpointAt(0)).toEqual([7, 0, 0]);
            expect(distancesAt(0)).toEqual([0, 2]);
        });

        it('should not draw a hidden line that moves', () => {
            const key = addLine(ORIGIN, { x: 1, y: 0, z: 0 });
            lines.setLineVisibleFor(key, false);

            lines.setLineFor(key, ORIGIN, { x: 6, y: 0, z: 0 });
            expect(drawnLines()).toBe(0);

            lines.setLineVisibleFor(key, true);
            expect(drawnEnds()).toEqual([[6, 0, 0]]);
        });

        it('should not draw a line twice when it is shown twice', () => {
            const key = addLine(ORIGIN, { x: 1, y: 0, z: 0 });

            lines.setLineVisibleFor(key, true);
            lines.setLineVisibleFor(key, false);
            lines.setLineVisibleFor(key, false);

            expect(drawnLines()).toBe(0);
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

        it('should stop drawing a single hidden line', () => {
            addLine(ORIGIN, { x: 1, y: 0, z: 0 });
            const second = addLine(ORIGIN, { x: 2, y: 0, z: 0 });

            lines.setLineVisibleFor(second, false);

            expect(drawnEnds()).toEqual([[1, 0, 0]]);
            expect(lines.hasLineFor(second)).toBe(true);
        });

        it('should restore a single line', () => {
            const key = addLine(ORIGIN, { x: 4, y: 0, z: 0 });

            lines.setLineVisibleFor(key, false);
            lines.setLineVisibleFor(key, true);

            expect(endpointAt(0)).toEqual([4, 0, 0]);
        });

        it('should draw a new line under a key that was hidden and removed', () => {
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

        it('should draw solid lines by default', () => {
            expect(material().dashed).toBe(false);
            expect(material().gapSize).toBe(0);
        });

        it('should set the dash pattern', () => {
            lines.setDashPattern(1, 2);

            expect(material().dashed).toBe(true);
            expect(material().dashSize).toBe(1);
            expect(material().gapSize).toBe(2);
        });

        it('should draw solid again once the gap is zero', () => {
            lines.setDashPattern(1, 2);
            lines.setDashPattern(1, 0);

            expect(material().dashed).toBe(false);
        });

        it('should draw one pixel wide by default', () => {
            expect(lines.lineWidth).toBe(1);
            expect(material().linewidth).toBe(1);
        });

        it('should set the line width in screen pixels', () => {
            lines.setLineWidth(3);

            expect(lines.lineWidth).toBe(3);
            expect(material().linewidth).toBe(3);
            // pixels, not world units, so the width stays the same at any distance
            expect(material().worldUnits).toBe(false);
        });

        it('should keep dashes at any width', () => {
            lines.setDashPattern(0.05, 0.025);
            lines.setLineWidth(4);

            expect(material().dashed).toBe(true);
            expect(material().dashSize).toBe(0.05);
            expect(material().gapSize).toBe(0.025);
        });
    });

    it('should not watch the scene graph', () => {
        // adding children means nothing here, which is the point of the split
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

    describe('computeBoundingBox', () => {
        it('should be null until computed', () => {
            expect(lines.boundingBox).toBeNull();
        });

        it('should enclose the visible lines only, not the unused slots', () => {
            lines.setLineFor('a', { x: 1, y: 1, z: 1 }, { x: 2, y: 3, z: 1 });
            lines.setLineFor('b', { x: 9, y: 9, z: 9 }, { x: 9, y: 9, z: 10 });
            lines.setLineVisibleFor('b', false);

            lines.computeBoundingBox();

            expect(lines.boundingBox!.min.toArray()).toEqual([1, 1, 1]);
            expect(lines.boundingBox!.max.toArray()).toEqual([2, 3, 1]);
        });

        it('should be empty without lines', () => {
            lines.computeBoundingBox();

            expect(lines.boundingBox!.isEmpty()).toBe(true);
        });

        it('should not follow later changes until computed again', () => {
            lines.setLineFor('a', ORIGIN, { x: 1, y: 0, z: 0 });
            lines.computeBoundingBox();
            const box = lines.boundingBox;

            lines.setLineFor('a', ORIGIN, { x: 5, y: 0, z: 0 });
            expect(lines.boundingBox!.max.x).toBe(1);

            lines.computeBoundingBox();
            expect(lines.boundingBox!.max.x).toBe(5);
            expect(lines.boundingBox).toBe(box);
        });
    });

    describe('cloning', () => {
        it('should give the clone its own geometry, not a second one', () => {
            /**
             * Object3D.copy used to add a clone of the source child on top of the
             * constructor's, leaving a _lines that pointed at the empty one
             */
            const source = new MultiLineComponent();
            source.setLineFor('a', ORIGIN, { x: 1, y: 0, z: 0 });

            const copy = source.clone();

            expect(copy.contributions).toEqual([copy.lines]);
            expect(copy.lines).not.toBe(source.lines);
        });

        it('should carry how the lines look along to a clone', () => {
            const source = new MultiLineComponent();
            source.setColor(0xff0000);
            source.setDashPattern(0.2, 0.1);
            source.setLineWidth(3);
            source.setVisible(false);

            const copy = source.clone();
            const material = copy.lines.material;

            expect(material.color.getHexString()).toBe('ff0000');
            expect(material.dashed).toBe(true);
            expect(material.dashSize).toBe(0.2);
            expect(material.gapSize).toBe(0.1);
            expect(copy.lineWidth).toBe(3);
            expect(material.linewidth).toBe(3);
            expect(copy.lines.visible).toBe(false);
        });

        it('should not carry the lines themselves along to a clone', () => {
            /**
             * a key is whatever the caller identifies a line by, usually one of
             * its own objects -- the clone would be drawing to the source's
             */
            const source = new MultiLineComponent();
            source.setLineFor('a', ORIGIN, { x: 1, y: 0, z: 0 });

            const copy = source.clone();

            expect(copy.lineCount).toBe(0);
            expect(copy.hasLineFor('a')).toBe(false);
        });
    });
});
