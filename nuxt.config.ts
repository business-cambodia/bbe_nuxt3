// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  app: {
    head: {
      title: 'Expo Event',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'format-detection', content: 'telephone=no' },
        {
          hid: 'description',
          name: 'description',
          content:
            "Expo Event is Cambodia's most popular business website. This website aims to provide Cambodian young entrepreneur most useful resources for starting and leading their business or enterprise.",
        },
        {
          name: 'keywords',
          content:
            'expo-event,',
        },
      ],
      link: [
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Hanuman:wght@100;300;400;700;900&family=Titillium+Web:ital,wght@0,200;0,300;0,400;0,600;0,700;0,900;1,200;1,300;1,400;1,600;1,700&display=swap',
        },
        { rel: 'icon', type: 'image/x-icon', href: '/static/expo-logo.jpg' },
      ],
      script: [
        {
          src: "https://www.googletagmanager.com/gtag/js?id=G-WZQS4EP92J",
          async: true,
        },
        {
          hid: 'gtmHead',
          innerHTML: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-WZQS4EP92J');
          `,
        },
      ],
    },
  },
  css: ['~/assets/css/main.css', '~/assets/css/index.css'],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  runtimeConfig: {
    public: {
      API_BASE_URL: process.env.API_BASE_URL,
    },
  },
});
