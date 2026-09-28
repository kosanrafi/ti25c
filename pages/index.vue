<script setup lang="ts">
const { data: posters } = await useFetch('/api/posters', { default: () => [] })
const { data: mahasiswa } = await useFetch('/api/mahasiswa', { default: () => [] })
const { data: gallery } = await useFetch('/api/gallery', { default: () => [] })
const { data: info } = await useFetch('/api/info', { default: () => [] })

onMounted(async () => {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.querySelectorAll('.anim-top, .anim-left, .anim-right, .anim-bottom')
      .forEach(el => ((el as HTMLElement).style.opacity = '1'))
    return
  }

  const { default: gsap } = await import('gsap')

  gsap.set('.anim-top', { y: -46, opacity: 0 })
  gsap.set('.anim-left', { x: -64, opacity: 0 })
  gsap.set('.anim-right', { x: 64, opacity: 0 })
  gsap.set('.anim-bottom', { y: 46, opacity: 0 })

  gsap.timeline({ defaults: { duration: 0.9, ease: 'power3.out' } })
    .to('.anim-top',    { y: 0, opacity: 1 })
    .to('.anim-left',   { x: 0, opacity: 1, stagger: 0.12 }, '-=0.45')
    .to('.anim-right',  { x: 0, opacity: 1 }, '<')
    .to('.anim-bottom', { y: 0, opacity: 1, stagger: 0.12 }, '-=0.35')
})
</script>

<template>
  <div>
    <HeroSection :posters="posters as any" />
    <MahasiswaSection :mahasiswa="mahasiswa as any" />
    <GallerySection :gallery="gallery as any" />
    <InfoSection :items="info as any" />
    <AboutSection />
    <ContactSection />
  </div>
</template>
