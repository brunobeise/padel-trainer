import { SCORE_BUTTONS } from './scores';

export function mean(arr: number[]): number {
  if (arr.length === 0) return 0;
  const sum = arr.reduce((acc, val) => acc + val, 0);
  return Math.round((sum / arr.length) * 100) / 100;
}

export function distribution(arr: number[]): Record<number, number> {
  const counts: Record<number, number> = {};
  SCORE_BUTTONS.forEach(btn => { counts[btn.value] = 0; });
  arr.forEach(score => {
    if (score in counts) {
      counts[score]++;
    }
  });
  return counts;
}
