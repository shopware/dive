import {
    BufferGeometry,
    DynamicDrawUsage,
    Float32BufferAttribute,
    LineDashedMaterial,
    LineSegments,
    Object3D,
    Vector3,
} from 'three/webgpu';
import { HELPER_LAYER_MASK } from '../../constants/VisibilityLayerMask.ts';
import { DIVEComponent } from '../component/Component.ts';
import { type DIVENode } from '../node/Node.ts';

/** Floats per line: two vertices, three components each. */
const FLOATS_PER_LINE = 6;
/** Line-distance values per line: one per vertex. */
const DISTANCES_PER_LINE = 2;
/** Vertices per line. */
const VERTICES_PER_LINE = 2;

const INITIAL_CAPACITY = 8;

const _end = new Vector3();

/**
 * Draws a dashed line from the owner's origin to each of its child nodes.
 *
 * Attach this to a node to turn it into a "group": the lines are what makes the
 * grouping visible, and the membership itself is just the node's children.
 *
 * All lines live in **one** `LineSegments`, so the whole set costs a single draw
 * call no matter how many members there are. Every line occupies a fixed slot of
 * two vertices in a shared buffer; adding, moving or hiding a member rewrites
 * only that slot and uploads only that range.
 *
 * The points are in the **owner's local space**, not world space. That is what
 * keeps moving the group itself free: the GPU applies the owner's matrix, so no
 * buffer has to be touched. World-space points would have to be rewritten on
 * every move of the owner, and would be transformed a second time on top.
 *
 * @module
 */
export class MultiLineComponent extends DIVEComponent {
    readonly isMultiLineComponent: true = true;

    private _lines: LineSegments;
    private _geometry: BufferGeometry;
    private _material: LineDashedMaterial;

    private _positions: Float32BufferAttribute;
    private _distances: Float32BufferAttribute;

    /** Which slot each member occupies. */
    private _slots: Map<Object3D, number> = new Map();
    /** Slots freed by departed members, reused before the buffer grows. */
    private _freeSlots: number[] = [];
    /** Members whose line is individually hidden. */
    private _hidden: Set<Object3D> = new Set();

    private _capacity: number = INITIAL_CAPACITY;
    /** One past the highest slot ever used, i.e. what has to be drawn. */
    private _highWater: number = 0;

    private _onChildAdded = (event: { child: Object3D }): void => {
        if ('isDIVENode' in event.child) this._addLine(event.child);
    };

    private _onChildRemoved = (event: { child: Object3D }): void => {
        this._removeLine(event.child);
    };

    constructor() {
        super();

        this.name = 'MultiLineComponent';

        this._material = new LineDashedMaterial({
            color: 0x666666,
            dashSize: 0.05,
            gapSize: 0.025,
        });

        this._geometry = new BufferGeometry();
        this._positions = new Float32BufferAttribute(
            new Float32Array(this._capacity * FLOATS_PER_LINE),
            3,
        );
        this._positions.setUsage(DynamicDrawUsage);
        this._distances = new Float32BufferAttribute(
            new Float32Array(this._capacity * DISTANCES_PER_LINE),
            1,
        );
        this._distances.setUsage(DynamicDrawUsage);

        this._geometry.setAttribute('position', this._positions);
        this._geometry.setAttribute('lineDistance', this._distances);
        this._geometry.setDrawRange(0, 0);

        this._lines = new LineSegments(this._geometry, this._material);
        this._lines.layers.mask = HELPER_LAYER_MASK;
        this._lines.frustumCulled = false;
        this.add(this._lines);
    }

    /** The single object all lines are drawn by. */
    public get lines(): LineSegments {
        return this._lines;
    }

    /** How many members currently have a line. */
    public get lineCount(): number {
        return this._slots.size;
    }

    protected onAttach(owner: DIVENode): void {
        owner.addEventListener('childadded', this._onChildAdded);
        owner.addEventListener('childremoved', this._onChildRemoved);

        // the node may already have children when this is attached
        owner.nodes.forEach((node) => this._addLine(node));
    }

    protected onDetach(previousOwner: DIVENode): void {
        previousOwner.removeEventListener('childadded', this._onChildAdded);
        previousOwner.removeEventListener('childremoved', this._onChildRemoved);

        this._clearLines();
    }

    public onChildNodeTransform(node: DIVENode): void {
        this.updateLineTo(node);
    }

