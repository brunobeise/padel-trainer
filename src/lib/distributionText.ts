import { distribution } from './stats';
import { SCORE_BUTTONS } from './scores';

export function distributionText(attempts: number[]): string {
  const dist = distribution(attempts);
  return SCORE_BUTTONS
    .map(btn => dist[btn.value] > 0 ? `${dist[btn.value]} ${btn.label}` : null)
    .filter(Boolean)
    .join(', ');
}
