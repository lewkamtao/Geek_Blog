<template>
  <div class="part">
    <form class="ui form">
      <h4 class="ui dividing header">社交媒体配置</h4>
      <div
        v-if="message.type"
        class="ui positive message"
        :class="message.type"
      >
        <i @click="message.type == ''" class="close icon"></i>
        <div class="header">真棒！当前配置有效。</div>
        <p>你可以随时修改这些信息</p>
      </div>
      <div
        v-for="(contact_config, index) in form.contact_config"
        :key="'contact_config' + index"
        class="fields contact-box"
      >
        <div class="four wide field">
          <label>社交平台</label>
          <select
            class="ui fluid search dropdown"
            v-model="contact_config.platform"
            placeholder="请选择"
          >
            <option
              v-for="(option, index) in contact_options"
              :key="'contact_options' + index"
              :value="option.value"
            >
              {{ option.label }}
            </option>
          </select>
        </div>

        <div class="six wide field">
          <label>{{ getContactLabel(contact_config.platform) }}</label>
          <div style="display: flex">
            <input
              v-model="contact_config.value"
              type="text"
              placeholder="你的社交媒体链接"
            />
            <div
              v-show="!getContactNickname(contact_config.platform)"
              v-if="form.contact_config.length != 1"
              @click="del(index)"
              :style="`
              margin-left: 15px;
              width:45px;
              padding: 5px;
              display: flex;
              justify-content: center;
              align-items: center;
            `"
              class="ui red button"
            >
              <i style="margin-right: 0px" class="minus icon"></i>
            </div>
          </div>
        </div>

        <div class="eight wide field">
          <label v-show="getContactNickname(contact_config.platform)">{{
            getContactNickname(contact_config.platform)
          }}</label>
          <div style="display: flex">
            <input
              v-show="getContactNickname(contact_config.platform)"
              v-model="contact_config.nickname"
              type="text"
              placeholder="你的昵称"
            />
            <div
              v-show="getContactNickname(contact_config.platform)"
              v-if="form.contact_config.length != 1"
              @click="del(index)"
              :style="`
              margin-left: 15px;
              padding: 5px;
              width:45px;
              display: flex;
