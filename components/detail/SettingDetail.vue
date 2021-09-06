<template>
  <div v-if="geek_config_form" class="setting-wrapper">
    <div
      style="padding-top: 0px; margin-top: 0px"
      id="setting_menu"
      class="header"
    ></div>
    <menu-set :menu_config="geek_config_form.menu_config"></menu-set>
    <h2 id="setting_siteinfo" class="header"></h2>
    <site-info :site_config="geek_config_form.site_config"></site-info>
    <h2 id="setting_master" class="header"></h2>
    <master :master_config="geek_config_form.master_config">> </master>
    <h2 id="setting_image" class="header"></h2>
    <image-set :images_config="geek_config_form.images_config">></image-set>
    <h2 id="setting_contact" class="header"></h2>
    <contact :contact_config="geek_config_form.contact_config">></contact>
  </div>
</template>

<script>
import first_geek_config from "@/util/geek.config.js";
import Contact from "../../components/setting/Contact.vue";
import MenuSet from "../../components/setting/MenuSet.vue";
import Master from "../../components/setting/Master.vue";
import SiteInfo from "../../components/setting/SiteInfo.vue";
import ImageSet from "../../components/setting/ImageSet.vue";

export default {
  components: { Contact, MenuSet, Master, SiteInfo, ImageSet },
  props: {},
  data() {
    return {
      geek_config_form: false,
    };
  },
  watch: {},
  computed: {},
  methods: {
    async getOption() {
      const res_geek_config = await this.$axios.get(
        "/options?key=geek_config&cache=false"
      );
      if (res_geek_config.code == 200 && res_geek_config.data.opt) {
        this.geek_config_form = res_geek_config.data.opt;
      } else {
        var data = {
          "login-token": this.$cookies.get("token"),
          keys: "geek_config",
          opt: first_geek_config.geek_config,
        };
        this.$axios.post("/options", data).then((res) => {
          this.geek_config_form = first_geek_config.geek_config;
        });
      }
    },
  },
  created() {
    this.getOption();
  },
  mounted() {},
};
</script>
<style lang="scss" scoped>
.header {
  padding-top: 60px;
  margin-top: -52px;
}
</style>

