<template>
  <div class="setting-wrapper part">
    <h1>设置</h1>
    <menu-set></menu-set>
    <site-info></site-info>
    <master> </master>
    <contact></contact>
  </div>
</template>

<script>
import first_geek_config from "@/util/geek.config.js";
import Contact from "../../components/setting/Contact.vue";
import MenuSet from "../../components/setting/MenuSet.vue";
import Master from "../../components/setting/Master.vue";
import SiteInfo from "../../components/setting/SiteInfo.vue";

export default {
  components: { Contact, MenuSet, Master, SiteInfo },
  props: {},
  data() {
    return {
      geek_config_form: false,
      checkSubmit: 0,
      concact_options: [
        {
          label: "手机",
          value: "Phone",
        },
        {
          label: "QQ",
          value: "QQ",
        },
        {
          label: "微信",
          value: "Wechat",
        },
        {
          label: "微博",
          value: "Weibo",
        },
        {
          label: "邮箱",
          value: "Mail",
        },
        {
          label: "Github",
          value: "Github",
        },

        {
          label: "Instagram",
          value: "Instagram",
        },
        {
          label: "Twitter",
          value: "Twitter",
        },
        {
          label: "Wordpress",
          value: "Wordpress",
        },
        {
          label: "Youtube",
          value: "Youtube",
        },
      ],
    };
  },
  watch: {},
  computed: {},
  methods: {
    addConcactItem() {
      this.geek_config_form.master_info.concact_array.push({
        key: "",
        value: "",
      });
    },
    async getOption() {
      const res_geek_config = await this.$axios.get(
        "/options?key=geek_config&cache=false"
      );
      if (res_geek_config.code == 200 && res_geek_config.data.opt) {
        this.geek_config_form = res_geek_config.data.opt;
        if (this.geek_config_form.master_info.concact_array.length == 0) {
          this.geek_config_form.master_info.concact_array[0] = {
            key: "",
            value: "",
          };
        }
      } else {
        this.geek_config_form = first_geek_config.geek_config;
      }
    },
    submit() {
      if (this.$cookies.get("token")) {
        var form = JSON.parse(JSON.stringify(this.geek_config_form));

        form.master_info.concact_array = form.master_info.concact_array.filter(
          (item) => {
            return item.key != "" && item.value != "";
          }
        );

        var data = {
          "login-token": this.$cookies.get("token"),
          keys: "geek_config",
          opt: form,
        };

        this.$axios.post("/options", data).then((res) => {
          if (res.code == 200) {
            this.checkSubmit += 1;
            this.reload();
          }
        });

        var userdata = {
          "login-token": this.$cookies.get("token"),
          id: this.$cookies.get("user").id,
          nickname: this.geek_config_form.master_info.nickname,
          description: this.geek_config_form.master_info.description,
          email: this.geek_config_form.master_info.email,
          phone: this.geek_config_form.master_info.phone,
          head_img: this.geek_config_form.master_info.head_img,
        };

        this.$axios.post("/users", userdata).then((res) => {
          if (res.code == 200) {
            this.checkSubmit += 1;
            this.reload();
          }
        });
      }
    },
    reload() {
      if (this.checkSubmit == 2) {
        location.reload();
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
.setting-wrapper {
  padding: 30px;
}
</style>
