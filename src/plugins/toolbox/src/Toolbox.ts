import {
    Raycaster,
    Vector2,
    type Intersection,
    type Object3D,
} from 'three/webgpu';
import {
    type ColliderIntersection,
    DEFAULT_LAYER_MASK,
    DIVERaycaster,
    type DIVENode,
    type DIVEScene,
    isVisibleInHierarchy,
    PRODUCT_LAYER_MASK,
    PROXY_LAYER_MASK,
    UI_LAYER_MASK,
} from '@shopware-ag/dive';
import { type OrbitController } from '@shopware-ag/dive/orbitcontroller';
import { type Tool } from './Tool.ts';
import { type PointerContext, type WheelContext } from './PointerContext.ts';
import { SelectionState } from './SelectionState.ts';
import { type ToolType, type ToolTypeMap } from '../types/index.ts';
import { HoverTool } from './hover/HoverTool.ts';
import { SelectTool } from './select/SelectTool.ts';
import { TransformTool } from './transform/TransformTool.ts';
import { DragTool } from './drag/DragTool.ts';

const POINTER_DRAG_THRESHOLD = 0.001;

/**
 * Toolbox manages multiple tools and dispatches pointer events to them.
 *
 * Tools are processed in priority order (lower number = higher priority).
 * Each tool can stop event propagation by returning true from its handler.
 *
 * @module
 */
export class Toolbox {
    private _scene: DIVEScene;
    private _controller: OrbitController;
    private _canvas: HTMLElement;

    // Tool management
    private _tools: Map<ToolType, Tool>;
    private _activeTools: Map<ToolType, Tool> = new Map();
    private _sortedActiveTools: Tool[] = [];

    // Shared selection state
    private _selectionState: SelectionState;
    public get selectionState(): SelectionState {
        return this._selectionState;
    }

    /**
     * raycasting, shared and computed once per event
     * entities through their colliders, the gizmos through their meshes
     */
    private _colliderRaycaster: DIVERaycaster;
    private _raycaster: Raycaster;
    private _transformRaycaster: Raycaster;
    private _pointer: Vector2;

    // Pointer state
    private _pointerPrimaryDown: boolean = false;
    private _pointerMiddleDown: boolean = false;
    private _pointerSecondaryDown: boolean = false;
    private _lastPointerDown: Vector2;

    // Bound event handlers (for cleanup)
    private _boundPointerMove: (e: PointerEvent) => void;
    private _boundPointerDown: (e: PointerEvent) => void;
    private _boundPointerUp: (e: PointerEvent) => void;
    private _boundWheel: (e: WheelEvent) => void;

    constructor(
        scene: DIVEScene,
        controller: OrbitController,
        canvas: HTMLElement,
    ) {
        this._scene = scene;
        this._controller = controller;
        this._canvas = canvas;

        this._selectionState = new SelectionState();

        this._colliderRaycaster = new DIVERaycaster();
        this._colliderRaycaster.layers.mask =
            PRODUCT_LAYER_MASK | PROXY_LAYER_MASK;

        // dive's own gizmo handles, anywhere in the scene
        this._raycaster = new Raycaster();
        this._raycaster.layers.mask = UI_LAYER_MASK;

        /**
         * the transform controls never set a layer, so default, but only
         * inside their own helper, where nothing else hangs
         */
        this._transformRaycaster = new Raycaster();
        this._transformRaycaster.layers.mask = DEFAULT_LAYER_MASK;
        this._pointer = new Vector2();
        this._lastPointerDown = new Vector2();

        // Create and register all tools
        this._tools = new Map<ToolType, Tool>([
            ['hover', new HoverTool()],
            ['select', new SelectTool(this._selectionState)],
            [
                'transform',
                new TransformTool(
                    scene,
                    controller,
                    canvas,
                    this._selectionState,
                ),
            ],
            ['drag', new DragTool(scene, controller)],
        ]);

        // Bind event handlers
        this._boundPointerMove = this.onPointerMove.bind(this);
        this._boundPointerDown = this.onPointerDown.bind(this);
        this._boundPointerUp = this.onPointerUp.bind(this);
        this._boundWheel = this.onWheel.bind(this);

        // Add event listeners
        this._canvas.addEventListener('pointermove', this._boundPointerMove);
        this._canvas.addEventListener('pointerdown', this._boundPointerDown);
        this._canvas.addEventListener('pointerup', this._boundPointerUp);
        this._canvas.addEventListener('wheel', this._boundWheel);
    }

