export function calculateConfidence(diff: number) {

  if (diff >= 18)
    return 97;

  if (diff >= 12)
    return 94;

  if (diff >= 8)
    return 90;

  if (diff >= 5)
    return 84;

  if (diff >= 3)
    return 78;

  return 70;

}