import { type Object3D } from 'three';
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
    select(obj: Object3D & DIVESelectable): void {
        if (this._selected === obj) return;

        // Deselect previous
        if (this._selected) {
            this._selected.onDeselect?.();
        }

        // Select new
        this._selected = obj;
        obj.onSelect?.();

        this.notifyListeners();
    }

    /**
     * Deselect the currently selected object.
     * Calls onDeselect on the object.
     */
    deselect(): void {
        if (!this._selected) return;

        this._selected.onDeselect?.();
        this._selected = null;

        this.notifyListeners();
    }

    /**
     * Register a callback to be notified when selection changes.
     */
    onChange(callback: SelectionChangeCallback): void {
        this._listeners.add(callback);
    }

    /**
     * Unregister a previously registered callback.
     */
    offChange(callback: SelectionChangeCallback): void {
        this._listeners.delete(callback);
    }

    /**
     * Dispose of the selection state and clear all listeners.
     */
    dispose(): void {
        this._selected = null;
        this._listeners.clear();
    }

    private notifyListeners(): void {
        for (const listener of this._listeners) {
            listener(this._selected);
        }
    }
}
