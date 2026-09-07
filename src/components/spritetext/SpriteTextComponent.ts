import {
    CanvasTexture,
    Color,
    SRGBColorSpace,
    Sprite,
    SpriteMaterial,
    type ColorRepresentation,
} from 'three/webgpu';
import { DIVEComponent } from '../../engine/component/Component.ts';
import { type DIVENode } from '../../engine/node/Node.ts';

/** Canvas height of one rasterized line in pixels. Defines the label's resolution. */
const FONT_SIZE = 90;

/** Font the label is rasterized with. */
const FONT = `normal ${FONT_SIZE}px Arial`;

/**
 * A camera facing text label on a node.
 *
 * The text is rasterized to a canvas and applied to a sprite, so the label always
 * faces the camera while keeping a constant height in world units. `textHeight`
 * is that height, and the width follows from the rasterized aspect ratio.
 *
 * Where the label sits is the node's business, as with every component: position
 * the node, not the sprite. What belongs here is what the label *is* -- its text,
 * its height and its colour.
 *
 * Takes the owner's layer, so a caller decides what the label counts as by setting
 * it on the node before attaching. Layers gate only the object they are set on, so
 * the mask has to reach the sprite itself, which is what this does.
 *
 * @module
 */
export class SpriteTextComponent extends DIVEComponent {
    readonly isSpriteTextComponent: true = true;

    private _text: string = '';
    private _textHeight: number = 1;
    private _color: Color = new Color(0xffffff);

    private _canvas: HTMLCanvasElement;
    private _texture: CanvasTexture;
    private _sprite: Sprite;

    constructor() {
        super();

        this.name = 'SpriteTextComponent';

        this._canvas = document.createElement('canvas');
        this._texture = new CanvasTexture(this._canvas);
        this._texture.colorSpace = SRGBColorSpace;

        this._sprite = new Sprite(new SpriteMaterial({ map: this._texture }));
        this._sprite.name = 'SpriteText';

        this.contribute(this._sprite);

        this._draw();
    }

    /** The sprite the label is drawn on. */
    public get sprite(): Sprite {
        return this._sprite;
    }

    /** The text currently drawn. */
    public get text(): string {
        return this._text;
    }

    /** The label's height in world units. */
    public get textHeight(): number {
        return this._textHeight;
    }

    /** The colour the text is rasterized in. */
    public get color(): Color {
        return this._color;
    }

    /**
     * @param text - What to write.
     */
    public setText(text: string): this {
        this._text = text;
        this._draw();

        return this;
    }

    /**
     * @param textHeight - The label's height in world units.
     */
    public setTextHeight(textHeight: number): this {
        this._textHeight = textHeight;
        this._draw();

        return this;
    }

    /**
     * @param color - The colour to rasterize the text in.
     */
    public setColor(color: ColorRepresentation): this {
        this._color.set(color);
        this._draw();

        return this;
    }

    protected onAttach(owner: DIVENode): void {
        this._sprite.layers.mask = owner.layers.mask;
    }

    public copy(source: this): this {
        super.copy(source);

        this._text = source.text;
        this._textHeight = source.textHeight;
        this._color.copy(source.color);
        this._draw();

        return this;
    }

    public dispose(): void {
        this._texture.dispose();
        (this._sprite.material as SpriteMaterial).dispose();
    }

    /**
     * Rasterizes the text to the canvas and scales the sprite to the resulting
     * aspect ratio, so the label's height matches its text height in world units.
     */
    private _draw(): void {
        const context = this._canvas.getContext('2d');

        // no 2D context means there is nothing to rasterize to (e.g. in jsdom)
        if (context === null) return;

        context.font = FONT;
        const width = Math.max(
            1,
            Math.ceil(context.measureText(this._text).width),
        );

        this._canvas.width = width;
        this._canvas.height = FONT_SIZE;

        // resizing the canvas resets the context, so the font has to be set again
        context.font = FONT;
        context.fillStyle = `#${this._color.getHexString()}`;
        context.textBaseline = 'bottom';
        context.fillText(this._text, 0, FONT_SIZE);

        this._texture.needsUpdate = true;

        this._sprite.scale.set(
            (this._textHeight * width) / FONT_SIZE,
            this._textHeight,
            1,
        );
    }
}
