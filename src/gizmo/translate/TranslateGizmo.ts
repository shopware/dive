import { Object3D, Vector3 } from "three";
import { AxesColorBlue, AxesColorGreen, AxesColorRed } from "../../constant/AxisHelperColors";
import { DIVEHoverable } from "../../interface/Hoverable";
import DIVEOrbitControls from "../../controls/OrbitControls";
import { DIVEAxisHandle } from "../handles/AxisHandle";
import { DIVEDraggable } from "../../interface/Draggable";

export class DIVETranslateGizmo extends Object3D implements DIVEHoverable, DIVEDraggable {
    readonly isHoverable: true = true;
    readonly isDraggable: true = true;

    constructor(controller: DIVEOrbitControls) {
        super();

        this.name = "DIVETranslateGizmo";

        controller.addEventListener('change', () => {
            const size = controller.getDistance() / 2.5;
            this.scale.set(size, size, size);
        })

        this.add(new DIVEAxisHandle('x', 1, new Vector3(1, 0, 0), AxesColorRed));
        this.add(new DIVEAxisHandle('y', 1, new Vector3(0, 1, 0), AxesColorGreen));
        this.add(new DIVEAxisHandle('z', 1, new Vector3(0, 0, 1), AxesColorBlue));
    }

    public onHoverAxis(axis: 'x' | 'y' | 'z' | null): void {
        console.log('translate: axis hovered', axis);
    }

    public onDrag(e): void {
        console.log('translate: drag');
    }

}