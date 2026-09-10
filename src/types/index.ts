export type Language = "python" | "javascript" | "java" | "cpp" | "php";

export type Role = "USER" | "ADMIN";

export interface UserSession {
  id: string;
  name?: string;
  email?: string;
  role?: Role;
  image?: string;
}

export interface ChatHistoryItem {
  id: string;
  language: Language;
  errorCode?: string;
  sourceCode: string;
  aiResponse: string;
  confidence?: number;
  feedback?: "HELPFUL" | "NOT_HELPFUL" | null;
  createdAt: Date;
}

export interface KnowledgeBaseEntry {
  id: string;
  language: Language;
  errorCode: string;
  title: string;
  description: string;
  solution: string;
  examples?: string;
  tags: string[];
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface ChatRequest {
  sourceCode: string;
  language: Language;
  errorMessage?: string;
}

export interface ChatResponse {
  explanation: string;
  confidence: number;
  mock: boolean;
  ragMatches: number;
  responseTimeMs: number;
}

export interface ProjectMember {
  nama: string;
  peran: string;
  singkatan: string;
  deskripsi: string;
  warna: string;
}