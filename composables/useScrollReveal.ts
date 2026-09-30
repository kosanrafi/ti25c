/**
 * Animasi "reveal" saat elemen masuk viewport (fade + geser naik).
 * Sengaja dibuat tanpa library eksternal (murni IntersectionObserver + CSS
 * transition bawaan browser) supaya ringan dan tidak membebani HP:
 * tidak ada listener scroll manual, tidak ada kerja tiap frame — browser
 * yang menangani deteksi visibilitas secara native & efisien.
 */
export function useScrollReveal(
  target: string,
  opts: { y?: number; delay?: number; stagger?: number } = {}
) {
  onMounted(async () => {
    if (typeof window === 'undefined') return

    await nextTick()
    const els = Array.from(document.querySelectorAll<HTMLElement>(target))
    if (!els.length) return

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) {
      els.forEach(el => { el.style.opacity = '1' })
      return
    }

    const y = opts.y ?? 28
    const baseDelay = opts.delay ?? 0
    const stagger = opts.stagger ?? 0

    els.forEach(el => {
      el.style.opacity = '0'
      el.style.transform = `translateY(${y}px)`
      el.style.transition = 'opacity .7s ease, transform .7s cubic-bezier(.22,1,.36,1)'
    })

    if (!('IntersectionObserver' in window)) {
      els.forEach(el => { el.style.opacity = '1'; el.style.transform = 'none' })
      return
    }

    const io = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach(entry => {
          if (!entry.isIntersecting) return
          const el = entry.target as HTMLElement
          const idx = els.indexOf(el)
          el.style.transitionDelay = `${baseDelay + idx * stagger}s`
          // requestAnimationFrame supaya browser sempat "commit" state awal (opacity:0)
          // sebelum transisi ke state akhir dipicu — tanpa ini transisi bisa tidak jalan.
          requestAnimationFrame(() => {
            el.style.opacity = '1'
            el.style.transform = 'translateY(0)'
          })
          obs.unobserve(el)
        })
      },
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' }
    )

    els.forEach(el => io.observe(el))
  })
}
