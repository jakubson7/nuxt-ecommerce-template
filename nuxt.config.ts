export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ["@nuxtjs/i18n", "@nuxt/ui"],
  nitro: {
    prerender: {
      // Needed for cloudflare pages
      autoSubfolderIndex: false,
    },
  },
  i18n: {
    vueI18n: "./i18n/config.ts",
    defaultLocale: "pl",
    locales: ["pl", "en"],
    strategy: "prefix_except_default",
    detectBrowserLanguage: {
      alwaysRedirect: true,
      useCookie: true,
      redirectOn: "root",
    },
    experimental: {
      localeDetector: "./i18n/localeDetector",
    },
  },
});
