<script setup lang="ts">
definePageMeta({ layout: 'admin', middleware: 'admin' })

interface Mhs {
  id: number
  name: string
  role: string
  description: string
  hobi: string
  skills: string
  sertifikat: string
  photo: string
  sort_order: number
}

const { data: list, refresh } = await useFetch<Mhs[]>('/api/mahasiswa', { default: () => [] })

const showForm = ref(false)
const editing = ref<Mhs | null>(null)
const deleting = ref<number | null>(null)
const query = ref('')

const filtered = computed(() => {
  if (!query.value.trim()) return list.value || []
  const q = query.value.toLowerCase()
  return (list.value || []).filter(m => m.name.toLowerCase().includes(q) || m.role.toLowerCase().includes(q))
})

const emptyForm = (): Omit<Mhs, 'id'> & { id?: number } => ({
  name: '', role: 'Mahasiswa', description: '', hobi: '', skills: '', sertifikat: '', photo: '',
  sort_order: (list.value?.length || 0)
})

function openCreate() { editing.value = null; showForm.value = true }
function openEdit(m: Mhs) { editing.value = m; showForm.value = true }
async function onSaved() { showForm.value = false; editing.value = null; await refresh() }
async function remove(id: number) {
  if (!confirm('Hapus data mahasiswa ini?')) return
  deleting.value = id
  try {
    await $fetch(`/api/mahasiswa/${id}`, { method: 'DELETE' })
    await refresh()
  } finally {
    deleting.value = null
  }
}
</script>

<template>
  <div>
    <div class="flex flex-wrap items-center justify-between gap-3">
      <div>
        <h1 class="text-xl font-bold text-white">Mahasiswa</h1>
        <p class="mt-1 text-sm text-white/60">Data mahasiswa yang tampil di kartu carousel section Mahasiswa.</p>
      </div>
      <button class="admin-btn" @click="openCreate">+ Tambah Mahasiswa</button>
    </div>

    <input
      v-model="query"
      type="search"
      placeholder="Cari nama atau role…"
      class="field-input mt-5 max-w-xs"
    />

    <div v-if="filtered.length" class="mt-5 overflow-x-auto rounded-2xl border border-white/10">
      <table class="min-w-full divide-y divide-white/10 text-sm">
        <thead class="bg-white/[0.04] text-left text-xs uppercase tracking-wide text-white/50">
          <tr>
            <th class="px-4 py-3 font-medium">Mahasiswa</th>
            <th class="px-4 py-3 font-medium">Role</th>
            <th class="px-4 py-3 font-medium">Hobi</th>
            <th class="px-4 py-3 font-medium">Skills</th>
            <th class="px-4 py-3 font-medium text-right">Aksi</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-white/5">
          <tr v-for="m in filtered" :key="m.id" class="hover:bg-white/[0.03]">
            <td class="flex items-center gap-3 px-4 py-3">
              <div class="h-9 w-9 shrink-0 overflow-hidden rounded-full bg-white/10 bg-cover bg-center" :style="m.photo ? { backgroundImage: `url('${m.photo}')` } : {}"></div>
              <span class="font-medium text-white">{{ m.name }}</span>
            </td>
            <td class="px-4 py-3">
              <span class="rounded-full bg-flame-500/15 px-2.5 py-1 text-xs font-semibold text-flame-300">{{ m.role || 'Mahasiswa' }}</span>
            </td>
            <td class="max-w-[10rem] truncate px-4 py-3 text-white/70">{{ m.hobi || '—' }}</td>
            <td class="max-w-[12rem] truncate px-4 py-3 text-white/70">{{ m.skills || '—' }}</td>
            <td class="px-4 py-3 text-right">
              <div class="inline-flex gap-2">
                <button class="admin-btn-outline !py-1.5 !text-xs" @click="openEdit(m)">Edit</button>
                <button class="admin-btn-danger" :disabled="deleting === m.id" @click="remove(m.id)">
                  {{ deleting === m.id ? '…' : 'Hapus' }}
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div v-else class="admin-card mt-5 text-center text-sm text-white/60">
      {{ query ? 'Tidak ada hasil yang cocok.' : 'Belum ada data mahasiswa. Klik "Tambah Mahasiswa" untuk mulai.' }}
    </div>

    <AdminMahasiswaForm
      v-if="showForm"
      :model-value="editing || emptyForm()"
      @close="showForm = false"
      @saved="onSaved"
    />
  </div>
</template>
