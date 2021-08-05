export default ({ $axios, $cookies }) => {
    $axios.onRequest(config => {

    });

    $axios.onResponse(res => {
        if (res.data.code == 403) {
            window.location.replace("/login?token_status=403");
            $cookies.remove("token")
        }
        return res.data
    });

};