<template>
  <div class="article-wrapper">
    <div class="vditor-reset" id="vditorPreview"></div>
    <pre>{{ article }}</pre>
    <pre>{{ article }}</pre>
    <pre>{{ article }}</pre>
    <pre>{{ article }}</pre>
    <pre>{{ article }}</pre>
    <pre>{{ article }}</pre>
  </div>
</template>

<script>
import VditorPreview from "vditor/dist/method.min";
export default {
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
      this.formatArticle();
    }
  },
  computed: {},
  methods: {
    formatArticle() {
      if (process.client) {
        var dom = document.getElementById("vditorPreview");
        VditorPreview.preview(dom, this.article.content);
      }
    }
  },
  created() {
    this.formatArticle();
  },
  mounted() {}
};
</script>
<style lang="scss" scoped>
.article-wrapper {
  min-height: calc(100vh - 60px);
  display: flex;
  flex-direction: column;
}

</style>