import { DIVESelectable } from '../Selectable';

describe('DIVESelectable', () => {
    it('should have isSelectable property set to true', () => {
        const selectable = new DIVESelectable();
        expect(selectable.isSelectable).toBe(true);
    });

    it('should have optional select event handlers', () => {
        const selectable = new DIVESelectable();
        expect(selectable.onSelect).toBeUndefined();
        expect(selectable.onDeselect).toBeUndefined();
    });

    it('should allow setting select event handlers', () => {
        const selectable = new DIVESelectable();
        const onSelect = jest.fn();
        const onDeselect = jest.fn();

        selectable.onSelect = onSelect;
        selectable.onDeselect = onDeselect;

        expect(selectable.onSelect).toBe(onSelect);
        expect(selectable.onDeselect).toBe(onDeselect);
    });
});
