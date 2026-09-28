<template>
  <section id="kontak" class="px-4 pt-24 sm:px-6">
    <div class="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1.05fr_1fr] lg:gap-14">

      <div>
        <h2 class="glow-title text-[2.1rem] font-bold text-white">Kontak</h2>

        <p class="mt-7 font-semibold text-white">Ketua Kelas <span class="text-xs font-normal text-white/80">(Hubungi untuk koordinasi &amp; informasi kelas)</span></p>
        <div class="mt-3 flex flex-wrap gap-3">
          <a href="tel:081234567890" class="contact-pill">
            <svg class="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h1.5a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106a1.125 1.125 0 0 0-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97a1.125 1.125 0 0 0 .417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z"/></svg>
            0812 3456 7890
          </a>
          <a href="mailto:ti25c@unper.ac.id" class="contact-pill">
            <svg class="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"/></svg>
            ti25c@unper.ac.id
          </a>
        </div>

        <h3 class="mt-8 font-semibold text-white">Lokasi Kampus</h3>
        <div class="mt-3 space-y-3">
          <div class="loc-row flex items-center justify-between gap-4 px-6 py-4">
            <div>
              <p class="text-[13px] font-bold uppercase text-white">Universitas Perjuangan Tasikmalaya</p>
              <p class="mt-1 flex items-center gap-1.5 text-xs text-white/85">
                <svg class="h-3.5 w-3.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="1.8" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"/><path stroke-linecap="round" stroke-linejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"/></svg>
                <span class="underline underline-offset-2">Jl. Peta No. 177, Tasikmalaya, Jawa Barat</span>
              </p>
            </div>
            <span class="shrink-0 text-lg font-extrabold tracking-wide text-flame-400">UNPER</span>
          </div>
        </div>
      </div>

      <div class="space-y-5">
        <div class="news-card rounded-3xl p-7 sm:p-8">
          <h3 class="max-w-xs text-[1.65rem] font-bold leading-[1.15] text-white">Dapatkan info terbaru dari TI 25 C</h3>
          <p class="mt-3 max-w-sm text-[13px] font-medium leading-relaxed text-white/90">Masukkan email untuk update kegiatan dan pengumuman kelas.</p>
          <form class="mt-6 flex items-center rounded-full bg-white/90 py-1.5 pl-5 pr-1.5" @submit.prevent>
            <label for="email" class="sr-only">Email</label>
            <input id="email" type="email" required placeholder="Masukkan email kamu" class="min-w-0 flex-1 bg-transparent py-2 text-sm text-neutral-900 outline-none placeholder:text-neutral-500" />
            <button class="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-flame-500 text-white transition-colors hover:bg-flame-600" aria-label="Kirim">
              <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5"/></svg>
            </button>
          </form>
        </div>

        <a href="https://maps.app.goo.gl/NfUwiewb8Lac6ZLdA" target="_blank" rel="noopener" class="group relative block h-52 overflow-hidden rounded-3xl border border-white/10">
          <svg class="absolute inset-0 h-full w-full" viewBox="0 0 400 210" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
            <rect width="400" height="210" fill="#E7ECE2"/>
            <path d="M0 0h118c-14 30 10 52-6 84s-22 48-4 84l-8 42H0Z" fill="#9FD6E6"/>
            <path d="M190 22c30-14 68-8 98 8s56 8 112-10v56c-30 16-62 20-96 8s-60-18-92-2Z" fill="#CFE4C5"/>
            <path d="M250 150c26-10 60-6 90 6s44 10 60 4v50H236Z" fill="#D6E8CC"/>
            <g fill="none" stroke="#fff" stroke-width="5" stroke-linecap="round">
              <path d="M122 0c-8 62 20 96 42 136s30 52 26 74"/>
              <path d="M112 64c62 12 132 4 288-18"/>
              <path d="M140 136c72-10 156 4 260-8"/>
              <path d="M236 0c-12 72 6 128 30 210"/>
              <path d="M318 0c2 64 20 116 10 210"/>
            </g>
            <g fill="none" stroke="#F3D585" stroke-width="3" stroke-linecap="round">
              <path d="M96 0c12 70 46 110 92 150l40 60"/>
              <path d="M150 210c30-60 100-90 250-96"/>
            </g>
          </svg>
          <div class="absolute inset-0 flex flex-col items-center justify-center gap-3 text-center">
            <span class="grid h-11 w-11 place-items-center rounded-full bg-flame-500 text-white shadow-lg">
              <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="1.8" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"/><path stroke-linecap="round" stroke-linejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"/></svg>
            </span>
            <span class="rounded-full bg-black/75 px-4 py-2 text-xs font-semibold text-white backdrop-blur group-hover:underline">Lihat Lokasi Kampus di Google Maps</span>
          </div>
        </a>
      </div>
    </div>
  </section>
</template>
