// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: false },
  css: ["~/assets/css/main.css", "~/assets/css/skeleton.css"],
  modules: ["@formkit/nuxt", "@pinia/nuxt", '@pinia-plugin-persistedstate/nuxt', "nuxt3-leaflet", "nuxt-vue3-google-signin"],
  plugins: [],
  googleSignIn: {
    clientId: '699315456473-u67qba4e7jk67qtric02vgbk8dn21utq.apps.googleusercontent.com'
  },
  runtimeConfig: {
    googleClientId: '699315456473-u67qba4e7jk67qtric02vgbk8dn21utq.apps.googleusercontent.com',
    dburl: process.env.DAATABASE_URL,
    dbName: process.env.DBNAME,
    user: process.env.DBUSERNAME,
    pass: process.env.DBPASSWORD,
    authSource: process.env.DBAUTHSOURCE,
  },
  imports: {
    dirs: ["composables/**"],
  },
  // publicDir: 'public',
  app: {
    // pageTransition:{name:'page', mode:'out-in'},
    // layoutTransition:{name:'page', mode:'in-out'},
    head: {
      charset: "utf-16",
      viewport: "width=500, initial-scale=1",
      title: "Easetrail - Write your title here for Home Page",
      meta: [
        {
          name: "description",
          content: "Easetrail - Your go-to destination for daily needs. Find a wide range of services from beauty and wellness to home repairs, travel & accommodations, and educational institutions.",
        },
        {
          name: "google-site-verification",
          content: "waqW6VuV5PuFqy7WxunLx6txHcAe40Ua6ZdrqVe7mIs",
        },
      ],
      link: [
        {
          rel: 'stylesheet',
          href: 'https://cdn.quilljs.com/1.3.6/quill.snow.css',
        },
        {
          rel: 'stylesheet',
          href: 'https://unpkg.com/leaflet@1.6.0/dist/leaflet.css',
        },
      ],
      script: [
        {src:'https://cdn.quilljs.com/1.3.6/quill.js'}
      ],
    },
  },
  ssr: true,
});
