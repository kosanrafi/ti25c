<script setup lang="ts">
interface Mahasiswa {
  id: number
  name: string
  role: string
  photo: string
  instagram?: string
  tiktok?: string
}

defineProps<{ data: Mahasiswa }>()
</script>

<template>
  <article class="student-w">
    <NuxtLink
      :to="`/mahasiswa/${data.id}`"
      class="student-art block w-full bg-gradient-to-br from-flame-600 via-ink-800 to-ink-900"
      :style="data.photo ? { backgroundImage: `url('${data.photo}')` } : {}"
    >
      <div v-if="!data.photo" class="flex h-16 w-16 items-center justify-center rounded-full border border-white/20 bg-white/10">
        <svg class="h-8 w-8 text-white/70" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="1.6"><path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.5 20.25a7.5 7.5 0 0 1 15 0" /></svg>
      </div>
      <div class="w-full rounded-lg bg-black/45 px-2 py-2 backdrop-blur-sm">
        <p class="line-clamp-2 text-[13px] font-semibold leading-snug text-white">{{ data.name }}</p>
        <span class="mt-1 inline-block rounded-full bg-flame-500/20 px-2 py-0.5 text-[10px] font-semibold tracking-wide text-flame-300">{{ data.role || 'Mahasiswa' }}</span>
      </div>
    </NuxtLink>

    <div class="mt-3 space-y-2">
      <NuxtLink :to="`/mahasiswa/${data.id}`" class="btn-solid">
        <svg class="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="1.8"><path stroke-linecap="round" stroke-linejoin="round" d="M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Zm6-10.125a1.875 1.875 0 1 1-3.75 0 1.875 1.875 0 0 1 3.75 0Zm1.294 6.336a6.721 6.721 0 0 1-3.17.789 6.721 6.721 0 0 1-3.168-.789 3.376 3.376 0 0 1 6.338 0Z"/></svg>
        Lihat Detail
      </NuxtLink>
      <SocialButtons :instagram="data.instagram" :tiktok="data.tiktok" show-empty />
    </div>
  </article>
</template>
