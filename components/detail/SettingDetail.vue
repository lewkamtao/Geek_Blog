<template>
  <div v-if="geek_config" class="setting-wrapper">
    <div
      style="padding-top: 0px; margin-top: 0px"
      id="setting_menu"
      class="header"
    ></div>
    <menu-set :menu_config="geek_config.menu_config"></menu-set>
    <h2 id="setting_siteinfo" class="header"></h2>
    <site-info :site_config="geek_config.site_config"></site-info>
    <h2 id="setting_master" class="header"></h2>
    <master :master_config="geek_config.master_config"> </master>
    <h2 id="setting_image" class="header"></h2>
    <image-set :images_config="geek_config.images_config"></image-set>
    <h2 id="setting_contact" class="header"></h2>
    <contact :contact_config="geek_config.contact_config"></contact>
  </div>
</template>

<script>
import Contact from "../../components/setting/Contact.vue";
import MenuSet from "../../components/setting/MenuSet.vue";
import Master from "../../components/setting/Master.vue";
import SiteInfo from "../../components/setting/SiteInfo.vue";
import ImageSet from "../../components/setting/ImageSet.vue";

export default {
  components: { Contact, MenuSet, Master, SiteInfo, ImageSet },
  props: {
    geek_config: {
      type: Object,
      default: function () {
        return {};
      },
    },
  },
  data() {
    return {};
  },
  watch: {},
  computed: {},
  methods: {},
  created() {},
  mounted() {},
};
</script>
<style lang="scss" >
@media screen and (max-width: 1025px) {
  .setting-wrapper {
    padding: 0px;
    .part {
      padding: 15px;
      .fields {
        .field {
          margin-bottom: 20px;
        }
      }
    }
  }
}
</style>
<style lang="scss" scoped>
.header {
  padding-top: 60px;
  margin-top: -52px;
}
</style>

