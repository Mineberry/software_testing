import countBy from '../src/countBy';

describe('countBy', () => {
    test('counts values based on iteratee for array input', () => {
        const users = [
            { user: 'barney', active: true },
            { user: 'betty', active: true },
            { user: 'fred', active: false },
        ];
        const result = countBy(users, value => value.active);
        expect(result).toEqual({ true: 2, false: 1 });
    });

    test('counts values based on iteratee for object input', () => {
        const users = {
            user1: { active: true },
            user2: { active: true },
            user3: { active: false },
        };
        const result = countBy(users, (value) => value.active);
        expect(result).toEqual({ true: 2, false: 1 });
    });

    test('handles numbers in array input', () => {
        const numbers = [6.1, 4.2, 6.3];
        const result = countBy(numbers, Math.floor);
        expect(result).toEqual({ 6: 2, 4: 1 });
    });

    test('counts string characters by condition', () => {
        const characters = ['a', 'b', 'a', 'c', 'b', 'a'];
        const result = countBy(characters, (char) => char);
        expect(result).toEqual({ a: 3, b: 2, c: 1 });
    });

    test('handles empty collection gracefully', () => {
        expect(countBy([], (value) => value)).toEqual({});
        expect(countBy({}, (value) => value)).toEqual({});
    });

    test('handles null or undefined collection', () => {
        expect(countBy(null, (value) => value)).toEqual({});
        expect(countBy(undefined, (value) => value)).toEqual({});
    });

    test('handles mixed-type arrays', () => {
        const mixedArray = [1, '1', true, false, true];
        const result = countBy(mixedArray, (value) => typeof value);
        expect(result).toEqual({ number: 1, string: 1, boolean: 3 });
    });

    test('handles objects with string keys', () => {
        const obj = { a: 1, b: 1, c: 2 };
        const result = countBy(obj, (value) => value);
        expect(result).toEqual({ 1: 2, 2: 1 });
    });

    test('handles custom iteratees', () => {
        const numbers = [1, 2, 3, 4, 5];
        const result = countBy(numbers, (num) => (num % 2 === 0 ? 'even' : 'odd'));
        expect(result).toEqual({ odd: 3, even: 2 });
    });

    test('handles iteratee returning complex keys', () => {
        const numbers = [1, 2, 3, 4];
        const result = countBy(numbers, (num) => JSON.stringify({ parity: num % 2 }));
        expect(result).toEqual({
            '{"parity":1}': 2,
            '{"parity":0}': 2,
        });
    });
});