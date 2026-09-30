<script setup lang="ts">
const progress = ref(0)
let ticking = false

function update() {
  const el = document.documentElement
  const scrollTop = el.scrollTop || document.body.scrollTop
  const height = el.scrollHeight - el.clientHeight
  progress.value = height > 0 ? Math.min(100, (scrollTop / height) * 100) : 0
}
function onScroll() {
  if (ticking) return
  ticking = true
  requestAnimationFrame(() => { update(); ticking = false })
}

onMounted(() => {
  update()
  window.addEventListener('scroll', onScroll, { passive: true })
  window.addEventListener('resize', onScroll, { passive: true })
})
onBeforeUnmount(() => {
  window.removeEventListener('scroll', onScroll)
  window.removeEventListener('resize', onScroll)
})
</script>

<template>
  <div class="scroll-progress-track" aria-hidden="true">
    <div class="scroll-progress-bar" :style="{ width: progress + '%' }"></div>
  </div>
</template>
