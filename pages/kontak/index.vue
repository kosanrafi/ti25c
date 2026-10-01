<script setup lang="ts">
const siteUrl = useRuntimeConfig().public.siteUrl
const desc = 'Hubungi ketua kelas dan temukan lokasi kampus Teknik Informatika 25 C (TI25C), Universitas Perjuangan Tasikmalaya.'
useSeoMeta({
  title: 'Kontak — TI 25 C',
  description: desc,
  ogTitle: 'Kontak — TI 25 C',
  ogDescription: desc,
  ogImage: `${siteUrl}/og-image.jpg`,
  ogUrl: `${siteUrl}/kontak`,
  twitterCard: 'summary_large_image'
})
useHead({ link: [{ rel: 'canonical', href: `${siteUrl}/kontak` }] })
</script>

<template>
  <div class="-mt-8">
    <ContactSection />
  </div>
</template>
