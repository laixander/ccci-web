// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  modules: ["@nuxt/ui"],
  extends:[
    '../ccci-layer'
    // '@ccci/ui-layer'
  ],
  colorMode: {
    preference: 'light'
  },
  css: ['@/assets/css/main.css'],
  app: {
    head: {
      script: [
        {
          src: 'https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/prism.min.js',
          async: true,
        },
        {
          src: 'https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/components/prism-html.min.js',
          async: true,
        },
      ],
      link: [
        {
          rel: 'stylesheet',
          href: 'https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/themes/prism-tomorrow.min.css',
        },
      ],
    },
  },
  plugins: ['~/plugins/prism-cdn.js'],
})
