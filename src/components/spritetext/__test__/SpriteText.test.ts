import { SpriteMaterial } from 'three/webgpu';
import { DIVESpriteText } from '../SpriteText.ts';

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

describe('DIVESpriteText', () => {
    it('should construct with a canvas texture', () => {
        const sprite = new DIVESpriteText('X', 0.2, '#c20017');

        expect(sprite.isDIVESpriteText).toBe(true);
        expect(sprite.name).toBe('DIVESpriteText');

        const map = (sprite.material as SpriteMaterial).map;
        expect(map).not.toBeNull();
        expect(map!.image).toBeInstanceOf(HTMLCanvasElement);
    });

    it('should rasterize the text in the given color', () => {
        new DIVESpriteText('X', 0.2, '#c20017');

        expect(context.fillStyle).toBe('#c20017');
        expect(context.textBaseline).toBe('bottom');
        expect(context.fillText).toHaveBeenCalledWith('X', 0, FONT_SIZE);
    });

    it('should scale the sprite to the text height and aspect ratio', () => {
        const sprite = new DIVESpriteText('XY', 0.2, '#c20017');

        expect(sprite.scale.x).toBeCloseTo((0.2 * 2 * CHAR_WIDTH) / FONT_SIZE);
        expect(sprite.scale.y).toBeCloseTo(0.2);
        expect(sprite.scale.z).toBe(1);
    });

    it('should default to a text height of 1 and white', () => {
        const sprite = new DIVESpriteText('X');

        expect(sprite.scale.y).toBe(1);
        expect(context.fillStyle).toBe('#ffffff');
    });

    it('should keep a minimum canvas width for empty text', () => {
        const sprite = new DIVESpriteText('', 0.2);

        const map = (sprite.material as SpriteMaterial).map;
        expect((map!.image as HTMLCanvasElement).width).toBe(1);
        expect(sprite.scale.x).toBeCloseTo(0.2 / FONT_SIZE);
    });

    it('should redraw when the text changes', () => {
        const sprite = new DIVESpriteText('X', 0.2);

        sprite.setText('XYZ');

        expect(context.fillText).toHaveBeenLastCalledWith('XYZ', 0, FONT_SIZE);
        expect(sprite.scale.x).toBeCloseTo((0.2 * 3 * CHAR_WIDTH) / FONT_SIZE);
    });

    it('should redraw when the text height changes', () => {
        const sprite = new DIVESpriteText('X', 0.2);

        sprite.setTextHeight(0.5);

        expect(sprite.scale.y).toBeCloseTo(0.5);
        expect(sprite.scale.x).toBeCloseTo((0.5 * CHAR_WIDTH) / FONT_SIZE);
    });

    it('should redraw when the color changes', () => {
        const sprite = new DIVESpriteText('X', 0.2, '#c20017');

        sprite.setColor('#00ab26');

        expect(context.fillStyle).toBe('#00ab26');
    });

    it('should dispose the texture and the material', () => {
        const sprite = new DIVESpriteText('X', 0.2);
        const material = sprite.material as SpriteMaterial;
        const textureDispose = vi.spyOn(material.map!, 'dispose');
        const materialDispose = vi.spyOn(material, 'dispose');

        sprite.dispose();

        expect(textureDispose).toHaveBeenCalled();
        expect(materialDispose).toHaveBeenCalled();
    });

    it('should not throw without a 2D context', () => {
        vi.spyOn(HTMLCanvasElement.prototype, 'getContext').mockReturnValue(
            null,
        );

        const sprite = new DIVESpriteText('X', 0.2);

        expect(sprite.scale.y).toBe(1);
    });
});
