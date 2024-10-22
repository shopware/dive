import { getObjectDelta } from '../getObjectDelta.ts';

describe('dive/helper/getObjectDelta', () => {

    // NO DELTAS
    it('should not find any deltas with empty objects', () => {
        const obj0 = {};
        const obj1 = {};

        const delta = getObjectDelta(obj0, obj1);

        expect(delta).toStrictEqual({});
    });

    it('should not find any deltas with equal references', () => {
        const obj0 = { test0: 'test', value0: 42, array0: [187, 6, 9, 42] };
        const obj1 = obj0;

        const delta = getObjectDelta(obj0, obj1);

        expect(delta).toStrictEqual({});
    });

    it('should not find any deltas with equal objects', () => {
        const obj0 = { test0: 'test', value0: 42, array0: [187, 6, 9, 42] };
        const obj1 = { ...obj0 };

        const delta = getObjectDelta(obj0, obj1);

        expect(delta).toStrictEqual({});
    });

    it('should not find any deltas with empty arrays', () => {
        const obj0 = { array0: [] };
        const obj1 = { array0: [] };

        const delta = getObjectDelta(obj0, obj1);

        expect(delta).toStrictEqual({});
    });

    // DELTAS
    it('should find deltas with incorrect types (case a)', () => {
        const obj0 = 'test' as unknown as object;
        const obj1 = { test: 0 };

        const delta = getObjectDelta(obj0, obj1);

        expect(delta).toStrictEqual(obj1);
    });

    it('should find deltas with incorrect types (case b)', () => {
        const obj0 = { test: 0 };
        const obj1 = 'test' as unknown as object;

        const delta = getObjectDelta(obj0, obj1);

        expect(delta).toStrictEqual(obj1);
    });

    it('should find deltas with one empty object', () => {
        const obj0 = {};
        const obj1 = { test: 0 };

        const delta = getObjectDelta(obj0, obj1);

        expect(delta).toStrictEqual(obj1);
    });

    it('should find deltas with different key lengths', () => {
        const obj0 = { test: 0 };
        const obj1 = { test: 0, test0: 0 };

        const delta = getObjectDelta(obj0, obj1);

        expect(delta).toStrictEqual({ test0: 0 });
    });

    it('should find deltas with a type delta', () => {
        const obj0 = { test: 'test' };
        const obj1 = { test: 0 as unknown as string };

        const delta = getObjectDelta(obj0, obj1);

        expect(delta).toStrictEqual(obj1);
    });

    it('should find deltas with a value delta', () => {
        const obj0 = { test: 'test' };
        const obj1 = { test: 'hello world!' };

        const delta = getObjectDelta(obj0, obj1);

        expect(delta).toStrictEqual(obj1);
    });

    it('should find deltas with array value delta', () => {
        const obj0 = { array0: [187, 6, 9, 42] };
        const obj1 = { array0: [187, 6, 9] };

        const delta = getObjectDelta(obj0, obj1);

        expect(delta).toStrictEqual(obj1);
    });

    it('should find deltas with array type difference', () => {
        const obj0 = { array0: 'array0' };
        const obj1 = { array0: [187, 6, 9] as unknown as string };

        const delta = getObjectDelta(obj0, obj1);

        expect(delta).toStrictEqual(obj1);
    });

    it('should find deltas with deltas in objects in array', () => {
        const obj0 = { array0: [{ test: 0 }] };
        const obj1 = { array0: [{ test: 1 }] };

        const delta = getObjectDelta(obj0, obj1);

        expect(delta).toStrictEqual(obj1);
    });

    it('should find deltas with undefined value in objects in object', () => {
        const obj0 = { object0: undefined as unknown as object };
        const obj1 = { object0: { test: 1 } };

        const delta = getObjectDelta(obj0, obj1);

        expect(delta).toStrictEqual(obj1);
    });

    it('should find deltas with wrong type in objects in object', () => {
        const obj0 = { object0: 'test' };
        const obj1 = { object0: { test: 1 } as unknown as string };

        const delta = getObjectDelta(obj0, obj1);

        expect(delta).toStrictEqual(obj1);
    });

    it('should find deltas with empty value in objects in object', () => {
        const obj0 = { object0: {} };
        const obj1 = { object0: { test: 1 } };

        const delta = getObjectDelta(obj0, obj1);

        expect(delta).toStrictEqual(obj1);
    });
});