import { describe, expect, it, vi } from 'vitest';
import { SphereGeometry, Texture, Vector3 } from 'three/webgpu';
import {
    DIVEGroundProjectionDefaultSettings,
    GroundProjectionComponent,
} from '../GroundProjectionComponent.ts';
import { DIVENode } from '../../../engine/node/Node.ts';
import { computeProductBounds } from '../../../helpers/computeProductBounds/computeProductBounds.ts';
import {
    BACKGROUND_LAYER_MASK,
    PRODUCT_LAYER_MASK,
} from '../../../constants/VisibilityLayerMask.ts';

/** world positions of every vertex, with the mesh's offset applied */
const verticesOf = (projection: GroundProjectionComponent): Vector3[] => {
    const position = projection.mesh.geometry.getAttribute('position');

    return Array.from({ length: position.count }, (_, i) =>
        new Vector3()
            .fromBufferAttribute(position, i)
            .add(projection.mesh.position),
    );
};

describe('dive/groundprojection/GroundProjectionComponent', () => {
    it('should start with the default settings', () => {
        const projection = new GroundProjectionComponent();

        expect(projection.height).toBe(
            DIVEGroundProjectionDefaultSettings.height,
        );
        expect(projection.radius).toBe(
            DIVEGroundProjectionDefaultSettings.radius,
        );
        expect(projection.map).toBeNull();
        expect(projection.visible).toBe(true);
    });

    it('should contribute the dome to its owner', () => {
        const node = new DIVENode();
        const projection = node.addComponent(new GroundProjectionComponent());

        expect(projection.mesh.parent).toBe(node);
    });

    it('should sit on the background layer, out of product bounds', () => {
        const node = new DIVENode();
        const projection = node.addComponent(new GroundProjectionComponent());

        expect(projection.mesh.layers.mask).toBe(BACKGROUND_LAYER_MASK);
        expect(projection.mesh.layers.mask & PRODUCT_LAYER_MASK).toBe(0);
        expect(computeProductBounds(node).isEmpty()).toBe(true);
    });

    it('should write no depth, so what lies on its floor stays visible', () => {
        const projection = new GroundProjectionComponent();

        expect(projection.mesh.material.depthWrite).toBe(false);
    });

    it('should put the floor at the origin and nothing below it', () => {
        const projection = new GroundProjectionComponent().applySettings({
            height: 2,
            radius: 30,
        });

        const lowest = Math.min(...verticesOf(projection).map((v) => v.y));
        expect(lowest).toBeCloseTo(0);
    });

    it('should keep the upper half a hemisphere of the radius', () => {
        const projection = new GroundProjectionComponent().applySettings({
            height: 2,
            radius: 30,
        });
        const center = projection.mesh.position;

        verticesOf(projection)
            .filter((v) => v.y >= center.y)
            .forEach((v) => {
                expect(v.distanceTo(center)).toBeCloseTo(30);
            });
    });

    it('should keep each direction of the sphere, mirrored along Z', () => {
        /**
         * a vertex only moves along its own ray, which keeps the image reading
         * as seen from where it was taken; the mirror matches the sky the
         * renderer captures the image based light from
         */
        const projection = new GroundProjectionComponent();
        const sphere = new SphereGeometry(1, 256, 128).getAttribute('position');

        verticesOf(projection).forEach((v, i) => {
            const direction = v.sub(projection.mesh.position).normalize();
            const expected = new Vector3()
                .fromBufferAttribute(sphere, i)
                .multiply(new Vector3(1, 1, -1));

            expect(direction.distanceTo(expected)).toBeCloseTo(0);
        });
    });

    it('should rebuild the dome only when the shape changes', () => {
        const projection = new GroundProjectionComponent();
        const geometry = projection.mesh.geometry;
        const disposeSpy = vi.spyOn(geometry, 'dispose');

        projection.applySettings({ ...DIVEGroundProjectionDefaultSettings });
        expect(projection.mesh.geometry).toBe(geometry);

        projection.setHeight(3).setRadius(40);

        expect(disposeSpy).toHaveBeenCalledTimes(1);
        expect(projection.height).toBe(3);
        expect(projection.radius).toBe(40);
        expect(projection.mesh.position.y).toBe(3);
    });

    it('should refuse a shape that is not positive', () => {
        const projection = new GroundProjectionComponent();

        expect(() => projection.setHeight(0)).toThrow();
        expect(() => projection.setRadius(-1)).toThrow();
        expect(() => projection.setHeight(NaN)).toThrow();
        expect(projection.height).toBe(
            DIVEGroundProjectionDefaultSettings.height,
        );
    });

    it('should mark the material for recompilation when the image changes', () => {
        const projection = new GroundProjectionComponent();
        const map = new Texture();
        const version = projection.mesh.material.version;

        projection.setMap(map);
        expect(projection.map).toBe(map);
        expect(projection.mesh.material.version).toBe(version + 1);

        projection.setMap(map);
        expect(projection.mesh.material.version).toBe(version + 1);
    });

    it('should toggle visibility on the dome', () => {
        const projection = new GroundProjectionComponent().setVisibility(false);

        expect(projection.mesh.visible).toBe(false);
        expect(projection.visible).toBe(false);
    });

    it('should free the dome but leave the borrowed image alone', () => {
        const projection = new GroundProjectionComponent();
        const map = new Texture();
        projection.setMap(map);

        const geometrySpy = vi.spyOn(projection.mesh.geometry, 'dispose');
        const materialSpy = vi.spyOn(projection.mesh.material, 'dispose');
        const mapSpy = vi.spyOn(map, 'dispose');

        projection.dispose();

        expect(geometrySpy).toHaveBeenCalled();
        expect(materialSpy).toHaveBeenCalled();
        expect(mapSpy).not.toHaveBeenCalled();
    });

    it('should copy shape, image and visibility into a fresh dome', () => {
        const map = new Texture();
        const source = new GroundProjectionComponent()
            .applySettings({ height: 2, radius: 25 })
            .setMap(map)
            .setVisibility(false);

        const clone = source.clone();

        expect(clone).not.toBe(source);
        expect(clone.mesh).not.toBe(source.mesh);
        expect(clone.height).toBe(2);
        expect(clone.radius).toBe(25);
        expect(clone.map).toBe(map);
        expect(clone.visible).toBe(false);
    });
});
