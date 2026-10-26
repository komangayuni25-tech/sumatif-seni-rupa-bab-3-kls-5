import { Question } from '../types';

/**
 * Bank Soal Standar Asesmen Sumatif Mata Pelajaran SENI RUPA
 * Kelas 5 SD - Kurikulum Merdeka
 * Lingkup Materi: Menggambar Objek dengan Prinsip Ritme, Proporsi, dan Komposisi
 *
 * Komposisi Soal:
 * - 40 Butir Pilihan Ganda (PG) [Nomor 1 - 40] (Bobot: 2 poin/butir = 80 poin)
 * - 5 Butir Pilihan Ganda Kompleks Kategori (3 Pernyataan Benar/Salah) [Nomor 41 - 45] (Bobot: 4 poin/butir = 20 poin)
 * Total: 45 Butir Soal = 100 Poin
 *
 * Tujuan Pembelajaran (Elemen):
 * 1. Menerapkan prinsip ritme (pengulangan, transisi, dan oposisi) dalam menggambar
 * 2. Menerapkan prinsip proporsi dalam menggambar objek atau karya seni
 * 3. Menerapkan prinsip komposisi (keseimbangan simetris, asimetris, dan kesatuan) dalam menata objek
 */

export const INITIAL_QUESTIONS: Question[] = [
  // ==========================================
  // BAGIAN I: 40 SOAL PILIHAN GANDA (PG)
  // ==========================================

  // --- ELEMEN 1: PRINSIP RITME DALAM SENI RUPA (Soal 1 s.d. 15) ---
  {
    id: 1,
    type: 'pg',
    element: 'Menerapkan prinsip ritme (pengulangan, transisi, dan oposisi) dalam menggambar',
    topic: 'Pengertian Ritme dalam Seni Rupa',
    level: 'L1',
    difficulty: 'Mudah',
    scoreWeight: 2,
    indicator: 'Siswa dapat menjelaskan pengertian prinsip ritme (irama) dalam seni rupa.',
    image: `<svg viewBox="0 0 420 130" xmlns="http://www.w3.org/2000/svg" class="w-full h-auto">
      <defs>
        <linearGradient id="ritmeBg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#f8fafc"/>
          <stop offset="100%" stop-color="#e2e8f0"/>
        </linearGradient>
      </defs>
      <rect width="420" height="130" rx="12" fill="url(#ritmeBg)" stroke="#cbd5e1" stroke-width="1.5"/>
      <g transform="translate(30, 25)">
        <circle cx="20" cy="40" r="18" fill="#2563eb"/>
        <circle cx="80" cy="40" r="18" fill="#2563eb"/>
        <circle cx="140" cy="40" r="18" fill="#2563eb"/>
        <circle cx="200" cy="40" r="18" fill="#2563eb"/>
        <circle cx="260" cy="40" r="18" fill="#2563eb"/>
        <circle cx="320" cy="40" r="18" fill="#2563eb"/>
        <path d="M 20 70 Q 50 85, 80 70 T 140 70 T 200 70 T 260 70 T 320 70" fill="none" stroke="#f59e0b" stroke-width="3" stroke-dasharray="4,4"/>
        <text x="170" y="-8" font-family="sans-serif" font-size="12" font-weight="bold" fill="#1e293b" text-anchor="middle">Ritme Pengulangan Murni (Repetisi Beraturan)</text>
      </g>
    </svg>`,
    text: 'Perhatikan gambar di atas! Dalam seni rupa, kesan gerak teratur yang timbul karena adanya pengulangan unsur-unsur rupa seperti bentuk, garis, atau warna secara berkala disebut prinsip ...',
    options: [
      { id: 'A', text: 'Ritme (Irama)' },
      { id: 'B', text: 'Proporsi (Ukuran)' },
      { id: 'C', text: 'Gradasi Warna' },
      { id: 'D', text: 'Tekstur Semu' },
    ],
    correctAnswer: 'A',
    explanation: 'Ritme atau irama dalam seni rupa adalah susunan atau perulangan yang teratur dari elemen-elemen rupa (seperti garis, bentuk, atau warna) yang menghasilkan kesan gerak visual yang harmonis.'
  },
  {
    id: 2,
    type: 'pg',
    element: 'Menerapkan prinsip ritme (pengulangan, transisi, dan oposisi) dalam menggambar',
    topic: 'Ciri Ritme Repetisi Beraturan',
    level: 'L1',
    difficulty: 'Mudah',
    scoreWeight: 2,
    indicator: 'Siswa dapat mengidentifikasi ciri utama dari ritme pengulangan murni (repetisi beraturan).',
    text: 'Pada ritme pengulangan murni (repetisi beraturan), unsur rupa yang digambar memiliki karakteristik ...',
    options: [
      { id: 'A', text: 'Bentuk, ukuran, dan jarak jeda yang selalu sama persis secara konsisten' },
      { id: 'B', text: 'Ukuran yang terus membesar dari ujung kiri ke ujung kanan tanpa henti' },
      { id: 'C', text: 'Bentuk yang diletakkan secara acak tanpa aturan yang jelas' },
      { id: 'D', text: 'Warna yang selalu bertabrakan gelap dan terang secara bebas' },
    ],
    correctAnswer: 'A',
    explanation: 'Ritme repetisi murni (regular rhythm) ditandai dengan pengulangan bentuk, ukuran, dan jarak jeda yang identik serta seragam.'
  },
  {
    id: 3,
    type: 'pg',
    element: 'Menerapkan prinsip ritme (pengulangan, transisi, dan oposisi) dalam menggambar',
    topic: 'Ritme Transisi / Gradasi Ukuran',
    level: 'L2',
    difficulty: 'Sedang',
    scoreWeight: 2,
    indicator: 'Siswa dapat menentukan jenis ritme berdasarkan gambar perubahan ukuran bertahap.',
    image: `<svg viewBox="0 0 420 130" xmlns="http://www.w3.org/2000/svg" class="w-full h-auto">
      <rect width="420" height="130" rx="12" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1.5"/>
      <g transform="translate(30, 20)">
        <text x="180" y="5" font-family="sans-serif" font-size="12" font-weight="bold" fill="#0f172a" text-anchor="middle">Perubahan Bentuk Bertahap</text>
        <circle cx="30" cy="55" r="10" fill="#059669"/>
        <circle cx="85" cy="55" r="16" fill="#10b981"/>
        <circle cx="155" cy="55" r="23" fill="#34d399"/>
        <circle cx="240" cy="55" r="31" fill="#6ee7b7"/>
        <circle cx="340" cy="55" r="40" fill="#a7f3d0" stroke="#059669" stroke-width="2"/>
      </g>
    </svg>`,
    text: 'Perhatikan gambar susunan lingkaran di atas! Pola pengulangan yang mengalami perubahan ukuran dari kecil ke besar secara teratur dan berurutan disebut ritme ...',
    options: [
      { id: 'A', text: 'Transisi (Gradasi / Progresif)' },
      { id: 'B', text: 'Oposisi (Pertentangan)' },
      { id: 'C', text: 'Repetisi Beraturan' },
      { id: 'D', text: 'Acak Tak Beraturan' },
    ],
    correctAnswer: 'A',
    explanation: 'Ritme transisi (progressive/gradation rhythm) adalah pengulangan bentuk dengan perubahan secara bertahap atau berangsur-angsur, misalnya dari kecil ke besar atau terang ke gelap.'
  },
  {
    id: 4,
    type: 'pg',
    element: 'Menerapkan prinsip ritme (pengulangan, transisi, dan oposisi) dalam menggambar',
    topic: 'Ritme Oposisi / Selang-seling',
    level: 'L2',
    difficulty: 'Sedang',
    scoreWeight: 2,
    indicator: 'Siswa dapat menganalisis pola ritme oposisi (alternasi / selang-seling) pada karya seni.',
    image: `<svg viewBox="0 0 420 120" xmlns="http://www.w3.org/2000/svg" class="w-full h-auto">
      <rect width="420" height="120" rx="12" fill="#ffffff" stroke="#e2e8f0" stroke-width="1.5"/>
      <g transform="translate(25, 25)">
        <rect x="15" y="15" width="30" height="30" fill="#dc2626" rx="4"/>
        <polygon points="85,15 105,45 65,45" fill="#2563eb"/>
        <rect x="135" y="15" width="30" height="30" fill="#dc2626" rx="4"/>
        <polygon points="205,15 225,45 185,45" fill="#2563eb"/>
        <rect x="255" y="15" width="30" height="30" fill="#dc2626" rx="4"/>
        <polygon points="325,15 345,45 305,45" fill="#2563eb"/>
        <text x="180" y="65" font-family="sans-serif" font-size="11" fill="#475569" text-anchor="middle">Kotak Merah – Segitiga Biru – Kotak Merah – Segitiga Biru</text>
      </g>
    </svg>`,
    text: 'Susunan objek pada gambar di atas menampilkan bentuk persegi merah dan segitiga biru secara bergantian secara teratur. Jenis ritme ini dinamakan ritme ...',
    options: [
      { id: 'A', text: 'Oposisi (Selang-seling / Alternating)' },
      { id: 'B', text: 'Transisi Ukuran' },
      { id: 'C', text: 'Acak Bebas' },
      { id: 'D', text: 'Statik Tunggal' },
    ],
    correctAnswer: 'A',
    explanation: 'Ritme oposisi atau selang-seling (alternating rhythm) tercipta dari pengulangan dua atau lebih unsur rupa yang berbeda bentuk atau warnanya secara bergantian.'
  },
  {
    id: 5,
    type: 'pg',
    element: 'Menerapkan prinsip ritme (pengulangan, transisi, dan oposisi) dalam menggambar',
    topic: 'Ritme Mengalir dalam Alam',
    level: 'L2',
    difficulty: 'Sedang',
    scoreWeight: 2,
    indicator: 'Siswa dapat mengidentifikasi ritme mengalir yang terinspirasi dari alam sekitar.',
    image: `<svg viewBox="0 0 420 120" xmlns="http://www.w3.org/2000/svg" class="w-full h-auto">
      <defs>
        <linearGradient id="waveGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="#0284c7"/>
          <stop offset="100%" stop-color="#38bdf8"/>
        </linearGradient>
      </defs>
      <rect width="420" height="120" rx="12" fill="#f0f9ff" stroke="#bae6fd"/>
      <path d="M 20 60 Q 60 20, 100 60 T 180 60 T 260 60 T 340 60 T 400 60" fill="none" stroke="url(#waveGrad)" stroke-width="5" stroke-linecap="round"/>
      <path d="M 20 80 Q 60 40, 100 80 T 180 80 T 260 80 T 340 80 T 400 80" fill="none" stroke="#0ea5e9" stroke-width="3" stroke-linecap="round" opacity="0.6"/>
      <text x="210" y="105" font-family="sans-serif" font-size="11" font-weight="bold" fill="#0369a1" text-anchor="middle">Garis Lengkung Berulang Menyerupai Gelombang Air Laut</text>
    </svg>`,
    text: 'Contoh penerapan ritme mengalir (flowing rhythm) yang sering kita jumpai di alam sekitar dan dituangkan dalam gambar adalah ...',
    options: [
      { id: 'A', text: 'Gelombang ombak air laut dan helai rambut tertiup angin' },
      { id: 'B', text: 'Tiang bendera yang berdiri tegak lurus sendirian' },
      { id: 'C', text: 'Batu kali tunggal yang diletakkan di tengah lapangan' },
      { id: 'D', text: 'Garis patah-patah pada marka jalan raya' },
    ],
    correctAnswer: 'A',
    explanation: 'Ritme mengalir (flowing rhythm) dibentuk oleh garis-garis lengkung dinamis yang berulang secara teratur, seperti gerakan ombak laut, aliran sungai, atau rambut melambai.'
  },
  {
    id: 6,
    type: 'pg',
    element: 'Menerapkan prinsip ritme (pengulangan, transisi, dan oposisi) dalam menggambar',
    topic: 'Ritme pada Motif Tradisional Batik & Ukiran',
    level: 'L2',
    difficulty: 'Mudah',
    scoreWeight: 2,
    indicator: 'Siswa dapat menjelaskan bagaimana prinsip ritme diterapkan pada motif kain tradisional Nusantara.',
    text: 'Motif batik Kawung atau motif anyaman bambu merupakan contoh nyata penerapan prinsip ritme dalam seni rupa karena ...',
    options: [
      { id: 'A', text: 'Mengulang motif atau ragam hias yang sama secara teratur pada seluruh bidang kain' },
      { id: 'B', text: 'Hanya menggunakan satu macam warna tanpa ada motif sama sekali' },
      { id: 'C', text: 'Gambar dibuat sengaja tidak beraturan agar tampak berantakan' },
      { id: 'D', text: 'Bentuk motif tidak pernah terhubung satu dengan lainnya' },
    ],
    correctAnswer: 'A',
    explanation: 'Motif batik nusantara seperti Kawung menerapkan ritme repetisi beraturan dengan mengulang pola bulat lonjong berulang secara simetris dan teratur di seluruh permukaan kain.'
  },
  {
    id: 7,
    type: 'pg',
    element: 'Menerapkan prinsip ritme (pengulangan, transisi, dan oposisi) dalam menggambar',
    topic: 'Ritme Ukiran Ornamen Bali',
    level: 'L2',
    difficulty: 'Sedang',
    scoreWeight: 2,
    indicator: 'Siswa dapat mengidentifikasi ritme pada ragam hias ukiran ornamen Bali (patra).',
    image: `<svg viewBox="0 0 420 120" xmlns="http://www.w3.org/2000/svg" class="w-full h-auto">
      <rect width="420" height="120" rx="12" fill="#fffbeb" stroke="#fde68a" stroke-width="1.5"/>
      <g transform="translate(20, 15)">
        <path d="M 30 70 C 40 30, 70 30, 80 60 C 85 75, 95 75, 100 65" fill="none" stroke="#b45309" stroke-width="3"/>
        <path d="M 110 70 C 120 30, 150 30, 160 60 C 165 75, 175 75, 180 65" fill="none" stroke="#b45309" stroke-width="3"/>
        <path d="M 190 70 C 200 30, 230 30, 240 60 C 245 75, 255 75, 260 65" fill="none" stroke="#b45309" stroke-width="3"/>
        <path d="M 270 70 C 280 30, 310 30, 320 60 C 325 75, 335 75, 340 65" fill="none" stroke="#b45309" stroke-width="3"/>
        <circle cx="80" cy="50" r="5" fill="#f59e0b"/>
        <circle cx="160" cy="50" r="5" fill="#f59e0b"/>
        <circle cx="240" cy="50" r="5" fill="#f59e0b"/>
        <circle cx="320" cy="50" r="5" fill="#f59e0b"/>
        <text x="190" y="95" font-family="sans-serif" font-size="11" font-weight="bold" fill="#78350f" text-anchor="middle">Ragam Hias Patra Punggel Khas Ukiran Bali</text>
      </g>
    </svg>`,
    text: 'Seni ukir tradisional Bali seperti motif Patra Punggel menerapkan prinsip ritme dengan cara ...',
    options: [
      { id: 'A', text: 'Mengulang sulur-suluran daun dan bunga yang meliuk indah secara berkesinambungan' },
      { id: 'B', text: 'Menggambar garis lurus kaku tanpa lengkungan sama sekali' },
      { id: 'C', text: 'Membuat bentuk tidak jelas tanpa arah yang beraturan' },
      { id: 'D', text: 'Menghindari adanya keteraturan dalam penataan motif' },
    ],
    correctAnswer: 'A',
    explanation: 'Ragam hias ukiran Bali memanfaatkan prinsip ritme berulang yang dinamis melalui liukan sulur dedaunan (patra) yang mengalir teratur menciptakan irama visual yang khas.'
  },
  {
    id: 8,
    type: 'pg',
    element: 'Menerapkan prinsip ritme (pengulangan, transisi, dan oposisi) dalam menggambar',
    topic: 'Manfaat Ritme dalam Gambar',
    level: 'L1',
    difficulty: 'Mudah',
    scoreWeight: 2,
    indicator: 'Siswa dapat menjelaskan fungsi utama penerapan prinsip ritme dalam sebuah karya gambar.',
    text: 'Tujuan utama menerapkan prinsip ritme saat menggambar adalah agar karya seni yang dihasilkan ...',
    options: [
      { id: 'A', text: 'Tampak hidup, dinamis, berirama, dan tidak membosankan untuk dipandang' },
      { id: 'B', text: 'Menghabiskan seluruh ruang kertas tanpa menyisakan ruang kosong' },
      { id: 'C', text: 'Membuat mata pengamat cepat lelah karena banyaknya objek acak' },
      { id: 'D', text: 'Menghilangkan keindahan warna asli dari objek gambar' },
    ],
    correctAnswer: 'A',
    explanation: 'Ritme memberikan dinamika visual dan mengarahkan pandangan mata pengamat secara runtut, sehingga gambar terasa berirama, hidup, dan menarik.'
  },
  {
    id: 9,
    type: 'pg',
    element: 'Menerapkan prinsip ritme (pengulangan, transisi, dan oposisi) dalam menggambar',
    topic: 'Ritme Acak (Random Rhythm)',
    level: 'L3',
    difficulty: 'Sedang',
    scoreWeight: 2,
    indicator: 'Siswa dapat membedakan ritme acak (random rhythm) dari ritme teratur.',
    text: 'Seorang siswa menggambar rintik-rintik hujan yang jatuh di atas danau dengan ukuran tetesan yang berbeda dan posisi menyebar bebas. Jenis ritme ini digolongkan sebagai ...',
    options: [
      { id: 'A', text: 'Ritme acak (random rhythm)' },
      { id: 'B', text: 'Ritme repetisi murni' },
      { id: 'C', text: 'Ritme simetri kaku' },
      { id: 'D', text: 'Ritme garis sejajar' },
    ],
    correctAnswer: 'A',
    explanation: 'Ritme acak terjadi ketika unsur visual berulang tanpa interval atau pola yang pasti, seperti tetesan air hujan yang jatuh bebas atau daun-daun gugur yang berserakan.'
  },
  {
    id: 10,
    type: 'pg',
    element: 'Menerapkan prinsip ritme (pengulangan, transisi, dan oposisi) dalam menggambar',
    topic: 'Ritme Gradasi Warna',
    level: 'L2',
    difficulty: 'Sedang',
    scoreWeight: 2,
    indicator: 'Siswa dapat mengidentifikasi ritme yang dihasilkan dari gradasi warna.',
    image: `<svg viewBox="0 0 420 120" xmlns="http://www.w3.org/2000/svg" class="w-full h-auto">
      <rect width="420" height="120" rx="12" fill="#ffffff" stroke="#cbd5e1"/>
      <g transform="translate(30, 25)">
        <rect x="10" y="10" width="50" height="50" fill="#1e3a8a" rx="6"/>
        <rect x="75" y="10" width="50" height="50" fill="#2563eb" rx="6"/>
        <rect x="140" y="10" width="50" height="50" fill="#3b82f6" rx="6"/>
        <rect x="205" y="10" width="50" height="50" fill="#60a5fa" rx="6"/>
        <rect x="270" y="10" width="50" height="50" fill="#93c5fd" rx="6"/>
        <text x="165" y="78" font-family="sans-serif" font-size="11" font-weight="bold" fill="#1e3a8a" text-anchor="middle">Perubahan Nada Warna dari Biru Tua ke Biru Muda</text>
      </g>
    </svg>`,
    text: 'Perhatikan gambar di atas! Penataan warna kotak dari warna paling gelap berangsur-angsur menuju warna paling terang merupakan contoh penerapan ...',
    options: [
      { id: 'A', text: 'Ritme transisi gradasi warna' },
      { id: 'B', text: 'Ritme oposisi warna kontras' },
      { id: 'C', text: 'Keseimbangan asimetris' },
      { id: 'D', text: 'Proporsi bentuk geometris' },
    ],
    correctAnswer: 'A',
    explanation: 'Ritme transisi gradasi warna memperlihatkan perubahan nada (value/hue) warna secara bertingkat dan halus dari gelap ke terang atau sebaliknya.'
  },
  {
    id: 11,
    type: 'pg',
    element: 'Menerapkan prinsip ritme (pengulangan, transisi, dan oposisi) dalam menggambar',
    topic: 'Ritme pada Objek Tumbuhan',
    level: 'L2',
    difficulty: 'Mudah',
    scoreWeight: 2,
    indicator: 'Siswa dapat menentukan contoh ritme pada struktur bagian tumbuhan.',
    text: 'Bagian tumbuhan berikut ini yang menunjukkan ritme pengulangan berurutan secara alami adalah ...',
    options: [
      { id: 'A', text: 'Ruas-ruas batang pohon bambu dan susunan daun pohon kelapa' },
      { id: 'B', text: 'Sebuah biji mangga yang tertanam di dalam tanah' },
      { id: 'C', text: 'Satu helai kelopak bunga kamboja yang layu di rumput' },
      { id: 'D', text: 'Akar tunggang tunggal yang menembus tanah lurus' },
    ],
    correctAnswer: 'A',
    explanation: 'Ruas-ruas pada batang bambu dan susunan pelepah daun kelapa menunjukkan pengulangan bentuk berjarak teratur (ritme alamiah).'
  },
  {
    id: 12,
    type: 'pg',
    element: 'Menerapkan prinsip ritme (pengulangan, transisi, dan oposisi) dalam menggambar',
    topic: 'Penerapan Garis Ritmis',
    level: 'L3',
    difficulty: 'Sukar',
    scoreWeight: 2,
    indicator: 'Siswa dapat menganalisis efek ritmis dari variasi ketebalan garis.',
    text: 'Jika seorang siswa menggambar garis vertikal berulang dengan pola: garis tebal, garis tipis, garis tebal, garis tipis secara bergantian, maka ia sedang menciptakan efek ritme ...',
    options: [
      { id: 'A', text: 'Oposisi (kontras selang-seling ketebalan garis)' },
      { id: 'B', text: 'Gradasi memudar tanpa batas' },
      { id: 'C', text: 'Repetisi statis membosankan' },
      { id: 'D', text: 'Distorsi bentuk ruang' },
    ],
    correctAnswer: 'A',
    explanation: 'Perubahan kontras antara garis tebal dan tipis yang disusun bergantian merupakan penerapan ritme oposisi / selang-seling (alternating rhythm).'
  },
  {
    id: 13,
    type: 'pg',
    element: 'Menerapkan prinsip ritme (pengulangan, transisi, dan oposisi) dalam menggambar',
    topic: 'Ritme Melingkar / Spiral',
    level: 'L2',
    difficulty: 'Sedang',
    scoreWeight: 2,
    indicator: 'Siswa dapat mengidentifikasi ritme melingkar pada cangkang kerang atau rumah siput.',
    text: 'Pola garis melingkar yang membesar keluar secara berurutan seperti pada cangkang keong atau rumah siput menunjukkan penerapan ritme ...',
    options: [
      { id: 'A', text: 'Spiral / Radial bertransisi ukuran' },
      { id: 'B', text: 'Garis lurus horizontal' },
      { id: 'C', text: 'Oposisi sudut siku-siku' },
      { id: 'D', text: 'Pola acak tanpa titik pusat' },
    ],
    correctAnswer: 'A',
    explanation: 'Bentuk cangkang siput mengikuti pola spiral dengan ritme transisi ukuran yang berputar membesar dari pusat ke arah luar secara proporsional.'
  },
  {
    id: 14,
    type: 'pg',
    element: 'Menerapkan prinsip ritme (pengulangan, transisi, dan oposisi) dalam menggambar',
    topic: 'Pengaruh Jarak Interval pada Ritme',
    level: 'L3',
    difficulty: 'Sukar',
    scoreWeight: 2,
    indicator: 'Siswa dapat menganalisis pengaruh perubahan jarak (interval) antar objek terhadap kecepatan ritme visual.',
    text: 'Ketika jarak spasi antar objek yang diulang dibuat semakin rapat, efek ritme yang dirasakan oleh pengamat adalah ...',
    options: [
      { id: 'A', text: 'Kesan gerak visual terasa lebih cepat dan padat' },
      { id: 'B', text: 'Kesan gambar menjadi berhenti total dan kaku' },
      { id: 'C', text: 'Kesan objek berubah menjadi transparan' },
      { id: 'D', text: 'Kesan warna berubah menjadi hitam putih' },
    ],
    correctAnswer: 'A',
    explanation: 'Dalam seni rupa, interval spasi yang semakin rapat mempercepat tempo visual, sementara interval yang renggang memberikan tempo yang lambat dan tenang.'
  },
  {
    id: 15,
    type: 'pg',
    element: 'Menerapkan prinsip ritme (pengulangan, transisi, dan oposisi) dalam menggambar',
    topic: 'Karya Seni Menggabungkan 2 Jenis Ritme',
    level: 'L3',
    difficulty: 'Sukar',
    scoreWeight: 2,
    indicator: 'Siswa dapat menganalisis penggabungan ritme repetisi dan ritme gradasi warna.',
    text: 'Made menggambar deretan pohon kelapa dengan bentuk dan jarak yang sama, namun warna daunnya berubah bertahap dari hijau tua hingga hijau muda kekuningan. Made menggabungkan dua jenis ritme, yaitu ...',
    options: [
      { id: 'A', text: 'Ritme repetisi bentuk dan ritme transisi gradasi warna' },
      { id: 'B', text: 'Ritme acak bentuk dan ritme garis patah' },
      { id: 'C', text: 'Ritme oposisi tajam dan ritme statis monokrom' },
      { id: 'D', text: 'Ritme melingkar spiral dan ritme distorsi' },
    ],
    correctAnswer: 'A',
    explanation: 'Bentuk dan jarak pohon yang sama merupakan repetisi murni, sedangkan perubahan warna daun secara bertingkat merupakan transisi gradasi warna.'
  },

  // --- ELEMEN 2: PRINSIP PROPORSI DALAM SEBUAH OBJEK ATAU KARYA SENI (Soal 16 s.d. 28) ---
  {
    id: 16,
    type: 'pg',
    element: 'Menerapkan prinsip proporsi dalam menggambar objek atau karya seni',
    topic: 'Pengertian Prinsip Proporsi',
    level: 'L1',
    difficulty: 'Mudah',
    scoreWeight: 2,
    indicator: 'Siswa dapat menjelaskan pengertian prinsip proporsi dalam seni rupa.',
    text: 'Perbandingan ukuran keserasian antara bagian yang satu dengan bagian yang lain, atau antara bagian dengan keseluruhan objek gambar disebut prinsip ...',
    options: [
      { id: 'A', text: 'Proporsi (Kesebandingan)' },
      { id: 'B', text: 'Ritme (Irama)' },
      { id: 'C', text: 'Tekstur Permukaan' },
      { id: 'D', text: 'Perspektif Bayangan' },
    ],
    correctAnswer: 'A',
    explanation: 'Proporsi adalah perbandingan ukuran dan bentuk antara bagian-bagian dalam satu kesatuan objek agar tampak wajar, seimbang, dan sedap dipandang.'
  },
  {
    id: 17,
    type: 'pg',
    element: 'Menerapkan prinsip proporsi dalam menggambar objek atau karya seni',
    topic: 'Kanon Standar Proporsi Tubuh Manusia',
    level: 'L2',
    difficulty: 'Sedang',
    scoreWeight: 2,
    indicator: 'Siswa dapat menentukan satuan ukuran pembanding dalam menggambar tubuh manusia secara proporsional.',
    image: `<svg viewBox="0 0 420 150" xmlns="http://www.w3.org/2000/svg" class="w-full h-auto">
      <rect width="420" height="150" rx="12" fill="#f8fafc" stroke="#cbd5e1"/>
      <g transform="translate(140, 10)">
        <text x="70" y="10" font-family="sans-serif" font-size="11" font-weight="bold" fill="#0f172a" text-anchor="middle">Standar Kanon Tubuh Manusia (7 - 8 Kepala)</text>
        <!-- Garis pembagi 7.5 bagian -->
        <g stroke="#94a3b8" stroke-dasharray="2,2" stroke-width="1">
          <line x1="-30" y1="20" x2="170" y2="20"/>
          <line x1="-30" y1="36" x2="170" y2="36"/>
          <line x1="-30" y1="52" x2="170" y2="52"/>
          <line x1="-30" y1="68" x2="170" y2="68"/>
          <line x1="-30" y1="84" x2="170" y2="84"/>
          <line x1="-30" y1="100" x2="170" y2="100"/>
          <line x1="-30" y1="116" x2="170" y2="116"/>
          <line x1="-30" y1="132" x2="170" y2="132"/>
        </g>
        <!-- Figur Manusia Sederhana -->
        <circle cx="70" cy="28" r="8" fill="#3b82f6"/>
        <line x1="70" y1="36" x2="70" y2="84" stroke="#1d4ed8" stroke-width="3"/>
        <line x1="50" y1="48" x2="90" y2="48" stroke="#1d4ed8" stroke-width="3"/>
        <line x1="50" y1="48" x2="45" y2="80" stroke="#1d4ed8" stroke-width="2.5"/>
        <line x1="90" y1="48" x2="95" y2="80" stroke="#1d4ed8" stroke-width="2.5"/>
        <line x1="70" y1="84" x2="55" y2="132" stroke="#1d4ed8" stroke-width="3"/>
        <line x1="70" y1="84" x2="85" y2="132" stroke="#1d4ed8" stroke-width="3"/>
        <!-- Label Angka Satuan Kepala -->
        <text x="-15" y="30" font-family="sans-serif" font-size="9" fill="#64748b">1 Kepala</text>
        <text x="-15" y="75" font-family="sans-serif" font-size="9" fill="#64748b">Pinggang</text>
        <text x="-15" y="130" font-family="sans-serif" font-size="9" fill="#64748b">Kaki (7.5x)</text>
      </g>
    </svg>`,
    text: 'Dalam ilmu seni rupa menggambar manusia (figuratif), ukuran yang dijadikan patokan standar untuk mengukur tinggi proporsi tubuh manusia dewasa ideal adalah tinggi ...',
    options: [
      { id: 'A', text: 'Kepala orang tersebut (sekitar 7 s.d. 8 kali tinggi kepala)' },
      { id: 'B', text: 'Telapak tangan orang tersebut (sekitar 20 kali panjang telapak)' },
      { id: 'C', text: 'Panjang ibu jari tangan kanan' },
      { id: 'D', text: 'Lebar bahu orang tersebut' },
    ],
    correctAnswer: 'A',
    explanation: 'Kanon proporsi tubuh manusia dewasa standar menggunakan tinggi kepala sebagai satuan ukuran pembanding, di mana tinggi tubuh dewasa ideal adalah sekitar 7 hingga 8 kali tinggi kepalanya.'
  },
  {
    id: 18,
    type: 'pg',
    element: 'Menerapkan prinsip proporsi dalam menggambar objek atau karya seni',
    topic: 'Proporsi Tubuh Anak-anak',
    level: 'L2',
    difficulty: 'Sedang',
    scoreWeight: 2,
    indicator: 'Siswa dapat membedakan proporsi tinggi tubuh anak SD dengan orang dewasa.',
    text: 'Dibandingkan dengan orang dewasa, proporsi tubuh anak usia sekolah dasar memiliki perbandingan kepala yang ...',
    options: [
      { id: 'A', text: 'Lebih besar terhadap tinggi tubuhnya (sekitar 5 sampai 6 kali tinggi kepala)' },
      { id: 'B', text: 'Jauh lebih kecil dibandingkan orang dewasa (sekitar 10 kali tinggi kepala)' },
      { id: 'C', text: 'Sama persis tanpa ada perbedaan perbandingan' },
      { id: 'D', text: 'Hanya 2 kali tinggi kepala' },
    ],
    correctAnswer: 'A',
    explanation: 'Pada anak-anak, ukuran kepala relatif lebih besar terhadap panjang tubuhnya dibandingkan orang dewasa, yaitu sekitar 5 sampai 6 kali tinggi kepala.'
  },
  {
    id: 19,
    type: 'pg',
    element: 'Menerapkan prinsip proporsi dalam menggambar objek atau karya seni',
    topic: 'Proporsi Wajah Manusia',
    level: 'L2',
    difficulty: 'Sedang',
    scoreWeight: 2,
    indicator: 'Siswa dapat menentukan letak posisi mata pada proporsi wajah manusia.',
    image: `<svg viewBox="0 0 420 140" xmlns="http://www.w3.org/2000/svg" class="w-full h-auto">
      <rect width="420" height="140" rx="12" fill="#ffffff" stroke="#e2e8f0"/>
      <g transform="translate(130, 10)">
        <ellipse cx="80" cy="60" rx="45" ry="55" fill="#fef3c7" stroke="#d97706" stroke-width="2"/>
        <!-- Garis bantu mata di tengah-tengah tinggi kepala -->
        <line x1="20" y1="60" x2="140" y2="60" stroke="#ef4444" stroke-width="1.5" stroke-dasharray="3,3"/>
        <text x="145" y="63" font-family="sans-serif" font-size="9" font-weight="bold" fill="#ef4444">Garis Mata (1/2 Tinggi Wajah)</text>
        <!-- Mata -->
        <circle cx="62" cy="60" r="4" fill="#1e293b"/>
        <circle cx="98" cy="60" r="4" fill="#1e293b"/>
        <!-- Alis -->
        <path d="M 52 50 Q 62 46, 72 50" fill="none" stroke="#78350f" stroke-width="2"/>
        <path d="M 88 50 Q 98 46, 108 50" fill="none" stroke="#78350f" stroke-width="2"/>
        <!-- Hidung di 3/4 -->
        <line x1="25" y1="82" x2="135" y2="82" stroke="#3b82f6" stroke-width="1" stroke-dasharray="2,2"/>
        <text x="145" y="85" font-family="sans-serif" font-size="9" fill="#3b82f6">Ujung Hidung</text>
        <path d="M 80 62 L 77 82 L 83 82" fill="none" stroke="#d97706" stroke-width="2"/>
        <!-- Bibir -->
        <line x1="30" y1="98" x2="130" y2="98" stroke="#10b981" stroke-width="1" stroke-dasharray="2,2"/>
        <text x="145" y="101" font-family="sans-serif" font-size="9" fill="#10b981">Garis Bibir</text>
        <path d="M 70 98 Q 80 94, 90 98 Q 80 103, 70 98" fill="#f43f5e"/>
      </g>
    </svg>`,
    text: 'Perhatikan panduan menggambar wajah manusia di atas! Menurut aturan proporsi wajah yang benar, posisi kedua mata secara vertikal terletak tepat pada ...',
    options: [
      { id: 'A', text: 'Garis tengah horizontal (separuh tinggi) dari keseluruhan kepala' },
      { id: 'B', text: 'Bagian paling atas dekat dengan garis rambut' },
      { id: 'C', text: 'Tepat bersentuhan dengan garis dagu bawah' },
      { id: 'D', text: 'Garis seperempat dari bagian bawah dagu' },
    ],
    correctAnswer: 'A',
    explanation: 'Dalam proporsi anatomi wajah, garis horizontal mata terletak tepat di pertengahan antara puncak kepala dan ujung dagu bawah.'
  },
  {
    id: 20,
    type: 'pg',
    element: 'Menerapkan prinsip proporsi dalam menggambar objek atau karya seni',
    topic: 'Jarak Antara Kedua Mata',
    level: 'L3',
    difficulty: 'Sukar',
    scoreWeight: 2,
    indicator: 'Siswa dapat menentukan ukuran jarak yang proporsional antara mata kiri dan mata kanan.',
    text: 'Pada gambar wajah manusia tampak depan, jarak yang proporsional antara mata kiri dan mata kanan adalah sama dengan ...',
    options: [
      { id: 'A', text: 'Lebar dari satu buah mata itu sendiri' },
      { id: 'B', text: 'Tiga kali lebar mata' },
      { id: 'C', text: 'Setengah lebar telinga' },
      { id: 'D', text: 'Panjang keseluruhan hidung' },
    ],
    correctAnswer: 'A',
    explanation: 'Kanon proporsi wajah menetapkan bahwa lebar wajah setara dengan 5 lebar mata, dan jarak ruang kosong antara kedua mata sama persis dengan lebar 1 mata.'
  },
  {
    id: 21,
    type: 'pg',
    element: 'Menerapkan prinsip proporsi dalam menggambar objek atau karya seni',
    topic: 'Proporsi Alam Benda (Still Life)',
    level: 'L2',
    difficulty: 'Mudah',
    scoreWeight: 2,
    indicator: 'Siswa dapat menerapkan prinsip proporsi saat menggambar susunan benda di atas meja.',
    image: `<svg viewBox="0 0 420 130" xmlns="http://www.w3.org/2000/svg" class="w-full h-auto">
      <rect width="420" height="130" rx="12" fill="#f8fafc" stroke="#cbd5e1"/>
      <g transform="translate(60, 15)">
        <!-- Meja -->
        <line x1="0" y1="95" x2="300" y2="95" stroke="#94a3b8" stroke-width="2"/>
        <!-- Teko Teh Besar -->
        <rect x="50" y="35" width="60" height="60" rx="8" fill="#3b82f6"/>
        <path d="M 50 50 Q 30 60, 50 80" fill="none" stroke="#1d4ed8" stroke-width="4"/>
        <path d="M 110 55 L 130 45" stroke="#1d4ed8" stroke-width="5" stroke-linecap="round"/>
        <text x="80" y="115" font-family="sans-serif" font-size="10" font-weight="bold" fill="#1e293b" text-anchor="middle">Teko Teh</text>
        <!-- Cangkir Kecil Proporsional -->
        <rect x="160" y="65" width="35" height="30" rx="4" fill="#f59e0b"/>
        <path d="M 195 72 Q 208 80, 195 88" fill="none" stroke="#d97706" stroke-width="3"/>
        <text x="180" y="115" font-family="sans-serif" font-size="10" font-weight="bold" fill="#1e293b" text-anchor="middle">Cangkir</text>
        <!-- Buah Apel -->
        <circle cx="235" cy="80" r="15" fill="#ef4444"/>
        <path d="M 235 65 Q 238 58, 245 58" fill="none" stroke="#15803d" stroke-width="2"/>
        <text x="235" y="115" font-family="sans-serif" font-size="10" font-weight="bold" fill="#1e293b" text-anchor="middle">Apel</text>
      </g>
    </svg>`,
    text: 'Saat menggambar susunan benda still life seperti pada gambar di atas, gambar dikatakan proporsional jika ...',
    options: [
      { id: 'A', text: 'Ukuran cangkir digambar lebih kecil daripada teko dan wajar dibanding buah apel' },
      { id: 'B', text: 'Ukuran buah apel digambar tiga kali lebih besar daripada teko teh' },
      { id: 'C', text: 'Cangkir teh digambar setinggi meja dan menutupi teko' },
      { id: 'D', text: 'Semua benda digambar dengan ukuran bulat yang persis sama' },
    ],
    correctAnswer: 'A',
    explanation: 'Proporsi alam benda menuntut perbandingan ukuran nyata antar benda yang masuk akal, di mana teko lebih besar daripada cangkir dan cangkir serasi dengan buah di sebelahnya.'
  },
  {
    id: 22,
    type: 'pg',
    element: 'Menerapkan prinsip proporsi dalam menggambar objek atau karya seni',
    topic: 'Dampak Mengabaikan Proporsi',
    level: 'L3',
    difficulty: 'Sedang',
    scoreWeight: 2,
    indicator: 'Siswa dapat menganalisis dampak gambar jika perbandingan proporsi diabaikan.',
    text: 'Jika seorang siswa menggambar manusia dengan telapak tangan yang ukurannya lebih besar daripada seluruh kepalanya, kesan visual yang muncul pada gambar tersebut adalah ...',
    options: [
      { id: 'A', text: 'Tampak janggal, aneh, dan tidak proporsional' },
      { id: 'B', text: 'Tampak sangat nyata dan anggun' },
      { id: 'C', text: 'Memiliki ritme gradasi warna yang sempurna' },
      { id: 'D', text: 'Memiliki komposisi simetris yang resmi' },
    ],
    correctAnswer: 'A',
    explanation: 'Ukuran telapak tangan manusia normalnya setara dengan luas wajah (dari dagu hingga garis alis). Jika digambar lebih besar dari kepala, gambar akan terlihat janggal.'
  },
  {
    id: 23,
    type: 'pg',
    element: 'Menerapkan prinsip proporsi dalam menggambar objek atau karya seni',
    topic: 'Distorsi Proporsi pada Gambar Karikatur',
    level: 'L2',
    difficulty: 'Sedang',
    scoreWeight: 2,
    indicator: 'Siswa dapat menjelaskan tujuan pengubahan proporsi (distorsi) pada gambar karikatur.',
    text: 'Pada gambar karikatur, seniman sengaja menggambar kepala tokoh jauh lebih besar daripada tubuhnya yang kerdil. Pengubahan proporsi ini bertujuan untuk ...',
    options: [
      { id: 'A', text: 'Memberikan kesan lucu, melebih-lebihkan karakter, dan sindiran ekspresif' },
      { id: 'B', text: 'Membuat gambar menjadi foto rontgen kedokteran' },
      { id: 'C', text: 'Menghindari penggunaan warna cerah' },
      { id: 'D', text: 'Memenuhi aturan anatomi manusia secara ilmiah' },
    ],
    correctAnswer: 'A',
    explanation: 'Dalam karikatur, proporsi sengaja dideformasi atau didistorsi (dilebih-lebihkan) untuk menciptakan efek humor, penegasan ciri khas, atau pesan komikal.'
  },
  {
    id: 24,
    type: 'pg',
    element: 'Menerapkan prinsip proporsi dalam menggambar objek atau karya seni',
    topic: 'Proporsi Daun dan Tangkai Tanaman',
    level: 'L2',
    difficulty: 'Mudah',
    scoreWeight: 2,
    indicator: 'Siswa dapat menentukan proporsi yang tepat saat menggambar pohon dan daunnya.',
    text: 'Ketika menggambar pohon beringin yang besar dan rindang dari kejauhan, ukuran sehelai daun seharusnya digambar ...',
    options: [
      { id: 'A', text: 'Sangat kecil atau berupa rumpun tekstur dedaunan agar proporsional dengan batangnya yang raksasa' },
      { id: 'B', text: 'Lebih besar daripada akar gantung pohon' },
      { id: 'C', text: 'Sama besar dengan dahan pohon utama' },
      { id: 'D', text: 'Menutupi seluruh batang pohon hingga tidak terlihat' },
    ],
    correctAnswer: 'A',
    explanation: 'Dilihat dari kejauhan, daun-daun pada pohon besar tidak digambar satu per satu secara raksasa melainkan berupa rumpun massa daun yang proporsional dengan ukuran batang.'
  },
  {
    id: 25,
    type: 'pg',
    element: 'Menerapkan prinsip proporsi dalam menggambar objek atau karya seni',
    topic: 'Teknik Sketsa Garis Bantu Proporsi',
    level: 'L2',
    difficulty: 'Sedang',
    scoreWeight: 2,
    indicator: 'Siswa dapat menyebutkan alat bantu untuk menjaga ketepatan proporsi saat mulai menggambar.',
    text: 'Untuk membantu menjaga ketepatan perbandingan ukuran objek saat menggambar, langkah awal yang paling tepat dilakukan adalah ...',
    options: [
      { id: 'A', text: 'Membuat garis kisi (grid) atau sketsa garis bantu tipis dengan pensil' },
      { id: 'B', text: 'Langsung mewarnai dengan cat air tebal tanpa sketsa' },
      { id: 'C', text: 'Menjiplak uang koin pada seluruh bidang kertas' },
      { id: 'D', text: 'Menggunakan spidol permanen hitam langsung di kertas' },
    ],
    correctAnswer: 'A',
    explanation: 'Membuat sketsa awal dan garis bantu tipis membantu seniman mengukur dan membandingkan proporsi antar bagian sebelum melanjutkan ke proses pewarnaan.'
  },
  {
    id: 26,
    type: 'pg',
    element: 'Menerapkan prinsip proporsi dalam menggambar objek atau karya seni',
    topic: 'Konsep Skala Proporsi Objek Jauh dan Dekat',
    level: 'L3',
    difficulty: 'Sukar',
    scoreWeight: 2,
    indicator: 'Siswa dapat menganalisis proporsi objek dalam pandangan perspektif (jauh-dekat).',
    text: 'Dalam gambar pemandangan, mobil yang berada di kejauhan digambar lebih kecil daripada manusia yang berdiri tepat di depan mata pengamat. Hal ini terjadi karena penerapan ...',
    options: [
      { id: 'A', text: 'Prinsip proporsi yang dipengaruhi oleh jarak pandang perspektif' },
      { id: 'B', text: 'Kesalahan siswa yang lupa ukuran asli mobil' },
      { id: 'C', text: 'Penerapan ritme acak pada roda kendaraan' },
      { id: 'D', text: 'Penggunaan warna monokrom' },
    ],
    correctAnswer: 'A',
    explanation: 'Dalam gambar perspektif, objek yang posisinya jauh akan tampak lebih kecil dibandingkan objek yang berada dekat dengan pengamat, menciptakan kedalaman ruang yang proporsional.'
  },
  {
    id: 27,
    type: 'pg',
    element: 'Menerapkan prinsip proporsi dalam menggambar objek atau karya seni',
    topic: 'Proporsi Posisi Daun Telinga Manusia',
    level: 'L3',
    difficulty: 'Sukar',
    scoreWeight: 2,
    indicator: 'Siswa dapat menentukan ketinggian letak daun telinga terhadap fitur wajah lainnya.',
    text: 'Berdasarkan proporsi wajah manusia normal tampak depan, daun telinga terletak sejajar di antara ...',
    options: [
      { id: 'A', text: 'Ketinggian garis alis mata sampai ke dasar ujung hidung' },
      { id: 'B', text: 'Puncak dahi sampai ke garis mata' },
      { id: 'C', text: 'Dasar hidung sampai ke ujung dagu' },
      { id: 'D', text: 'Tepat di bawah bibir bagian bawah' },
    ],
    correctAnswer: 'A',
    explanation: 'Ujung atas daun telinga normalnya sejajar dengan garis alis mata, sedangkan ujung bawah daun telinga sejajar dengan bagian bawah dasar hidung.'
  },
  {
    id: 28,
    type: 'pg',
    element: 'Menerapkan prinsip proporsi dalam menggambar objek atau karya seni',
    topic: 'Rasio Emas (Golden Ratio) dalam Proporsi',
    level: 'L1',
    difficulty: 'Sedang',
    scoreWeight: 2,
    indicator: 'Siswa dapat mengetahui istilah perbandingan proporsi estetis dalam sejarah seni rupa dunia.',
    text: 'Perbandingan rasio ukuran istimewa (kira-kira 1 : 1,618) yang sering digunakan para maestro seni untuk menciptakan proporsi karya seni yang paling indah dan nyaman dipandang disebut ...',
    options: [
      { id: 'A', text: 'Rasio Emas (Golden Ratio)' },
      { id: 'B', text: 'Rasio Silang' },
      { id: 'C', text: 'Skala Milimeter' },
      { id: 'D', text: 'Sudut Refleksi' },
    ],
    correctAnswer: 'A',
    explanation: 'Rasio Emas (Golden Ratio / Proporsi Emas) adalah perbandingan proporsi estetika matematis alamiah yang banyak digunakan dalam seni lukis, patung, dan arsitektur kuno hingga modern.'
  },

  // --- ELEMEN 3: PRINSIP KOMPOSISI DALAM MENATA OBJEK GAMBAR (Soal 29 s.d. 40) ---
  {
    id: 29,
    type: 'pg',
    element: 'Menerapkan prinsip komposisi (keseimbangan simetris, asimetris, dan kesatuan) dalam menata objek',
    topic: 'Pengertian Komposisi',
    level: 'L1',
    difficulty: 'Mudah',
    scoreWeight: 2,
    indicator: 'Siswa dapat menjelaskan pengertian komposisi dalam seni rupa.',
    text: 'Cara menyusun, mengatur, dan menata unsur-unsur rupa (seperti garis, bentuk, bidang, dan warna) di atas bidang gambar agar menjadi satu kesatuan yang selaras dan harmonis disebut prinsip ...',
    options: [
      { id: 'A', text: 'Komposisi' },
      { id: 'B', text: 'Kolase' },
      { id: 'C', text: 'Mozaik' },
      { id: 'D', text: 'Dekorasi' },
    ],
    correctAnswer: 'A',
    explanation: 'Komposisi berasal dari kata "compose" yang berarti menata atau menyusun bagian-bagian rupa sehingga saling terhubung membentuk kesatuan gambar yang indah.'
  },
  {
    id: 30,
    type: 'pg',
    element: 'Menerapkan prinsip komposisi (keseimbangan simetris, asimetris, dan kesatuan) dalam menata objek',
    topic: 'Komposisi Simetris (Keseimbangan Formal)',
    level: 'L2',
    difficulty: 'Mudah',
    scoreWeight: 2,
    indicator: 'Siswa dapat mengidentifikasi ciri dan kesan dari komposisi simetris.',
    image: `<svg viewBox="0 0 420 130" xmlns="http://www.w3.org/2000/svg" class="w-full h-auto">
      <rect width="420" height="130" rx="12" fill="#ffffff" stroke="#cbd5e1"/>
      <g transform="translate(60, 15)">
        <!-- Garis Simetri Tengah -->
        <line x1="150" y1="5" x2="150" y2="95" stroke="#ef4444" stroke-width="1.5" stroke-dasharray="3,3"/>
        <text x="150" y="108" font-family="sans-serif" font-size="10" font-weight="bold" fill="#ef4444" text-anchor="middle">Sumbu Cermin Keseimbangan</text>
        <!-- Objek Kiri -->
        <rect x="50" y="30" width="40" height="40" fill="#3b82f6" rx="4"/>
        <circle cx="70" cy="50" r="12" fill="#ffffff"/>
        <!-- Objek Kanan (Persis Sama) -->
        <rect x="210" y="30" width="40" height="40" fill="#3b82f6" rx="4"/>
        <circle cx="230" cy="50" r="12" fill="#ffffff"/>
      </g>
    </svg>`,
    text: 'Perhatikan gambar di atas! Penataan objek di mana bagian sebelah kiri dan bagian sebelah kanan memiliki bentuk, ukuran, dan posisi yang sama persis seperti cermin disebut komposisi ...',
    options: [
      { id: 'A', text: 'Simetris (Keseimbangan Formal)' },
      { id: 'B', text: 'Asimetris (Keseimbangan Informal)' },
      { id: 'C', text: 'Komposisi Acak' },
      { id: 'D', text: 'Komposisi Menumpuk' },
    ],
    correctAnswer: 'A',
    explanation: 'Komposisi simetris menempatkan objek dengan bobot dan bentuk yang sama pada kedua sisi sumbu tengah, memberikan kesan resmi, tenang, kokoh, dan seimbang.'
  },
  {
    id: 31,
    type: 'pg',
    element: 'Menerapkan prinsip komposisi (keseimbangan simetris, asimetris, dan kesatuan) dalam menata objek',
    topic: 'Kesan Komposisi Simetris',
    level: 'L2',
    difficulty: 'Sedang',
    scoreWeight: 2,
    indicator: 'Siswa dapat menentukan kesan psikologis yang ditimbulkan oleh komposisi simetris.',
    text: 'Kesan psikologis yang ditimbulkan oleh penerapan komposisi simetris dalam sebuah karya gambar adalah ...',
    options: [
      { id: 'A', text: 'Tenang, stabil, agung, teratur, dan resmi' },
      { id: 'B', text: 'Gelisah, kacau, dan berantakan' },
      { id: 'C', text: 'Melayang bebas dan berubah-ubah' },
      { id: 'D', text: 'Lucu dan membuat tertawa' },
    ],
    correctAnswer: 'A',
    explanation: 'Komposisi simetris sering digunakan pada bangunan istana, tempat ibadah, atau gapura karena memberikan kesan kokoh, tenang, agung, dan formal.'
  },
  {
    id: 32,
    type: 'pg',
    element: 'Menerapkan prinsip komposisi (keseimbangan simetris, asimetris, dan kesatuan) dalam menata objek',
    topic: 'Komposisi Asimetris (Keseimbangan Dinamis)',
    level: 'L2',
    difficulty: 'Sedang',
    scoreWeight: 2,
    indicator: 'Siswa dapat menganalisis ciri komposisi asimetris.',
    image: `<svg viewBox="0 0 420 130" xmlns="http://www.w3.org/2000/svg" class="w-full h-auto">
      <rect width="420" height="130" rx="12" fill="#f8fafc" stroke="#cbd5e1"/>
      <g transform="translate(60, 15)">
        <line x1="150" y1="5" x2="150" y2="95" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="2,2"/>
        <!-- Sisi Kiri: 1 Objek Besar -->
        <circle cx="70" cy="50" r="32" fill="#10b981"/>
        <text x="70" y="54" font-family="sans-serif" font-size="10" font-weight="bold" fill="#ffffff" text-anchor="middle">1 Besar</text>
        <!-- Sisi Kanan: 3 Objek Kecil yang Menyeimbangkan Bobot Visual -->
        <circle cx="200" cy="35" r="15" fill="#f59e0b"/>
        <circle cx="240" cy="55" r="14" fill="#f59e0b"/>
        <circle cx="210" cy="72" r="13" fill="#f59e0b"/>
        <text x="150" y="110" font-family="sans-serif" font-size="10" font-weight="bold" fill="#475569" text-anchor="middle">Bentuk Berbeda, Namun Bobot Visual Tetap Seimbang</text>
      </g>
    </svg>`,
    text: 'Berdasarkan gambar di atas, pada komposisi asimetris, objek di sisi kiri dan kanan tidak sama bentuknya, namun karya tersebut tetap terasa seimbang karena ...',
    options: [
      { id: 'A', text: 'Bobot visual (daya tarik mata) di kedua sisi tetap seimbang dan harmonis' },
      { id: 'B', text: 'Kertas gambar dipotong menjadi dua bagian yang terpisah' },
      { id: 'C', text: 'Semua objek diberi warna putih transparan' },
      { id: 'D', text: 'Objek di sebelah kanan dihapus sepenuhnya' },
    ],
    correctAnswer: 'A',
    explanation: 'Komposisi asimetris (informal balance) menyusun elemen yang berbeda bentuk dan ukurannya pada kedua sisi, namun bobot visualnya tetap terasa seimbang, dinamis, dan hidup.'
  },
  {
    id: 33,
    type: 'pg',
    element: 'Menerapkan prinsip komposisi (keseimbangan simetris, asimetris, dan kesatuan) dalam menata objek',
    topic: 'Kesan Komposisi Asimetris',
    level: 'L2',
    difficulty: 'Mudah',
    scoreWeight: 2,
    indicator: 'Siswa dapat menentukan kesan yang dihasilkan oleh komposisi asimetris.',
    text: 'Kelebihan utama dari penggunaan komposisi asimetris dalam karya seni rupa adalah memberikan kesan ...',
    options: [
      { id: 'A', text: 'Dinamis, kreatif, luwes, dan tidak kaku' },
      { id: 'B', text: 'Kaku seperti patung batu' },
      { id: 'C', text: 'Membosankan dan monoton' },
      { id: 'D', text: 'Terbelah menjadi dua gambar yang tidak ada hubungan' },
    ],
    correctAnswer: 'A',
    explanation: 'Komposisi asimetris memberikan kebebasan artistik dan kesan dinamis, fleksibel, serta tidak monoton.'
  },
  {
    id: 34,
    type: 'pg',
    element: 'Menerapkan prinsip komposisi (keseimbangan simetris, asimetris, dan kesatuan) dalam menata objek',
    topic: 'Komposisi Sentral / Radial',
    level: 'L2',
    difficulty: 'Sedang',
    scoreWeight: 2,
    indicator: 'Siswa dapat mengidentifikasi komposisi radial (sentral).',
    image: `<svg viewBox="0 0 420 130" xmlns="http://www.w3.org/2000/svg" class="w-full h-auto">
      <rect width="420" height="130" rx="12" fill="#ffffff" stroke="#cbd5e1"/>
      <g transform="translate(160, 15)">
        <!-- Titik Pusat -->
        <circle cx="50" cy="50" r="18" fill="#e11d48"/>
        <!-- Sinar memancar ke segala arah -->
        <line x1="50" y1="20" x2="50" y2="5" stroke="#f43f5e" stroke-width="3" stroke-linecap="round"/>
        <line x1="50" y1="80" x2="50" y2="95" stroke="#f43f5e" stroke-width="3" stroke-linecap="round"/>
        <line x1="20" y1="50" x2="5" y2="50" stroke="#f43f5e" stroke-width="3" stroke-linecap="round"/>
        <line x1="80" y1="50" x2="95" y2="50" stroke="#f43f5e" stroke-width="3" stroke-linecap="round"/>
        <line x1="28" y1="28" x2="16" y2="16" stroke="#f43f5e" stroke-width="3" stroke-linecap="round"/>
        <line x1="72" y1="72" x2="84" y2="84" stroke="#f43f5e" stroke-width="3" stroke-linecap="round"/>
        <line x1="28" y1="72" x2="16" y2="84" stroke="#f43f5e" stroke-width="3" stroke-linecap="round"/>
        <line x1="72" y1="28" x2="84" y2="16" stroke="#f43f5e" stroke-width="3" stroke-linecap="round"/>
        <text x="50" y="112" font-family="sans-serif" font-size="10" font-weight="bold" fill="#be123c" text-anchor="middle">Komposisi Radial (Memancar dari Pusat)</text>
      </g>
    </svg>`,
    text: 'Pola susunan gambar di mana unsur-unsur rupa ditata memancar atau melingkari satu titik pusat di tengah-tengah bidang gambar disebut komposisi ...',
    options: [
      { id: 'A', text: 'Sentral (Radial / Memusat)' },
      { id: 'B', text: 'Diagonal menyamping' },
      { id: 'C', text: 'Horizontal mendatar' },
      { id: 'D', text: 'Zig-zag patah' },
    ],
    correctAnswer: 'A',
    explanation: 'Komposisi sentral atau radial menempatkan unsur rupa berorientasi pada satu titik pusat di tengah dan memancar ke segala arah (seperti kelopak bunga matahari atau roda sepeda).'
  },
  {
    id: 35,
    type: 'pg',
    element: 'Menerapkan prinsip komposisi (keseimbangan simetris, asimetris, dan kesatuan) dalam menata objek',
    topic: 'Pusat Perhatian (Center of Interest / Focal Point)',
    level: 'L2',
    difficulty: 'Sedang',
    scoreWeight: 2,
    indicator: 'Siswa dapat menentukan cara membuat pusat perhatian (focal point) pada gambar.',
    image: `<svg viewBox="0 0 420 120" xmlns="http://www.w3.org/2000/svg" class="w-full h-auto">
      <rect width="420" height="120" rx="12" fill="#f8fafc" stroke="#e2e8f0"/>
      <g transform="translate(40, 20)">
        <!-- Objek-objek abu-abu pendukung -->
        <circle cx="30" cy="40" r="14" fill="#cbd5e1"/>
        <circle cx="80" cy="40" r="14" fill="#cbd5e1"/>
        <circle cx="130" cy="40" r="14" fill="#cbd5e1"/>
        <!-- Pusat Perhatian Berwarna Menyala dan Lebih Menonjol -->
        <circle cx="190" cy="40" r="26" fill="#dc2626" stroke="#b91c1c" stroke-width="3"/>
        <polygon points="190,26 194,36 204,36 196,43 199,53 190,47 181,53 184,43 176,36 186,36" fill="#ffffff"/>
        <!-- Objek-objek abu-abu di kanan -->
        <circle cx="250" cy="40" r="14" fill="#cbd5e1"/>
        <circle cx="300" cy="40" r="14" fill="#cbd5e1"/>
        <text x="170" y="80" font-family="sans-serif" font-size="11" font-weight="bold" fill="#0f172a" text-anchor="middle">Satu Objek Dibuat Kontras Menjadi Titik Fokus Utama</text>
      </g>
    </svg>`,
    text: 'Perhatikan gambar di atas! Bagian objek yang sengaja dibuat paling menonjol dan langsung menarik pandangan mata pertama kali saat melihat gambar disebut ...',
    options: [
      { id: 'A', text: 'Pusat perhatian (Center of Interest / Focal Point)' },
      { id: 'B', text: 'Latar belakang pasif (Background)' },
      { id: 'C', text: 'Bayangan semu (Shadow)' },
      { id: 'D', text: 'Ruang kosong tak berguna' },
    ],
    correctAnswer: 'A',
    explanation: 'Pusat perhatian (center of interest / focal point / dominasi) adalah bagian karya yang paling kuat menarik perhatian mata, biasanya melalui perbedaan ukuran, warna kontras, atau posisi strategis.'
  },
  {
    id: 36,
    type: 'pg',
    element: 'Menerapkan prinsip komposisi (keseimbangan simetris, asimetris, dan kesatuan) dalam menata objek',
    topic: 'Prinsip Kesatuan (Unity)',
    level: 'L1',
    difficulty: 'Mudah',
    scoreWeight: 2,
    indicator: 'Siswa dapat menjelaskan prinsip kesatuan (unity) dalam komposisi gambar.',
    text: 'Dalam menata komposisi gambar, seluruh objek dan warna harus saling mendukung dan tampak menyatu, tidak terpisah-pisah secara asing. Prinsip ini dinamakan ...',
    options: [
      { id: 'A', text: 'Kesatuan (Unity)' },
      { id: 'B', text: 'Pemisahan (Isolation)' },
      { id: 'C', text: 'Perpecahan (Contrast)' },
      { id: 'D', text: 'Keretakan visual' },
    ],
    correctAnswer: 'A',
    explanation: 'Prinsip kesatuan (unity) adalah perpaduan unsur-unsur rupa yang saling bertautan dan mendukung sehingga membentuk satu kesatuan karya yang utuh dan tidak terpecah-pecah.'
  },
  {
    id: 37,
    type: 'pg',
    element: 'Menerapkan prinsip komposisi (keseimbangan simetris, asimetris, dan kesatuan) dalam menata objek',
    topic: 'Aturan Sepertiga Bidang (Rule of Thirds)',
    level: 'L3',
    difficulty: 'Sukar',
    scoreWeight: 2,
    indicator: 'Siswa dapat menjelaskan teknik meletakkan objek utama menggunakan aturan sepertiga bidang (Rule of Thirds).',
    text: 'Pada teknik komposisi "Rule of Thirds" (Aturan Sepertiga), bidang gambar dibagi menjadi 9 kotak dengan 2 garis mendatar dan 2 garis tegak. Posisi terbaik untuk meletakkan objek utama adalah ...',
    options: [
      { id: 'A', text: 'Pada salah satu titik perpotongan garis-garis pembagi tersebut' },
      { id: 'B', text: 'Tepat menempel di pinggiran bingkai kertas terluar' },
      { id: 'C', text: 'Tersembunyi di balik garis batas kertas' },
      { id: 'D', text: 'Di luar bidang kertas gambar' },
    ],
    correctAnswer: 'A',
    explanation: 'Rule of Thirds membagi bidang menjadi 9 kotak sama besar. Menempatkan objek utama pada salah satu dari empat titik pertemuan garis menghasilkan komposisi asimetris yang sangat menarik dan estetis.'
  },
  {
    id: 38,
    type: 'pg',
    element: 'Menerapkan prinsip komposisi (keseimbangan simetris, asimetris, dan kesatuan) dalam menata objek',
    topic: 'Komposisi Segitiga (Piramida)',
    level: 'L2',
    difficulty: 'Sedang',
    scoreWeight: 2,
    indicator: 'Siswa dapat menganalisis efek komposisi pola segitiga.',
    text: 'Banyak pelukis menata susunan objek alam benda (buah-buahan dan botol) membentuk pola segitiga (bagian bawah lebar dan puncak menyempit). Komposisi segitiga ini memberikan efek visual ...',
    options: [
      { id: 'A', text: 'Kokoh, stabil, mantap, dan seimbang' },
      { id: 'B', text: 'Mudah terguling dan jatuh' },
      { id: 'C', text: 'Melayang tak tentu arah' },
      { id: 'D', text: 'Gelisah dan berbahaya' },
    ],
    correctAnswer: 'A',
    explanation: 'Pola komposisi segitiga dengan dasar yang lebar dan puncak yang mengerucut memberikan efek psikologis visual yang kuat, mantap, stabil, dan kokoh.'
  },
  {
    id: 39,
    type: 'pg',
    element: 'Menerapkan prinsip komposisi (keseimbangan simetris, asimetris, dan kesatuan) dalam menata objek',
    topic: 'Ruang Kosong Positif dan Negatif',
    level: 'L3',
    difficulty: 'Sukar',
    scoreWeight: 2,
    indicator: 'Siswa dapat menganalisis peran ruang negatif (negative space) dalam komposisi gambar.',
    text: 'Dalam sebuah komposisi gambar, area kosong di sekeliling objek utama disebut ruang negatif (negative space). Fungsi penting dari ruang kosong ini adalah ...',
    options: [
      { id: 'A', text: 'Memberikan ruang bernapas visual sehingga objek utama dapat bernilai tegas dan tidak sesak' },
      { id: 'B', text: 'Menandakan bahwa pelukis kehabisan cat warna' },
      { id: 'C', text: 'Kertas gambar dianggap belum selesai digambar' },
      { id: 'D', text: 'Mengurangi nilai keindahan gambar secara keseluruhan' },
    ],
    correctAnswer: 'A',
    explanation: 'Ruang negatif (negative space) bukan sekadar ruang kosong sia-sia, melainkan elemen komposisi penting yang memberikan jeda visual agar mata pengamat dapat fokus menikmati objek utama.'
  },
  {
    id: 40,
    type: 'pg',
    element: 'Menerapkan prinsip komposisi (keseimbangan simetris, asimetris, dan kesatuan) dalam menata objek',
    topic: 'Integrasi Ritme, Proporsi, dan Komposisi',
    level: 'L3',
    difficulty: 'Sukar',
    scoreWeight: 2,
    indicator: 'Siswa dapat mengevaluasi keterpaduan ketiga prinsip dalam menghasilkan karya gambar yang berkualitas.',
    text: 'Sebuah karya gambar pemandangan pedesaan menampilkan susunan sawah berundak (ritme mengalir), ukuran petani yang wajar terhadap saung dan gunung (proporsi tepat), serta penataan posisi objek yang seimbang (komposisi harmonis). Karya tersebut berhasil memenuhi syarat ...',
    options: [
      { id: 'A', text: 'Kaidah dasar prinsip seni rupa yang lengkap dan estetis' },
      { id: 'B', text: 'Gambar karikatur yang sengaja dibuat lucu' },
      { id: 'C', text: 'Gambar abstrak tanpa arti yang jelas' },
      { id: 'D', text: 'Lukisan monokrom satu warna saja' },
    ],
    correctAnswer: 'A',
    explanation: 'Ketika prinsip ritme, proporsi, dan komposisi diterapkan secara terpadu, karya gambar akan memiliki nilai estetika tinggi, proporsional, dinamis, dan memikat.'
  },

  // ==========================================
  // BAGIAN II: 5 SOAL PILIHAN GANDA KOMPLEKS KATEGORI (BENAR / SALAH)
  // (Masing-masing soal terdiri dari 3 pernyataan yang harus direspons, Bobot 4 poin/butir = 20 Poin)
  // ==========================================

  // --- SOAL 41: ANALISIS PRINSIP RITME DALAM SENI RUPA ---
  {
    id: 41,
    type: 'pgk_kategori',
    element: 'Menerapkan prinsip ritme (pengulangan, transisi, dan oposisi) dalam menggambar',
    topic: 'Analisis Jenis-Jenis Ritme Rupa',
    level: 'L2',
    difficulty: 'Sedang',
    scoreWeight: 4,
    indicator: 'Siswa dapat mengevaluasi kebenaran pernyataan terkait karakteristik berbagai jenis ritme dalam seni rupa.',
    text: 'Cermati tiga pernyataan mengenai prinsip ritme dalam seni rupa berikut ini! Tentukan respons BENAR atau SALAH untuk setiap pernyataan yang disajikan!',
    statements: [
      {
        id: 's1',
        text: 'Ritme repetisi murni terjadi apabila bentuk objek, ukuran, dan jarak pengulangannya selalu dibuat sama persis secara teratur.',
        correctAnswer: true,
      },
      {
        id: 's2',
        text: 'Ritme oposisi dibentuk dari susunan dua unsur rupa yang saling bertolak belakang (misalnya lingkaran dan segitiga) yang disusun berselang-seling.',
        correctAnswer: true,
      },
      {
        id: 's3',
        text: 'Penerapan ritme pada gambar bertujuan untuk membuat gambar tampak kaku dan tidak bergerak sama sekali.',
        correctAnswer: false,
      },
    ],
    explanation: 'Pernyataan 1 dan 2 BENAR karena mendefinisikan repetisi murni dan oposisi dengan tepat. Pernyataan 3 SALAH karena tujuan ritme adalah menciptakan kesan gerak dinamis dan berirama, bukan kaku.'
  },

  // --- SOAL 42: ANALISIS PRINSIP PROPORSI PADA TUBUH & WAJAH MANUSIA ---
  {
    id: 42,
    type: 'pgk_kategori',
    element: 'Menerapkan prinsip proporsi dalam menggambar objek atau karya seni',
    topic: 'Kanon Proporsi Anatomi Manusia',
    level: 'L3',
    difficulty: 'Sedang',
    scoreWeight: 4,
    indicator: 'Siswa dapat memvalidasi aturan proporsi wajah dan anatomi tubuh manusia.',
    text: 'Perhatikan kaidah proporsi anatomi tubuh dan wajah manusia berikut! Tentukan pilihan BENAR atau SALAH untuk setiap pernyataan:',
    statements: [
      {
        id: 's1',
        text: 'Standar tinggi tubuh manusia dewasa ideal dalam gambar realis adalah sekitar 7 sampai 8 kali tinggi kepalanya.',
        correctAnswer: true,
      },
      {
        id: 's2',
        text: 'Pada proporsi wajah normal tampak depan, letak kedua mata berada tepat di garis tengah (separuh) tinggi kepala.',
        correctAnswer: true,
      },
      {
        id: 's3',
        text: 'Panjang telapak kaki orang dewasa normalnya adalah separuh dari panjang tubuhnya secara keseluruhan.',
        correctAnswer: false,
      },
    ],
    explanation: 'Pernyataan 1 dan 2 BENAR sesuai kanon proporsi manusia. Pernyataan 3 SALAH karena panjang telapak kaki orang dewasa setara dengan panjang lengan bawah atau sekitar 1 kali tinggi kepala, bukan separuh tubuh.'
  },

  // --- SOAL 43: ANALISIS PROPORSI PADA MENGGAMBAR STILL LIFE (ALAM BENDA) ---
  {
    id: 43,
    type: 'pgk_kategori',
    element: 'Menerapkan prinsip proporsi dalam menggambar objek atau karya seni',
    topic: 'Proporsi dan Skala Objek Benda',
    level: 'L2',
    difficulty: 'Mudah',
    scoreWeight: 4,
    indicator: 'Siswa dapat menganalisis keserasian proporsi pada komposisi still life.',
    text: 'Seorang siswa menata benda-benda di atas meja untuk digambar: sebuah teko keramik, dua cangkir teh, dan sebuah piring kecil berisi buah jeruk. Tentukan status BENAR atau SALAH dari pernyataan berikut:',
    statements: [
      {
        id: 's1',
        text: 'Agar proporsional, ukuran cangkir teh harus digambar lebih kecil daripada teko tempat air teh.',
        correctAnswer: true,
      },
      {
        id: 's2',
        text: 'Satu butir buah jeruk harus digambar berukuran dua kali lebih besar daripada piring tempatnya berada.',
        correctAnswer: false,
      },
      {
        id: 's3',
        text: 'Membuat garis bantu tipis terlebih dahulu sangat bermanfaat untuk memastikan perbandingan ukuran antar benda tetap proporsional.',
        correctAnswer: true,
      },
    ],
    explanation: 'Pernyataan 1 BENAR (cangkir lebih kecil dari teko). Pernyataan 2 SALAH (jeruk yang lebih besar dari piring adalah tidak proporsional). Pernyataan 3 BENAR (garis bantu membantu menjaga proporsi).'
  },

  // --- SOAL 44: ANALISIS KOMPOSISI SIMETRIS DAN ASIMETRIS ---
  {
    id: 44,
    type: 'pgk_kategori',
    element: 'Menerapkan prinsip komposisi (keseimbangan simetris, asimetris, dan kesatuan) dalam menata objek',
    topic: 'Perbandingan Komposisi Simetris vs Asimetris',
    level: 'L3',
    difficulty: 'Sukar',
    scoreWeight: 4,
    indicator: 'Siswa dapat membandingkan karakteristik dan sifat komposisi simetris dan asimetris.',
    text: 'Cermati analisis perbandingan antara komposisi simetris dan asimetris berikut! Tentukan pilihan BENAR atau SALAH untuk setiap deskripsi:',
    statements: [
      {
        id: 's1',
        text: 'Komposisi simetris memberikan kesan formal, tenang, stabil, dan resmi karena sisi kiri dan kanan merupakan cerminan yang sama.',
        correctAnswer: true,
      },
      {
        id: 's2',
        text: 'Komposisi asimetris dikatakan gagal apabila sisi kiri dan kanan tidak memiliki bentuk dan ukuran yang kembar persis.',
        correctAnswer: false,
      },
      {
        id: 's3',
        text: 'Pada komposisi asimetris, satu objek besar di sisi kiri dapat diseimbangkan bobot visualnya dengan beberapa objek kecil atau warna cerah di sisi kanan.',
        correctAnswer: true,
      },
    ],
    explanation: 'Pernyataan 1 BENAR (karakteristik simetris). Pernyataan 2 SALAH karena asimetris memang sengaja tidak kembar namun tetap seimbang visualnya. Pernyataan 3 BENAR (prinsip penyeimbangan bobot visual asimetris).'
  },

  // --- SOAL 45: ANALISIS PUSAT PERHATIAN (FOCAL POINT) DAN KESATUAN (UNITY) ---
  {
    id: 45,
    type: 'pgk_kategori',
    element: 'Menerapkan prinsip komposisi (keseimbangan simetris, asimetris, dan kesatuan) dalam menata objek',
    topic: 'Harmoni Komposisi dan Titik Fokus',
    level: 'L3',
    difficulty: 'Sukar',
    scoreWeight: 4,
    indicator: 'Siswa dapat menganalisis peran pusat perhatian (focal point) dan kesatuan (unity) dalam sebuah karya gambar.',
    text: 'Perhatikan prinsip penataan karya seni rupa mengenai Pusat Perhatian (Focal Point) dan Kesatuan (Unity) berikut! Tentukan respons BENAR atau SALAH untuk setiap pernyataan:',
    statements: [
      {
        id: 's1',
        text: 'Pusat perhatian dapat diciptakan dengan cara memberikan warna yang paling mencolok atau ukuran yang berbeda pada objek utama.',
        correctAnswer: true,
      },
      {
        id: 's2',
        text: 'Sebuah gambar dikatakan memiliki kesatuan (unity) yang baik jika semua objek di dalamnya saling bertabrakan tanpa ada keterkaitan tema.',
        correctAnswer: false,
      },
      {
        id: 's3',
        text: 'Penerapan aturan sepertiga bidang (Rule of Thirds) membantu menempatkan pusat perhatian pada posisi yang lebih menarik dan tidak kaku.',
        correctAnswer: true,
      },
    ],
    explanation: 'Pernyataan 1 BENAR (teknik membuat focal point). Pernyataan 2 SALAH (kesatuan berarti elemen saling mendukung dan terhubung harmonis). Pernyataan 3 BENAR (Rule of Thirds menghasilkan penempatan focal point yang dinamis).'
  },
];
