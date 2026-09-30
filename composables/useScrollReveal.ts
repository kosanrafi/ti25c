/**
 * Animasi "reveal" saat elemen masuk viewport (fade + geser naik),
 * dipakai di tiap section supaya halaman terasa hidup saat discroll.
 * Ringan: GSAP + ScrollTrigger diimpor dinamis, hanya di client,
 * dan otomatis dilewati jika pengguna mengaktifkan "reduce motion".
 */
export function useScrollReveal(
  target: string,
  opts: { y?: number; delay?: number; stagger?: number } = {}
) {
  onMounted(async () => {
    if (typeof window === 'undefined') return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    await nextTick()
    const els = document.querySelectorAll(target)
    if (!els.length) return

    const { default: gsap } = await import('gsap')
    const { ScrollTrigger } = await import('gsap/ScrollTrigger')
    gsap.registerPlugin(ScrollTrigger)

    gsap.fromTo(
      els,
      { opacity: 0, y: opts.y ?? 44 },
      {
        opacity: 1,
        y: 0,
        duration: 0.9,
        ease: 'power3.out',
        delay: opts.delay ?? 0,
        stagger: opts.stagger ?? 0,
        scrollTrigger: { trigger: els[0] as Element, start: 'top 85%' }
      }
    )
  })
}
