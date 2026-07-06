export function isParseableDate(value: string | Date): boolean {
  if (value instanceof Date) {
    return !Number.isNaN(value.getTime());
  }

  return !Number.isNaN(Date.parse(value));
}
