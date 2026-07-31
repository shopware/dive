import {
    CanvasTexture,
    Color,
    type ColorRepresentation,
    SRGBColorSpace,
    Sprite,
    SpriteMaterial,
} from 'three/webgpu';

/** Canvas height of one rasterized line in pixels. Defines the label's resolution. */
const FONT_SIZE = 90;

/** Font the label is rasterized with. */
const FONT = `normal ${FONT_SIZE}px Arial`;

/**
 * A camera facing text label.
 *
 * The text is rasterized to a canvas and applied to a sprite, so the label always
 * faces the camera while keeping a constant height in world units.
 *
 * @module
 */
export class DIVESpriteText extends Sprite {
    readonly isDIVESpriteText: true = true;

    private _text: string;
    private _textHeight: number;
    private _color: Color;

    private _canvas: HTMLCanvasElement;
    private _texture: CanvasTexture;

    constructor(
        text: string,
        textHeight: number = 1,
        color: ColorRepresentation = 0xffffff,
    ) {
        super(new SpriteMaterial());

        this.name = 'DIVESpriteText';

        this._text = text;
        this._textHeight = textHeight;
        this._color = new Color(color);

        this._canvas = document.createElement('canvas');
        this._texture = new CanvasTexture(this._canvas);
        this._texture.colorSpace = SRGBColorSpace;

        (this.material as SpriteMaterial).map = this._texture;

        this._draw();
    }

    public setText(text: string): void {
        this._text = text;
        this._draw();
    }

    public setTextHeight(textHeight: number): void {
        this._textHeight = textHeight;
        this._draw();
    }

    public setColor(color: ColorRepresentation): void {
        this._color = new Color(color);
        this._draw();
    }

    public dispose(): void {
        this._texture.dispose();
        (this.material as SpriteMaterial).dispose();
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

        this.scale.set(
            (this._textHeight * width) / FONT_SIZE,
            this._textHeight,
            1,
        );
    }
}
