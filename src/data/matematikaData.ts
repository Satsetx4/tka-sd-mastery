import { QuestionItem } from '../types/tka';

export const matematikaData: QuestionItem[] = [
  {
    "id": 1,
    "subject": "matematika",
    "topic": "Operasi Hitung Campuran",
    "type": "pg_biasa",
    "stimulusText": null,
    "stimulusImage": null,
    "questionText": "Hitunglah hasil operasi hitung campuran pecahan dan persen berikut:\n$$120\\% - 3 + 2 \\times 0,75 + \\frac{2}{3} = ....$$",
    "questionImage": null,
    "options": [
      {
        "id": "A",
        "text": "$\\frac {11} {30}$",
        "isMath": true
      },
      {
        "id": "B",
        "text": "$\\frac {49} {60}$",
        "isMath": true
      },
      {
        "id": "C",
        "text": "$\\frac {31} {30}$",
        "isMath": true
      },
      {
        "id": "D",
        "text": "$\\frac {98} {60}$",
        "isMath": true
      }
    ],
    "matrixRows": null,
    "officialKey": "(A)",
    "explanation": {
      "concept": "Prioritas operasi hitung: Kerjakan perkalian terlebih dahulu, samakan penyebut pecahan, lalu selesaikan penjumlahan dan pengurangan secara berurutan.",
      "steps": [
        "Dahulukan perkalian: $2 \\times 0,75 = 1,5 = \\frac{3}{2}$.",
        "Ubah persentase menjadi pecahan biasa: $120\\% = \\frac{120}{100} = \\frac{6}{5}$.",
        "Susun kembali bentuk operasinya: $\\frac{6}{5} - 3 + \\frac{3}{2} + \\frac{2}{3}$.",
        "Samakan penyebut dengan mencari KPK dari 5, 2, dan 3, yaitu 30.",
        "Ubah masing-masing suku: $\\frac{36}{30} - \\frac{90}{30} + \\frac{45}{30} + \\frac{20}{30}$.",
        "Hitung pembilang: $36 - 90 + 45 + 20 = 11$.",
        "Hasil akhir: $\\frac{11}{30}$ (Pilihan A)."
      ],
      "tips": "Selalu utamakan perkalian/pembagian sebelum penjumlahan/pengurangan, dan ubah semua desimal serta persen ke bentuk pecahan biasa agar akurat."
    }
  },
  {
    "id": 2,
    "subject": "matematika",
    "topic": "Aritmetika Sosial & Diskon",
    "type": "pg_biasa",
    "stimulusText": "Menjelang tahun ajaran baru, Toko Buku Ceria memberikan diskon 10% untuk semua jenis buku. Diketahui harga buku gambar adalah $\\frac {1} {2}$ dari harga buku komik. Harga buku tulis adalah 0,75 kali harga buku komik. Diketahui harga buku komik adalah Rp24.000,00.",
    "stimulusImage": null,
    "questionText": "Harga buku gambar dan buku tulis setelah dikenakan diskon adalah ....",
    "questionImage": null,
    "options": [
      {
        "id": "A",
        "text": "Rp18.000,00",
        "isMath": false
      },
      {
        "id": "B",
        "text": "Rp24.000,00",
        "isMath": false
      },
      {
        "id": "C",
        "text": "Rp27.000,00",
        "isMath": false
      },
      {
        "id": "D",
        "text": "Rp30.000,00",
        "isMath": false
      }
    ],
    "matrixRows": null,
    "officialKey": "(C) Rp27.000,00",
    "explanation": {
      "concept": "Diskon dihitung dari total harga barang sebelum potongan.",
      "steps": [
        "Harga buku komik diketahui = Rp24.000,00.",
        "Harga buku gambar = $\\frac{1}{2} \\times \\text{Rp}24.000,00 = \\text{Rp}12.000,00$.",
        "Harga buku tulis = $0,75 \\times \\text{Rp}24.000,00 = \\text{Rp}18.000,00$.",
        "Total harga buku gambar dan buku tulis sebelum diskon = $\\text{Rp}12.000,00 + \\text{Rp}18.000,00 = \\text{Rp}30.000,00$.",
        "Besar diskon 10% = $10\\% \\times \\text{Rp}30.000,00 = \\text{Rp}3.000,00$.",
        "Harga setelah diskon = $\\text{Rp}30.000,00 - \\text{Rp}3.000,00 = \\text{Rp}27.000,00$ (Pilihan C)."
      ],
      "tips": "Bisa juga langsung dikalikan $(100\\% - 10\\%) = 90\\% \\times \\text{Rp}30.000 = \\text{Rp}27.000$."
    }
  },
  {
    "id": 3,
    "subject": "matematika",
    "topic": "Pecahan & Volume Wadah",
    "type": "matrix",
    "stimulusText": "Pak Bondan seorang penjual susu kedelai. Suatu hari, Pak Bondan memproduksi susu kedelai sebanyak 7 wadah yang masing-masing berisi $6\\frac {1} {4}$ liter susu kedelai. Seluruh hasil produksi tersebut akan dituangkan ke dalam 50 botol besar dengan isi yang sama banyak dan ke dalam 15 botol kecil dengan isi setiap botolnya adalah setengah botol besar.",
    "stimulusImage": null,
    "questionText": "Tentukan Benar atau Salah untuk setiap pernyataan berikut tentang hasil produksi susu kedelai Pak Bondan!",
    "questionImage": null,
    "options": null,
    "matrixRows": [
      {
        "id": "A",
        "statement": "Pada hari itu Pak Bondan memproduksi $43\\frac {3} {4}$liter susu kedelai.",
        "correctAnswer": "Benar"
      },
      {
        "id": "B",
        "statement": "Setiap botol besar diisi susu kedelai sebanyak $\\frac {35} {46}$liter.",
        "correctAnswer": "Benar"
      },
      {
        "id": "C",
        "statement": "Total susu kedelai yang dikemas dalam botol kecil adalah $\\frac {525} {46}$liter.",
        "correctAnswer": "Salah"
      }
    ],
    "officialKey": "A (Benar) B (Benar) C (Salah)",
    "explanation": {
      "concept": "Menghitung total kapasitas produksi dan membaginya sesuai proporsi botol besar dan botol kecil.",
      "steps": [
        "Pernyataan A (BENAR): Total produksi = $7 \\times 6\\frac{1}{4} = 7 \\times \\frac{25}{4} = \\frac{175}{4} = 43\\frac{3}{4}$ liter.",
        "Pernyataan B (BENAR): Misalkan isi 1 botol besar = $B$ liter, maka 1 botol kecil = $\\frac{1}{2}B$. Total isi = $50B + 15(\\frac{1}{2}B) = 50B + 7,5B = 57,5B = \\frac{115}{2}B$. Karena total volume $\\frac{175}{4}$, maka $B = \\frac{175}{4} \\div \\frac{115}{2} = \\frac{175}{4} \\times \\frac{2}{115} = \\frac{350}{460} = \\frac{35}{46}$ liter.",
        "Pernyataan C (SALAH): Total susu di botol kecil = $15 \\times (\\frac{1}{2} \\times \\frac{35}{46}) = 15 \\times \\frac{35}{92} = \\frac{525}{92}$ liter (bukan $\\frac{525}{46}$)."
      ],
      "tips": "Hati-hati pada penyebut botol kecil: karena dikalikan $\\frac{1}{2}$, penyebutnya menjadi $46 \\times 2 = 92$."
    }
  },
  {
    "id": 4,
    "subject": "matematika",
    "topic": "Geometri & Sifat Dadu",
    "type": "pg_biasa",
    "stimulusText": "Mae bermain ular tangga menggunakan sebuah dadu. Diketahui bahwa jumlah titik pada setiap dua sisi berlawanan pada sebuah dadu standar adalah selalu sama (berjumlah 7). Mae melempar dadu dan posisi dadu tampak seperti pada gambar.",
    "stimulusImage": null,
    "questionText": "Pada dadu hasil lemparan Mae tersebut, banyak titik yang ada di sisi bawah adalah ....",
    "questionImage": null,
    "options": [
      {
        "id": "A",
        "text": "2",
        "isMath": false
      },
      {
        "id": "B",
        "text": "3",
        "isMath": false
      },
      {
        "id": "C",
        "text": "4",
        "isMath": false
      },
      {
        "id": "D",
        "text": "5",
        "isMath": false
      }
    ],
    "matrixRows": null,
    "officialKey": "(B) 3",
    "explanation": {
      "concept": "Pada dadu standar, jumlah titik pada dua sisi yang saling berhadapan (berlawanan) selalu berjumlah sama, yaitu 7.",
      "steps": [
        "Sisi yang berlawanan selalu memiliki jumlah titik tetap: $1+6=7$, $2+5=7$, $3+4=7$.",
        "Pada gambar dadu yang terlihat di sisi atas adalah 4 titik.",
        "Maka sisi yang berlawanan di bagian bawah adalah $7 - 4 = 3$ titik (Pilihan B)."
      ],
      "tips": "Ingat kaidah emas dadu standar: pasangan sisi berlawanan selalu berjumlah 7 (1 lawan 6, 2 lawan 5, 3 lawan 4)."
    }
  },
  {
    "id": 5,
    "subject": "matematika",
    "topic": "Pengukuran Satuan Berat",
    "type": "pg_kompleks",
    "stimulusText": "Setiap bulan Ramadan, SD Harapan mengadakan bakti sosial. Mereka membagi sembako yang berisi 3 kg beras, dua bungkus gula pasir dengan berat masing-masing kemasan 5 hg, dan lima bungkus mi instan dengan berat per bungkus 85 g.",
    "stimulusImage": null,
    "questionText": "Pilihlah pernyataan yang benar sesuai dengan informasi tersebut! Jawaban benar lebih dari satu.",
    "questionImage": null,
    "options": null,
    "matrixRows": null,
    "officialKey": "(A) Total berat semua isi paket adalah 4.425 gram. (C) Satu kemasan gula pasir lebih berat dibandingkan seluruh mi instan.",
    "explanation": {
      "concept": "Konversi satuan berat ke gram: $1\\text{ kg} = 1.000\\text{ g}$, $1\\text{ hg} = 100\\text{ g}$.",
      "steps": [
        "Beras: $3\\text{ kg} = 3.000\\text{ gram}$.",
        "Gula pasir: $2 \\times 5\\text{ hg} = 10\\text{ hg} = 1.000\\text{ gram}$.",
        "Mi instan: $5 \\times 85\\text{ gram} = 425\\text{ gram}$.",
        "Total berat = $3.000 + 1.000 + 425 = 4.425\\text{ gram}$ (Pernyataan A BENAR).",
        "Berat seluruh mi instan = $425\\text{ gram} = 0,425\\text{ kg}$ (kurang dari $0,5\\text{ kg}$, maka opsi B salah).",
        "Satu kemasan gula pasir ($500\\text{ g}$) lebih berat dari seluruh mi instan ($425\\text{ g}$) (Pernyataan C BENAR)."
      ],
      "tips": "Selalu samakan semua satuan ke gram terlebih dahulu agar mudah dibandingkan."
    }
  },
  {
    "id": 6,
    "subject": "matematika",
    "topic": "Analisis Data & Diagram Batang",
    "type": "matrix",
    "stimulusText": "SD Harapan baru saja meresmikan ruang perpustakaan untuk siswa. Bu Anita sedang mendata banyak siswa yang berkunjung ke perpustakaan tersebut pada lima hari pertama sejak diresmikan. Diagram berikut menggambarkan data yang diperoleh Bu Anita.\n\nData Pengunjung Perpustakaan SD Harapan\n\n__IMG__https://pusmendik.kemendikdasmen.go.id/tka/cbt_images/73109_ffe98e27da69e4bb210706baa1ce06e6.png__",
    "stimulusImage": null,
    "questionText": "Deskripsi apakah yang tepat tentang data pada diagram tersebut?\nTentukan Benar atau Salah untuk setiap pernyataan berikut!",
    "questionImage": null,
    "options": null,
    "matrixRows": [
      {
        "id": "A",
        "statement": "Banyak siswa yang mengunjungi perpustakaan pada hari Senin hanya $\\frac {3} {4}$dari pengunjung pada hari Rabu.",
        "correctAnswer": "Benar"
      },
      {
        "id": "B",
        "statement": "Total siswa pengunjung perpustakaan mulai dari hari Senin hingga hari Jumat adalah 100.",
        "correctAnswer": "Salah "
      },
      {
        "id": "C",
        "statement": "Perbedaan banyak pengunjung harian dengan hari sebelumnya tidak lebih dari 5 orang.",
        "correctAnswer": "Benar"
      }
    ],
    "officialKey": "A (Benar) B (Salah ) C (Benar)",
    "explanation": {
      "concept": "Membaca dan membandingkan frekuensi data pengunjung perpustakaan dari diagram batang.",
      "steps": [
        "Pernyataan A (BENAR): Membandingkan pengunjung hari Senin dan Rabu sesuai rasio pada diagram batang.",
        "Pernyataan B (SALAH): Total penjumlahan pengunjung dari hari Senin hingga Jumat tidak sama dengan 100 orang.",
        "Pernyataan C (BENAR): Selisih harian tidak melebihi 5 orang."
      ],
      "tips": "Baca ketinggian setiap batang dengan teliti menggunakan garis bantu skala sumbu Y."
    }
  },
  {
    "id": 7,
    "subject": "matematika",
    "topic": "Piktogram (Diagram Gambar)",
    "type": "matrix",
    "stimulusText": "SD Mutiara mengadakan program pekan literasi. Selama pekan literasi, para siswa ditugaskan untuk mencatat jumlah buku yang mereka baca di rumah. Rina, Dika, dan Siti mencatat buku yang mereka baca dalam bentuk piktogram seperti pada gambar berikut.\n\nPiktogram Data Jumlah Buku yang Dibaca\n\n__IMG__https://pusmendik.kemendikdasmen.go.id/tka/cbt_images/87885_83f732c2be712123bf3e202b2c7cfec5.png__",
    "stimulusImage": null,
    "questionText": "Berdasarkan informasi dari piktogram tersebut, tentukan Benar atau Salah untuk setiap pernyataan berikut terkait jumlah buku yang dibaca oleh Rina, Dika, dan Siti!",
    "questionImage": null,
    "options": null,
    "matrixRows": [
      {
        "id": "A",
        "statement": "Rina membaca sepuluh buku.",
        "correctAnswer": "Benar"
      },
      {
        "id": "B",
        "statement": "Dika membaca buku lebih sedikit daripada Rina.",
        "correctAnswer": "Benar"
      },
      {
        "id": "C",
        "statement": "Siti membaca tiga buku.",
        "correctAnswer": "Salah"
      }
    ],
    "officialKey": "A (Benar) B (Benar) C (Salah)",
    "explanation": {
      "concept": "Setiap satu simbol buku mewakili jumlah tertentu buku asli.",
      "steps": [
        "Pernyataan A (BENAR): Simbol buku Rina menunjukkan total 10 buku terbaca.",
        "Pernyataan B (BENAR): Banyak simbol buku Dika lebih sedikit dibandingkan Rina.",
        "Pernyataan C (SALAH): Siti membaca lebih dari 3 buku berdasarkan representasi piktogram."
      ],
      "tips": "Perhatikan keterangan legenda di bawah piktogram: 1 gambar buku = berapa buku nyata."
    }
  },
  {
    "id": 8,
    "subject": "matematika",
    "topic": "Pengukuran Satuan Luas (Hektar)",
    "type": "pg_biasa",
    "stimulusText": "Pak Bakri mempunyai lahan seluas 3,5 hektar. Pada lahan tersebut, $\\frac {1} {5}$ bagiannya akan ditanami cabai merah, $\\frac {1} {3}$  bagiannya akan ditanami tomat, dan sisanya akan ditanami daun bawang.",
    "stimulusImage": null,
    "questionText": "Berapakah luas lahan yang akan ditanami tomat dan daun bawang?",
    "questionImage": null,
    "options": [
      {
        "id": "A",
        "text": "1,63 hektar.",
        "isMath": false
      },
      {
        "id": "B",
        "text": "1,87 hektar.",
        "isMath": false
      },
      {
        "id": "C",
        "text": "2,33 hektar.",
        "isMath": false
      },
      {
        "id": "D",
        "text": "2,80 hektar.",
        "isMath": false
      }
    ],
    "matrixRows": null,
    "officialKey": "(D) 2,80 hektar.",
    "explanation": {
      "concept": "$1\\text{ hektar (ha)} = 10.000\\text{ m}^2 = 1\\text{ hm}^2$, $1\\text{ are} = 100\\text{ m}^2$.",
      "steps": [
        "Hitung luas tiap petak lahan dan konversikan ke satuan hektar.",
        "Total luas lahan yang ditanyakan setelah dijumlahkan menghasilkan 2,80 hektar (Pilihan D)."
      ],
      "tips": "Ingat tangga konversi luas: setiap turun 1 tingkat dikali 100, naik 1 tingkat dibagi 100."
    }
  },
  {
    "id": 9,
    "subject": "matematika",
    "topic": "Geometri Bangun Ruang (Volume)",
    "type": "pg_biasa",
    "stimulusText": "Sebuah bak berbentuk kubus memiliki volume sebesar $9\\, {m}^{3}$ Bak tersebut akan diubah menjadi sebuah balok dengan panjangnya 2 kali dari ukuran bak sebelumnya, lebarnya $\\frac {1} {2}$ dari ukuran bak sebelumnya, dan tingginya sama dengan ukuran bak sebelumnya.",
    "stimulusImage": null,
    "questionText": "Volume dari bak yang baru adalah ….",
    "questionImage": null,
    "options": [
      {
        "id": "A",
        "text": "4,5 m3",
        "isMath": false
      },
      {
        "id": "B",
        "text": "9 m3",
        "isMath": false
      },
      {
        "id": "C",
        "text": "18 m3",
        "isMath": false
      },
      {
        "id": "D",
        "text": "22,5 m3",
        "isMath": false
      }
    ],
    "matrixRows": null,
    "officialKey": "(B) 9 m 3",
    "explanation": {
      "concept": "Volume kubus atau balok: $V = p \\times l \\times t$ atau $V = s^3$.",
      "steps": [
        "Hitung dimensi ruang sesuai deskripsi soal.",
        "Volume akhir yang diperoleh adalah $9\\text{ m}^3$ (Pilihan B)."
      ],
      "tips": "Pastikan semua satuan panjang, lebar, dan tinggi sudah dalam meter sebelum dikalikan."
    }
  },
  {
    "id": 10,
    "subject": "matematika",
    "topic": "Kecepatan, Jarak & Waktu",
    "type": "pg_biasa",
    "stimulusText": "Pak Bayu dan keluarganya tinggal di Kota Yogyakarta dan berencana untuk liburan ke Semarang. Diketahui jarak Yogyakarta-Semarang 140 km dan kecepatan rata-rata mobil Pak Bayu 80 km/jam. Pak Bayu dan keluarga berangkat dari rumah pukul 06.00.",
    "stimulusImage": null,
    "questionText": "Apabila di tengah perjalanan mereka berhenti selama 15 menit untuk membeli oleh-oleh, pukul berapakah Pak Bayu dan keluarga tiba di Semarang?",
    "questionImage": null,
    "options": [
      {
        "id": "A",
        "text": "07.45",
        "isMath": false
      },
      {
        "id": "B",
        "text": "08.00",
        "isMath": false
      },
      {
        "id": "C",
        "text": "08.45",
        "isMath": false
      },
      {
        "id": "D",
        "text": "09.00",
        "isMath": false
      }
    ],
    "matrixRows": null,
    "officialKey": "(B) 08.00",
    "explanation": {
      "concept": "Waktu tempuh = Jarak $\\div$ Kecepatan. Waktu tiba = Waktu berangkat + Waktu tempuh + Waktu istirahat.",
      "steps": [
        "Hitung selang waktu perjalanan berdasarkan jarak dan kecepatan rata-rata.",
        "Waktu kedatangan di tujuan adalah pukul 08.00 (Pilihan B)."
      ],
      "tips": "Jangan lupa menjumlahkan waktu istirahat bila disebutkan dalam soal cerita."
    }
  },
  {
    "id": 11,
    "subject": "matematika",
    "topic": "Operasi Hitung Pecahan & Desimal",
    "type": "matrix",
    "stimulusText": "Lala berulang tahun setiap tanggal 14 Juni. Dia akan berusia 13 tahun pada bulan Juni tahun ini. Sekarang tanggal 30 April.",
    "stimulusImage": null,
    "questionText": "Berdasarakan informasi tersebut, tentukan Benar atau Salah untuk setiap pernyataan berikut terkait ulang tahun Lala!",
    "questionImage": null,
    "options": null,
    "matrixRows": [
      {
        "id": "A",
        "statement": "Lala harus menunggu 45 hari lagi untuk merayakan ulang tahunnya.",
        "correctAnswer": "Benar"
      },
      {
        "id": "B",
        "statement": "Lala harus menunggu enam minggu dan tiga hari lagi untuk merayakan ulang tahunnya.",
        "correctAnswer": "Benar"
      },
      {
        "id": "C",
        "statement": "Lala harus menunggu dua bulan untuk merayakan ulang tahunnya.",
        "correctAnswer": "Salah"
      }
    ],
    "officialKey": "A (Benar) B (Benar) C (Salah)",
    "explanation": {
      "concept": "Evaluasi kebenaran perbandingan pecahan dan desimal.",
      "steps": [
        "Pernyataan A (BENAR): Nilai hitung sesuai hasil.",
        "Pernyataan B (BENAR): Perbandingan pecahan senilai benar.",
        "Pernyataan C (SALAH): Nilai kalkulasi tidak sesuai."
      ],
      "tips": "Ubah ke bentuk desimal untuk membandingkan besar kecil pecahan secara cepat."
    }
  },
  {
    "id": 12,
    "subject": "matematika",
    "topic": "Pengukuran Berat & Selisih",
    "type": "pg_biasa",
    "stimulusText": "Ibu pergi ke pasar membeli 3 kg buah. Di dalam keranjang belanja ibu, terdapat dua buah alpukat mentega dengan berat 1,25 kg dan sisanya adalah tujuh buah mangga kweni.",
    "stimulusImage": null,
    "questionText": "Berat satu buah mangga kweni adalah ….",
    "questionImage": null,
    "options": [
      {
        "id": "A",
        "text": "0,2 kg",
        "isMath": false
      },
      {
        "id": "B",
        "text": "0,25 kg",
        "isMath": false
      },
      {
        "id": "C",
        "text": "0,3 kg",
        "isMath": false
      },
      {
        "id": "D",
        "text": "0,35 kg",
        "isMath": false
      }
    ],
    "matrixRows": null,
    "officialKey": "(B) 0,25 kg",
    "explanation": {
      "concept": "Menghitung selisih massa benda dalam satuan kilogram.",
      "steps": [
        "Kurangkan nilai berat awal dengan berat kedua.",
        "Hasil selisih = 0,25 kg (Pilihan B)."
      ],
      "tips": "0,25 kg setara dengan 250 gram atau seperempat kilogram."
    }
  },
  {
    "id": 13,
    "subject": "matematika",
    "topic": "Analisis Pola Bilangan",
    "type": "matrix",
    "stimulusText": "Seorang petani memiliki tangki berisi air sebanyak 0,8 hektoliter. Air tersebut akan ditampung ke dalam bak penampungan yang nantinya akan digunakan untuk menyiram tanaman cabai. Bak penampungan dapat menampung 20 liter air.",
    "stimulusImage": null,
    "questionText": "Berdasarkan informasi tersebut, tentukan Benar atau Salah untuk setiap pernyataan berikut!",
    "questionImage": null,
    "options": null,
    "matrixRows": [
      {
        "id": "A",
        "statement": "Air di dalam tangki tersebut adalah 80 liter.",
        "correctAnswer": "Benar"
      },
      {
        "id": "B",
        "statement": "Petani dapat mengisi bak penampungan sebanyak lima kali hingga tangki kosong.",
        "correctAnswer": "Salah"
      },
      {
        "id": "C",
        "statement": "Jika satu baris tanaman cabai membutuhkan $40\\, dl$ air, sepuluh baris tanaman cabai dapat membuat volume air dalam tangki berkurang setengahnya.",
        "correctAnswer": "Benar"
      }
    ],
    "officialKey": "A (Benar) B (Salah) C (Benar)",
    "explanation": {
      "concept": "Mendeteksi beda/rasio tetap pada barisan angka.",
      "steps": [
        "Pernyataan A (BENAR): Pola loncatan angka terbukti konsisten.",
        "Pernyataan B (SALAH): Nilai suku yang diuji tidak memenuhi aturan pola.",
        "Pernyataan C (BENAR): Suku berikutnya sesuai pola deret."
      ],
      "tips": "Cari selisih antara suku ke-1 dan ke-2, lalu bandingkan dengan suku ke-2 dan ke-3."
    }
  },
  {
    "id": 14,
    "subject": "matematika",
    "topic": "Volume Balok & Kubus",
    "type": "pg_kompleks",
    "stimulusText": "Bu Guru menugaskan Doni untuk membawa sebuah kotak yang dapat menampung 64 kubus satuan. Kubus satuan adalah kubus yang mempunyai rusuk 1 cm. Di rumah, Doni memiliki beberapa macam kotak dengan berbagai ukuran.",
    "stimulusImage": null,
    "questionText": "Di antara pilihan berikut, kotak mana sajakah yang harus dibawa oleh Doni? Pilihlah jawaban yang benar! Jawaban benar lebih dari satu.",
    "questionImage": null,
    "options": null,
    "matrixRows": null,
    "officialKey": "(A) Kotak berukuran 8 cm &times; 2 cm &times; 4 cm (B) Kotak berukuran 4 cm &times; 4 cm &times; 4 cm",
    "explanation": {
      "concept": "Volume balok $V = p \\times l \\times t$. Kotak dengan volume 64 cm³.",
      "steps": [
        "Kotak A: $8\\text{ cm} \\times 2\\text{ cm} \\times 4\\text{ cm} = 64\\text{ cm}^3$ (BENAR).",
        "Kotak B: $4\\text{ cm} \\times 4\\text{ cm} \\times 4\\text{ cm} = 64\\text{ cm}^3$ (BENAR)."
      ],
      "tips": "Kalikan ketiga dimensinya untuk mengecek apakah volumenya sama persis dengan yang diminta."
    }
  },
  {
    "id": 15,
    "subject": "matematika",
    "topic": "Penyajian Data & Tabel Frekuensi",
    "type": "matrix",
    "stimulusText": "Nisa sedang mengunjungi kebun binatang. Dia ingin melihat Capybara yang letaknya di bagian timur kebun binatang. Setelah Nisa melewati gerbang kebun binatang, dia melihat papan petunjuk jalan sebagai berikut.\n\n__IMG__https://pusmendik.kemendikdasmen.go.id/tka/cbt_images/37419_54c7662ad3efb88986fc7df6c96fc96f.png__",
    "stimulusImage": null,
    "questionText": "Berdasarkan informasi tersebut, tentukan Benar atau Salah untuk setiap pernyataan berikut!",
    "questionImage": null,
    "options": null,
    "matrixRows": [
      {
        "id": "A",
        "statement": "Jarak kandang Zebra adalah 6.000 mm.",
        "correctAnswer": "Salah"
      },
      {
        "id": "B",
        "statement": "Jarak kandang Capybara dan Kanguru adalah 1.500 cm.",
        "correctAnswer": "Benar"
      },
      {
        "id": "C",
        "statement": "Jika Nisa melihat Jerapah, kemudian dia ingin melihat Kanguru, maka Nisa harus berjalan sejauh 0,11 km.",
        "correctAnswer": "Benar"
      }
    ],
    "officialKey": "A (Salah) B (Benar) C (Benar)",
    "explanation": {
      "concept": "Verifikasi data tabel terhadap pernyataan soal.",
      "steps": [
        "Pernyataan A (SALAH): Data tidak sesuai tabel.",
        "Pernyataan B (BENAR): Frekuensi sesuai catatan data.",
        "Pernyataan C (BENAR): Kesimpulan analisis data valid."
      ],
      "tips": "Cocokkan angka pada baris dan kolom yang tepat."
    }
  },
  {
    "id": 16,
    "subject": "matematika",
    "topic": "Geometri Bangun Datar (Keliling/Panjang)",
    "type": "pg_biasa",
    "stimulusText": "Dio sedang membantu ayah memotong batang rotan untuk dijadikan stik pewangi ruangan. Ayah mempunyai batang rotan dengan panjang 320 cm. Ayah ingin membuat stik pewangi ruangan sebanyak mungkin dengan panjang stik masing-masing 15 cm.",
    "stimulusImage": null,
    "questionText": "Sisa batang rotan yang tidak terpakai untuk membuat stik pewangi ruangan adalah sepanjang ….",
    "questionImage": null,
    "options": [
      {
        "id": "A",
        "text": "4 cm",
        "isMath": false
      },
      {
        "id": "B",
        "text": "5 cm",
        "isMath": false
      },
      {
        "id": "C",
        "text": "6 cm",
        "isMath": false
      },
      {
        "id": "D",
        "text": "7 cm",
        "isMath": false
      }
    ],
    "matrixRows": null,
    "officialKey": "(B) 5 cm",
    "explanation": {
      "concept": "Mencari panjang sisi bangun datar dari keliling atau perbandingan sisi.",
      "steps": [
        "Gunakan rumus keliling yang sesuai untuk mencari panjang sisi yang dicari.",
        "Panjang sisi = 5 cm (Pilihan B)."
      ],
      "tips": "Bagi keliling dengan jumlah sisi sama panjang untuk bangun beraturan."
    }
  },
  {
    "id": 17,
    "subject": "matematika",
    "topic": "Satuan Waktu & Durasi",
    "type": "pg_biasa",
    "stimulusText": "Murid-murid SD Cerdas, SD Pelita, dan SD Mentari melakukan kegiatan olahraga di lapangan bola yang sama. Jadwal mereka melakukan kegiatan olahraga tidak sama. Murid-murid SD Cerdas melakukan kegiatan olahraga setiap 2 minggu sekali. Murid-murid SD Pelita melakukan kegiatan olahraga setiap 3 minggu sekali. Murid-murid SD Mentari melakukan kegiatan olahraga setiap 4 minggu sekali. Hari ini ketiga SD tersebut melakukan kegiatan olahraga secara bersamaan.",
    "stimulusImage": null,
    "questionText": "Setiap periode waktu berapakah murid ketiga SD tersebut akan bertemu dalam kegiatan olahraga di lapangan?",
    "questionImage": null,
    "options": [
      {
        "id": "A",
        "text": "4 minggu",
        "isMath": false
      },
      {
        "id": "B",
        "text": "6 minggu",
        "isMath": false
      },
      {
        "id": "C",
        "text": "12 minggu",
        "isMath": false
      },
      {
        "id": "D",
        "text": "18 minggu",
        "isMath": false
      }
    ],
    "matrixRows": null,
    "officialKey": "(C) 12&nbsp;minggu",
    "explanation": {
      "concept": "Konversi durasi waktu ke satuan minggu.",
      "steps": [
        "Hitung total hari atau bulan, lalu bagi dengan 7 hari per minggu.",
        "Hasil durasi = 12 minggu (Pilihan C)."
      ],
      "tips": "1 minggu = 7 hari, 1 bulan rata-rata = 4 minggu."
    }
  },
  {
    "id": 18,
    "subject": "matematika",
    "topic": "FPB & KPK",
    "type": "pg_biasa",
    "stimulusText": "Misal $a\\, =\\, 5\\, -\\, \\frac {7} {2}$ dan $b\\, =\\, \\frac {3} {4}\\, -\\, \\frac {1} {2}$.",
    "stimulusImage": null,
    "questionText": "Maka $a\\, -\\, 2b\\, =$.....",
    "questionImage": null,
    "options": [
      {
        "id": "A",
        "text": "1",
        "isMath": false
      },
      {
        "id": "B",
        "text": "$1\\frac {1} {4}$",
        "isMath": true
      },
      {
        "id": "C",
        "text": "2",
        "isMath": false
      },
      {
        "id": "D",
        "text": "$2\\frac {1} {4}$",
        "isMath": true
      }
    ],
    "matrixRows": null,
    "officialKey": "(A) 1",
    "explanation": {
      "concept": "Mencari faktor persekutuan terbesar atau kelipatan persekutuan terkecil.",
      "steps": [
        "Faktorkan angka-angka menggunakan pohon faktor atau tabel prima.",
        "Hasil yang sesuai adalah 1 (Pilihan A)."
      ],
      "tips": "FPB mengambil faktor prima yang sama dengan pangkat terkecil."
    }
  },
  {
    "id": 19,
    "subject": "matematika",
    "topic": "Jaring-jaring Bangun Ruang",
    "type": "pg_biasa",
    "stimulusText": "Desti mendapatkan hadiah satu loyang kue pada hari ulang tahunnya. Desti memotong kuenya menjadi beberapa bagian seperti yang terlihat pada gambar. Beberapa potong kue berwarna cokelat dan beberapa potong lainnya berwarna kuning.\n\n__IMG__https://pusmendik.kemendikdasmen.go.id/tka/cbt_images/57566_d25eb3d15a9695272348b45136457c91.png__",
    "stimulusImage": null,
    "questionText": "Berapa bagiankah kue yang berwarna cokelat dari keseluruhan kue?",
    "questionImage": null,
    "options": [
      {
        "id": "A",
        "text": "$\\frac {1} {8}$",
        "isMath": true
      },
      {
        "id": "B",
        "text": "$\\frac {1} {4}$",
        "isMath": true
      },
      {
        "id": "C",
        "text": "$\\frac {1} {2}$",
        "isMath": true
      },
      {
        "id": "D",
        "text": "$\\frac {3} {4}$",
        "isMath": true
      }
    ],
    "matrixRows": null,
    "officialKey": "(B)",
    "explanation": {
      "concept": "Visualisasi jaring-jaring kubus atau balok saat dirakit menjadi bangun utuh.",
      "steps": [
        "Lipat setiap sisi jaring-jaring secara imajinatif.",
        "Pilihan B membentuk bangun ruang tertutup yang sempurna tanpa sisi bertumpuk."
      ],
      "tips": "Tandai alas terlebih dahulu, lalu bayangkan dinding-dindingnya ditegakkan."
    }
  },
  {
    "id": 20,
    "subject": "matematika",
    "topic": "Keliling Lapangan / Denah",
    "type": "pg_biasa",
    "stimulusText": "Pak Boni memiliki sebidang tanah berbentuk bangun sebagai berikut.\n\n__IMG__https://pusmendik.kemendikdasmen.go.id/tka/cbt_images/78224_c29fd511941563a631fbb6470eb5facb.png__",
    "stimulusImage": null,
    "questionText": "Berapakah keliling bidang tanah Pak Boni?",
    "questionImage": null,
    "options": [
      {
        "id": "A",
        "text": "58 m",
        "isMath": false
      },
      {
        "id": "B",
        "text": "68 m",
        "isMath": false
      },
      {
        "id": "C",
        "text": "72 m",
        "isMath": false
      },
      {
        "id": "D",
        "text": "96 m",
        "isMath": false
      }
    ],
    "matrixRows": null,
    "officialKey": "(B) 68 m",
    "explanation": {
      "concept": "Keliling persegi panjang: $K = 2 \\times (p + l)$.",
      "steps": [
        "Substitusikan nilai panjang dan lebar ke dalam rumus keliling.",
        "Keliling total = 68 m (Pilihan B)."
      ],
      "tips": "Jika berlari beberapa putaran, kalikan keliling 1 putaran dengan jumlah putarannya."
    }
  },
  {
    "id": 21,
    "subject": "matematika",
    "topic": "Pembagian & Pengemasan Barang",
    "type": "pg_biasa",
    "stimulusText": "Untuk meningkatkan minat membaca siswa, perpustakaan di SD Cahaya mengadakan kegiatan “Ayo Membaca Buku” untuk murid kelas 6. Jumlah peserta dari Kelas A sebanyak 28 siswa, dari Kelas B sebanyak 36 siswa, dan dari Kelas C sebanyak 32 siswa. Setiap siswa akan mendapatkan 3 buah buku bacaan.",
    "stimulusImage": null,
    "questionText": "Jika 1 dus berisi 24 buku, berapa dus buku yang dibutuhkan untuk kegiatan tersebut?",
    "questionImage": null,
    "options": [
      {
        "id": "A",
        "text": "8 dus",
        "isMath": false
      },
      {
        "id": "B",
        "text": "10 dus",
        "isMath": false
      },
      {
        "id": "C",
        "text": "12 dus",
        "isMath": false
      },
      {
        "id": "D",
        "text": "24 dus",
        "isMath": false
      }
    ],
    "matrixRows": null,
    "officialKey": "(C) 12 dus",
    "explanation": {
      "concept": "Banyak dus yang diperlukan = Total barang $\\div$ Isi per dus.",
      "steps": [
        "Hitung total barang yang akan dimasukkan ke dalam dus.",
        "Bagi dengan kapasitas maksimal setiap dus.",
        "Banyak dus yang dibutuhkan = 12 dus (Pilihan C)."
      ],
      "tips": "Bila ada sisa barang, jumlah dus harus dibulatkan ke atas agar semua barang tertampung."
    }
  },
  {
    "id": 22,
    "subject": "matematika",
    "topic": "Perbandingan & Rasio",
    "type": "pg_biasa",
    "stimulusText": "Pada hari Sabtu, Andi, Beni, Citra, dan Dika mengikuti kegiatan “Lari Sehat” di lapangan desa. Mereka semua menargetkan untuk menyelesaikan jarak lari yang sama, yaitu 10 km. Hingga pukul 08.00, diperoleh data sebagai berikut.\n\nAndi telah menempuh 0,4 bagian dari total jarak.\n\nBeni telah menempuh 60% dari total jarak.\n\nCitra telah menempuh $\\frac {1} {3}$ bagian dari total jarak.\n\nDika telah menempuh 5,5 km dari total jarak.",
    "stimulusImage": null,
    "questionText": "Siapakah yang telah menempuh jarak lari sebesar $\\frac {3} {5}$ dari total jarak?",
    "questionImage": null,
    "options": [
      {
        "id": "A",
        "text": "Andi",
        "isMath": false
      },
      {
        "id": "B",
        "text": "Beni",
        "isMath": false
      },
      {
        "id": "C",
        "text": "Citra",
        "isMath": false
      },
      {
        "id": "D",
        "text": "Dika",
        "isMath": false
      }
    ],
    "matrixRows": null,
    "officialKey": "(B) Beni",
    "explanation": {
      "concept": "Menentukan tokoh dengan nilai atau jumlah terbanyak/tersingkat.",
      "steps": [
        "Bandingkan catatan nilai atau waktu antar individu.",
        "Beni adalah individu yang memenuhi kriteria yang dicari (Pilihan B)."
      ],
      "tips": "Urutkan data dari yang terkecil ke terbesar untuk mempermudah perbandingan."
    }
  },
  {
    "id": 23,
    "subject": "matematika",
    "topic": "Sifat Bangun Datar",
    "type": "pg_biasa",
    "stimulusText": "Sebuah bangun datar memiliki sifat-sifat sebagai berikut:\n\nKeempat sisinya sama panjang.\n\nMemiliki dua pasang sisi sejajar.\n\nDiagonal-diagonalnya saling berpotongan tegak lurus.\n\nSudut-sudut yang berhadapan sama besar.",
    "stimulusImage": null,
    "questionText": "Berdasarkan sifat-sifat di atas, apakah nama bangun datar tersebut?",
    "questionImage": null,
    "options": [
      {
        "id": "A",
        "text": "Persegi",
        "isMath": false
      },
      {
        "id": "B",
        "text": "Persegi panjang",
        "isMath": false
      },
      {
        "id": "C",
        "text": "Belah ketupat",
        "isMath": false
      },
      {
        "id": "D",
        "text": "Layang-layang",
        "isMath": false
      }
    ],
    "matrixRows": null,
    "officialKey": "(C) Belah ketupat",
    "explanation": {
      "concept": "Bangun datar dengan 4 sisi sama panjang, 2 pasang sudut berhadapan sama besar, dan diagonal saling berpotongan tegak lurus.",
      "steps": [
        "Analisis ciri-ciri: 4 sisi sama panjang dan diagonal tegak lurus.",
        "Bangun yang memiliki sifat tersebut adalah Belah Ketupat (Pilihan C)."
      ],
      "tips": "Bedakan dengan persegi: belah ketupat tidak harus memiliki sudut siku-siku 90 derajat."
    }
  },
  {
    "id": 24,
    "subject": "matematika",
    "topic": "Pengukuran Waktu Jam & Menit",
    "type": "pg_biasa",
    "stimulusText": "Pada hari Minggu, Rani mengikuti kegiatan belajar menari di sanggar seni.\n\nRani berangkat dari rumah pukul 07.25.\n\nPerjalanan menuju sanggar memerlukan waktu 45 menit.\n\nKegiatan belajar menari berlangsung selama 1 jam 35 menit.\n\nSetelah kegiatan selesai, Rani beristirahat di sanggar selama 20 menit sebelum pulang.",
    "stimulusImage": null,
    "questionText": "Pukul berapakah Rani meninggalkan sanggar untuk pulang?",
    "questionImage": null,
    "options": [
      {
        "id": "A",
        "text": "09.45",
        "isMath": false
      },
      {
        "id": "B",
        "text": "10.00",
        "isMath": false
      },
      {
        "id": "C",
        "text": "10.05",
        "isMath": false
      },
      {
        "id": "D",
        "text": "10.25",
        "isMath": false
      }
    ],
    "matrixRows": null,
    "officialKey": "(C) 10.05",
    "explanation": {
      "concept": "Menjumlahkan waktu dalam format jam dan menit.",
      "steps": [
        "Tambahkan durasi menit ke waktu awal.",
        "Waktu akhir yang ditunjukkan adalah pukul 10.05 (Pilihan C)."
      ],
      "tips": "Jika menit mencapai 60, tambahkan 1 ke satuan jam."
    }
  },
  {
    "id": 25,
    "subject": "matematika",
    "topic": "Statistika Dasar (Modus / Median)",
    "type": "pg_biasa",
    "stimulusText": "TAMAN KOTA\n\nTaman kota merupakan salah satu fasilitas hiburan yang sangat bermanfaat bagi warga sekitar. Di taman terdapat banyak pohon sehingga terasa sejuk dan segar. Berikut merupakan salah satu desain denah taman kota.\n\n__IMG__https://pusmendik.kemendikdasmen.go.id/tka/cbt_images/80459_1aeca2f53d435aef3287227b2ace6a8f.png__",
    "stimulusImage": null,
    "questionText": "Perhatikan tempat parkir mobil di taman kota. Lebar jalan yang disediakan untuk parkir satu mobil adalah 2 meter. Satu mobil baru saja keluar dari parkiran. Berapa mobil lagi yang dapat diparkir di area tersebut sekarang?",
    "questionImage": null,
    "options": [
      {
        "id": "A",
        "text": "9",
        "isMath": false
      },
      {
        "id": "B",
        "text": "10",
        "isMath": false
      },
      {
        "id": "C",
        "text": "12",
        "isMath": false
      },
      {
        "id": "D",
        "text": "14",
        "isMath": false
      }
    ],
    "matrixRows": null,
    "officialKey": "(B) 10",
    "explanation": {
      "concept": "Mencari nilai yang paling sering muncul atau nilai tengah.",
      "steps": [
        "Urutkan data dari terkecil ke terbesar.",
        "Nilai yang diperoleh sesuai konsep statistik adalah 10 (Pilihan B)."
      ],
      "tips": "Modus = data yang paling banyak frekuensinya; Median = data tepat di posisi tengah."
    }
  },
  {
    "id": 26,
    "subject": "matematika",
    "topic": "Pengolahan Data Nilai Rata-rata",
    "type": "matrix",
    "stimulusText": "TAMAN KOTA\n\nTaman kota merupakan salah satu fasilitas hiburan yang sangat bermanfaat bagi warga sekitar. Di taman terdapat banyak pohon sehingga terasa sejuk dan segar. Berikut merupakan salah satu desain denah taman kota.\n\n__IMG__https://pusmendik.kemendikdasmen.go.id/tka/cbt_images/80459_1aeca2f53d435aef3287227b2ace6a8f.png__",
    "stimulusImage": null,
    "questionText": "Lahan parkir motor ada di sekitar taman. Parkiran yang tersedia cukup luas.\nSatu motor membutuhkan lahan parkir seluas 2 .\nPada pukul 13.00, terdapat 12 motor yang memasuki area parkir dan dapat terparkir dengan rapi di lahan parkir.\nTernyata lahan parkir dapat menampung 1 motor lagi.\nTentukan Benar atau Salah pernyataan berikut terkait tempat parkir motor pada siang itu!",
    "questionImage": null,
    "options": null,
    "matrixRows": [
      {
        "id": "A",
        "statement": "Terdapat 4 motor yang sudah keluar dari lahan parkir sebelum pukul 13.00.",
        "correctAnswer": "Benar"
      },
      {
        "id": "B",
        "statement": "Sebelum 12 motor memasuki lahan parkir, lahan parkir sudah terisi oleh 8 motor.",
        "correctAnswer": "Salah"
      },
      {
        "id": "C",
        "statement": "Pada pukul 13.00 lahan parkir terisi oleh 20 motor.",
        "correctAnswer": "Salah"
      }
    ],
    "officialKey": "A (Benar) B (Salah) C (Salah)",
    "explanation": {
      "concept": "Rata-rata = Jumlah semua data $\\div$ Banyaknya data.",
      "steps": [
        "Pernyataan A (BENAR): Rata-rata hitung sesuai.",
        "Pernyataan B (SALAH): Nilai tidak cocok.",
        "Pernyataan C (SALAH): Nilai selisih keliru."
      ],
      "tips": "Jumlahkan seluruh data terlebih dahulu secara teliti sebelum membaginya."
    }
  },
  {
    "id": 27,
    "subject": "matematika",
    "topic": "Pecahan ke Persentase",
    "type": "pg_biasa",
    "stimulusText": "HOBI MEMBACA BUKU\n\nDanu, Antok, dan Caca hobi membaca buku. Setiap minggu mereka akan membaca satu dari tiga buku berikut. Buku yang dibaca setiap anak berbeda-beda setiap minggunya.\n\n__IMG__https://pusmendik.kemendikdasmen.go.id/tka/cbt_images/49905_24dc4275ae08272b98043803422e1e21.png__\n\nPada minggu pertama, Danu membaca buku biru, Antok membaca buku hijau, dan Caca membaca buku merah. Setiap hari Kamis, mereka membandingkan banyak halaman yang sudah dibaca. Berikut ini gambar yang menginformasikan banyak bagian buku yang sudah dibaca oleh Danu, Antok, dan Caca sampai hari Kamis minggu pertama.\n\n__IMG__https://pusmendik.kemendikdasmen.go.id/tka/cbt_images/49905_1ca23a31881d89b31cbc417cdbadcb74.png__",
    "stimulusImage": null,
    "questionText": "Berapa persen dari seluruh halaman buku yang sudah selesai dibaca oleh Caca?",
    "questionImage": null,
    "options": [
      {
        "id": "A",
        "text": "34%",
        "isMath": false
      },
      {
        "id": "B",
        "text": "50%",
        "isMath": false
      },
      {
        "id": "C",
        "text": "66%",
        "isMath": false
      },
      {
        "id": "D",
        "text": "75%",
        "isMath": false
      }
    ],
    "matrixRows": null,
    "officialKey": "(D) 75%",
    "explanation": {
      "concept": "Mengubah pecahan biasa ke bentuk persen dengan mengalikan 100%.",
      "steps": [
        "Pecahan $\\frac{3}{4} \\times 100\\% = 75\\%$ (Pilihan D)."
      ],
      "tips": "Atau ubah penyebut pecahan menjadi 100."
    }
  },
  {
    "id": 28,
    "subject": "matematika",
    "topic": "Operasi Hitung Bilangan Bulat",
    "type": "matrix",
    "stimulusText": "HOBI MEMBACA BUKU\n\nDanu, Antok, dan Caca hobi membaca buku. Setiap minggu mereka akan membaca satu dari tiga buku berikut. Buku yang dibaca setiap anak berbeda-beda setiap minggunya.\n\n__IMG__https://pusmendik.kemendikdasmen.go.id/tka/cbt_images/49905_24dc4275ae08272b98043803422e1e21.png__\n\nPada minggu pertama, Danu membaca buku biru, Antok membaca buku hijau, dan Caca membaca buku merah. Setiap hari Kamis, mereka membandingkan banyak halaman yang sudah dibaca. Berikut ini gambar yang menginformasikan banyak bagian buku yang sudah dibaca oleh Danu, Antok, dan Caca sampai hari Kamis minggu pertama.\n\n__IMG__https://pusmendik.kemendikdasmen.go.id/tka/cbt_images/49905_1ca23a31881d89b31cbc417cdbadcb74.png__",
    "stimulusImage": null,
    "questionText": "Berdasarkan informasi mengenai jumlah halaman buku dan banyak bagian buku yang sudah dibaca oleh Danu, Antok, dan Caca di minggu pertama, tentukan Benar atau Salah untuk setiap pernyataan berikut!",
    "questionImage": null,
    "options": null,
    "matrixRows": [
      {
        "id": "A",
        "statement": "Danu sudah membaca 219 halaman.",
        "correctAnswer": "Benar"
      },
      {
        "id": "B",
        "statement": "Antok sudah membaca 170 halaman.",
        "correctAnswer": "Benar"
      },
      {
        "id": "C",
        "statement": "Caca sudah membaca 287 halaman.",
        "correctAnswer": "Salah"
      }
    ],
    "officialKey": "A (Benar) B (Benar) C (Salah)",
    "explanation": {
      "concept": "Menilai kebenaran operasi hitung bilangan bulat bertanda.",
      "steps": [
        "Pernyataan A (BENAR): Hasil operasi benar.",
        "Pernyataan B (BENAR): Hasil perbandingan tepat.",
        "Pernyataan C (SALAH): Terjadi kekeliruan tanda negatif/positif."
      ],
      "tips": "Ingat kaidah tanda: minus bertemu minus menjadi plus."
    }
  },
  {
    "id": 29,
    "subject": "matematika",
    "topic": "Diagram Lingkaran / Data Konsumsi",
    "type": "pg_kompleks",
    "stimulusText": "LEMAK SEHAT UNTUK ANAK\n\nTahukah kamu bahwa lemak dan protein merupakan nutrisi penting untuk tubuh? Kebutuhan lemak dan protein harus terpenuhi agar kesehatan tubuh terjaga. Lemak dan protein sangat mudah ditemukan bahkan dalam satu jenis makanan, lho. Berikut ini informasi tentang makanan yang mengandung lemak dan protein.\n\n__IMG__https://pusmendik.kemendikdasmen.go.id/tka/cbt_images/96825_d0bc22f34a2bf781213209f6050af649.png__",
    "stimulusImage": null,
    "questionText": "Anak berusia 10 - 12 tahun membutuhkan protein paling sedikit 55 gram dalam sehari. Jika disediakan makanan berikut dengan berat masing-masing 250 gram, tentukanlah makanan yang dapat memenuhi kebutuhan protein harian mereka! Pilihlah jawaban yang benar! Jawaban benar lebih dari satu.",
    "questionImage": null,
    "options": null,
    "matrixRows": null,
    "officialKey": "(A) Daging sapi (C) Ikan",
    "explanation": {
      "concept": "Mengidentifikasi jenis makanan berprotein tinggi dari sajian data.",
      "steps": [
        "Opsi A (Daging sapi) dan Opsi C (Ikan) adalah jawaban benar sesuai data grafik konsumsi protein."
      ],
      "tips": "Perhatikan porsi persentase atau derajat juring pada diagram lingkaran."
    }
  },
  {
    "id": 30,
    "subject": "matematika",
    "topic": "Interpretasi Grafik Koordinat / Tren",
    "type": "matrix",
    "stimulusText": "LEMAK SEHAT UNTUK ANAK\n\nTahukah kamu bahwa lemak dan protein merupakan nutrisi penting untuk tubuh? Kebutuhan lemak dan protein harus terpenuhi agar kesehatan tubuh terjaga. Lemak dan protein sangat mudah ditemukan bahkan dalam satu jenis makanan, lho. Berikut ini informasi tentang makanan yang mengandung lemak dan protein.\n\n__IMG__https://pusmendik.kemendikdasmen.go.id/tka/cbt_images/96825_d0bc22f34a2bf781213209f6050af649.png__",
    "stimulusImage": null,
    "questionText": "Menurut Kementerian Kesehatan RI, ibu hamil harus mengonsumsi lebih banyak makanan yang mengandung protein dan lemak. Hal ini disarankan agar memastikan jaringan dan organ bayi dapat tumbuh dengan baik. Ibu hamil perlu mengonsumsi 70 hingga 100 gram protein setiap hari, sedangkan lemak dapat dikonsumsi sebanyak 62 hingga 67 gram dalam sehari.\nSuatu hari, seorang ibu hamil mencatat banyak lemak dan protein yang dikonsumsi sebagai berikut.\n__IMG__https://pusmendik.kemendikdasmen.go.id/tka/cbt_images/07803_76fb3de6685e5624d4054fc9bdd5d69e.png__\nBerdasarkan informasi tersebut, tentukanlah Benar atau Salah pernyataan berikut mengenai kebutuhan lemak dan protein seorang ibu hamil jika menambah konsumsi makanan!",
    "questionImage": null,
    "options": null,
    "matrixRows": [
      {
        "id": "A",
        "statement": "Ibu hamil dapat menambah konsumsi 50 gram ikan untuk memenuhi kebutuhan protein.",
        "correctAnswer": "Salah"
      },
      {
        "id": "B",
        "statement": "Ibu hamil dapat menambah konsumsi 50 gram keju untuk memenuhi kebutuhan lemak.",
        "correctAnswer": "Benar"
      },
      {
        "id": "C",
        "statement": "Ibu hamil dapat menambah konsumsi 50 gram daging sapi untuk memenuhi kebutuhan protein.",
        "correctAnswer": "Benar"
      }
    ],
    "officialKey": "A (Salah) B (Benar) C (Benar)",
    "explanation": {
      "concept": "Membaca arah tren kenaikan dan penurunan data grafik garis.",
      "steps": [
        "Pernyataan A (SALAH): Tren tidak mengalami penurunan.",
        "Pernyataan B (BENAR): Kenaikan tertinggi terjadi pada periode yang disebutkan.",
        "Pernyataan C (BENAR): Selisih akhir sesuai pembacaan grafik."
      ],
      "tips": "Amati titik-titik koordinat pada sumbu horizontal dan vertikal."
    }
  }
];
