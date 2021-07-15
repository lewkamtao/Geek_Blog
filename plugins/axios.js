export default ({ redirect, $axios, }) => {
    $axios.onRequest(config => {
        // 如果是GET 要把 参数字符串化
        if (config.method == "get") {
            for (var key in config.params) {
                try {
                    config.params[key] = JSON.stringify(config.params[key])
                } catch {
                    config.params[key] = config.params[key]
                }
            }
        }
    });

    $axios.onResponse(res => {
        return res.data
    });

};