<template>
<footer class="mt-28 px-4 sm:px-6">
  <div class="footer-panel mx-auto max-w-7xl rounded-t-[28px] px-8 pb-8 pt-12 sm:px-12">
    <div class="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1.2fr]">

      <div>
        <span class="block text-2xl font-extrabold tracking-wide text-white">TI 25 C</span>
        <span class="mt-1 block text-[8px] tracking-[0.42em] text-mist-400">UNPER</span>
        <p class="mt-4 max-w-[15rem] text-xs leading-relaxed text-white/85">Teknik Informatika 25 C — Universitas Perjuangan Tasikmalaya. Solid, aktif, dan kompak.</p>
      </div>

      <nav aria-label="Jelajahi">
        <ul class="space-y-3">
          <li><NuxtLink to="/" class="foot-link">Home</NuxtLink></li>
          <li><NuxtLink to="/mahasiswa" class="foot-link">Mahasiswa</NuxtLink></li>
          <li><NuxtLink to="/gallery" class="foot-link">Gallery Moment</NuxtLink></li>
          <li><NuxtLink to="/agenda" class="foot-link">Agenda</NuxtLink></li>
          <li><NuxtLink to="/#tentang" class="foot-link">Tentang Kami</NuxtLink></li>
          <li><NuxtLink to="/kontak" class="foot-link">Kontak</NuxtLink></li>
        </ul>
      </nav>

      <nav aria-label="Lainnya">
        <ul class="space-y-3">
          <li><a href="#" class="foot-link">Struktur Kelas</a></li>
          <li><a href="#" class="foot-link">Dokumentasi</a></li>
          <li><a href="#" class="foot-link">Prestasi</a></li>
          <li><a href="#" class="foot-link">Peraturan Kelas</a></li>
          <li><a href="#" class="foot-link">Syarat &amp; Ketentuan</a></li>
        </ul>
      </nav>

      <div>
        <p class="text-xs font-semibold text-white">Follow us on</p>
        <div class="mt-3 flex gap-3">
          <a href="#" aria-label="Instagram" class="text-white transition-colors hover:text-flame-300">
            <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="1.8"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="3.5"/><circle cx="17.2" cy="6.8" r="0.6" fill="currentColor" stroke="none"/></svg>
          </a>
          <a href="#" aria-label="TikTok" class="text-white transition-colors hover:text-flame-300">
            <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M16.5 2h-3v13.2a2.8 2.8 0 1 1-2-2.68V9.4a5.8 5.8 0 1 0 5 5.75V8.1a6.9 6.9 0 0 0 4 1.28V6.4a3.9 3.9 0 0 1-4-4.4z"/></svg>
          </a>
        </div>

        <p class="mt-6 text-xs font-semibold text-white">Get our mobile app</p>
        <div class="mt-3 flex flex-wrap gap-2">
          <a href="#" class="store-badge" aria-label="Download di App Store">
            <svg class="h-5 w-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M16.4 1.4c0 1.1-.5 2.2-1.2 3-.8.9-2 1.5-3.1 1.4-.1-1.1.4-2.2 1.2-3 .8-.9 2.2-1.5 3.1-1.4zM20.7 17c-.5 1.2-.8 1.7-1.4 2.7-.9 1.4-2.2 3.2-3.7 3.2-1.4 0-1.8-.9-3.7-.9-1.9 0-2.3.9-3.7.9-1.6 0-2.8-1.6-3.7-3-2.5-3.9-2.7-8.4-1.2-10.9 1.1-1.7 2.6-2.6 4-2.6 1.4 0 2.3.9 3.4.9 1.1 0 1.8-.9 3.4-.9 1.3 0 2.6.7 3.5 1.8-3.1 1.7-2.6 6.1.1 7.4z"/></svg>
            <span><small>Download on the</small><b>App Store</b></span>
          </a>
          <a href="#" class="store-badge" aria-label="Get it on Google Play">
            <svg class="h-5 w-5" viewBox="0 0 24 24" aria-hidden="true">
              <path fill="#00A0FF" d="M3.6 2.4 13.2 12 3.6 21.6c-.4-.2-.6-.6-.6-1.1V3.5c0-.5.2-.9.6-1.1Z"/>
              <path fill="#00E676" d="M3.6 2.4c.3-.2.7-.2 1.1 0l11 6.4L13.2 12 3.6 2.4Z"/>
              <path fill="#FFC107" d="M15.7 8.8 20 11.3c.7.4.7 1.4 0 1.8l-4.3 2.5L13.2 12l2.5-3.2Z"/>
              <path fill="#F44336" d="M13.2 12l2.5 3.2-11 6.4c-.4.2-.8.2-1.1 0L13.2 12Z"/>
            </svg>
            <span><small>GET IT ON</small><b>Google Play</b></span>
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
