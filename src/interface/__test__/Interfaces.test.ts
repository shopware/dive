import { type Object3D } from 'three';
import * as Moveable_DEF from '../Moveable';
import * as Rotatable_DEF from '../Rotatable';
import * as Scalable_DEF from '../Scalable';
import * as Selectable_DEF from '../Selectable';
import * as Draggable_DEF from '../Draggable';
import * as Hoverable_DEF from '../Hoverable';

describe('interfaces', () => {
    it('should be defined', () => {
        expect(Moveable_DEF).toBeDefined();
        expect(Rotatable_DEF).toBeDefined();
        expect(Scalable_DEF).toBeDefined();
        expect(Selectable_DEF).toBeDefined();
        expect(Draggable_DEF).toBeDefined();
        expect(Hoverable_DEF).toBeDefined();
    });

    it('should identify Selectable', () => {
        const Selectable = { isSelectable: true };
        expect(Selectable_DEF.isSelectable(Selectable as unknown as Object3D)).toBe(true);
    });

    it('should find Selectable', () => {
        let Selectable = {
            isSelectable: true,
        } as unknown as Object3D & Selectable_DEF.DIVESelectable;
        expect(Selectable_DEF.findSelectableInterface(Selectable as unknown as Object3D)).toBe(Selectable);

        let parent = {
            isSelectable: true,
        }
        Selectable = {
            parent: parent,
        } as unknown as Object3D & Selectable_DEF.DIVESelectable;
        expect(Selectable_DEF.findSelectableInterface(Selectable as unknown as Object3D)).toBe(parent);

        Selectable = { isSelectable: true, parent: null } as unknown as Object3D & Selectable_DEF.DIVESelectable;
        expect(Selectable_DEF.findSelectableInterface(Selectable as unknown as Object3D)).toBe(undefined);
    });

    it('should identify Draggable', () => {
        const Draggable = { isDraggable: true };
        expect(Draggable_DEF.isDraggable(Draggable as unknown as Object3D)).toBe(true);
    });

    it('should find Draggable', () => {
        let Draggable = {
            isDraggable: true,
        } as unknown as Object3D & Draggable_DEF.DIVEDraggable;
        expect(Draggable_DEF.findDraggableInterface(Draggable as unknown as Object3D)).toBe(Draggable);

        let parent = {
            isDraggable: true,
        }
        Draggable = {
            parent: parent,
        } as unknown as Object3D & Draggable_DEF.DIVEDraggable;
        expect(Draggable_DEF.findDraggableInterface(Draggable as unknown as Object3D)).toBe(parent);

        Draggable = { isDraggable: true, parent: null } as unknown as Object3D & Draggable_DEF.DIVEDraggable;
        expect(Draggable_DEF.findDraggableInterface(Draggable as unknown as Object3D)).toBe(undefined);
    });

    it('should identify Hoverable', () => {
        const Hoverable = { isHoverable: true };
        expect(Hoverable_DEF.isHoverable(Hoverable as unknown as Object3D)).toBe(true);
    });

    it('should find Hoverable', () => {
        let Hoverable = {
            isHoverable: true,
        } as unknown as Object3D & Hoverable_DEF.DIVEHoverable;
        expect(Hoverable_DEF.findHoverableInterface(Hoverable as unknown as Object3D)).toBe(Hoverable);

        let parent = {
            isHoverable: true,
        }
        Hoverable = {
            parent: parent,
        } as unknown as Object3D & Hoverable_DEF.DIVEHoverable;
        expect(Hoverable_DEF.findHoverableInterface(Hoverable as unknown as Object3D)).toBe(parent);

        Hoverable = { isHoverable: true, parent: null } as unknown as Object3D & Hoverable_DEF.DIVEHoverable;
        expect(Hoverable_DEF.findHoverableInterface(Hoverable as unknown as Object3D)).toBe(undefined);
    });
});