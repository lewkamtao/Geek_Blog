<template>
  <div class="wrapper">
    <div class="ui message success">
      <i class="close icon"></i>
      <div class="header">恭喜！站点部署成功！</div>
      <p>
        接下来你需要完成以下一些配置，你也可以
        <nuxt-link to="/">
          <b>跳过此步骤</b>
        </nuxt-link>
        ，直接进入主页。<br />以后你还可以登录账号之后在设置中配置这些信息。
      </p>
    </div>
    <setting-detail :geek_config="geek_config"></setting-detail>
  </div>
</template>

<script>
// 这里是留言墙的id 注意要是文章的id 文章标题必须是：留言墙
import SettingDetail from "@/components/detail/SettingDetail";
import first_geek_config from "@/util/geek.config.js";

export default {
  components: { SettingDetail },
  head() {
    return {
      title: "起步",
    };
  },
  props: {},
  async asyncData({ $axios, $cookies }) {
    var geek_config = {};
    try {
      const res_geek_config = await $axios.get(
        "/options?key=geek_config&cache=false"
      );
      if (res_geek_config.code == 200 && res_geek_config.data.opt) {
        geek_config = res_geek_config.data.opt;
      } else {
        var data = {
          "login-token": $cookies.get("token"),
          keys: "geek_config",
          opt: first_geek_config.geek_config,
        };
        $axios.post("/options", data);
        geek_config = first_geek_config.geek_config;
      }
    } catch {
      var data = {
        "login-token": $cookies.get("token"),
        keys: "geek_config",
        opt: first_geek_config.geek_config,
      };
      $axios.post("/options", data);
      geek_config = first_geek_config.geek_config;
    }
    return { geek_config };
  },
  data() {
    return {};
  },
  watch: {},
  computed: {},
  methods: {
    async getConfig() {
      const res_geek_config = await this.$axios.get(
        "/options?key=geek_config&cache=false"
      );
      if (res_geek_config.code == 200 && res_geek_config.data.opt) {
        this.geek_config = res_geek_config.data.opt;
      } else {
        var data = {
          "login-token": this.$cookies.get("token"),
          keys: "geek_config",
          opt: first_geek_config.geek_config,
        };
        $axios.post("/options", data);
        geek_config = first_geek_config.geek_config;
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.wrapper {
  width: 1200px;
  margin: 0px auto;
  padding: 50px;
}
</style>
