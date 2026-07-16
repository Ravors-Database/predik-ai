export function scorePrediction(confidence: number) {
  if (confidence >= 95)
    return "Sangat Tinggi";

  if (confidence >= 90)
    return "Tinggi";

  if (confidence >= 80)
    return "Sedang";

  return "Rendah";
}