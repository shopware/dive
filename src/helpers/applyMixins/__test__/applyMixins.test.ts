import { applyMixins } from '../applyMixins.ts';

class Movable {
    public isMovable = true;
    private _hasPrivateProperty = true;
    move() {}
}

class Selectable {
    readonly isSelectable = true;
    select() {}
}

describe('dive/helper/applyMixins', () => {
    it('should apply mixins', () => {
        class Product {
            doProductThings() {}
        }

        interface Product extends Movable, Selectable {}

        applyMixins(Product, [Movable, Selectable]);

        const instance = new Product();
        expect(instance).toBeDefined();
        expect(instance.isMovable).toBe(true);
        expect(instance.isSelectable).toBe(true);
        expect(instance['_hasPrivateProperty']).toBe(true);
        expect(instance.move).toBeDefined();
        expect(instance.select).toBeDefined();
        expect(instance.doProductThings).toBeDefined();
    });
});
