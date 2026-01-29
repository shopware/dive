import { Raycaster, Vector2, type Intersection, Layers } from 'three';
import {
    type DIVEScene,
    PRODUCT_LAYER_MASK,
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

    // Raycasting (shared, computed once per event)
    private _raycaster: Raycaster;
    private _pointer: Vector2;
    private _productLayerMask: Layers;
    private _uiLayerMask: Layers;

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

    constructor(scene: DIVEScene, controller: OrbitController) {
        this._scene = scene;
        this._controller = controller;
        this._canvas = controller.domElement;

        this._selectionState = new SelectionState();

        // Initialize raycaster
        this._raycaster = new Raycaster();
        this._pointer = new Vector2();
        this._lastPointerDown = new Vector2();

        // Setup layer masks for filtering
        this._productLayerMask = new Layers();
        this._productLayerMask.set(Math.log2(PRODUCT_LAYER_MASK));

        this._uiLayerMask = new Layers();
        this._uiLayerMask.set(Math.log2(UI_LAYER_MASK));

        // Create and register all tools
        this._tools = new Map<ToolType, Tool>([
            [
                'hover',
                new HoverTool(),
            ],
            [
                'select',
                new SelectTool(this._selectionState),
            ],
            [
                'transform',
                new TransformTool(scene, controller, this._selectionState),
            ],
            [
                'drag',
                new DragTool(controller),
            ],
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
        const intersects = this.raycast();

        return {
            event: e,
            pointer: this._pointer.clone(),
            intersects,
            modelIntersects: this.filterIntersectsByLayer(
                intersects,
                PRODUCT_LAYER_MASK,
            ),
            uiIntersects: this.filterIntersectsByLayer(
                intersects,
                UI_LAYER_MASK,
            ),
            pointerPrimaryDown: this._pointerPrimaryDown,
            pointerMiddleDown: this._pointerMiddleDown,
            pointerSecondaryDown: this._pointerSecondaryDown,
            lastPointerDown: this._lastPointerDown.clone(),
        };
    }

    private createWheelContext(e: WheelEvent): WheelContext {
        const intersects = this.raycast();

        return {
            event: e,
            pointer: this._pointer.clone(),
            intersects,
            modelIntersects: this.filterIntersectsByLayer(
                intersects,
                PRODUCT_LAYER_MASK,
            ),
            uiIntersects: this.filterIntersectsByLayer(
                intersects,
                UI_LAYER_MASK,
            ),
        };
    }

    // ============ Helper Methods ============

    private updatePointer(e: PointerEvent | MouseEvent): void {
        this._pointer.x = (e.offsetX / this._canvas.clientWidth) * 2 - 1;
        this._pointer.y = -(e.offsetY / this._canvas.clientHeight) * 2 + 1;

        this._raycaster.setFromCamera(this._pointer, this._controller.object);
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

    private raycast(): Intersection[] {
        this._raycaster.layers.mask = PRODUCT_LAYER_MASK | UI_LAYER_MASK;
        const filteredObjects = this._scene.children.filter(
            (i) => i.visible && 'isMesh' in i && i.isMesh,
        );
        return this._raycaster.intersectObjects(filteredObjects, true);
    }

    private filterIntersectsByLayer(
        intersects: Intersection[],
        layerMask: number,
    ): Intersection[] {
        return intersects.filter(
            (i) => (i.object.layers.mask & layerMask) !== 0,
        );
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

    // ============ Legacy API Compatibility ============

    /**
     * @deprecated Use enableTool/disableTool instead.
     * Enable or disable a tool by type.
     */
    public useTool(tool: ToolType): void {
        // Enable all standard tools for the given type
        const allTools: ToolType[] = [
            'hover',
            'select',
            'transform',
            'drag',
        ];

        for (const t of allTools) {
            if (t === tool || tool === 'select') {
                this.enableTool(t);
            }
        }
    }

    /**
     * @deprecated Use getActiveTools instead.
     * Get the first active tool (for legacy compatibility).
     */
    public getActiveTool(): Tool | null {
        return this._sortedActiveTools[0] || null;
    }
}
