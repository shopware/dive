import { Object3D } from 'three/webgpu';
import { type DIVESelectable } from '@shopware-ag/dive';
import { SelectionState } from '../SelectionState.ts';

type Selectable = Object3D & DIVESelectable;

const selectable = (): Selectable =>
    Object.assign(new Object3D(), {
        isSelectable: true as const,
        onSelect: vi.fn(),
        onDeselect: vi.fn(),
    }) as unknown as Selectable;

describe('SelectionState', () => {
    it('should select and deselect an object', () => {
        const state = new SelectionState();
        const object = selectable();

        state.select(object);
        expect(state.selected).toBe(object);
        expect(object.onSelect).toHaveBeenCalledTimes(1);

        state.deselect();
        expect(state.selected).toBeNull();
        expect(object.onDeselect).toHaveBeenCalledTimes(1);
    });

    it('should deselect the previous object when selecting another', () => {
        const state = new SelectionState();
        const first = selectable();
        const second = selectable();

        state.select(first);
        state.select(second);

        expect(first.onDeselect).toHaveBeenCalledTimes(1);
        expect(second.onSelect).toHaveBeenCalledTimes(1);
        expect(state.selected).toBe(second);
    });

    it('should ignore selecting the object that is already selected', () => {
        const state = new SelectionState();
        const object = selectable();

        state.select(object);
        state.select(object);

        expect(object.onSelect).toHaveBeenCalledTimes(1);
        expect(object.onDeselect).not.toHaveBeenCalled();
    });

    it('should notify listeners and stop after offChange', () => {
        const state = new SelectionState();
        const object = selectable();
        const listener = vi.fn();

        state.onChange(listener);
        state.select(object);
        expect(listener).toHaveBeenCalledWith(object);

        state.offChange(listener);
        state.deselect();
        expect(listener).toHaveBeenCalledTimes(1);
    });

    it('should drop the selection and the listeners on dispose', () => {
        const state = new SelectionState();
        const listener = vi.fn();

        state.onChange(listener);
        state.select(selectable());
        state.dispose();

        expect(state.selected).toBeNull();

        listener.mockClear();
        state.select(selectable());
        expect(listener).not.toHaveBeenCalled();
    });

    describe('re-entrancy', () => {
        // The state plugin reacts to onSelect/onDeselect by performing an
        // action, which can call straight back in here. Nothing may rely on
        // that call being deferred.

        it('should survive a synchronous select from within onSelect', () => {
            const state = new SelectionState();
            const object = selectable();
            vi.mocked(object.onSelect!).mockImplementation(() => {
                state.select(object);
            });

            expect(() => state.select(object)).not.toThrow();
            expect(object.onSelect).toHaveBeenCalledTimes(1);
            expect(state.selected).toBe(object);
        });

        it('should survive a synchronous deselect from within onDeselect', () => {
            const state = new SelectionState();
            const object = selectable();
            vi.mocked(object.onDeselect!).mockImplementation(() => {
                state.deselect();
            });

            state.select(object);

            expect(() => state.deselect()).not.toThrow();
            expect(object.onDeselect).toHaveBeenCalledTimes(1);
            expect(state.selected).toBeNull();
        });

        it('should survive a synchronous deselect while switching selection', () => {
            const state = new SelectionState();
            const first = selectable();
            const second = selectable();
            vi.mocked(first.onDeselect!).mockImplementation(() => {
                state.deselect();
            });

            state.select(first);

            expect(() => state.select(second)).not.toThrow();
            expect(first.onDeselect).toHaveBeenCalledTimes(1);
            expect(state.selected).toBe(second);
        });
    });
});
