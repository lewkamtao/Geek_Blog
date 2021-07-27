export default ({ $axios }) => {
    $axios.onRequest(config => {

    });

    $axios.onResponse(res => {
        return res.data
    });

};