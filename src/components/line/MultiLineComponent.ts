import {
    Box3,
    DynamicDrawUsage,
    InstancedInterleavedBuffer,
    InterleavedBufferAttribute,
    Line2NodeMaterial,
    Vector3,
    type ColorRepresentation,
    type Vector3Like,
} from 'three/webgpu';
import { LineSegmentsGeometry } from 'three/examples/jsm/lines/LineSegmentsGeometry.js';
import { LineSegments2 } from 'three/examples/jsm/lines/webgpu/LineSegments2.js';
import { HELPER_LAYER_MASK } from '../../constants/VisibilityLayerMask.ts';
import { DIVEComponent } from '../../engine/component/Component.ts';

// two vertices per line, three components each
const FLOATS_PER_LINE = 6;
// one line distance per end
const DISTANCES_PER_LINE = 2;

const INITIAL_CAPACITY = 8;

const _delta = new Vector3();

/**
 * Whatever a caller identifies one of its lines by.
 *
 * Opaque here, this component never inspects a key, it only compares them. A
 * caller drawing lines to scene objects passes the objects; one drawing an
 * arbitrary set passes numbers or symbols.
 */
export type DIVELineKey = unknown;

/**
 * One line, where it is drawn and which instance draws it.
 *
 * Named for the prefix rather than plain `Line`, which is three's own class.
 */
type DIVELine = {
    readonly start: Vector3;
    readonly end: Vector3;
    /**
     * The instance drawing this line, or `-1` while it is hidden.
     *
     * Only visible lines have an instance, so the buffers hold no collapsed
     * segment that `Line2NodeMaterial` would have to normalize a zero
     * direction for.
     */
    index: number;
};

