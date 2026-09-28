<script setup lang="ts">
definePageMeta({ layout: 'admin', middleware: 'admin' })

interface Info {
  id: number
  tag: string
  title: string
  description: string
  link_url: string
  image: string
  theme: string
  sort_order: number
}

const { data: list, refresh } = await useFetch<Info[]>('/api/info', { default: () => [] })

const showForm = ref(false)
const editing = ref<Info | null>(null)
const deleting = ref<number | null>(null)

const emptyForm = (): Omit<Info, 'id'> & { id?: number } => ({
  tag: '', title: '', description: '', link_url: '', image: '', theme: 'sky',
  sort_order: (list.value?.length || 0) + 1
})

function openCreate() { editing.value = null; showForm.value = true }
function openEdit(i: Info) { editing.value = i; showForm.value = true }
async function onSaved() { showForm.value = false; editing.value = null; await refresh() }
async function remove(id: number) {
  if (!confirm('Hapus info kelas ini?')) return
  deleting.value = id
  try {
    await $fetch(`/api/info/${id}`, { method: 'DELETE' })
    await refresh()
  } finally {
    deleting.value = null
  }
}

// kelas Tailwind ditulis lengkap agar terbaca oleh JIT
const swatch: Record<string, string> = {
  sky: 'from-sky-800 to-ink-800',
  light: 'from-mist-300 to-mist-400',
  indigo: 'from-indigo-800 to-ink-800',
  flame: 'from-flame-800 to-ink-800',
  emerald: 'from-emerald-800 to-ink-800'
}
</script>

<template>
  <div>
    <div class="flex flex-wrap items-center justify-between gap-3">
      <div>
        <h1 class="text-xl font-bold text-white">Info Kelas</h1>
        <p class="mt-1 text-sm text-white/60">Kartu coverflow "Info &amp; Agenda Kelas" di halaman utama.</p>
      </div>
      <button class="admin-btn" @click="openCreate">+ Tambah Info</button>
    </div>

    <div v-if="list?.length" class="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      <div v-for="i in list" :key="i.id" class="admin-card">
        <div
          class="flex aspect-video w-full flex-col justify-center gap-1 overflow-hidden rounded-xl bg-gradient-to-br bg-cover bg-center px-4"
          :class="swatch[i.theme] || swatch.sky"
          :style="i.image ? { backgroundImage: `linear-gradient(to top, rgba(0,0,0,.6), rgba(0,0,0,.1)), url('${i.image}')` } : {}"
        >
          <span v-if="i.tag" class="text-[10px] font-semibold tracking-wide" :class="i.theme === 'light' && !i.image ? 'text-flame-600' : 'text-white/80'">{{ i.tag }}</span>
          <p class="line-clamp-2 whitespace-pre-line text-lg font-extrabold leading-tight" :class="i.theme === 'light' && !i.image ? 'text-ink-900' : 'text-white'">{{ i.title }}</p>
        </div>
        <p v-if="i.description" class="mt-3 line-clamp-2 text-xs text-white/70">{{ i.description }}</p>
        <p class="mt-1 text-[11px] text-white/40">Urutan: {{ i.sort_order }}</p>

        <div class="mt-4 flex gap-2">
          <button class="admin-btn-outline flex-1 !py-2 !text-xs" @click="openEdit(i)">Edit</button>
          <button class="admin-btn-danger" :disabled="deleting === i.id" @click="remove(i.id)">
            {{ deleting === i.id ? '…' : 'Hapus' }}
          </button>
        </div>
      </div>
    </div>

    <div v-else class="admin-card mt-6 text-center text-sm text-white/60">
      Belum ada info kelas. Klik "Tambah Info" untuk membuat kartu pertama.
    </div>

    <AdminInfoForm
      v-if="showForm"
      :model-value="editing || emptyForm()"
      @close="showForm = false"
      @saved="onSaved"
    />
  </div>
</template>
