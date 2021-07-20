<template>
  <div class="article-wrapper">
    <div class="vditor-reset" id="vditorPreview"></div>
  </div>
</template>

<script>
import VditorPreview from "vditor/dist/method.min";
export default {
  head() {
    return {
      title: "文章",
      link: [
        {
          rel: "stylesheet",
          type: "text/css",
          href:
            "https://cdn.bootcdn.net/ajax/libs/font-awesome/5.15.3/css/all.css"
        },
        {
          rel: "stylesheet",
          type: "text/css",
          href: "https://cdn.jsdelivr.net/npm/vditor/dist/index.css"
        }
      ],
      script: []
    };
  },
  components: {},
  props: {
    article: {
      type: Object,
      default: {}
    }
  },
  data() {
    return {};
  },
  watch: {
    article: function() {
      this.renderMarkdown(this.article.content);
    }
  },
  computed: {},
  methods: {
    renderMarkdown(md) {
      VditorPreview.preview(document.getElementById("vditorPreview"), md, {
        hljs: { style: "github" }
      });
    }
  },
  created() {},
  mounted() {
    this.renderMarkdown(this.article.content);
  }
};
</script>
<style lang="scss" scoped>
.article-wrapper {
  min-height: calc(100vh - 60px);
  display: flex;
  flex-direction: column;
}
</style>