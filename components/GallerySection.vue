<script setup lang="ts">
interface GalleryItem {
  id: number
  title: string
  cover_image: string
  photos: string[]
}

const props = defineProps<{ gallery: GalleryItem[] }>()

// kelas Tailwind ditulis lengkap agar terbaca oleh JIT
const gradients = [
  'from-slate-600', 'from-rose-800', 'from-violet-700', 'from-cyan-800', 'from-emerald-800'
]

/* ---------- track horizontal + panah ---------- */
const trackEl = ref<HTMLElement | null>(null)
const atStart = ref(true)
const atEnd = ref(false)

function updateArrows() {
  const t = trackEl.value
  if (!t) return
  atStart.value = t.scrollLeft <= 4
  atEnd.value = t.scrollLeft + t.clientWidth >= t.scrollWidth - 4
}
function scrollTrack(dir: number) {
  const t = trackEl.value
  if (t) t.scrollBy({ left: dir * t.clientWidth * 0.8, behavior: 'smooth' })
}

/* ---------- lightbox ---------- */
const activeItem = ref<GalleryItem | null>(null)
const activeIndex = ref(0)

const activePhotos = computed(() => {
  if (!activeItem.value) return []
  const photos = activeItem.value.photos || []
  if (photos.length) return photos
  return activeItem.value.cover_image ? [activeItem.value.cover_image] : []
})

function openItem(item: GalleryItem) { activeItem.value = item; activeIndex.value = 0 }
function close() { activeItem.value = null }
function prev() {
  if (activePhotos.value.length) activeIndex.value = (activeIndex.value - 1 + activePhotos.value.length) % activePhotos.value.length
}
function nextPhoto() {
  if (activePhotos.value.length) activeIndex.value = (activeIndex.value + 1) % activePhotos.value.length
}
function onKeydown(e: KeyboardEvent) {
  if (!activeItem.value) return
  if (e.key === 'Escape') close()
  if (e.key === 'ArrowLeft') prev()
  if (e.key === 'ArrowRight') nextPhoto()
}

onMounted(() => {
  updateArrows()
  window.addEventListener('resize', updateArrows)
  window.addEventListener('keydown', onKeydown)
})
onBeforeUnmount(() => {
  window.removeEventListener('resize', updateArrows)
  window.removeEventListener('keydown', onKeydown)
})
</script>

<template>
  <section id="gallery" class="px-4 pt-20 sm:px-6">
    <div class="mx-auto max-w-7xl">
      <div class="gallery-panel overflow-hidden rounded-[28px] py-8 pl-6 sm:py-12 sm:pl-12">

        <div class="flex items-start justify-between gap-4 pr-6 sm:pr-12">
          <div class="flex flex-wrap items-baseline gap-x-4 gap-y-1">
            <h2 class="glow-title text-[1.75rem] font-bold text-white sm:text-[2rem]">Gallery Moment</h2>
            <a href="#" class="text-[13px] font-semibold text-white underline decoration-white/60 underline-offset-4 hover:decoration-white">Lihat Semua →</a>
          </div>
          <div class="hidden gap-3 sm:flex">
            <button class="round-btn" :aria-disabled="atStart" aria-label="Geser kiri" @click="scrollTrack(-1)">
              <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2.2"><path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"/></svg>
            </button>
            <button class="round-btn" :aria-disabled="atEnd" aria-label="Geser kanan" @click="scrollTrack(1)">
              <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2.2"><path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"/></svg>
            </button>
          </div>
        </div>

        <div
          v-if="gallery.length"
          ref="trackEl"
          class="no-scrollbar mt-8 flex gap-8 overflow-x-auto pb-2 pr-6 sm:pr-12"
          @scroll.passive="updateArrows"
        >
          <article v-for="(item, i) in gallery" :key="item.id" class="w-40 shrink-0 sm:w-52 lg:w-60">
            <div
              class="gal-poster aspect-[2/3] bg-gradient-to-br via-ink-800 to-ink-900"
              :class="gradients[i % gradients.length]"
              :style="item.cover_image ? { backgroundImage: `linear-gradient(to top, rgba(0,0,0,.65), transparent 55%), url('${item.cover_image}')` } : {}"
            >
              <span class="text-sm font-semibold leading-tight text-white">{{ item.title }}</span>
            </div>
            <div class="mt-3 flex items-center gap-2">
              <button type="button" class="btn-black" @click="openItem(item)">
                <svg class="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="1.8"><path stroke-linecap="round" stroke-linejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.41a2.25 2.25 0 0 1 3.182 0l2.909 2.91m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"/></svg>
                Lihat Detail
              </button>
              <span class="dots-btn" aria-hidden="true"><svg class="h-4 w-4" viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="5" r="1.7"/><circle cx="12" cy="12" r="1.7"/><circle cx="12" cy="19" r="1.7"/></svg></span>
            </div>
          </article>
        </div>

        <p v-else class="mt-8 pr-6 text-sm text-white/70 sm:pr-12">Belum ada album gallery. Tambahkan lewat halaman Admin.</p>
      </div>
    </div>

    <!-- lightbox -->
    <Teleport to="body">
      <div v-if="activeItem" class="fixed inset-0 z-[90] flex flex-col items-center justify-center bg-black/90 p-4" @click.self="close">
        <button class="absolute right-4 top-4 rounded-full p-2 text-white/70 hover:bg-white/10 hover:text-white" aria-label="Tutup" @click="close">
          <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12"/></svg>
        </button>

        <p class="mb-3 text-sm font-semibold text-white">{{ activeItem.title }}</p>

        <div v-if="activePhotos.length" class="relative flex w-full max-w-3xl items-center justify-center">
          <button v-if="activePhotos.length > 1" class="absolute left-0 z-10 rounded-full bg-white/10 p-2 text-white hover:bg-white/20" aria-label="Sebelumnya" @click="prev">
            <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="m15 19-7-7 7-7"/></svg>
          </button>

          <img :src="activePhotos[activeIndex]" :alt="`${activeItem.title} - foto ${activeIndex + 1}`" class="max-h-[70vh] w-full rounded-xl object-contain" />

          <button v-if="activePhotos.length > 1" class="absolute right-0 z-10 rounded-full bg-white/10 p-2 text-white hover:bg-white/20" aria-label="Berikutnya" @click="nextPhoto">
            <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="m9 5 7 7-7 7"/></svg>
          </button>
        </div>
        <p v-else class="text-sm text-white/60">Belum ada foto di album ini.</p>

        <div v-if="activePhotos.length > 1" class="mt-4 flex gap-1.5">
          <span v-for="(p, i) in activePhotos" :key="i" class="h-1.5 w-1.5 rounded-full transition-colors" :class="i === activeIndex ? 'bg-flame-500' : 'bg-white/30'"></span>
        </div>
      </div>
    </Teleport>
  </section>
</template>
