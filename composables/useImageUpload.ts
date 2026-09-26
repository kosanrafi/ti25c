export function useImageUpload() {
  const uploading = ref(false)
  const error = ref('')

  async function upload(file: File): Promise<string | null> {
    uploading.value = true
    error.value = ''
    try {
      const form = new FormData()
      form.append('file', file)
      const res = await $fetch<{ url: string }>('/api/upload', {
        method: 'POST',
        body: form
      })
      return res.url
    } catch (e: any) {
      error.value = e?.data?.statusMessage || 'Gagal mengunggah file.'
      return null
    } finally {
      uploading.value = false
    }
  }

  return { upload, uploading, error }
}
