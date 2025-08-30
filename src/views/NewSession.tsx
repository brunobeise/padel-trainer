import { useState } from 'react';
import type { SessionDraft } from '../lib/types';

interface NewSessionProps {
  onStart: (draft: SessionDraft) => void;
  onBack: () => void;
}

export function NewSession({ onStart, onBack }: NewSessionProps) {
  const [athlete, setAthlete] = useState<"Bruno" | "Vinícius">("Bruno");
  const [drill, setDrill] = useState("");
  const [descricao, setDescricao] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!drill.trim()) return;
    
    onStart({
      athlete,
      drill: drill.trim(),
      descricao: descricao.trim() || undefined
    });
  };

  return (
    <div className="min-h-screen bg-white p-4">
      <div className="flex items-center mb-6">
        <button onClick={onBack} className="text-blue-600 mr-4">← Voltar</button>
        <h1 className="text-2xl font-bold">Nova Sessão</h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium mb-2">Atleta</label>
          <div className="space-y-2">
            <label className="flex items-center">
              <input
                type="radio"
                value="Bruno"
                checked={athlete === "Bruno"}
                onChange={(e) => setAthlete(e.target.value as "Bruno")}
                className="mr-2"
              />
              Bruno
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                value="Vinícius"
                checked={athlete === "Vinícius"}
                onChange={(e) => setAthlete(e.target.value as "Vinícius")}
                className="mr-2"
              />
              Vinícius
            </label>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Drill *</label>
          <input
            type="text"
            value={drill}
            onChange={(e) => setDrill(e.target.value)}
            className="w-full border rounded-lg px-3 py-2"
            placeholder="Digite o movimento"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Descrição</label>
          <textarea
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
            className="w-full border rounded-lg px-3 py-2 h-24"
            placeholder="Descrição opcional"
          />
        </div>

        <button
          type="submit"
          disabled={!drill.trim()}
          className="w-full bg-blue-600 text-white py-3 rounded-xl text-lg font-medium disabled:bg-gray-300"
        >
          Iniciar
        </button>
      </form>
    </div>
  );
}
