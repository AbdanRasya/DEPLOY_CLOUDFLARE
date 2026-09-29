# Rasya — Aesthetic Minimalist Portfolio & Showcase

> **Website Statis Murni (HTML5, CSS3, & Vanilla JavaScript ES6+)**  
> Didesain dengan estetika *minimalist editorial* yang elegan, bersih, dan berkarakter (terinspirasi dari *Readcv*, *Minimal Gallery*, dan majalah desain modern) — bukan desain klise atau *AI slop*.

---

## ✨ Fitur-Fitur Website

1. **Desain Editorial & Tipografi Presisi**
   - Perpaduan tipografi serif modern (*Newsreader*) dan sans-serif (*Plus Jakarta Sans*).
   - Palet warna lembut (*warm cream & rich espresso* untuk mode terang, *deep obsidian & soft pearl* untuk mode gelap).
   - Animasi mikro (*micro-interactions*) dan transisi yang halus.

2. **Mode Gelap / Terang (Dark & Light Theme Toggle)**
   - Transisi tema instan dengan tombol di navigasi.
   - Pilihan preferensi pengguna tersimpan otomatis di `localStorage`.

3. **Jam Digital Real-time (WIB / Jakarta Time)**
   - Menampilkan penunjuk waktu lokal terkini pada header navigasi.

4. **Katalog Karya Interaktif (Projects Showcase)**
   - Fitur filter kategori (*Semua*, *Web*, *UI/UX*, *Tools*).
   - Modal pop-up detail projek interaktif (`<dialog>` semantik).
   - Kartu preview projek dengan visual mockup minimalis.

5. **Perjalanan & Pendidikan (Timeline)**
   - Garis waktu riwayat studi dan eksplorasi teknologi.

6. **Stack & Keterampilan (Toolkit)**
   - Pengelompokan keterampilan frontend, UI/UX, dan alat bantu pengembang.

7. **Formulir Kontak & Interaksi Cepat**
   - Tombol salin email satu klik (*Copy Email*) dengan notifikasi *toast popup*.
   - Formulir pesan interaktif dengan validasi langsung di browser.

---

## 🚀 Panduan Upload / Deploy ke Platform PaaS (Render)

Web ini berformat **Static Site murni** (tanpa `node_modules`, tanpa build tools), sehingga sangat cepat dan mudah di-*deploy*:

### Langkah Deploy di Render:
1. Simpan dan *push* folder ini ke repository GitHub atau GitLab Anda:
   ```bash
   git init
   git add .
   git commit -m "Initial commit - aesthetic portfolio"
   git remote add origin <URL-REPO-ANDA>
   git push -u origin main
   ```
2. Buka dashboard [Render.com](https://dashboard.render.com).
3. Klik tombol **New +** di pojok kanan atas, lalu pilih **Static Site**.
4. Hubungkan ke repositori GitHub yang baru saja dibuat.
5. Konfigurasi kolom berikut:
   - **Name**: `portfolio-rasya` (atau nama tugas sesuai arahan Pak Novra)
   - **Branch**: `main` (atau `master`)
   - **Build Command**: *(Biarkan kosong)*
   - **Publish Directory**: `.` *(atau kosongkan)*
6. Klik **Create Static Site**.
7. Tunggu beberapa detik, tautan website Anda (`https://nama-web.onrender.com`) akan langsung aktif!

---

## 💻 Menjalankan di Komputer Lokal

Anda cukup klik ganda file `index.html` pada File Explorer untuk membukanya di browser, atau menggunakan server lokal sederhana:

```bash
# Menggunakan Python
python -m http.server 8000
```
Buka browser di `http://localhost:8000`.
