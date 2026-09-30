// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-09-01',
  devtools: { enabled: false },

  modules: ['@nuxtjs/tailwindcss'],

  css: ['~/assets/css/main.css'],

  app: {
    pageTransition: { name: 'page', mode: 'out-in' },
    head: {
      title: 'TI 25 C — Universitas Perjuangan Tasikmalaya',
      htmlAttrs: { lang: 'id' },
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'Kebersamaan, semangat, dan kekompakan mahasiswa Teknik Informatika 25 C — Universitas Perjuangan Tasikmalaya.' }
      ],
      link: [
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap' }
      ]
    }
  },

  // Halaman publik dirender statis-cepat (SSR) demi ringan & SEO,
  // halaman /admin dirender di client saja (tidak perlu SSR untuk panel admin).
  routeRules: {
    '/admin/**': { ssr: false }
  },

  runtimeConfig: {
    tursoDbUrl: process.env.TURSO_DATABASE_URL || '',
    tursoAuthToken: process.env.TURSO_AUTH_TOKEN || '',
    adminPassword: process.env.ADMIN_PASSWORD || 'admin123',
    sessionSecret: process.env.SESSION_SECRET || 'dev-secret-jangan-dipakai-di-produksi',
    public: {}
  },

  nitro: {
    experimental: { asyncContext: true }
  }
})
