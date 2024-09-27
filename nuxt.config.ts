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
  css: ['mapbox-gl/dist/mapbox-gl.css'],
})
