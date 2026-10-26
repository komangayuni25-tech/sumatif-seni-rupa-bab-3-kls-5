import { jsPDF } from 'jspdf';
import { CONFIG } from '../config';
import { ExamResult, Question } from '../types';

/**
 * Format tanggal dalam bahasa Indonesia
 */
export function formatIndonesianDate(dateStr?: string): string {
  const d = dateStr ? new Date(dateStr) : new Date();
  if (isNaN(d.getTime())) {
    return new Date().toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  }
  return d.toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

/**
 * Helper menggambar Kop Surat Resmi Kedinasan
 */
function drawOfficialKop(doc: jsPDF, pageWidth: number, startY: number = 14): number {
  let y = startY;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(30, 41, 59);
  doc.text('PEMERINTAH KABUPATEN JEMBRANA', pageWidth / 2, y, { align: 'center' });
  y += 4.5;
  doc.text('DINAS PENDIDIKAN KEPEMUDAAN DAN OLAHRAGA', pageWidth / 2, y, { align: 'center' });
  y += 5.5;
  doc.setFontSize(13);
  doc.text(CONFIG.SEKOLAH, pageWidth / 2, y, { align: 'center' });
  y += 4.5;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.text(CONFIG.ALAMAT_SEKOLAH, pageWidth / 2, y, { align: 'center' });
  y += 2.5;

  // Garis Pembatas Kop Ganda
  doc.setLineWidth(0.8);
  doc.line(14, y, pageWidth - 14, y);
  doc.setLineWidth(0.2);
  doc.line(14, y + 0.8, pageWidth - 14, y + 0.8);
  return y + 6;
}

/**
 * Helper menggambar Tanda Tangan Resmi Kepala Sekolah & Guru
 */
function drawSignatures(
  doc: jsPDF,
  pageWidth: number,
  y: number,
  marginLeft: number = 14,
  marginRight: number = 14
): void {
  const tglStr = formatIndonesianDate();
  const colLeftX = marginLeft + 6;
  const colRightX = pageWidth - marginRight - 55;

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(30, 41, 59);

  // Kiri: Kepala Sekolah
  doc.text('Mengetahui,', colLeftX, y);
  doc.text('Kepala Sekolah,', colLeftX, y + 4.5);

  // Kanan: Guru Pengampu
  doc.text(`Jembrana, ${tglStr}`, colRightX, y);
  doc.text(`Guru Kelas ${CONFIG.KELAS},`, colRightX, y + 4.5);

  const sigLineY = y + 23;
  // Nama & NIP Kepala Sekolah
  doc.setFont('helvetica', 'bold');
  doc.text(CONFIG.KEPALA_SEKOLAH, colLeftX, sigLineY);
  doc.line(colLeftX, sigLineY + 1, colLeftX + 50, sigLineY + 1);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.text(`NIP. ${CONFIG.NIP_KEPALA_SEKOLAH}`, colLeftX, sigLineY + 5);

  // Nama & NIPPPK Guru
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.text(CONFIG.GURU, colRightX, sigLineY);
  doc.line(colRightX, sigLineY + 1, colRightX + 50, sigLineY + 1);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.text(`NIPPPK. ${CONFIG.NIP_GURU}`, colRightX, sigLineY + 5);
}

/**
 * 1. Download Lembar Hasil Tes Siswa (Tanda Tangan Guru & Orang Tua/Wali)
 */
export function downloadStudentResultPDF(result: ExamResult): void {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  let y = drawOfficialKop(doc, pageWidth, 16);

  // --- JUDUL DOKUMEN ---
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12);
  doc.text('LEMBAR LAPORAN HASIL ASESMEN SUMATIF', pageWidth / 2, y, { align: 'center' });
  y += 5;
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.text(`Tahun Ajaran 2025/2026`, pageWidth / 2, y, { align: 'center' });
  y += 8;

  // --- DATA IDENTITAS SISWA ---
  doc.setDrawColor(200, 200, 200);
  doc.setFillColor(248, 250, 252);
  doc.roundedRect(15, y, pageWidth - 30, 36, 2, 2, 'FD');

  doc.setFontSize(9.5);
  const leftX = 20;
  const col2X = 58;
  const rightX = 115;
  const col4X = 150;

  y += 7;
  doc.setFont('helvetica', 'bold');
  doc.text('Nama Peserta', leftX, y);
  doc.setFont('helvetica', 'normal');
  doc.text(`: ${result.nama}`, col2X, y);

  doc.setFont('helvetica', 'bold');
  doc.text('Mata Pelajaran', rightX, y);
  doc.setFont('helvetica', 'normal');
  doc.text(`: ${CONFIG.MATA_PELAJARAN}`, col4X, y);

  y += 7;
  doc.setFont('helvetica', 'bold');
  doc.text('Nomor Absen', leftX, y);
  doc.setFont('helvetica', 'normal');
  doc.text(`: ${result.noAbsen}`, col2X, y);

  doc.setFont('helvetica', 'bold');
  doc.text('Materi Pokok', rightX, y);
  doc.setFont('helvetica', 'normal');
  doc.text(`: ${CONFIG.MATERI}`, col4X, y);

  y += 7;
  doc.setFont('helvetica', 'bold');
  doc.text('Kelas', leftX, y);
  doc.setFont('helvetica', 'normal');
  doc.text(`: Kelas ${result.kelas || CONFIG.KELAS}`, col2X, y);

  doc.setFont('helvetica', 'bold');
  doc.text('Standar KKTP', rightX, y);
  doc.setFont('helvetica', 'normal');
  doc.text(`: ${CONFIG.KKTP} Poin (Skala 100)`, col4X, y);

  y += 7;
  doc.setFont('helvetica', 'bold');
  doc.text('Durasi Pengerjaan', leftX, y);
  doc.setFont('helvetica', 'normal');
  doc.text(`: ${result.durasi || '-'}`, col2X, y);

  doc.setFont('helvetica', 'bold');
  doc.text('Waktu Submit', rightX, y);
  doc.setFont('helvetica', 'normal');
  doc.text(`: ${result.timestamp}`, col4X, y);

  y += 12;

  // --- KOTAK NILAI DAN KELULUSAN ---
  const isLulus = result.status === 'Lulus' || result.nilai >= CONFIG.KKTP;
  const boxWidth = pageWidth - 30;
  const boxHeight = 44;

  doc.setFillColor(isLulus ? 240 : 255, isLulus ? 253 : 247, isLulus ? 244 : 237);
  doc.setDrawColor(isLulus ? 134 : 253, isLulus ? 239 : 186, isLulus ? 172 : 116);
  doc.roundedRect(15, y, boxWidth, boxHeight, 3, 3, 'FD');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(isLulus ? 22 : 185, isLulus ? 101 : 28, isLulus ? 52 : 28);
  doc.text('PEROLEHAN HASIL ASESMEN', 20, y + 8);

  // Nilai Angka Besar
  doc.setFontSize(38);
  doc.text(`${result.nilai}`, 22, y + 26);
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.text('/ 100', 58, y + 26);

  // Badge Status
  const badgeX = 90;
  const badgeY = y + 12;
  doc.setFillColor(isLulus ? 22 : 217, isLulus ? 163 : 119, isLulus ? 74 : 6);
  doc.roundedRect(badgeX, badgeY, 88, 12, 2, 2, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10.5);
  doc.text(
    isLulus ? 'TUNTAS (MENCAPAI KKTP)' : 'PERLU REMEDIAL (BELUM KKTP)',
    badgeX + 44,
    badgeY + 8,
    { align: 'center' }
  );

  // Rincian butir
  doc.setTextColor(51, 65, 85);
  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  doc.text(
    `Jawaban Benar Penuh: ${result.benar} Soal  •  Parsial: ${result.sebagian || 0} Soal  •  Salah: ${result.salah} Soal`,
    20,
    y + 38
  );

  y += boxHeight + 8;

  // --- CATATAN PEMBELAJARAN ---
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9.5);
  doc.setTextColor(15, 23, 42);
  doc.text('Catatan Guru & Rekomendasi:', 15, y);
  y += 5;

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(71, 85, 105);

  const catatanText = isLulus
    ? `Selamat kepada Ananda ${result.nama}. Telah berhasil mencapai dan melampaui kriteria KKTP minimum (${CONFIG.KKTP}) pada materi ${CONFIG.MATERI}. Pertahankan ketekunan belajar dan lanjutkan program pengayaan pembuatan proyek koding mandiri.`
    : `Ananda ${result.nama} memperoleh nilai ${result.nilai} (KKTP: ${CONFIG.KKTP}). Diperlukan bimbingan belajar remedial secara terstruktur pada materi yang belum dikuasai (khususnya konsep logika biner dan linimasa sejarah komputer) sebelum dilakukan evaluasi perbaikan.`;

  const splitCatatan = doc.splitTextToSize(catatanText, pageWidth - 32);
  doc.text(splitCatatan, 16, y);
  y += splitCatatan.length * 4.5 + 8;

  // --- TANDA TANGAN ---
  const ttdY = Math.max(y, 220);
  const colLeft = 20;
  const colRight = pageWidth - 65;

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9.5);

  doc.text('Mengetahui,', colLeft, ttdY);
  doc.text('Orang Tua / Wali Siswa,', colLeft, ttdY + 5);

  const tglFormatted = formatIndonesianDate();
  doc.text(`Jembrana, ${tglFormatted}`, colRight, ttdY);
  doc.text(`Guru Kelas ${CONFIG.KELAS},`, colRight, ttdY + 5);

  const lineY = ttdY + 27;
  doc.line(colLeft, lineY, colLeft + 45, lineY);
  doc.text('( ......................................... )', colLeft, lineY + 4);

  doc.setFont('helvetica', 'bold');
  doc.text(CONFIG.GURU, colRight, lineY - 1);
  doc.line(colRight, lineY, colRight + 48, lineY);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.text(`NIPPPK. ${CONFIG.NIP_GURU}`, colRight, lineY + 4);

  const safeName = (result.nama || 'siswa').replace(/[^a-zA-Z0-9]/g, '_');
  doc.save(`Hasil_Tes_Sumatif_${CONFIG.MATA_PELAJARAN.replace(/\s+/g, '_')}_${safeName}_Absen_${result.noAbsen}.pdf`);
}

