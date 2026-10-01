<script setup lang="ts">
/**
 * Layar pembuka (intro loader) futuristik — tampil sekali per sesi browser saat halaman
 * pertama kali dibuka. Kunjungan berikutnya (pindah halaman / refresh dalam sesi yang sama)
 * langsung dilewati. Ubah DURATION untuk mengatur lama loading.
 */
const DURATION = 3200 // ms, animasi progress 0 → 100%
const EXIT_MS = 900 // ms, animasi keluar
const KEY = 'ti25c-intro-seen'

const visible = ref(true)
const leaving = ref(false)
const progress = ref(0)

const welcome = 'WELCOME'.split('')
const ticks = Array.from({ length: 60 }, (_, i) => i)
const CIRC = 2 * Math.PI * 64 // keliling ring progress (r = 64)

const status = computed(() => {
  const p = progress.value
  if (p < 28) return 'MENGINISIALISASI SISTEM'
  if (p < 58) return 'MEMUAT DATA MAHASISWA'
  if (p < 88) return 'MENYIAPKAN GALLERY & AGENDA'
  return p < 100 ? 'HAMPIR SIAP' : 'AKSES DIBERIKAN'
})
const pct = computed(() => String(progress.value).padStart(3, '0'))

useHead({
  // Dijalankan sebelum render: kalau sudah pernah tampil di sesi ini, sembunyikan loader tanpa kedip.
  script: [{
    innerHTML: `try{if(sessionStorage.getItem('${KEY}')==='1')document.documentElement.classList.add('intro-seen')}catch(e){}`,
    tagPriority: 'critical'
  }],
  // Tanpa JavaScript, loader tidak boleh menutupi halaman.
  noscript: [{ innerHTML: '<style>.intro-loader{display:none!important}</style>' }]
})

let raf = 0
let timer: ReturnType<typeof setTimeout> | undefined

function unlock() {
  document.documentElement.classList.remove('intro-lock')
}

function finish() {
  if (leaving.value) return
  cancelAnimationFrame(raf)
  progress.value = 100
  leaving.value = true
  try { sessionStorage.setItem(KEY, '1') } catch { /* mode privat: abaikan */ }
  timer = setTimeout(() => {
    visible.value = false
    unlock()
  }, EXIT_MS)
}

onMounted(() => {
  let seen = false
  try { seen = sessionStorage.getItem(KEY) === '1' } catch { /* abaikan */ }
  if (seen) {
    visible.value = false
    return
  }

  document.documentElement.classList.add('intro-lock')
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const dur = reduce ? 900 : DURATION
  const start = performance.now()
  const ease = (t: number) => (t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2)

  const tick = (now: number) => {
    const t = Math.min(1, (now - start) / dur)
    progress.value = Math.round(ease(t) * 100)
    if (t < 1) raf = requestAnimationFrame(tick)
    else finish()
  }
  raf = requestAnimationFrame(tick)
})

onBeforeUnmount(() => {
  cancelAnimationFrame(raf)
  if (timer) clearTimeout(timer)
  if (import.meta.client) unlock()
})
</script>

