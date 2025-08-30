import { useEffect, useState } from "react";
import type { Session } from "../lib/types";
import { loadSessions } from "../lib/storage";
import { mean } from "../lib/stats";
import { Card } from "../components/Card";
import { Fab } from "../components/Fab";

interface HomeProps {
  onNewSession: () => void;
  onViewReport: (session: Session) => void;
}

export function Home({ onNewSession, onViewReport }: HomeProps) {
  const [sessions, setSessions] = useState<Session[]>([]);
  const [filter, setFilter] = useState<string>("Todos");

  useEffect(() => {
    setSessions(loadSessions());
  }, []);

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("pt-BR");
  };

  const filteredSessions =
    filter === "Todos"
      ? sessions
      : sessions.filter((s) => s.athlete === filter);

  return (
    <div className="min-h-screen bg-white p-4">
      <h1 className="text-2xl font-bold mb-6">Últimos treinos</h1>

      <div className="flex gap-2 mb-4">
        {["Todos", "Bruno", "Vinícius"].map((opt) => (
          <button
            key={opt}
            onClick={() => setFilter(opt)}
            className={`px-4 py-2 rounded-full border font-medium ${
              filter === opt
                ? "bg-blue-600 text-white"
                : "bg-gray-100 text-gray-700"
            }`}
          >
            {opt}
          </button>
        ))}
      </div>

      <div className="space-y-3 pb-20">
        {filteredSessions.length === 0 ? (
          <p className="text-gray-500 text-center">
            Nenhum treino registrado ainda
          </p>
        ) : (
          filteredSessions.map((session) => (
            <Card key={session.id} onClick={() => onViewReport(session)}>
              <div>
                <div className="font-medium">
                  {session.athlete} · {session.drill}
                </div>
                <div className="text-sm text-gray-600">
                  Média {mean(session.attempts).toFixed(2)} ·{" "}
                  {formatDate(session.createdAt)}
                </div>
              </div>
            </Card>
          ))
        )}
      </div>

      <Fab onClick={onNewSession}>Novo treino</Fab>
    </div>
  );
}
