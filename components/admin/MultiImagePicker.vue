<script setup lang="ts">
const props = defineProps<{ modelValue: string[]; max?: number }>()
const emit = defineEmits<{ 'update:modelValue': [string[]] }>()

const max = computed(() => props.max ?? 7)
const { upload, uploading, error } = useImageUpload()
const inputEl = ref<HTMLInputElement | null>(null)

async function onChange(e: Event) {
  const files = Array.from((e.target as HTMLInputElement).files || [])
  if (!files.length) return

  const remaining = max.value - props.modelValue.length
  const toUpload = files.slice(0, Math.max(remaining, 0))

  const urls: string[] = []
  for (const file of toUpload) {
    const url = await upload(file)
    if (url) urls.push(url)
  }
  if (urls.length) emit('update:modelValue', [...props.modelValue, ...urls])
  if (inputEl.value) inputEl.value.value = ''
}

function removeAt(i: number) {
  const copy = [...props.modelValue]
  copy.splice(i, 1)
  emit('update:modelValue', copy)
}
</script>

<template>
  <div>
    <div class="flex items-center justify-between">
      <label class="field-label !mb-0">Foto album (maks {{ max }}, boleh GIF)</label>
      <span class="text-[11px] text-white/50">{{ modelValue.length }}/{{ max }}</span>
    </div>

    <div class="mt-2 grid grid-cols-3 gap-3 sm:grid-cols-4">
      <div v-for="(url, i) in modelValue" :key="i" class="group relative aspect-square overflow-hidden rounded-xl border border-white/15">
        <img :src="url" alt="" class="h-full w-full object-cover" />
        <button
          type="button"
          class="absolute right-1 top-1 rounded-full bg-black/70 p-1 text-white opacity-0 transition-opacity group-hover:opacity-100"
          aria-label="Hapus foto"
          @click="removeAt(i)"
        >
          <svg class="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2.2"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12"/></svg>
        </button>
      </div>

      <label
        v-if="modelValue.length < max"
        class="flex aspect-square cursor-pointer flex-col items-center justify-center gap-1 rounded-xl border border-dashed border-white/20 text-white/50 hover:border-flame-500/60 hover:text-flame-300"
      >
        <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="1.8"><path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15"/></svg>
        <span class="text-[11px]">{{ uploading ? 'Mengunggah…' : 'Tambah' }}</span>
        <input ref="inputEl" type="file" accept="image/png,image/jpeg,image/webp,image/gif" multiple class="hidden" :disabled="uploading" @change="onChange" />
      </label>
    </div>

    <p v-if="error" class="mt-2 text-[11px] text-red-300">{{ error }}</p>
  </div>
</template>
