import { Object3D, Vector3 } from "three";
import { AxesColorBlue, AxesColorGreen, AxesColorRed } from "../../constant/AxisHelperColors";
import { DIVEHoverable } from "../../interface/Hoverable";
import DIVEOrbitControls from "../../controls/OrbitControls";
import { DIVERadialHandle } from "../handles/RadialHandle";

export class DIVERotateGizmo extends Object3D implements DIVEHoverable {
    readonly isHoverable: true = true;

    constructor(controller: DIVEOrbitControls) {
        super();

        this.name = "DIVERotateGizmo";

        controller.addEventListener('change', () => {
            const size = controller.getDistance() / 2.5;
            this.scale.set(size, size, size);
        })

        this.add(new DIVERadialHandle('x', Math.PI * 2, new Vector3(1, 0, 0), AxesColorRed));
        this.add(new DIVERadialHandle('y', Math.PI * 2, new Vector3(0, 1, 0), AxesColorGreen));
        this.add(new DIVERadialHandle('z', Math.PI * 2, new Vector3(0, 0, 1), AxesColorBlue));
    }

    public onHoverAxis(axis: 'x' | 'y' | 'z' | null): void {
        console.log('rotate: axis hovered', axis);
    }
}