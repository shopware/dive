import { Object3D, Vector3 } from "three";
import { AxesColorBlue, AxesColorGreen, AxesColorRed } from "../../constant/AxisHelperColors";
import { DIVEHoverable } from "../../interface/Hoverable";
import DIVEOrbitControls from "../../controls/OrbitControls";
import { DIVEScaleHandle } from "../handles/ScaleHandle";

export class DIVEScaleGizmo extends Object3D implements DIVEHoverable {
    readonly isHoverable: true = true;

    public children: DIVEScaleHandle[];

    private _controller: DIVEOrbitControls;

    constructor(controller: DIVEOrbitControls) {
        super();

        this.name = "DIVEScaleGizmo";

        this.children = [];

        this._controller = controller;

        this.add(new DIVEScaleHandle('x', 1, new Vector3(1, 0, 0), AxesColorRed));
        this.add(new DIVEScaleHandle('y', 1, new Vector3(0, 1, 0), AxesColorGreen));
        this.add(new DIVEScaleHandle('z', 1, new Vector3(0, 0, 1), AxesColorBlue));
    }

    public reset(): void {
        this.children.forEach((child) => {
            child.reset();
        });
    }

    public onHoverAxis(axis: 'x' | 'y' | 'z' | null): void {
        console.log('scale: axis hovered', axis);
    }
}