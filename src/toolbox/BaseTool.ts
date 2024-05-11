/* eslint-disable @typescript-eslint/no-unused-vars */
export default abstract class DIVEBaseTool {
    protected name: string;

    protected constructor() {
        this.name = "BaseTool";
    }

    public Activate(): void { }

    public Deactivate(): void { }

    public onPointerDown(e: PointerEvent): void { }

    public onPointerUp(e: PointerEvent): void { }

    public onWheel(e: WheelEvent): void { }
}