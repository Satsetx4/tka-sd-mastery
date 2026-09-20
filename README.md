# 🎓 TKA SD Mastery — Platform Latihan & Simulasi CBT Soal TKA SD

[![Deploy with Vercel](https://vercel.com/button)](https://tka-sd-mastery.vercel.app)
[![Vite](https://img.shields.io/badge/Vite-8.3-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38B2AC?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)

Aplikasi web interaktif modern yang menyajikan **60 Soal Resmi Tes Kemampuan Akademik (TKA) SD Kelas 6** (30 Matematika & 30 Bahasa Indonesia) lengkap dengan kunci jawaban resmi Pusmendik Kemendikdasmen, pembahasan langkah demi langkah, simulasi CBT bernilai waktu nyata, serta cetak rapor hasil belajar.

🌐 **Akses Live:** [https://tka-sd-mastery.vercel.app](https://tka-sd-mastery.vercel.app)

---

## ✨ Fitur Utama

### 1. 📚 Mode Belajar & Bahas Detail (Study Mode)
- **Katalog 60 Soal Lengkap:** 30 Soal Matematika (Numerasi, Geometri, Pecahan, Aljabar, Data) dan 30 Soal Bahasa Indonesia (Literasi, Teks Informasi, Fiksi, Ide Pokok).
- **Semua Aset Gambar Lokal:** 59 gambar diagram batang, piktogram, denah, dan infografis di-hardcode lokal sehingga 100% selalu muncul tanpa masalah hotlink.
- **Pembahasan Terstruktur:** Dilengkapi konsep dasar materi, langkah penyelesaian matematis, tips cepat menjawab, dan rujukan kunci resmi.
- **Dukungan Rumus KaTeX:** Notasi matematika dan pecahan dirender presisi dan jernih.

### 2. ⏱️ Mode Simulasi Ujian CBT (Pusmendik Standard)
- **Form Identitas Siswa:** Input nama peserta, asal sekolah, kelas, NISN, dan generator token dinamis sebelum ujian dimulai.
- **Timer Real-time 75 Menit:** Menghitung mundur waktu ujian persis simulasi sesungguhnya dengan peringatan waktu menipis.
- **Laci Navigasi Soal (Question Drawer):** Status visual setiap nomor (Belum dijawab, Sudah dijawab, dan Ragu-ragu).
- **Penilaian Otomatis:** Perhitungan skor skala 0–100, persentase kelulusan, serta rincian benar/salah/kosong.

### 3. 📜 Rapor & Sertifikat Personal Cetak PDF
- Rapor hasil ujian menampilkan identitas lengkap siswa, predikat capaian, dan analisa capaian per topik.
- Tombol **Cetak / Simpan PDF** terintegrasi ramah cetak (`@media print`) bebas elemen navigasi web.

### 4. 🎨 Standar UI/UX Trendsetter (Anti-Slop Web)
- **Dark Mode Elegan + Light Mode:** Transisi tema mulus dengan skrip anti-flicker (`localStorage` persistence).
- **Tactile UI & Micro-interactions:** Tombol, kartu, dan opsi jawaban responsif dengan haptic visual feedback berbasis Framer Motion.
- **Mobile First:** Nyaman digunakan dari smartphone, tablet, hingga layar desktop monitor besar.

---

## 🛠️ Tech Stack

- **Framework:** React 19 + TypeScript + Vite
- **Styling:** Tailwind CSS (v4)
- **Animasi:** Framer Motion
- **Notasi Matematika:** KaTeX
- **Ikon Antarmuka:** Lucide React
- **Deployment:** Vercel

---

## 🚀 Menjalankan di Lokal

1. **Clone repositori:**
   ```bash
   git clone https://github.com/Satsetx4/tka-sd-mastery.git
   cd tka-sd-mastery
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Jalankan development server:**
   ```bash
   npm run dev
   ```
   Buka browser di `http://localhost:5173`.

4. **Build untuk produksi:**
   ```bash
   npm run build
   ```

---

## 📄 Lisensi
Dibuat untuk tujuan edukasi dan persiapan asesmen belajar siswa sekolah dasar di Indonesia.
