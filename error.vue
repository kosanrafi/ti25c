<script setup lang="ts">
const props = defineProps<{ error: { statusCode: number; statusMessage?: string; message?: string } }>()

function goHome() {
  clearError({ redirect: '/' })
}
</script>

<template>
  <div class="flex min-h-screen flex-col items-center justify-center px-4 text-center font-sans text-white antialiased">
    <span class="text-sm font-semibold tracking-[0.3em] text-flame-400">{{ error.statusCode }}</span>
    <h1 class="glow-title mt-3 text-2xl font-bold sm:text-3xl">
      {{ error.statusCode === 404 ? 'Halaman tidak ditemukan' : 'Terjadi kesalahan' }}
    </h1>
    <p class="mt-3 max-w-sm text-sm text-white/65">
      {{ error.statusMessage || error.message || 'Data yang kamu cari mungkin sudah dihapus atau tautannya salah.' }}
    </p>
    <button class="btn-solid mt-7 w-fit px-8" @click="goHome">Kembali ke Beranda</button>
  </div>
</template>
