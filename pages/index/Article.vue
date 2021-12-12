<template>
  <Detail
    @reloadComments="getComments"
    :article="article"
    :options="{
      type: 'article',
      catalogue: true,
      comments: comments
    }"
  />
</template>

<script>
export default {
  components: {},
  head() {
    return {
      title: this.article.title + " - " + this.geek_config.site_config.title,
      meta: [{
        'name': 'keywords',
        'content': this.tags
      }]
    };
  },
  async asyncData({$axios, route}) {
    const article = (
      await $axios.get("/api/article", {
        params: {
          id: parseInt(route.query.id),
          model: "md"
        }
      })
    ).data;
    const comments = (
      await $axios.get("/api/comments", {
        params: {
          article_id: parseInt(route.query.id),
          tree: false,
          limit: 10000
        }
      })
    ).data;
    return {article, comments};
  },
  props: {
    geek_config: {
      type: Object,
      default: function () {
        return {};
      }
    }
  },
  data() {
    return {
      id: "",
      tags: []
    };
  },
  beforeRouteUpdate(to, from, next) {
    this.id = parseInt(to.query.id);
    this.getArticle();
    this.getComments();
    next();
  },
  methods: {
    // 获取评论
    async getComments() {
      const comments = (
        await this.$axios.get("/api/comments", {
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
        await this.$axios.get("/api/article", {
          params: {
            id: this.id,
            model: "md"
          }
        })
      ).data;
      this.article = article;
    }
  },
  mounted() {
    this.id = parseInt($nuxt.$route.query.id);
    // 处理Tag
    let tagList = this.article.expand.tag;
    this.tags = [];
    if (tagList === undefined || tagList.length <= 0) {
      return;
    }
    tagList.forEach(tag => {
      this.tags.push(tag.name)
    })
  }
};
</script>
