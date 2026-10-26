import React, { useState, useEffect, useMemo } from 'react';
import { CONFIG } from '../config';
import { ExamResult, Question } from '../types';
import { gasService } from '../services/gasService';
import {
  downloadStudentResultPDF,
  downloadExamQuestionsPDF,
  downloadResultsRecapPDF,
  downloadKisiKisiPDF,
  downloadItemAnalysisPDF,
  exportMatrixToCSV,
  exportResultsToCSV,
} from '../utils/pdfGenerator';
import { QuestionEditorModal } from './QuestionEditorModal';
import { GasGuideModal } from './GasGuideModal';
import { GasSettingsModal } from './GasSettingsModal';
import { StudentDetailModal } from './StudentDetailModal';
import {
  Users,
  CheckCircle2,
  XCircle,
  TrendingUp,
  RefreshCw,
  Search,
  Filter,
  Download,
  FileDown,
  Trash2,
  Eye,
  FileSpreadsheet,
  Edit3,
  BookOpen,
  ArrowUpDown,
  ChevronLeft,
  ChevronRight,
  AlertCircle,
  Code2,
  ToggleLeft,
  ToggleRight,
  Check,
  Award,
  Settings,
  Link,
  RotateCcw,
  Sparkles,
  BarChart3,
  FileText,
  Clock,
  Layers,
  GraduationCap,
  Info,
  Target,
} from 'lucide-react';

interface Stage4TeacherPanelProps {
  questions: Question[];
  onUpdateQuestion: (updated: Question) => void;
  allowReview: boolean;
  onToggleAllowReview: (val: boolean) => void;
  onResetDefaultQuestions?: () => void;
}

// Data simulasi sampel kelas 5 jika belum ada respon riil
const generateSampleResults = (questions: Question[]): ExamResult[] => {
  const sampleStudents = [
    { nama: 'I Putu Bagus Mahendra', noAbsen: '01', tglLahir: '12 Mei 2014', duration: '14m 20d', baseScore: 88 },
    { nama: 'Ni Made Sintya Dewi', noAbsen: '02', tglLahir: '24 Agustus 2014', duration: '16m 10d', baseScore: 92 },
    { nama: 'I Komang Arya Wiguna', noAbsen: '03', tglLahir: '05 Januari 2015', duration: '18m 45d', baseScore: 78 },
    { nama: 'Ni Kadek Ayu Lestari', noAbsen: '04', tglLahir: '19 Maret 2014', duration: '15m 05d', baseScore: 82 },
    { nama: 'I Ketut Darma Putra', noAbsen: '05', tglLahir: '30 Juli 2014', duration: '22m 30d', baseScore: 56 },
    { nama: 'Ni Luh Putu Anggraini', noAbsen: '06', tglLahir: '11 Oktober 2014', duration: '13m 50d', baseScore: 96 },
    { nama: 'I Wayan Gede Pratama', noAbsen: '07', tglLahir: '14 Februari 2015', duration: '19m 15d', baseScore: 68 },
    { nama: 'Ni Made Ratna Juwita', noAbsen: '08', tglLahir: '28 Juni 2014', duration: '17m 40d', baseScore: 84 },
    { nama: 'I Gede Bayu Permana', noAbsen: '09', tglLahir: '09 September 2014', duration: '20m 10d', baseScore: 52 },
    { nama: 'Ni Kadek Sri Wahyuni', noAbsen: '10', tglLahir: '03 Desember 2014', duration: '15m 25d', baseScore: 74 },
  ];

  return sampleStudents.map((st, sIdx) => {
    let totalScore = 0;
    let benar = 0;
    let sebagian = 0;
    let salah = 0;
    const itemResponses: Record<number, any> = {};

    questions.forEach((q) => {
      const isHard = q.difficulty === 'Sukar';
      const isPass = Math.random() < (st.baseScore / 100) * (isHard ? 0.75 : 0.95);

      if (q.type === 'pg') {
        const weight = q.scoreWeight || 2;
        if (isPass) {
          benar++;
          totalScore += weight;
          itemResponses[q.id] = { questionId: q.id, score: weight, maxScore: weight, status: 'benar' };
        } else {
          salah++;
          itemResponses[q.id] = { questionId: q.id, score: 0, maxScore: weight, status: 'salah' };
        }
      } else if (q.type === 'pgk_kategori') {
        const maxWeight = q.scoreWeight || 4;
        if (isPass) {
          benar++;
          totalScore += maxWeight;
          itemResponses[q.id] = { questionId: q.id, score: maxWeight, maxScore: maxWeight, status: 'benar' };
        } else if (Math.random() < 0.6) {
          sebagian++;
          const partial = 2.7;
          totalScore += partial;
          itemResponses[q.id] = { questionId: q.id, score: partial, maxScore: maxWeight, status: 'sebagian' };
        } else {
          salah++;
          itemResponses[q.id] = { questionId: q.id, score: 0, maxScore: maxWeight, status: 'salah' };
        }
      }
    });

    const nilai = Math.min(100, Math.round(totalScore));
    return {
      id: `sample-${sIdx + 1}`,
      timestamp: `2026-10-22 09:${10 + sIdx}:00`,
      nama: st.nama,
      noAbsen: st.noAbsen,
      kelas: CONFIG.KELAS,
      tglLahir: st.tglLahir,
      durasi: st.duration,
      benar,
      sebagian,
      salah,
      totalSkor: totalScore,
      nilai,
      status: nilai >= CONFIG.KKTP ? 'Lulus' : 'Belum Lulus',
      itemResponses,
    };
  });
};

