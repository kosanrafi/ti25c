# TI 25 C — Nuxt 3 + Turso + Tailwind

Website Teknik Informatika 25 C (Universitas Perjuangan Tasikmalaya), dibangun dengan:

- **Nuxt 3** (Vue 3, SSR untuk halaman publik)
- **Tailwind CSS** (`@nuxtjs/tailwindcss`)
- **Turso** (SQLite edge database) via `@libsql/client` — tanpa ORM berat, query SQL langsung agar tetap ringan
- **GSAP** untuk animasi intro hero (berpusat ke tengah dari 4 arah)
- Halaman **Admin** (`/admin`) untuk mengelola data Poster, Mahasiswa, Gallery, dan Info Kelas — dengan upload gambar/GIF

Semua data (poster hero, mahasiswa, gallery) diambil langsung dari database Turso lewat API internal (`/api/*`), jadi begitu kamu ubah data lewat halaman admin, tampilan publik langsung ikut berubah.

---

## 1. Instalasi

```bash
npm i
```

## 2. Setup database Turso

Kalau belum punya Turso CLI:

```bash
curl -sSfL https://get.tur.so/install.sh | bash
turso auth login
```

Buat database baru:

```bash
turso db create ti25c
turso db show ti25c --url          # -> salin sebagai TURSO_DATABASE_URL
turso db tokens create ti25c       # -> salin sebagai TURSO_AUTH_TOKEN
```

## 3. Konfigurasi environment

Salin `.env.example` menjadi `.env`, lalu isi:

```bash
cp .env.example .env
```

```env
TURSO_DATABASE_URL=libsql://nama-database-anda.turso.io
TURSO_AUTH_TOKEN=isi-token-turso-anda
ADMIN_PASSWORD=ganti-password-admin
SESSION_SECRET=ganti-dengan-string-rahasia-acak-yang-panjang
```

> `ADMIN_PASSWORD` adalah password untuk masuk ke `/admin`.
> `SESSION_SECRET` bebas, cukup string acak yang panjang (dipakai untuk menandatangani cookie sesi login).

## 4. Buat tabel & isi data awal

```bash
npm run db:reset
```

Perintah ini **menghapus** semua tabel lama, membuat ulang (`server/db/schema.sql`), lalu mengisi data awal (`server/db/seed.sql`): 5 role, **28 mahasiswa TI 25 C** (Miftah Pauzan Jamil = KM, M Danil Darmansyah = Wakil KM), dan masing-masing 1 data sementara untuk poster, gallery, dan info kelas.

Perintah lain:

| Perintah | Fungsi |
|---|---|
| `npm run db:push` | Buat tabel saja (jika belum ada), tanpa data |
| `npm run db:seed` | Buat tabel + isi data awal. Aman diulang (tidak menggandakan data) |
| `npm run db:reset` | Hapus semua tabel → buat ulang → isi data awal |

Kamu juga bisa menjalankan isi `server/db/seed.sql` langsung di Turso Shell (`turso db shell ti25c`).

## 5. Jalankan development server

```bash
npm run dev
```

Buka:
- Situs publik → http://localhost:3000
- Panel admin → http://localhost:3000/admin (login dengan `ADMIN_PASSWORD` di `.env`)

---

## Struktur data

### Poster (tampil di kartu tumpukan Hero)
| Field | Keterangan |
|---|---|
| `title` | Judul poster |
| `description` | Deskripsi singkat (opsional) |
| `image` | Gambar poster (opsional, upload lewat admin) |
| `glow_color` | Warna efek glow kartu |
| `sort_order` | Urutan tampil |

### Role (tabel `roles`)
| id | name |
|---|---|
| 1 | Ketua Kelas (KM) |
| 2 | Wakil Ketua Kelas |
| 3 | Sekretaris |
| 4 | Bendahara |
| 5 | Mahasiswa *(default)* |

### Mahasiswa
| Field | Keterangan |
|---|---|
| `name` | Nama lengkap |
| `role_id` | Mengacu ke tabel `roles`, default **5 (Mahasiswa)**. Di carousel, KM/Wakil KM/Sekretaris/Bendahara tampil paling depan |
| `description` | Deskripsi singkat |
| `hobi` | Hobi |
| `skills` | Skill, dipisahkan koma (contoh: `JavaScript, Figma, Public Speaking`) |
| `sertifikat` | Nama/keterangan sertifikat |
| `photo` | Foto (opsional) |

### Gallery
| Field | Keterangan |
|---|---|
| `title` | Judul album |
| `cover_image` | 1 foto cover |
| `photos` | Maksimal **7 foto**, bisa berupa gambar biasa atau **GIF** |

### Info Kelas (tabel `info_kelas`, kartu coverflow "Info & Agenda Kelas")
| Field | Keterangan |
|---|---|
| `tag` | Label kecil di atas judul (contoh: `RAPAT KELAS`) |
| `title` | Judul (boleh 2 baris) |
| `description` | Deskripsi singkat |
| `link_url` | Link "Selengkapnya" (opsional) |
| `image` | Gambar latar (opsional) |
| `theme` | `sky`, `light`, `indigo`, `flame`, atau `emerald` |

