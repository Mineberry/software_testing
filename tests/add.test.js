import add from '../src/add';

describe('add', () => {
    test('adds two positive numbers', () => {
        expect(add(6, 4)).toBe(10);
        expect(add(1, 1)).toBe(2);
    });

    test('adds two negative numbers', () => {
        expect(add(-6, -4)).toBe(-10);
        expect(add(-1, -1)).toBe(-2);
    });

    test('adds a positive and a negative number', () => {
        expect(add(6, -4)).toBe(2);
        expect(add(-6, 4)).toBe(-2);
    });

    test('adds numbers with decimals', () => {
        expect(add(6.5, 4.2)).toBeCloseTo(10.7);
        expect(add(-6.1, -4.3)).toBeCloseTo(-10.4);
    });

    test('adds a number and zero', () => {
        expect(add(6, 0)).toBe(6);
        expect(add(0, 4)).toBe(4);
    });

    test('adds zero and zero', () => {
        expect(add(0, 0)).toBe(0);
    });

    test('handles NaN inputs', () => {
        expect(add(NaN, 4)).toBeNaN();
        expect(add(4, NaN)).toBeNaN();
        expect(add(NaN, NaN)).toBeNaN();
    });

    test('adds large numbers', () => {
        expect(add(1e10, 1e10)).toBe(2e10);
        expect(add(-1e10, 1e10)).toBe(0);
    });

    test('adds Infinity', () => {
        expect(add(Infinity, 1)).toBe(Infinity);
        expect(add(-Infinity, 1)).toBe(-Infinity);
        expect(add(Infinity, -Infinity)).toBeNaN();
    });

    test('treats null and undefined as 0', () => {
        expect(add(6, null)).toBe(6);
        expect(add(6, undefined)).toBe(6);
        expect(add(undefined, undefined)).toBe(0);
    });

    test('can handle other non-number inputs', () => {
        expect(add(6, {})).toBeNaN();
        expect(add({}, {})).toBeNaN();
        expect(() => add("string", "string")).not.toThrow();
    });
});