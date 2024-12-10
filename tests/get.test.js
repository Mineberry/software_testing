import get from '../src/get';

describe('get', () => {
    const object = { 
        a: [
            { b: { c: 3 } },
        ],
        d: null,
        e: undefined,
        f: 'value'
    };

    test('gets a value at a valid path (string notation)', () => {
        expect(get(object, 'a[0].b.c')).toBe(3);
    });

    test('gets a value at a valid path (array notation)', () => {
        expect(get(object, ['a', '0', 'b', 'c'])).toBe(3);
    });

    test('returns defaultValue when path does not exist', () => {
        expect(get(object, 'a[0].b.x', 'default')).toBe('default');
        expect(get(object, ['a', '0', 'b', 'x'], 'default')).toBe('default');
    });

    test('returns undefined when path does not exist and no defaultValue is provided', () => {
        expect(get(object, 'a[0].b.x')).toBeUndefined();
    });

    test('returns defaultValue when accessing undefined property', () => {
        expect(get(object, 'e.someProperty', 'default')).toBe('default');
    });

    test('handles null values gracefully', () => {
        expect(get(object, 'd.someProperty', 'default')).toBe('default');
    });

    test('handles primitive values at the path', () => {
        expect(get(object, 'f')).toBe('value');
        expect(get(object, ['f'])).toBe('value');
    });

    test('handles null or undefined input objects', () => {
        expect(get(null, 'a.b', 'default')).toBe('default');
        expect(get(undefined, 'a.b', 'default')).toBe('default');
    });

    test('handles empty path', () => {
        expect(get(object, '', 'default')).toBe('default');
        expect(get(object, [], 'default')).toEqual('default');
    });
});