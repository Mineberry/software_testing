import at from '../src/at';

describe('at', () => {
    const object = {
        a: [
            { b: { c: 3 } },
            4
        ],
        d: { e: { f: 5 } },
        g: null,
        h: undefined
    };

    test('extracts values at single valid path (string notation)', () => {
        expect(at(object, 'a[0].b.c')).toEqual([3]);
        expect(at(object, 'a[1]')).toEqual([4]);
    });

    test('extracts values at multiple valid paths (string notation)', () => {
        expect(at(object, 'a[0].b.c', 'a[1]')).toEqual([3, 4]);
    });

    test('extracts values at single valid path (array notation)', () => {
        expect(at(object, ['a[0].b.c'])).toEqual([3]);
        expect(at(object, ['a[1]'])).toEqual([4]);
    });

    test('extracts values at multiple valid paths (array notation)', () => {
        expect(at(object, ['a[0].b.c', 'a[1]'])).toEqual([3, 4]);
    });

    test('returns undefined for invalid paths', () => {
        expect(at(object, 'a[2]')).toEqual([undefined]);
        expect(at(object, 'nonexistent.path')).toEqual([undefined]);
    });

    test('handles null and undefined values', () => {
        expect(at(object, 'g')).toEqual([null]);
        expect(at(object, 'h')).toEqual([undefined]);
    });

    test('handles empty paths', () => {
        expect(at(object, [])).toEqual([]);
    });

    test('handles empty object', () => {
        expect(at({}, 'a.b.c')).toEqual([undefined]);
    });

    test('handles no paths provided', () => {
        expect(at(object)).toEqual([]);
    });

    test('handles multiple invalid paths', () => {
        expect(at(object, 'x.y.z', 'invalid.path')).toEqual([undefined, undefined]);
    });
});