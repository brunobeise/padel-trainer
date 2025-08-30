import { useState, useEffect } from 'react';
import type { AppState, SessionDraft, Session } from './lib/types';
import { ensureAthletesSeed } from './lib/storage';
import { Home } from './views/Home';
import { NewSession } from './views/NewSession';
import { Capture } from './views/Capture';
import { Report } from './views/Report';

function App() {
  const [currentView, setCurrentView] = useState<AppState>('home');
  const [sessionDraft, setSessionDraft] = useState<SessionDraft | null>(null);
  const [reportSession, setReportSession] = useState<Session | null>(null);

  useEffect(() => {
    ensureAthletesSeed();
  }, []);

  const handleNewSession = () => {
    setCurrentView('new');
  };

  const handleStartCapture = (draft: SessionDraft) => {
    setSessionDraft(draft);
    setCurrentView('capture');
  };

  const handleFinishSession = (session: Session) => {
    setReportSession(session);
    setCurrentView('report');
  };

  const handleViewReport = (session: Session) => {
    setReportSession(session);
    setCurrentView('report');
  };

  const handleBackHome = () => {
    setCurrentView('home');
    setSessionDraft(null);
    setReportSession(null);
  };

  const handleBackFromNew = () => {
    setCurrentView('home');
  };

  const handleBackFromCapture = () => {
    setCurrentView('new');
  };

  return (
    <div className="min-h-screen">
      {currentView === 'home' && (
        <Home 
          onNewSession={handleNewSession}
          onViewReport={handleViewReport}
        />
      )}
      
      {currentView === 'new' && (
        <NewSession 
          onStart={handleStartCapture}
          onBack={handleBackFromNew}
        />
      )}
      
      {currentView === 'capture' && sessionDraft && (
        <Capture 
          draft={sessionDraft}
          onFinish={handleFinishSession}
          onBack={handleBackFromCapture}
        />
      )}
      
      {currentView === 'report' && reportSession && (
        <Report 
          session={reportSession}
          onBackHome={handleBackHome}
        />
      )}
    </div>
  );
}

export default App;
