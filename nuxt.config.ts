// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  modules: ["@nuxt/ui"],
  extends:[
    // '../ccci-layer'
    '@ccci/ui-layer'
  ],
  colorMode: {
    preference: 'light'
  },
  css: ['@/assets/css/main.css', '@/assets/css/prism-theme.css'],
  plugins: ['~/plugins/prism.js'],
})