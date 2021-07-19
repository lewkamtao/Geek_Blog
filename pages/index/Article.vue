<template>
  <div class="right-wrapper article-wrapper">
    <Article :article="article" class="part main" />
    <Aside class="aside" />
  </div>
</template>

<script>
export default {
  components: {},
  async asyncData({ $axios, route }) {
    const article = (
      await $axios.get("/article", {
        params: {
          id: parseInt(route.query.id)
        }
      })
    ).data;
    return { article };
  },
  props: {},
  data() {
    return {};
  },
  beforeRouteUpdate(to, from, next) {
    this.getArticle(parseInt(to.query.id));
    next();
  },
  watch: {},
  computed: {},
  methods: {
    async getArticle(id) {
      const article = (
        await this.$axios.get("/article", {
          params: {
            id: id
          }
        })
      ).data;
      this.article = article;
    }
  },
  created() {},
  mounted() {}
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
  width: 350px;
  margin-left: 30px;
}
@media screen and (max-width: 1440px) {
  .article-wrapper {
    .main {
      width: calc(100% - 280px);
    }
  }
}
</style>