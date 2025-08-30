import { useState } from 'react';
import type { SessionDraft, Session } from '../lib/types';
import { SCORE_BUTTONS } from '../lib/scores';
import { mean } from '../lib/stats';
import { saveSession } from '../lib/storage';

interface CaptureProps {
  draft: SessionDraft;
  onFinish: (session: Session) => void;
  onBack: () => void;
}

export function Capture({ draft, onFinish, onBack }: CaptureProps) {
  const [attempts, setAttempts] = useState<number[]>([]);

  const addScore = (score: number) => {
    setAttempts(prev => [...prev, score]);
  };

  const undoLast = () => {
    setAttempts(prev => prev.slice(0, -1));
  };

  const finish = () => {
    const session: Session = {
      id: `sess_${Date.now()}`,
      athlete: draft.athlete,
      drill: draft.drill,
      descricao: draft.descricao,
      attempts,
      createdAt: new Date().toISOString()
    };
    
    saveSession(session);
    onFinish(session);
  };

  const currentMean = mean(attempts);

  return (
    <div className="min-h-screen bg-white p-4">
      <div className="flex items-center mb-6">
        <button onClick={onBack} className="text-blue-600 mr-4">← Voltar</button>
        <div>
          <h1 className="text-xl font-bold">{draft.athlete} · {draft.drill}</h1>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 mb-6">
        {SCORE_BUTTONS.map((button) => {
          const getButtonStyle = (value: number) => {
            switch (value) {
              case 1: return "bg-red-600 hover:bg-red-700";
              case 3.5: return "bg-orange-600 hover:bg-orange-700";
              case 5.5: return "bg-yellow-600 hover:bg-yellow-700";
              case 7.5: return "bg-green-600 hover:bg-green-700";
              case 9: return "bg-blue-600 hover:bg-blue-700";
              case 10: return "bg-purple-600 hover:bg-purple-700";
              default: return "bg-gray-600 hover:bg-gray-700";
            }
          };

          return (
            <button
              key={button.value}
              onClick={() => addScore(button.value)}
              className={`${getButtonStyle(button.value)} text-white rounded-2xl py-12 text-lg font-medium transition-colors`}
            >
              {button.label}
            </button>
          );
        })}
      </div>

      <div className="border-t pt-4 mb-6">
        <div className="text-center mb-4">
          <div className="text-lg">Tentativas: {attempts.length} · Nota: {currentMean.toFixed(2)}</div>
        </div>

        <div className="flex gap-3">
          <button
            onClick={undoLast}
            disabled={attempts.length === 0}
            className="flex-1 bg-orange-600 text-white py-3 rounded-xl text-lg font-medium disabled:bg-gray-300"
          >
            Voltar
          </button>
          <button
            onClick={finish}
            disabled={attempts.length === 0}
            className="flex-1 bg-green-600 text-white py-3 rounded-xl text-lg font-medium disabled:bg-gray-300"
          >
            Finalizar
          </button>
        </div>
      </div>
    </div>
  );
}
