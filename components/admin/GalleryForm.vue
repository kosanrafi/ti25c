<script setup lang="ts">
const props = defineProps<{
  modelValue: {
    id?: number
    title: string
    cover_image: string
    photos: string[]
    sort_order: number
  }
}>()
const emit = defineEmits<{ close: []; saved: [] }>()

const form = reactive({ ...props.modelValue, photos: [...props.modelValue.photos] })
const saving = ref(false)
const errorMsg = ref('')

async function submit() {
  if (!form.title.trim()) {
    errorMsg.value = 'Judul album wajib diisi.'
    return
  }
  saving.value = true
  errorMsg.value = ''
  try {
    if (form.id) {
      await $fetch(`/api/gallery/${form.id}`, { method: 'PUT', body: form })
    } else {
      await $fetch('/api/gallery', { method: 'POST', body: form })
    }
    emit('saved')
  } catch (e: any) {
    errorMsg.value = e?.data?.statusMessage || 'Gagal menyimpan album gallery.'
  } finally {
    saving.value = false
  }
}
</script>

<template>
  <div class="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 p-4" @click.self="emit('close')">
    <form class="admin-card max-h-[90vh] w-full max-w-lg overflow-y-auto" @submit.prevent="submit">
      <h3 class="text-base font-bold text-white">{{ form.id ? 'Edit Album' : 'Tambah Album' }}</h3>

      <div class="mt-5 space-y-4">
        <div>
          <label class="field-label">Judul album</label>
          <input v-model="form.title" type="text" class="field-input" placeholder="Contoh: Malam Keakraban 2025" />
        </div>

        <AdminImagePicker v-model="form.cover_image" label="Foto cover" />

        <AdminMultiImagePicker v-model="form.photos" :max="7" />

        <div>
          <label class="field-label">Urutan tampil</label>
          <input v-model.number="form.sort_order" type="number" class="field-input" />
        </div>

        <p v-if="errorMsg" class="text-xs text-red-300">{{ errorMsg }}</p>
      </div>

      <div class="mt-6 flex justify-end gap-3">
        <button type="button" class="admin-btn-outline" @click="emit('close')">Batal</button>
        <button type="submit" class="admin-btn" :disabled="saving">{{ saving ? 'Menyimpan…' : 'Simpan' }}</button>
      </div>
    </form>
  </div>
</template>
