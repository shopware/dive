import {
    AxesColorBlueLetter,
    AxesColorGreenLetter,
    AxesColorBlue,
    AxesColorGreen,
    AxesColorRed,
    AxesColorRedLetter,
    COORDINATE_LAYER_MASK,
    DIVENode,
    SpriteTextComponent,
} from '@shopware-ag/dive';
import {
    AxesHelper,
    Color,
    Material,
    Matrix4,
    Object3D,
    type ColorRepresentation,
    type Vector3Like,
} from 'three/webgpu';

/**
 * One axis letter, on its own node.
 *
 * The node carries the placement and the layer, the component carries the label:
 * position the node, not what a component contributed. The mask is set before
 * attaching, because that is where the component reads it from.
 */
const letter = (
    text: string,
    color: ColorRepresentation,
    position: Vector3Like,
): DIVENode => {
    const node = new DIVENode();
    node.position.set(position.x, position.y, position.z);
    node.layers.mask = COORDINATE_LAYER_MASK;

    node.addComponent(new SpriteTextComponent())
        .setText(text)
        .setTextHeight(0.2)
        .setColor(color);

    return node;
};

export class OrientationDisplayAxes extends Object3D {
    private _axesHelper: AxesHelper;

    constructor() {
        super();

        this._axesHelper = new AxesHelper(0.5);
        this._axesHelper.layers.mask = COORDINATE_LAYER_MASK;
        (this._axesHelper.material as Material).depthTest = false;
        this._axesHelper.position.set(0, 0, -1);

        this._axesHelper.setColors(
            new Color(AxesColorRed),
            new Color(AxesColorGreen),
            new Color(AxesColorBlue),
        );

        this._axesHelper.add(
            letter('X', AxesColorRedLetter, { x: 0.7, y: 0, z: 0 }),
            letter('Y', AxesColorGreenLetter, { x: 0, y: 0.7, z: 0 }),
            letter('Z', AxesColorBlueLetter, { x: 0, y: 0, z: 0.7 }),
        );

        this.add(this._axesHelper);
    }

    public setFromCameraMatrix(matrix: Matrix4): void {
        this._axesHelper.rotation.setFromRotationMatrix(
            new Matrix4().extractRotation(matrix).invert(),
        );
    }
}
