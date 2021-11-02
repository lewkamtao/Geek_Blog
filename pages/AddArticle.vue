<template>
  <div class="mavonEditor">
    <no-ssr placeholder="loading...">
      <div v-if="error" class="ui message error">
        <i class="close icon"></i>
        <div class="header">发布错误！</div>
        <p>
          {{ error }}
        </p>
      </div>
      <div style="margin-bottom:20px" class="top-bar">
        <input v-model="title" type="text" placeholder="文章标题" />
        <div
          @click="add"
          class="ui fluid large teal submit button"
          style="width:120px"
          :class="{ loading: loading }"
        >
          发布
        </div>
      </div>

      <mavon-editor
        ref="md"
        placeholder="请输入文档内容..."
        :boxShadow="false"
        style="z-index:1;border: 1px solid #d9d9d9;height:100%;"
        v-model="content"
        :toolbars="toolbars"
    /></no-ssr>
  </div>
</template>

<script>
export default {
  components: {},
  head() {
    return {
      title: "添加文章"
    };
  },
  props: {},
  data() {
    return {
      token: "",
      error: "",
      title: "",
      content: "",
      loading: false,
      toolbars: {
        bold: true, // 粗体
        italic: true, // 斜体
        header: true, // 标题
        underline: true, // 下划线
        strikethrough: true, // 中划线
        mark: true, // 标记
        superscript: true, // 上角标
        subscript: true, // 下角标
        quote: true, // 引用
        ol: true, // 有序列表
        ul: true, // 无序列表
        link: true, // 链接
        imagelink: true, // 图片链接
        code: true, // code
        table: true, // 表格
        fullscreen: true, // 全屏编辑
        readmodel: true, // 沉浸式阅读
        htmlcode: true, // 展示html源码
        help: true, // 帮助
        /* 1.3.5 */
        undo: true, // 上一步
        redo: true, // 下一步
        trash: true, // 清空
        save: true, // 保存（触发events中的save事件）
        /* 1.4.2 */
        navigation: true, // 导航目录
        /* 2.1.8 */
        alignleft: true, // 左对齐
        aligncenter: true, // 居中
        alignright: true, // 右对齐
        /* 2.2.1 */
        subfield: true, // 单双栏模式
        preview: true // 预览
      }
    };
  },
  watch: {},
  computed: {},
  methods: {
    $imgAdd(pos, $file) {
      console.log(pos, $file);
    },
    add() {
      var data = {
        "login-token": this.token,
        title: this.title,
        content: this.content
      };
      this.loading = true;
      this.$axios.post("/article", data).then(res => {
        this.loading = false;
        if (res.code == "200") {
          this.$message({
            type: "success",
            message: "发布成功"
          });
          this.$router.push("/");
        } else {
          this.$message({
            type: "waining",
            message: res.tips
          });
        }
      });
    }
  },
  mounted() {},
  created: function() {
    this.token = this.$cookies.get("token");
  }
};
</script>
<style lang="scss" scoped>
.mavonEditor {
  width: 100%;
  height: 95vh;
  padding: 100px;
  .error {
    position: fixed;
    top: 10px;
    left: 50%;
    transform: translateX(-50%);
  }
  .top-bar {
    display: flex;
    justify-content: space-between;
    input {
      width: calc(100% - 150px);
      border: none;
      outline: none;
      padding: 10px;
      font-size: 20px;
    }
    input:focus {
      outline: none;
    }
  }
}
</style>
