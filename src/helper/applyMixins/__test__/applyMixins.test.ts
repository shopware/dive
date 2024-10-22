import { applyMixins } from '../applyMixins.ts';

class Movable {
    move() { }
}

class Selectable {
    select() { }
}

describe('dive/helper/applyMixins', () => {
    it('should apply mixins', () => {
        class Product {
            doProductThings() { }
        }

        interface Product extends Movable, Selectable { }

        applyMixins(Product, [Movable, Selectable]);

        const instance = new Product();
        expect(instance).toBeDefined();
        expect(instance.move).toBeDefined();
        expect(instance.select).toBeDefined();
        expect(instance.doProductThings).toBeDefined();
    });
});