<script setup lang="ts">
interface Mahasiswa {
  id: number
  name: string
  role: string
  description: string
  hobi: string
  skills: string
  sertifikat: string
  photo: string
}

const route = useRoute()

const { data, error } = await useFetch<Mahasiswa>(`/api/mahasiswa/${route.params.id}`)

if (error.value) {
  throw createError({ statusCode: 404, statusMessage: 'Mahasiswa tidak ditemukan.', fatal: true })
}

const skillList = computed(() =>
  (data.value?.skills || '')
    .split(',')
    .map(s => s.trim())
    .filter(Boolean)
)

useHead(() => ({
  title: data.value ? `${data.value.name} — TI 25 C` : 'Mahasiswa — TI 25 C'
}))
</script>

<template>
  <div v-if="data" class="px-4 pb-24 pt-28 sm:px-6 sm:pt-32">
    <div class="mx-auto max-w-4xl">
      <NuxtLink to="/#mahasiswa" class="inline-flex items-center gap-2 text-sm font-semibold text-white/70 transition-colors hover:text-white">
        <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"/></svg>
        Kembali ke Mahasiswa
      </NuxtLink>

      <div class="screen-panel mt-6 overflow-hidden p-6 sm:p-10">
        <div class="grid gap-8 sm:grid-cols-[16rem_1fr] sm:items-start">
          <div
            class="aspect-[3/4] w-full max-w-[16rem] justify-self-center rounded-2xl border border-white/10 bg-gradient-to-br from-flame-600 via-ink-800 to-ink-900 bg-cover bg-center sm:justify-self-start"
            :style="data.photo ? { backgroundImage: `url('${data.photo}')` } : {}"
          >
            <div v-if="!data.photo" class="flex h-full items-center justify-center">
              <svg class="h-20 w-20 text-white/25" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="1.4"><path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.5 20.25a7.5 7.5 0 0 1 15 0" /></svg>
            </div>
          </div>

          <div>
            <span class="inline-block rounded-full bg-flame-500/15 px-3 py-1 text-xs font-semibold tracking-wide text-flame-300">{{ data.role || 'Mahasiswa' }}</span>
            <h1 class="glow-title mt-3 text-2xl font-bold text-white sm:text-3xl">{{ data.name }}</h1>

            <p v-if="data.description" class="mt-4 text-sm leading-relaxed text-white/80">{{ data.description }}</p>
            <p v-else class="mt-4 text-sm italic text-white/40">Belum ada deskripsi.</p>

            <div class="mt-6 grid gap-5 sm:grid-cols-2">
              <div v-if="data.hobi">
                <p class="text-xs font-semibold uppercase tracking-wide text-white/50">Hobi</p>
                <p class="mt-1.5 text-sm text-white/85">{{ data.hobi }}</p>
              </div>

              <div v-if="data.sertifikat">
                <p class="text-xs font-semibold uppercase tracking-wide text-white/50">Sertifikat</p>
                <p class="mt-1.5 whitespace-pre-line text-sm text-white/85">{{ data.sertifikat }}</p>
              </div>
            </div>

            <div v-if="skillList.length" class="mt-6">
              <p class="text-xs font-semibold uppercase tracking-wide text-white/50">Skills</p>
              <div class="mt-2 flex flex-wrap gap-2">
                <span v-for="s in skillList" :key="s" class="rounded-full bg-white/10 px-3 py-1 text-xs text-white/85">{{ s }}</span>
              </div>
            </div>

            <a href="#kontak" class="btn-outline mt-8 inline-flex w-fit px-6">
              <svg class="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="1.8"><path stroke-linecap="round" stroke-linejoin="round" d="M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 0 1-2.555-.337A5.972 5.972 0 0 1 5.41 20.97a5.969 5.969 0 0 1-.474-.065 4.48 4.48 0 0 0 .978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25Z"/></svg>
              Kontak Kelas
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
