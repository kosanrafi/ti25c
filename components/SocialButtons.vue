<script setup lang="ts">
const props = defineProps<{
  instagram?: string | null
  tiktok?: string | null
  /** tampilkan tombol redup bila akun belum diisi (menjaga tinggi kartu tetap sama) */
  showEmpty?: boolean
  /** versi besar dengan teks + username (halaman detail) */
  detailed?: boolean
}>()

const items = computed(() => [
  { key: 'instagram', label: 'Instagram', raw: props.instagram, url: socialUrl('instagram', props.instagram) },
  { key: 'tiktok', label: 'TikTok', raw: props.tiktok, url: socialUrl('tiktok', props.tiktok) }
] as const)
</script>

<template>
  <div :class="detailed ? 'flex flex-wrap gap-3' : 'grid grid-cols-2 gap-2'">
    <template v-for="it in items" :key="it.key">
      <a
        v-if="it.url"
        :href="it.url"
        target="_blank"
        rel="noopener noreferrer"
        class="btn-outline"
        :class="detailed ? 'px-5' : ''"
        :aria-label="`${it.label} ${socialHandle(it.raw)}`"
      >
        <svg v-if="it.key === 'instagram'" class="h-4 w-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="1.8" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="3.5"/><circle cx="17.2" cy="6.8" r="0.6" fill="currentColor" stroke="none"/></svg>
        <svg v-else class="h-4 w-4 shrink-0" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M16.5 2h-3v13.2a2.8 2.8 0 1 1-2-2.68V9.4a5.8 5.8 0 1 0 5 5.75V8.1a6.9 6.9 0 0 0 4 1.28V6.4a3.9 3.9 0 0 1-4-4.4z"/></svg>
        <span v-if="detailed">{{ it.label }} <span class="font-normal text-white/70">{{ socialHandle(it.raw) }}</span></span>
      </a>

      <span
        v-else-if="showEmpty && !detailed"
        class="btn-outline pointer-events-none !border-white/10 opacity-35"
        role="img"
        :aria-label="`${it.label} belum diisi`"
      >
        <svg v-if="it.key === 'instagram'" class="h-4 w-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="1.8" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="3.5"/><circle cx="17.2" cy="6.8" r="0.6" fill="currentColor" stroke="none"/></svg>
        <svg v-else class="h-4 w-4 shrink-0" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M16.5 2h-3v13.2a2.8 2.8 0 1 1-2-2.68V9.4a5.8 5.8 0 1 0 5 5.75V8.1a6.9 6.9 0 0 0 4 1.28V6.4a3.9 3.9 0 0 1-4-4.4z"/></svg>
      </span>
    </template>
  </div>
</template>
