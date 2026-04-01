import { defineNuxtConfig } from 'nuxt/config'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  features: {
    inlineStyles: true
  },
  runtimeConfig: {
    public: {
      supabaseUrl: process.env.SUPABASE_URL,
      supabaseKey: process.env.SUPABASE_KEY,
      hcaptchaSiteKey: process.env.SUPABASE_HCAPTCHA_SITE_KEY,
    },
  },
  modules: [
    '@nuxtjs/sitemap',
    '@nuxtjs/robots',
    'nuxt-og-image'
  ],
  site: {
    url: 'https://kodexkode.com.ng',
    name: 'KodexKodes | Software Engineer',
  },
  sitemap: {
    exclude: ['/admin/**', '/login'],
  },
  robots: {
    groups: [
      {
        userAgent: ['*'],
        disallow: ['/admin', '/login'],
        allow: '/'
      }
    ]
  },
  vue: {  
    compilerOptions: {
      isCustomElement: (tag) => tag === 'iconify-icon',
    },
  },
  app: {
    head: {
      title: 'KodexKodes | Software Engineer & Full-Stack Developer',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'Michael Olaitan (KodexKodes) is a Senior Software Engineer based in Nigeria, specializing in Backend, Frontend, and Mobile App Development. Expert in Nuxt 3, Vue, Laravel, and Flutter.' },
        { name: 'keywords', content: 'Web Design Nigeria, Webdesigner Lagos, Web Development Nigeria, Site Design Lagos, Site Designer Nigeria, WordPress Design Nigeria, WordPress Designer Lagos, WordPress Developer Nigeria, WordPress Site Design, WordPress Site Designer, Software Engineer Nigeria, Full-Stack Developer Lagos, Backend Developer Nigeria, Frontend Developer Nigeria, Mobile App Developer Nigeria, Nuxt 3 Developer Lagos, Laravel Expert Nigeria, Flutter Developer Nigeria, UI/UX Designer Lagos, Product Designer Nigeria, Creative Web Design, Custom Website Design, Responsive Web Design Lagos, KodexKodes, Michael Olaitan, Best Website Designer Nigeria' },
        { name: 'author', content: 'KodexKodes' },
        // Robots
        { name: 'robots', content: 'index, follow' },
        // Geo Tags for Local SEO
        { name: 'geo.region', content: 'NG-LA' },
        { name: 'geo.placename', content: 'Lagos' },
        { name: 'geo.position', content: '6.5244;3.3792' },
        { name: 'ICBM', content: '6.5244, 3.3792' },
        // Open Graph / Facebook
        { property: 'og:type', content: 'website' },
        { property: 'og:url', content: 'https://kodexkode.com.ng' },
        { property: 'og:locale', content: 'en_NG' },
        { property: 'og:title', content: 'KodexKodes | Senior Software Engineer in Nigeria' },
        { property: 'og:description', content: 'Building high-performance web and mobile applications with modern technologies in Lagos, Nigeria.' },
        { property: 'og:image', content: '/images/logo.jpg' },
        // Twitter
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:url', content: 'https://kodexkode.com.ng' },
        { name: 'twitter:title', content: 'KodexKodes | Senior Software Engineer in Nigeria' },
        { name: 'twitter:description', content: 'Building high-performance web and mobile applications with modern technologies in Lagos, Nigeria.' },
        { name: 'twitter:image', content: '/images/logo.jpg' }
      ],
      htmlAttrs: {
        lang: 'en-NG'
      },
      link: [
        { rel: 'icon', type: 'image/jpeg', href: '/images/logo.jpg' },
        { rel: 'preconnect', href: 'https://cbfcnqviujmhlgzjfkxj.supabase.co' },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        { rel: 'preload', as: 'style', href: 'https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&display=swap' },
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&display=swap', media: 'print', onload: "this.media='all'" }
      ],
      script: [
        { src: 'https://code.iconify.design/iconify-icon/2.1.0/iconify-icon.min.js', tagPosition: 'bodyClose', defer: true, async: true }
      ]
    }
  },
  css: ['~/assets/css/main.css'],
  postcss: {
    plugins: {
      '@tailwindcss/postcss': {},
      'autoprefixer': {},
    },
  },
  nitro: {
    prerender: {
      crawlLinks: true,
      routes: ['/']
    }
  }
})
