// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-09-01',
  devtools: { enabled: false },

  modules: ['@nuxtjs/tailwindcss'],

  css: ['~/assets/css/main.css'],

  app: {
    pageTransition: { name: 'page', mode: 'out-in' },
    head: {
      titleTemplate: '%s',
      title: 'TI 25 C — Teknik Informatika Universitas Perjuangan Tasikmalaya',
      htmlAttrs: { lang: 'id' },
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        {
          name: 'description',
          content:
            'Website resmi TI25C — kelas Teknik Informatika 25 C, Universitas Perjuangan Tasikmalaya (UNPER). Profil mahasiswa, galeri kegiatan, dan info agenda kelas.'
        },
        {
          name: 'keywords',
          content:
            'TI25C, TI 25 C, Teknik Informatika UNPER, Teknik Informatika Universitas Perjuangan Tasikmalaya, Universitas Perjuangan Tasikmalaya, UNPER Tasikmalaya, mahasiswa Teknik Informatika 25 C, kelas TI25C, angkatan 2025 Teknik Informatika UNPER'
        },
        { name: 'robots', content: 'index, follow' },
        { name: 'theme-color', content: '#050505' },
        { property: 'og:site_name', content: 'TI 25 C — Teknik Informatika UNPER' },
        { property: 'og:locale', content: 'id_ID' },
        // Isi GOOGLE_SITE_VERIFICATION di .env (dari Google Search Console) —
        // tag ini otomatis muncul begitu env-nya ada, tanpa perlu ubah kode.
        ...(process.env.GOOGLE_SITE_VERIFICATION
          ? [{ name: 'google-site-verification', content: process.env.GOOGLE_SITE_VERIFICATION }]
          : [])
      ],
      link: [
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap' },
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' }
      ]
    }
  },

  routeRules: {
    // Halaman publik dirender SSR (cepat & ramah SEO).
    // /admin: client-only (tak perlu SSR untuk panel admin) + diblokir dari indeks Google.
    '/admin/**': { ssr: false, headers: { 'X-Robots-Tag': 'noindex, nofollow' } }
  },

  runtimeConfig: {
    tursoDbUrl: process.env.TURSO_DATABASE_URL || '',
    tursoAuthToken: process.env.TURSO_AUTH_TOKEN || '',
    adminPassword: process.env.ADMIN_PASSWORD || 'admin123',
    sessionSecret: process.env.SESSION_SECRET || 'dev-secret-jangan-dipakai-di-produksi',
    public: {
      // Dipakai untuk canonical URL, Open Graph, dan sitemap.xml.
      // Override lewat env NUXT_PUBLIC_SITE_URL kalau perlu (misal saat staging).
      siteUrl: process.env.NUXT_PUBLIC_SITE_URL || 'https://www.ti25c.web.id'
    }
  },

  nitro: {
    experimental: { asyncContext: true }
  }
})
