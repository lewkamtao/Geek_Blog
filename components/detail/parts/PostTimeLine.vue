<template>
  <div class="PostTimeLine-wrapper part">
    <div class="main-title">发布时光鸡</div>
    <div class="form">
      <textarea
        name=""
        v-model="form.content"
        id=""
        cols="30"
        rows="10"
        placeholder="这一刻的想法..."
        resize="false"
      ></textarea>
      <button @click="submit">发布</button>
      <div class="error_tips">{{ error_tips }}</div>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  props: {},
  data() {
    return {
      form: {
        content: "",
      },
      error_tips: "",
    };
  },
  watch: {},
  computed: {},
  methods: {
    submit() {
      var data = JSON.parse(JSON.stringify(this.form));
      if (data.content == "") {
        this.error_tips = "* 内容不能为空";
        return;
      } else {
        this.error_tips = "";
      }
      this.form = {
        content: "",
      };
      data.type = "moving";
      // 博主
      if (this.$cookies.get("token")) {
        data["login-token"] = this.$cookies.get("token");
      }

      this.$axios.post("/comments", data).then((res) => {
        if (res.code == 200) {
          this.$emit("reloadComments");
        } else {
          this.error_tips = "* 发送失败，未知错误";
        }
      });
    },
  },
  created() {},
  mounted() {},
};
</script>
<style lang="scss" scoped>
.PostTimeLine-wrapper {
  .error_tips {
    margin-top: 10px;
    color: #a7342d;
  }
  .form {
    textarea {
      width: 100%;
      border-radius: 0px;
      font-size: 14px;
      border: none;
      resize: none;
      border-radius: 10px;
      transition: all 0.25s;
      background: rgba($color: #000000, $alpha: 0.02);
    }
    textarea:hover {
      background: rgba($color: #000000, $alpha: 0.035);
    }
    textarea:focus {
      background: rgba($color: #000000, $alpha: 0.05);
    }
    button {
      width: 100%;
      margin-top: 14px;
      border-radius: 0px;
      border: none;
      padding: 12px;
      font-size: 14px;
      border-radius: 10px;
      background: rgba($color: #000000, $alpha: 0.02);
      box-shadow: none;
    }
    button:hover {
      transform: none;
      box-shadow: none;
      background: rgba($color: #000000, $alpha: 0.05);
    }
  }
}
</style> 