<script setup lang="ts">
const props = defineProps<{
  modelValue: {
    id?: number
    tag: string
    title: string
    description: string
    link_url: string
    image: string
    theme: string
    sort_order: number
  }
}>()
const emit = defineEmits<{ close: []; saved: [] }>()

const form = reactive({ ...props.modelValue })
const saving = ref(false)
const errorMsg = ref('')

const themes = [
  { value: 'sky', label: 'Biru langit' },
  { value: 'light', label: 'Terang (abu muda)' },
  { value: 'indigo', label: 'Indigo' },
  { value: 'flame', label: 'Merah' },
  { value: 'emerald', label: 'Hijau' }
]

async function submit() {
  if (!form.title.trim()) {
    errorMsg.value = 'Judul wajib diisi.'
    return
  }
  saving.value = true
  errorMsg.value = ''
  try {
    if (form.id) {
      await $fetch(`/api/info/${form.id}`, { method: 'PUT', body: form })
    } else {
      await $fetch('/api/info', { method: 'POST', body: form })
    }
    emit('saved')
  } catch (e: any) {
    errorMsg.value = e?.data?.statusMessage || 'Gagal menyimpan info kelas.'
  } finally {
    saving.value = false
  }
}
</script>

<template>
  <div class="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 p-4" @click.self="emit('close')">
    <form class="admin-card max-h-[90vh] w-full max-w-lg overflow-y-auto" @submit.prevent="submit">
      <h3 class="text-base font-bold text-white">{{ form.id ? 'Edit Info Kelas' : 'Tambah Info Kelas' }}</h3>

      <div class="mt-5 space-y-4">
        <div class="grid grid-cols-2 gap-4">
          <div>
            <label class="field-label">Label kecil</label>
            <input v-model="form.tag" type="text" class="field-input" placeholder="RAPAT KELAS" />
          </div>
          <div>
            <label class="field-label">Warna kartu</label>
            <select v-model="form.theme" class="field-input">
              <option v-for="t in themes" :key="t.value" :value="t.value">{{ t.label }}</option>
            </select>
          </div>
        </div>

        <div>
          <label class="field-label">Judul <span class="font-normal text-white/40">(Enter = baris baru)</span></label>
          <textarea v-model="form.title" rows="2" class="field-textarea" placeholder="Rapat Kelas&#10;Setiap Pekan"></textarea>
        </div>

        <div>
          <label class="field-label">Deskripsi</label>
          <textarea v-model="form.description" rows="2" class="field-textarea" placeholder="Diskusi & evaluasi kegiatan kelas setiap pekan."></textarea>
        </div>

        <div>
          <label class="field-label">Link "Selengkapnya" <span class="font-normal text-white/40">(opsional)</span></label>
          <input v-model="form.link_url" type="text" class="field-input" placeholder="https://..." />
        </div>

        <AdminImagePicker v-model="form.image" label="Gambar latar (opsional, menggantikan warna)" />

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
