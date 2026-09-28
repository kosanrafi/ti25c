<script setup lang="ts">
interface Info {
  id: number
  tag: string
  title: string
  description: string
  link_url: string
  image: string
  theme: string
}

const props = defineProps<{ items: Info[] }>()

const n = computed(() => props.items.length)
const active = ref(Math.floor(props.items.length / 2))

// kelas Tailwind ditulis lengkap agar terbaca oleh JIT
const themes: Record<string, { media: string; tag: string }> = {
  sky:     { media: 'bg-gradient-to-br from-sky-800 to-ink-800',     tag: 'text-sky-300' },
  light:   { media: 'bg-mist-300 text-ink-900',                      tag: 'text-flame-600' },
  indigo:  { media: 'bg-gradient-to-br from-indigo-800 to-ink-800',  tag: 'text-indigo-300' },
  flame:   { media: 'bg-gradient-to-br from-flame-800 to-ink-800',   tag: 'text-flame-300' },
  emerald: { media: 'bg-gradient-to-br from-emerald-800 to-ink-800', tag: 'text-emerald-300' }
}
const themeOf = (it: Info) => themes[it.theme] || themes.sky
const isLight = (it: Info) => it.theme === 'light' && !it.image

function offset(i: number) {
  let o = i - active.value
  const total = n.value
  if (o > total / 2) o -= total
  if (o < -total / 2) o += total
  return o
}

function go(d: number) {
  if (n.value < 2) return
  active.value = (active.value + d + n.value) % n.value
}

function onCard(e: Event, i: number) {
  if (offset(i) !== 0) {
    e.preventDefault()
    active.value = i
  }
}

// kata terakhir judul (tema "light") diberi warna aksen
function headOf(title: string) {
  const t = title.trim()
  const idx = t.lastIndexOf(' ')
  return idx === -1 ? '' : t.slice(0, idx)
}
function lastOf(title: string) {
  const t = title.trim()
  const idx = t.lastIndexOf(' ')
  return idx === -1 ? t : t.slice(idx + 1)
}

function mediaStyle(it: Info) {
  return it.image
    ? { backgroundImage: `linear-gradient(to top, rgba(0,0,0,.7), rgba(0,0,0,.15)), url('${it.image}')` }
    : {}
}

// swipe di HP
let startX: number | null = null
function onDown(e: PointerEvent) { startX = e.clientX }
function onUp(e: PointerEvent) {
  if (startX === null) return
  const dx = e.clientX - startX
  startX = null
  if (Math.abs(dx) > 50) go(dx < 0 ? 1 : -1)
}
</script>

<template>
  <section id="info" class="pt-24">
    <div class="mx-auto max-w-7xl px-4 sm:px-6">
      <div class="flex items-center justify-between gap-4">
        <button class="round-btn" :aria-disabled="n < 2" aria-label="Sebelumnya" @click="go(-1)">
          <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2.2"><path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"/></svg>
        </button>
        <div class="text-center">
          <h2 class="glow-title text-[1.75rem] font-bold text-white sm:text-[2rem]">Info &amp; Agenda Kelas</h2>
          <p class="mt-2 text-sm font-medium text-white/85">Update terbaru seputar kegiatan dan agenda TI 25 C.</p>
        </div>
        <button class="round-btn" :aria-disabled="n < 2" aria-label="Berikutnya" @click="go(1)">
          <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2.2"><path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"/></svg>
        </button>
      </div>
    </div>

    <div v-if="n" class="flow mt-8" @pointerdown="onDown" @pointerup="onUp" @pointercancel="startX = null">
      <article
        v-for="(it, i) in items"
        :key="it.id"
        class="deal"
        :class="{ 'is-active': offset(i) === 0 }"
        :style="{ '--o': offset(i), '--a': Math.abs(offset(i)), zIndex: 10 - Math.abs(offset(i)) }"
        @click="onCard($event, i)"
      >
        <div class="deal-card">
          <div class="deal-media" :class="themeOf(it).media" :style="mediaStyle(it)">
            <template v-if="isLight(it)">
              <div class="border-l-4 border-flame-600 pl-4">
                <span class="whitespace-pre-line text-[1.75rem] font-extrabold leading-tight sm:text-3xl">{{ headOf(it.title) }} <span class="text-flame-600">{{ lastOf(it.title) }}</span></span>
              </div>
            </template>
            <template v-else>
              <span v-if="it.tag" class="text-xs font-semibold tracking-wide" :class="it.image ? 'text-white/80' : themeOf(it).tag">{{ it.tag }}</span>
              <p class="whitespace-pre-line text-[1.75rem] font-extrabold leading-tight text-white">{{ it.title }}</p>
            </template>
          </div>
          <div class="px-3 pt-4">
            <p v-if="it.description" class="text-[15px] font-bold leading-snug text-white">{{ it.description }}</p>
            <a
              v-if="it.link_url"
              :href="it.link_url"
              :tabindex="offset(i) === 0 ? 0 : -1"
              class="mt-1 inline-block text-xs font-medium text-white/75 underline underline-offset-2 hover:text-white"
            >Selengkapnya</a>
          </div>
        </div>
      </article>
    </div>

    <p v-else class="mt-8 px-4 text-center text-sm text-white/70">Belum ada info kelas. Tambahkan lewat halaman Admin.</p>
  </section>
</template>
