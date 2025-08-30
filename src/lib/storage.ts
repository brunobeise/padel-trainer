import type { Session } from './types';

const KEYS = {
  ATHLETES: 'pd/athletes',
  SESSIONS: 'pd/sessions',
  SCHEMA_VERSION: 'pd/schemaVersion'
};

export function ensureAthletesSeed(): void {
  if (!localStorage.getItem(KEYS.ATHLETES)) {
    localStorage.setItem(KEYS.ATHLETES, JSON.stringify(["Bruno", "Vinícius"]));
  }
  if (!localStorage.getItem(KEYS.SCHEMA_VERSION)) {
    localStorage.setItem(KEYS.SCHEMA_VERSION, "1");
  }
}

export function loadSessions(): Session[] {
  const data = localStorage.getItem(KEYS.SESSIONS);
  return data ? JSON.parse(data) : [];
}

export function saveSession(session: Session): void {
  const sessions = loadSessions();
  sessions.unshift(session);
  localStorage.setItem(KEYS.SESSIONS, JSON.stringify(sessions));
}

export function deleteSession(id: string): void {
  const sessions = loadSessions().filter(s => s.id !== id);
  localStorage.setItem(KEYS.SESSIONS, JSON.stringify(sessions));
}
