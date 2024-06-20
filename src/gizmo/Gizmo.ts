import { Object3D } from "three";
import { DIVERotateGizmo } from "./rotate/RotateGizmo";
import { DIVETranslateGizmo } from "./translate/TranslateGizmo";
import DIVEOrbitControls from "../controls/OrbitControls";
import { DIVEScaleGizmo } from "./scale/ScaleGizmo";

export class DIVEGizmo extends Object3D {
    private _mode: ('translate' | 'rotate' | 'scale')[];
    public get mode(): ('translate' | 'rotate' | 'scale')[] {
        return this._mode;
    }
    public set mode(value: ('translate' | 'rotate' | 'scale')[]) {
        this._mode = value;
        this.updateMode();
    }

    private _translateGizmo: DIVETranslateGizmo;
    private _rotateGizmo: DIVERotateGizmo;
    private _scaleGizmo: DIVEScaleGizmo;

    constructor(controller: DIVEOrbitControls) {
        super();
        this.name = "DIVEGizmo";

        this._mode = [];

        this._translateGizmo = new DIVETranslateGizmo(controller);
        this._rotateGizmo = new DIVERotateGizmo(controller);
        this._scaleGizmo = new DIVEScaleGizmo(controller);

        this.updateMode();
    }

    private updateMode(): void {
        this.clear();
        if (this._mode.includes('translate')) {
            this.add(this._translateGizmo);
        }
        if (this._mode.includes('rotate')) {
            this.add(this._rotateGizmo);
        }
        if (this._mode.includes('scale')) {
            this.add(this._scaleGizmo);
        }
    }
}