<template>
  <div
    v-if="visible"
    class="intro-loader"
    :class="{ 'is-leaving': leaving }"
    role="status"
    aria-live="polite"
    aria-label="Memuat halaman. Welcome ke Web Kelas TI 25 C"
  >
    <div class="intro-grid" aria-hidden="true"></div>
    <div class="intro-glow" aria-hidden="true"></div>
    <div class="intro-scan" aria-hidden="true"></div>

    <!-- sudut HUD -->
    <div class="hud hud-tl" aria-hidden="true"><span>TI25C // SYSTEM</span><span class="dim">BOOT SEQUENCE</span></div>
    <div class="hud hud-tr" aria-hidden="true"><span>UNPER</span><span class="dim">v1.0</span></div>
    <div class="hud hud-bl" aria-hidden="true"><span class="status">{{ status }}<i class="caret"></i></span></div>
    <div class="hud hud-br" aria-hidden="true"><span class="num">{{ pct }}<small>%</small></span></div>

    <div class="intro-center">
      <!-- Ring HUD -->
      <svg class="ring" viewBox="0 0 200 200" aria-hidden="true">
        <defs>
          <linearGradient id="introSweep" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stop-color="#EF4B36" stop-opacity="0" />
            <stop offset="1" stop-color="#FF9B7E" stop-opacity=".85" />
          </linearGradient>
        </defs>

        <g class="spin-slow">
          <circle cx="100" cy="100" r="94" fill="none" stroke="rgba(255,255,255,.28)" stroke-width="1" stroke-dasharray="2 7" />
        </g>
        <g class="spin-slow-rev">
          <circle cx="100" cy="100" r="82" fill="none" stroke="#EF4B36" stroke-opacity=".7" stroke-width="1.4" stroke-dasharray="70 18 12 18" />
        </g>
        <g>
          <line
            v-for="i in ticks" :key="i"
            x1="100" y1="2" x2="100" :y2="i % 5 === 0 ? 9 : 5"
            :transform="`rotate(${i * 6} 100 100)`"
            :stroke="i % 5 === 0 ? 'rgba(255,255,255,.7)' : 'rgba(255,255,255,.28)'"
            stroke-width="1"
          />
        </g>

        <!-- jalur + progress -->
        <circle cx="100" cy="100" r="64" fill="none" stroke="rgba(255,255,255,.10)" stroke-width="3" />
        <circle
          class="arc"
          cx="100" cy="100" r="64" fill="none"
          stroke="#EF4B36" stroke-width="3" stroke-linecap="round"
          :stroke-dasharray="CIRC"
          :stroke-dashoffset="CIRC * (1 - progress / 100)"
          transform="rotate(-90 100 100)"
        />

        <!-- radar sweep -->
        <g class="sweep">
          <path d="M100 100 L100 40 A60 60 0 0 1 152 70 Z" fill="url(#introSweep)" opacity=".35" />
        </g>

        <circle class="core" cx="100" cy="100" r="44" fill="rgba(239,75,54,.08)" stroke="#EF4B36" stroke-opacity=".8" stroke-width="1.2" />
        <text x="100" y="108" text-anchor="middle" class="mono-logo">TI25C</text>
      </svg>

      <!-- Teks sambutan -->
      <h1 class="welcome" data-text="WELCOME">
        <span
          v-for="(ch, i) in welcome" :key="i"
          class="ch" :style="{ animationDelay: `${0.45 + i * 0.075}s` }"
        >{{ ch }}</span>
      </h1>
      <p class="sub">ke <strong>Web Kelas</strong> TI 25 C</p>
      <p class="campus">Universitas Perjuangan Tasikmalaya</p>

      <div class="bar" aria-hidden="true"><i :style="{ width: progress + '%' }"></i></div>
    </div>

    <button type="button" class="skip" @click="finish">Lewati</button>
  </div>
</template>

<style>
/* global: kunci scroll selama loader tampil & sembunyikan bila sudah pernah dilihat */
html.intro-lock, html.intro-lock body { overflow: hidden; }
html.intro-seen .intro-loader { display: none !important; }
</style>

<style scoped>
.intro-loader {
  position: fixed; inset: 0; z-index: 300;
  display: grid; place-items: center;
  background: #050505; color: #fff; overflow: hidden;
  font-family: Inter, system-ui, sans-serif;
  clip-path: inset(0 0 0 0);
  transition: clip-path .9s cubic-bezier(.76, 0, .24, 1);
}
.intro-loader.is-leaving { clip-path: inset(0 0 100% 0); }
.intro-loader.is-leaving .intro-center,
.intro-loader.is-leaving .hud,
.intro-loader.is-leaving .skip { opacity: 0; transform: translateY(-14px); transition: opacity .35s ease, transform .5s ease; }

