import React, { useState } from 'react';
import { CONFIG } from '../config';
import { ExamResult, Question } from '../types';
import { downloadStudentResultPDF } from '../utils/pdfGenerator';
import {
  X,
  Download,
  User,
  Clock,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Award,
  BookOpen,
  Sparkles,
  Target,
  ArrowRight,
  Info,
} from 'lucide-react';

interface StudentDetailModalProps {
  result: ExamResult | null;
  questions: Question[];
  isOpen: boolean;
  onClose: () => void;
}

export const StudentDetailModal: React.FC<StudentDetailModalProps> = ({
  result,
  questions,
  isOpen,
  onClose,
}) => {
  if (!isOpen || !result) return null;

  const [activeTab, setActiveTab] = useState<'analisis' | 'butir' | 'remedial'>('analisis');
  const [selectedQuestionId, setSelectedQuestionId] = useState<number | null>(null);

  const isPass = result.status === 'Lulus' || result.nilai >= CONFIG.KKTP;

  // Analisis penguasaan per elemen capaian pembelajaran
  const elementAnalysis = CONFIG.TUJUAN_PEMBELAJARAN.map((elementName) => {
    const qInElement = questions.filter((q) => q.element === elementName);
    let totalScoreElement = 0;
    let maxScoreElement = 0;
    const weakIndicators: string[] = [];

    qInElement.forEach((q) => {
      const resp = result.itemResponses?.[q.id];
      const maxW = q.scoreWeight || (q.type === 'pgk_kategori' ? 4 : 2);
      maxScoreElement += maxW;

      if (resp) {
        totalScoreElement += resp.score;
        if (resp.status === 'salah' || resp.status === 'sebagian') {
          weakIndicators.push(`Soal #${q.id}: ${q.topic} - ${q.indicator}`);
        }
      } else {
        // Fallback jika belum tersimpan di itemResponses
        const approxScore = (result.nilai / 100) * maxW;
        totalScoreElement += approxScore;
      }
    });

    const percent = maxScoreElement > 0 ? Math.round((totalScoreElement / maxScoreElement) * 100) : 0;
    return {
      elementName,
      percent,
      totalScoreElement: Math.round(totalScoreElement),
      maxScoreElement,
      isMastered: percent >= CONFIG.KKTP,
      weakIndicators,
    };
  });

  // Identifikasi seluruh kelemahan indikator
  const allWeakQuestions = questions.filter((q) => {
    const resp = result.itemResponses?.[q.id];
    return resp ? resp.status === 'salah' || resp.status === 'sebagian' : false;
  });

  const selectedQuestionData = selectedQuestionId
    ? questions.find((q) => q.id === selectedQuestionId)
    : null;
  const selectedQuestionResp = selectedQuestionId
    ? result.itemResponses?.[selectedQuestionId]
    : null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-3xl w-full p-5 sm:p-7 shadow-2xl border border-slate-200 relative max-h-[92vh] flex flex-col">
        {/* Header Modal */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-base shadow-2xs">
              <User className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base sm:text-lg font-bold text-slate-900">{result.nama}</h3>
                <span className="text-xs bg-slate-100 text-slate-700 font-semibold px-2 py-0.5 rounded">
                  Absen: {result.noAbsen}
                </span>
              </div>
              <p className="text-xs text-slate-500">
                Kelas {result.kelas || CONFIG.KELAS} • {CONFIG.SEKOLAH} • {CONFIG.MATA_PELAJARAN}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-600 rounded-xl hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigasi Modal */}
        <div className="flex border-b border-slate-200 shrink-0 mt-3 text-xs font-semibold gap-1">
          <button
            onClick={() => setActiveTab('analisis')}
            className={`px-4 py-2.5 rounded-t-xl transition-colors cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'analisis'
                ? 'bg-blue-50 text-blue-700 border-b-2 border-blue-600 font-bold'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            <Target className="w-4 h-4" />
            <span>Analisis Capaian &amp; KKTP</span>
          </button>
          <button
            onClick={() => setActiveTab('butir')}
            className={`px-4 py-2.5 rounded-t-xl transition-colors cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'butir'
                ? 'bg-blue-50 text-blue-700 border-b-2 border-blue-600 font-bold'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>Matriks Respon {questions.length} Butir</span>
          </button>
          <button
            onClick={() => setActiveTab('remedial')}
            className={`px-4 py-2.5 rounded-t-xl transition-colors cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'remedial'
                ? 'bg-blue-50 text-blue-700 border-b-2 border-blue-600 font-bold'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            <Sparkles className="w-4 h-4" />
            <span>Rekomendasi Tindak Lanjut</span>
          </button>
        </div>

        {/* Isi Tab Body (Scrollable) */}
        <div className="overflow-y-auto py-4 space-y-4 pr-1 text-xs sm:text-sm flex-1">
          {/* TAB 1: ANALISIS CAPAIAN & KKTP */}
          {activeTab === 'analisis' && (
            <div className="space-y-4">
              {/* Highlight Kartu Skor */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
                  <span className="text-[11px] text-slate-500 block">Nilai Akhir</span>
                  <div className="flex items-baseline gap-1 mt-1">
                    <span
                      className={`text-3xl font-black ${
                        isPass ? 'text-emerald-600' : 'text-amber-600'
                      }`}
                    >
                      {result.nilai}
                    </span>
                    <span className="text-xs text-slate-400">/ 100</span>
                  </div>
                  <span
                    className={`inline-block mt-1 text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      isPass ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                    }`}
                  >
                    {isPass ? 'TUNTAS (>= 60)' : 'REMEDIAL (< 60)'}
                  </span>
                </div>

                <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200">
                  <div className="flex items-center gap-1 text-emerald-800 font-semibold text-xs mb-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Benar Penuh</span>
                  </div>
                  <span className="text-2xl font-black text-emerald-900">{result.benar} Soal</span>
                  <span className="text-[10px] text-emerald-700 block mt-1">Skor penuh per butir</span>
                </div>

                <div className="p-3.5 rounded-2xl bg-amber-50 border border-amber-200">
                  <div className="flex items-center gap-1 text-amber-800 font-semibold text-xs mb-1">
                    <Award className="w-3.5 h-3.5" />
                    <span>Sebagian (PGK)</span>
                  </div>
                  <span className="text-2xl font-black text-amber-900">{result.sebagian || 0} Soal</span>
                  <span className="text-[10px] text-amber-700 block mt-1">Sebagian pernyataan benar</span>
                </div>

                <div className="p-3.5 rounded-2xl bg-rose-50 border border-rose-200">
                  <div className="flex items-center gap-1 text-rose-800 font-semibold text-xs mb-1">
                    <XCircle className="w-3.5 h-3.5" />
                    <span>Salah</span>
                  </div>
                  <span className="text-2xl font-black text-rose-900">{result.salah} Soal</span>
                  <span className="text-[10px] text-rose-700 block mt-1">Skor 0 pada butir</span>
                </div>
              </div>

              {/* Durasi & Waktu */}
              <div className="flex flex-wrap items-center justify-between p-3 rounded-xl bg-blue-50/60 border border-blue-100 text-xs text-blue-900">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-blue-600" />
                  <span>Durasi Pengerjaan: <strong>{result.durasi || '-'}</strong></span>
                </div>
                <div>
                  <span>Waktu Kirim: {result.timestamp}</span>
                </div>
              </div>

              {/* Analisis per Elemen / Tujuan Pembelajaran */}
              <div className="space-y-3">
                <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider flex items-center gap-1.5">
                  <Target className="w-4 h-4 text-blue-600" />
                  <span>Ketercapaian Tujuan Pembelajaran (KKTP = 60)</span>
                </h4>
                <div className="space-y-2.5">
                  {elementAnalysis.map((el, idx) => (
                    <div
                      key={idx}
                      className="p-3.5 rounded-xl border border-slate-200 bg-white hover:border-blue-200 transition-colors"
                    >
                      <div className="flex items-start justify-between gap-3 mb-2">
                        <div>
                          <span className="text-[11px] font-bold text-blue-800 block">
                            Tujuan Pembelajaran #{idx + 1}
                          </span>
                          <p className="font-semibold text-slate-800 text-xs sm:text-sm">
                            {el.elementName}
                          </p>
                        </div>
                        <div className="text-right shrink-0">
                          <span
                            className={`text-sm font-black px-2.5 py-1 rounded-lg ${
                              el.isMastered
                                ? 'bg-emerald-100 text-emerald-800'
                                : 'bg-amber-100 text-amber-800'
                            }`}
                          >
                            {el.percent}%
                          </span>
                          <span className="block text-[10px] text-slate-400 mt-0.5">
                            {el.isMastered ? 'Tuntas' : 'Perlu Bimbingan'}
                          </span>
                        </div>
                      </div>

                      {/* Progress Bar Elemen */}
                      <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all ${
                            el.isMastered ? 'bg-emerald-500' : 'bg-amber-500'
                          }`}
                          style={{ width: `${Math.min(100, el.percent)}%` }}
                        />
                      </div>

                      {el.weakIndicators.length > 0 && (
                        <div className="mt-2.5 pt-2 border-t border-slate-100 text-[11px] text-slate-500">
                          <span className="font-bold text-rose-700 block mb-1">
                            Indikator Belum Dikuasai ({el.weakIndicators.length} butir):
                          </span>
                          <ul className="list-disc list-inside space-y-0.5 pl-1 text-slate-600">
                            {el.weakIndicators.slice(0, 3).map((w, wIdx) => (
                              <li key={wIdx} className="truncate">{w}</li>
                            ))}
                            {el.weakIndicators.length > 3 && (
                              <li className="text-blue-600 font-medium">
                                + {el.weakIndicators.length - 3} butir lainnya (lihat tab matriks)
                              </li>
                            )}
                          </ul>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: MATRIKS RESPON 40 BUTIR */}
          {activeTab === 'butir' && (
            <div className="space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-2 p-3 bg-slate-50 rounded-xl border border-slate-200">
                <span className="font-bold text-xs text-slate-800">
                  Peta Respon Jawaban Butir #1 s.d. #{questions.length}
                </span>
                <div className="flex items-center gap-3 text-[11px]">
                  <span className="flex items-center gap-1 font-semibold text-emerald-700">
                    <span className="w-3 h-3 rounded bg-emerald-500 inline-block"></span> Benar ({result.benar})
                  </span>
                  <span className="flex items-center gap-1 font-semibold text-amber-700">
                    <span className="w-3 h-3 rounded bg-amber-400 inline-block"></span> Sebagian ({result.sebagian || 0})
                  </span>
                  <span className="flex items-center gap-1 font-semibold text-rose-700">
                    <span className="w-3 h-3 rounded bg-rose-500 inline-block"></span> Salah ({result.salah})
                  </span>
                </div>
              </div>

              {/* Grid 40 Butir Interaktif */}
              <div className="grid grid-cols-5 sm:grid-cols-10 gap-2">
                {questions.map((q) => {
                  const resp = result.itemResponses?.[q.id];
                  const status = resp?.status || (result.nilai >= 70 ? 'benar' : 'salah');
                  const isSelected = selectedQuestionId === q.id;

                  return (
                    <button
                      key={q.id}
                      onClick={() => setSelectedQuestionId(isSelected ? null : q.id)}
                      className={`p-2.5 rounded-xl border-2 transition-all flex flex-col items-center justify-center cursor-pointer ${
                        isSelected
                          ? 'ring-2 ring-blue-600 shadow-md scale-105'
                          : 'hover:opacity-90'
                      } ${
                        status === 'benar'
                          ? 'bg-emerald-50 border-emerald-400 text-emerald-950 font-bold'
                          : status === 'sebagian'
                          ? 'bg-amber-50 border-amber-400 text-amber-950 font-bold'
                          : 'bg-rose-50 border-rose-400 text-rose-950 font-bold'
                      }`}
                      title={`Klik untuk melihat detail Soal #${q.id} (${q.topic})`}
                    >
                      <span className="text-xs">#{q.id}</span>
                      <span className="text-[9px] uppercase font-bold tracking-tight">
                        {status === 'benar' ? '100%' : status === 'sebagian' ? 'Parsial' : '0%'}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Detail Butir Terpilih */}
              {selectedQuestionData && (
                <div className="p-4 rounded-2xl bg-blue-50/70 border border-blue-200 text-xs space-y-2 animate-in fade-in duration-150">
                  <div className="flex items-center justify-between font-bold text-slate-800">
                    <span className="text-blue-900 text-sm">
                      Detail Soal #{selectedQuestionData.id} • {selectedQuestionData.topic}
                    </span>
                    <span
                      className={`px-2.5 py-0.5 rounded text-[11px] font-bold ${
                        selectedQuestionResp?.status === 'benar'
                          ? 'bg-emerald-100 text-emerald-800'
                          : selectedQuestionResp?.status === 'sebagian'
                          ? 'bg-amber-100 text-amber-800'
                          : 'bg-rose-100 text-rose-800'
                      }`}
                    >
                      Status: {selectedQuestionResp?.status?.toUpperCase() || 'TERCATAT'}
                    </span>
                  </div>
                  <p className="text-slate-800 font-medium">{selectedQuestionData.text}</p>
                  <p className="text-slate-600">
                    <strong>Indikator:</strong> {selectedQuestionData.indicator}
                  </p>
                  <div className="p-2.5 rounded-lg bg-white border border-blue-100 text-slate-700">
                    <strong className="text-blue-900 block mb-0.5">Pembahasan Kunci Jawaban:</strong>
                    <p className="whitespace-pre-line">{selectedQuestionData.explanation}</p>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 3: REKOMENDASI TINDAK LANJUT & PROGRAM REMEDIAL */}
          {activeTab === 'remedial' && (
            <div className="space-y-4">
              <div
                className={`p-4 rounded-2xl border ${
                  isPass
                    ? 'bg-emerald-50 border-emerald-200 text-emerald-950'
                    : 'bg-amber-50 border-amber-200 text-amber-950'
                }`}
              >
                <div className="flex items-center gap-2 mb-2 font-bold text-sm">
                  {isPass ? (
                    <>
                      <Award className="w-5 h-5 text-emerald-600" />
                      <span>Rekomendasi: Program Pengayaan Seni Rupa</span>
                    </>
                  ) : (
                    <>
                      <AlertTriangle className="w-5 h-5 text-amber-600" />
                      <span>Rekomendasi: Program Bimbingan Remedial Terfokus</span>
                    </>
                  )}
                </div>

                <p className="text-xs leading-relaxed">
                  {isPass
                    ? `Siswa atas nama ${result.nama} telah mencapai KKTP minimum (Nilai: ${result.nilai} >= ${CONFIG.KKTP}). Disarankan untuk mengikuti program pengayaan berupa pembuatan karya gambar komposisi bebas bertema keindahan alam nusantara dengan variasi ritme pengulangan, transisi gradasi, serta proporsi still life yang kaya.`
                    : `Siswa atas nama ${result.nama} memperoleh nilai ${result.nilai} (di bawah batas KKTP ${CONFIG.KKTP}). Diperlukan tindak lanjut remedial pada indikator-indikator yang belum tuntas sebelum melakukan penilaian ulang.`}
                </p>
              </div>

              {/* Rencana Aksi Konkret */}
              <div className="p-4 rounded-2xl bg-white border border-slate-200 space-y-3">
                <h5 className="font-bold text-xs uppercase tracking-wider text-slate-800 flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-blue-600" />
                  <span>Rencana Aksi Pembelajaran Diferensiasi</span>
                </h5>

                <div className="space-y-2 text-xs">
                  <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold shrink-0 text-[10px]">
                      1
                    </span>
                    <div>
                      <strong className="text-slate-800 block">Metode Pembimbingan:</strong>
                      <span className="text-slate-600">
                        {isPass
                          ? 'Diberikan peran sebagai tutor sebaya bagi rekan yang memerlukan bimbingan teknik membuat pola ritme dan penataan komposisi gambar.'
                          : `Bimbingan terstruktur 1-on-1 dengan Guru Kelas 5 (${CONFIG.GURU}) mengulang konsep kanon proporsi tubuh/wajah manusia, prinsip ritme, dan keseimbangan gambar.`}
                      </span>
                    </div>
                  </div>

                  <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold shrink-0 text-[10px]">
                      2
                    </span>
                    <div>
                      <strong className="text-slate-800 block">Bahan &amp; Media Intervensi:</strong>
                      <span className="text-slate-600">
                        Pemberian kartu visual panduan garis bantu proporsi still life (teko-cangkir), lembar kerja pola ritme repetisi &amp; oposisi ornamen tradisional, serta latihan komposisi Rule of Thirds.
                      </span>
                    </div>
                  </div>

                  <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold shrink-0 text-[10px]">
                      3
                    </span>
                    <div>
                      <strong className="text-slate-800 block">Evaluasi Ulang:</strong>
                      <span className="text-slate-600">
                        {isPass
                          ? 'Presentasi mini produk koding sederhana di depan kelas.'
                          : 'Tes lisan/tulis adaptif sebanyak 5 soal kunci pada indikator materi yang salah.'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer Modal Actions */}
        <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-3 shrink-0">
          <button
            onClick={() => downloadStudentResultPDF(result)}
            className="inline-flex items-center gap-1.5 px-4 py-2.5 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl transition-colors shadow-xs cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Cetak PDF Lembar Hasil Siswa</span>
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2.5 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
};
