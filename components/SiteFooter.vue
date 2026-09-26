<template>
  <footer id="kontak" class="footer-panel mt-20 px-4 py-14 sm:px-6">
    <div class="mx-auto max-w-7xl">
      <div class="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr]">
        <div>
          <span class="block text-2xl font-extrabold tracking-wide text-white">TI 25 C</span>
          <span class="mt-1 block text-[8px] tracking-[0.42em] text-mist-400">UNPER</span>
          <p class="mt-4 max-w-[15rem] text-xs leading-relaxed text-white/85">
            Teknik Informatika 25 C — Universitas Perjuangan Tasikmalaya. Solid, aktif, dan kompak.
          </p>
        </div>

        <nav aria-label="Jelajahi">
          <ul class="space-y-3">
            <li><a href="#home" class="foot-link">Home</a></li>
            <li><a href="#mahasiswa" class="foot-link">Mahasiswa</a></li>
            <li><a href="#gallery" class="foot-link">Gallery Moment</a></li>
            <li><a href="#kontak" class="foot-link">Kontak</a></li>
          </ul>
        </nav>

        <div>
          <p class="text-xs font-semibold text-white">Ikuti kami</p>
          <div class="mt-3 flex gap-3">
            <a href="#" aria-label="Instagram" class="text-white transition-colors hover:text-flame-300">
              <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="1.8"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="3.5"/><circle cx="17.2" cy="6.8" r="0.6" fill="currentColor" stroke="none"/></svg>
            </a>
            <a href="#" aria-label="TikTok" class="text-white transition-colors hover:text-flame-300">
              <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M16.5 2h-3v13.2a2.8 2.8 0 1 1-2-2.68V9.4a5.8 5.8 0 1 0 5 5.75V8.1a6.9 6.9 0 0 0 4 1.28V6.4a3.9 3.9 0 0 1-4-4.4z"/></svg>
            </a>
          </div>
        </div>
      </div>

      <div class="mt-12 flex flex-col items-center justify-between gap-2 border-t border-white/15 pt-5 text-[11px] text-white/80 sm:flex-row">
        <span>© {{ new Date().getFullYear() }} TI 25 C — Universitas Perjuangan Tasikmalaya. All Rights Reserved.</span>
        <span>Dibuat dengan Nuxt 3 &amp; Tailwind CSS</span>
      </div>
    </div>
  </footer>
</template>
