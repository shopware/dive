import { Color, NotEqualDepth, Object3D } from "three";
import { AxesColorBlue, AxesColorGreen, AxesColorRed } from "../../constant/AxisHelperColors";
import { LineMaterial, LineSegments2, LineSegmentsGeometry } from "three/examples/jsm/Addons";

export class DIVETransformGizmo extends Object3D {
    private width: number = 5;

    private _xColor: Color = new Color(AxesColorRed);
    public set xColor(value: Color) {
        this._xColor = value;
        this.updateColors();
    }

    private _yColor: Color = new Color(AxesColorGreen);
    public set yColor(value: Color) {
        this._yColor = value;
        this.updateColors();
    }

    private _zColor: Color = new Color(AxesColorBlue);
    public set zColor(value: Color) {
        this._zColor = value;
        this.updateColors();
    }

    private _line: LineSegments2;

    public set useOverwriteMaterial(value: boolean) {
        this._line.material.depthTest = !value;
        this._line.renderOrder = value ? 999 : 0;
    }

    public set lineWidth(value: number) {
        this.width = value;
        this._line.material.linewidth = value;
    }

    constructor() {
        super();

        // create geometry
        const points = [
            0, 0, 0, 1, 0, 0, // X axis
            0, 0, 0, 0, 1, 0, // Y axis
            0, 0, 0, 0, 0, 1, // Z axis
        ];

        const geo = new LineSegmentsGeometry();
        geo.setPositions(points);

        const mat = new LineMaterial({
            color: 0xffffff,
            linewidth: this.width, // in world units with size attenuation, pixels otherwise
            vertexColors: true,
            dashed: false,
            depthFunc: NotEqualDepth, // used to prevet z-fighting with the grid
            alphaToCoverage: true,
        });

        // mat.onBeforeCompile = shader => {
        //     shader.vertexShader = `
        //         ${shader.vertexShader}
        //     `.replace(`uniform float linewidth;`, `attribute float linewidthStart; \n attribute float linewidthEnd;`);
        //     console.log(shader.vertexShader)
        // };
        // mat.needsUpdate = true;

        this._line = new LineSegments2(geo, mat);
        this.add(this._line);

        this.updateColors();
    }

    private updateColors(): void {
        const colors = [
            this._xColor.r, this._xColor.g, this._xColor.b, this._xColor.r, this._xColor.g, this._xColor.b,
            this._yColor.r, this._yColor.g, this._yColor.b, this._yColor.r, this._yColor.g, this._yColor.b,
            this._zColor.r, this._zColor.g, this._zColor.b, this._zColor.r, this._zColor.g, this._zColor.b,
        ];
        this._line.geometry.setColors(colors);
    }
}