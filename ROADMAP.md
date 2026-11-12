# ROADMAP — tka-sd-mastery
> Draf 12 Nov 2026. Simulasi CBT TKA SD (Matematika + B. Indonesia, standar Pusmendik). React 19 + KaTeX. Publik. BUKAN produk resmi Pusmendik (wajib tetap di README + UI).

## 1. Posisi kini
- 60 soal: `matematikaData.ts` 30 (9 matriks, 3 pg_kompleks) + `bahasaIndonesiaData.ts` 30 (8 matriks, 6 pg_kompleks).
- CBT 75 menit persisten (`EXAM_DURATION_MS`, `src/lib/exam.ts`): jawaban + ragu-ragu + tenggat tersimpan; waktu jalan walau tab ditutup.
- Penilaian 1 poin/soal tanpa kredit parsial; riwayat 20 latihan; bookmark; deep-link `/#/study/<mapel>/<id>`.
- 9 soal pg_kompleks dilengkapi dari situs Pusmendik; kunci+bahasan BELUM tinjau editorial. Tanpa CI. `oxlint`. 2 file test (~5.300 LOC src).

## 2. Fase 1 — Kepercayaan konten (v1.1)
- [ ] Tinjau editorial 60 kunci + pembahasan (prioritas: 9 pg_kompleks + 17 matriks); catat sumber tiap perbaikan.
- [ ] Perluas `exam.test.ts`: normalisasi jawaban matriks, `isCorrect` pg_kompleks tanpa kredit parsial, dataset validator tanpa error.
- [ ] Tambah CI: `vitest + oxlint + build`.
- [ ] Uji CBT keras: refresh tengah sesi, tombol back (konfirmasi), waktu habis, `cbt_images` gagal muat (fallback).
- [ ] Search Console: verifikasi domain + kirim `sitemap.xml`; tambah halaman "Sumber & Batasan" (bukan prediksi nilai TKA).

## 3. Fase 2 — Latihan adaptif (v1.2)
- [ ] Gelombang 2: 60 → 120 soal, seimbang per kelompok materi (`src/lib/topics.ts` sebagai acuan kuota).
- [ ] Rapor per topik: peta kekuatan/kelemahan dari riwayat 20 latihan.
- [ ] Mode latihan per kelompok materi (selain CBT penuh).
- [ ] Unduh rapor PDF per sesi (nama + sekolah opsional; tanpa NISN).

## 4. Fase 3 — Skala (v2.0)
- [ ] Keputusan produk: tetap lokal-tanpa-akun vs sinkronisasi antarperangkat (jangan setengah jalan).
- [ ] PWA offline (bank soal + KaTeX ter-cache).
- [ ] Mapel/level baru hanya sebagai dataset terpisah dengan validator yang sama.

## 5. Definisi selesai
- Fase 1: 60/60 kunci ditinjau + CI hijau + disclaimer resmi tampil di Beranda & Rapor.
- Fase 2: 120 soal, tiap kelompok materi ≥ 8 soal; validator dataset nol error.
- Fase 3: dipakai tryout 1 sekolah; insiden kebocoran data = 0 (tetap tanpa server jawaban).
