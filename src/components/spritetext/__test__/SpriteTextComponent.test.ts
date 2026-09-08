import { Sprite, SpriteMaterial } from 'three/webgpu';
import { SpriteTextComponent } from '../SpriteTextComponent.ts';
import { DIVENode } from '../../../engine/node/Node.ts';
import { COORDINATE_LAYER_MASK } from '../../../constants/VisibilityLayerMask.ts';

/** Rasterized width of a single character in the mocked 2D context. */
const CHAR_WIDTH = 50;
const FONT_SIZE = 90;

const createContext = () =>
    ({
        font: '',
        fillStyle: '',
        textBaseline: '',
        measureText: vi.fn((text: string) => ({
            width: text.length * CHAR_WIDTH,
        })),
        fillText: vi.fn(),
    }) as unknown as CanvasRenderingContext2D;

let context: CanvasRenderingContext2D;

beforeEach(() => {
    context = createContext();
    vi.spyOn(HTMLCanvasElement.prototype, 'getContext').mockReturnValue(
        context,
    );
});

afterEach(() => {
    vi.restoreAllMocks();
});

describe('dive/spritetext/SpriteTextComponent', () => {
    it('should brand and name itself', () => {
        const label = new SpriteTextComponent();

        expect(label.isSpriteTextComponent).toBe(true);
        expect(label.name).toBe('SpriteTextComponent');
    });

    it('should contribute a sprite carrying a canvas texture', () => {
        const label = new SpriteTextComponent();

        expect(label.contributions).toEqual([label.sprite]);
        expect(label.sprite).toBeInstanceOf(Sprite);

        const map = (label.sprite.material as SpriteMaterial).map;
        expect(map).not.toBeNull();
        expect(map!.image).toBeInstanceOf(HTMLCanvasElement);
    });

    it('should put the sprite into the node', () => {
        const node = new DIVENode();
        const label = node.addComponent(new SpriteTextComponent());

        expect(node.children).toContain(label.sprite);
    });

    it('should be constructible with no arguments', () => {
        // the old class required a text and therefore threw on clone()
        expect(() => new SpriteTextComponent().clone()).not.toThrow();
    });

    it('should default to a text height of 1 and white', () => {
        const label = new SpriteTextComponent();

        expect(label.textHeight).toBe(1);
        expect(label.sprite.scale.y).toBe(1);
        expect(context.fillStyle).toBe('#ffffff');
    });

    it('should rasterize the text in the given colour', () => {
        new SpriteTextComponent().setText('X').setColor('#c20017');

        expect(context.fillStyle).toBe('#c20017');
        expect(context.textBaseline).toBe('bottom');
        expect(context.fillText).toHaveBeenLastCalledWith('X', 0, FONT_SIZE);
    });

    it('should scale the sprite to the text height and aspect ratio', () => {
        const label = new SpriteTextComponent()
            .setText('XY')
            .setTextHeight(0.2);

        expect(label.sprite.scale.x).toBeCloseTo(
            (0.2 * 2 * CHAR_WIDTH) / FONT_SIZE,
        );
        expect(label.sprite.scale.y).toBeCloseTo(0.2);
        expect(label.sprite.scale.z).toBe(1);
    });

    it('should keep a minimum canvas width for empty text', () => {
        const label = new SpriteTextComponent().setTextHeight(0.2);

        const map = (label.sprite.material as SpriteMaterial).map;
        expect((map!.image as HTMLCanvasElement).width).toBe(1);
        expect(label.sprite.scale.x).toBeCloseTo(0.2 / FONT_SIZE);
    });

    it('should redraw when the text changes', () => {
        const label = new SpriteTextComponent().setText('X').setTextHeight(0.2);

        label.setText('XYZ');

        expect(context.fillText).toHaveBeenLastCalledWith('XYZ', 0, FONT_SIZE);
        expect(label.sprite.scale.x).toBeCloseTo(
            (0.2 * 3 * CHAR_WIDTH) / FONT_SIZE,
        );
    });

    it('should redraw when the text height changes', () => {
        const label = new SpriteTextComponent().setText('X');

        label.setTextHeight(0.5);

        expect(label.sprite.scale.y).toBeCloseTo(0.5);
        expect(label.sprite.scale.x).toBeCloseTo(
            (0.5 * CHAR_WIDTH) / FONT_SIZE,
        );
    });

    it('should take the owner layer, because the sprite is what gets gated', () => {
        // layers gate only the object they are set on, never a subtree, so the
        // mask has to reach the sprite
        const node = new DIVENode();
        node.layers.mask = COORDINATE_LAYER_MASK;

        const label = node.addComponent(new SpriteTextComponent());

        expect(label.sprite.layers.mask).toBe(COORDINATE_LAYER_MASK);
    });

    it('should carry its text along to a clone', () => {
        const source = new SpriteTextComponent()
            .setText('X')
            .setTextHeight(0.4)
            .setColor('#00ab26');

        const copy = source.clone();

        expect(copy.text).toBe('X');
        expect(copy.textHeight).toBe(0.4);
        expect(copy.color.getHexString()).toBe('00ab26');
        expect(copy.sprite).not.toBe(source.sprite);
        expect(copy.sprite.scale.y).toBeCloseTo(0.4);
    });

    it('should dispose the texture and the material', () => {
        const label = new SpriteTextComponent();
        const material = label.sprite.material as SpriteMaterial;
        const texture = vi.spyOn(material.map!, 'dispose');
        const materialDispose = vi.spyOn(material, 'dispose');

        label.dispose();

        expect(texture).toHaveBeenCalled();
        expect(materialDispose).toHaveBeenCalled();
    });

    it('should not throw without a 2D context', () => {
        vi.spyOn(HTMLCanvasElement.prototype, 'getContext').mockReturnValue(
            null,
        );

        const label = new SpriteTextComponent().setText('X');

        expect(label.sprite.scale.y).toBe(1);
    });
});
