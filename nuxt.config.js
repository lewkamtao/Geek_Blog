const Timestamp = new Date().getTime()

export default {
    // Global page headers: https://go.nuxtjs.dev/config-head
    head: {
        title: '人类关怀实验室',
        htmlAttrs: {
            lang: 'en'
        },
        meta: [
            { charset: 'utf-8' },
            { name: 'viewport', content: 'width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, viewport-fit=cover, user-scalable=0' },
        ],

        link: [],
        script: [
            { src: '//at.alicdn.com/t/font_2717088_krxcdeuzm3r.js' },
        ]
    },

    // Global CSS: https://go.nuxtjs.dev/config-css
    css: [
        '@/assets/css/paper.min.css',
        '@/assets/css/reset.css',
        { src: '@/assets/css/main.scss', lang: "scss" },

    ],
    // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
    plugins: [
        '@/plugins/axios',
        '@/plugins/route',
        '@/plugins/v-img',
        { src: '~/plugins/vue-masonry', ssr: false },
    ],

    // Auto import components: https://go.nuxtjs.dev/config-components
    components: true,

    // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
    buildModules: [
        // https://go.nuxtjs.dev/typescript
        '@nuxt/typescript-build',
    ],
    // Modules: https://go.nuxtjs.dev/config-modules
    modules: [
        // https://go.nuxtjs.dev/axios
        '@nuxtjs/axios',
        'cookie-universal-nuxt'
    ],

    // Axios module configuration: https://go.nuxtjs.dev/config-axios

    /*
     ** Axios module configuration
     */
    axios: {
        proxy: true,
        prefix: '/api/',
        credentials: true
            // See https://github.com/nuxt-community/axios-module#options
    },
    router: {
        scrollBehavior(to, from, savedPosition) {
            return { x: 0, y: 0 }
        }
    },
    proxy: {
        '/api/': {
            // target: 'https://api.zets.cn/api',
            target: 'https://api.kamtao.com/api',

            pathRewrite: {
                '^/api/': '/',
                changeOrigin: true
            }
        }
    },

    // Build Configuration: https://go.nuxtjs.dev/config-build
    build: {
        extend(config, ctx) {
            config.output.filename = `js/[name].${Timestamp}.js` // 每次构建打包时给文件名加上时间戳，保证版本更新时与上版本文件名不一样
            config.output.chunkFilename = `js/[name].${Timestamp}.js`
                // ...
        },
        extractCSS: { allChunks: true }

    },
    loading: '~/components/custom/Loading.vue'
}