<script setup lang="ts">
const route = useRoute()
const links = useAdminLinks()
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