    /**
     * Enable a tool by type.
     */
    public enableTool(type: ToolType): void {
        const tool = this._tools.get(type);
        if (!tool) return;

        if (this._activeTools.has(type)) return;

        this._activeTools.set(type, tool);
        this.updateSortedTools();
        tool.onActivate?.();
    }

    /**
     * Disable an active tool by type.
     */
    public disableTool(type: ToolType): void {
        const tool = this._activeTools.get(type);
        if (!tool) return;

        tool.onDeactivate?.();
        this._activeTools.delete(type);
        this.updateSortedTools();
    }

    /**
     * Check if a tool is currently enabled.
     */
    public isToolEnabled(type: ToolType): boolean {
        return this._activeTools.has(type);
    }

    /**
     * Get a tool by type.
     */
    public getTool<T extends ToolType>(type: T): ToolTypeMap[T] {
        return this._tools.get(type) as ToolTypeMap[T];
    }

    /**
     * Get all currently active tools.
     */
    public getActiveTools(): Tool[] {
        return [...this._sortedActiveTools];
    }

    /**
     * Dispose of the toolbox and clean up resources.
     */
    public dispose(): void {
        // Deactivate all tools
        for (const tool of this._activeTools.values()) {
            tool.onDeactivate?.();
        }
        this._activeTools.clear();
        this._tools.clear();
        this._sortedActiveTools = [];

        // Remove event listeners
        this._canvas.removeEventListener('pointermove', this._boundPointerMove);
        this._canvas.removeEventListener('pointerdown', this._boundPointerDown);
        this._canvas.removeEventListener('pointerup', this._boundPointerUp);
        this._canvas.removeEventListener('wheel', this._boundWheel);

        // Dispose selection state
        this._selectionState.dispose();
    }

    // ============ Event Handlers ============

    private onPointerMove(e: PointerEvent): void {
        this.updatePointer(e);
        const ctx = this.createPointerContext(e);

        for (const tool of this._sortedActiveTools) {
            const stop = tool.onPointerMove?.(ctx);
            if (stop) break;
        }
    }

    private onPointerDown(e: PointerEvent): void {
        this.updatePointerState(e, true);
        this.updatePointer(e);
        this._lastPointerDown.copy(this._pointer);

        const ctx = this.createPointerContext(e);

        for (const tool of this._sortedActiveTools) {
            const stop = tool.onPointerDown?.(ctx);
            if (stop) break;
        }
    }

    private onPointerUp(e: PointerEvent): void {
        this.updatePointer(e);
        const ctx = this.createPointerContext(e);

        // Check if this was a click (no significant pointer movement)
        const wasClick = !this.pointerWasDragged();

        for (const tool of this._sortedActiveTools) {
            const stop = tool.onPointerUp?.(ctx);
            if (stop) break;
        }

        // Dispatch click event if applicable
        if (wasClick) {
            for (const tool of this._sortedActiveTools) {
                const stop = tool.onClick?.(ctx);
                if (stop) break;
            }
        }

        this.updatePointerState(e, false);
    }

    private onWheel(e: WheelEvent): void {
        const ctx = this.createWheelContext(e);

        for (const tool of this._sortedActiveTools) {
            const stop = tool.onWheel?.(ctx);
            if (stop) break;
        }
    }

    // ============ Context Creation ============

    private createPointerContext(e: PointerEvent): PointerContext {
        // Object.assign, not a spread, which would read every getter and raycast
        return Object.assign(this.createLazyIntersects(), {
            event: e,
            pointer: this._pointer.clone(),
            pointerPrimaryDown: this._pointerPrimaryDown,
            pointerMiddleDown: this._pointerMiddleDown,
            pointerSecondaryDown: this._pointerSecondaryDown,
            lastPointerDown: this._lastPointerDown.clone(),
        }) as PointerContext;
    }

