<script setup lang="ts">
interface GalleryItem {
  id: number
  title: string
  cover_image: string
  photos: string[]
}

const props = defineProps<{ gallery: GalleryItem[] }>()

const activeItem = ref<GalleryItem | null>(null)
const activeIndex = ref(0)

const activePhotos = computed(() => {
  if (!activeItem.value) return []
  const photos = activeItem.value.photos || []
  return photos.length ? photos : (activeItem.value.cover_image ? [activeItem.value.cover_image] : [])
})

function openItem(item: GalleryItem) {
  activeItem.value = item
  activeIndex.value = 0
}
function close() {
  activeItem.value = null
}
function prev() {
  if (!activePhotos.value.length) return
  activeIndex.value = (activeIndex.value - 1 + activePhotos.value.length) % activePhotos.value.length
}
function nextPhoto() {
  if (!activePhotos.value.length) return
  activeIndex.value = (activeIndex.value + 1) % activePhotos.value.length
}

function onKeydown(e: KeyboardEvent) {
  if (!activeItem.value) return
  if (e.key === 'Escape') close()
  if (e.key === 'ArrowLeft') prev()
  if (e.key === 'ArrowRight') nextPhoto()
}
onMounted(() => window.addEventListener('keydown', onKeydown))
onBeforeUnmount(() => window.removeEventListener('keydown', onKeydown))
</script>

<template>
  <section id="gallery" class="px-4 pt-20 sm:px-6">
    <div class="mx-auto max-w-7xl">
      <div class="gallery-panel overflow-hidden rounded-[28px] p-6 sm:p-10">
        <h2 class="glow-title text-xl font-bold text-white sm:text-[1.65rem]">Gallery Moment</h2>
        <p class="mt-2 max-w-xl text-sm text-white/75">Dokumentasi momen dan kegiatan TI 25 C. Setiap album bisa berisi hingga 7 foto (foto bisa berupa GIF).</p>

        <div v-if="gallery.length" class="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          <button
            v-for="item in gallery"
            :key="item.id"
            type="button"
            class="gal-poster group relative aspect-[3/4] w-full overflow-hidden text-left"
            :style="{ backgroundImage: item.cover_image ? `url('${item.cover_image}')` : 'linear-gradient(160deg,#4b4b4b,#141414)' }"
            @click="openItem(item)"
          >
            <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent transition-opacity group-hover:opacity-90"></div>
            <span class="relative z-10 text-sm font-semibold text-white">{{ item.title }}</span>
          </button>
        </div>

        <p v-else class="mt-8 text-sm text-white/70">Belum ada album gallery. Tambahkan lewat halaman Admin.</p>
      </div>
    </div>

    <!-- lightbox -->
    <Teleport to="body">
      <div v-if="activeItem" class="fixed inset-0 z-[90] flex flex-col items-center justify-center bg-black/90 p-4" @click.self="close">
        <button class="absolute right-4 top-4 rounded-full p-2 text-white/70 hover:bg-white/10 hover:text-white" aria-label="Tutup" @click="close">
          <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12"/></svg>
        </button>

        <p class="mb-3 text-sm font-semibold text-white">{{ activeItem.title }}</p>

        <div class="relative flex w-full max-w-3xl items-center justify-center">
          <button
            v-if="activePhotos.length > 1"
            class="absolute left-0 z-10 rounded-full bg-white/10 p-2 text-white hover:bg-white/20"
            aria-label="Sebelumnya"
            @click="prev"
          >
            <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="m15 19-7-7 7-7"/></svg>
          </button>

          <img
            v-if="activePhotos[activeIndex]"
            :src="activePhotos[activeIndex]"
            :alt="`${activeItem.title} - foto ${activeIndex + 1}`"
            class="max-h-[70vh] w-full rounded-xl object-contain"
          />

          <button
            v-if="activePhotos.length > 1"
            class="absolute right-0 z-10 rounded-full bg-white/10 p-2 text-white hover:bg-white/20"
            aria-label="Berikutnya"
            @click="nextPhoto"
          >
            <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="m9 5 7 7-7 7"/></svg>
          </button>
        </div>

        <div v-if="activePhotos.length > 1" class="mt-4 flex gap-1.5">
          <span
            v-for="(p, i) in activePhotos"
            :key="i"
            class="h-1.5 w-1.5 rounded-full transition-colors"
            :class="i === activeIndex ? 'bg-flame-500' : 'bg-white/30'"
          ></span>
        </div>
      </div>
    </Teleport>
  </section>
</template>
