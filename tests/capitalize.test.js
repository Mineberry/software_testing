import capitalize from '../src/capitalize';

describe('capitalize', () => {
  test('capitalizes a fully uppercase string', () => {
    expect(capitalize('FRED')).toBe('Fred');
  });

  test('capitalizes a fully lowercase string', () => {
    expect(capitalize('fred')).toBe('Fred');
  });

  test('handles mixed case strings', () => {
    expect(capitalize('FrEd')).toBe('Fred');
  });

  test('returns an empty string when given an empty input', () => {
    expect(capitalize('')).toBe('');
  });

  test('handles non-string inputs', () => {
    expect(capitalize(123)).toBe('123');
  });
});