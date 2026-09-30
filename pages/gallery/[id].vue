<script setup lang="ts">
interface Album {
  id: number
  title: string
  cover_image: string
  photos: string[]
}

const route = useRoute()

const { data, error } = await useFetch<Album>(`/api/gallery/${route.params.id}`)

if (error.value) {
  throw createError({ statusCode: 404, statusMessage: 'Album gallery tidak ditemukan.', fatal: true })
}

const allPhotos = computed(() => {
  if (!data.value) return []
  const photos = data.value.photos || []
  return photos.length ? photos : (data.value.cover_image ? [data.value.cover_image] : [])
})

const activeIndex = ref<number | null>(null)
function openPhoto(i: number) { activeIndex.value = i }
function close() { activeIndex.value = null }
function prev() {
  if (activeIndex.value === null) return
  activeIndex.value = (activeIndex.value - 1 + allPhotos.value.length) % allPhotos.value.length
}
function nextPhoto() {
  if (activeIndex.value === null) return
  activeIndex.value = (activeIndex.value + 1) % allPhotos.value.length
}
function onKeydown(e: KeyboardEvent) {
  if (activeIndex.value === null) return
  if (e.key === 'Escape') close()
  if (e.key === 'ArrowLeft') prev()
  if (e.key === 'ArrowRight') nextPhoto()
}
onMounted(() => window.addEventListener('keydown', onKeydown))
onBeforeUnmount(() => window.removeEventListener('keydown', onKeydown))

const config = useRuntimeConfig()
const siteUrl = config.public.siteUrl
const pageUrl = computed(() => `${siteUrl}/gallery/${route.params.id}`)
const seoDescription = computed(() =>
  data.value
    ? `Album "${data.value.title}" — dokumentasi kegiatan Teknik Informatika 25 C (TI25C), Universitas Perjuangan Tasikmalaya.`
    : 'Galeri momen dan kegiatan Teknik Informatika 25 C (TI25C), Universitas Perjuangan Tasikmalaya.'
)

useSeoMeta({
  title: () => (data.value ? `${data.value.title} — Gallery TI 25 C` : 'Gallery — TI 25 C'),
  description: () => seoDescription.value,
  ogTitle: () => (data.value ? `${data.value.title} — Gallery TI 25 C` : 'Gallery — TI 25 C'),
  ogDescription: () => seoDescription.value,
  ogImage: () => (data.value?.cover_image ? `${siteUrl}${data.value.cover_image}` : `${siteUrl}/og-image.jpg`),
  ogUrl: () => pageUrl.value,
  ogType: 'website',
  twitterCard: 'summary_large_image'
})
useHead(() => ({
  link: [{ rel: 'canonical', href: pageUrl.value }]
}))
</script>

<template>
  <div v-if="data" class="px-4 pb-24 pt-28 sm:px-6 sm:pt-32">
    <div class="mx-auto max-w-5xl">
      <NuxtLink to="/#gallery" class="inline-flex items-center gap-2 text-sm font-semibold text-white/70 transition-colors hover:text-white">
        <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"/></svg>
        Kembali ke Gallery
      </NuxtLink>

      <div class="gallery-panel mt-6 overflow-hidden rounded-[28px] p-6 sm:p-10">
        <h1 class="glow-title text-2xl font-bold text-white sm:text-3xl">{{ data.title }}</h1>
        <p class="mt-2 text-sm text-white/70">{{ allPhotos.length }} foto dalam album ini{{ allPhotos.length ? ' · klik foto untuk memperbesar' : '' }}.</p>

        <div v-if="allPhotos.length" class="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          <button
            v-for="(photo, i) in allPhotos"
            :key="i"
            type="button"
            class="group aspect-square overflow-hidden rounded-2xl border border-white/10 bg-white/5"
            @click="openPhoto(i)"
          >
            <img :src="photo" :alt="`${data.title} - foto ${i + 1}`" class="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105" loading="lazy" />
          </button>
        </div>

        <p v-else class="mt-8 text-sm text-white/60">Belum ada foto di album ini.</p>
      </div>
    </div>

    <!-- lightbox -->
    <Teleport to="body">
      <div v-if="activeIndex !== null" class="fixed inset-0 z-[90] flex flex-col items-center justify-center bg-black/90 p-4" @click.self="close">
        <button class="absolute right-4 top-4 rounded-full p-2 text-white/70 hover:bg-white/10 hover:text-white" aria-label="Tutup" @click="close">
          <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12"/></svg>
        </button>

        <div class="relative flex w-full max-w-3xl items-center justify-center">
          <button v-if="allPhotos.length > 1" class="absolute left-0 z-10 rounded-full bg-white/10 p-2 text-white hover:bg-white/20" aria-label="Sebelumnya" @click="prev">
            <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="m15 19-7-7 7-7"/></svg>
          </button>

          <img :src="allPhotos[activeIndex]" :alt="`${data.title} - foto ${activeIndex + 1}`" class="max-h-[75vh] w-full rounded-xl object-contain" />

          <button v-if="allPhotos.length > 1" class="absolute right-0 z-10 rounded-full bg-white/10 p-2 text-white hover:bg-white/20" aria-label="Berikutnya" @click="nextPhoto">
            <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="m9 5 7 7-7 7"/></svg>
          </button>
        </div>

        <div v-if="allPhotos.length > 1" class="mt-4 flex gap-1.5">
          <span v-for="(p, i) in allPhotos" :key="i" class="h-1.5 w-1.5 rounded-full transition-colors" :class="i === activeIndex ? 'bg-flame-500' : 'bg-white/30'"></span>
        </div>
      </div>
    </Teleport>
  </div>
</template>
