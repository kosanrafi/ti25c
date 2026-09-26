<script setup lang="ts">
definePageMeta({ layout: 'admin', middleware: 'admin' })

interface Poster {
  id: number
  title: string
  description: string
  image: string
  glow_color: string
  sort_order: number
}

const { data: posters, refresh } = await useFetch<Poster[]>('/api/posters', { default: () => [] })

const showForm = ref(false)
const editing = ref<Poster | null>(null)
const deleting = ref<number | null>(null)

const emptyForm = (): Omit<Poster, 'id'> & { id?: number } => ({
  title: '', description: '', image: '', glow_color: '#EF4B36', sort_order: (posters.value?.length || 0)
})

function openCreate() {
  editing.value = null
  showForm.value = true
}
function openEdit(p: Poster) {
  editing.value = p
  showForm.value = true
}
async function onSaved() {
  showForm.value = false
  editing.value = null
  await refresh()
}
async function remove(id: number) {
  if (!confirm('Hapus poster ini?')) return
  deleting.value = id
  try {
    await $fetch(`/api/posters/${id}`, { method: 'DELETE' })
    await refresh()
  } finally {
    deleting.value = null
  }
}
</script>

<template>
  <div>
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-xl font-bold text-white">Poster</h1>
        <p class="mt-1 text-sm text-white/60">Kartu tumpukan yang tampil di Hero halaman Home.</p>
      </div>
      <button class="admin-btn" @click="openCreate">+ Tambah Poster</button>
    </div>

    <div v-if="posters?.length" class="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      <div v-for="p in posters" :key="p.id" class="admin-card">
        <div
          class="aspect-[2/3] w-full overflow-hidden rounded-xl bg-gradient-to-br from-flame-600 to-ink-900 bg-cover bg-center"
          :style="p.image ? { backgroundImage: `url('${p.image}')` } : {}"
        ></div>
        <p class="mt-3 truncate text-sm font-semibold text-white">{{ p.title }}</p>
        <p v-if="p.description" class="mt-1 line-clamp-2 text-xs text-white/60">{{ p.description }}</p>
        <p class="mt-1 text-[11px] text-white/40">Urutan: {{ p.sort_order }}</p>

        <div class="mt-4 flex gap-2">
          <button class="admin-btn-outline flex-1 !py-2 !text-xs" @click="openEdit(p)">Edit</button>
          <button class="admin-btn-danger" :disabled="deleting === p.id" @click="remove(p.id)">
            {{ deleting === p.id ? '…' : 'Hapus' }}
          </button>
        </div>
      </div>
    </div>

    <div v-else class="admin-card mt-6 text-center text-sm text-white/60">
      Belum ada poster. Klik "Tambah Poster" untuk membuat kartu pertama.
    </div>

    <AdminPosterForm
      v-if="showForm"
      :model-value="editing || emptyForm()"
      @close="showForm = false"
      @saved="onSaved"
    />
  </div>
</template>
