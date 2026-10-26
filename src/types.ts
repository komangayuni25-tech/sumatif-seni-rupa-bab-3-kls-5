/**
 * Definisi Type & Interface Aplikasi Tes Sumatif
 * Kurikulum Merdeka - Koding & Teknologi Digital
 */

export type QuestionType = 'pg' | 'pgk_kategori' | 'benar_salah' | 'pgk';
export type Difficulty = 'Mudah' | 'Sedang' | 'Sukar';
export type CognitiveLevel = 'L1' | 'L2' | 'L3'; // L1: Pengetahuan/Pemahaman, L2: Penerapan/Aplikasi, L3: Penalaran/Analisis

export interface StudentBirthDate {
  hari: string;
  bulan: string;
  tahun: string;
}

export interface StudentIdentity {
  nama: string;
  noAbsen: string;
  tglLahir: StudentBirthDate;
}

export interface OptionItem {
  id: string; // 'A', 'B', 'C', 'D'
  text: string;
}

export interface StatementItem {
  id: string; // 's1', 's2', 's3'
  text: string;
  correctAnswer: boolean; // true = Benar, false = Salah
}

export interface Question {
  id: number;
  type: QuestionType;
  text: string;
  image?: string; // Gambar/Diagram visual SVG atau URL ilustrasi edukatif
  options?: OptionItem[]; // Untuk 'pg' (4 opsi)
  statements?: StatementItem[]; // Untuk 'pgk_kategori' (3 pernyataan)
  correctAnswer?: string | string[]; // string untuk 'pg' (e.g. 'A')
  difficulty: Difficulty;
  level: CognitiveLevel; // Level kognitif: L1, L2, L3
  element: string; // Elemen Capaian Pembelajaran / Tujuan Pembelajaran
  indicator: string; // Indikator Soal
  explanation: string;
  topic: string;
  scoreWeight?: number; // Bobot skor butir
}

export interface ShuffledQuestion extends Question {
  originalQuestionId: number;
  shuffledOptions?: OptionItem[];
}

export type AnswerValue = string | string[] | Record<string, boolean>;

export interface StudentItemResponse {
  questionId: number;
  score: number; // Skor yang diperoleh pada butir ini
  maxScore: number; // Skor maksimum butir
  status: 'benar' | 'salah' | 'sebagian'; // 'benar': skor penuh, 'salah': 0, 'sebagian': parsial
  userAnswer?: AnswerValue;
}

export interface ExamResult {
  id?: string;
  timestamp: string;
  nama: string;
  noAbsen: string;
  kelas: string;
  tglLahir?: string;
  durasi?: string; // e.g. "14 menit 20 detik"
  durasiDetik?: number;
  benar: number;
  salah: number;
  sebagian?: number;
  totalSkor?: number;
  nilai: number; // Skala 0 - 100
  status: 'Lulus' | 'Belum Lulus';
  itemResponses?: Record<number, StudentItemResponse>; // Key: Question ID (1 - 40)
  detailJawaban?: Record<number, AnswerValue>;
}

export type AppStage = 1 | 2 | 3 | 4;