/**
 * 2. Download Naskah Soal Ujian (PDF)
 */
export function downloadExamQuestionsPDF(questions: Question[]): void {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  let y = 16;

  const checkPageBreak = (neededHeight: number) => {
    if (y + neededHeight > pageHeight - 16) {
      doc.addPage();
      y = 16;
      addPageHeader();
    }
  };

  const addPageHeader = () => {
    doc.setFont('helvetica', 'italic');
    doc.setFontSize(8);
    doc.setTextColor(120, 120, 120);
    doc.text(
      `${CONFIG.SEKOLAH} | Naskah Soal Asesmen Sumatif ${CONFIG.MATA_PELAJARAN} Kelas ${CONFIG.KELAS}`,
      pageWidth / 2,
      9,
      { align: 'center' }
    );
    doc.setTextColor(0, 0, 0);
  };

  // --- KOP SOAL ---
  y = drawOfficialKop(doc, pageWidth, 16);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12);
  doc.text('NASKAH SOAL ASESMEN SUMATIF', pageWidth / 2, y, { align: 'center' });
  y += 5;

  // Metadata Soal
  doc.setFontSize(8.5);
  doc.setFont('helvetica', 'normal');
  doc.text(`Mata Pelajaran : ${CONFIG.MATA_PELAJARAN}`, 16, y);
  doc.text(`Kelas / Semester : Kelas ${CONFIG.KELAS}`, 120, y);
  y += 4.5;
  doc.text(`Materi Pokok    : ${CONFIG.MATERI}`, 16, y);
  doc.text(`Alokasi Waktu    : 60 Menit`, 120, y);
  y += 4.5;
  doc.text(`Kriteria KKTP   : ${CONFIG.KKTP} Poin`, 16, y);
  doc.text(`Jumlah Soal      : ${questions.length} Butir (40 PG & 5 PGK Kategori)`, 120, y);
  y += 6;

  doc.setDrawColor(180, 180, 180);
  doc.setFillColor(245, 247, 250);
  doc.rect(15, y, pageWidth - 30, 11, 'FD');
  doc.setFont('helvetica', 'bold');
  doc.text('PETUNJUK UMUM:', 18, y + 4);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.text(
    '1. Tulislah identitas Anda dengan teliti. 2. Kerjakan soal dengan mandiri dan jujur. 3. Periksa kembali jawaban sebelum dikirimkan.',
    18,
    y + 8,
    { maxWidth: pageWidth - 36 }
  );
  y += 16;

  // Iterasi Soal
  questions.forEach((q, idx) => {
    checkPageBreak(25);

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9.5);

    let typeLabel = 'Pilihan Ganda';
    if (q.type === 'pgk_kategori') typeLabel = 'Pilihan Ganda Kompleks Kategori (3 Pernyataan Benar/Salah)';

    doc.setTextColor(30, 58, 138);
    doc.text(`Soal No. ${idx + 1} [${typeLabel}] • Topik: ${q.topic} (Bobot: ${q.scoreWeight || (q.type === 'pgk_kategori' ? 4 : 2)} Poin)`, 15, y);
    doc.setTextColor(0, 0, 0);
    y += 5;

    // Teks Soal
    doc.setFont('helvetica', 'normal');
    const textLines = doc.splitTextToSize(q.text, pageWidth - 32);
    checkPageBreak(textLines.length * 4.5 + 15);
    doc.text(textLines, 16, y);
    y += textLines.length * 4.5 + 2;

    // Opsi Jawaban PG
    if (q.options && q.options.length > 0) {
      q.options.forEach((opt) => {
        checkPageBreak(8);
        const optLines = doc.splitTextToSize(`${opt.id}. ${opt.text}`, pageWidth - 36);
        doc.text(optLines, 20, y);
        y += optLines.length * 4.2 + 1;
      });
      y += 3;
    }

    // Pernyataan PGK Kategori (Benar / Salah)
    if (q.statements && q.statements.length > 0) {
      q.statements.forEach((st, sIdx) => {
        checkPageBreak(10);
        const stLines = doc.splitTextToSize(
          `Pernyataan ${sIdx + 1}: ${st.text}   [  ] Benar   [  ] Salah`,
          pageWidth - 36
        );
        doc.text(stLines, 20, y);
        y += stLines.length * 4.5 + 1.5;
      });
      y += 3;
    }
  });

  doc.save(`Naskah_Soal_${CONFIG.MATA_PELAJARAN}_Kelas_${CONFIG.KELAS}_${CONFIG.SEKOLAH.replace(/[^a-zA-Z0-9]/g, '_')}.pdf`);
}

