import {
    BoxGeometry,
    BufferGeometry,
    LineBasicMaterial,
    LineSegments,
    Mesh,
    MeshStandardMaterial,
    Object3D,
    Points,
    PointsMaterial,
} from 'three/webgpu';
import { AssetExporter } from '../AssetExporter.ts';
import {
    FLOOR_LAYER_MASK,
    HELPER_LAYER_MASK,
    PRODUCT_LAYER_MASK,
    UI_LAYER_MASK,
} from '../../../../constants/VisibilityLayerMask.ts';

/** Captures what the exporter was handed, and what was visible at that moment. */
const parseAsync = vi.fn();

vi.mock('three/examples/jsm/exporters/GLTFExporter.js', () => ({
    GLTFExporter: vi.fn(function (this: Record<string, unknown>) {
        this.parseAsync = parseAsync;
        return this;
    }),
}));

vi.mock('three/examples/jsm/exporters/USDZExporter.js', () => ({
    USDZExporter: vi.fn(function (this: Record<string, unknown>) {
        this.parseAsync = vi.fn(async () => new Uint8Array());
        return this;
    }),
}));

const createMesh = (name: string, layerMask: number): Mesh => {
    const mesh = new Mesh(new BoxGeometry(), new MeshStandardMaterial());
    mesh.name = name;
    mesh.layers.mask = layerMask;
    return mesh;
};

describe('plugins/assetexporter/AssetExporter geometry pruning', () => {
    let root: Object3D;
    let product: Mesh;
    let floor: Mesh;
    let handle: Mesh;
    let helper: Mesh;

    /** Which meshes were visible when the exporter ran. */
    let visibleDuringExport: string[];

    beforeEach(() => {
        visibleDuringExport = [];
        parseAsync.mockImplementation(async (object: Object3D) => {
            object.traverse((child) => {
                // anything drawable, not just meshes -- lines and points end up
                // in a file just the same
                const drawable = 'geometry' in child;
                if (drawable && child.visible) {
                    visibleDuringExport.push(child.name);
                }
            });
            return new ArrayBuffer(8);
        });

        root = new Object3D();
        product = createMesh('product', PRODUCT_LAYER_MASK);
        floor = createMesh('floor', FLOOR_LAYER_MASK);
        handle = createMesh('handle', UI_LAYER_MASK);
        helper = createMesh('helper', HELPER_LAYER_MASK);
        root.add(product, floor, handle, helper);
    });

    it('should keep non-product lines out of the file', async () => {
        // a group's link lines and a bounding box helper are LineSegments, not
        // meshes, so a mesh-only filter left them exportable
        const lines = new LineSegments(
            new BufferGeometry(),
            new LineBasicMaterial(),
        );
        lines.name = 'link-lines';
        lines.layers.mask = HELPER_LAYER_MASK;
        root.add(lines);

        await new AssetExporter().export(root, 'glb');

        expect(visibleDuringExport).not.toContain('link-lines');
    });

    it('should keep non-product points out of the file', async () => {
        const points = new Points(new BufferGeometry(), new PointsMaterial());
        points.name = 'debug-points';
        points.layers.mask = HELPER_LAYER_MASK;
        root.add(points);

        await new AssetExporter().export(root, 'glb');

        expect(visibleDuringExport).not.toContain('debug-points');
    });

    it('should still export product lines', async () => {
        // the layer decides, not the class
        const lines = new LineSegments(
            new BufferGeometry(),
            new LineBasicMaterial(),
        );
        lines.name = 'product-lines';
        lines.layers.mask = PRODUCT_LAYER_MASK;
        root.add(lines);

        await new AssetExporter().export(root, 'glb');

        expect(visibleDuringExport).toContain('product-lines');
    });

    it('should not let a caller switch the filter off', async () => {
        /**
         * the pruning works by hiding, so `onlyVisible: false` would serialize
         * everything it just hid -- the option is not the caller's to pick
         */
        await new AssetExporter().export(root, 'glb', { onlyVisible: false });

        expect(visibleDuringExport).toEqual(['product']);
        expect(parseAsync).toHaveBeenCalledWith(
            root,
            expect.objectContaining({ onlyVisible: true }),
        );
    });

    it('should export product geometry only', async () => {
        await new AssetExporter().export(root, 'glb');

        expect(visibleDuringExport).toEqual(['product']);
    });

    it('should restore visibility afterwards', async () => {
        await new AssetExporter().export(root, 'glb');

        expect(floor.visible).toBe(true);
        expect(handle.visible).toBe(true);
        expect(helper.visible).toBe(true);
    });

    it('should leave already-hidden geometry hidden', async () => {
        product.visible = false;

        await new AssetExporter().export(root, 'glb');

        expect(product.visible).toBe(false);
    });

    it('should restore visibility even when the export fails', async () => {
        parseAsync.mockRejectedValue(new Error('boom'));

        await expect(new AssetExporter().export(root, 'glb')).rejects.toThrow();

        expect(floor.visible).toBe(true);
    });

    it('should keep containers visible so their content survives', async () => {
        // hiding a plain Object3D would take its whole subtree with it
        const wrapper = new Object3D();
        const nested = createMesh('nested', PRODUCT_LAYER_MASK);
        wrapper.add(nested);
        root.add(wrapper);

        await new AssetExporter().export(root, 'glb');

        expect(visibleDuringExport).toContain('nested');
    });
});
