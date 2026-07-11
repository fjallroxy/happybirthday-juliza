=========================================================
 HAPPY BIRTHDAY JULIZA — README
=========================================================

STRUKTUR FOLDER
---------------
birthday_components/
│
├── index.html              -> halaman utama, memuat semua komponen
├── style.css                -> semua styling
├── script.js                 -> semua logika/interaksi (loader, buka
│                                hadiah, ketik surat, galeri, kembang api)
│
├── assets/                   -> ISI SENDIRI, taruh di sini:
│     family1.jpg, family2.jpg     (foto keluarga)
│     yearly1.jpg, yearly2.jpg     (foto momen tahunan)
│     friends1.jpg, friends2.jpg   (foto bersama teman)
│     music.mp3
│
└── components/
      loader.html    -> layar loading di awal
      passcode.html  -> gerbang verifikasi tanggal & bulan lahir (+ hint)
      quiz.html      -> isi nama pengirim + pertanyaan panggilan
      hero.html      -> tampilan awal + kotak hadiah
      envelope.html  -> amplop & surat dengan efek mengetik
      gallery.html   -> galeri foto, dibagi 3 section
      ending.html    -> scene kembang api + pesan penutup + footer

ALUR SEKARANG
-------------
loader -> passcode (tanggal & bulan lahir) -> isi nama & kuis
panggilan -> hero (buka hadiah) -> surat -> galeri (3 section)
-> kembang api -> pesan penutup.

Catatan: layar verifikasi umur sudah DIHAPUS dari alur.

Jawaban passcode yang benar: 12 / 07 (tanggal / bulan lahir Juliza).
Kalau salah, muncul peringatan "coba lagi" dan tidak bisa lanjut.
Ada tombol "Butuh petunjuk?" yang menampilkan hint.

Di layar berikutnya, pengunjung diminta mengetik NAMANYA SENDIRI,
lalu memilih sebutan yang menurutnya dipakai untuk memanggil Juliza.
Keempat pilihan (A/B/C/D) bebas dipilih — semuanya dianggap benar,
selama nama sudah diisi. Kalau nama masih kosong saat memilih
jawaban, muncul peringatan "isi dulu namamu" dan tidak bisa lanjut.
Jawaban yang dipilih dipakai untuk menyapa di surat (variabel
chosenNickname di script.js).

Nama yang diketik pengunjung ini disimpan sebagai variabel
senderName di script.js, lalu dipakai otomatis untuk mengganti
tanda tangan "— ... ❤️" di scene kembang api dan tanda tangan
"Dengan tulus, ..." di kartu pesan penutup (finalMessage). Jadi
ucapan di akhir seolah dikirim langsung oleh nama yang diketik.

Baris footer "Made with ❤️ by Kukuh Raharja" di paling bawah TIDAK
berubah — itu tetap kredit pembuat websitenya.

GALERI FOTO (3 SECTION)
------------------------
Galeri sekarang dibagi jadi tiga bagian, masing-masing dengan
label section-nya sendiri yang tampil di pojok kiri atas foto:
  1. Keluarga       -> keluarga1.jpeg
  2. Momen Tahunan  -> tahunan.jpeg, moment2.jpg, moment3.jpg, moment5.jpeg
  3. Bersama Teman  -> moment6.jpeg, moment4.jpeg, moment.jpg

Foto-foto ini sudah ditaruh di assets/ dengan nama file ASLI
(tidak di-rename), jadi tidak perlu ganti nama file apa pun.

Tombol ⟵ / ⟶ akan jalan dulu di dalam satu section, lalu pindah
otomatis ke section berikutnya kalau sudah di foto terakhir. Kalau
mau menambah/mengurangi jumlah foto per section, atau memindahkan
foto ke section lain, edit array gallerySections di bagian atas
script.js (cari komentar "Galeri foto (dibagi per section)").

CARA KERJA
----------
index.html TIDAK menaruh semua HTML langsung di dalamnya. Sebagai
gantinya, dia punya "wadah" kosong seperti:

    <div id="hero-root"></div>

lalu lewat JavaScript (bagian <script> di index.html) tiap file di
folder components/ di-fetch dan disuntikkan ke wadah yang sesuai.
Setelah semua komponen selesai dimuat, event "componentsLoaded"
dikirim, baru script.js mulai menjalankan semua interaksi (efek
mengetik, buka hadiah, galeri, kembang api, dsb).

PENTING: HARUS DIJALANKAN LEWAT SERVER, BUKAN DIBUKA LANGSUNG
--------------------------------------------------------------
Karena index.html memakai fetch() untuk mengambil file di folder
components/, kebanyakan browser akan MEMBLOKIR ini kalau file cuma
dibuka langsung dari File Explorer (double klik, alamatnya jadi
file://...). Ini batasan keamanan browser (CORS), bukan bug.

Supaya berjalan normal, upload semua folder ini ke hosting statis,
misalnya:
  - GitHub Pages
  - Netlify / Vercel
  - Hosting statis apa pun (Hostinger, Niagahoster, dll)

Atau kalau mau tes di komputer sendiri dulu, jalankan server lokal
sederhana. Contoh (butuh Python terpasang), dari dalam folder
birthday_components/:

    python -m http.server 8000

lalu buka browser ke:  http://localhost:8000

YANG PERLU KAMU LENGKAPI
------------------------
1. Foto sudah ada di assets/ (keluarga1.jpeg, tahunan.jpeg,
   moment.jpg, moment2.jpg, moment3.jpg, moment4.jpeg,
   moment5.jpeg, moment6.jpeg).
2. Musik sudah ada di assets/ (music.mp3).
3. (Opsional) Ganti isi surat di script.js, cari variabel
   letterText di bagian atas file.
4. (Opsional) Ganti caption tiap foto, jumlah foto per section,
   atau pindahkan foto ke section lain — semua di script.js,
   cari array gallerySections.

Selesai — tinggal upload ke hosting dan bagikan link-nya. 🎉
