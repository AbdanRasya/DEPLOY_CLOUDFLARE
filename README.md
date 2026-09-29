# PaaS Static Deployment — Cloudflare Workers Static Assets

> **Tugas Praktikum Minggu 4:** Deployment Website Statis dari GitHub ke Cloudflare Workers.  
> **Nama Siswa:** Abdan Rasya  
> **Repository GitHub:** [AbdanRasya/DEPLOY_CLOUDFLARE](https://github.com/AbdanRasya/DEPLOY_CLOUDFLARE)  
> **Platform PaaS:** Cloudflare Workers (Static Assets)

---

## 🧱 1. Struktur Project

Struktur repository telah disesuaikan secara presisi dengan modul praktikum:

```text
DEPLOY_CLOUDFLARE/
├── public/
│   ├── index.html       # Halaman utama portofolio & tombol verifikasi JS
│   ├── about.html       # [Challenge] Halaman profil tentang saya
│   ├── 404.html         # [Challenge] Halaman penanganan error 404
│   ├── favicon.svg      # [Challenge] Favicon SVG kustom
│   ├── style.css        # Desain aesthetic, dark/light mode, responsif mobile
│   └── script.js        # Logika interaktif & verifikasi JavaScript
├── wrangler.jsonc       # Konfigurasi Cloudflare Workers Static Assets
└── README.md            # Dokumentasi panduan & jawaban refleksi
```

---

## ⚙️ 2. Konfigurasi `wrangler.jsonc`

Konfigurasi runtime Cloudflare Workers Static Assets pada root repositori:

```jsonc
{
  "$schema": "node_modules/wrangler/config-schema.json",
  "name": "paas-static-rasya",
  "compatibility_date": "2026-09-29",
  "assets": {
    "directory": "./public"
  }
}
```

- **`name`**: Nama Worker unik (`paas-static-rasya`).
- **`compatibility_date`**: Tanggal kompatibilitas runtime Cloudflare Workers.
- **`assets.directory`**: Menunjuk ke folder `./public` sebagai sumber aset statis yang dipublikasikan ke edge network.

---

## 🛠️ 3. Langkah Praktikum (Git → Cloudflare)

### A. Commit dan Push ke GitHub
Jalankan perintah berikut di terminal:
```bash
git status
git add .
git commit -m "feat: prepare aesthetic static site for Cloudflare Workers"
git push origin main
```

### B. Import Repository di Cloudflare Dashboard
1. Login ke [Cloudflare Dashboard](https://dash.cloudflare.com/).
2. Buka menu **Workers & Pages**.
3. Pilih tombol **Create application** → pilih tab **Workers** atau **Import a repository**.
4. Hubungkan akun GitHub dan pilih repository `AbdanRasya/DEPLOY_CLOUDFLARE`.
5. Pastikan production branch adalah `main`.
6. Untuk *Build command*, biarkan kosong (atau gunakan `npx wrangler deploy` jika diminta deploy command).
7. Klik **Save and Deploy**.
8. Tunggu hingga status deployment berubah menjadi **Active / Success**.
9. Buka URL publik `https://paas-static-rasya.<subdomain>.workers.dev`.

### C. Verifikasi Website
- [x] Halaman `index.html` dapat diakses dengan cepat di edge.
- [x] CSS styling termuat sempurna (tema terang & gelap).
- [x] Tombol **"Cek JavaScript"** berfungsi dan menampilkan teks verifikasi.
- [x] Halaman **`about.html`** dan **`404.html`** dapat dibuka.
- [x] Favicon muncul di tab browser.
- [x] Tampilan responsif di layar ponsel maupun desktop.

---

## ⭐ 4. Challenge yang Diselesaikan (Nilai Tambah)

1. **Halaman `about.html`**: Halaman profil personal dan penjelasan praktikum.
2. **Kustom Favicon**: `favicon.svg` terpasang di seluruh halaman.
3. **Responsivitas Mobile**: Tampilan dioptimasi untuk mobile dengan Flexbox/CSS Grid.
4. **Halaman `404.html`**: Halaman kustom penanganan broken link.

---

## 💭 5. Jawaban Refleksi Praktikum

### 1. Apa perbedaan membuka `index.html` secara lokal dengan website pada `workers.dev`?
> Membuka `index.html` secara lokal menggunakan protokol `file:///` di mana file hanya dibaca langsung dari storage laptop pengguna, tanpa melalui server jaringan dan tidak memiliki fitur edge caching, SSL/TLS HTTPS global, atau routing terdistribusi.  
> Sedangkan website pada `workers.dev` disajikan melalui jaringan Anycast global Cloudflare yang memiliki sertifikat SSL otomatis (HTTPS), CDN caching di ratusan data center seluruh dunia, dan dapat diakses publik oleh siapa pun di internet.

### 2. Apa peran GitHub pada proses deployment?
> GitHub bertindak sebagai sistem kendali versi (*version control*) dan pemicu otomatisasi (*trigger*) bagi pipeline CI/CD (Cloudflare Workers Builds). Setiap ada *push* baru ke branch `main`, Cloudflare mendeteksi perubahan tersebut melalui *webhook* dan otomatis memicu proses build serta deploy ulang tanpa intervensi manual.

### 3. Apa fungsi `assets.directory` pada `wrangler.jsonc`?
> Properti `assets.directory` memberitahu CLI Wrangler dan Cloudflare Workers folder lokal mana yang berisi file-file statis (HTML, CSS, JS, aset gambar) yang harus diunggah dan disajikan ke pengguna saat ada request ke URL Worker. Pada projek ini foldernya adalah `./public`.

### 4. Mengapa branch produksi penting?
> Branch produksi (biasanya `main`) berfungsi sebagai sumber kebenaran (*single source of truth*) untuk kode yang layak tayang ke publik. Memisahkan branch produksi memastikan bahwa kode eksperimental atau yang masih dalam tahap pengembangan tidak langsung aktif di situs live sampai selesai ditinjau.

### 5. Bagaimana build log membantu troubleshooting?
> Build log mencatat seluruh tahapan eksekusi deployment, mulai dari clone repositori, pembacaan `wrangler.jsonc`, hingga pengunggahan aset statis. Jika terjadi kegagalan (misalnya folder aset tidak ditemukan, sintaks JSON rusak, atau path salah), pesan error detail pada build log menunjukkan baris dan penyebab masalah secara spesifik.

### 6. Apa perbedaan awal antara platform serverless dan server tradisional?
> Pada server tradisional (VPS/Dedicated), kita harus menyewa mesin virtual, menginstal web server (Nginx/Apache), membuka port, mengatur sertifikat SSL secara manual, dan membayar biaya server selama 24/7 meskipun tidak ada traffic.  
> Pada platform serverless (seperti Cloudflare Workers Static Assets), kita tidak mengelola OS maupun software server. Infrastruktur dikelola sepenuhnya oleh penyedia cloud, aset disebar otomatis ke edge global, skala otomatis mengikuti lonjakan traffic, dan hanya membutuhkan file konfigurasi sederhana.

---

## 🧾 6. Evidence Checklist Pengumpulan
- [x] Link repository: `https://github.com/AbdanRasya/DEPLOY_CLOUDFLARE`
- [x] Struktur folder `public/` dan file `wrangler.jsonc` di root
- [x] Status Workers Builds sukses di dashboard Cloudflare
- [x] URL publik `*.workers.dev` aktif
- [x] Verifikasi perubahan kedua melalui push Git
