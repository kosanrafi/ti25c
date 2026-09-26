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

const trackEl = ref<HTMLElement | null>(null)

// render dua kali supaya carousel bisa loop mulus tanpa lompatan
const loopedList = computed(() => {
  if (props.mahasiswa.length <= 1) return props.mahasiswa.map(m => ({ ...m, _dup: false }))
  return [
    ...props.mahasiswa.map(m => ({ ...m, _dup: false })),
    ...props.mahasiswa.map(m => ({ ...m, _dup: true }))
  ]
})

let running = true
let rafId: number | null = null
let resumeTimer: ReturnType<typeof setTimeout> | null = null
const reduceMotion = ref(false)
const SPEED = 0.55 // px per frame

function frame() {
  const track = trackEl.value
  if (track && running && props.mahasiswa.length > 1) {
    const half = track.scrollWidth / 2
    track.scrollLeft += SPEED
    if (track.scrollLeft >= half) track.scrollLeft -= half
  }
  rafId = requestAnimationFrame(frame)
}

function pause() {
  running = false
  if (resumeTimer) clearTimeout(resumeTimer)
}
function resumeSoon() {
  if (resumeTimer) clearTimeout(resumeTimer)
  resumeTimer = setTimeout(() => { running = !reduceMotion.value }, 1200)
}

function scroll(dir: number) {
  pause()
  trackEl.value?.scrollBy({ left: dir * (trackEl.value.clientWidth * 0.8), behavior: 'smooth' })
  resumeSoon()
}

onMounted(() => {
  reduceMotion.value = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  running = !reduceMotion.value
  rafId = requestAnimationFrame(frame)

  document.addEventListener('visibilitychange', onVisibility)
})
onBeforeUnmount(() => {
  if (rafId) cancelAnimationFrame(rafId)
  if (resumeTimer) clearTimeout(resumeTimer)
  document.removeEventListener('visibilitychange', onVisibility)
})
function onVisibility() {
  running = document.hidden ? false : !reduceMotion.value
}
</script>

<template>
  <section id="mahasiswa" class="relative px-4 pt-20 sm:px-6">
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
