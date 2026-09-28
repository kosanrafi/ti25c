-- Tabel Role (KM, Wakil KM, Sekretaris, Bendahara, Mahasiswa)
CREATE TABLE IF NOT EXISTS roles (
  id          INTEGER PRIMARY KEY,
  name        TEXT NOT NULL UNIQUE,
  sort_order  INTEGER NOT NULL DEFAULT 0
);

-- Tabel Poster (kartu tumpukan di Hero)
CREATE TABLE IF NOT EXISTS posters (
  id          INTEGER PRIMARY KEY AUTOINCREMENT,
  title       TEXT NOT NULL,
  description TEXT DEFAULT '',
  image       TEXT DEFAULT '',
  glow_color  TEXT DEFAULT '#EF4B36',
  sort_order  INTEGER DEFAULT 0,
  created_at  TEXT DEFAULT (datetime('now'))
);

-- Tabel Mahasiswa (role mengacu ke tabel roles; default id 5 = Mahasiswa)
CREATE TABLE IF NOT EXISTS mahasiswa (
  id          INTEGER PRIMARY KEY AUTOINCREMENT,
  name        TEXT NOT NULL,
  role_id     INTEGER NOT NULL DEFAULT 5 REFERENCES roles(id),
  description TEXT DEFAULT '',
  hobi        TEXT DEFAULT '',
  skills      TEXT DEFAULT '',
  sertifikat  TEXT DEFAULT '',
  photo       TEXT DEFAULT '',
  sort_order  INTEGER DEFAULT 0,
  created_at  TEXT DEFAULT (datetime('now'))
);

-- Tabel Gallery (judul + 1 cover + maksimal 7 foto/gif, disimpan sbg JSON array di kolom photos)
CREATE TABLE IF NOT EXISTS gallery (
  id          INTEGER PRIMARY KEY AUTOINCREMENT,
  title       TEXT NOT NULL,
  cover_image TEXT DEFAULT '',
  photos      TEXT DEFAULT '[]',
  sort_order  INTEGER DEFAULT 0,
  created_at  TEXT DEFAULT (datetime('now'))
);

-- Tabel Info Kelas (kartu coverflow "Info & Agenda Kelas")
-- theme: sky | light | indigo | flame | emerald
CREATE TABLE IF NOT EXISTS info_kelas (
  id          INTEGER PRIMARY KEY AUTOINCREMENT,
  tag         TEXT DEFAULT '',
  title       TEXT NOT NULL,
  description TEXT DEFAULT '',
  link_url    TEXT DEFAULT '',
  image       TEXT DEFAULT '',
  theme       TEXT DEFAULT 'sky',
  sort_order  INTEGER DEFAULT 0,
  created_at  TEXT DEFAULT (datetime('now'))
);
