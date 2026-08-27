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
import { DIVEComponent } from '../../engine/component/Component.ts';

/** Floats per line: two vertices, three components each. */
const FLOATS_PER_LINE = 6;
/** Line-distance values per line: one per vertex. */
const DISTANCES_PER_LINE = 2;
/** Vertices per line. */
const VERTICES_PER_LINE = 2;

const INITIAL_CAPACITY = 8;

const _delta = new Vector3();

/**
 * Whatever a caller identifies one of its lines by.
 *
 * Opaque here: this component never inspects a key, it only compares them. A
 * caller drawing lines to scene objects passes the objects; one drawing an
 * arbitrary set passes numbers or symbols.
 */
export type DIVELineKey = unknown;

/**
 * One line: where it is drawn, and where in the shared buffer it lives.
 *
 * Named for the prefix rather than plain `Line`, which is three's own class.
 */
type DIVELine = {
    /**
     * Index of this line's two vertices in the shared buffer.
     *
     * Fixed for the line's lifetime, so moving or hiding it never touches
     * another line's vertices.
     */
    readonly slot: number;
    readonly start: Vector3;
    readonly end: Vector3;
    /**
     * Whether the line is drawn, spelled as `Object3D.visible` is rather than
     * inverted, so it reads the same way as everything else in the scene.
     */
    visible: boolean;
};

/**
 * Draws a set of independent line segments.
 *
 * A pure drawing primitive: it knows about points, nothing else. It does not
 * watch the scene, does not care what the lines mean, and never decides when
 * they should change — a caller places lines and removes them. What keeps the
 * lines in sync with something else is that caller's job.
 *
 * All lines share **one** `LineSegments`, so the whole set costs a single draw
 * call no matter how many there are. Each line owns a fixed slot of two vertices
 * in a shared buffer, so adding, moving or hiding one rewrites only that slot and
 * uploads only that range.
 *
 * ### Lines are addressed by the caller's own identity for them
 *
 * There is no line handle to keep. `setLineFor(key, …)` places the line for a
 * key, adding it if there is none yet, so a caller never holds a second piece of
 * bookkeeping beside the thing the line belongs to — which is where handles and
 * their objects used to drift apart. It also means placing and moving are one
 * call, so the two cannot be confused.
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

    /**
     * Every line, by the key it was placed under.
     *
     * The single piece of bookkeeping: which keys exist, where each line is
     * drawn, which buffer slot it owns and whether it is visible. Those were four
     * separate containers keyed by a handle, which had to be kept in step with
     * each other and with whatever the caller kept on its own side.
     */
    private _byKey: Map<DIVELineKey, DIVELine> = new Map();
    /** Slots freed by removed lines, reused before the buffer grows. */
    private _freeSlots: number[] = [];

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
        this.contribute(this._lines);
    }

    /** The single object all lines are drawn by. */
    public get lines(): LineSegments {
        return this._lines;
    }

    /** How many lines currently exist, hidden ones included. */
    public get lineCount(): number {
        return this._byKey.size;
    }

    /**
     * Places the line for a key, adding it if there is none yet.
     *
     * @param key - Whatever the caller identifies this line by.
     * @param start - Where the line begins.
     * @param end - Where the line ends.
     */
    public setLineFor(
        key: DIVELineKey,
        start: Vector3Like,
        end: Vector3Like,
    ): void {
        const existing = this._byKey.get(key);

        if (existing) {
            existing.start.set(start.x, start.y, start.z);
            existing.end.set(end.x, end.y, end.z);
            this._writeLine(existing);
            return;
        }

        const slot = this._freeSlots.pop() ?? this._byKey.size;
        if (slot >= this._capacity) this._grow();

        const line: DIVELine = {
            slot,
            start: new Vector3(start.x, start.y, start.z),
            end: new Vector3(end.x, end.y, end.z),
            visible: true,
        };
        this._byKey.set(key, line);

        if (slot + 1 > this._highWater) {
            this._highWater = slot + 1;
            this._geometry.setDrawRange(0, this._highWater * VERTICES_PER_LINE);
        }

        this._writeLine(line);
    }

    /**
     * Removes the line for a key and frees its slot for reuse. Does nothing if
     * there is no such line.
     *
     * @param key - Whatever the caller identifies this line by.
     */
    public removeLineFor(key: DIVELineKey): void {
        const line = this._byKey.get(key);
        if (!line) return;

        this._byKey.delete(key);
        this._freeSlots.push(line.slot);

        /**
         * collapse rather than repack: every other line keeps its slot, so none
         * of them has to be rewritten
         */
        this._collapseSlot(line.slot);
    }

    /** Whether a line is currently drawn for this key. */
    public hasLineFor(key: DIVELineKey): boolean {
        return this._byKey.has(key);
    }

    /**
     * Shows or hides a single line.
     *
     * A hidden line keeps its slot and is collapsed to zero length, so toggling
     * it back costs one range upload and never reshuffles the buffer.
     *
     * @param key - Whatever the caller identifies this line by.
     * @param visible - Whether it should be drawn.
     */
    public setLineVisibleFor(key: DIVELineKey, visible: boolean): void {
        const line = this._byKey.get(key);
        if (!line) return;

        line.visible = visible;
        this._writeLine(line);
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
        this._byKey.forEach((line) => this._collapseSlot(line.slot));
        this._byKey.clear();
        this._freeSlots = [];
        this._highWater = 0;
        this._geometry.setDrawRange(0, 0);
    }

    public dispose(): void {
        this._geometry.dispose();
        this._material.dispose();
        this._byKey.clear();
        this._freeSlots = [];
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

    /** Writes a line's endpoints into its slot, or collapses it when hidden. */
    private _writeLine(line: DIVELine): void {
        if (!line.visible) {
            this._collapseSlot(line.slot);
            return;
        }

        const { slot, start, end } = line;

        const offset = slot * FLOATS_PER_LINE;
        const positions = this._positions.array as Float32Array;
        positions[offset] = start.x;
        positions[offset + 1] = start.y;
        positions[offset + 2] = start.z;
        positions[offset + 3] = end.x;
        positions[offset + 4] = end.y;
        positions[offset + 5] = end.z;

        /**
         * each line restarts the dash pattern at 0, while LineSegments accumulates
         * across segments and lets a short line vanish inside a gap
         */
        const distances = this._distances.array as Float32Array;
        const distanceOffset = slot * DISTANCES_PER_LINE;
        distances[distanceOffset] = 0;
        distances[distanceOffset + 1] = _delta.subVectors(end, start).length();

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
