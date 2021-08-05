<template>
  <Detail
    @reloadComments="getComments"
    :options="{
      type: 'message',
      catalogue: false,
      comments: comments,
      tag: false,
      article: false,
      commentsGroup: commentsGroup,
    }"
  />
</template> 

<script>
// 这里是留言墙的id 注意要是文章的id 文章标题必须是：留言墙

export default {
  components: {},
  head() {
    return {
      title: "留言墙 - " + this.geek_config.site_info.title,
    };
  },
  async asyncData({ $axios }) {
    const comments = (
      await $axios.get("/comments", {
        params: {
          mode: "type",
          type: "msg_wall",
          tree: false,
          limit: 10000,
        },
      })
    ).data;
    const commentsGroup = (
      await $axios.get("/comments", {
        params: {
          mode: "group",
          type: "msg_wall",
          tree: false,
          limit: 10000,
        },
      })
    ).data;
    return { comments, commentsGroup };
  },
  props: {
    geek_config: {
      type: Object,
      default: {},
    },
  },
  data() {
    return {};
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
            limit: 10000,
          },
        })
      ).data;
      this.comments = comments;
    },
  },
};
</script>
