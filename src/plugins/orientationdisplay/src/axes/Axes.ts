import {
    AxesColorBlueLetter,
    AxesColorGreenLetter,
    AxesColorBlue,
    AxesColorGreen,
    AxesColorRed,
    AxesColorRedLetter,
    COORDINATE_LAYER_MASK,
} from '@shopware-ag/dive';
import { AxesHelper, Color, Material, Matrix4, Object3D } from 'three';
import SpriteText from 'three-spritetext';

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

        const x = new SpriteText('X', 0.2, AxesColorRedLetter);
        const y = new SpriteText('Y', 0.2, AxesColorGreenLetter);
        const z = new SpriteText('Z', 0.2, AxesColorBlueLetter);
        x.layers.mask = COORDINATE_LAYER_MASK;
        y.layers.mask = COORDINATE_LAYER_MASK;
        z.layers.mask = COORDINATE_LAYER_MASK;
        x.position.set(0.7, 0, 0);
        y.position.set(0, 0.7, 0);
        z.position.set(0, 0, 0.7);
        this._axesHelper.add(x);
        this._axesHelper.add(y);
        this._axesHelper.add(z);
    }

    public setFromCameraMatrix(matrix: Matrix4): void {
        this._axesHelper.rotation.setFromRotationMatrix(
            new Matrix4().extractRotation(matrix).invert(),
        );
    }
}
