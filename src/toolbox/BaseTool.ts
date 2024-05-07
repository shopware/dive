/* eslint-disable @typescript-eslint/no-unused-vars */
export default abstract class DIVEBaseTool {
    protected name: string;

    protected constructor() {
        this.name = "BaseTool";
    }

    public Activate() { }

    public Deactivate() { }

    public onPointerDown(e: PointerEvent) { }

    public onPointerUp(e: PointerEvent) { }

    public onWheel(e: WheelEvent) { }
}