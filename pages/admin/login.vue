<script setup lang="ts">
definePageMeta({ layout: 'admin' })

const route = useRoute()
const router = useRouter()

const password = ref('')
const loading = ref(false)
const errorMsg = ref('')

async function submit() {
  loading.value = true
  errorMsg.value = ''
  try {
    await $fetch('/api/admin/login', { method: 'POST', body: { password: password.value } })
    const redirect = (route.query.redirect as string) || '/admin'
    router.push(redirect)
  } catch (e: any) {
    errorMsg.value = e?.data?.statusMessage || 'Gagal login.'
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="flex min-h-screen items-center justify-center px-4">
    <form class="admin-card w-full max-w-sm" @submit.prevent="submit">
      <div class="text-center">
        <span class="text-xl font-extrabold tracking-wide text-white">TI 25 C</span>
        <p class="mt-1 text-[10px] tracking-[0.42em] text-mist-400">ADMIN PANEL</p>
      </div>

      <div class="mt-6">
        <label class="field-label">Password Admin</label>
        <input
          v-model="password"
          type="password"
          class="field-input"
          placeholder="Masukkan password"
          autofocus
          required
        />
        <p v-if="errorMsg" class="mt-2 text-xs text-red-300">{{ errorMsg }}</p>
      </div>

      <button type="submit" class="admin-btn mt-5 w-full" :disabled="loading">
        {{ loading ? 'Memproses…' : 'Masuk' }}
      </button>

      <NuxtLink to="/" class="mt-4 block text-center text-xs text-white/50 hover:text-white">← Kembali ke situs</NuxtLink>
    </form>
  </div>
</template>
