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

## Animasi & nuansa futuristik

Beranda sekarang punya beberapa lapis animasi, semuanya dibuat ringan (CSS + GSAP yang sudah ada di `package.json`, tidak ada dependency baru):

- **Reveal saat scroll** — tiap section (Mahasiswa, Gallery, Info & Agenda, Tentang Kami, Kontak) muncul fade + geser naik begitu masuk layar (GSAP ScrollTrigger, diimpor dinamis di client saja).
- **Progress bar** — garis tipis di paling atas menunjukkan seberapa jauh halaman sudah discroll.
- **Latar ambient** — grid garis halus & glow oranye yang bergerak sangat lambat di belakang seluruh halaman, memberi kedalaman tanpa mengganggu keterbacaan.
- **Statistik count-up** — jumlah Mahasiswa, Album Gallery, dan Info & Agenda dihitung naik dari 0 saat pertama terlihat, diambil langsung dari data asli di database.
- **Ticker berjalan** — teks berjalan "TEKNIK INFORMATIKA 25 C • SOLID & KOMPAK • ANGKATAN 2025" di sebelah statistik.
- **Tilt 3D pada poster Hero** — kartu poster miring mengikuti posisi kursor (desktop saja).
- **Judul berpendar** — efek glow pada judul section berdenyut halus.
- **Sapuan cahaya di tombol** — highlight tipis melintas saat tombol di-hover.
- **Transisi antar halaman** — pindah ke halaman detail Mahasiswa/Gallery terasa mulus (fade + geser), bukan lompat instan.

Semua animasi otomatis dimatikan kalau pengguna mengaktifkan preferensi **"reduce motion"** di sistem operasinya, dan tidak ada animasi tambahan di halaman `/admin` (biar tetap gesit untuk kerja input data).

## Performa & responsivitas

- Halaman publik dirender SSR (cepat & ringan saat pertama dibuka), halaman `/admin` dirender client-only (tidak perlu SSR untuk panel admin).
- Tidak ada ORM berat — query SQL langsung ke Turso lewat `@libsql/client`.
- Carousel Mahasiswa & rotasi Poster memakai `requestAnimationFrame`/CSS transform, ringan dan menghormati preferensi `prefers-reduced-motion`.
- Semua layout dibangun mobile-first dengan Tailwind (`sm:`, `lg:` breakpoints) — sudah diuji pada semua ukuran umum: HP kecil, HP besar, tablet, laptop, dan layar lebar.
- GSAP hanya digunakan untuk animasi intro sekali di awal (tree-shakeable, ringan).

---

## Build untuk produksi

```bash
npm run build
npm run preview   # opsional, untuk cek hasil build secara lokal
```

Deploy folder hasil build (`.output/`) ke platform Node.js seperti Vercel, Netlify, Railway, atau VPS biasa. Pastikan environment variables (`TURSO_DATABASE_URL`, `TURSO_AUTH_TOKEN`, `ADMIN_PASSWORD`, `SESSION_SECRET`) sudah diatur di platform tersebut, dan folder `public/uploads/` bisa ditulis (writable) di server produksi — atau alihkan upload ke layanan penyimpanan objek (S3, Cloudflare R2, dll) bila deploy ke platform serverless yang read-only filesystem-nya.