Upload gambar disimpan di folder `public/uploads/` dan diakses langsung sebagai file statis (`/uploads/nama-file.ext`). Format yang didukung: PNG, JPG, WEBP, GIF (maks 8MB per file).

---

## Keamanan halaman admin

- Login admin memakai 1 password (`ADMIN_PASSWORD`) — cocok untuk kebutuhan kelas/organisasi kecil.
- Sesi login disimpan di cookie `httpOnly` yang ditandatangani (HMAC SHA-256), tanpa perlu tabel session tambahan di database → tetap ringan.
- Semua endpoint yang mengubah data (`POST`/`PUT`/`DELETE` ke `/api/posters`, `/api/mahasiswa`, `/api/gallery`, `/api/info`, `/api/upload`) diproteksi di sisi server (`server/middleware/admin-guard.ts`), bukan cuma disembunyikan di UI.
- Endpoint `GET` tetap publik supaya halaman utama bisa menampilkan data tanpa login.

Untuk produksi, ganti `ADMIN_PASSWORD` dan `SESSION_SECRET` dengan nilai yang kuat & unik, dan jangan commit file `.env`.

---

## Animasi (ringan, tanpa library eksternal)

Sempat dicoba pakai GSAP + ScrollTrigger untuk animasi, tapi ternyata bikin HP berat — jadi semua diganti ke pendekatan native browser (CSS + `IntersectionObserver` + `requestAnimationFrame` seperlunya), **tidak ada dependency JS animasi sama sekali**:

- **Reveal saat scroll** — tiap section fade + geser naik saat masuk layar, murni `IntersectionObserver` + CSS transition.
- **Intro Hero** — judul, poster, search bar muncul dari 4 arah berbeda memakai CSS `@keyframes` (jalan otomatis saat halaman render, tanpa JS).
- **Statistik count-up** — angka Mahasiswa/Gallery/Info menghitung naik sekali saat pertama terlihat (loop `requestAnimationFrame` pendek ~1.2 detik, lalu berhenti — bukan animasi terus-menerus).
- **Auto-geser carousel Mahasiswa** — melompat satu kartu tiap 3 detik pakai `scrollBy({ behavior: "smooth" })` bawaan browser, **bukan** menulis `scrollLeft` tiap frame. Otomatis berhenti total kalau section digulung keluar layar (`IntersectionObserver`) atau tab tidak aktif — tidak ada kerja tersembunyi di latar belakang.
- **Ticker & progress bar** — animasi CSS murni (`transform`), berjalan di GPU, praktis tanpa biaya CPU.
- **Tilt 3D poster Hero** — mengikuti kursor, hanya aktif di desktop (dicek lewat `pointer: fine`), nol biaya di HP.

Semua otomatis nonaktif kalau pengguna mengaktifkan **"reduce motion"** di sistemnya.

## Performa & responsivitas (khusus HP kelas bawah)

Situs sempat terasa berat di HP karena beberapa efek visual yang costly di GPU/CPU perangkat lawas. Sudah diperbaiki:

- **Dihapus total: GSAP + ScrollTrigger** (dua chunk JS, cukup besar untuk diunduh & dieksekusi di HP). Semua animasi sekarang native browser.
- **Carousel Mahasiswa** — sebelumnya menulis `scrollLeft` di **setiap frame, selamanya** (60x/detik, memaksa browser menghitung ulang layout terus-menerus, bahkan saat carousel sudah tidak terlihat). Sekarang cuma "melompat" satu kartu tiap 3 detik, dan berhenti total kalau tidak sedang terlihat di layar.
- **Blur di navbar** (`backdrop-filter`) dikecilkan, dan **dimatikan total di layar ≤640px** (diganti warna solid semi-transparan) — blur pada elemen *sticky* yang di-scroll adalah salah satu penyebab lag paling umum di HP.
- **Latar grid animasi** di belakang halaman **dimatikan di layar ≤768px** (dua layer full-layar yang animasi terus-menerus lumayan berat untuk GPU HP kelas bawah); di desktop tetap ada tapi ringan (hanya `transform`, di-composite GPU).
- **Efek "berpendar" pada judul** yang tadinya animasi terus-menerus (`text-shadow` yang di-animate itu mahal, bikin browser repaint tiap frame) — dikembalikan ke statis.
- Halaman `/admin` tidak memuat animasi tambahan apa pun — tetap gesit untuk kerja input data.
- Tidak ada ORM berat — query SQL langsung ke Turso lewat `@libsql/client`.
- Semua layout dibangun mobile-first dengan Tailwind (`sm:`, `lg:` breakpoints) dan sudah diuji pada ukuran umum: HP kecil, HP besar, tablet, laptop, layar lebar.

