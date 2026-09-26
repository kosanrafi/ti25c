<script setup lang="ts">
const open = ref(false)
const links = [
  { href: '#home', label: 'Home' },
  { href: '#mahasiswa', label: 'Mahasiswa' },
  { href: '#gallery', label: 'Gallery Moment' },
  { href: '#kontak', label: 'Kontak' }
]
</script>

<template>
  <header class="sticky top-4 z-50 px-4 sm:px-6">
    <div class="mx-auto max-w-7xl">
      <div class="nav-pill anim-top flex items-center justify-between gap-4 rounded-full py-3 pl-6 pr-3 sm:pr-4 lg:grid lg:grid-cols-[1fr_auto_1fr]">
        <a href="#home" class="flex flex-col leading-none">
          <span class="text-[22px] font-extrabold tracking-wide text-white">TI 25 C</span>
          <span class="mt-1 text-[8px] tracking-[0.42em] text-mist-400">UNPER</span>
        </a>

        <nav class="hidden items-center gap-9 text-[15px] font-semibold lg:flex" aria-label="Navigasi utama">
          <a
            v-for="link in links"
            :key="link.href"
            :href="link.href"
            class="text-white/90 transition-colors hover:text-white"
          >{{ link.label }}</a>
        </nav>

        <div class="hidden items-center justify-end gap-5 sm:flex">
          <a href="#kontak" class="text-sm font-semibold text-white transition-colors hover:text-flame-300">Masuk</a>
          <a href="#kontak" class="rounded-full bg-flame-500 px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-flame-600">Gabung Grup</a>
        </div>

        <button class="p-2 text-white lg:hidden" aria-label="Buka menu" :aria-expanded="open" @click="open = !open">
          <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="1.8">
            <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5M3.75 17.25h16.5" />
          </svg>
        </button>
      </div>

      <div v-if="open" class="nav-pill mt-2 rounded-3xl px-6 py-5 lg:hidden">
        <nav class="flex flex-col gap-4 text-sm font-semibold" aria-label="Navigasi seluler">
          <a v-for="link in links" :key="link.href" :href="link.href" class="text-white/90" @click="open = false">{{ link.label }}</a>
          <div class="flex items-center gap-4 border-t border-white/10 pt-4">
            <a href="#kontak" class="text-white" @click="open = false">Masuk</a>
            <a href="#kontak" class="rounded-full bg-flame-500 px-5 py-2 text-white" @click="open = false">Gabung Grup</a>
          </div>
        </nav>
      </div>
    </div>
  </header>
</template>
