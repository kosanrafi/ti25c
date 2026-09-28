<template>
  <section id="tentang" class="px-4 pt-32 sm:px-6">
    <div class="mx-auto max-w-7xl">
      <div class="about-card grid items-center gap-10 p-8 sm:p-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)_16rem] lg:gap-8 lg:p-14">

        <div>
          <h2 class="text-[1.9rem] font-bold text-white">Tentang Kami</h2>
          <p class="mt-3 max-w-sm text-sm font-medium leading-relaxed text-white/90">
            TI 25 C adalah keluarga mahasiswa Teknik Informatika Universitas Perjuangan Tasikmalaya yang solid, aktif, dan selalu siap berkolaborasi dalam setiap kegiatan akademik maupun non-akademik.
          </p>
          <a href="#" class="mt-6 inline-flex items-center gap-2 rounded-full bg-white px-7 py-2.5 text-sm font-semibold text-flame-700 transition-colors hover:bg-white/90">Gabung Grup Kelas
            <svg class="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2.2" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"/></svg>
          </a>
        </div>

        <ul class="space-y-3">
          <li class="about-chip"><span class="text-base font-bold text-white/80" aria-hidden="true">#</span>Solid &amp; kompak dalam setiap kegiatan</li>
          <li class="about-chip"><span class="text-base font-bold text-white/80" aria-hidden="true">#</span>Aktif di berbagai kegiatan kampus</li>
          <li class="about-chip"><span class="text-base font-bold text-white/80" aria-hidden="true">#</span>Terbuka untuk kolaborasi &amp; proyek bersama</li>
        </ul>

        <!-- ruang kosong untuk ilustrasi di kolom kanan -->
        <div class="hidden lg:block" aria-hidden="true"></div>

        <!-- Ilustrasi menjulang keluar dari kartu (di video: karakter 3D). Ganti dengan gambar sendiri kalau ada. -->
        <svg class="pointer-events-none absolute bottom-3 right-6 hidden h-[calc(100%+3rem)] w-auto lg:block" viewBox="14 104 216 270" fill="none" aria-hidden="true">
            <defs>
              <linearGradient id="capTop" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#5568A6"/><stop offset="1" stop-color="#242F58"/></linearGradient>
              <linearGradient id="capBase" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#2C3A68"/><stop offset="1" stop-color="#151D3C"/></linearGradient>
              <linearGradient id="gold" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#FFE39A"/><stop offset="1" stop-color="#D49A2A"/></linearGradient>
            </defs>
            <ellipse cx="120" cy="362" rx="98" ry="9" fill="#000" opacity=".28"/>
            <!-- tumpukan buku -->
            <rect x="34" y="316" width="176" height="42" rx="9" fill="#F5ECDF"/>
            <rect x="34" y="316" width="24" height="42" rx="9" fill="#8B1E12"/>
            <path d="M70 328h128M70 338h128M70 348h110" stroke="#D9CBB6" stroke-width="2.5" stroke-linecap="round"/>
            <rect x="46" y="276" width="160" height="40" rx="9" fill="#26325C"/>
            <rect x="46" y="276" width="22" height="40" rx="9" fill="#EF4B36"/>
            <path d="M80 288h112M80 298h112M80 308h90" stroke="#4A5A92" stroke-width="2.5" stroke-linecap="round"/>
            <rect x="38" y="238" width="172" height="38" rx="9" fill="url(#gold)"/>
            <rect x="38" y="238" width="22" height="38" rx="9" fill="#B9791A"/>
            <path d="M72 249h126M72 259h126M72 269h100" stroke="#F3C766" stroke-width="2.5" stroke-linecap="round"/>
            <!-- toga -->
            <path d="M62 170v34c0 16 26 27 58 27s58-11 58-27v-34l-58 26Z" fill="url(#capBase)"/>
            <path d="M120 112 218 156l-98 44-98-44Z" fill="url(#capTop)"/>
            <path d="M120 112 218 156l-98 44-98-44Z" stroke="#7C8FD0" stroke-opacity=".45" stroke-width="1.5"/>
            <circle cx="120" cy="156" r="6" fill="#FFE39A"/>
            <path d="M120 156 196 172v46" stroke="#FFE39A" stroke-width="3" stroke-linecap="round"/>
            <rect x="189" y="216" width="14" height="30" rx="5" fill="url(#gold)"/>
          </svg>
      </div>
      <div class="about-line mx-auto mt-2 w-[94%]" aria-hidden="true"></div>
    </div>
  </section>
</template>
