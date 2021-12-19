const Timestamp = new Date().getTime();
const axios = require('axios')

export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: "Geek",

    meta: [
      {charset: "utf-8"},
      {
        name: "viewport",
        content:
          "width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, viewport-fit=cover, user-scalable=0",
      },
    ],
    link: [],
    script: [
      {src: "//at.alicdn.com/t/font_2717088_fiq9yisuhzq.js"},
      {src: "https://cdn.bootcdn.net/ajax/libs/jquery/3.3.1/jquery.min.js"},
      {
        src: "https://cdn.jsdelivr.net/npm/@fancyapps/ui@4.0/dist/fancybox.umd.js",
      },
    ],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    "@/assets/css/fancybox.css",
    "@/assets/css/fancybox-theme.css",
    "@/assets/css/reset.css",
    "@/assets/css/highlight/code-highlight.scss",
    "@/assets/css/highlight/highlight-dark.scss",
    "@/assets/css/plugins/tag-plugins.scss",
    {src: "@/assets/css/main.scss", lang: "scss"},
  ],
  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    "@/plugins/axios",
    "@/plugins/route",
    "@/plugins/v-img",
    "@/plugins/element-ui.js",
    "@/plugins/vueMarkdown.js",
    "@/plugins/code-highlight.js",
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    "@nuxt/typescript-build",
  ],
  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    "semantic-ui-vue/nuxt", // includes styles from semantic-ui-css
    ["semantic-ui-vue/nuxt", {css: false}], // if you have your own semantic-ui styles
    "@nuxtjs/axios",
    "cookie-universal-nuxt",
    "@nuxtjs/sitemap"
  ],
  /*
   ** Axios module configuration
   */
  axios: {
    proxy: true,
    credentials: true,
    // See https://github.com/nuxt-community/axios-module#options
  },
  router: {
    scrollBehavior(to, from, savedPosition) {
      return {x: 0, y: 0};
    },
  },
  proxy: {
    "/api/": {
      // 请填写你的后台接口地址
      target: "https://blog-api.hasaik.com/api",
      pathRewrite: {
        "^/api/": "",
      },
    },
    "/geek/": {
      // 请填写你的后台接口地址
      target: "https://pic.sogou.com",
      pathRewrite: {
        "^/geek/": "",
      },
    },
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    extend(config, ctx) {
      config.output.filename = `js/[name].${Timestamp}.js`; // 每次构建打包时给文件名加上时间戳，保证版本更新时与上版本文件名不一样
      config.output.chunkFilename = `js/[name].${Timestamp}.js`;
      // ...
    },
    extractCSS: {allChunks: true},
    vendor: ["element-ui"],
  },
  loading: "~/components/custom/Loading.vue",
  // seo站点地图
  sitemap: {
    path: '/sitemap.xml', // sitemap path
    hostname: 'https://blog.hasaik.com', // sitemap网址的前缀（你的前端域名）
    cacheTime: 60 * 60 * 6, //  更新频率，只在 generate: false有用
    gzip: true, // 生成 .xml.gz 压缩的 sitemap
    generate: false, // 允许使用 nuxt generate 生成
    // 排除不要页面
    exclude: [
      '/404', '/About', '/Music', '/AddArticle', '/GetStart', '/ArticleBySort', '/MsgWall', '/Login', '/Links', '/Photo', '/Setting', '/Timeline'
    ],
    routes: async () => {
      // 你的前端域名
      return await axios.get('https://blog.hasaik.com/api/article?limit=10000').then(res => {
        let articleList = Array.from(res.data.data.data)
        let siteArray = [];
        let siteObject = {};
        articleList.forEach(article => {
          siteObject = {
            url: `/Article?id=${article.id}`,
            changefred: 'daily',
            lastmod: article.update_time
          }
          siteArray.push(siteObject);
        });
        return siteArray;
      });
    }
  }
};
