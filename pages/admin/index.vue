<script setup lang="ts">
definePageMeta({ layout: 'admin', middleware: 'admin' })

const { data: posters } = await useFetch('/api/posters', { default: () => [] })
const { data: mahasiswa } = await useFetch('/api/mahasiswa', { default: () => [] })
const { data: gallery } = await useFetch('/api/gallery', { default: () => [] })

const cards = computed(() => [
  { label: 'Poster', count: posters.value?.length || 0, to: '/admin/poster', icon: 'M4 16l4.586-4.586a2 2 0 0 1 2.828 0L16 16m-2-2 1.586-1.586a2 2 0 0 1 2.828 0L20 14M14 8h.01M6 20h12a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2Z' },
  { label: 'Mahasiswa', count: mahasiswa.value?.length || 0, to: '/admin/mahasiswa', icon: 'M17 20h5v-2a4 4 0 0 0-3-3.87M9 20H4v-2a4 4 0 0 1 3-3.87m9-5.13a4 4 0 1 0-8 0 4 4 0 0 0 8 0Zm6 3a4 4 0 1 0-8 0m-6 0a4 4 0 1 0-8 0' },
  { label: 'Album Gallery', count: gallery.value?.length || 0, to: '/admin/gallery', icon: 'M4 5h16v14H4V5Zm4 10 3-3 2 2 4-5 3 6H8Zm1-6a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z' }
])
</script>

<template>
  <div>
    <h1 class="text-xl font-bold text-white">Dashboard</h1>
    <p class="mt-1 text-sm text-white/60">Ringkasan data website TI 25 C.</p>

    <div class="mt-6 grid gap-4 sm:grid-cols-3">
      <NuxtLink v-for="c in cards" :key="c.label" :to="c.to" class="admin-card flex items-center gap-4 transition-colors hover:border-flame-500/50">
        <div class="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-flame-500/15 text-flame-300">
          <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="1.8"><path stroke-linecap="round" stroke-linejoin="round" :d="c.icon" /></svg>
        </div>
        <div>
          <p class="text-2xl font-bold text-white">{{ c.count }}</p>
          <p class="text-xs text-white/60">{{ c.label }}</p>
        </div>
      </NuxtLink>
    </div>

    <div class="admin-card mt-6">
      <p class="text-sm font-semibold text-white">Mulai cepat</p>
      <ul class="mt-3 space-y-2 text-sm text-white/70">
        <li>• <NuxtLink to="/admin/poster" class="text-flame-300 hover:underline">Kelola Poster</NuxtLink> — kartu tumpukan di halaman Home (judul, deskripsi, gambar).</li>
        <li>• <NuxtLink to="/admin/mahasiswa" class="text-flame-300 hover:underline">Kelola Mahasiswa</NuxtLink> — nama, role (default "Mahasiswa"), deskripsi, hobi, skills, sertifikat.</li>
        <li>• <NuxtLink to="/admin/gallery" class="text-flame-300 hover:underline">Kelola Gallery</NuxtLink> — judul album, 1 cover, dan maksimal 7 foto (boleh GIF).</li>
      </ul>
    </div>
  </div>
</template>