/**
 * Draws a set of independent line segments.
 *
 * A pure drawing primitive that knows about points, nothing else. It does not
 * watch the scene, does not care what the lines mean, and never decides when
 * they should change — a caller places lines and removes them. What keeps the
 * lines in sync with something else is that caller's job.
 *
 * All lines share **one** `LineSegments2`, so the whole set costs a single draw
 * call no matter how many there are. Each visible line is one instance in a
 * shared buffer, packed without gaps, so moving one rewrites only its instance
 * and hiding or removing one moves the last instance into its place. Lines are drawn as screen-space quads, so they can be
 * wider than the one pixel WebGPU draws plain lines at, see {@link setLineWidth}.
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

    /**
     * The visible lines' bounds in the owner's space, like
     * `BufferGeometry.boundingBox`, `null` until {@link computeBoundingBox} is
     * called, and not kept up to date after that.
     */
    public boundingBox: Box3 | null = null;

    private _lines: LineSegments2;
    private _geometry: LineSegmentsGeometry;
    private _material: Line2NodeMaterial;

    // start and end of every drawn line, six floats per instance
    private _positions!: InstancedInterleavedBuffer;
    // where each drawn line's start and end sit along the dash pattern
    private _distances!: InstancedInterleavedBuffer;

    // every line by the key it was placed under, hidden ones included
    private _byKey: Map<DIVELineKey, DIVELine> = new Map();
    // the visible lines in instance order, always as long as instanceCount
    private _drawn: DIVELine[] = [];

    private _capacity: number = INITIAL_CAPACITY;

    constructor() {
        super();

        this.name = 'MultiLineComponent';

        // solid until a gap is set, see setDashPattern
        this._material = new Line2NodeMaterial({
            color: 0x666666,
            linewidth: 1,
            dashed: false,
            dashSize: 1,
            gapSize: 0,
        });

        this._geometry = new LineSegmentsGeometry();
        this._setBuffers(
            this._createBuffer(FLOATS_PER_LINE),
            this._createBuffer(DISTANCES_PER_LINE),
        );
        this._geometry.instanceCount = 0;

        this._lines = new LineSegments2(this._geometry, this._material);
        this._lines.layers.mask = HELPER_LAYER_MASK;
        this._lines.frustumCulled = false;
        this.contribute(this._lines);
    }

    /** The single object all lines are drawn by. */
    public get lines(): LineSegments2 {
        return this._lines;
    }

    /** How wide the lines are drawn, in screen pixels. */
    public get lineWidth(): number {
        return this._material.linewidth;
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
            if (existing.index !== -1) this._writeLine(existing);
            return;
        }

        const line: DIVELine = {
            start: new Vector3(start.x, start.y, start.z),
            end: new Vector3(end.x, end.y, end.z),
            index: -1,
        };
        this._byKey.set(key, line);
        this._draw(line);
    }

    /**
     * Removes the line for a key. Does nothing if there is no such line.
     *
     * @param key - Whatever the caller identifies this line by.
     */
    public removeLineFor(key: DIVELineKey): void {
        const line = this._byKey.get(key);
        if (!line) return;

        this._byKey.delete(key);
        this._undraw(line);
    }

    /** Whether a line is currently drawn for this key. */
    public hasLineFor(key: DIVELineKey): boolean {
        return this._byKey.has(key);
    }

    /**
     * Shows or hides a single line.
     *
     * A hidden line keeps its key and endpoints but has no instance, so it is
     * not drawn at all. Hiding or showing one rewrites at most one instance.
     *
     * @param key - Whatever the caller identifies this line by.
     * @param visible - Whether it should be drawn.
     */
    public setLineVisibleFor(key: DIVELineKey, visible: boolean): void {
        const line = this._byKey.get(key);
        if (!line) return;

        if (visible) this._draw(line);
        else this._undraw(line);
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
     * Sets the dash pattern. Lines are solid by default, i.e. without a gap.
     *
     * Each line starts the pattern afresh at its own start. Sizes are in the
     * owner's units, so dashes stay the same length along a line at any width.
     *
     * @param dashSize - Length of a drawn stretch.
     * @param gapSize - Length of a gap.
     */
    public setDashPattern(dashSize: number, gapSize: number): void {
        this._material.dashSize = dashSize;
        this._material.gapSize = gapSize;

        /**
         * without a gap nothing is cut, so the solid variant is drawn, which
         * also gives wide lines round caps
         */
        this._material.dashed = gapSize > 0;
    }

    /**
     * Sets how wide the lines are drawn, in screen pixels, so a line keeps its
     * width on screen however far away it is. One pixel by default.
     *
     * @param width - The width in pixels.
     */
    public setLineWidth(width: number): void {
        this._material.linewidth = width;
    }

    /**
     * Computes {@link boundingBox} from the visible lines.
     *
     * From the lines, not the buffer, whose instances past `instanceCount`
     * hold stale data. Empty when no line is visible.
     */
    public computeBoundingBox(): void {
        if (this.boundingBox === null) this.boundingBox = new Box3();

        const box = this.boundingBox.makeEmpty();
        this._drawn.forEach((line) => {
            box.expandByPoint(line.start).expandByPoint(line.end);
        });
    }

    /**
     * Removes every line.
     *
     * Deliberately not called `clear`, since `Object3D.clear()` removes
     * children, and overriding it with a different meaning would be a trap.
     */
    public clearLines(): void {
        this._byKey.clear();
        this._drawn = [];
        this._geometry.instanceCount = 0;
    }

    /**
     * Takes on how the lines look, never which lines there are.
     *
     * A key is whatever the caller identifies a line by, usually one of its own
     * objects -- copying the set would leave the clone drawing lines to the
     * source's members. Placing lines is the caller's job here as everywhere.
     *
     * @param source - The component to copy from.
     */
    public copy(source: this): this {
        super.copy(source);

        this.setColor(source._material.color);
        this.setDashPattern(
            source._material.dashSize,
            source._material.gapSize,
        );
        this.setLineWidth(source.lineWidth);
        this.setVisible(source._lines.visible);

        return this;
    }

    public dispose(): void {
        this._geometry.dispose();
        this._material.dispose();
        this._byKey.clear();
        this._drawn = [];
    }

    private _createBuffer(stride: number): InstancedInterleavedBuffer {
        const buffer = new InstancedInterleavedBuffer(
            new Float32Array(this._capacity * stride),
            stride,
            1,
        );
        buffer.setUsage(DynamicDrawUsage);
        return buffer;
    }

    /**
     * Puts the buffers under the attribute names `Line2NodeMaterial` reads.
     *
     * The distances are written per line by {@link _writeLine}, never through
     * `LineSegments2.computeLineDistances()`, which accumulates across lines.
     */
    private _setBuffers(
        positions: InstancedInterleavedBuffer,
        distances: InstancedInterleavedBuffer,
    ): void {
        this._positions = positions;
        this._distances = distances;

        const geometry = this._geometry;
        geometry.setAttribute(
            'instanceStart',
            new InterleavedBufferAttribute(positions, 3, 0),
        );
        geometry.setAttribute(
            'instanceEnd',
            new InterleavedBufferAttribute(positions, 3, 3),
        );
        geometry.setAttribute(
            'instanceDistanceStart',
            new InterleavedBufferAttribute(distances, 1, 0),
        );
        geometry.setAttribute(
            'instanceDistanceEnd',
            new InterleavedBufferAttribute(distances, 1, 1),
        );
    }

    /** Gives a hidden line the next instance. Does nothing if it is drawn. */
    private _draw(line: DIVELine): void {
        if (line.index !== -1) return;

        if (this._drawn.length >= this._capacity) this._grow();

        line.index = this._drawn.length;
        this._drawn.push(line);
        this._geometry.instanceCount = this._drawn.length;

        this._writeLine(line);
    }

    /**
     * Takes a line's instance away and moves the last drawn line into it, so
     * the drawn instances stay packed. Does nothing if it is hidden.
     */
    private _undraw(line: DIVELine): void {
        if (line.index === -1) return;

        const last = this._drawn.pop()!;
        if (last !== line) {
            last.index = line.index;
            this._drawn[last.index] = last;
            this._writeLine(last);
        }

        line.index = -1;
        this._geometry.instanceCount = this._drawn.length;
    }

    /** Writes a drawn line's endpoints and distances into its instance. */
    private _writeLine(line: DIVELine): void {
        const { index, start, end } = line;

        const offset = index * FLOATS_PER_LINE;
        const positions = this._positions.array as Float32Array;
        positions[offset] = start.x;
        positions[offset + 1] = start.y;
        positions[offset + 2] = start.z;
        positions[offset + 3] = end.x;
        positions[offset + 4] = end.y;
        positions[offset + 5] = end.z;

        /**
         * each line restarts the dash pattern at 0, while computeLineDistances()
         * accumulates across lines and lets a short line vanish inside a gap
         */
        const distances = this._distances.array as Float32Array;
        const distanceOffset = index * DISTANCES_PER_LINE;
        distances[distanceOffset] = 0;
        distances[distanceOffset + 1] = _delta.subVectors(end, start).length();

        // upload just this instance's range instead of the whole buffer
        this._positions.addUpdateRange(offset, FLOATS_PER_LINE);
        this._positions.needsUpdate = true;
        this._distances.addUpdateRange(distanceOffset, DISTANCES_PER_LINE);
        this._distances.needsUpdate = true;
    }

    private _grow(): void {
        this._capacity *= 2;

        const positions = this._createBuffer(FLOATS_PER_LINE);
        (positions.array as Float32Array).set(
            this._positions.array as Float32Array,
        );

        const distances = this._createBuffer(DISTANCES_PER_LINE);
        (distances.array as Float32Array).set(
            this._distances.array as Float32Array,
        );

        this._setBuffers(positions, distances);
    }
}
