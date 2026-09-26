<script setup lang="ts">
const props = defineProps<{
  modelValue: {
    id?: number
    title: string
    description: string
    image: string
    glow_color: string
    sort_order: number
  }
}>()
const emit = defineEmits<{ close: []; saved: [] }>()

const form = reactive({ ...props.modelValue })
const saving = ref(false)
const errorMsg = ref('')

async function submit() {
  if (!form.title.trim()) {
    errorMsg.value = 'Judul wajib diisi.'
    return
  }
  saving.value = true
  errorMsg.value = ''
  try {
    if (form.id) {
      await $fetch(`/api/posters/${form.id}`, { method: 'PUT', body: form })
    } else {
      await $fetch('/api/posters', { method: 'POST', body: form })
    }
    emit('saved')
  } catch (e: any) {
    errorMsg.value = e?.data?.statusMessage || 'Gagal menyimpan poster.'
  } finally {
    saving.value = false
  }
}
</script>

<template>
  <div class="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 p-4" @click.self="emit('close')">
    <form class="admin-card max-h-[90vh] w-full max-w-lg overflow-y-auto" @submit.prevent="submit">
      <h3 class="text-base font-bold text-white">{{ form.id ? 'Edit Poster' : 'Tambah Poster' }}</h3>

      <div class="mt-5 space-y-4">
        <div>
          <label class="field-label">Judul</label>
          <input v-model="form.title" type="text" class="field-input" placeholder='Contoh: "Solid & Kompak"' />
        </div>

        <div>
          <label class="field-label">Deskripsi (opsional)</label>
          <textarea v-model="form.description" rows="2" class="field-textarea" placeholder="Deskripsi singkat pada kartu poster"></textarea>
        </div>

        <AdminImagePicker v-model="form.image" label="Gambar poster (opsional)" />

        <div class="grid grid-cols-2 gap-4">
          <div>
            <label class="field-label">Warna glow</label>
            <input v-model="form.glow_color" type="color" class="h-10 w-full rounded-xl border border-white/15 bg-white/[0.06] p-1" />
          </div>
          <div>
            <label class="field-label">Urutan tampil</label>
            <input v-model.number="form.sort_order" type="number" class="field-input" />
          </div>
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
