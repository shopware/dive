import * as Moveable_DEF from '../Moveable';
import * as Rotatable_DEF from '../Rotatable';
import * as Scalable_DEF from '../Scalable';
import * as Selectable_DEF from '../Selectable';

describe('interfaces', () => {
    it('should be defined', () => {
        expect(Moveable_DEF).toBeDefined();
        expect(Rotatable_DEF).toBeDefined();
        expect(Scalable_DEF).toBeDefined();
        expect(Selectable_DEF).toBeDefined();
    });
});