/* latar */
.intro-grid {
  position: absolute; inset: 0; opacity: .5;
  background-image:
    linear-gradient(rgba(239,75,54,.14) 1px, transparent 1px),
    linear-gradient(90deg, rgba(239,75,54,.14) 1px, transparent 1px);
  background-size: 44px 44px;
  -webkit-mask-image: radial-gradient(ellipse 60% 55% at 50% 50%, #000 15%, transparent 75%);
  mask-image: radial-gradient(ellipse 60% 55% at 50% 50%, #000 15%, transparent 75%);
  animation: gridMove 6s linear infinite;
}
.intro-glow {
  position: absolute; left: 50%; top: 42%; width: min(900px, 130vw); aspect-ratio: 1;
  transform: translate(-50%, -50%);
  background: radial-gradient(circle, rgba(196,42,26,.38), rgba(196,42,26,.10) 40%, transparent 68%);
  animation: glowPulse 3.4s ease-in-out infinite;
}
.intro-scan {
  position: absolute; left: 0; right: 0; height: 120px; top: -120px;
  background: linear-gradient(to bottom, transparent, rgba(255,155,126,.10), transparent);
  animation: scanDown 3.2s linear infinite;
}

/* HUD sudut */
.hud {
  position: absolute; display: flex; flex-direction: column; gap: 4px;
  font: 600 10px/1 ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
  letter-spacing: .18em; color: rgba(255,255,255,.85);
  padding: 14px; transition: opacity .3s ease;
  opacity: 0; animation: fadeIn .6s ease .2s forwards;
}
.hud .dim { color: rgba(255,255,255,.4); }
.hud::before, .hud::after { content: ""; position: absolute; width: 18px; height: 18px; border: 0 solid #EF4B36; }
.hud-tl { top: 18px; left: 18px; } .hud-tl::before { top: 0; left: 0; border-top-width: 2px; border-left-width: 2px; }
.hud-tr { top: 18px; right: 18px; text-align: right; align-items: flex-end; } .hud-tr::before { top: 0; right: 0; border-top-width: 2px; border-right-width: 2px; }
.hud-bl { bottom: 18px; left: 18px; } .hud-bl::before { bottom: 0; left: 0; border-bottom-width: 2px; border-left-width: 2px; }
.hud-br { bottom: 18px; right: 18px; align-items: flex-end; } .hud-br::before { bottom: 0; right: 0; border-bottom-width: 2px; border-right-width: 2px; }
.hud::after { display: none; }
.status { color: #FF9B7E; }
.caret { display: inline-block; width: 6px; height: 10px; margin-left: 5px; vertical-align: -1px; background: #FF9B7E; animation: blink .8s steps(1) infinite; }
.num { font-size: 22px; letter-spacing: .06em; color: #fff; text-shadow: 0 0 14px rgba(239,75,54,.8); }
.num small { font-size: 11px; margin-left: 2px; color: #FF9B7E; }

/* tengah */
.intro-center {
  position: relative; display: flex; flex-direction: column; align-items: center; text-align: center;
  padding: 0 20px; transition: opacity .3s ease;
}
.ring { width: clamp(170px, 32vh, 250px); height: auto; filter: drop-shadow(0 0 18px rgba(239,75,54,.45)); animation: ringIn .9s cubic-bezier(.22, 1, .36, 1) both; }
.spin-slow, .spin-slow-rev, .sweep { transform-origin: 100px 100px; }
.spin-slow { animation: spin 18s linear infinite; }
.spin-slow-rev { animation: spin 11s linear infinite reverse; }
.sweep { animation: spin 2.4s linear infinite; }
.arc { transition: stroke-dashoffset .12s linear; filter: drop-shadow(0 0 5px rgba(239,75,54,.9)); }
.core { animation: corePulse 1.8s ease-in-out infinite; transform-origin: 100px 100px; }
.mono-logo { font: 800 19px ui-monospace, SFMono-Regular, Menlo, Consolas, monospace; letter-spacing: .12em; fill: #fff; filter: drop-shadow(0 0 6px rgba(255,255,255,.6)); }

/* teks sambutan */
.welcome {
  position: relative; margin-top: clamp(14px, 3vh, 26px);
  font-size: clamp(2.1rem, 9vw, 4.2rem); font-weight: 800; letter-spacing: .22em; padding-left: .22em; line-height: 1;
  text-shadow: 0 0 22px rgba(255,255,255,.35), 0 0 46px rgba(239,75,54,.55);
}
.ch { display: inline-block; opacity: 0; transform: translateY(18px) scale(.9); filter: blur(10px); animation: letterIn .7s cubic-bezier(.22, 1, .36, 1) forwards; }
/* efek glitch berkala */
.welcome::before, .welcome::after {
  content: attr(data-text); position: absolute; inset: 0; padding-left: .22em; pointer-events: none; opacity: 0;
}
.welcome::before { color: #ff5a44; text-shadow: none; animation: glitchA 3s steps(1) 1.7s infinite; }
.welcome::after { color: #7fe8ff; text-shadow: none; animation: glitchB 3s steps(1) 1.7s infinite; }

.sub { margin-top: 12px; font-size: clamp(.95rem, 3.6vw, 1.25rem); color: rgba(255,255,255,.85); letter-spacing: .08em; opacity: 0; animation: fadeUp .7s ease 1.25s forwards; }
.sub strong { color: #FF9B7E; font-weight: 700; }
.campus { margin-top: 6px; font: 600 10px/1.4 ui-monospace, SFMono-Regular, Menlo, Consolas, monospace; letter-spacing: .3em; text-transform: uppercase; color: rgba(255,255,255,.4); opacity: 0; animation: fadeUp .7s ease 1.5s forwards; }

.bar { margin-top: clamp(20px, 4vh, 34px); width: min(320px, 72vw); height: 2px; background: rgba(255,255,255,.12); border-radius: 2px; overflow: hidden; opacity: 0; animation: fadeIn .5s ease .4s forwards; }
.bar i { display: block; height: 100%; background: linear-gradient(90deg, #AD2C20, #EF4B36, #FF9B7E); box-shadow: 0 0 12px rgba(239,75,54,.9); transition: width .12s linear; }

.skip {
  position: absolute; bottom: 20px; left: 50%; transform: translateX(-50%);
  font: 600 10px/1 ui-monospace, SFMono-Regular, Menlo, Consolas, monospace; letter-spacing: .25em; text-transform: uppercase;
  color: rgba(255,255,255,.55); border: 1px solid rgba(255,255,255,.18); border-radius: 999px; padding: 8px 14px;
  background: transparent; cursor: pointer; opacity: 0; animation: fadeIn .5s ease 1s forwards; transition: color .2s, border-color .2s, opacity .3s, transform .5s;
}
.skip:hover { color: #fff; border-color: #EF4B36; }

@media (max-width: 520px) {
  .hud { font-size: 9px; padding: 10px; }
  .hud-tl, .hud-tr { top: 10px; } .hud-bl, .hud-br { bottom: 10px; } .hud-tl, .hud-bl { left: 10px; } .hud-tr, .hud-br { right: 10px; }
  .num { font-size: 18px; }
  .skip { bottom: 58px; }
}

@keyframes spin { to { transform: rotate(360deg); } }
@keyframes blink { 50% { opacity: 0; } }
@keyframes fadeIn { to { opacity: 1; } }
@keyframes fadeUp { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: none; } }
@keyframes letterIn { to { opacity: 1; transform: none; filter: blur(0); } }
@keyframes ringIn { from { opacity: 0; transform: scale(.7) rotate(-40deg); } to { opacity: 1; transform: none; } }
@keyframes corePulse { 50% { fill: rgba(239,75,54,.2); transform: scale(1.04); } }
@keyframes glowPulse { 50% { opacity: .6; transform: translate(-50%, -50%) scale(1.08); } }
@keyframes gridMove { to { background-position: 0 44px, 44px 0; } }
@keyframes scanDown { to { transform: translateY(calc(100vh + 240px)); } }
@keyframes glitchA {
  0%, 100% { opacity: 0; }
  4% { opacity: .85; transform: translate(-3px, 1px); clip-path: inset(10% 0 55% 0); }
  8% { opacity: .85; transform: translate(3px, -1px); clip-path: inset(60% 0 8% 0); }
  12% { opacity: 0; }
}
@keyframes glitchB {
  0%, 100% { opacity: 0; }
  5% { opacity: .85; transform: translate(3px, -1px); clip-path: inset(50% 0 20% 0); }
  9% { opacity: .85; transform: translate(-3px, 1px); clip-path: inset(5% 0 70% 0); }
  13% { opacity: 0; }
}

@media (prefers-reduced-motion: reduce) {
  .intro-grid, .intro-glow, .intro-scan, .spin-slow, .spin-slow-rev, .sweep, .core, .caret,
  .welcome::before, .welcome::after { animation: none; }
  .ring, .ch, .sub, .campus, .bar, .hud, .skip { animation: none; opacity: 1; transform: none; filter: none; }
  .intro-scan { display: none; }
}
</style>