justify-content: center;
              align-items: center;
            `"
              class="ui red button mini"
            >
              <i
                style="margin-right: 0px; margin-left: 0px"
                class="minus icon"
              ></i>
            </div>
          </div>
        </div>
      </div>
      <div @click="add" class="ui button">
        <i style="margin-right: 0px" class="add icon"></i> 添加多一个
      </div>
      <div
        @click="submit"
        style="margin-left: 10px"
        class="ui button blue"
        :class="{ loading: loading }"
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
    contact_config: {
      type: Array,
      default: function () {
        return [];
      },
    },
  },
  data() {
    return {
      loading: false,
      message: {
        type: "", // message:success / negative / warning
        title: "",
        info: "",
      },
      contact_options: [
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
      form: {
        contact_config: [],
      },
    };
  },
  watch: {},
  computed: {
    getContactLabel() {
      return function (platform) {
        switch (platform) {
          case "Phone": {
            return "手机号";
          }
          case "QQ": {
            return "QQ账号";
          }
          case "Wechat": {
            return "微信号";
          }
          case "Weibo": {
            return "微博主页链接";
          }
          case "Mail": {
            return "邮箱地址";
          }
          case "Github": {
            return "主页链接";
          }
          case "Instagram": {
            return "主页链接";
          }
          case "Twitter": {
            return "主页链接";
          }
          case "Wordpress": {
            return "主页链接";
          }
          case "Youtube": {
            return "主页链接";
          }
          default: {
            return "链接";
            break;
          }
        }
      };
    },
    getContactNickname() {
      return function (platform) {
        switch (platform) {
          case "Phone": {
            return false;
          }
          case "QQ": {
            return false;
          }
          case "Wechat": {
            return false;
          }
          case "Weibo": {
            return "微博名";
          }
          case "Mail": {
            return false;
          }
          case "Github": {
            return "昵称";
          }
          case "Instagram": {
            return "昵称";
          }
          case "Twitter": {
            return "昵称";
          }
          case "Wordpress": {
            return "昵称";
          }
          case "Youtube": {
            return "昵称";
          }
          default: {
            return "昵称";
          }
        }
      };
    },
  },
  methods: {
    add() {
      this.form.contact_config.push({
        platform: "",
        value: "",
        nickname: "",
      });
    },
    del(index) {
      if (this.form.contact_config.length == 1) {
        return;
      } else {
        this.form.contact_config.splice(index, 1);
      }
    },
    checkForm(form) {
      for (let i = 0; i <= form.contact_config.length - 1; i++) {
        if (form.contact_config[i].platform == "") {
          this.$notify({
            type: "warning",
            title: "请补充完整信息",
            message: "请选择社交平台",
            duration: 5000,
            offset: 65,
          });
          return false;
        }

        switch (form.contact_config[i].platform) {
          case "Phone": {
            if (form.contact_config[i].value == "") {
              this.$notify({
                type: "warning",
                title: "请补充完整信息",
                message: "请填写手机号",
                duration: 5000,
                offset: 65,
              });
              return false;
            }
            break;
          }
          case "QQ": {
            if (form.contact_config[i].value == "") {
              this.$notify({
                type: "warning",
                title: "请补充完整信息",
                message: "请填写QQ账号",
                duration: 5000,
                offset: 65,
              });
              return false;
            }
            break;
          }
          case "Wechat": {
            if (form.contact_config[i].value == "") {
              this.$notify({
                type: "warning",
                title: "请补充完整信息",
                message: "请填写微信号",
                duration: 5000,
                offset: 65,
              });
              return false;
            }
            break;
          }
          case "Weibo": {
            if (form.contact_config[i].value == "") {
              this.$notify({
                type: "warning",
                title: "请补充完整信息",
                message: "请填写微博主页链接",
                duration: 5000,
                offset: 65,
              });
              return false;
            }
            if (form.contact_config[i].nickname == "") {
              this.$notify({
                type: "warning",
                title: "请补充完整信息",
                message: "请填写微博名",
                duration: 5000,
                offset: 65,
              });
              return false;
            }
            break;
          }
          case "Mail": {
            if (form.contact_config[i].value == "") {
              this.$notify({
                type: "warning",
                title: "请补充完整信息",
                message: "请填写邮箱地址",
                duration: 5000,
                offset: 65,
              });
              return false;
            }
            break;
          }
          case "Github": {
            if (form.contact_config[i].value == "") {
              this.$notify({
                type: "warning",
                title: "请补充完整信息",
                message: "请填写 Github 主页链接",
                duration: 5000,
                offset: 65,
              });
              return false;
            }
            if (form.contact_config[i].nickname == "") {
              this.$notify({
                type: "warning",
                title: "请补充完整信息",
                message: "请填写 Github 昵称",
                duration: 5000,
                offset: 65,
              });
              return false;
            }
            break;
          }
          case "Instagram": {
            if (form.contact_config[i].value == "") {
              this.$notify({
                type: "warning",
                title: "请补充完整信息",
                message: "请填写 Instagram 主页链接",
                duration: 5000,
                offset: 65,
              });
              return false;
            }
            if (form.contact_config[i].nickname == "") {
              this.$notify({
                type: "warning",
                title: "请补充完整信息",
                message: "请填写 Instagram 昵称",
                duration: 5000,
                offset: 65,
              });
              return false;
            }
            break;
          }
          case "Twitter": {
            if (form.contact_config[i].value == "") {
              this.$notify({
                type: "warning",
                title: "请补充完整信息",
                message: "请填写 Twitter 主页链接",
                duration: 5000,
                offset: 65,
              });
              return false;
            }
            if (form.contact_config[i].nickname == "") {
              this.$notify({
                type: "warning",
                title: "请补充完整信息",
                message: "请填写 Twitter 昵称",
                duration: 5000,
                offset: 65,
              });
              return false;
            }
            break;
          }
          case "Wordpress": {
            if (form.contact_config[i].value == "") {
              this.$notify({
                type: "warning",
                title: "请补充完整信息",
                message: "请填写 Wordpress 主页链接",
                duration: 5000,
                offset: 65,
              });
              return false;
            }
            if (form.contact_config[i].nickname == "") {
              this.$notify({
                type: "warning",
                title: "请补充完整信息",
                message: "请填写 Wordpress 昵称",
                duration: 5000,
                offset: 65,
              });
              return false;
            }
            break;
          }
          case "Youtube": {
            if (form.contact_config[i].value == "") {
              this.$notify({
                type: "warning",
                title: "请补充完整信息",
                message: "请填写 Youtube 主页链接",
                duration: 5000,
                offset: 65,
              });
              return false;
            }
            if (form.contact_config[i].nickname == "") {
              this.$notify({
                type: "warning",
                title: "请补充完整信息",
                message: "请填写 Youtube 昵称",
                duration: 5000,
                offset: 65,
              });
              return false;
            }
            break;
          }
          default: {
            return;
          }
        }
      }
      return true;
    },

    submit() {
      this.loading = true;
      var form = JSON.parse(JSON.stringify(this.form));
      if (this.checkForm(form)) {
        var data = {
          "login-token": this.$cookies.get("token"),
          keys: "geek_config",
          opt: this.form,
        };
        this.$axios.post("/api/options/save", data).then((res) => {
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
      } else {
        this.loading = false;
      }
    },
  },
  created() {
    this.form.contact_config = this.contact_config;
    if (this.form.contact_config.length == 0) {
      this.add();
    }
  },
  mounted() {},
};
</script>
<style lang="scss" scoped>
.part {
  padding: 50px;
}
.contact-box {
  padding: 15px 0px 0px 0px;
}
.contact-box:first-child {
  border-bottom: none;
}
</style>
