<script setup lang="ts">
const props = defineProps<{ modelValue: string; label?: string }>()
const emit = defineEmits<{ 'update:modelValue': [string] }>()

const { upload, uploading, error } = useImageUpload()
const inputEl = ref<HTMLInputElement | null>(null)

async function onChange(e: Event) {
  const file = (e.target as HTMLInputElement).files?.[0]
  if (!file) return
  const url = await upload(file)
  if (url) emit('update:modelValue', url)
  if (inputEl.value) inputEl.value.value = ''
}

function clear() {
  emit('update:modelValue', '')
}
</script>

<template>
  <div>
    <label v-if="label" class="field-label">{{ label }}</label>

    <div class="flex items-center gap-4">
      <div class="flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-white/15 bg-white/[0.04]">
        <img v-if="modelValue" :src="modelValue" alt="" class="h-full w-full object-cover" />
        <svg v-else class="h-8 w-8 text-white/25" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M4 16l4.586-4.586a2 2 0 0 1 2.828 0L16 16m-2-2 1.586-1.586a2 2 0 0 1 2.828 0L20 14M14 8h.01M6 20h12a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2Z"/></svg>
      </div>

      <div class="flex flex-col gap-1.5">
        <label class="admin-btn-outline cursor-pointer !py-1.5 !text-xs">
          {{ uploading ? 'Mengunggah…' : (modelValue ? 'Ganti gambar' : 'Unggah gambar') }}
          <input ref="inputEl" type="file" accept="image/png,image/jpeg,image/webp,image/gif" class="hidden" :disabled="uploading" @change="onChange" />
        </label>
        <button v-if="modelValue" type="button" class="text-left text-[11px] text-white/50 hover:text-red-300" @click="clear">Hapus gambar</button>
        <p v-if="error" class="text-[11px] text-red-300">{{ error }}</p>
        <p class="text-[10px] text-white/40">PNG, JPG, WEBP, atau GIF · maks 4MB</p>
      </div>
    </div>
  </div>
</template>
