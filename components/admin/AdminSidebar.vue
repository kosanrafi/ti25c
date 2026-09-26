<script setup lang="ts">
const route = useRoute()
const links = [
  { to: '/admin', label: 'Dashboard', icon: 'M3 12l2-2m0 0 7-7 7 7M5 10v10a1 1 0 0 0 1 1h3m10-11 2 2m-2-2v10a1 1 0 0 1-1 1h-3m-6 0a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1m-6 0h6' },
  { to: '/admin/poster', label: 'Poster', icon: 'M4 16l4.586-4.586a2 2 0 0 1 2.828 0L16 16m-2-2 1.586-1.586a2 2 0 0 1 2.828 0L20 14M14 8h.01M6 20h12a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2Z' },
  { to: '/admin/mahasiswa', label: 'Mahasiswa', icon: 'M17 20h5v-2a4 4 0 0 0-3-3.87M9 20H4v-2a4 4 0 0 1 3-3.87m9-5.13a4 4 0 1 0-8 0 4 4 0 0 0 8 0Zm6 3a4 4 0 1 0-8 0m-6 0a4 4 0 1 0-8 0' },
  { to: '/admin/gallery', label: 'Gallery', icon: 'M4 5h16v14H4V5Zm4 10 3-3 2 2 4-5 3 6H8Zm1-6a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z' }
]
</script>

<template>
  <aside class="hidden w-60 shrink-0 border-r border-white/10 bg-white/[0.02] p-5 sm:block">
    <NuxtLink to="/admin" class="flex flex-col leading-none">
      <span class="text-lg font-extrabold tracking-wide text-white">TI 25 C</span>
      <span class="mt-1 text-[8px] tracking-[0.42em] text-mist-400">ADMIN PANEL</span>
    </NuxtLink>

    <nav class="mt-8 space-y-1">
      <NuxtLink
        v-for="link in links"
        :key="link.to"
        :to="link.to"
        class="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors"
        :class="route.path === link.to ? 'bg-flame-500/15 text-flame-300' : 'text-white/75 hover:bg-white/5 hover:text-white'"
      >
        <svg class="h-4.5 w-4.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="1.8"><path stroke-linecap="round" stroke-linejoin="round" :d="link.icon" /></svg>
        {{ link.label }}
      </NuxtLink>
    </nav>

    <NuxtLink to="/" target="_blank" class="mt-8 flex items-center gap-2 rounded-xl px-3 py-2.5 text-xs font-medium text-white/60 hover:bg-white/5 hover:text-white">
      <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="1.8"><path stroke-linecap="round" stroke-linejoin="round" d="M10 6H6a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-4M14 4h6m0 0v6m0-6L10 14"/></svg>
      Lihat situs
    </NuxtLink>
  </aside>
</template>
