<script setup lang="ts">
interface Mahasiswa {
  id: number
  name: string
  role: string
  photo: string
}

const { data: mahasiswa } = await useFetch<Mahasiswa[]>('/api/mahasiswa', { default: () => [] })

const q = ref('')
const filtered = computed(() => {
  const k = q.value.trim().toLowerCase()
  const list = mahasiswa.value || []
  if (!k) return list
  return list.filter(m => m.name.toLowerCase().includes(k) || (m.role || '').toLowerCase().includes(k))
})

const siteUrl = useRuntimeConfig().public.siteUrl
const desc = 'Daftar mahasiswa Teknik Informatika 25 C (TI25C), Universitas Perjuangan Tasikmalaya.'
useSeoMeta({
  title: 'Mahasiswa — TI 25 C',
  description: desc,
  ogTitle: 'Mahasiswa — TI 25 C',
  ogDescription: desc,
  ogImage: `${siteUrl}/og-image.jpg`,
  ogUrl: `${siteUrl}/mahasiswa`,
  twitterCard: 'summary_large_image'
})
useHead({ link: [{ rel: 'canonical', href: `${siteUrl}/mahasiswa` }] })
</script>

<template>
  <section class="px-4 pb-10 pt-16 sm:px-6 sm:pt-20">
    <div class="mx-auto max-w-7xl">
      <div class="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 class="glow-title text-[2rem] font-bold text-white">Mahasiswa</h1>
          <p class="mt-2 text-sm font-medium text-white/80">
            {{ mahasiswa?.length || 0 }} mahasiswa Teknik Informatika 25 C — Universitas Perjuangan Tasikmalaya.
          </p>
        </div>
        <div class="w-full sm:w-72">
          <label for="cari" class="sr-only">Cari mahasiswa</label>
          <input
            id="cari"
            v-model="q"
            type="search"
            placeholder="Cari nama atau jabatan…"
            class="w-full rounded-full border border-white/15 bg-white/5 px-5 py-2.5 text-sm text-white outline-none placeholder:text-white/50 focus:border-flame-500"
          />
        </div>
      </div>

      <div v-if="filtered.length" class="mt-10 grid grid-cols-2 gap-x-5 gap-y-10 sm:grid-cols-3 lg:grid-cols-4 lg:gap-x-8">
        <MahasiswaCard v-for="m in filtered" :key="m.id" :data="m" class="!w-full" />
      </div>

      <p v-else class="mt-10 text-sm text-white/70">
        {{ q ? `Tidak ada mahasiswa yang cocok dengan "${q}".` : 'Belum ada data mahasiswa. Tambahkan lewat halaman Admin.' }}
      </p>
    </div>
  </section>
</template>
