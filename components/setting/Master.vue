<template>
  <div class="part">
    <form class="ui form">
      <h4 class="ui dividing header">个人信息</h4>

      <div class="field">
        <label>昵称</label>
        <input
          v-model="form.master_config.nickname"
          type="text"
          placeholder="昵称"
        />
      </div>

      <div class="field">
        <label>简介</label>
        <textarea
          v-model="form.master_config.description"
          rows="2"
          placeholder="简介"
        ></textarea>
      </div>
      <div class="field">
        <label>头像</label>
        <input
          v-model="form.master_config.head_img"
          type="text"
          placeholder="头像链接"
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
    master_config: {
      type: Object,
      default: function () {
        return {};
      },
    },
  },
  data() {
    return {
      loading: false,
      checkI: 0,
      form: {
        master_config: {
          nickname: "",
          description: "",
          head_img: "",
          code: "",
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

      var userdata = {
        "login-token": this.$cookies.get("token"),
        id: this.$cookies.get("user").id,
        nickname: this.form.master_config.nickname,
        description: this.form.master_config.description,
        head_img: this.form.master_config.head_img,
      };

      this.$axios.post("/users", userdata).then((res) => {
        this.loading = false;
        if (res.code == 200) {
          this.$axios.post("/options", data).then((res) => {
            if (res.code == 200) {
              this.successSubmit();
            }
          });
        }
      });
    },
    successSubmit() {
      this.$notify({
        type: "success",
        title: "恭喜！",
        message: "信息更新成功，刷新页面之后立即生效。",
        duration: 5000,
        offset: 65,
      });
    },
  },
  created() {
    this.form.master_config = this.master_config;
  },
  mounted() {},
};
</script>
<style lang="scss" scoped>
.part {
  padding: 50px;
}
</style>
