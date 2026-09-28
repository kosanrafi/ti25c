-- =====================================================================
-- SEED DATA TI 25 C
-- Aman dijalankan berulang: memakai INSERT OR IGNORE + id eksplisit.
-- =====================================================================

-- 1) ROLE
INSERT OR IGNORE INTO roles (id, name, sort_order) VALUES
  (1, 'Ketua Kelas (KM)',   1),
  (2, 'Wakil Ketua Kelas',  2),
  (3, 'Sekretaris',         3),
  (4, 'Bendahara',          4),
  (5, 'Mahasiswa',          5);

-- 2) MAHASISWA (28 orang)
--    role_id: 1 = KM, 2 = Wakil KM, 5 = Mahasiswa
INSERT OR IGNORE INTO mahasiswa (id, name, role_id, sort_order) VALUES
  (1,  'ENDRU AIDIL FITRIANSYAH',          5, 1),
  (2,  'MUHAMMAD WANDI SAPUTRA NURHASAN',  5, 2),
  (3,  'FAHRI RAHMAT FAUZI',               5, 3),
  (4,  'M DANIL DARMANSYAH',               2, 4),
  (5,  'DIKY KURNIAWAN',                   5, 5),
  (6,  'REFLIZA ADAM',                     5, 6),
  (7,  'MOHAMAD REZIA RAHMATULOH',         5, 7),
  (8,  'ANDIN RAIS HASANAH',               5, 8),
  (9,  'RAFI FAUZAN RAMADHAN',             5, 9),
  (10, 'RIYYAN MIFTAHURROHMAT',            5, 10),
  (11, 'WILDAN JULIANSYAH',                5, 11),
  (12, 'SHORA RAHMA FUTRI',                5, 12),
  (13, 'MAULANA SUBAKTI',                  5, 13),
  (14, 'TRIYANA WADIA HAMBALI',            5, 14),
  (15, 'MUHAMMAD FASYA SYA''BANA',         5, 15),
  (16, 'ARPANUL HAKIM',                    5, 16),
  (17, 'ABIAN JADWA QUESAL AL ZUBARA',     5, 17),
  (18, 'DINA APRILIANI',                   5, 18),
  (19, 'KARIMA ROBBANI BERLIANA',          5, 19),
  (20, 'MUHAMMAD DAVA PUTRA PAMUNGKAS',    5, 20),
  (21, 'MIFTAH PAUZAN JAMIL',              1, 21),
  (22, 'REGI SOPYAN FIRDAUS',              5, 22),
  (23, 'MUHAMAD ATARDIYANSAHK',            5, 23),
  (24, 'IFAN JULIAN PRATAMA',              5, 24),
  (25, 'AFRIZAL RISMANSYAH',               5, 25),
  (26, 'MOCHAMMAD IKHSAN ARDIANSYAH',      5, 26),
  (27, 'FITRIANI',                         5, 27),
  (28, 'ARFYN DIAZ',                       5, 28);

-- 3) DATA SEMENTARA (1 baris per tabel, ganti lewat halaman /admin)
INSERT OR IGNORE INTO posters (id, title, description, image, glow_color, sort_order) VALUES
  (1, 'TI 25 C', 'Universitas Perjuangan Tasikmalaya', '', '#EF4B36', 1);

INSERT OR IGNORE INTO gallery (id, title, cover_image, photos, sort_order) VALUES
  (1, 'Ospek Jurusan', '', '[]', 1);

INSERT OR IGNORE INTO info_kelas (id, tag, title, description, link_url, image, theme, sort_order) VALUES
  (1, 'RAPAT KELAS', 'Rapat Kelas
Setiap Pekan', 'Diskusi & evaluasi kegiatan kelas setiap pekan.', '', '', 'sky', 1);
