<script setup lang="ts">
const props = defineProps<{ mahasiswa: number; gallery: number; agenda: number }>()

const stats = computed(() => [
  { label: 'Mahasiswa', value: props.mahasiswa },
  { label: 'Album Gallery', value: props.gallery },
  { label: 'Info & Agenda', value: props.agenda }
])

const numRefs = ref<HTMLElement[]>([])

// count-up ringan pakai requestAnimationFrame biasa (tanpa library),
// hanya berjalan singkat (~1.2 detik) sekali saat elemen pertama terlihat.
function animateCount(el: HTMLElement, target: number, duration = 1200) {
  if (target <= 0) { el.textContent = '0'; return }
  const start = performance.now()
  function tick(now: number) {
    const p = Math.min(1, (now - start) / duration)
    const eased = 1 - Math.pow(1 - p, 3)
    el.textContent = String(Math.round(eased * target))
    if (p < 1) requestAnimationFrame(tick)
  }
  requestAnimationFrame(tick)
}

onMounted(() => {
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (reduce) {
    numRefs.value.forEach((el, i) => { if (el) el.textContent = String(stats.value[i]?.value ?? 0) })
    return
  }

  if (!('IntersectionObserver' in window)) {
    numRefs.value.forEach((el, i) => { if (el) animateCount(el, stats.value[i]?.value ?? 0) })
    return
  }

  const io = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return
      const el = entry.target as HTMLElement
      const idx = numRefs.value.indexOf(el)
      animateCount(el, stats.value[idx]?.value ?? 0)
      obs.unobserve(el)
    })
  }, { threshold: 0.4 })

  numRefs.value.forEach(el => el && io.observe(el))
})
</script>

<template>
  <section class="relative overflow-hidden border-y border-white/10 bg-white/[0.02]">
    <div class="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
      <div class="flex flex-wrap items-center gap-x-7 gap-y-2">
        <div v-for="s in stats" :key="s.label" class="flex items-baseline gap-1.5">
          <span ref="numRefs" class="text-xl font-extrabold text-white sm:text-2xl">0</span>
          <span class="text-[11px] font-semibold uppercase tracking-wide text-white/45">{{ s.label }}</span>
        </div>
      </div>

      <div class="ticker-mask relative hidden w-full overflow-hidden sm:block sm:max-w-[22rem]">
        <div class="ticker flex w-max gap-8 whitespace-nowrap text-[11px] font-semibold tracking-[0.28em] text-white/40">
          <span v-for="n in 2" :key="n" class="flex items-center gap-8">
            <span>TEKNIK INFORMATIKA 25 C</span>
            <span class="text-flame-500">✦</span>
            <span>SOLID &amp; KOMPAK</span>
            <span class="text-flame-500">✦</span>
            <span>ANGKATAN 2025</span>
            <span class="text-flame-500">✦</span>
          </span>
        </div>
      </div>
    </div>
  </section>
</template>
