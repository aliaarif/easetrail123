// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: false },
  css: ["~/assets/css/main.css"],
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
  app: {
    pageTransition:{name:'page', mode:'out-in'},
    head: {
      charset: "utf-16",
      viewport: "width=500, initial-scale=1",
      title: "Easetrail - Write your title here for Home Page",
      meta: [
        {
          name: "description",
          content: "Write your description here for Home Page",
        },
      ],
      link: [
        {
          rel: 'stylesheet',
          href: 'https://unpkg.com/leaflet@1.6.0/dist/leaflet.css',
        },
      ],
      script: [],
    },
  },
  ssr: true,
});