export const Stage4TeacherPanel: React.FC<Stage4TeacherPanelProps> = ({
  questions,
  onUpdateQuestion,
  allowReview,
  onToggleAllowReview,
  onResetDefaultQuestions,
}) => {
  // State data hasil siswa
  const [results, setResults] = useState<ExamResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);

  // 3 Tab Utama: 'rekap' | 'matriks' | 'soal'
  const [activeTab, setActiveTab] = useState<'rekap' | 'matriks' | 'soal'>('matriks');

  // Filter & Search
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('Semua');

  // Sorting
  const [sortField, setSortField] = useState<'timestamp' | 'nama' | 'nilai' | 'noAbsen'>('timestamp');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Modal states
  const [selectedStudentForDetail, setSelectedStudentForDetail] = useState<ExamResult | null>(null);
  const [editingQuestion, setEditingQuestion] = useState<Question | null>(null);
  const [showGasGuide, setShowGasGuide] = useState(false);
  const [showGasSettings, setShowGasSettings] = useState(false);
  const [studentToDelete, setStudentToDelete] = useState<ExamResult | null>(null);

  // Ambil data dari Google Apps Script / Local
  const loadDataFromGAS = async () => {
    setIsLoading(true);
    setApiError(null);
    try {
      const data = await gasService.fetchExamResults();
      if (Array.isArray(data) && data.length > 0) {
        setResults(data);
      } else {
        const local = gasService.getLocalExamResults();
        if (local.length > 0) {
          setResults(local);
        } else {
          // Buat data simulasi sampel untuk kemudahan pengujian pertama kali
          const samples = generateSampleResults(questions);
          setResults(samples);
        }
      }
      setIsLoading(false);
    } catch {
      setIsLoading(false);
      const localData = gasService.getLocalExamResults();
      if (localData.length > 0) {
        setResults(localData);
      } else {
        const samples = generateSampleResults(questions);
        setResults(samples);
      }
      setApiError('Data tersinkron dari memori perangkat & data sampel simulasi.');
    }
  };

  useEffect(() => {
    loadDataFromGAS();
  }, []);

  // Muat data sampel simulasi kelas 5
  const handleLoadSamples = () => {
    const samples = generateSampleResults(questions);
    setResults(samples);
  };

  // Handler Hapus Data Siswa
  const handleConfirmDelete = async () => {
    if (!studentToDelete) return;
    try {
      await gasService.deleteExamResult(studentToDelete.timestamp, studentToDelete.nama);
      setResults((prev) => prev.filter((r) => r.nama !== studentToDelete.nama || r.timestamp !== studentToDelete.timestamp));
      setStudentToDelete(null);
    } catch {
      setResults((prev) => prev.filter((r) => r.nama !== studentToDelete.nama || r.timestamp !== studentToDelete.timestamp));
      setStudentToDelete(null);
    }
  };

  // -------------------------------------------------------------
  // RINGKASAN & STATISTIK DISTRIBUSI OTOMATIS (SUMMARY CARDS)
  // -------------------------------------------------------------
  const distributionSummary = useMemo(() => {
    const totalQ = questions.length;

    // 1. Distribusi Elemen / Kompetensi
    const elementsMap: Record<string, number> = {};
    CONFIG.TUJUAN_PEMBELAJARAN.forEach((tp) => {
      elementsMap[tp] = 0;
    });
    questions.forEach((q) => {
      if (elementsMap[q.element] !== undefined) {
        elementsMap[q.element]++;
      } else {
        elementsMap[q.element] = (elementsMap[q.element] || 0) + 1;
      }
    });

    // 2. Distribusi Level Kognitif
    const levelsMap = { L1: 0, L2: 0, L3: 0 };
    questions.forEach((q) => {
      if (q.level === 'L1') levelsMap.L1++;
      else if (q.level === 'L2') levelsMap.L2++;
      else if (q.level === 'L3') levelsMap.L3++;
    });

    // 3. Distribusi Tingkat Kesukaran
    const diffMap = { Mudah: 0, Sedang: 0, Sukar: 0 };
    questions.forEach((q) => {
      if (q.difficulty === 'Mudah') diffMap.Mudah++;
      else if (q.difficulty === 'Sedang') diffMap.Sedang++;
      else if (q.difficulty === 'Sukar') diffMap.Sukar++;
    });

    // 4. Distribusi Bentuk Soal
    const formsMap = { pg: 0, pgk_kategori: 0 };
    questions.forEach((q) => {
      if (q.type === 'pg') formsMap.pg++;
      else if (q.type === 'pgk_kategori') formsMap.pgk_kategori++;
    });

    return {
      totalQ,
      elementsMap,
      levelsMap,
      diffMap,
      formsMap,
    };
  }, [questions]);

  // -------------------------------------------------------------
  // STATISTIK PER BUTIR SOAL UNTUK MATRIKS RESPON
  // -------------------------------------------------------------
  const itemStatistics = useMemo(() => {
    const totalStudents = results.length || 1;

    return questions.map((q) => {
      let fullCorrect = 0;
      let partial = 0;
      let wrong = 0;
      let earnedScoreSum = 0;

      results.forEach((r) => {
        const resp = r.itemResponses?.[q.id];
        if (resp) {
          earnedScoreSum += resp.score;
          if (resp.status === 'benar') fullCorrect++;
          else if (resp.status === 'sebagian') partial++;
          else wrong++;
        } else {
          // Fallback jika belum tersimpan
          if (r.nilai >= CONFIG.KKTP) {
            fullCorrect++;
            earnedScoreSum += q.scoreWeight || 2;
          } else {
            wrong++;
          }
        }
      });

      const maxScorePossible = (q.scoreWeight || (q.type === 'pgk_kategori' ? 4 : 2)) * totalStudents;
      const percent = maxScorePossible > 0 ? Math.round((earnedScoreSum / maxScorePossible) * 100) : 0;

      let empirical = 'Sedang';
      if (percent > 70) empirical = 'Mudah';
      else if (percent < 30) empirical = 'Sukar';

      return {
        questionId: q.id,
        topic: q.topic,
        fullCorrect,
        partial,
        wrong,
        percent,
        empirical,
      };
    });
  }, [questions, results]);

  // Filter & Urutkan Data Siswa
  const filteredAndSortedResults = useMemo(() => {
    let filtered = [...results];

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (r) => r.nama.toLowerCase().includes(q) || r.noAbsen.includes(q)
      );
    }

    if (filterStatus !== 'Semua') {
      filtered = filtered.filter((r) => {
        const isPass = r.status === 'Lulus' || r.nilai >= CONFIG.KKTP;
        return filterStatus === 'Lulus' ? isPass : !isPass;
      });
    }

    filtered.sort((a, b) => {
      let comp = 0;
      if (sortField === 'timestamp') comp = (a.timestamp || '').localeCompare(b.timestamp || '');
      else if (sortField === 'nama') comp = a.nama.localeCompare(b.nama);
      else if (sortField === 'nilai') comp = a.nilai - b.nilai;
      else if (sortField === 'noAbsen') comp = parseInt(a.noAbsen || '0') - parseInt(b.noAbsen || '0');
      return sortDirection === 'asc' ? comp : -comp;
    });

    return filtered;
  }, [results, searchQuery, filterStatus, sortField, sortDirection]);

  // Statistik Keseluruhan Kelas
  const totalCount = results.length;
  const lulusCount = results.filter((r) => r.status === 'Lulus' || r.nilai >= CONFIG.KKTP).length;
  const remedialCount = totalCount - lulusCount;
  const avgScore = totalCount > 0 ? Math.round(results.reduce((acc, r) => acc + (r.nilai || 0), 0) / totalCount) : 0;

  return (
    <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 space-y-6">
      {/* Header Panel Guru */}
      <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-blue-700 text-white flex items-center justify-center shadow-md">
              <GraduationCap className="w-7 h-7" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-blue-800 bg-blue-50 px-2.5 py-0.5 rounded-md border border-blue-200">
                  Panel Guru Kelas {CONFIG.KELAS}
                </span>
                <span className="text-xs font-bold text-slate-500">
                  KKTP: <strong className="text-blue-700">{CONFIG.KKTP} Poin</strong>
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight mt-0.5">
                {CONFIG.SEKOLAH}
              </h2>
              <p className="text-xs text-slate-500">
                Mata Pelajaran: <strong>{CONFIG.MATA_PELAJARAN}</strong> • Materi: <strong>{CONFIG.MATERI}</strong>
              </p>
            </div>
          </div>

          {/* Quick Actions Header */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => onToggleAllowReview(!allowReview)}
              className={`inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold rounded-xl transition-all border cursor-pointer ${
                allowReview
                  ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                  : 'bg-slate-100 text-slate-600 border-slate-300'
              }`}
              title="Aktifkan/nonaktifkan kunci jawaban yang dapat dilihat siswa setelah ujian selesai"
            >
              {allowReview ? <ToggleRight className="w-4 h-4 text-emerald-600" /> : <ToggleLeft className="w-4 h-4 text-slate-400" />}
              <span>{allowReview ? 'Kunci Jawaban Siswa ON' : 'Kunci Jawaban Siswa OFF'}</span>
            </button>

            <button
              onClick={() => setShowGasSettings(true)}
              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors border border-slate-300 cursor-pointer"
              title="Atur URL Google Apps Script Web App"
            >
              <Settings className="w-3.5 h-3.5" />
              <span>Koneksi Spreadsheet</span>
            </button>

            <button
              onClick={loadDataFromGAS}
              disabled={isLoading}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl transition-colors shadow-xs cursor-pointer disabled:opacity-50"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin' : ''}`} />
              <span>Sinkron Data</span>
            </button>
          </div>
        </div>
      </div>

      {apiError && (
        <div className="p-3.5 rounded-2xl bg-blue-50/80 border border-blue-200 text-blue-900 text-xs flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Info className="w-4 h-4 text-blue-600 shrink-0" />
            <span>{apiError}</span>
          </div>
          <button
            onClick={handleLoadSamples}
            className="text-[11px] font-bold underline hover:text-blue-700 shrink-0"
          >
            Muat Ulang Simulasi
          </button>
        </div>
      )}

      {/* STATS OVERVIEW CARDS */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-500 mb-1">
            <span>Total Peserta Ujian</span>
            <Users className="w-4 h-4 text-blue-600" />
          </div>
          <span className="text-2xl sm:text-3xl font-black text-slate-900">{totalCount}</span>
          <span className="text-[11px] text-slate-400 block mt-0.5">Siswa Kelas {CONFIG.KELAS}</span>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between text-xs font-semibold text-emerald-700 mb-1">
            <span>Tuntas (Mencapai KKTP)</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          </div>
          <span className="text-2xl sm:text-3xl font-black text-emerald-700">{lulusCount}</span>
          <span className="text-[11px] text-emerald-600 block mt-0.5">
            {totalCount > 0 ? Math.round((lulusCount / totalCount) * 100) : 0}% Kelulusan
          </span>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between text-xs font-semibold text-rose-700 mb-1">
            <span>Perlu Remedial</span>
            <XCircle className="w-4 h-4 text-rose-600" />
          </div>
          <span className="text-2xl sm:text-3xl font-black text-rose-700">{remedialCount}</span>
          <span className="text-[11px] text-rose-600 block mt-0.5">Nilai &lt; {CONFIG.KKTP} Poin</span>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between text-xs font-semibold text-blue-700 mb-1">
            <span>Rata-Rata Kelas</span>
            <TrendingUp className="w-4 h-4 text-blue-600" />
          </div>
          <span className="text-2xl sm:text-3xl font-black text-blue-700">{avgScore}</span>
          <span className="text-[11px] text-slate-400 block mt-0.5">Skala Nilai 0 - 100</span>
        </div>
      </div>

      {/* 3 TAB NAVIGATION BAR */}
      <div className="bg-white rounded-t-3xl border border-b-0 border-slate-200 p-2 sm:p-3 flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-1 sm:gap-2">
          <button
            onClick={() => setActiveTab('matriks')}
            className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              activeTab === 'matriks'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <BarChart3 className="w-4 h-4" />
            <span>Matriks Respon {questions.length} Butir</span>
          </button>

          <button
            onClick={() => setActiveTab('rekap')}
            className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              activeTab === 'rekap'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>Rekapitulasi Nilai Siswa</span>
          </button>

          <button
            onClick={() => setActiveTab('soal')}
            className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              activeTab === 'soal'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>Kisi-Kisi &amp; Bank Soal</span>
          </button>
        </div>

        {/* Global Export Actions based on Active Tab */}
        <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
          {activeTab === 'matriks' && (
            <>
              <button
                onClick={() => exportMatrixToCSV(results, questions)}
                className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-bold text-slate-800 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors border border-slate-300 cursor-pointer"
                title={`Ekspor Matriks Respon Siswa (Butir 1-${questions.length}) ke Format Excel/CSV`}
              >
                <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-600" />
                <span>Ekspor CSV Matriks</span>
              </button>
              <button
                onClick={() => downloadItemAnalysisPDF(results, questions)}
                className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-bold text-white bg-blue-700 hover:bg-blue-800 rounded-xl transition-colors shadow-xs cursor-pointer"
                title="Cetak/Unduh Laporan PDF Analisis Butir Soal & Daya Serap Resmi"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Cetak PDF Analisis Butir</span>
              </button>
            </>
          )}

          {activeTab === 'rekap' && (
            <>
              <button
                onClick={() => exportResultsToCSV(results)}
                className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-bold text-slate-800 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors border border-slate-300 cursor-pointer"
              >
                <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-600" />
                <span>Ekspor CSV Rekap</span>
              </button>
              <button
                onClick={() => downloadResultsRecapPDF(results)}
                className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-bold text-white bg-blue-700 hover:bg-blue-800 rounded-xl transition-colors shadow-xs cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Unduh PDF Rekap</span>
              </button>
            </>
          )}

          {activeTab === 'soal' && (
            <>
              <button
                onClick={() => downloadKisiKisiPDF(questions)}
                className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl transition-colors shadow-xs cursor-pointer"
                title="Unduh Dokumen Kedinasan Kisi-Kisi Penulisan Soal Resmi"
              >
                <FileText className="w-3.5 h-3.5" />
                <span>Unduh PDF Kisi-Kisi Soal</span>
              </button>
              <button
                onClick={() => downloadExamQuestionsPDF(questions)}
                className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-bold text-slate-800 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors border border-slate-300 cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Unduh Naskah Soal (PDF)</span>
              </button>
            </>
          )}
        </div>
      </div>

      {/* ============================================================== */}
      {/* TAB 1: MATRIKS RESPON SISWA PER BUTIR SOAL (INTERAKTIF)        */}
      {/* ============================================================== */}
      {activeTab === 'matriks' && (
        <div className="bg-white rounded-b-3xl p-5 sm:p-6 shadow-sm border border-slate-200 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
            <div>
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <span>Matriks Respon Butir Soal Siswa ({questions.length} Butir)</span>
                <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200">
                  {results.length} Siswa
                </span>
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Klik baris nama siswa untuk membuka <strong>Detail Analisis &amp; Rekomendasi Remedial</strong>.
              </p>
            </div>

            {/* Petunjuk Warna Matriks */}
            <div className="flex flex-wrap items-center gap-3 text-xs bg-slate-50 p-2.5 rounded-xl border border-slate-200">
              <span className="flex items-center gap-1.5 font-bold text-emerald-800">
                <span className="w-3.5 h-3.5 rounded bg-emerald-500 inline-block shadow-2xs"></span>
                <span>Benar (Skor Penuh)</span>
              </span>
              <span className="flex items-center gap-1.5 font-bold text-amber-800">
                <span className="w-3.5 h-3.5 rounded bg-amber-400 inline-block shadow-2xs"></span>
                <span>Sebagian (PGK Kategori)</span>
              </span>
              <span className="flex items-center gap-1.5 font-bold text-rose-800">
                <span className="w-3.5 h-3.5 rounded bg-rose-500 inline-block shadow-2xs"></span>
                <span>Salah (Skor 0)</span>
              </span>
            </div>
          </div>

          {/* Tabel Matriks Respon Siswa (Scroll Horizontal Responsif) */}
          <div className="overflow-x-auto border border-slate-200 rounded-2xl shadow-2xs">
            <table className="w-full text-xs text-left border-collapse">
              <thead>
                <tr className="bg-slate-900 text-white font-bold">
                  <th className="py-3 px-2 text-center sticky left-0 z-20 bg-slate-900 border-r border-slate-800 w-10">
                    No
                  </th>
                  <th className="py-3 px-3 sticky left-10 z-20 bg-slate-900 border-r border-slate-800 min-w-[160px]">
                    Nama Siswa
                  </th>
                  <th className="py-3 px-2 text-center border-r border-slate-800 w-12">
                    Absen
                  </th>

                  {/* 40 Kolom Butir Soal */}
                  {questions.map((q) => (
                    <th
                      key={q.id}
                      className="py-2 px-1 text-center border-r border-slate-800 min-w-[28px] max-w-[32px] text-[10px]"
                      title={`Soal #${q.id}: ${q.topic} (${q.type === 'pg' ? 'PG' : 'PGK Kategori'})`}
                    >
                      <span>Q{q.id}</span>
                      <span className="block text-[8px] font-normal text-slate-400">
                        {q.type === 'pg' ? 'PG' : 'Kat'}
                      </span>
                    </th>
                  ))}

                  {/* Rekapitulasi Kanan */}
                  <th className="py-3 px-2 text-center border-l-2 border-slate-800 bg-slate-800 text-white min-w-[55px]">
                    Skor
                  </th>
                  <th className="py-3 px-2 text-center bg-slate-800 text-white min-w-[55px]">
                    Nilai
                  </th>
                  <th className="py-3 px-2 text-center bg-slate-800 text-white min-w-[70px]">
                    Status
                  </th>
                  <th className="py-3 px-2 text-center bg-slate-800 text-white min-w-[65px]">
                    Durasi
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {results.length === 0 ? (
                  <tr>
                    <td colSpan={questions.length + 7} className="py-8 text-center text-slate-500">
                      Belum ada respons siswa. Klik tombol "Muat Ulang Simulasi" untuk menguji matriks.
                    </td>
                  </tr>
                ) : (
                  results.map((r, rIdx) => {
                    const isPass = r.status === 'Lulus' || r.nilai >= CONFIG.KKTP;

                    return (
                      <tr
                        key={r.id || `${r.nama}-${rIdx}`}
                        onClick={() => setSelectedStudentForDetail(r)}
                        className="hover:bg-blue-50/60 transition-colors cursor-pointer group"
                      >
                        <td className="py-2.5 px-2 text-center font-mono text-slate-500 sticky left-0 z-10 bg-white group-hover:bg-blue-50/80 border-r border-slate-200">
                          {rIdx + 1}
                        </td>
                        <td className="py-2.5 px-3 font-bold text-slate-900 sticky left-10 z-10 bg-white group-hover:bg-blue-50/80 border-r border-slate-200 whitespace-nowrap">
                          <span className="group-hover:text-blue-700 underline-offset-2 group-hover:underline">
                            {r.nama}
                          </span>
                        </td>
                        <td className="py-2.5 px-2 text-center font-mono font-semibold text-slate-600 border-r border-slate-200">
                          {r.noAbsen}
                        </td>

                        {/* 40 Sel Respon Soal */}
                        {questions.map((q) => {
                          const resp = r.itemResponses?.[q.id];
                          const status = resp?.status || (r.nilai >= 70 ? 'benar' : 'salah');
                          const score = resp?.score ?? (status === 'benar' ? (q.scoreWeight || 2) : 0);

                          let cellBg = 'bg-rose-500 text-white';
                          let cellTitle = `Soal #${q.id}: Salah (0 Poin)`;
                          if (status === 'benar') {
                            cellBg = 'bg-emerald-500 text-white font-bold';
                            cellTitle = `Soal #${q.id}: Benar Penuh (${score} Poin)`;
                          } else if (status === 'sebagian') {
                            cellBg = 'bg-amber-400 text-slate-900 font-bold';
                            cellTitle = `Soal #${q.id}: Benar Sebagian (${score} Poin)`;
                          }

                          return (
                            <td
                              key={q.id}
                              className={`py-1.5 px-0.5 text-center border-r border-slate-100 ${cellBg}`}
                              title={`${r.nama} - ${cellTitle}`}
                            >
                              <span className="text-[10px] block font-mono font-bold leading-tight">
                                {score}
                              </span>
                            </td>
                          );
                        })}

                        {/* Rekap Kanan */}
                        <td className="py-2.5 px-2 text-center font-bold text-slate-800 border-l-2 border-slate-300 bg-slate-50">
                          {r.totalSkor ?? r.nilai}
                        </td>
                        <td className="py-2.5 px-2 text-center font-black text-sm bg-slate-50">
                          <span className={isPass ? 'text-emerald-700' : 'text-rose-700'}>
                            {r.nilai}
                          </span>
                        </td>
                        <td className="py-2.5 px-2 text-center bg-slate-50">
                          <span
                            className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-bold ${
                              isPass ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                            }`}
                          >
                            {isPass ? 'Tuntas' : 'Remedial'}
                          </span>
                        </td>
                        <td className="py-2.5 px-2 text-center font-mono text-[11px] text-slate-500 bg-slate-50">
                          {r.durasi || '-'}
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>

              {/* BARIS STATISTIK PER BUTIR SOAL DI BAGIAN BAWAH */}
              <tfoot>
                {/* Baris 1: Jumlah Siswa Menjawab Benar */}
                <tr className="bg-slate-100 font-bold text-slate-800 border-t-2 border-slate-300">
                  <td colSpan={3} className="py-2.5 px-3 sticky left-0 z-10 bg-slate-100 border-r border-slate-300 text-right">
                    Jumlah Siswa Benar:
                  </td>
                  {itemStatistics.map((stat) => (
                    <td
                      key={stat.questionId}
                      className="py-2 px-0.5 text-center border-r border-slate-200 font-mono text-[11px] font-bold text-emerald-800 bg-emerald-50"
                      title={`Soal #${stat.questionId}: ${stat.fullCorrect} siswa menjawab benar`}
                    >
                      {stat.fullCorrect}
                    </td>
                  ))}
                  <td colSpan={4} className="bg-slate-100 border-l-2 border-slate-300"></td>
                </tr>

                {/* Baris 2: Persentase Ketercapaian Butir (%) */}
                <tr className="bg-slate-50 font-bold text-slate-800 border-t border-slate-200">
                  <td colSpan={3} className="py-2.5 px-3 sticky left-0 z-10 bg-slate-50 border-r border-slate-300 text-right">
                    Daya Serap Butir (%):
                  </td>
                  {itemStatistics.map((stat) => (
                    <td
                      key={stat.questionId}
                      className="py-2 px-0.5 text-center border-r border-slate-200 font-mono text-[10px] font-bold text-blue-900 bg-blue-50"
                      title={`Soal #${stat.questionId}: Daya serap ${stat.percent}%`}
                    >
                      {stat.percent}%
                    </td>
                  ))}
                  <td colSpan={4} className="bg-slate-50 border-l-2 border-slate-300"></td>
                </tr>

                {/* Baris 3: Klasifikasi Empiris Kesukaran */}
                <tr className="bg-slate-100 font-bold text-slate-800 border-t border-slate-200">
                  <td colSpan={3} className="py-2.5 px-3 sticky left-0 z-10 bg-slate-100 border-r border-slate-300 text-right">
                    Klasifikasi Empiris:
                  </td>
                  {itemStatistics.map((stat) => (
                    <td
                      key={stat.questionId}
                      className={`py-2 px-0.5 text-center border-r border-slate-200 text-[9px] font-bold uppercase ${
                        stat.empirical === 'Mudah'
                          ? 'bg-emerald-100 text-emerald-800'
                          : stat.empirical === 'Sedang'
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-rose-100 text-rose-800'
                      }`}
                      title={`Soal #${stat.questionId}: Klasifikasi ${stat.empirical}`}
                    >
                      {stat.empirical.charAt(0)}
                    </td>
                  ))}
                  <td colSpan={4} className="bg-slate-100 border-l-2 border-slate-300 text-[10px] text-center text-slate-500">
                    M: &gt;70% | S: 30-70% | K: &lt;30%
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* TAB 2: REKAPITULASI DAFTAR NILAI SISWA                         */}
      {/* ============================================================== */}
      {activeTab === 'rekap' && (
        <div className="bg-white rounded-b-3xl p-5 sm:p-6 shadow-sm border border-slate-200 space-y-4">
          {/* Filter & Search Bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="relative w-full sm:w-72">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Cari nama atau nomor absen..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <span className="text-xs font-semibold text-slate-500">Filter Status:</span>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-3 py-2 text-xs rounded-xl border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="Semua">Semua Status</option>
                <option value="Lulus">Tuntas (&gt;= {CONFIG.KKTP})</option>
                <option value="Remedial">Remedial (&lt; {CONFIG.KKTP})</option>
              </select>
            </div>
          </div>

          {/* Tabel Rekapitulasi Nilai */}
          <div className="overflow-x-auto border border-slate-200 rounded-2xl">
            <table className="w-full text-xs text-left">
              <thead className="bg-slate-50 text-slate-700 font-bold border-b border-slate-200">
                <tr>
                  <th className="py-3 px-3 text-center">No</th>
                  <th className="py-3 px-3">Waktu Submit</th>
                  <th className="py-3 px-3">Nama Siswa</th>
                  <th className="py-3 px-3 text-center">Absen</th>
                  <th className="py-3 px-3 text-center">Benar</th>
                  <th className="py-3 px-3 text-center">Sebagian</th>
                  <th className="py-3 px-3 text-center">Salah</th>
                  <th className="py-3 px-3 text-center">Nilai</th>
                  <th className="py-3 px-3 text-center">Status</th>
                  <th className="py-3 px-3 text-center">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredAndSortedResults.length === 0 ? (
                  <tr>
                    <td colSpan={10} className="py-8 text-center text-slate-500">
                      Tidak ada data siswa yang cocok dengan kriteria pencarian.
                    </td>
                  </tr>
                ) : (
                  filteredAndSortedResults.map((row, idx) => {
                    const isPass = row.status === 'Lulus' || row.nilai >= CONFIG.KKTP;

                    return (
                      <tr key={row.id || idx} className="hover:bg-slate-50/80 transition-colors">
                        <td className="py-3 px-3 text-center font-mono text-slate-500">{idx + 1}</td>
                        <td className="py-3 px-3 text-slate-600 font-mono text-[11px] whitespace-nowrap">{row.timestamp}</td>
                        <td className="py-3 px-3 font-bold text-slate-900">{row.nama}</td>
                        <td className="py-3 px-3 text-center font-mono font-semibold">{row.noAbsen}</td>
                        <td className="py-3 px-3 text-center font-bold text-emerald-700">{row.benar}</td>
                        <td className="py-3 px-3 text-center font-bold text-amber-700">{row.sebagian || 0}</td>
                        <td className="py-3 px-3 text-center font-bold text-rose-700">{row.salah}</td>
                        <td className="py-3 px-3 text-center">
                          <span className={`font-black text-sm px-2 py-0.5 rounded ${isPass ? 'bg-emerald-50 text-emerald-800' : 'bg-rose-50 text-rose-800'}`}>
                            {row.nilai}
                          </span>
                        </td>
                        <td className="py-3 px-3 text-center">
                          <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${isPass ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'}`}>
                            {isPass ? 'Tuntas' : 'Remedial'}
                          </span>
                        </td>
                        <td className="py-3 px-3 text-center">
                          <div className="flex items-center justify-center gap-1.5">
                            <button
                              onClick={() => setSelectedStudentForDetail(row)}
                              className="p-1.5 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-lg transition-colors"
                              title="Lihat Detail Analisis Siswa"
                            >
                              <Eye className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => downloadStudentResultPDF(row)}
                              className="p-1.5 text-emerald-600 hover:text-emerald-800 hover:bg-emerald-50 rounded-lg transition-colors"
                              title="Download Lembar Hasil Siswa (PDF)"
                            >
                              <Download className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => setStudentToDelete(row)}
                              className="p-1.5 text-rose-500 hover:text-rose-700 hover:bg-rose-50 rounded-lg transition-colors"
                              title="Hapus Data Siswa"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* TAB 3: KISI-KISI, DISTRIBUSI OTOMATIS & BANK SOAL (40 BUTIR)   */}
      {/* ============================================================== */}
      {activeTab === 'soal' && (
        <div className="bg-white rounded-b-3xl p-5 sm:p-6 shadow-sm border border-slate-200 space-y-6">
          {/* HEADER SUMMARY CARDS: DISTRIBUSI OTOMATIS */}
          <div>
            <h3 className="text-base font-bold text-slate-900 mb-1">
              Kartu Ringkasan Distribusi Kisi-Kisi Soal (Otomatis)
            </h3>
            <p className="text-xs text-slate-500">
              Analisis proporsi capaian pembelajaran, level kognitif, tingkat kesukaran, dan bentuk soal ({questions.length} butir).
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Card 1: Distribusi Elemen / Kompetensi */}
            <div className="p-4 rounded-2xl bg-blue-50/70 border border-blue-200 space-y-2.5">
              <div className="flex items-center gap-2 text-blue-900 font-bold text-xs uppercase tracking-wider">
                <Target className="w-4 h-4 text-blue-600" />
                <span>Distribusi Elemen</span>
              </div>
              <div className="space-y-1.5 text-xs text-slate-700">
                {CONFIG.TUJUAN_PEMBELAJARAN.map((tp, idx) => {
                  const count = distributionSummary.elementsMap[tp] || 0;
                  const pct = Math.round((count / distributionSummary.totalQ) * 100);
                  return (
                    <div key={idx} className="bg-white p-2 rounded-lg border border-blue-100">
                      <div className="flex justify-between items-center font-semibold text-slate-800">
                        <span className="truncate pr-1 text-[11px]">TP #{idx + 1}</span>
                        <span className="font-bold text-blue-700 shrink-0">{count} Butir ({pct}%)</span>
                      </div>
                      <p className="text-[10px] text-slate-500 truncate mt-0.5">{tp}</p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Card 2: Distribusi Level Kognitif */}
            <div className="p-4 rounded-2xl bg-indigo-50/70 border border-indigo-200 space-y-2.5">
              <div className="flex items-center gap-2 text-indigo-900 font-bold text-xs uppercase tracking-wider">
                <BrainCircuitIcon className="w-4 h-4 text-indigo-600" />
                <span>Level Kognitif</span>
              </div>
              <div className="space-y-2 text-xs">
                <div className="bg-white p-2.5 rounded-lg border border-indigo-100 flex justify-between items-center">
                  <div>
                    <span className="font-bold text-slate-800 block">L1 (Pengetahuan/Pemahaman)</span>
                    <span className="text-[10px] text-slate-400">Recall &amp; Basic Facts</span>
                  </div>
                  <span className="font-extrabold text-indigo-700 text-sm">
                    {distributionSummary.levelsMap.L1} Butir ({Math.round((distributionSummary.levelsMap.L1 / distributionSummary.totalQ) * 100)}%)
                  </span>
                </div>
                <div className="bg-white p-2.5 rounded-lg border border-indigo-100 flex justify-between items-center">
                  <div>
                    <span className="font-bold text-slate-800 block">L2 (Aplikasi/Penerapan)</span>
                    <span className="text-[10px] text-slate-400">Implementasi &amp; Kasus</span>
                  </div>
                  <span className="font-extrabold text-indigo-700 text-sm">
                    {distributionSummary.levelsMap.L2} Butir ({Math.round((distributionSummary.levelsMap.L2 / distributionSummary.totalQ) * 100)}%)
                  </span>
                </div>
                <div className="bg-white p-2.5 rounded-lg border border-indigo-100 flex justify-between items-center">
                  <div>
                    <span className="font-bold text-slate-800 block">L3 (Penalaran/Analisis)</span>
                    <span className="text-[10px] text-slate-400">Evaluasi &amp; Problem Solving</span>
                  </div>
                  <span className="font-extrabold text-indigo-700 text-sm">
                    {distributionSummary.levelsMap.L3} Butir ({Math.round((distributionSummary.levelsMap.L3 / distributionSummary.totalQ) * 100)}%)
                  </span>
                </div>
              </div>
            </div>

            {/* Card 3: Distribusi Tingkat Kesukaran */}
            <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200 space-y-2.5">
              <div className="flex items-center gap-2 text-emerald-900 font-bold text-xs uppercase tracking-wider">
                <BarChart3 className="w-4 h-4 text-emerald-600" />
                <span>Tingkat Kesukaran</span>
              </div>
              <div className="space-y-2 text-xs">
                <div className="bg-white p-2.5 rounded-lg border border-emerald-100 flex justify-between items-center">
                  <span className="font-bold text-emerald-800">Mudah</span>
                  <span className="font-extrabold text-emerald-700 text-sm">
                    {distributionSummary.diffMap.Mudah} Butir ({Math.round((distributionSummary.diffMap.Mudah / distributionSummary.totalQ) * 100)}%)
                  </span>
                </div>
                <div className="bg-white p-2.5 rounded-lg border border-emerald-100 flex justify-between items-center">
                  <span className="font-bold text-blue-800">Sedang</span>
                  <span className="font-extrabold text-blue-700 text-sm">
                    {distributionSummary.diffMap.Sedang} Butir ({Math.round((distributionSummary.diffMap.Sedang / distributionSummary.totalQ) * 100)}%)
                  </span>
                </div>
                <div className="bg-white p-2.5 rounded-lg border border-emerald-100 flex justify-between items-center">
                  <span className="font-bold text-rose-800">Sukar</span>
                  <span className="font-extrabold text-rose-700 text-sm">
                    {distributionSummary.diffMap.Sukar} Butir ({Math.round((distributionSummary.diffMap.Sukar / distributionSummary.totalQ) * 100)}%)
                  </span>
                </div>
              </div>
            </div>

            {/* Card 4: Distribusi Bentuk Soal */}
            <div className="p-4 rounded-2xl bg-purple-50/70 border border-purple-200 space-y-2.5">
              <div className="flex items-center gap-2 text-purple-900 font-bold text-xs uppercase tracking-wider">
                <FileText className="w-4 h-4 text-purple-600" />
                <span>Bentuk Soal &amp; Bobot</span>
              </div>
              <div className="space-y-2 text-xs">
                <div className="bg-white p-2.5 rounded-lg border border-purple-100 flex justify-between items-center">
                  <div>
                    <span className="font-bold text-slate-800 block">Pilihan Ganda (PG)</span>
                    <span className="text-[10px] text-slate-400">Bobot: 2 poin / butir</span>
                  </div>
                  <span className="font-extrabold text-purple-700 text-sm">
                    {distributionSummary.formsMap.pg} Butir ({distributionSummary.formsMap.pg * 2} Poin)
                  </span>
                </div>
                <div className="bg-white p-2.5 rounded-lg border border-purple-100 flex justify-between items-center">
                  <div>
                    <span className="font-bold text-slate-800 block">PGK Kategori (3 B/S)</span>
                    <span className="text-[10px] text-slate-400">Bobot: 4 poin / butir</span>
                  </div>
                  <span className="font-extrabold text-purple-700 text-sm">
                    {distributionSummary.formsMap.pgk_kategori} Butir ({distributionSummary.formsMap.pgk_kategori * 4} Poin)
                  </span>
                </div>
                <div className="p-2 bg-purple-100/60 rounded-lg text-center font-bold text-purple-900 text-xs">
                  Total Asesmen: 100 Poin
                </div>
              </div>
            </div>
          </div>

          {/* Reset Action */}
          <div className="flex items-center justify-between pt-4 border-t border-slate-100">
            <span className="text-xs text-slate-500 font-medium">
              Menampilkan {questions.length} butir soal Kurikulum Merdeka mapel {CONFIG.MATA_PELAJARAN} Kelas {CONFIG.KELAS}.
            </span>
            {onResetDefaultQuestions && (
              <button
                type="button"
                onClick={() => {
                  if (confirm(`Kembalikan seluruh bank soal ke ${questions.length} butir standar Seni Rupa (40 PG, 5 PGK Kategori)?`)) {
                    onResetDefaultQuestions();
                  }
                }}
                className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors border border-slate-300 cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset ke 45 Soal Standar</span>
              </button>
            )}
          </div>

          {/* Daftar Butir Soal */}
          <div className="space-y-3 pt-2">
            {questions.map((q) => (
              <div
                key={q.id}
                className="p-4 rounded-2xl border border-slate-200 hover:border-slate-300 bg-slate-50/50 transition-colors space-y-2.5"
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="font-extrabold text-xs px-2.5 py-1 rounded-lg bg-blue-700 text-white">
                      #{q.id}
                    </span>
                    <span className="text-xs font-bold px-2 py-0.5 rounded bg-slate-200 text-slate-800">
                      {q.type === 'pg' ? 'Pilihan Ganda' : 'PGK Kategori (3 B/S)'}
                    </span>
                    <span className="text-xs font-semibold text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                      Level: {q.level || 'L1'}
                    </span>
                    <span className="text-xs font-medium text-slate-600">{q.topic}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span
                      className={`text-[11px] font-bold px-2.5 py-0.5 rounded ${
                        q.difficulty === 'Mudah'
                          ? 'bg-emerald-100 text-emerald-800'
                          : q.difficulty === 'Sedang'
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-rose-100 text-rose-800'
                      }`}
                    >
                      {q.difficulty}
                    </span>
                    <button
                      onClick={() => setEditingQuestion(q)}
                      className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-semibold text-blue-700 bg-blue-50 hover:bg-blue-100 rounded-lg border border-blue-200 transition-colors cursor-pointer"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                      <span>Edit</span>
                    </button>
                  </div>
                </div>

                {/* Indikator Soal */}
                <p className="text-[11px] text-slate-500 bg-white p-2 rounded-lg border border-slate-100">
                  <strong>Indikator:</strong> {q.indicator}
                </p>

                {/* Gambar Soal jika ada */}
                {q.image && (
                  <div className="p-3 bg-white border border-slate-200 rounded-xl overflow-hidden flex justify-center max-w-sm">
                    {q.image.startsWith('<svg') ? (
                      <div dangerouslySetInnerHTML={{ __html: q.image }} className="w-full flex justify-center scale-90" />
                    ) : (
                      <img src={q.image} alt={`Ilustrasi Soal #${q.id}`} className="max-h-36 object-contain" />
                    )}
                  </div>
                )}

                <p className="text-xs sm:text-sm text-slate-900 font-medium whitespace-pre-line">
                  {q.text}
                </p>

                {/* Opsi Jawaban PG */}
                {q.options && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                    {q.options.map((opt) => {
                      const isCorrect = q.correctAnswer === opt.id;
                      return (
                        <div
                          key={opt.id}
                          className={`p-2 rounded-lg border flex items-start gap-2 ${
                            isCorrect
                              ? 'bg-emerald-50 border-emerald-300 text-emerald-950 font-bold'
                              : 'bg-white border-slate-200 text-slate-700'
                          }`}
                        >
                          <span className="w-5 font-bold">{opt.id}.</span>
                          <span className="flex-1">{opt.text}</span>
                          {isCorrect && <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />}
                        </div>
                      );
                    })}
                  </div>
                )}

                {/* Pernyataan PGK Kategori */}
                {q.statements && (
                  <div className="space-y-1.5 text-xs">
                    {q.statements.map((st, sIdx) => (
                      <div
                        key={st.id}
                        className="p-2 bg-white rounded-lg border border-slate-200 flex items-center justify-between"
                      >
                        <span>
                          <strong className="mr-1">{sIdx + 1}.</strong>
                          {st.text}
                        </span>
                        <span
                          className={`font-bold px-2 py-0.5 rounded text-[10px] ${
                            st.correctAnswer
                              ? 'bg-emerald-100 text-emerald-800'
                              : 'bg-rose-100 text-rose-800'
                          }`}
                        >
                          {st.correctAnswer ? 'BENAR' : 'SALAH'}
                        </span>
                      </div>
                    ))}
                  </div>
                )}

                {/* Pembahasan */}
                <div className="p-2.5 rounded-lg bg-blue-50/60 border border-blue-100 text-xs text-slate-700">
                  <span className="font-bold text-blue-900 block mb-0.5">Pembahasan:</span>
                  <p className="whitespace-pre-line">{q.explanation}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Modal Detail Analisis Siswa (Pop-up komprehensif saat baris siswa diklik) */}
      <StudentDetailModal
        result={selectedStudentForDetail}
        questions={questions}
        isOpen={Boolean(selectedStudentForDetail)}
        onClose={() => setSelectedStudentForDetail(null)}
      />

      {/* Modal Edit Soal */}
      <QuestionEditorModal
        question={editingQuestion}
        isOpen={Boolean(editingQuestion)}
        onClose={() => setEditingQuestion(null)}
        onSave={(updated) => {
          onUpdateQuestion(updated);
          setEditingQuestion(null);
        }}
      />

      {/* Modal Panduan Google Apps Script */}
      <GasGuideModal
        isOpen={showGasGuide}
        onClose={() => setShowGasGuide(false)}
      />

      {/* Modal Konfigurasi GAS Endpoint */}
      <GasSettingsModal
        isOpen={showGasSettings}
        onClose={() => setShowGasSettings(false)}
        onSaveSuccess={() => {
          setShowGasSettings(false);
          loadDataFromGAS();
        }}
        onOpenGuide={() => {
          setShowGasSettings(false);
          setShowGasGuide(true);
        }}
      />

      {/* Dialog Konfirmasi Hapus Data Siswa */}
      {studentToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white rounded-2xl max-w-sm w-full p-5 shadow-2xl border border-slate-200">
            <h4 className="font-bold text-slate-900 text-sm mb-2">Hapus Data Nilai Siswa?</h4>
            <p className="text-xs text-slate-600 mb-4 leading-relaxed">
              Apakah Anda yakin ingin menghapus catatan nilai siswa{' '}
              <strong>{studentToDelete.nama}</strong>? Data yang dihapus tidak dapat dipulihkan.
            </p>
            <div className="flex items-center justify-end gap-2 text-xs">
              <button
                onClick={() => setStudentToDelete(null)}
                className="px-3.5 py-2 font-semibold text-slate-600 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
              >
                Batal
              </button>
              <button
                onClick={handleConfirmDelete}
                className="px-4 py-2 font-bold text-white bg-rose-600 hover:bg-rose-700 rounded-xl transition-colors cursor-pointer shadow-xs"
              >
                Hapus Permanen
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Helper Icon
function BrainCircuitIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M12 2a4 4 0 0 0-4 4v1H7a3 3 0 0 0-3 3v2a3 3 0 0 0 3 3h1v1a4 4 0 0 0 4 4" />
      <path d="M12 2a4 4 0 0 1 4 4v1h1a3 3 0 0 1 3 3v2a3 3 0 0 1-3 3h-1v1a4 4 0 0 1-4 4" />
      <path d="M12 8v8" />
    </svg>
  );
}
