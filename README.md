# TKA SD Mastery

Aplikasi latihan mandiri untuk Matematika dan Bahasa Indonesia SD/MI. Aplikasi ini **bukan produk resmi Pusmendik**. Skor CBT hanya menghitung jawaban pada 30 soal per mata pelajaran dan bukan nilai atau prediksi hasil TKA.

## Fitur

- 60 soal dengan pembahasan, bookmark, kelompok materi, dan penanda soal yang sudah dipelajari.
- CBT latihan 75 menit dengan pilihan ganda tunggal, pilihan ganda kompleks, dan matriks. Jawaban, nomor aktif, penanda ragu-ragu, dan tenggat waktu tersimpan di perangkat sehingga sesi bisa dilanjutkan setelah refresh. Waktu tetap berjalan saat halaman ditutup.
- Penilaian satu poin per soal: pilihan ganda kompleks harus memilih seluruh opsi benar tanpa tambahan; matriks harus mengisi seluruh baris dengan tepat. Tidak ada kredit parsial.
- Riwayat 20 latihan terakhir dan progres belajar ditampilkan terpisah. Semua data tersimpan lokal pada browser dan dapat dihapus dari tombol reset.
- Tautan langsung ke materi atau nomor soal memakai hash, misalnya `/#/study/matematika/27`. Back browser pada CBT meminta konfirmasi; sesi dan waktu tetap berjalan jika keluar.

## Rujukan dan batasan konten

Kelompok materi dan contoh soal dapat dibandingkan dengan [halaman TKA SD/MI Pusmendik](https://pusmendik.kemendikdasmen.go.id/tka/tka/view/mata-pelajaran-wajib/sd) dan [kerangka asesmen TKA SD/MI](https://pusmendik.kemendikdasmen.go.id/tka/page/download). Sembilan soal pilihan ganda kompleks yang kehilangan opsi pada data repo awal telah dilengkapi dari halaman contoh soal tersebut. Kunci dan pembahasan dalam aplikasi tetap perlu ditinjau editorial; aplikasi tidak menyatakan dirinya sebagai sumber kunci resmi. Contoh soal dan ketentuan TKA dapat berubah di situs sumber.

## Jalankan dan periksa

```bash
npm ci
npm test
npm run lint
npm run build
npm run dev
```

Situs publik menggunakan satu URL utama sehingga `sitemap.xml` berisi beranda saja. Untuk Search Console, verifikasi domain melalui DNS atau tambahkan meta tag yang diberikan Google ke `index.html`, lalu kirim `https://tka-sd-mastery.vercel.app/sitemap.xml`.

## Privasi

Nama dan sekolah bersifat opsional. Jangan masukkan NISN atau data sensitif. Tidak ada akun, server jawaban, atau sinkronisasi antarperangkat; menghapus penyimpanan browser juga menghapus riwayat lokal.
