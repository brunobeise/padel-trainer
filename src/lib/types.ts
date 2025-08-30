export type Session = {
  id: string;
  athlete: "Bruno" | "Vinícius";
  drill: string;
  descricao?: string;
  attempts: number[];
  createdAt: string;
};

export type SessionDraft = {
  athlete: "Bruno" | "Vinícius";
  drill: string;
  descricao?: string;
};

export type AppState = "home" | "new" | "capture" | "report";
