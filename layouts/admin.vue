<script setup lang="ts">
const route = useRoute()
const router = useRouter()
const loggingOut = ref(false)
const links = useAdminLinks()

async function logout() {
  loggingOut.value = true
  try {
    await $fetch('/api/admin/logout', { method: 'POST' })
  } finally {
    loggingOut.value = false
    router.push('/admin/login')
  }
}
</script>

<template>
  <div class="flex min-h-screen bg-[#050505] font-sans text-white antialiased">
    <AdminSidebar v-if="route.path !== '/admin/login'" />

    <div class="flex min-w-0 flex-1 flex-col">
      <header
        v-if="route.path !== '/admin/login'"
        class="flex items-center justify-between border-b border-white/10 bg-white/[0.03] px-4 py-3 sm:px-6"
      >
        <span class="text-sm font-semibold text-white/70">Panel Admin — TI 25 C</span>
        <button
          class="admin-btn-outline !py-1.5 !text-xs"
          :disabled="loggingOut"
          @click="logout"
        >
          Keluar
        </button>
      </header>

      <nav
        v-if="route.path !== '/admin/login'"
        class="no-scrollbar flex gap-2 overflow-x-auto border-b border-white/10 px-4 py-2 sm:hidden"
        aria-label="Menu admin"
      >
        <NuxtLink
          v-for="l in links"
          :key="l.to"
          :to="l.to"
          class="shrink-0 rounded-full px-3.5 py-1.5 text-xs font-semibold transition-colors"
          :class="route.path === l.to ? 'bg-flame-500 text-white' : 'bg-white/5 text-white/75'"
        >{{ l.label }}</NuxtLink>
      </nav>

      <div class="flex-1 px-4 py-6 sm:px-6 lg:px-10 lg:py-10">
        <slot />
      </div>
    </div>
  </div>
</template>
