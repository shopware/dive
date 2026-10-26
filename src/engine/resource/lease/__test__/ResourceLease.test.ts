import { DIVEResourceLease } from '../ResourceLease.ts';

describe('DIVEResourceLease', () => {
    it('lends its value and starts out not released', () => {
        const value = {};
        const lease = new DIVEResourceLease(value, vi.fn());

        expect(lease.value).toBe(value);
        expect(lease.released).toBe(false);
    });

    it('gives the value back once, however often it is released', () => {
        const onRelease = vi.fn();
        const lease = new DIVEResourceLease({}, onRelease);

        lease.release();
        lease.release();

        expect(lease.released).toBe(true);
        expect(onRelease).toHaveBeenCalledTimes(1);
    });

    it('releases when disposed', () => {
        const onRelease = vi.fn();
        const lease = new DIVEResourceLease({}, onRelease);

        lease[Symbol.dispose]();

        expect(lease.released).toBe(true);
        expect(onRelease).toHaveBeenCalledTimes(1);
    });
});
