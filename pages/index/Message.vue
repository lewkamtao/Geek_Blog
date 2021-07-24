<template>
  <div class="right-wrapper messgae-wrapper">
    <div ref="aside">
      <Messgae @reloadComments="getComments" :comments="comments" :article="article" />
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  head() {
    return {
      title: this.article.title
    };
  },
  async asyncData({ $axios, route }) {
    const article = (
      await $axios.get("/article", {
        params: {
          id: 66
        }
      })
    ).data;
    const links = (await $axios.get("/links")).data.data;
    const comments = (
      await $axios.get("/comments", {
        params: {
          article_id: 66,
          tree: false,
          limit: 10000
        }
      })
    ).data;
    return { article, comments, links };
  },
  props: {},
  data() {
    return {
      setAsideLeft: "", // 用于计算侧边栏
      asideHidth: 0,
      id: 66
    };
  },

  watch: {},
  computed: {},
  methods: {
    // 获取评论
    async getComments() {
      const comments = (
        await this.$axios.get("/comments", {
          params: {
            article_id: 66,
            tree: false,
            limit: 10000
          }
        })
      ).data;
      this.comments = comments;
    }
  },

  created() {},

  mounted() {},
  beforeDestroy() {
    window.onresize = null;
  }
};
</script>
<style lang="scss" scoped>
.messgae-wrapper {
  position: relative;
  z-index: 999999;
}
</style>