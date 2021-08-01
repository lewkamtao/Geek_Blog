<template>
  <div class="right-wrapper messgae-wrapper">
    <div ref="aside">
      <Message @reloadComments="getComments" :comments="comments" />
    </div>
  </div>
</template>

<script>
// 这里是留言墙的id 注意要是文章的id 文章标题必须是：留言墙

export default {
  components: {},
  head() {
    return {
      title: "留言墙 - " + this.options.title
    };
  },
  async asyncData({ $axios, route }) {
    const links = (await $axios.get("/links")).data.data;
    const comments = (
      await $axios.get("/comments", {
        params: {
          mode: "type",
          type: "msg_wall",
          tree: false,
          limit: 10000
        }
      })
    ).data;
    return { comments, links };
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
      asideHidth: 0
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
            mode: "type",
            type: "msg_wall",
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