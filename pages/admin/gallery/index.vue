<script setup lang="ts">
definePageMeta({ layout: 'admin', middleware: 'admin' })

interface Album {
  id: number
  title: string
  cover_image: string
  photos: string[]
  sort_order: number
}

const { data: albums, refresh } = await useFetch<Album[]>('/api/gallery', { default: () => [] })

const showForm = ref(false)
const editing = ref<Album | null>(null)
const deleting = ref<number | null>(null)

const emptyForm = (): Omit<Album, 'id'> & { id?: number } => ({
  title: '', cover_image: '', photos: [], sort_order: (albums.value?.length || 0)
})

function openCreate() { editing.value = null; showForm.value = true }
function openEdit(a: Album) { editing.value = a; showForm.value = true }
async function onSaved() { showForm.value = false; editing.value = null; await refresh() }
async function remove(id: number) {
  if (!confirm('Hapus album gallery ini?')) return
  deleting.value = id
  try {
    await $fetch(`/api/gallery/${id}`, { method: 'DELETE' })
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
        <h1 class="text-xl font-bold text-white">Gallery</h1>
        <p class="mt-1 text-sm text-white/60">Album foto/GIF — 1 cover + maksimal 7 foto per album.</p>
      </div>
      <button class="admin-btn" @click="openCreate">+ Tambah Album</button>
    </div>

    <div v-if="albums?.length" class="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      <div v-for="a in albums" :key="a.id" class="admin-card">
        <div
          class="aspect-[3/4] w-full overflow-hidden rounded-xl bg-gradient-to-br from-neutral-700 to-neutral-900 bg-cover bg-center"
          :style="a.cover_image ? { backgroundImage: `url('${a.cover_image}')` } : {}"
        ></div>
        <p class="mt-3 truncate text-sm font-semibold text-white">{{ a.title }}</p>
        <p class="mt-1 text-[11px] text-white/40">{{ a.photos?.length || 0 }} foto · Urutan: {{ a.sort_order }}</p>

        <div class="mt-4 flex gap-2">
          <button class="admin-btn-outline flex-1 !py-2 !text-xs" @click="openEdit(a)">Edit</button>
          <button class="admin-btn-danger" :disabled="deleting === a.id" @click="remove(a.id)">
            {{ deleting === a.id ? '…' : 'Hapus' }}
          </button>
        </div>
      </div>
    </div>

    <div v-else class="admin-card mt-6 text-center text-sm text-white/60">
      Belum ada album. Klik "Tambah Album" untuk membuat album pertama.
    </div>

    <AdminGalleryForm
      v-if="showForm"
      :model-value="editing || emptyForm()"
      @close="showForm = false"
      @saved="onSaved"
    />
  </div>
</template>