    /**
     * Shows or hides lines.
     *
     * A hidden line keeps its slot and is collapsed to zero length rather than
     * removed, so toggling it back costs one range upload and never reshuffles
     * the buffer.
     *
     * @param visible - Whether the lines should be drawn.
     * @param object - Restricts the change to the line for this member.
     */
    public setVisible(visible: boolean, object?: Object3D): void {
        if (object) {
            if (!this._slots.has(object)) return;

            if (visible) {
                this._hidden.delete(object);
            } else {
                this._hidden.add(object);
            }

            this._writeSlot(object);
            return;
        }

        // one flag for the whole set, which also covers lines added later
        this._lines.visible = visible;
    }

    /**
     * Redraws the line to a member after it moved.
     *
     * @param object - The member whose line should be refreshed.
     */
    public updateLineTo(object: Object3D): void {
        if (!this._slots.has(object)) return;

        this._writeSlot(object);
    }

    public dispose(): void {
        this._geometry.dispose();
        this._material.dispose();
        this._slots.clear();
        this._freeSlots = [];
        this._hidden.clear();
    }

    private _addLine(object: Object3D): void {
        if (this._slots.has(object)) return;

        const slot = this._freeSlots.pop() ?? this._slots.size;
        if (slot >= this._capacity) this._grow();

        this._slots.set(object, slot);

        if (slot + 1 > this._highWater) {
            this._highWater = slot + 1;
            this._geometry.setDrawRange(0, this._highWater * VERTICES_PER_LINE);
        }

        this._writeSlot(object);
    }

    private _removeLine(object: Object3D): void {
        const slot = this._slots.get(object);
        if (slot === undefined) return;

        this._slots.delete(object);
        this._hidden.delete(object);
        this._freeSlots.push(slot);

        // collapse rather than repack: other members keep their slots, so no
        // other line has to be rewritten
        this._collapseSlot(slot);
    }

    /**
     * Writes the line for a member: origin to its local position.
     *
     * A hidden line is collapsed instead, which draws nothing.
     */
    private _writeSlot(object: Object3D): void {
        const slot = this._slots.get(object);
        if (slot === undefined) return;

        if (this._hidden.has(object)) {
            this._collapseSlot(slot);
            return;
        }

        _end.copy(object.position);

        const offset = slot * FLOATS_PER_LINE;
        const positions = this._positions.array as Float32Array;
        positions[offset] = 0;
        positions[offset + 1] = 0;
        positions[offset + 2] = 0;
        positions[offset + 3] = _end.x;
        positions[offset + 4] = _end.y;
        positions[offset + 5] = _end.z;

        // Each line restarts the dash pattern at 0. LineSegments'
        // computeLineDistances() accumulates across segments instead, which lets
        // a short line land entirely inside a gap and vanish.
        const distances = this._distances.array as Float32Array;
        const distanceOffset = slot * DISTANCES_PER_LINE;
        distances[distanceOffset] = 0;
        distances[distanceOffset + 1] = _end.length();

        this._markSlotDirty(slot);
    }

    private _collapseSlot(slot: number): void {
        const offset = slot * FLOATS_PER_LINE;
        (this._positions.array as Float32Array).fill(
            0,
            offset,
            offset + FLOATS_PER_LINE,
        );

        const distanceOffset = slot * DISTANCES_PER_LINE;
        (this._distances.array as Float32Array).fill(
            0,
            distanceOffset,
            distanceOffset + DISTANCES_PER_LINE,
        );

        this._markSlotDirty(slot);
    }

    /** Uploads just this slot's range instead of the whole buffer. */
    private _markSlotDirty(slot: number): void {
        this._positions.addUpdateRange(slot * FLOATS_PER_LINE, FLOATS_PER_LINE);
        this._positions.needsUpdate = true;

        this._distances.addUpdateRange(
            slot * DISTANCES_PER_LINE,
            DISTANCES_PER_LINE,
        );
        this._distances.needsUpdate = true;
    }

    private _grow(): void {
        this._capacity *= 2;

        const positions = new Float32Array(this._capacity * FLOATS_PER_LINE);
        positions.set(this._positions.array as Float32Array);
        this._positions = new Float32BufferAttribute(positions, 3);
        this._positions.setUsage(DynamicDrawUsage);

        const distances = new Float32Array(this._capacity * DISTANCES_PER_LINE);
        distances.set(this._distances.array as Float32Array);
        this._distances = new Float32BufferAttribute(distances, 1);
        this._distances.setUsage(DynamicDrawUsage);

        this._geometry.setAttribute('position', this._positions);
        this._geometry.setAttribute('lineDistance', this._distances);
    }

    private _clearLines(): void {
        this._slots.forEach((slot) => this._collapseSlot(slot));
        this._slots.clear();
        this._freeSlots = [];
        this._hidden.clear();
        this._highWater = 0;
        this._geometry.setDrawRange(0, 0);
    }
}
