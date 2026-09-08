import { type Object3D } from 'three/webgpu';
import { type DIVESelectable } from '@shopware-ag/dive';

type SelectionChangeCallback = (
    selected: (Object3D & DIVESelectable) | null,
) => void;

/**
 * Manages selection state and notifies listeners on changes.
 *
 * Provides a centralized way to track what object is currently selected
 * and allows tools like TransformTool to react to selection changes.
 *
 * @module
 */
export class SelectionState {
    private _selected: (Object3D & DIVESelectable) | null = null;
    private _listeners: Set<SelectionChangeCallback> = new Set();

    /**
     * Currently selected object, or null if nothing is selected.
     */
    get selected(): (Object3D & DIVESelectable) | null {
        return this._selected;
    }

    /**
     * Select an object. Deselects any previously selected object.
     * Calls onSelect on the new object and onDeselect on the previous.
     */
    public select(obj: Object3D & DIVESelectable): void {
        this._select(obj, true);
    }

    /**
     * Selects without having the object announce it.
     *
     * For a caller that announces the selection itself, so a subscriber does not
     * hear about it twice: whoever asked for this already knows it happened.
     *
     * The object that was displaced still gets its `onDeselect` — nobody told
     * *it* anything, and it is the only source for that news. Listeners
     * registered through {@link onChange} are notified either way, or a
     * programmatic selection would not attach the gizmo.
     */
    public applySelection(obj: Object3D & DIVESelectable): void {
        this._select(obj, false);
    }

    /**
     * Deselect the currently selected object.
     * Calls onDeselect on the object.
     */
    public deselect(): void {
        this._deselect(true);
    }

    /**
     * Deselects without having the object announce it.
     *
     * The counterpart to {@link applySelection}: for a caller that asked for
     * exactly this and announces it itself.
     */
    public applyDeselection(): void {
        this._deselect(false);
    }

    private _select(obj: Object3D & DIVESelectable, announce: boolean): void {
        if (this._selected === obj) return;

        // Both handlers below can call straight back in here, so the field is
        // moved to its next value before each of them rather than after. The
        // guards then break any loop on their own, without relying on a
        // handler being asynchronous.
        const previous = this._selected;

        // cleared first, so a deselect() from within onDeselect finds nothing
        // to do instead of dropping the incoming selection
        this._selected = null;
        previous?.onDeselect?.();

        this._selected = obj;
        if (announce) obj.onSelect?.();

        this.notifyListeners();
    }

    private _deselect(announce: boolean): void {
        const previous = this._selected;
        if (!previous) return;

        // cleared before the handler runs, for the same reason as in select()
        this._selected = null;
        if (announce) previous.onDeselect?.();

        this.notifyListeners();
    }

    /**
     * Register a callback to be notified when selection changes.
     */
    public onChange(callback: SelectionChangeCallback): void {
        this._listeners.add(callback);
    }

    /**
     * Unregister a previously registered callback.
     */
    public offChange(callback: SelectionChangeCallback): void {
        this._listeners.delete(callback);
    }

    /**
     * Dispose of the selection state and clear all listeners.
     */
    public dispose(): void {
        this._selected = null;
        this._listeners.clear();
    }

    private notifyListeners(): void {
        for (const listener of this._listeners) {
            listener(this._selected);
        }
    }
}
