<template>
  <div class="right-wrapper article-wrapper">
    <div ref="articleMain" class="main">
      <ArticleDetail :article="article" :minHidth="asideHidth" class="part" />
    </div>
    <div ref="aside" :style="setAsideLeft" class="aside">
      <Aside type="article" @reloadComments="getComments" :comments="comments" :article="article" />
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  head() {
    return {
      title: this.article.title + " - " + this.options.title
    };
  },
  async asyncData({ $axios, route }) {
    const article = (
      await $axios.get("/article", {
        params: {
          id: parseInt(route.query.id),
          model: "md"
        }
      })
    ).data;
    const comments = (
      await $axios.get("/comments", {
        params: {
          article_id: parseInt(route.query.id),
          tree: false,
          limit: 10000
        }
      })
    ).data;
    return { article, comments };
  },
  props: {
    options: {
      type: Object,
      default: {}
    }
  },
  data() {
    return {
      setAsideLeft: "", // 用于计算侧边栏
      asideHidth: 0,
      id: ""
    };
  },
  beforeRouteUpdate(to, from, next) {
    this.id = parseInt(to.query.id);
    this.getArticle();
    this.getComments();
    next();
  },
  watch: {},
  computed: {},
  methods: {
    // 获取评论
    async getComments() {
      const comments = (
        await this.$axios.get("/comments", {
          params: {
            article_id: this.id,
            tree: false,
            limit: 10000
          }
        })
      ).data;
      this.comments = comments;
    },
    // 获取文章
    async getArticle() {
      const article = (
        await this.$axios.get("/article", {
          params: {
            id: this.id,
            model: "md"
          }
        })
      ).data;
      this.article = article;
    }
  },

  created() {},

  mounted() {
    var that = this;
    this.id = parseInt($nuxt.$route.query.id);
    var articleMainWidth =
      that.$refs.articleMain.offsetLeft +
      that.$refs.articleMain.clientWidth +
      7;
    that.setAsideLeft = "left:" + articleMainWidth + "px;position: fixed;";

    that.$nextTick(function() {
      that.asideHidth = that.$refs.aside.offsetHeight - 120;
    });
    window.onresize = function() {
      that.$nextTick(function() {
        articleMainWidth =
          that.$refs.articleMain.offsetLeft +
          that.$refs.articleMain.clientWidth +
          7;

        that.asideHidth = that.$refs.aside.offsetHeight - 120;
        that.setAsideLeft = "left:" + articleMainWidth + "px;position: fixed;";
      });
    };
  },
  beforeDestroy() {
    window.onresize = null;
  }
};
</script>
<style lang="scss" scoped>
.article-wrapper {
  display: flex;
  .main {
    width: calc(100% - 400px);
    min-width: 500px;
  }
}
.aside {
  top: 0px;
  padding: 75px 7px 7px 7px;
  box-sizing: border-box;
  max-height: 100%;
  height: 100%;
  overflow-y: scroll;
  width: 400px;
  margin-bottom: 50px;
  z-index: 999;
  scrollbar-color: transparent transparent;
  scrollbar-track-color: transparent;
  -ms-scrollbar-track-color: transparent;
}
.aside::-webkit-scrollbar {
  width: 0px;
  height: 0px;
  display: none;
}
</style>