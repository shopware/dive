import { describe, expect, it, vi } from 'vitest';
import { DoubleSide, Vector3, type Texture } from 'three/webgpu';
import { ImageComponent } from '../ImageComponent.ts';
import { SpriteComponent } from '../../sprite/SpriteComponent.ts';
import { MeshColliderComponent } from '../../collider/MeshColliderComponent.ts';
import { imageResourceCache } from '../../../engine/resource/image/ImageResource.ts';
import { DIVENode } from '../../../engine/node/Node.ts';
import { DIVERaycaster } from '../../../engine/raycaster/Raycaster.ts';
import { BoundingBox } from '../../../engine/boundingbox/BoundingBox.ts';
import { DIVECameraComponent } from '../../camera/CameraComponent.ts';
import { contributesToBounds } from '../../../helpers/contributesToBounds/contributesToBounds.ts';
import { PRODUCT_LAYER_MASK } from '../../../constants/VisibilityLayerMask.ts';

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

vi.mock('../../../engine/resource/image/loadImage.ts', () => ({
    loadImage: images.load,
}));

/** every image component a test made, disposed after it so the shared cache empties once trimmed */
const made: (ImageComponent | SpriteComponent)[] = [];

function track<T extends ImageComponent | SpriteComponent>(component: T): T {
    made.push(component);
    return component;
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

/** casts along -Z from in front of the plane and returns the hits */
function pick(node: DIVENode, x: number, y: number) {
    node.updateMatrixWorld(true);
    const raycaster = new DIVERaycaster(
        new Vector3(x, y, 5),
        new Vector3(0, 0, -1),
    );
    raycaster.layers.mask = PRODUCT_LAYER_MASK;
    return raycaster.intersectObject(node);
}

afterEach(async () => {
    made.splice(0).forEach((component) => component.dispose());
    images.loads.splice(0).forEach((load) => load.resolve());
    await Promise.resolve();
    imageResourceCache.trim();
    images.load.mockClear();
});

describe('dive/image/ImageComponent', () => {
    it('should start as a white, opaque, one metre square without an image', () => {
        const image = track(new ImageComponent());

        expect(image.image).toBeNull();
        expect(image.color.getHex()).toBe(0xffffff);
        expect(image.opacity).toBe(1);
        expect([image.width, image.height]).toEqual([1, 1]);
        expect(new BoundingBox().enclose(image.mesh).size.toArray()).toEqual([
            1, 1, 0,
        ]);
    });

    it('should contribute a double-sided plane centred in the owner XY plane, facing +Z', () => {
        const node = new DIVENode();
        const image = track(node.addComponent(new ImageComponent()));
        node.position.set(2, 0, 0);
        node.updateMatrixWorld(true);

        expect(image.mesh.parent).toBe(node);
        expect(image.mesh.material.side).toBe(DoubleSide);
        const box = new BoundingBox().enclose(node);
        expect(box.center.toArray()).toEqual([2, 0, 0]);
        expect(box.size.toArray()).toEqual([1, 1, 0]);
        const normal = image.mesh.geometry.getAttribute('normal');
        expect([normal.getX(0), normal.getY(0), normal.getZ(0)]).toEqual([
            0, 0, 1,
        ]);
    });

    it('should count as content: live view, bounds and exports', () => {
        const node = new DIVENode();
        const image = track(node.addComponent(new ImageComponent()));

        expect(image.mesh.layers.mask).toBe(PRODUCT_LAYER_MASK);
        expect(
            image.mesh.layers.mask & DIVECameraComponent.LIVE_VIEW_LAYER_MASK,
        ).not.toBe(0);
        // the exporter keeps exactly what counts for bounds
        expect(contributesToBounds(image.mesh)).toBe(true);
        expect(new BoundingBox().enclose(node).isEmpty).toBe(false);
    });

    it('should keep its orientation instead of turning towards the camera', () => {
        const node = new DIVENode();
        track(node.addComponent(new ImageComponent()));
        node.rotation.y = Math.PI / 2;
        node.updateMatrixWorld(true);

        const size = new BoundingBox().enclose(node).size;
        expect(size.x).toBeCloseTo(0);
        expect(size.z).toBeCloseTo(1);
    });

    it('should be as wide and high as set, in metres', () => {
        const node = new DIVENode();
        const image = track(
            node.addComponent(new ImageComponent()).setSize(0.3, 0.5),
        );
        node.updateMatrixWorld(true);

        expect([image.width, image.height]).toEqual([0.3, 0.5]);
        const size = new BoundingBox().enclose(node).size;
        expect(size.x).toBeCloseTo(0.3);
        expect(size.y).toBeCloseTo(0.5);
    });

    it('should tint and fade the image with its colour and opacity', () => {
        const image = track(
            new ImageComponent().setColor('#ff8000').setOpacity(0.25),
        );

        expect(image.mesh.material.color.getHexString()).toBe('ff8000');
        expect(image.mesh.material.opacity).toBe(0.25);
        expect(image.mesh.material.transparent).toBe(true);
    });

    it('should add no collider and be picked through a mesh collider on its node', () => {
        const node = new DIVENode();
        track(node.addComponent(new ImageComponent()).setSize(2, 1));

        expect(node.components).toHaveLength(1);
        expect(pick(node, 0.9, 0)).toHaveLength(0);

        node.addComponent(new MeshColliderComponent());

        const hits = pick(node, 0.9, 0.4);
        expect(hits).toHaveLength(1);
        expect(hits[0].object).toBe(node);
        expect(hits[0].point.z).toBeCloseTo(0);
        expect(pick(node, 1.1, 0)).toHaveLength(0);
    });

    it('should show the image of a url once setImage resolves', async () => {
        const image = track(new ImageComponent());

        const done = image.setImage('poster.png');
        expect(image.image).toBe('poster.png');
        expect(image.mesh.material.map).toBeNull();

        const texture = await arrive('poster.png');

        await expect(done).resolves.toBe(image);
        expect(image.mesh.material.map).toBe(texture);
    });

    it('should share one texture with a sprite showing the same url', async () => {
        const image = track(new ImageComponent());
        const sprite = track(new SpriteComponent());

        const done = Promise.all([
            image.setImage('poster.png'),
            sprite.setImage('poster.png'),
        ]);
        const texture = await arrive('poster.png');
        await done;

        expect(images.load).toHaveBeenCalledTimes(1);
        expect(image.mesh.material.map).toBe(texture);
        expect(sprite.sprite.material.map).toBe(texture);
    });

    it('should copy image, colour, opacity and size into a fresh plane', async () => {
        const source = track(
            new ImageComponent()
                .setColor('#00ff00')
                .setOpacity(0.5)
                .setSize(0.2, 0.4),
        );
        const done = source.setImage('poster.png');
        const texture = await arrive('poster.png');
        await done;

        const copy = track(source.clone());

        expect(copy.image).toBe('poster.png');
        expect(copy.color.getHexString()).toBe('00ff00');
        expect(copy.opacity).toBe(0.5);
        expect([copy.width, copy.height]).toEqual([0.2, 0.4]);
        expect(copy.mesh).not.toBe(source.mesh);
        expect(copy.mesh.layers.mask).toBe(PRODUCT_LAYER_MASK);
        expect(new BoundingBox().enclose(copy.mesh).size.x).toBeCloseTo(0.2);

        await copy.setImage(copy.image);
        expect(copy.mesh.material.map).toBe(texture);
        expect(images.load).toHaveBeenCalledTimes(1);
    });

    it('should free its geometry and material and give back its image on dispose', async () => {
        const image = new ImageComponent();
        const done = image.setImage('poster.png');
        const texture = await arrive('poster.png');
        await done;
        const materialSpy = vi.spyOn(image.mesh.material, 'dispose');
        const geometrySpy = vi.spyOn(image.mesh.geometry, 'dispose');

        image.dispose();
        imageResourceCache.trim();

        expect(materialSpy).toHaveBeenCalled();
        expect(geometrySpy).toHaveBeenCalled();
        expect(texture.dispose).toHaveBeenCalled();
    });
});
