import Vue from "vue";

export default ({ $axios, $cookies }) => {
  $axios.onRequest((config) => {});

  $axios.onResponse((res) => {
    if (res.data.code == 403) {
      window.location.replace("/login?token_status=403");
      $cookies.remove("token");
    }

    if (res.data.code && res.data.code != 200 && res.data.code != 204) {
      Vue.prototype.$notify({
        type: "warning",
        title: "注意",
        message: res.data.msg || res.data.code + "：未知错误原因",
        duration: 5000,
        offset: 65,
      });
    }
    return res.data;
  });
};
