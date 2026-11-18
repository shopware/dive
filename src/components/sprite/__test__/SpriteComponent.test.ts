import { describe, expect, it, vi } from 'vitest';
import { type Texture } from 'three/webgpu';
import { SpriteComponent } from '../SpriteComponent.ts';
import { imageResourceCache } from '../../../engine/resource/image/ImageResource.ts';
import { DIVENode } from '../../../engine/node/Node.ts';
import { BoundingBox } from '../../../engine/boundingbox/BoundingBox.ts';
import { DIVECameraComponent } from '../../camera/CameraComponent.ts';
import { contributesToBounds } from '../../../helpers/contributesToBounds/contributesToBounds.ts';
import { HELPER_LAYER_MASK } from '../../../constants/VisibilityLayerMask.ts';

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

/** every sprite a test made, disposed after it so the shared cache empties once trimmed */
const made: SpriteComponent[] = [];

function track(sprite = new SpriteComponent()) {
    made.push(sprite);
    return sprite;
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
    made.splice(0).forEach((sprite) => sprite.dispose());
    images.loads.splice(0).forEach((load) => load.resolve());
    await Promise.resolve();
    imageResourceCache.trim();
    images.load.mockClear();
});

describe('dive/sprite/SpriteComponent', () => {
    it('should start as a white, opaque, one metre square without an image', () => {
        const sprite = new SpriteComponent();

        expect(sprite.image).toBeNull();
        expect(sprite.color.getHex()).toBe(0xffffff);
        expect(sprite.opacity).toBe(1);
        expect(sprite.width).toBe(1);
        expect(sprite.height).toBe(1);
        expect(sprite.sprite.scale.toArray()).toEqual([1, 1, 1]);
    });

    it('should contribute a billboard sized in metres to its owner', () => {
        const node = new DIVENode();
        const sprite = node.addComponent(new SpriteComponent());

        expect(sprite.sprite.parent).toBe(node);
        expect(sprite.sprite.material.sizeAttenuation).toBe(true);
    });

    it('should stay out of the live view, bounds, exports and picking', () => {
        const node = new DIVENode();
        const sprite = node.addComponent(new SpriteComponent());

        expect(sprite.sprite.layers.mask).toBe(HELPER_LAYER_MASK);
        expect(
            sprite.sprite.layers.mask &
                DIVECameraComponent.LIVE_VIEW_LAYER_MASK,
        ).toBe(0);
        expect(contributesToBounds(sprite.sprite)).toBe(false);
        expect(new BoundingBox().enclose(node).isEmpty).toBe(true);
    });

    it('should tint the image with its colour', () => {
        const sprite = new SpriteComponent().setColor('#ff8000');

        expect(sprite.color.getHexString()).toBe('ff8000');
        expect(sprite.sprite.material.color.getHexString()).toBe('ff8000');
    });

    it('should fade with its opacity', () => {
        const sprite = new SpriteComponent().setOpacity(0.25);

        expect(sprite.opacity).toBe(0.25);
        expect(sprite.sprite.material.opacity).toBe(0.25);
        expect(sprite.sprite.material.transparent).toBe(true);
    });

    it('should be as wide and high as set, in metres', () => {
        const sprite = new SpriteComponent().setSize(0.3, 0.5);

        expect(sprite.width).toBe(0.3);
        expect(sprite.height).toBe(0.5);
        expect(sprite.sprite.scale.x).toBe(0.3);
        expect(sprite.sprite.scale.y).toBe(0.5);
    });

    it('should show the image of a url once setImage resolves', async () => {
        const sprite = track();

        const done = sprite.setImage('bulb.svg');
        expect(sprite.image).toBe('bulb.svg');
        expect(sprite.sprite.material.map).toBeNull();

        const texture = await arrive('bulb.svg');

        await expect(done).resolves.toBe(sprite);
        expect(sprite.sprite.material.map).toBe(texture);
    });

    it('should load an image once and share its texture between every sprite that shows it', async () => {
        const one = track();
        const other = track();

        const done = Promise.all([
            one.setImage('bulb.svg'),
            other.setImage('bulb.svg'),
        ]);
        const texture = await arrive('bulb.svg');
        await done;

        expect(images.load).toHaveBeenCalledTimes(1);
        expect(one.sprite.material.map).toBe(texture);
        expect(other.sprite.material.map).toBe(texture);
    });

    it('should keep the previous image until the newest call has loaded', async () => {
        const sprite = track();
        const first = sprite.setImage('a.png');
        const a = await arrive('a.png');
        await first;

        const overtaken = sprite.setImage('b.png');
        const newest = sprite.setImage('c.png');
        expect(sprite.image).toBe('c.png');

        const b = await arrive('b.png');
        await overtaken;
        expect(sprite.sprite.material.map).toBe(a);

        const c = await arrive('c.png');
        await newest;
        expect(sprite.sprite.material.map).toBe(c);
        imageResourceCache.trim();
        expect(b.dispose).toHaveBeenCalled();
        expect(a.dispose).toHaveBeenCalled();
    });

    it('should show no image for null and give back the image', async () => {
        const sprite = track();
        const done = sprite.setImage('bulb.svg');
        const texture = await arrive('bulb.svg');
        await done;

        await sprite.setImage(null);

        expect(sprite.image).toBeNull();
        expect(sprite.sprite.material.map).toBeNull();
        imageResourceCache.trim();
        expect(texture.dispose).toHaveBeenCalled();
    });

    it('should reject when the image fails to load and keep the sprite as it was', async () => {
        const sprite = track();
        const done = sprite.setImage('missing.png');
        await vi.waitFor(() => expect(images.loads).toHaveLength(1));

        images.loads.pop()!.reject(new Error('404'));

        await expect(done).rejects.toThrow('404');
        expect(sprite.sprite.material.map).toBeNull();
    });

    it('should copy image, colour, opacity and size into a fresh sprite', async () => {
        const source = track()
            .setColor('#00ff00')
            .setOpacity(0.5)
            .setSize(0.2, 0.4);
        const done = source.setImage('bulb.svg');
        const texture = await arrive('bulb.svg');
        await done;

        const copy = track(source.clone());

        expect(copy).not.toBe(source);
        expect(copy.image).toBe('bulb.svg');
        expect(copy.color.getHexString()).toBe('00ff00');
        expect(copy.color).not.toBe(source.color);
        expect(copy.opacity).toBe(0.5);
        expect([copy.width, copy.height]).toEqual([0.2, 0.4]);
        expect(copy.sprite).not.toBe(source.sprite);
        expect(copy.sprite.layers.mask).toBe(HELPER_LAYER_MASK);

        await copy.setImage(copy.image);
        expect(copy.sprite.material.map).toBe(texture);
        expect(images.load).toHaveBeenCalledTimes(1);
    });

    it('should report a copied image that fails to load', async () => {
        const errorSpy = vi
            .spyOn(console, 'error')
            .mockImplementation(() => {});
        const source = track();
        source.setImage('missing.png').catch(() => {});

        track(source.clone());
        await vi.waitFor(() => expect(images.loads).toHaveLength(1));
        images.loads.pop()!.reject(new Error('404'));

        await vi.waitFor(() => expect(errorSpy).toHaveBeenCalled());
        errorSpy.mockRestore();
    });

    it('should give back its image on dispose, freeing it with the last sprite', async () => {
        const one = new SpriteComponent();
        const other = new SpriteComponent();
        const done = Promise.all([
            one.setImage('bulb.svg'),
            other.setImage('bulb.svg'),
        ]);
        const texture = await arrive('bulb.svg');
        await done;
        const materialSpy = vi.spyOn(one.sprite.material, 'dispose');

        one.dispose();
        imageResourceCache.trim();

        expect(materialSpy).toHaveBeenCalled();
        expect(texture.dispose).not.toHaveBeenCalled();

        other.dispose();
        imageResourceCache.trim();

        expect(texture.dispose).toHaveBeenCalled();
    });
});