Kalau setelah update ini masih terasa berat di HP tertentu, kemungkinan besar penyebabnya foto berukuran besar yang diunggah lewat admin (belum ada resize otomatis) — kompres dulu foto sebelum diunggah, idealnya di bawah ~500KB per foto.

## SEO & daftar ke Google Search Console

Situs sudah disiapkan agar mudah ditemukan untuk pencarian seperti **"Teknik Informatika UNPER"**, **"TI25C"**, **"TI 25 C"**, dan sejenisnya:

- Meta `title`, `description`, dan `keywords` di tiap halaman (beranda, halaman mahasiswa, halaman gallery — masing-masing otomatis dibuat dari datanya sendiri).
- Open Graph & Twitter Card lengkap (judul, deskripsi, gambar) — supaya link yang dibagikan ke WhatsApp/Instagram/Twitter tampil bagus dengan pratinjau gambar (`public/og-image.jpg`, sudah dibuatkan dengan warna & identitas TI 25 C).
- `canonical` URL di tiap halaman.
- Data terstruktur (JSON-LD) di beranda supaya Google lebih paham situs ini tentang apa.
- `/admin` otomatis diberi header `X-Robots-Tag: noindex` + di-*disallow* di `robots.txt` — supaya panel admin tidak muncul di hasil pencarian.
- `sitemap.xml` **dinamis** (`server/routes/sitemap.xml.ts`) — otomatis memuat semua halaman mahasiswa & gallery langsung dari database, tidak perlu di-update manual tiap kali data admin berubah. Cek di `https://www.ti25c.web.id/sitemap.xml` setelah deploy.
- `robots.txt` sudah tersedia di `public/robots.txt`, menunjuk ke sitemap di atas.

### Langkah daftar ke Google Search Console

1. Buka [Google Search Console](https://search.google.com/search-console) → **Tambahkan properti** → pilih **"Awalan URL"** → masukkan `https://www.ti25c.web.id`.
2. Pilih metode verifikasi **"Tag HTML"**. Search Console akan memberi kode seperti:
   ```html
   <meta name="google-site-verification" content="XXXXXXXXXXXXXXXXXXXX" />
   ```
   Salin bagian `content="..."`-nya, tempel ke `.env`:
   ```env
   GOOGLE_SITE_VERIFICATION=XXXXXXXXXXXXXXXXXXXX
   ```
   Deploy ulang (atau restart server produksi), lalu klik **Verifikasi** di Search Console.
   *(Alternatif: verifikasi lewat TXT record di DNS domain — juga valid, tidak perlu ubah apa pun di kode.)*
3. Setelah terverifikasi, buka menu **Sitemaps** di sidebar kiri → masukkan `sitemap.xml` → **Kirim**.
4. Buka menu **Pemeriksaan URL**, masukkan `https://www.ti25c.web.id/`, klik **Minta pengindeksan** supaya beranda dicek lebih cepat (biasanya masih perlu beberapa hari sampai muncul di hasil pencarian).
5. Pastikan `NUXT_PUBLIC_SITE_URL` di `.env` produksi sudah persis `https://www.ti25c.web.id` (atau `https://ti25c.web.id` kalau tanpa `www`, sesuaikan mana yang jadi domain utama) — semua meta tag, canonical, dan sitemap mengikuti nilai ini.

### Kata kunci yang sudah ditarget

Sudah dimasukkan ke meta `description`/`keywords` beranda: *TI25C, TI 25 C, Teknik Informatika UNPER, Teknik Informatika Universitas Perjuangan Tasikmalaya, Universitas Perjuangan Tasikmalaya, UNPER Tasikmalaya, mahasiswa Teknik Informatika 25 C*. Mau menambah kata kunci lain? Edit array `meta` di `nuxt.config.ts` (bagian `app.head.meta`) atau `useSeoMeta` di `pages/index.vue`.

> Catatan: mengisi meta keywords saja tidak otomatis membuat situs ranking tinggi — yang paling berpengaruh adalah **konten asli** (isi data mahasiswa, deskripsi, foto kegiatan) dan **backlink** (link ke situs ini dari Instagram/media sosial kampus, grup WhatsApp, dsb). Sitemap + verifikasi Search Console di atas hanya memastikan Google *bisa* menemukan & mengindeks halamannya.

## Build untuk produksi

```bash
npm run build
npm run preview   # opsional, untuk cek hasil build secara lokal
```

Deploy folder hasil build (`.output/`) ke platform Node.js seperti Vercel, Netlify, Railway, atau VPS biasa. Pastikan environment variables (`TURSO_DATABASE_URL`, `TURSO_AUTH_TOKEN`, `ADMIN_PASSWORD`, `SESSION_SECRET`) sudah diatur di platform tersebut, dan folder `public/uploads/` bisa ditulis (writable) di server produksi — atau alihkan upload ke layanan penyimpanan objek (S3, Cloudflare R2, dll) bila deploy ke platform serverless yang read-only filesystem-nya.
