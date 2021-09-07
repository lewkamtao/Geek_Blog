<template>
  <div class="part">
    <form class="ui form">
      <h4 class="ui dividing header">图片设置</h4>

      <div class="field">
        <label>关于背景图链接</label>
        <input
          v-model="form.images_config.bg_about"
          type="text"
          placeholder="图片链接"
        />
      </div>
      <div class="field">
        <label>时光机背景图链接</label>
        <input
          v-model="form.images_config.bg_timeline"
          type="text"
          placeholder="图片链接"
        />
      </div>
      <div class="field">
        <label>留言背景图链接</label>
        <input
          v-model="form.images_config.bg_msgwall"
          type="text"
          placeholder="图片链接"
        />
      </div>
      <div class="field">
        <label>友情链接背景图链接</label>
        <input
          v-model="form.images_config.bg_links"
          type="text"
          placeholder="图片链接"
        />
      </div>
      <div
        class="ui button blue"
        :class="{ loading: loading }"
        @click="submit"
        tabindex="0"
      >
        保存配置
      </div>
    </form>
  </div>
</template>

<script>
export default {
  components: {},
  props: {
    images_config: {
      type: Object,
      default: function () {
        return {};
      },
    },
  },
  data() {
    return {
      loading: false,
      form: {
        images_config: {
          bg_about: "",
          bg_timeline: "",
          bg_msgwall: "",
          bg_links: "",
        },
      },
    };
  },
  watch: {},
  computed: {},
  methods: {
    submit() {
      this.loading = true;
      var data = {
        "login-token": this.$cookies.get("token"),
        keys: "geek_config",
        opt: this.form,
      };
      this.$axios.post("/options", data).then((res) => {
        this.loading = false;
        if (res.code == 200) {
          this.$notify({
            type: "success",
            title: "恭喜！",
            message: "配置成功，刷新页面之后立即生效。",
            duration: 5000,
            offset: 65,
          });
        }
      });
    },
  },
  created() {
    this.form.images_config = this.images_config;
  },
  mounted() {},
};
</script>
<style lang="scss" scoped>
.part {
  padding: 50px;
}
</style>
