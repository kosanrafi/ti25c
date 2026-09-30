<script setup lang="ts">
interface Poster {
  id: number
  title: string
  description: string
  image: string
  glow_color: string
}

const props = defineProps<{ posters: Poster[] }>()

const stackEl = ref<HTMLElement | null>(null)
const active = ref(0)

/* tilt 3D mengikuti kursor (desktop saja, hormati reduce-motion) */
const tiltX = ref(0)
const tiltY = ref(0)
let tiltEnabled = false

function onTilt(e: MouseEvent) {
  if (!tiltEnabled || !stackEl.value) return
  const r = stackEl.value.getBoundingClientRect()
  const px = (e.clientX - r.left) / r.width - 0.5
  const py = (e.clientY - r.top) / r.height - 0.5
  tiltY.value = px * 14
  tiltX.value = py * -14
}
function resetTilt() {
  tiltX.value = 0
  tiltY.value = 0
}
let timer: ReturnType<typeof setInterval> | null = null

function posOf(i: number) {
  const n = props.posters.length
  if (!n) return 0
  return (i - active.value + n) % n
}

const HEX = /^#[0-9a-fA-F]{6}$/
function glowOf(p: Poster) {
  return HEX.test(p.glow_color) ? p.glow_color + '99' : 'rgba(239,75,54,.6)'
}
function bgOf(p: Poster) {
  if (p.image) return `linear-gradient(to top, rgba(0,0,0,.55), transparent 60%), url('${p.image}')`
  const c = HEX.test(p.glow_color) ? p.glow_color : '#EF4B36'
  return `linear-gradient(160deg, ${c} 0%, ${c}88 45%, #120806 100%)`
}

function next() {
  if (!props.posters.length) return
  active.value = (active.value + 1) % props.posters.length
}

function start() {
  stop()
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
  if (props.posters.length <= 1) return
  timer = setInterval(next, 3200)
}
function stop() {
  if (timer) clearInterval(timer)
  timer = null
}

onMounted(() => {
  start()
  tiltEnabled =
    window.matchMedia('(hover: hover) and (pointer: fine)').matches &&
    !window.matchMedia('(prefers-reduced-motion: reduce)').matches
})
onBeforeUnmount(() => stop())
</script>

<template>
  <section id="home" class="relative isolate z-10 overflow-x-clip">
    <div class="hero-glow pointer-events-none absolute inset-x-0 -top-28 -z-10 h-[700px]"></div>
    <div class="pointer-events-none absolute bottom-4 right-[20%] -z-10 hidden h-[360px] w-[540px] opacity-40 lg:block" aria-hidden="true">
      <div class="seats"></div>
    </div>

    <div class="mx-auto max-w-7xl px-4 pb-14 pt-12 sm:px-6 sm:pb-16 lg:pb-24 lg:pt-20">
      <div class="grid items-end gap-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)]">

        <div class="pb-2 lg:pb-24 lg:pl-8">
          <h1 class="anim-left text-[2rem] font-bold leading-[1.15] text-white sm:text-[2.5rem] lg:text-[2.75rem]">
            <span class="block font-semibold tracking-[0.14em]">Teknik Informatika</span>
            <span class="block tracking-tight"><span class="text-flame-500">25 C</span> Class UNPER</span>
          </h1>
          <p class="anim-left mt-4 max-w-[34rem] text-[15px] font-medium leading-relaxed text-white/85">
            Kebersamaan, semangat, dan kekompakan mahasiswa Teknik Informatika 25 C — Universitas Perjuangan Tasikmalaya.
          </p>
          <div class="anim-left mt-5 h-px max-w-[34rem] bg-gradient-to-r from-white/70 via-white/35 to-transparent"></div>

          <form role="search" class="search-pill anim-bottom mt-5 flex max-w-[34rem] items-center gap-3 rounded-full py-2 pl-6 pr-2" @submit.prevent>
            <label for="cari" class="sr-only">Cari mahasiswa</label>
            <input id="cari" type="search" placeholder="Cari mahasiswa..." class="min-w-0 flex-1 bg-transparent text-sm text-white outline-none placeholder:text-white/55" />
            <button type="submit" class="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-white/90 text-neutral-500 transition-colors hover:bg-white" aria-label="Cari">
              <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2.2">
                <path stroke-linecap="round" stroke-linejoin="round" d="m21 21-4.35-4.35M18 10.5a7.5 7.5 0 1 1-15 0 7.5 7.5 0 0 1 15 0Z" />
              </svg>
            </button>
          </form>

          <div class="anim-bottom mt-7 flex flex-wrap items-center gap-3">
            <span class="text-xs font-semibold text-white">Ikuti kami :</span>
            <a href="#" class="store-badge" aria-label="Ikuti di Instagram">
              <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="1.8"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="3.5"/><circle cx="17.2" cy="6.8" r="0.6" fill="currentColor" stroke="none"/></svg>
              <span><b>Instagram</b></span>
            </a>
            <a href="#" class="store-badge" aria-label="Ikuti di TikTok">
              <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M16.5 2h-3v13.2a2.8 2.8 0 1 1-2-2.68V9.4a5.8 5.8 0 1 0 5 5.75V8.1a6.9 6.9 0 0 0 4 1.28V6.4a3.9 3.9 0 0 1-4-4.4z"/></svg>
              <span><b>TikTok</b></span>
            </a>
          </div>
        </div>

        <div
          class="anim-right relative z-20 mb-4 flex justify-center lg:justify-end lg:pr-24"
          aria-hidden="true"
          @mouseenter="stop"
          @mouseleave="start(); resetTilt()"
          @mousemove="onTilt"
        >
          <div
            v-if="posters.length"
            ref="stackEl"
            class="stack"
            :style="{ transform: `perspective(900px) rotateX(${tiltX}deg) rotateY(${tiltY}deg)` }"
          >
            <div
              v-for="(p, i) in posters"
              :key="p.id"
              class="stack-card"
              :data-pos="posOf(i)"
              :style="{ '--glow': glowOf(p), backgroundImage: bgOf(p) }"
              @click="active = i"
            >
              <div class="flex h-full flex-col justify-between bg-gradient-to-t from-black/70 via-black/10 to-transparent p-5">
                <span class="text-[10px] font-semibold tracking-[0.2em] text-white/70">ANGKATAN 2025</span>
                <div>
                  <p class="text-[2rem] font-extrabold leading-[1.05] tracking-tight text-white line-clamp-3">{{ p.title }}</p>
                  <p v-if="p.description" class="mt-2 text-xs font-medium text-white/80 line-clamp-2">{{ p.description }}</p>
                </div>
              </div>
            </div>
          </div>

          <!-- placeholder saat belum ada data poster -->
          <div v-else class="stack" :style="{ transform: 'perspective(900px)' }">
            <div class="stack-card grid place-items-center" style="--glow:rgba(239,75,54,.5); background:linear-gradient(160deg,#EF4B36 0%,#8A2418 52%,#160908 100%)">
              <p class="px-5 text-center text-sm text-white/80">Belum ada poster.<br />Tambahkan lewat halaman Admin.</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  </section>
</template>
