<script setup lang="ts">
const props = defineProps<{
  modelValue: {
    id?: number
    name: string
    role: string
    description: string
    hobi: string
    skills: string
    sertifikat: string
    photo: string
    sort_order: number
  }
}>()
const emit = defineEmits<{ close: []; saved: [] }>()

const form = reactive({ ...props.modelValue })
const saving = ref(false)
const errorMsg = ref('')

const roleOptions = ['Mahasiswa', 'Ketua Kelas (KM)', 'Wakil Ketua Kelas', 'Sekretaris', 'Bendahara']

async function submit() {
  if (!form.name.trim()) {
    errorMsg.value = 'Nama wajib diisi.'
    return
  }
  saving.value = true
  errorMsg.value = ''
  try {
    if (form.id) {
      await $fetch(`/api/mahasiswa/${form.id}`, { method: 'PUT', body: form })
    } else {
      await $fetch('/api/mahasiswa', { method: 'POST', body: form })
    }
    emit('saved')
  } catch (e: any) {
    errorMsg.value = e?.data?.statusMessage || 'Gagal menyimpan data mahasiswa.'
  } finally {
    saving.value = false
  }
}
</script>

<template>
  <div class="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 p-4" @click.self="emit('close')">
    <form class="admin-card max-h-[90vh] w-full max-w-lg overflow-y-auto" @submit.prevent="submit">
      <h3 class="text-base font-bold text-white">{{ form.id ? 'Edit Mahasiswa' : 'Tambah Mahasiswa' }}</h3>

      <div class="mt-5 space-y-4">
        <div class="grid grid-cols-2 gap-4">
          <div>
            <label class="field-label">Nama lengkap</label>
            <input v-model="form.name" type="text" class="field-input" placeholder="Nama mahasiswa" />
          </div>
          <div>
            <label class="field-label">Role</label>
            <input v-model="form.role" list="role-options" class="field-input" placeholder="Mahasiswa" />
            <datalist id="role-options">
              <option v-for="r in roleOptions" :key="r" :value="r" />
            </datalist>
          </div>
        </div>

        <AdminImagePicker v-model="form.photo" label="Foto (opsional)" />

        <div>
          <label class="field-label">Deskripsi</label>
          <textarea v-model="form.description" rows="2" class="field-textarea" placeholder="Deskripsi singkat tentang mahasiswa"></textarea>
        </div>

        <div>
          <label class="field-label">Hobi</label>
          <input v-model="form.hobi" type="text" class="field-input" placeholder="Contoh: Futsal, Fotografi" />
        </div>

        <div>
          <label class="field-label">Skills <span class="font-normal text-white/40">(pisahkan dengan koma)</span></label>
          <input v-model="form.skills" type="text" class="field-input" placeholder="Contoh: JavaScript, Figma, Public Speaking" />
        </div>

        <div>
          <label class="field-label">Sertifikat</label>
          <textarea v-model="form.sertifikat" rows="2" class="field-textarea" placeholder="Contoh: Sertifikat Dicoding - Belajar Dasar Pemrograman Web"></textarea>
        </div>

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
