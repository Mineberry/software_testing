import toNumber from '../src/toNumber';
import {jest} from '@jest/globals';

describe('toNumber', () => {
    test('number stays a number', () => {
        expect(toNumber(3.2)).toBe(3.2);
        expect(toNumber(1)).toBe(1);
        expect(toNumber(0)).toBe(0);
        expect(toNumber(-1)).toBe(-1);
        expect(toNumber(Number.MIN_VALUE)).toBe(5e-324);
    });

    test('decimal in a string to number', () => {
        expect(toNumber('3.2')).toBe(3.2);
        expect(toNumber('-3.2')).toBe(-3.2);
    });

    test('infinity stays unchanged', () => {
        expect(toNumber(Infinity)).toBe(Infinity);
    });

    test('handles binary strings', () => {
        expect(toNumber('0b1010')).toBe(10);
        expect(toNumber('0B11111')).toBe(31);
    });

    test('handles octal strings', () => {
        expect(toNumber('0o10')).toBe(8);
        expect(toNumber('0O1010')).toBe(520);
    });

    test('handles hexadecimal strings', () => {
        expect(toNumber('0xFF')).toBe(255);
        expect(toNumber('0X123')).toBe(291);
    });

    test('handles bad hexadecimal strings', () => {
        expect(toNumber('-0xFF')).toBeNaN();
        expect(toNumber('-0X123')).toBeNaN();
    });

    test('removes white spaces', () => {
        expect(toNumber('  3.2  ')).toBe(3.2);
        expect(toNumber('\v0b1010\n')).toBe(10);
    });

    test('non-numbers without a number representation', () => {
        expect(toNumber('dog')).toBeNaN();
        expect(toNumber(new Object)).toBeNaN();
        expect(toNumber(Symbol.iterator)).toBeNaN();
        const objWithoutValueOf = {}; // No valueOf
        expect(toNumber(objWithoutValueOf)).toBeNaN();
        const objWithNonFunctionValueOf = { valueOf: 42 }; // valueOf is not a function
        expect(toNumber(objWithNonFunctionValueOf)).toBeNaN();
    });

    test('non-numbers with a number representation', () => {
        expect(toNumber(true)).toBe(1);
        expect(toNumber(false)).toBe(0);
        const valueOf = jest.fn(() => '42');
        const obj = { valueOf };
        expect(toNumber(obj)).toBe(42);
    });

    test('handles objects coercible to 0', () => {
        const objWithValueOfZero = { valueOf: () => 0 };
        expect(toNumber(objWithValueOfZero)).toBe(0);
        const objWithToStringZero = { toString: () => '0' };
        expect(toNumber(objWithToStringZero)).toBe(0);
    });

    test('handles NaN, null and undefined', () => {
        expect(toNumber(NaN)).toBeNaN();
        expect(toNumber(null)).toBe(0);
        expect(toNumber(undefined)).toBeNaN();
    });
});