/**
 * 3. Unduh PDF Kisi-Kisi Soal Kedinasan / Resmi
 */
export function downloadKisiKisiPDF(questions: Question[]): void {
  const doc = new jsPDF({
    orientation: 'landscape',
    unit: 'mm',
    format: 'a4',
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const marginLeft = 14;
  const marginRight = 14;
  const contentWidth = pageWidth - marginLeft - marginRight;

  let y = drawOfficialKop(doc, pageWidth, 12);

  // Judul Kisi-Kisi
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(15, 23, 42);
  doc.text('KISI-KISI PENULISAN SOAL ASESMEN SUMATIF', pageWidth / 2, y, { align: 'center' });
  y += 4.5;
  doc.setFontSize(8.5);
  doc.setFont('helvetica', 'normal');
  doc.text(
    `Mata Pelajaran: ${CONFIG.MATA_PELAJARAN} • Lingkup Materi: ${CONFIG.MATERI} • Kelas/Semester: ${CONFIG.KELAS} • Tahun Ajaran 2025/2026`,
    pageWidth / 2,
    y,
    { align: 'center' }
  );
  y += 6;

  // Header Kolom Tabel Kisi-Kisi
  const cols = [
    { key: 'no', title: 'No', width: 10, align: 'center' as const },
    { key: 'element', title: 'Capaian Pembelajaran / Elemen', width: 62, align: 'left' as const },
    { key: 'materi', title: 'Lingkup Materi / Topik', width: 44, align: 'left' as const },
    { key: 'indicator', title: 'Indikator Soal', width: 95, align: 'left' as const },
    { key: 'level', title: 'Level', width: 14, align: 'center' as const },
    { key: 'bentuk', title: 'Bentuk', width: 18, align: 'center' as const },
    { key: 'noSoal', title: 'No Soal', width: 14, align: 'center' as const },
    { key: 'bobot', title: 'Bobot', width: 12, align: 'center' as const },
  ];

  const drawTableHeader = (curY: number) => {
    doc.setFillColor(30, 58, 138);
    doc.rect(marginLeft, curY, contentWidth, 7, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7.5);

    let curX = marginLeft;
    cols.forEach((col) => {
      const textX = col.align === 'center' ? curX + col.width / 2 : curX + 2;
      doc.text(col.title, textX, curY + 4.8, { align: col.align });
      curX += col.width;
    });
    doc.setTextColor(0, 0, 0);
  };

  drawTableHeader(y);
  y += 7;

  questions.forEach((q, idx) => {
    // Estimasi tinggi teks indikator
    const indLines = doc.splitTextToSize(q.indicator || q.topic, cols[3].width - 3);
    const rowHeight = Math.max(6.5, indLines.length * 3.8 + 2);

    if (y + rowHeight > pageHeight - 35) {
      doc.addPage();
      y = 14;
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(8);
      doc.setTextColor(71, 85, 105);
      doc.text('Lanjutan Kisi-Kisi Asesmen Sumatif:', marginLeft, y - 2);
      drawTableHeader(y);
      y += 7;
    }

    const isEven = idx % 2 === 0;
    doc.setFillColor(isEven ? 255 : 248, isEven ? 255 : 250, isEven ? 255 : 252);
    doc.rect(marginLeft, y, contentWidth, rowHeight, 'F');
    doc.setDrawColor(226, 232, 240);
    doc.rect(marginLeft, y, contentWidth, rowHeight, 'S');

    let curX = marginLeft;
    cols.forEach((col) => {
      let val = '';
      if (col.key === 'no') val = String(idx + 1);
      else if (col.key === 'element') val = q.element;
      else if (col.key === 'materi') val = q.topic;
      else if (col.key === 'indicator') val = q.indicator;
      else if (col.key === 'level') val = q.level || 'L1';
      else if (col.key === 'bentuk') val = q.type === 'pg' ? 'PG' : 'PGK Kat';
      else if (col.key === 'noSoal') val = String(q.id);
      else if (col.key === 'bobot') val = `${q.scoreWeight || (q.type === 'pgk_kategori' ? 4 : 2)}p`;

      doc.setFont('helvetica', col.key === 'noSoal' || col.key === 'level' ? 'bold' : 'normal');
      doc.setFontSize(7.2);
      doc.setTextColor(30, 41, 59);

      const textX = col.align === 'center' ? curX + col.width / 2 : curX + 2;

      if (col.key === 'indicator' || col.key === 'element' || col.key === 'materi') {
        const lines = doc.splitTextToSize(val, col.width - 3);
        doc.text(lines, textX, y + 4);
      } else {
        doc.text(val, textX, y + 4.5, { align: col.align });
      }

      curX += col.width;
    });

    y += rowHeight;
  });

  // Tanda Tangan Pengesahan
  if (y + 36 > pageHeight - 14) {
    doc.addPage();
    y = 18;
  } else {
    y += 8;
  }

  drawSignatures(doc, pageWidth, y, marginLeft, marginRight);

  // Footer
  const totalPages = doc.getNumberOfPages();
  for (let i = 1; i <= totalPages; i++) {
    doc.setPage(i);
    doc.setFont('helvetica', 'italic');
    doc.setFontSize(7);
    doc.setTextColor(148, 163, 184);
    doc.text(`Kisi-Kisi Soal Resmi • ${CONFIG.SEKOLAH} • ${CONFIG.MATA_PELAJARAN}`, marginLeft, pageHeight - 5);
    doc.text(`Halaman ${i} dari ${totalPages}`, pageWidth - marginRight, pageHeight - 5, { align: 'right' });
  }

  doc.save(`Kisi_Kisi_Soal_${CONFIG.MATA_PELAJARAN}_Kelas_${CONFIG.KELAS}_${CONFIG.SEKOLAH.replace(/[^a-zA-Z0-9]/g, '_')}.pdf`);
}

/**
 * 4. Unduh PDF Laporan Analisis Butir Soal & Daya Serap Siswa
 */
export function downloadItemAnalysisPDF(results: ExamResult[], questions: Question[]): void {
  const doc = new jsPDF({
    orientation: 'landscape',
    unit: 'mm',
    format: 'a4',
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const marginLeft = 14;
  const marginRight = 14;
  const contentWidth = pageWidth - marginLeft - marginRight;

  let y = drawOfficialKop(doc, pageWidth, 12);

  // Judul Laporan Analisis Butir
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(15, 23, 42);
  doc.text('LAPORAN ANALISIS BUTIR SOAL & DAYA SERAP SISWA', pageWidth / 2, y, { align: 'center' });
  y += 4.5;
  doc.setFontSize(8.5);
  doc.setFont('helvetica', 'normal');
  doc.text(
    `Mata Pelajaran: ${CONFIG.MATA_PELAJARAN} • Kelas ${CONFIG.KELAS} • Jumlah Siswa: ${results.length} • Standar KKTP: ${CONFIG.KKTP}`,
    pageWidth / 2,
    y,
    { align: 'center' }
  );
  y += 6;

  // Header Tabel
  const cols = [
    { key: 'no', title: 'No', width: 10, align: 'center' as const },
    { key: 'topik', title: 'Topik / Lingkup Materi', width: 55, align: 'left' as const },
    { key: 'indicator', title: 'Indikator Soal', width: 90, align: 'left' as const },
    { key: 'level', title: 'Level', width: 14, align: 'center' as const },
    { key: 'bentuk', title: 'Tipe', width: 16, align: 'center' as const },
    { key: 'kunci', title: 'Kunci', width: 18, align: 'center' as const },
    { key: 'benar', title: 'Jml Benar', width: 20, align: 'center' as const },
    { key: 'dayaSerap', title: 'Daya Serap (%)', width: 24, align: 'center' as const },
    { key: 'klasifikasi', title: 'Kesukaran Empiris', width: 22, align: 'center' as const },
  ];

  const drawTableHeader = (curY: number) => {
    doc.setFillColor(30, 58, 138);
    doc.rect(marginLeft, curY, contentWidth, 7, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7.5);

    let curX = marginLeft;
    cols.forEach((col) => {
      const textX = col.align === 'center' ? curX + col.width / 2 : curX + 2;
      doc.text(col.title, textX, curY + 4.8, { align: col.align });
      curX += col.width;
    });
    doc.setTextColor(0, 0, 0);
  };

  drawTableHeader(y);
  y += 7;

  const totalStudents = results.length || 1;

  questions.forEach((q) => {
    // Hitung statistik jawaban butir
    let correctCount = 0;
    results.forEach((r) => {
      const resp = r.itemResponses?.[q.id];
      if (resp) {
        if (resp.status === 'benar') correctCount += 1;
        else if (resp.status === 'sebagian') correctCount += 0.5;
      } else {
        // Fallback perkiraan jika itemResponses belum ada
        if (r.nilai >= 70) correctCount += 0.8;
      }
    });

    const percent = Math.round((correctCount / totalStudents) * 100);
    let empiris = 'Sedang';
    if (percent > 70) empiris = 'Mudah';
    else if (percent < 30) empiris = 'Sukar';

    const indLines = doc.splitTextToSize(q.indicator || q.topic, cols[2].width - 3);
    const rowHeight = Math.max(6.5, indLines.length * 3.8 + 2);

    if (y + rowHeight > pageHeight - 35) {
      doc.addPage();
      y = 14;
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(8);
      doc.setTextColor(71, 85, 105);
      doc.text('Lanjutan Laporan Analisis Butir Soal:', marginLeft, y - 2);
      drawTableHeader(y);
      y += 7;
    }

    const isEven = q.id % 2 === 0;
    doc.setFillColor(isEven ? 255 : 248, isEven ? 255 : 250, isEven ? 255 : 252);
    doc.rect(marginLeft, y, contentWidth, rowHeight, 'F');
    doc.setDrawColor(226, 232, 240);
    doc.rect(marginLeft, y, contentWidth, rowHeight, 'S');

    let curX = marginLeft;
    cols.forEach((col) => {
      let val = '';
      if (col.key === 'no') val = String(q.id);
      else if (col.key === 'topik') val = q.topic;
      else if (col.key === 'indicator') val = q.indicator;
      else if (col.key === 'level') val = q.level || 'L1';
      else if (col.key === 'bentuk') val = q.type === 'pg' ? 'PG' : 'PGK';
      else if (col.key === 'kunci') {
        val = Array.isArray(q.correctAnswer)
          ? q.correctAnswer.join(',')
          : q.correctAnswer || (q.type === 'pgk_kategori' ? 'B/S' : '-');
      } else if (col.key === 'benar') val = `${Math.round(correctCount)} / ${totalStudents}`;
      else if (col.key === 'dayaSerap') val = `${percent}%`;
      else if (col.key === 'klasifikasi') val = empiris;

      doc.setFont('helvetica', col.key === 'dayaSerap' || col.key === 'klasifikasi' ? 'bold' : 'normal');
      doc.setFontSize(7.2);

      if (col.key === 'klasifikasi') {
        doc.setTextColor(empiris === 'Mudah' ? 22 : empiris === 'Sedang' ? 37 : 225, empiris === 'Mudah' ? 101 : empiris === 'Sedang' ? 99 : 29, empiris === 'Mudah' ? 52 : empiris === 'Sedang' ? 235 : 72);
      } else {
        doc.setTextColor(30, 41, 59);
      }

      const textX = col.align === 'center' ? curX + col.width / 2 : curX + 2;

      if (col.key === 'indicator' || col.key === 'topik') {
        const lines = doc.splitTextToSize(val, col.width - 3);
        doc.text(lines, textX, y + 4);
      } else {
        doc.text(val, textX, y + 4.5, { align: col.align });
      }

      curX += col.width;
    });

    y += rowHeight;
  });

  if (y + 36 > pageHeight - 14) {
    doc.addPage();
    y = 18;
  } else {
    y += 8;
  }

  drawSignatures(doc, pageWidth, y, marginLeft, marginRight);

  const totalPages = doc.getNumberOfPages();
  for (let i = 1; i <= totalPages; i++) {
    doc.setPage(i);
    doc.setFont('helvetica', 'italic');
    doc.setFontSize(7);
    doc.setTextColor(148, 163, 184);
    doc.text(`Analisis Butir Soal Resmi • ${CONFIG.SEKOLAH} • ${CONFIG.MATA_PELAJARAN}`, marginLeft, pageHeight - 5);
    doc.text(`Halaman ${i} dari ${totalPages}`, pageWidth - marginRight, pageHeight - 5, { align: 'right' });
  }

  doc.save(`Laporan_Analisis_Butir_Soal_${CONFIG.MATA_PELAJARAN}_Kelas_${CONFIG.KELAS}.pdf`);
}

/**
 * 5. Ekspor Matriks Respon Siswa (Per Butir 1-40) ke Format CSV / Excel
 */
export function exportMatrixToCSV(results: ExamResult[], questions: Question[]): void {
  const headers = [
    'Timestamp',
    'Nama Siswa',
    'Kelas',
    'Nomor Absen',
    'Durasi',
    ...questions.map((q) => `Q${q.id}_(${q.type === 'pg' ? 'PG' : 'PGK'})`),
    'Total Skor',
    'Nilai Akhir',
    'Status KKTP',
  ];

  const rows = results.map((r) => {
    const qScores = questions.map((q) => {
      const resp = r.itemResponses?.[q.id];
      if (resp) {
        return resp.score;
      }
      return r.nilai >= CONFIG.KKTP ? (q.scoreWeight || 2) : 0;
    });

    return [
      `"${r.timestamp || ''}"`,
      `"${r.nama || ''}"`,
      `"${r.kelas || CONFIG.KELAS}"`,
      `"${r.noAbsen || ''}"`,
      `"${r.durasi || '-'}"`,
      ...qScores,
      r.totalSkor ?? r.nilai,
      r.nilai,
      `"${r.status}"`,
    ];
  });

  // Baris Ringkasan Daya Serap Bawah
  const totalStudents = results.length || 1;
  const bottomRowJumlahBenar = [
    '"STATISTIK"',
    '"Jumlah Siswa Benar"',
    '""',
    '""',
    '""',
    ...questions.map((q) => {
      let count = 0;
      results.forEach((r) => {
        const resp = r.itemResponses?.[q.id];
        if (resp && resp.status === 'benar') count++;
        else if (r.nilai >= CONFIG.KKTP) count++;
      });
      return count;
    }),
    '""',
    '""',
    '""',
  ];

  const bottomRowPersen = [
    '"STATISTIK"',
    '"Daya Serap (%)"',
    '""',
    '""',
    '""',
    ...questions.map((q) => {
      let count = 0;
      results.forEach((r) => {
        const resp = r.itemResponses?.[q.id];
        if (resp && resp.status === 'benar') count++;
        else if (r.nilai >= CONFIG.KKTP) count++;
      });
      return `"${Math.round((count / totalStudents) * 100)}%"`;
    }),
    '""',
    '""',
    '""',
  ];

  const csvContent =
    '\uFEFF' +
    [
      headers.join(','),
      ...rows.map((e) => e.join(',')),
      bottomRowJumlahBenar.join(','),
      bottomRowPersen.join(','),
    ].join('\n');

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute(
    'download',
    `Matriks_Respon_Butir_Soal_${CONFIG.MATA_PELAJARAN}_Kelas_${CONFIG.KELAS}.csv`
  );
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

/**
 * 6. Export Rekap Nilai Sederhana ke Format CSV
 */
export function exportResultsToCSV(results: ExamResult[]): void {
  const headers = [
    'Timestamp',
    'Nama Siswa',
    'Kelas',
    'Nomor Absen',
    'Tanggal Lahir',
    'Durasi',
    'Benar Penuh',
    'Sebagian',
    'Salah',
    'Nilai',
    'Status KKTP',
  ];

  const rows = results.map((r) => [
    `"${r.timestamp || ''}"`,
    `"${r.nama || ''}"`,
    `"${r.kelas || CONFIG.KELAS}"`,
    `"${r.noAbsen || ''}"`,
    `"${r.tglLahir || ''}"`,
    `"${r.durasi || '-'}"`,
    r.benar,
    r.sebagian || 0,
    r.salah,
    r.nilai,
    `"${r.status}"`,
  ]);

  const csvContent = '\uFEFF' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', `Rekap_Nilai_${CONFIG.MATA_PELAJARAN}_Kelas_${CONFIG.KELAS}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

/**
 * 7. Download Rekapitulasi Data Nilai Siswa (PDF Resmi)
 */
export function downloadResultsRecapPDF(results: ExamResult[]): void {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const marginLeft = 12;
  const marginRight = 12;
  const contentWidth = pageWidth - marginLeft - marginRight;

  const total = results.length;
  const lulus = results.filter((r) => r.status === 'Lulus' || r.nilai >= CONFIG.KKTP).length;
  const belumLulus = total - lulus;
  const persenLulus = total > 0 ? Math.round((lulus / total) * 100) : 0;
  const rataRata = total > 0 ? (results.reduce((acc, r) => acc + (r.nilai || 0), 0) / total).toFixed(1) : '0';
  const nilaiTertinggi = total > 0 ? Math.max(...results.map((r) => r.nilai || 0)) : 0;
  const nilaiTerendah = total > 0 ? Math.min(...results.map((r) => r.nilai || 0)) : 0;

  let y = drawOfficialKop(doc, pageWidth, 14);

  // Judul
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.text('DAFTAR REKAPITULASI NILAI ASESMEN SUMATIF', pageWidth / 2, y, { align: 'center' });
  y += 4.5;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.text(
    `Mata Pelajaran: ${CONFIG.MATA_PELAJARAN} • Lingkup Materi: ${CONFIG.MATERI} • Kelas ${CONFIG.KELAS} • KKTP: ${CONFIG.KKTP}`,
    pageWidth / 2,
    y,
    { align: 'center' }
  );
  y += 6;

  // Ringkasan Statistik
  doc.setDrawColor(203, 213, 225);
  doc.setFillColor(248, 250, 252);
  doc.roundedRect(marginLeft, y, contentWidth, 14, 1.5, 1.5, 'FD');

  const statCols = [
    { label: 'Total Peserta', val: `${total} Siswa` },
    { label: 'Jumlah Tuntas', val: `${lulus} Siswa (${persenLulus}%)` },
    { label: 'Remedial', val: `${belumLulus} Siswa` },
    { label: 'Rata-rata Kelas', val: `${rataRata}` },
    { label: 'Tertinggi / Terendah', val: `${nilaiTertinggi} / ${nilaiTerendah}` },
  ];
  const colW = contentWidth / statCols.length;
  statCols.forEach((col, idx) => {
    const cx = marginLeft + idx * colW + colW / 2;
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.5);
    doc.setTextColor(100, 116, 139);
    doc.text(col.label, cx, y + 5, { align: 'center' });
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9);
    doc.setTextColor(30, 41, 59);
    doc.text(col.val, cx, y + 10.5, { align: 'center' });
  });

  doc.setTextColor(0, 0, 0);
  y += 18;

  // Definisi Kolom Tabel
  const cols = [
    { key: 'no', title: 'No', width: 9, align: 'center' as const },
    { key: 'noAbsen', title: 'Absen', width: 13, align: 'center' as const },
    { key: 'nama', title: 'Nama Siswa', width: 56, align: 'left' as const },
    { key: 'kelas', title: 'Kelas', width: 12, align: 'center' as const },
    { key: 'benar', title: 'Benar', width: 13, align: 'center' as const },
    { key: 'salah', title: 'Salah', width: 13, align: 'center' as const },
    { key: 'nilai', title: 'Nilai', width: 14, align: 'center' as const },
    { key: 'status', title: 'Keterangan', width: 24, align: 'center' as const },
    { key: 'timestamp', title: 'Waktu Submit', width: 32, align: 'center' as const },
  ];

  const drawTableHeader = (curY: number) => {
    doc.setFillColor(30, 58, 138);
    doc.rect(marginLeft, curY, contentWidth, 7, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8);

    let curX = marginLeft;
    cols.forEach((col) => {
      const textX = col.align === 'center' ? curX + col.width / 2 : curX + 2;
      doc.text(col.title, textX, curY + 4.8, { align: col.align });
      curX += col.width;
    });
    doc.setTextColor(0, 0, 0);
  };

  drawTableHeader(y);
  y += 7;

  if (results.length === 0) {
    doc.setFont('helvetica', 'italic');
    doc.setFontSize(8.5);
    doc.setTextColor(100, 100, 100);
    doc.text('Belum ada data nilai siswa yang tersimpan.', pageWidth / 2, y + 8, { align: 'center' });
    y += 16;
  } else {
    results.forEach((r, idx) => {
      if (y + 6.5 > pageHeight - 38) {
        doc.addPage();
        y = 15;
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(8.5);
        doc.setTextColor(71, 85, 105);
        doc.text('Lanjutan Rekapitulasi Nilai Siswa:', marginLeft, y - 2);
        drawTableHeader(y);
        y += 7;
      }

      const isEven = idx % 2 === 0;
      doc.setFillColor(isEven ? 255 : 248, isEven ? 255 : 250, isEven ? 255 : 252);
      doc.rect(marginLeft, y, contentWidth, 6.5, 'F');
      doc.setDrawColor(226, 232, 240);
      doc.rect(marginLeft, y, contentWidth, 6.5, 'S');

      let curX = marginLeft;
      const isPass = r.status === 'Lulus' || r.nilai >= CONFIG.KKTP;

      cols.forEach((col) => {
        let val = '';
        if (col.key === 'no') val = String(idx + 1);
        else if (col.key === 'noAbsen') val = String(r.noAbsen || '-');
        else if (col.key === 'nama') val = r.nama || '-';
        else if (col.key === 'kelas') val = r.kelas || CONFIG.KELAS;
        else if (col.key === 'benar') val = String(r.benar ?? 0);
        else if (col.key === 'salah') val = String(r.salah ?? 0);
        else if (col.key === 'nilai') val = String(r.nilai ?? 0);
        else if (col.key === 'status') val = isPass ? 'Tuntas' : 'Remedial';
        else if (col.key === 'timestamp') val = (r.timestamp || '-').substring(0, 16);

        doc.setFont('helvetica', col.key === 'nilai' ? 'bold' : 'normal');
        doc.setFontSize(7.8);

        if (col.key === 'status') {
          doc.setTextColor(isPass ? 22 : 185, isPass ? 101 : 28, isPass ? 52 : 28);
        } else if (col.key === 'nilai') {
          doc.setTextColor(isPass ? 15 : 185, isPass ? 23 : 28, isPass ? 42 : 28);
        } else {
          doc.setTextColor(30, 41, 59);
        }

        const textX = col.align === 'center' ? curX + col.width / 2 : curX + 2;

        if (col.key === 'nama') {
          const truncated = doc.splitTextToSize(val, col.width - 3)[0] || val;
          doc.text(truncated, textX, y + 4.5);
        } else {
          doc.text(val, textX, y + 4.5, { align: col.align });
        }

        curX += col.width;
      });

      doc.setTextColor(0, 0, 0);
      y += 6.5;
    });
  }

  if (y + 38 > pageHeight - 16) {
    doc.addPage();
    y = 18;
  } else {
    y += 8;
  }

  drawSignatures(doc, pageWidth, y, marginLeft, marginRight);

  const totalPages = doc.getNumberOfPages();
  for (let i = 1; i <= totalPages; i++) {
    doc.setPage(i);
    doc.setFont('helvetica', 'italic');
    doc.setFontSize(7);
    doc.setTextColor(148, 163, 184);
    doc.text(
      `Dokumen Rekapitulasi Nilai Resmi • ${CONFIG.SEKOLAH} • Dicetak otomatis sistem`,
      marginLeft,
      pageHeight - 6
    );
    doc.text(`Halaman ${i} dari ${totalPages}`, pageWidth - marginRight, pageHeight - 6, {
      align: 'right',
    });
  }

  doc.save(`Rekap_Nilai_${CONFIG.MATA_PELAJARAN}_Kelas_${CONFIG.KELAS}.pdf`);
}
