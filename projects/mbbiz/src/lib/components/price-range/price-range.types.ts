export type MbbizPriceRangeStatus = 'default' | 'error';

export type MbbizPriceRangeField = 'from' | 'to';

export interface MbbizPriceRangeValue {
  from: string;
  to: string;
}

export function parsePriceDigits(value: string): string {
  const digits = value.replace(/\D/g, '');
  if (!digits) {
    return '';
  }

  return digits.replace(/^0+(?=\d)/, '');
}

export function formatPriceVnd(digits: string): string {
  if (!digits) {
    return '';
  }

  return digits.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}

export function caretIndexForDigitCount(formatted: string, digitCount: number): number {
  if (digitCount <= 0) {
    return 0;
  }

  let seen = 0;
  for (let index = 0; index < formatted.length; index += 1) {
    if (formatted[index] === '.') {
      continue;
    }

    seen += 1;
    if (seen === digitCount) {
      return index + 1;
    }
  }

  return formatted.length;
}
