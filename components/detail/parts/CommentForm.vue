<template>
  <form class="ui reply form">
    <div class="field">
      <div class="field">
        <div class="two fields">
          <div class="field">
            <input
              v-if="!isLogin"
              v-model="form.nickname"
              type="text"
              placeholder="昵称"
            />
          </div>
          <div class="field">
            <input
              v-if="!isLogin"
              v-model="form.email"
              type="text"
              placeholder="邮箱"
            />
          </div>
        </div>
      </div>
      <div class="field">
        <input
          v-if="!isLogin"
          v-model="form.url"
          type="text"
          placeholder="站点"
        />
      </div>
      <div class="field">
        <textarea
          v-model="form.content"
          placeholder="这一刻的想法..."
        ></textarea>
      </div>
    </div>
    <div @click="submit" class="ui blue labeled submit icon button">
      <i class="icon edit"></i> 发表评论
    </div>
  </form>
</template>

<script>
import checkStr from "@/util/checkStr";

export default {
  props: {
    type: {
      type: String,
      default: {},
    },
    pid: {
      type: Number,
      default: 0,
    },
    articleId: {
      type: Number,
      default: 0,
    },
    isLogin: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      form: {
        email: "",
        nickname: "",
        url: "",
        content: "",
      },
    };
  },
  mounted() {
    this.setForm(); // 设置评论类型
  },
  methods: {
    setForm() {
      this.form = {
        email: "",
        nickname: "",
        url: "",
        content: "",
      };
      switch (this.type) {
        case "article":
          this.form.article_id = this.articleId;
          break;
        case "links":
          this.form.type = "links";
          break;
        case "msg_wall":
          this.form.type = "msg_wall";
          break;
        case "about":
          this.form.type = "about";
          break;
        case "moving":
          this.form.type = "moving";
          break;
        default:
          break;
      }
      var token = this.$cookies.get("token");
      // 博主
      if (token) {
        this.form["login-token"] = token;
      }
      if (this.pid) {
        this.form.pid = this.pid;
      }
    },

    submit() {
      var _form = JSON.parse(JSON.stringify(this.form));

      if (!this.isLogin) {
        if (_form.nickname == "") {
          this.$notify({
            type: "warning",
            title: "请补充完整信息",
            message: "昵称未填写",
            duration: 5000,
            offset: 65,
          });
          return;
        }

        if (_form.email == "") {
          this.$notify({
            type: "warning",
            title: "请补充完整信息",
            message: "邮箱未填写",
            duration: 5000,
            offset: 65,
          });
          return;
        }

        if (!checkStr(_form.email, "email")) {
          this.$notify({
            type: "warning",
            title: "格式错误",
            message: "邮箱格式错误",
            duration: 5000,
            offset: 65,
          });
          return;
        }

        if (_form.url && !checkStr(_form.url, "URL")) {
          this.$notify({
            type: "warning",
            title: "格式错误",
            message: "URL格式错误",
            duration: 5000,
            offset: 65,
          });
          return;
        }
      }

      if (_form.content == "") {
        this.$notify({
          type: "warning",
          title: "请补充完整信息",
          message: "内容未填写",
          duration: 5000,
          offset: 65,
        });
        return;
      }

      this.$axios.post("/comments", _form).then((res) => {
        if (res.code == 200) {
          this.$emit("reloadComments");
          this.setForm();
        } else {
          this.$notify({
            type: "error",
            title: "发送错误",
            message: "错误代码：" + res.code,
            duration: 5000,
            offset: 65,
          });
        }
      });
    },
  },
};
</script>

<style>
</style>
