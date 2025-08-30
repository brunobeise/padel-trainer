import type { Session } from './types';
import { mean, distribution } from './stats';
import { SCORE_BUTTONS } from './scores';

export function buildWhatsappReport(session: Session): string {
  const media = mean(session.attempts);
  const dist = distribution(session.attempts);

  const emojiMap: Record<number, string> = {
    1: '😡',      // Péssimo
    3.5: '😞',    // Ruim
    5.5: '😐',    // OK
    7.5: '👍',    // Bom
    9: '🔥',      // Top
    10: '👑',     // GOD
  };

  let report = `🏓 *Treino de ${session.athlete}*
`;
  report += `*Drill:* ${session.drill}
`;
  if (session.descricao) {
    report += `📝 *Descrição:* ${session.descricao}
`;
  }
  report += `
*Tentativas:* ${session.attempts.length}
`;
  report += `*Nota:* ${media.toFixed(2)}
`;

  // Distribuição detalhada
  const distText = SCORE_BUTTONS
    .map(btn => dist[btn.value] > 0 ? `${emojiMap[btn.value]} ${dist[btn.value]} ${btn.label}` : null)
    .filter(Boolean)
    .join('\n');

  report += `*Distribuição:*
${distText}`;

  return report;
}
