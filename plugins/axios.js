export default ({ $axios }) => {


    $axios.onRequest(config => {
        config.headers.post['Content-Type'] = 'application/json'
        config.headers.patch['Content-Type'] = 'application/json'
        config.headers.put['Content-Type'] = 'application/json'
    });

    $axios.onResponse(res => {

        return res.data
    });

};