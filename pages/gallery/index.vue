<script setup lang="ts">
interface Album {
  id: number
  title: string
  cover_image: string
  photos: string[]
}

const { data: gallery } = await useFetch<Album[]>('/api/gallery', { default: () => [] })

// kelas Tailwind ditulis lengkap agar terbaca oleh JIT
const gradients = ['from-slate-600', 'from-rose-800', 'from-violet-700', 'from-cyan-800', 'from-emerald-800']

const siteUrl = useRuntimeConfig().public.siteUrl
const desc = 'Galeri momen dan kegiatan Teknik Informatika 25 C (TI25C), Universitas Perjuangan Tasikmalaya.'
useSeoMeta({
  title: 'Gallery — TI 25 C',
  description: desc,
  ogTitle: 'Gallery — TI 25 C',
  ogDescription: desc,
  ogImage: `${siteUrl}/og-image.jpg`,
  ogUrl: `${siteUrl}/gallery`,
  twitterCard: 'summary_large_image'
})
useHead({ link: [{ rel: 'canonical', href: `${siteUrl}/gallery` }] })
</script>

<template>
  <section class="px-4 pb-10 pt-16 sm:px-6 sm:pt-20">
    <div class="mx-auto max-w-7xl">
      <h1 class="glow-title text-[2rem] font-bold text-white">Gallery Moment</h1>
      <p class="mt-2 text-sm font-medium text-white/80">Kumpulan momen dan dokumentasi kegiatan TI 25 C.</p>

      <div v-if="gallery?.length" class="mt-10 grid grid-cols-2 gap-x-5 gap-y-9 sm:grid-cols-3 lg:grid-cols-4 lg:gap-x-8">
        <article v-for="(item, i) in gallery" :key="item.id">
          <NuxtLink
            :to="`/gallery/${item.id}`"
            class="gal-poster block aspect-[2/3] bg-gradient-to-br via-ink-800 to-ink-900"
            :class="gradients[i % gradients.length]"
            :style="item.cover_image ? { backgroundImage: `linear-gradient(to top, rgba(0,0,0,.65), transparent 55%), url('${item.cover_image}')` } : {}"
          >
            <span class="text-sm font-semibold leading-tight text-white">{{ item.title }}</span>
          </NuxtLink>
          <div class="mt-3 flex items-center justify-between gap-2">
            <NuxtLink :to="`/gallery/${item.id}`" class="btn-black">Lihat Detail</NuxtLink>
            <span class="text-[11px] text-white/60">{{ item.photos?.length || 0 }} foto</span>
          </div>
        </article>
      </div>

      <p v-else class="mt-10 text-sm text-white/70">Belum ada album gallery. Tambahkan lewat halaman Admin.</p>
    </div>
  </section>
</template>
