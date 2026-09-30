<script setup lang="ts">
interface Mahasiswa {
  id: number
  name: string
  role: string
  description: string
  hobi: string
  skills: string
  sertifikat: string
  photo: string
}

const props = defineProps<{ mahasiswa: Mahasiswa[] }>()

useScrollReveal('#mahasiswa .screen-panel')

const sectionEl = ref<HTMLElement | null>(null)
const trackEl = ref<HTMLElement | null>(null)

// render dua kali supaya carousel bisa loop mulus tanpa lompatan
const loopedList = computed(() => {
  if (props.mahasiswa.length <= 1) return props.mahasiswa.map(m => ({ ...m, _dup: false }))
  return [
    ...props.mahasiswa.map(m => ({ ...m, _dup: false })),
    ...props.mahasiswa.map(m => ({ ...m, _dup: true }))
  ]
})

/**
 * Auto-geser RINGAN: sekali lompat tiap beberapa detik (native smooth-scroll,
 * digerakkan compositor browser), BUKAN scrollLeft yang ditulis tiap frame.
 * Ditambah: hanya aktif kalau section ini benar-benar terlihat di layar
 * (IntersectionObserver) dan berhenti saat disentuh/hover/tab tidak aktif.
 */
const AUTO_INTERVAL = 3000
let autoTimer: ReturnType<typeof setInterval> | null = null
let resumeTimer: ReturnType<typeof setTimeout> | null = null
let io: IntersectionObserver | null = null
let paused = false
let isVisible = false
let reduceMotion = false

function stepWidth() {
  const track = trackEl.value
  if (!track) return 0
  const cards = track.querySelectorAll<HTMLElement>(':scope > .student-w')
  if (cards.length >= 2) return cards[1].offsetLeft - cards[0].offsetLeft
  return track.clientWidth * 0.85
}

function advance() {
  const track = trackEl.value
  if (!track || paused || !isVisible || reduceMotion || props.mahasiswa.length <= 1) return
  const half = track.scrollWidth / 2
  const step = stepWidth()
  if (step <= 0) return
  if (track.scrollLeft + step >= half - 4) {
    track.scrollLeft = track.scrollLeft - half // lompat instan ke posisi identik di set pertama (tak terlihat)
  }
  track.scrollBy({ left: step, behavior: 'smooth' })
}

function startAuto() {
  stopAuto()
  if (reduceMotion || props.mahasiswa.length <= 1) return
  autoTimer = setInterval(advance, AUTO_INTERVAL)
}
function stopAuto() {
  if (autoTimer) clearInterval(autoTimer)
  autoTimer = null
}

function pause() {
  paused = true
  if (resumeTimer) clearTimeout(resumeTimer)
}
function resumeSoon() {
  if (resumeTimer) clearTimeout(resumeTimer)
  resumeTimer = setTimeout(() => { paused = false }, 1500)
}

function scroll(dir: number) {
  pause()
  trackEl.value?.scrollBy({ left: dir * (trackEl.value.clientWidth * 0.8), behavior: 'smooth' })
  resumeSoon()
}

function onVisibility() {
  if (document.hidden) stopAuto()
  else startAuto()
}

onMounted(() => {
  reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

  if ('IntersectionObserver' in window && sectionEl.value) {
    io = new IntersectionObserver(
      entries => {
        isVisible = entries[0]?.isIntersecting ?? false
        if (isVisible) startAuto()
        else stopAuto()
      },
      { threshold: 0.15 }
    )
    io.observe(sectionEl.value)
  } else {
    // fallback: browser lama tanpa IntersectionObserver, tetap jalan tanpa cek visibilitas
    isVisible = true
    startAuto()
  }

  document.addEventListener('visibilitychange', onVisibility)
})
onBeforeUnmount(() => {
  stopAuto()
  if (resumeTimer) clearTimeout(resumeTimer)
  if (io) io.disconnect()
  document.removeEventListener('visibilitychange', onVisibility)
})
</script>

<template>
  <section id="mahasiswa" ref="sectionEl" class="relative px-4 pt-20 sm:px-6">
    <div class="mx-auto max-w-7xl">
      <div class="screen-panel">

        <div class="notch">
          <h2 class="glow-title text-xl font-bold text-white sm:text-[1.65rem]">Mahasiswa</h2>
        </div>

        <button class="side-arrow left-3 hidden sm:block lg:left-6" aria-label="Geser kiri" @click="scroll(-1)">
          <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="m18.75 4.5-7.5 7.5 7.5 7.5m-6-15L5.25 12l7.5 7.5"/></svg>
        </button>
        <button class="side-arrow right-3 hidden sm:block lg:right-6" aria-label="Geser kanan" @click="scroll(1)">
          <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="m5.25 4.5 7.5 7.5-7.5 7.5m6-15 7.5 7.5-7.5 7.5"/></svg>
        </button>

        <div
          v-if="mahasiswa.length"
          id="mahasiswaTrack"
          ref="trackEl"
          class="no-scrollbar flex gap-7 overflow-x-auto scroll-pl-6 px-6 pb-9 pt-16 sm:scroll-pl-14 sm:px-14 lg:scroll-pl-24 lg:gap-12 lg:px-24"
          @pointerenter="pause"
          @pointerleave="resumeSoon"
          @pointerdown="pause"
          @touchstart.passive="pause"
        >
          <MahasiswaCard
            v-for="(m, i) in loopedList"
            :key="`${m.id}-${i}`"
            :data="m"
            :aria-hidden="m._dup ? 'true' : undefined"
          />
        </div>

        <p v-else class="px-6 pb-10 pt-16 text-sm text-white/70 sm:px-14 lg:px-24">
          Belum ada data mahasiswa. Tambahkan lewat halaman Admin.
        </p>

      </div>
    </div>
  </section>
</template>
