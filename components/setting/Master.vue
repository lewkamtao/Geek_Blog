<template>
  <div class="part">
    <form class="ui form">
      <h4 class="ui dividing header">个人信息</h4>

      <div
        v-if="message.type"
        class="ui positive message"
        :class="message.type"
      >
        <i @click="message.type = ''" class="close icon"></i>
        <div class="header">真棒！当前配置有效。</div>
        <p>你可以随时修改这些信息</p>
      </div>
      <div class="field">
        <label>昵称</label>
        <input
          v-model="form.master_config.nickname"
          type="text"
          placeholder="中间名"
        />
      </div>

      <div class="field">
        <label>简介</label>
        <textarea v-model="form.master_config.description" rows="2"></textarea>
      </div>
      <div class="two fields">
        <div class="field">
          <label>手机号</label>
          <input
            v-model="form.master_config.phone"
            type="text"
            name="shipping[first-name]"
            placeholder="First Name"
          />
        </div>
        <div class="field">
          <label>邮箱</label>
          <input
            v-model="form.master_config.email"
            type="text"
            name="shipping[last-name]"
            placeholder="Last Name"
          />
        </div>
      </div>
      <div class="field">
        <label>头像链接</label>
        <input
          v-model="form.master_config.head_img"
          type="text"
          placeholder="中间名"
        />
      </div>
      <div class="ui button blue" tabindex="0">保存配置</div>
    </form>
  </div>
</template>

<script>
export default {
  components: {},
  props: {},
  data() {
    return {
      message: {
        type: "negative", // message:success / negative
        title: "",
        info: "",
      },
      form: {
        master_config: {
          nickname: "小卢他人不错",
          description: "98年前端工程师，做一个很酷的人。",
          email: "div@kamtao.com",
          phone: "15818934279",
          head_img: "https://q2.qlogo.cn/g?b=qq&nk=1057072668&s=100",
        },
      },
    };
  },
  watch: {},
  computed: {},
  methods: {
    submit() {
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
    },
  },
  created() {},
  mounted() {},
};
</script>
<style lang="scss" scoped>
.part {
  padding: 50px;
}
</style>
