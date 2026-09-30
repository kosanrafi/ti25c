<script setup lang="ts">
const { data: posters } = await useFetch('/api/posters', { default: () => [] })
const { data: mahasiswa } = await useFetch('/api/mahasiswa', { default: () => [] })
const { data: gallery } = await useFetch('/api/gallery', { default: () => [] })
const { data: info } = await useFetch('/api/info', { default: () => [] })

const config = useRuntimeConfig()
const siteUrl = config.public.siteUrl

useSeoMeta({
  title: 'TI 25 C — Teknik Informatika Universitas Perjuangan Tasikmalaya',
  description:
    'Website resmi TI25C, kelas Teknik Informatika 25 C Universitas Perjuangan Tasikmalaya (UNPER). Profil mahasiswa, galeri kegiatan, dan info agenda kelas.',
  ogTitle: 'TI 25 C — Teknik Informatika UNPER',
  ogDescription: 'Profil mahasiswa, galeri momen, dan info agenda Teknik Informatika 25 C — Universitas Perjuangan Tasikmalaya.',
  ogImage: `${siteUrl}/og-image.jpg`,
  ogUrl: siteUrl,
  ogType: 'website',
  twitterCard: 'summary_large_image'
})
useHead({
  link: [{ rel: 'canonical', href: siteUrl }],
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'EducationalOrganization',
        name: 'TI 25 C — Teknik Informatika Universitas Perjuangan Tasikmalaya',
        alternateName: ['TI25C', 'TI 25 C', 'Teknik Informatika 25 C UNPER'],
        url: siteUrl,
        description:
          'Kelas Teknik Informatika 25 C, Universitas Perjuangan Tasikmalaya (UNPER). Angkatan 2025.',
        parentOrganization: {
          '@type': 'CollegeOrUniversity',
          name: 'Universitas Perjuangan Tasikmalaya',
          alternateName: 'UNPER'
        }
      })
    }
  ]
})
</script>

<template>
  <div>
    <HeroSection :posters="posters as any" />
    <StatsTicker
      :mahasiswa="mahasiswa?.length || 0"
      :gallery="gallery?.length || 0"
      :agenda="info?.length || 0"
    />
    <MahasiswaSection :mahasiswa="mahasiswa as any" />
    <GallerySection :gallery="gallery as any" />
    <InfoSection :items="info as any" />
    <AboutSection />
    <ContactSection />
  </div>
</template>
