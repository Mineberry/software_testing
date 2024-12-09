import filter from '../src/filter';

describe('filter', () => {
    test('filters elements based on predicate', () => {
        const users = [
            { user: 'barney', active: true },
            { user: 'fred', active: false },
        ];
        const result = filter(users, ({ active }) => active);
        expect(result).toEqual([{ user: 'barney', active: true }]);
    });

    test('returns an empty array if none match predicate', () => {
        const numbers = [1, 2, 3];
        const result = filter(numbers, (n) => n > 10);
        expect(result).toEqual([[]]);
    });

    test('works with an empty array', () => {
        const result = filter([], (n) => n > 0);
        expect(result).toEqual([[]]);
    });

    test('handles null or undefined input', () => {
        expect(filter(null, (n) => n > 0)).toEqual([[]]);
        expect(filter(undefined, (n) => n > 0)).toEqual([[]]);
    });

    test('filters elements with index or array access in predicate', () => {
        const numbers = [10, 20, 30, 40];
        const result = filter(numbers, (n, index) => index % 2 === 0);
        expect(result).toEqual([10, 30]);
    });

    test('filters using entire array in predicate', () => {
        const numbers = [1, 2, 3, 4];
        const result = filter(numbers, (n, index, arr) => arr.includes(n * 2));
        expect(result).toEqual([1, 2]);
    });

    test('handles non-array inputs', () => {
        expect(filter(42, (n) => n > 0)).toEqual([[]]);
        expect(filter({}, (n) => n)).toEqual([[]]);
    });
});