import { ParsedLW } from "./parser";
import { analyze } from "./analyzer";
import { applyRules } from "./rules";

export interface PredictionResult {

  prediction: string;

  confidence: number;

}

export function predict(data: ParsedLW): PredictionResult {

  const analysis = analyze(data);

  const rules = applyRules(analysis);

  const scoreK = rules.scoreK;

  const scoreB = rules.scoreB;

  let trend:"K"|"B" = scoreK >= scoreB ? "K" : "B";

if(scoreK === scoreB){
  trend = scoreK >= scoreB ? "K" : "B";
}

  const prediction =
    trend === "K"
      ? "K 2-1"
      : "B 2-1";

  const diff =
    Math.abs(scoreK - scoreB);

  let confidence = 65;

if(diff >= 3)
 confidence = 72;

if(diff >= 5)
 confidence = 80;

if(diff >= 8)
 confidence = 87;

if(diff >= 12)
 confidence = 92;

if(diff >= 18)
 confidence = 96;

if(confidence > 96)
 confidence = 96;

  return {

    prediction,
    confidence

};

}
