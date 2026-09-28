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

const props = defineProps<{ data: Mahasiswa }>()
const open = ref(false)

const skillList = computed(() =>
  (props.data.skills || '')
    .split(',')
    .map(s => s.trim())
    .filter(Boolean)
)
</script>

<template>
  <article class="student-w">
    <button
      type="button"
      class="student-art w-full bg-gradient-to-br from-flame-600 via-ink-800 to-ink-900"
      :style="data.photo ? { backgroundImage: `url('${data.photo}')` } : {}"
      @click="open = true"
    >
      <div v-if="!data.photo" class="flex h-16 w-16 items-center justify-center rounded-full border border-white/20 bg-white/10">
        <svg class="h-8 w-8 text-white/70" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="1.6"><path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.5 20.25a7.5 7.5 0 0 1 15 0" /></svg>
      </div>
      <div class="w-full rounded-lg bg-black/45 px-2 py-2 backdrop-blur-sm">
        <p class="line-clamp-2 text-[13px] font-semibold leading-snug text-white">{{ data.name }}</p>
        <span class="mt-1 inline-block rounded-full bg-flame-500/20 px-2 py-0.5 text-[10px] font-semibold tracking-wide text-flame-300">{{ data.role || 'Mahasiswa' }}</span>
      </div>
    </button>

    <div class="mt-3 space-y-2">
      <button type="button" class="btn-solid w-full" @click="open = true">
        <svg class="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="1.8"><path stroke-linecap="round" stroke-linejoin="round" d="M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Zm6-10.125a1.875 1.875 0 1 1-3.75 0 1.875 1.875 0 0 1 3.75 0Zm1.294 6.336a6.721 6.721 0 0 1-3.17.789 6.721 6.721 0 0 1-3.168-.789 3.376 3.376 0 0 1 6.338 0Z"/></svg>
        Lihat Detail
      </button>
      <a href="#kontak" class="btn-outline">
        <svg class="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="1.8"><path stroke-linecap="round" stroke-linejoin="round" d="M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 0 1-2.555-.337A5.972 5.972 0 0 1 5.41 20.97a5.969 5.969 0 0 1-.474-.065 4.48 4.48 0 0 0 .978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25Z"/></svg>
        Kontak
      </a>
    </div>

    <!-- modal detail -->
    <Teleport to="body">
      <div v-if="open" class="fixed inset-0 z-[80] flex items-center justify-center bg-black/70 p-4" @click.self="open = false">
        <div class="w-full max-w-md rounded-2xl border border-white/10 bg-[#0e0e0e] p-6">
          <div class="flex items-start justify-between gap-4">
            <div>
              <p class="text-lg font-bold text-white">{{ data.name }}</p>
              <span class="mt-1 inline-block rounded-full bg-flame-500/20 px-2 py-0.5 text-[10px] font-semibold tracking-wide text-flame-300">{{ data.role || 'Mahasiswa' }}</span>
            </div>
            <button class="rounded-full p-1 text-white/60 hover:bg-white/10 hover:text-white" aria-label="Tutup" @click="open = false">
              <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12"/></svg>
            </button>
          </div>

          <p v-if="data.description" class="mt-4 text-sm leading-relaxed text-white/80">{{ data.description }}</p>

          <div v-if="data.hobi" class="mt-4">
            <p class="text-xs font-semibold text-white/60">Hobi</p>
            <p class="mt-1 text-sm text-white/85">{{ data.hobi }}</p>
          </div>

          <div v-if="skillList.length" class="mt-4">
            <p class="text-xs font-semibold text-white/60">Skills</p>
            <div class="mt-1.5 flex flex-wrap gap-1.5">
              <span v-for="s in skillList" :key="s" class="rounded-full bg-white/10 px-2.5 py-1 text-xs text-white/85">{{ s }}</span>
            </div>
          </div>

          <div v-if="data.sertifikat" class="mt-4">
            <p class="text-xs font-semibold text-white/60">Sertifikat</p>
            <p class="mt-1 text-sm text-white/85">{{ data.sertifikat }}</p>
          </div>
        </div>
      </div>
    </Teleport>
  </article>
</template>
