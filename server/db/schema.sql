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

-- Tabel Mahasiswa
CREATE TABLE IF NOT EXISTS mahasiswa (
  id          INTEGER PRIMARY KEY AUTOINCREMENT,
  name        TEXT NOT NULL,
  role        TEXT NOT NULL DEFAULT 'Mahasiswa',
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
