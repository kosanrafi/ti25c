<script setup lang="ts">
interface GalleryItem {
  id: number
  title: string
  cover_image: string
  photos: string[]
}

defineProps<{ gallery: GalleryItem[] }>()

useScrollReveal('#gallery .gallery-panel')

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

onMounted(() => {
  updateArrows()
  window.addEventListener('resize', updateArrows)
})
onBeforeUnmount(() => window.removeEventListener('resize', updateArrows))
</script>

<template>
  <section id="gallery" class="px-4 pt-20 sm:px-6">
    <div class="mx-auto max-w-7xl">
      <div class="gallery-panel overflow-hidden rounded-[28px] py-8 pl-6 sm:py-12 sm:pl-12">

        <div class="flex items-start justify-between gap-4 pr-6 sm:pr-12">
          <div class="flex flex-wrap items-baseline gap-x-4 gap-y-1">
            <h2 class="glow-title text-[1.75rem] font-bold text-white sm:text-[2rem]">Gallery Moment</h2>
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
            <NuxtLink
              :to="`/gallery/${item.id}`"
              class="gal-poster block aspect-[2/3] bg-gradient-to-br via-ink-800 to-ink-900"
              :class="gradients[i % gradients.length]"
              :style="item.cover_image ? { backgroundImage: `linear-gradient(to top, rgba(0,0,0,.65), transparent 55%), url('${item.cover_image}')` } : {}"
            >
              <span class="text-sm font-semibold leading-tight text-white">{{ item.title }}</span>
            </NuxtLink>
            <div class="mt-3 flex items-center gap-2">
              <NuxtLink :to="`/gallery/${item.id}`" class="btn-black">
                <svg class="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="1.8"><path stroke-linecap="round" stroke-linejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.41a2.25 2.25 0 0 1 3.182 0l2.909 2.91m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"/></svg>
                Lihat Detail
              </NuxtLink>
              <span class="dots-btn" aria-hidden="true"><svg class="h-4 w-4" viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="5" r="1.7"/><circle cx="12" cy="12" r="1.7"/><circle cx="12" cy="19" r="1.7"/></svg></span>
            </div>
          </article>
        </div>

        <p v-else class="mt-8 pr-6 text-sm text-white/70 sm:pr-12">Belum ada album gallery. Tambahkan lewat halaman Admin.</p>
      </div>
    </div>
  </section>
</template>
