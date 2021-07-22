<template>
  <div class="right-wrapper article-wrapper">
    <div ref="articleMain" class="main">
      <Article :article="article" class="part" />
    </div>
    <Aside
      :comments="comments"
      :article="article"
      class="aside"
      :style="'left:' + articleMainWidth + 'px'"
    />
  </div>
</template>

<script>
export default {
  components: {},
  async asyncData({ $axios, route }) {
    const article = (
      await $axios.get("/article", {
        params: {
          id: parseInt(route.query.id),
        },
      })
    ).data;
    const comments = (
      await $axios.get("/comments", {
        params: {
          article_id: parseInt(route.query.id),
          limit: 10000,
        },
      })
    ).data;
    return { article, comments };
  },
  props: {},
  data() {
    return {
      articleMainWidth: 0, // 用于计算侧边栏
    };
  },
  beforeRouteUpdate(to, from, next) {
    this.getArticle(parseInt(to.query.id));
    this.getComments(parseInt(to.query.id));
    next();
  },
  watch: {},
  computed: {},
  methods: {
    // 获取评论
    async getComments(id) {
      const comments = (
        await this.$axios.get("/comments", {
          params: {
            article_id: id,
            limit: 10000,
          },
        })
      ).data;
      this.comments = comments;
    },
    // 获取文章
    async getArticle(id) {
      const article = (
        await this.$axios.get("/article", {
          params: {
            id: id,
          },
        })
      ).data;
      this.article = article;
    },
  },

  created() {},

  mounted() {
    var that = this;
    this.$nextTick(function () {
      that.articleMainWidth =
        that.$refs.articleMain.offsetLeft +
        that.$refs.articleMain.clientWidth +
        15;
    });
    window.onresize = function () {
      that.$nextTick(function () {
        that.articleMainWidth =
          that.$refs.articleMain.offsetLeft +
          that.$refs.articleMain.clientWidth +
          15;
      });
    };
  },
  beforeDestroy() {
    window.onresize = null;
  },
};
</script>
<style lang="scss" scoped>
.article-wrapper {
  display: flex;
  .main {
    width: calc(100% - 380px);
    min-width: 500px;
  }
}
.aside {
  position: fixed;
  top: 0px;

  max-height: 100vh;
  overflow-y: scroll;
  width: 350px;
  margin-bottom: 50px;
  z-index: 99999;
}
@media screen and (max-width: 1440px) {
  .article-wrapper {
    .main {
      width: calc(100% - 280px);
    }
  }
}
</style>