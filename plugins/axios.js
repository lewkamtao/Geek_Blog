import Vue from "vue";

export default ({ $axios, $cookies }) => {
  $axios.onRequest(config => {});

  $axios.onResponse(res => {
    if (res.data.code == 400) {
      window.location.replace("/login?token_status=400");
      $cookies.remove("token");
    }

    if (res.data.code && res.data.code != 200) {
      Vue.prototype.$notify({
        type: "error",
        title: "很遗憾！",
        message: res.data.mes || res.data.code + "：未知错误原因",
        duration: 5000,
        offset: 65
      });
    }
    return res.data;
  });
};
