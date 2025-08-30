import type { Session } from '../lib/types';
import { mean } from '../lib/stats';
import { buildWhatsappReport } from '../lib/report';
import { CopyButton } from '../components/CopyButton';
import { distributionText } from '../lib/distributionText';
import { deleteSession } from '../lib/storage';
import { useState } from 'react';

interface ReportProps {
  session: Session;
  onBackHome: () => void;
}

export function Report({ session, onBackHome }: ReportProps) {
  const media = mean(session.attempts);
  const whatsappText = buildWhatsappReport(session);
  const [confirmDelete, setConfirmDelete] = useState(false);

  const handleDelete = () => {
    deleteSession(session.id);
    onBackHome();
  };

  return (
    <div className="min-h-screen bg-white p-4">
      <h1 className="text-2xl font-bold mb-6">Relatório</h1>

      <div className="space-y-4 mb-8">
        <div>
          <h2 className="font-medium text-gray-600">Atleta</h2>
          <p className="text-lg">{session.athlete}</p>
        </div>

        <div>
          <h2 className="font-medium text-gray-600">Drill</h2>
          <p className="text-lg">{session.drill}</p>
        </div>

        {session.descricao && (
          <div>
            <h2 className="font-medium text-gray-600">Descrição</h2>
            <p className="text-lg">{session.descricao}</p>
          </div>
        )}

        <div>
          <h2 className="font-medium text-gray-600">Tentativas</h2>
          <p className="text-lg">{session.attempts.length}</p>
        </div>

        <div>
          <h2 className="font-medium text-gray-600">Nota</h2>
          <p className="text-lg">{media.toFixed(2)}</p>
        </div>

        <div>
          <h2 className="font-medium text-gray-600">Distribuição</h2>
          <p className="text-lg">
            {distributionText(session.attempts)}
          </p>
        </div>
      </div>

      <div className="flex gap-2">
        <CopyButton text={whatsappText}>
          Copiar
        </CopyButton>
        <button
          onClick={() => setConfirmDelete(true)}
          className="bg-red-600 text-white px-6 py-3 rounded-xl text-lg font-medium hover:bg-red-700"
        >
          Excluir
        </button>
      </div>
      {confirmDelete && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 shadow-lg max-w-xs w-full">
            <p className="mb-4 text-center text-lg">Tem certeza que deseja excluir este treino?</p>
            <div className="flex gap-3">
              <button
                onClick={handleDelete}
                className="flex-1 bg-red-600 text-white py-2 rounded-xl font-medium hover:bg-red-700"
              >
                Excluir
              </button>
              <button
                onClick={() => setConfirmDelete(false)}
                className="flex-1 bg-gray-300 text-gray-800 py-2 rounded-xl font-medium"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}

      <button
        onClick={onBackHome}
        className="w-full bg-gray-600 text-white py-3 rounded-xl text-lg font-medium hover:bg-gray-700"
      >
        Voltar à Home
      </button>
    </div>
  );
}
