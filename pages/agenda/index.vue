<script setup lang="ts">
const { data: info } = await useFetch('/api/info', { default: () => [] })

const siteUrl = useRuntimeConfig().public.siteUrl
const desc = 'Info dan agenda kegiatan Teknik Informatika 25 C (TI25C), Universitas Perjuangan Tasikmalaya.'
useSeoMeta({
  title: 'Agenda — TI 25 C',
  description: desc,
  ogTitle: 'Agenda — TI 25 C',
  ogDescription: desc,
  ogImage: `${siteUrl}/og-image.jpg`,
  ogUrl: `${siteUrl}/agenda`,
  twitterCard: 'summary_large_image'
})
useHead({ link: [{ rel: 'canonical', href: `${siteUrl}/agenda` }] })
</script>

<template>
  <div class="-mt-8">
    <InfoSection :items="info as any" />
  </div>
</template>
