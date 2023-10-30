// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: false },
  css: ["~/assets/css/main.css", "~/assets/css/skeleton.css", 'animate.css/animate.min.css'],
  modules: ["@formkit/nuxt", "@pinia/nuxt", '@pinia-plugin-persistedstate/nuxt', "nuxt3-leaflet", "nuxt-vue3-google-signin"],
  plugins: ['~/plugins/domReady.js', '~/plugins/custom-tabs-accordion.js'],
  googleSignIn: {
    clientId: '661329983036-oc2q7gjc12ekg9qnkgid9g9oiakt0abi.apps.googleusercontent.com'
  },
  runtimeConfig: {
    googleClientId: '661329983036-oc2q7gjc12ekg9qnkgid9g9oiakt0abi.apps.googleusercontent.com',
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

      // viewport: "width=500, initial-scale=1",

      title: "Easetrail - Write your title here for Home Page",
      meta: [
         {
          name: "viewport",
          content: "width=device-width, initial-scale=1",
        },
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
