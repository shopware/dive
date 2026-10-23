import { describe, expect, it, vi } from 'vitest';
import { type Mesh, SphereGeometry, Texture, Vector3 } from 'three/webgpu';
import {
    DIVEGroundProjectionDefaultSettings,
    GroundProjectionComponent,
} from '../GroundProjectionComponent.ts';
import { textureResourceCache } from '../../../engine/resource/texture/TextureResource.ts';
import { DIVENode } from '../../../engine/node/Node.ts';
import { computeProductBounds } from '../../../helpers/computeProductBounds/computeProductBounds.ts';
import {
    BACKGROUND_LAYER_MASK,
    PRODUCT_LAYER_MASK,
} from '../../../constants/VisibilityLayerMask.ts';

/** the image loader, its loads resolved when the test says so */
const images = vi.hoisted(() => {
    const loads: {
        url: string;
        texture: import('three/webgpu').Texture;
        resolve: () => void;
        reject: (error: Error) => void;
    }[] = [];
    const load = vi.fn(async (url: string) => {
        const { Texture } = await import('three/webgpu');
        const texture = new Texture();
        texture.name = url;
        vi.spyOn(texture, 'dispose');

        return new Promise<import('three/webgpu').Texture>(
            (resolve, reject) => {
                loads.push({
                    url,
                    texture,
                    resolve: () => resolve(texture),
                    reject,
                });
            },
        );
    });
    return { load, loads };
});

vi.mock('../../../engine/resource/texture/loadEquirectangularImage.ts', () => ({
    loadEquirectangularImage: images.load,
}));

/** every component a test made, disposed after it so the shared cache empties once trimmed */
const made: GroundProjectionComponent[] = [];

function track(projection = new GroundProjectionComponent()) {
    made.push(projection);
    return projection;
}

/** resolves the load of a url once it has started */
async function arrive(url: string): Promise<Texture> {
    await vi.waitFor(() => {
        if (!images.loads.some((load) => load.url === url)) {
            throw new Error(`no load of ${url}`);
        }
    });
    const load = images.loads.find((load) => load.url === url)!;
    images.loads.splice(images.loads.indexOf(load), 1);
    load.resolve();
    return load.texture;
}

afterEach(async () => {
    made.splice(0).forEach((projection) => projection.dispose());
    images.loads.splice(0).forEach((load) => load.resolve());
    await Promise.resolve();
    textureResourceCache.trim();
    images.load.mockClear();
});

/** what three does right before it draws the dome */
const render = (projection: GroundProjectionComponent): void =>
    projection.mesh.onBeforeRender(
        ...([] as unknown as Parameters<Mesh['onBeforeRender']>),
    );

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
        expect(projection.image).toBeNull();
        expect(projection.mesh.material.map).toBeNull();
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

    it('should show the image of a url on the dome once it has loaded', async () => {
        const projection = track();
        const version = projection.mesh.material.version;

        const done = projection.setImage('studio.hdr');
        expect(projection.image).toBe('studio.hdr');
        expect(projection.mesh.material.map).toBeNull();

        const texture = await arrive('studio.hdr');
        await expect(done).resolves.toBe(projection);
        expect(projection.mesh.material.map).toBeNull();

        render(projection);
        expect(projection.mesh.material.map).toBe(texture);
        expect(projection.mesh.material.version).toBe(version + 1);
    });

    it('should touch the material only when the image changed', async () => {
        const projection = track();
        const done = projection.setImage('studio.hdr');
        await arrive('studio.hdr');
        await done;
        render(projection);
        const version = projection.mesh.material.version;

        render(projection);

        expect(projection.mesh.material.version).toBe(version);
    });

    it('should keep the previous image until the newest call has loaded', async () => {
        const projection = track();
        const first = projection.setImage('a.hdr');
        const a = await arrive('a.hdr');
        await first;

        const overtaken = projection.setImage('b.hdr');
        const newest = projection.setImage('c.hdr');
        expect(projection.image).toBe('c.hdr');

        const b = await arrive('b.hdr');
        await overtaken;
        render(projection);
        expect(projection.mesh.material.map).toBe(a);

        const c = await arrive('c.hdr');
        await newest;
        render(projection);
        expect(projection.mesh.material.map).toBe(c);
        textureResourceCache.trim();
        expect(b.dispose).toHaveBeenCalled();
        expect(a.dispose).toHaveBeenCalled();
    });

    it('should turn white again for null and give back the image', async () => {
        const projection = track();
        const done = projection.setImage('studio.hdr');
        const texture = await arrive('studio.hdr');
        await done;

        render(projection);
        await projection.setImage(null);
        render(projection);

        expect(projection.image).toBeNull();
        expect(projection.mesh.material.map).toBeNull();
        textureResourceCache.trim();
        expect(texture.dispose).toHaveBeenCalled();
    });

    it('should load an image once and share its texture between every dome that shows it', async () => {
        const one = track();
        const other = track();

        const done = Promise.all([
            one.setImage('studio.hdr'),
            other.setImage('studio.hdr'),
        ]);
        const texture = await arrive('studio.hdr');
        await done;
        render(one);
        render(other);

        expect(images.load).toHaveBeenCalledTimes(1);
        expect(one.mesh.material.map).toBe(texture);
        expect(other.mesh.material.map).toBe(texture);
    });

    it('should reject when the image fails to load and keep the dome as it was', async () => {
        const projection = track();
        const done = projection.setImage('missing.hdr');
        await vi.waitFor(() => expect(images.loads).toHaveLength(1));

        images.loads.pop()!.reject(new Error('404'));

        await expect(done).rejects.toThrow('404');
        render(projection);
        expect(projection.mesh.material.map).toBeNull();
    });

    it('should toggle visibility on the dome', () => {
        const projection = new GroundProjectionComponent().setVisibility(false);

        expect(projection.mesh.visible).toBe(false);
        expect(projection.visible).toBe(false);
    });

    it('should free the dome and give back its image', async () => {
        const projection = new GroundProjectionComponent();
        const done = projection.setImage('studio.hdr');
        const texture = await arrive('studio.hdr');
        await done;

        const geometrySpy = vi.spyOn(projection.mesh.geometry, 'dispose');
        const materialSpy = vi.spyOn(projection.mesh.material, 'dispose');

        projection.dispose();

        expect(geometrySpy).toHaveBeenCalled();
        expect(materialSpy).toHaveBeenCalled();
        textureResourceCache.trim();
        expect(texture.dispose).toHaveBeenCalled();
    });

    it('should copy shape, image and visibility into a fresh dome', async () => {
        const source = track()
            .applySettings({ height: 2, radius: 25 })
            .setVisibility(false);
        const done = source.setImage('studio.hdr');
        const texture = await arrive('studio.hdr');
        await done;

        const clone = track(source.clone());

        expect(clone).not.toBe(source);
        expect(clone.mesh).not.toBe(source.mesh);
        expect(clone.height).toBe(2);
        expect(clone.radius).toBe(25);
        expect(clone.visible).toBe(false);
        expect(clone.image).toBe('studio.hdr');

        // requested again, and shared with the source
        await clone.setImage(clone.image);
        render(clone);
        expect(clone.mesh.material.map).toBe(texture);
        expect(images.load).toHaveBeenCalledTimes(1);
    });
});
