import {
    BoxGeometry,
    Mesh,
    MeshStandardMaterial,
    Object3D,
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
                if (child instanceof Mesh && child.visible) {
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
