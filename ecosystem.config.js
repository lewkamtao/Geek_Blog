module.exports = {
    apps: [{
        name: 'tngeekMallVueCloud',
        exec_mode: 'cluster',
        instances: '2', // Or a number of instances
        script: './node_modules/nuxt/bin/nuxt.js',
        args: 'start',
        env: {
            NODE_ENV: "production",
            PORT: 3088
        }
    }]
}