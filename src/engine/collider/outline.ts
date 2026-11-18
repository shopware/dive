import { Vector3, type Box3 } from 'three/webgpu';

const _a = new Vector3();
const _b = new Vector3();

/** points per full circle */
const CIRCLE_SEGMENTS = 32;

/**
 * Appends the segment from `start` to `end` to an outline.
 *
 * @internal
 */
export function pushSegment(
    target: number[],
    start: Vector3,
    end: Vector3,
): void {
    target.push(start.x, start.y, start.z, end.x, end.y, end.z);
}

/**
 * Appends the twelve edges of `box` to an outline.
 *
 * @internal
 */
export function pushBox(target: number[], box: Box3): void {
    const { min, max } = box;
    const corner = (i: number, point: Vector3): Vector3 =>
        point.set(
            i & 1 ? max.x : min.x,
            i & 2 ? max.y : min.y,
            i & 4 ? max.z : min.z,
        );

    // corners one bit apart share an edge
    for (let i = 0; i < 8; i++) {
        for (const bit of [1, 2, 4]) {
            if (i & bit) continue;
            pushSegment(target, corner(i, _a), corner(i | bit, _b));
        }
    }
}

/**
 * Appends an arc around `center` in the plane of the unit vectors `u` and
 * `v`, from angle `from` to angle `to`, to an outline.
 *
 * @internal
 */
export function pushArc(
    target: number[],
    center: Vector3,
    u: Vector3,
    v: Vector3,
    radius: number,
    from: number = 0,
    to: number = Math.PI * 2,
): void {
    const segments = Math.max(
        1,
        Math.ceil((CIRCLE_SEGMENTS * Math.abs(to - from)) / (Math.PI * 2)),
    );
    const point = (i: number, target: Vector3): Vector3 => {
        const angle = from + ((to - from) * i) / segments;
        return target
            .copy(center)
            .addScaledVector(u, Math.cos(angle) * radius)
            .addScaledVector(v, Math.sin(angle) * radius);
    };

    for (let i = 0; i < segments; i++) {
        pushSegment(target, point(i, _a), point(i + 1, _b));
    }
}
