import {
    BufferGeometry,
    DynamicDrawUsage,
    Float32BufferAttribute,
    LineDashedMaterial,
    LineSegments,
    Vector3,
    type ColorRepresentation,
    type Vector3Like,
} from 'three/webgpu';
import { HELPER_LAYER_MASK } from '../../constants/VisibilityLayerMask.ts';
import { DIVEComponent } from '../component/Component.ts';

/** Floats per line: two vertices, three components each. */
const FLOATS_PER_LINE = 6;
/** Line-distance values per line: one per vertex. */
const DISTANCES_PER_LINE = 2;
/** Vertices per line. */
const VERTICES_PER_LINE = 2;

const INITIAL_CAPACITY = 8;

const _delta = new Vector3();

/**
 * Identifies a line for later updates. Only valid until the line is removed.
 */
export type DIVELineHandle = number;

/**
 * Draws a set of independent line segments.
 *
 * A pure drawing primitive: it knows about points, nothing else. It does not
 * watch the scene, does not care what the lines mean, and never decides when
 * they should change — a caller adds lines, moves them and removes them. What
 * keeps the lines in sync with something else is that caller's job (see
 * `GroupLinksComponent` for the group case).
 *
 * All lines share **one** `LineSegments`, so the whole set costs a single draw
 * call no matter how many there are. Each line owns a fixed slot of two vertices
 * in a shared buffer, so adding, moving or hiding one rewrites only that slot and
 * uploads only that range.
 *
 * Coordinates are in the component's own space, which is its owner's space.
 * Passing world-space points would have them transformed a second time by the
 * owner's matrix.
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

    /** Slots currently handed out. */
    private _used: Set<DIVELineHandle> = new Set();
    /** Slots freed by removed lines, reused before the buffer grows. */
    private _freeSlots: DIVELineHandle[] = [];
    /** Slots whose line is hidden, collapsed rather than removed. */
    private _hidden: Set<DIVELineHandle> = new Set();
    /** The endpoints of each slot, so a hidden line can be restored. */
    private _endpoints: Map<DIVELineHandle, [Vector3, Vector3]> = new Map();

    private _capacity: number = INITIAL_CAPACITY;
    /** One past the highest slot ever used, i.e. what has to be drawn. */
    private _highWater: number = 0;

    constructor() {
        super();

        this.name = 'MultiLineComponent';

        this._material = new LineDashedMaterial({
            color: 0x666666,
            dashSize: 0.05,
            gapSize: 0.025,
        });

        this._geometry = new BufferGeometry();
        this._positions = this._createAttribute(FLOATS_PER_LINE, 3);
        this._distances = this._createAttribute(DISTANCES_PER_LINE, 1);

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

    /** How many lines currently exist, hidden ones included. */
    public get lineCount(): number {
        return this._used.size;
    }

    /**
     * Adds a line.
     *
     * @param start - Where the line begins.
     * @param end - Where the line ends.
     * @returns A handle for updating or removing it.
     */
    public addLine(start: Vector3Like, end: Vector3Like): DIVELineHandle {
        const handle = this._freeSlots.pop() ?? this._used.size;
        if (handle >= this._capacity) this._grow();

        this._used.add(handle);
        this._endpoints.set(handle, [
            new Vector3(start.x, start.y, start.z),
            new Vector3(end.x, end.y, end.z),
        ]);

        if (handle + 1 > this._highWater) {
            this._highWater = handle + 1;
            this._geometry.setDrawRange(0, this._highWater * VERTICES_PER_LINE);
        }

        this._writeSlot(handle);

        return handle;
    }

    /**
     * Moves an existing line.
     *
     * @param handle - The line to move.
     * @param start - Where the line begins.
     * @param end - Where the line ends.
     */
    public setLine(
        handle: DIVELineHandle,
        start: Vector3Like,
        end: Vector3Like,
    ): void {
        const endpoints = this._endpoints.get(handle);
        if (!endpoints) return;

        endpoints[0].set(start.x, start.y, start.z);
        endpoints[1].set(end.x, end.y, end.z);

        this._writeSlot(handle);
    }

    /**
     * Removes a line and frees its slot for reuse.
     *
     * @param handle - The line to remove.
     */
    public removeLine(handle: DIVELineHandle): void {
        if (!this._used.has(handle)) return;

        this._used.delete(handle);
        this._hidden.delete(handle);
        this._endpoints.delete(handle);
        this._freeSlots.push(handle);

        // collapse rather than repack: every other line keeps its slot, so none
        // of them has to be rewritten
        this._collapseSlot(handle);
    }

    /**
     * Shows or hides a single line.
     *
     * A hidden line keeps its slot and is collapsed to zero length, so toggling
     * it back costs one range upload and never reshuffles the buffer.
     *
     * @param handle - The line to change.
     * @param visible - Whether it should be drawn.
     */
    public setLineVisible(handle: DIVELineHandle, visible: boolean): void {
        if (!this._used.has(handle)) return;

        if (visible) {
            this._hidden.delete(handle);
        } else {
            this._hidden.add(handle);
        }

        this._writeSlot(handle);
    }

    /**
     * Shows or hides the whole set, including lines added later.
     *
     * @param visible - Whether the lines should be drawn.
     */
    public setVisible(visible: boolean): void {
        this._lines.visible = visible;
    }

    /**
     * @param color - The line colour.
     */
    public setColor(color: ColorRepresentation): void {
        this._material.color.set(color);
    }

    /**
     * Sets the dash pattern.
     *
     * @param dashSize - Length of a drawn stretch.
     * @param gapSize - Length of a gap.
     */
    public setDashPattern(dashSize: number, gapSize: number): void {
        this._material.dashSize = dashSize;
        this._material.gapSize = gapSize;
    }

    /**
     * Removes every line.
     *
     * Deliberately not called `clear`: that is `Object3D.clear()`, which removes
     * children, and overriding it with a different meaning would be a trap.
     */
    public clearLines(): void {
        this._used.forEach((handle) => this._collapseSlot(handle));
        this._used.clear();
        this._freeSlots = [];
        this._hidden.clear();
        this._endpoints.clear();
        this._highWater = 0;
        this._geometry.setDrawRange(0, 0);
    }

    public dispose(): void {
        this._geometry.dispose();
        this._material.dispose();
        this._used.clear();
        this._freeSlots = [];
        this._hidden.clear();
        this._endpoints.clear();
    }

    private _createAttribute(
        stride: number,
        itemSize: number,
    ): Float32BufferAttribute {
        const attribute = new Float32BufferAttribute(
            new Float32Array(this._capacity * stride),
            itemSize,
        );
        attribute.setUsage(DynamicDrawUsage);
        return attribute;
    }

    /** Writes a slot's endpoints, or collapses it when hidden. */
    private _writeSlot(handle: DIVELineHandle): void {
        const endpoints = this._endpoints.get(handle);
        if (!endpoints) return;

        if (this._hidden.has(handle)) {
            this._collapseSlot(handle);
            return;
        }

        const [start, end] = endpoints;

        const offset = handle * FLOATS_PER_LINE;
        const positions = this._positions.array as Float32Array;
        positions[offset] = start.x;
        positions[offset + 1] = start.y;
        positions[offset + 2] = start.z;
        positions[offset + 3] = end.x;
        positions[offset + 4] = end.y;
        positions[offset + 5] = end.z;

        // Each line restarts the dash pattern at 0. LineSegments'
        // computeLineDistances() accumulates across segments instead, which lets
        // a short line land entirely inside a gap and vanish.
        const distances = this._distances.array as Float32Array;
        const distanceOffset = handle * DISTANCES_PER_LINE;
        distances[distanceOffset] = 0;
        distances[distanceOffset + 1] = _delta.subVectors(end, start).length();

        this._markSlotDirty(handle);
    }

    private _collapseSlot(handle: DIVELineHandle): void {
        const offset = handle * FLOATS_PER_LINE;
        (this._positions.array as Float32Array).fill(
            0,
            offset,
            offset + FLOATS_PER_LINE,
        );

        const distanceOffset = handle * DISTANCES_PER_LINE;
        (this._distances.array as Float32Array).fill(
            0,
            distanceOffset,
            distanceOffset + DISTANCES_PER_LINE,
        );

        this._markSlotDirty(handle);
    }

    /** Uploads just this slot's range instead of the whole buffer. */
    private _markSlotDirty(handle: DIVELineHandle): void {
        this._positions.addUpdateRange(
            handle * FLOATS_PER_LINE,
            FLOATS_PER_LINE,
        );
        this._positions.needsUpdate = true;

        this._distances.addUpdateRange(
            handle * DISTANCES_PER_LINE,
            DISTANCES_PER_LINE,
        );
        this._distances.needsUpdate = true;
    }

    private _grow(): void {
        this._capacity *= 2;

        const positions = this._createAttribute(FLOATS_PER_LINE, 3);
        (positions.array as Float32Array).set(
            this._positions.array as Float32Array,
        );
        this._positions = positions;

        const distances = this._createAttribute(DISTANCES_PER_LINE, 1);
        (distances.array as Float32Array).set(
            this._distances.array as Float32Array,
        );
        this._distances = distances;

        this._geometry.setAttribute('position', this._positions);
        this._geometry.setAttribute('lineDistance', this._distances);
    }
}
