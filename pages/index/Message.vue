<template>
  <div class="right-wrapper messgae-wrapper">
    <div ref="aside">
      <Messgae @reloadComments="getComments" :comments="comments" :article="article" />
    </div>
  </div>
</template>

<script>
// 这里是留言墙的id 注意要是文章的id 文章标题必须是：留言墙
var message_article_id = 14;

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
          id: message_article_id
        }
      })
    ).data;
    const links = (await $axios.get("/links")).data.data;
    const comments = (
      await $axios.get("/comments", {
        params: {
          article_id: message_article_id,
          tree: false,
          limit: 10000
        }
      })
    ).data;
    return { article, comments, links };
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
      id: message_article_id
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
            article_id: message_article_id,
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
  z-index: 9999;
} // 移动端适配
</style>