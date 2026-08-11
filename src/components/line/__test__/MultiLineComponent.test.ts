import { type BufferAttribute, LineSegments, Object3D } from 'three/webgpu';
import { MultiLineComponent } from '../MultiLineComponent.ts';
import { DIVENode } from '../../node/Node.ts';
import { HELPER_LAYER_MASK } from '../../../constants/VisibilityLayerMask.ts';

describe('dive/group/MultiLineComponent', () => {
    let group: DIVENode;
    let lines: MultiLineComponent;

    beforeEach(() => {
        group = new DIVENode();
        lines = group.addComponent(new MultiLineComponent());
    });

    const addMember = (x = 1): DIVENode => {
        const member = new DIVENode();
        member.position.set(x, 0, 0);
        group.add(member);
        return member;
    };

    /** Reads the endpoint written for a slot. */
    const endpointAt = (slot: number): number[] => {
        const array = lines.lines.geometry.attributes.position
            .array as Float32Array;
        return Array.from(array.slice(slot * 6 + 3, slot * 6 + 6));
    };

    const drawnVertices = (): number => lines.lines.geometry.drawRange.count;

    /** `attributes.position` is a union; only BufferAttribute tracks ranges. */
    const positionAttribute = (): BufferAttribute =>
        lines.lines.geometry.attributes.position as BufferAttribute;

    describe('single draw call', () => {
        it('should draw every line from one LineSegments', () => {
            addMember(1);
            addMember(2);
            addMember(3);

            // the whole point of the rewrite: one object, one draw call
            expect(lines.children).toHaveLength(1);
            expect(lines.children[0]).toBeInstanceOf(LineSegments);
            expect(lines.lineCount).toBe(3);
        });

        it('should keep its geometry on the helper layer', () => {
            expect(lines.lines.layers.mask).toBe(HELPER_LAYER_MASK);
        });

        it('should draw two vertices per line', () => {
            addMember();
            expect(drawnVertices()).toBe(2);

            addMember(2);
            expect(drawnVertices()).toBe(4);
        });

        it('should draw nothing while there are no members', () => {
            expect(drawnVertices()).toBe(0);
        });
    });

    describe('geometry contents', () => {
        it('should run each line from the origin to the member', () => {
            addMember(5);

            const array = lines.lines.geometry.attributes.position
                .array as Float32Array;
            expect(Array.from(array.slice(0, 3))).toEqual([0, 0, 0]);
            expect(endpointAt(0)).toEqual([5, 0, 0]);
        });

        it('should use owner-local coordinates, not world', () => {
            // world coordinates would be transformed a second time by the
            // owner's matrix, putting every line in the wrong place
            group.position.set(100, 0, 0);
            group.updateMatrixWorld(true);
            const member = addMember(2);
            member.updateMatrixWorld(true);

            expect(endpointAt(0)).toEqual([2, 0, 0]);
        });

        it('should restart the dash pattern for every line', () => {
            // LineSegments.computeLineDistances() accumulates across segments,
            // which can drop a short line entirely into a gap
            addMember(1);
            addMember(2);

            const distances = lines.lines.geometry.attributes.lineDistance
                .array as Float32Array;
            expect(distances[0]).toBe(0);
            expect(distances[1]).toBeCloseTo(1);
            expect(distances[2]).toBe(0);
            expect(distances[3]).toBeCloseTo(2);
        });

        it('should follow a member that moves', () => {
            const member = addMember(1);

            member.setPosition({ x: 9, y: 0, z: 0 });

            expect(endpointAt(0)).toEqual([9, 0, 0]);
        });

        it('should upload only the changed range', () => {
            addMember(1);
            const member = addMember(2);
            positionAttribute().clearUpdateRanges();

            member.setPosition({ x: 7, y: 0, z: 0 });

            // second slot only: offset 6, six floats
            expect(positionAttribute().updateRanges).toEqual([
                { start: 6, count: 6 },
            ]);
        });
    });

    describe('membership', () => {
        it('should not draw plain children', () => {
            group.add(new Object3D());

            expect(lines.lineCount).toBe(0);
        });

        it('should not draw other components', () => {
            group.addComponent(new MultiLineComponent());

            expect(lines.lineCount).toBe(0);
        });

        it('should collapse the line when a member leaves', () => {
            const member = addMember(4);

            member.removeFromParent();

            expect(lines.lineCount).toBe(0);
            expect(endpointAt(0)).toEqual([0, 0, 0]);
        });

        it('should reuse a freed slot', () => {
            const first = addMember(1);
            addMember(2);

            first.removeFromParent();
            addMember(3);

            // the newcomer takes slot 0 back instead of growing the buffer
            expect(endpointAt(0)).toEqual([3, 0, 0]);
            expect(drawnVertices()).toBe(4);
        });

        it('should not disturb other lines when one member leaves', () => {
            addMember(1);
            const second = addMember(2);
            addMember(3);

            second.removeFromParent();

            expect(endpointAt(0)).toEqual([1, 0, 0]);
            expect(endpointAt(2)).toEqual([3, 0, 0]);
        });

        it('should draw members that were already present when attached', () => {
            const late = new DIVENode();
            const member = new DIVENode();
            member.position.set(3, 0, 0);
            late.add(member);

            const lateLines = late.addComponent(new MultiLineComponent());

            expect(lateLines.lineCount).toBe(1);
        });

        it('should grow beyond its initial capacity', () => {
            // initial capacity is 8
            for (let i = 0; i < 20; i++) addMember(i + 1);

            expect(lines.lineCount).toBe(20);
            expect(drawnVertices()).toBe(40);
            expect(endpointAt(19)).toEqual([20, 0, 0]);
        });

        it('should keep earlier lines intact after growing', () => {
            for (let i = 0; i < 12; i++) addMember(i + 1);

            expect(endpointAt(0)).toEqual([1, 0, 0]);
            expect(endpointAt(7)).toEqual([8, 0, 0]);
        });

        it('should ignore updateLineTo for a non-member', () => {
            expect(() => lines.updateLineTo(new Object3D())).not.toThrow();
        });
    });

    describe('visibility', () => {
        it('should hide and show the whole set with one flag', () => {
            addMember(1);
            addMember(2);

            lines.setVisible(false);
            expect(lines.lines.visible).toBe(false);

            lines.setVisible(true);
            expect(lines.lines.visible).toBe(true);
        });

        it('should collapse a single hidden line', () => {
            addMember(1);
            const second = addMember(2);

            lines.setVisible(false, second);

            expect(endpointAt(0)).toEqual([1, 0, 0]);
            expect(endpointAt(1)).toEqual([0, 0, 0]);
        });

        it('should restore a single line', () => {
            const member = addMember(4);

            lines.setVisible(false, member);
            lines.setVisible(true, member);

            expect(endpointAt(0)).toEqual([4, 0, 0]);
        });

        it('should keep a hidden line collapsed when it moves', () => {
            const member = addMember(1);
            lines.setVisible(false, member);

            member.setPosition({ x: 6, y: 0, z: 0 });

            expect(endpointAt(0)).toEqual([0, 0, 0]);
        });

        it('should forget the hidden flag when the member leaves', () => {
            const member = addMember(1);
            lines.setVisible(false, member);
            member.removeFromParent();

            group.add(member);

            expect(endpointAt(0)).toEqual([1, 0, 0]);
        });

        it('should ignore a single-line change for a non-member', () => {
            expect(() => lines.setVisible(false, new Object3D())).not.toThrow();
        });

        it('should cover lines added after being hidden', () => {
            lines.setVisible(false);

            addMember(1);

            expect(lines.lines.visible).toBe(false);
        });
    });

    it('should drop every line when detached', () => {
        addMember(1);
        addMember(2);

        group.removeComponent(lines);

        expect(lines.lineCount).toBe(0);
        expect(drawnVertices()).toBe(0);
    });

    it('should stop tracking the old owner after being moved', () => {
        addMember(1);
        const other = new DIVENode();

        other.addComponent(lines);
        addMember(5);

        expect(lines.lineCount).toBe(0);
    });

    it('should dispose its geometry and material', () => {
        const geometry = vi.spyOn(lines.lines.geometry, 'dispose');
        const material = vi.spyOn(
            lines.lines.material as { dispose: () => void },
            'dispose',
        );

        lines.dispose();

        expect(geometry).toHaveBeenCalled();
        expect(material).toHaveBeenCalled();
    });
});
