import {
    BufferGeometry,
    Float32BufferAttribute,
    LineBasicMaterial,
    LineSegments,
    Vector3,
    type Object3D,
} from 'three/webgpu';
import {
    HELPER_LAYER_MASK,
    PRODUCT_LAYER_MASK,
    PROXY_LAYER_MASK,
} from '../../constants/VisibilityLayerMask.ts';
import { DIVEComponent } from '../component/Component.ts';
import { type ColliderComponent } from './ColliderComponent.ts';
import { traverseColliders } from './traverseColliders.ts';

const _point = new Vector3();

/** product colliders */
const PRODUCT_COLOR = 0x00ff00;

/** proxy colliders */
const PROXY_COLOR = 0xff8800;

/** one category of colliders, drawn in one colour */
class ColliderLines {
    public readonly lines: LineSegments;

    /** the outline being collected this frame, in owner space, then world */
    public readonly coordinates: number[] = [];

    constructor(color: number) {
        this.lines = new LineSegments(
            new BufferGeometry(),
            // drawn through what it outlines
            new LineBasicMaterial({ color, depthTest: false }),
        );
        this.lines.name = 'ColliderLines';
        this.lines.layers.mask = HELPER_LAYER_MASK;
        // world coordinates, rebuilt every frame
        this.lines.matrixAutoUpdate = false;
        this.lines.frustumCulled = false;
    }

    /** puts this frame's coordinates on the GPU, growing the buffer if needed */
    public upload(): void {
        const count = this.coordinates.length / 3;
        let geometry = this.lines.geometry;
        let position = geometry.getAttribute('position') as
            Float32BufferAttribute | undefined;

        if (!position || position.count < count) {
            // a new buffer, since one cannot grow in place
            geometry.dispose();
            geometry = new BufferGeometry();
            position = new Float32BufferAttribute(
                new Float32Array(Math.max(count, 1) * 2 * 3),
                3,
            );
            geometry.setAttribute('position', position);
            this.lines.geometry = geometry;
        }

        (position.array as Float32Array).set(this.coordinates);
        position.needsUpdate = true;
        geometry.setDrawRange(0, count);

        this.coordinates.length = 0;
    }

    public dispose(): void {
        this.lines.geometry.dispose();
        (this.lines.material as LineBasicMaterial).dispose();
    }
}

/**
 * The collider debug view: draws every collider the collider raycaster would
 * test below `target`, product colliders green and proxy colliders orange.
 *
 * Rebuilt every frame while visible, so it follows moves, loads and
 * visibility; it does not tick while hidden. It only transforms and draws
 * what each collider outlines, so it knows no collider types. On the helper
 * layer, so the live view does not show it.
 *
 * @internal
 */
export class ColliderHelpers extends DIVEComponent {
    private _product = new ColliderLines(PRODUCT_COLOR);
    private _proxy = new ColliderLines(PROXY_COLOR);

    constructor(private readonly _target: Object3D) {
        super();

        this.name = 'ColliderHelpers';
        this.contribute(this._product.lines, this._proxy.lines);
        this.setVisible(false);
    }

    public get visible(): boolean {
        return this._product.lines.visible;
    }

    public setVisible(visible: boolean): this {
        this._product.lines.visible = visible;
        this._proxy.lines.visible = visible;
        this.setTickEnabled(visible);

        return this;
    }

    public tick(): void {
        traverseColliders(this._target, (collider) => {
            const lines = this._linesFor(collider);
            if (!lines) return;

            collider.owner.updateWorldMatrix(true, true);

            const from = lines.coordinates.length;
            collider.outline(lines.coordinates);
            this._toWorld(lines.coordinates, from, collider);
        });

        this._product.upload();
        this._proxy.upload();
    }

    public dispose(): void {
        this._product.dispose();
        this._proxy.dispose();
    }

    /** the category a collider is drawn in, if any */
    private _linesFor(collider: ColliderComponent): ColliderLines | null {
        const mask = collider.layers.mask;
        if (mask & PROXY_LAYER_MASK) return this._proxy;
        if (mask & PRODUCT_LAYER_MASK) return this._product;

        return null;
    }

    private _toWorld(
        coordinates: number[],
        from: number,
        collider: ColliderComponent,
    ): void {
        const matrix = collider.owner.matrixWorld;
        for (let i = from; i < coordinates.length; i += 3) {
            _point
                .fromArray(coordinates, i)
                .applyMatrix4(matrix)
                .toArray(coordinates, i);
        }
    }
}
