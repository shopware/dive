import { applyMixins } from '../applyMixins.ts';

class Moveable {
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

        interface Product extends Moveable, Selectable { }

        applyMixins(Product, [Moveable, Selectable]);

        const instance = new Product();
        expect(instance).toBeDefined();
        expect(instance.move).toBeDefined();
        expect(instance.select).toBeDefined();
        expect(instance.doProductThings).toBeDefined();
    });
});