    private createWheelContext(e: WheelEvent): WheelContext {
        return Object.assign(this.createLazyIntersects(), {
            event: e,
            pointer: this._pointer.clone(),
        }) as WheelContext;
    }

    /**
     * The four intersect lists, each raycast on first read and then kept.
     *
     * One collider raycast and one gizmo raycast per event at most, shared by
     * every tool, and only if a tool actually looks.
     */
    private createLazyIntersects(): Pick<
        PointerContext,
        'intersects' | 'modelIntersects' | 'entityIntersects' | 'uiIntersects'
    > {
        let entity: ColliderIntersection[] | undefined;
        let gizmo: Intersection[] | undefined;
        let all: Intersection[] | undefined;
        let model: Intersection[] | undefined;
        let ui: Intersection[] | undefined;

        const entities = (): ColliderIntersection[] =>
            (entity ??= this.raycastColliders());
        const gizmos = (): Intersection[] => (gizmo ??= this.raycastGizmo());

        return {
            get intersects() {
                return (all ??= [...entities(), ...gizmos()].sort(
                    (a, b) => a.distance - b.distance,
                ));
            },
            get modelIntersects() {
                return (model ??= entities().filter(
                    (i) => (i.collider.layers.mask & PRODUCT_LAYER_MASK) !== 0,
                ));
            },
            get entityIntersects() {
                return entities();
            },
            get uiIntersects() {
                return (ui ??= gizmos().filter(
                    (i) => (i.object.layers.mask & UI_LAYER_MASK) !== 0,
                ));
            },
        };
    }

    // ============ Helper Methods ============

    private updatePointer(e: PointerEvent | MouseEvent): void {
        this._pointer.x = (e.offsetX / this._canvas.clientWidth) * 2 - 1;
        this._pointer.y = -(e.offsetY / this._canvas.clientHeight) * 2 + 1;

        const camera = this._controller.object.camera;
        this._raycaster.setFromCamera(this._pointer, camera);
        this._transformRaycaster.setFromCamera(this._pointer, camera);
        this._colliderRaycaster.setFromCamera(this._pointer, camera);
    }

    private updatePointerState(e: PointerEvent, isDown: boolean): void {
        switch (e.button) {
            case 0:
                this._pointerPrimaryDown = isDown;
                break;
            case 1:
                this._pointerMiddleDown = isDown;
                break;
            case 2:
                this._pointerSecondaryDown = isDown;
                break;
        }
    }

    /**
     * product and proxy colliders, one hit per collider with its node as the
     * object; hidden subtrees are not entered
     */
    private raycastColliders(): ColliderIntersection[] {
        return this._colliderRaycaster.intersectObject<DIVENode>(
            this._scene,
        ) as ColliderIntersection[];
    }

    /**
     * the gizmos' meshes, the one thing picked by geometry
     * layers prune per object, visible does not, hence the hierarchy check
     */
    private raycastGizmo(): Intersection[] {
        const intersects = this._raycaster.intersectObjects(
            this._scene.children,
            true,
        );

        const transform = this.transformGizmo();
        if (transform?.parent === this._scene) {
            this._transformRaycaster.intersectObject(
                transform,
                true,
                intersects,
            );
        }

        return intersects
            .filter((intersection) => isVisibleInHierarchy(intersection.object))
            .sort((a, b) => a.distance - b.distance);
    }

    // the transform tool's gizmo root, in the scene only while it is shown
    private transformGizmo(): Object3D | undefined {
        const tool = this._tools.get('transform') as TransformTool | undefined;
        return tool?.gizmo.getHelper() as unknown as Object3D | undefined;
    }

    private updateSortedTools(): void {
        this._sortedActiveTools = [...this._activeTools.values()].sort(
            (a, b) => a.priority - b.priority,
        );
    }

    private pointerWasDragged(): boolean {
        return (
            this._lastPointerDown.distanceTo(this._pointer) >
            POINTER_DRAG_THRESHOLD
        );
    }
}
