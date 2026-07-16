export function random(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function percent(value: number, total: number) {
  if (total === 0) return 0;
  return Math.round((value / total) * 100);
}

export function cleanText(text: string) {
  return text
    .replace(/\r/g, "")
    .replace(/\t/g, " ")
    .trim();
}
