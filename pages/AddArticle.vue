<template>
  <div class="mavonEditor">
    <no-ssr placeholder="loading...">
      <mavon-editor
        ref="md"
        placeholder="请输入文档内容..."
        :boxShadow="false"
        style="z-index:1;border: 1px solid #d9d9d9;height:100%; width:calc(100vw - 450px)"
        v-model="form.content"
        :toolbars="toolbars"
      />
      <div style="width:350px;margin-left:30px;margin-top:0px" class="ui form">
        <div
          @click="back"
          class="ui fluid large red submit button"
          style="width:120px; margin-bottom:20px"
        >
          返回
        </div>
        <div class="field">
          <label>标题</label>
          <input type="text" v-model="form.title" placeholder="输入文章标题" />
        </div>
        <div class="field">
          <label>分类</label>
          <select v-model="form.sort_id" class="ui search dropdown">
            <option
              v-for="(item, index) in article_sort.data"
              :value="item.id"
              :key="'sort' + index"
              >{{ item.name }}</option
            >
          </select>
        </div>
        <div class="field">
          <label>封面URL</label>
          <input v-model="form.img_src" type="text" placeholder="URL格式" />
        </div>
        <div class="field">
          <label>描述</label>
          <textarea
            v-model="form.description"
            type="text"
            style="height:30px"
            placeholder="文章描述"
          />
        </div>
        <div
          @click="add"
          class="ui fluid large teal submit button"
          style="width:120px"
          :class="{ loading: loading }"
        >
          发布
        </div>
      </div></no-ssr
    >
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
  async asyncData({ $axios, route }) {
    var articleForm = false;
    if (route.query.id) {
      articleForm = (await $axios.get("/article?mode=md&id=" + route.query.id))
        .data;
    }

    const article_sort = (await $axios.get("/article-sort?limit=1000")).data;
    return { article_sort, articleForm };
  },
  props: {},
  data() {
    return {
      token: "",
      form: {
        title: "",
        content: "",
        description: "",
        sort_id: "",
        img_src: ""
      },
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
      var data = JSON.parse(JSON.stringify(this.form));
      data["login-token"] = this.token;
      data.sort_id = String(data.sort_id);
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
    },
    checkLogin() {
      var data = {
        "login-token": this.token
      };
      this.$axios.get("/users", data).then(res => {
        this.loading = false;
        if (res.code != "200") {
          this.$message({
            type: "waining",
            message: res.tips
          });
        }
      });
    },
    back() {
      this.$router.push("/article?id=" + this.form.id);
    }
  },
  mounted() {},
  created: function() {
    this.token = this.$cookies.get("token");
    this.checkLogin();
  },
  mounted() {
    if (this.articleForm) {
      this.form = {
        id: this.articleForm.id,
        title: this.articleForm.title,
        content: this.articleForm.content,
        description: this.articleForm.description,
        sort_id: this.articleForm.sort_id
          ? this.articleForm.sort_id.replace(/[^0-9]/gi, "")
          : "",
        img_src: this.articleForm.img_src
      };
    }
  }
};
</script>
<style lang="scss" scoped>
.mavonEditor {
  width: 100%;
  display: flex;
  height: 100vh;
  padding: 80px;
  .error {
    position: fixed;
    top: 10px;
    left: 50%;
    transform: translateX(-50%);
  }
}
</style>
