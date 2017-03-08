import { formatPrice, slugify } from './helpers';

it('should convert cents to dollars', () => {
  const actual = formatPrice(230);
  const expected = '$2.30';
  expect(actual).toBe(expected);
});

it('should convert negative cents values correctly', () => {
  const actual = formatPrice(-2);
  const expected = '$-0.02';
  expect(actual).toBe(expected);
});

it('should convert zero values correctly', () => {
  const actual = formatPrice(0);
  const expected = '$0.00';
  expect(actual).toBe(expected);

  const actualNeg = formatPrice(-0);
  expect(actualNeg).toBe(expected);
});

it('should return slugified text', () => {
  const actual = slugify('--Replace spaces with -');
  const expected = 'replace-spaces-with';
  expect(actual).toBe(expected);
});

it('should return empty string', () => {
  const actual = slugify('');
  const expected = '';
  expect(actual).toBe(expected);
});
