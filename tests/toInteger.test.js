import toInteger from '../src/toInteger';
import {jest} from '@jest/globals';

describe('toInteger', () => {
    test('integer stays an integer', () => {
        expect(toInteger(1)).toBe(1);
        expect(toInteger(0)).toBe(0);
        expect(toInteger(-1)).toBe(-1);
    });

    test('numbers are rounded', () => {
        expect(toInteger(3.2)).toBe(3);
        expect(toInteger(3.5)).toBe(4);
        expect(toInteger(3.999999)).toBe(4);
        expect(toInteger(-1.1)).toBe(-1);
        expect(toInteger(Number.MIN_VALUE)).toBe(0);
    });

    test('decimal in a string to number', () => {
        expect(toInteger('3')).toBe(3);
        expect(toInteger('-3.2')).toBe(-3);
    });

    test('infinity gets a finite value', () => {
        expect(toInteger(Infinity)).toBe(1.7976931348623157e+308);
    });

    test('non-numbers without a number representation', () => {
        expect(toInteger('dog')).toBe(0);
        expect(toInteger(new Object)).toBe(0);
        expect(toInteger(Symbol.iterator)).toBe(0);
    });

    test('non-numbers with a number representation', () => {
        expect(toInteger(true)).toBe(1);
        expect(toInteger(false)).toBe(0);
        const valueOf = jest.fn(() => '42.3');
        const obj = { valueOf };
        expect(toInteger(obj)).toBe(42);
    });

    test('handles NaN, null and undefined', () => {
        expect(toInteger(NaN)).toBe(0);
        expect(toInteger(null)).toBe(0);
        expect(toInteger(undefined)).toBe(0);
    });
});