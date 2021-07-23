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
            { name: 'viewport', content: 'width=device-width, initial-scale=1' },
            { hid: 'description', name: 'description', content: '这是一个很酷的人用一个很酷的框架开发的一个很牛*的博客' }
        ],

        link: [
            { rel: 'stylesheet', type: 'text/css', href: '/css/paper.min.css' },
            { rel: 'stylesheet', type: 'text/css', href: '/css/reset.css' },
            { rel: 'stylesheet', type: 'text/css', href: '/css/main.css' },

        ],
        script: [
            { src: '//at.alicdn.com/t/font_2516905_21npos0qh6zh.js' },
        ]
    },

    // Global CSS: https://go.nuxtjs.dev/config-css
    css: [

    ],
    // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
    plugins: [
        '@/plugins/axios',
        '@/plugins/route',
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
            target: 'https://api.inis.cn/api',
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

    loading: false
}