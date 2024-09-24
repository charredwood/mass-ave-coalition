// https://v3.nuxtjs.org/api/configuration/nuxt.config

export default defineNuxtConfig({
  modules: [
    // ...
    '@pinia/nuxt',
  ],
  nitro: {
    devProxy: {
      '/api': {
        target:
          'https://us-central1-collective-history-435822.cloudfunctions.net',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
})
