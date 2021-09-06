<template>
  <Detail
    @reloadComments="getComments"
    :geek_config="geek_config"
    :msg_wall="msg_wall"
    :options="{
      type: 'msg_wall',
      catalogue: false,
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
      title: "留言墙 - " + this.geek_config.site_config.title,
    };
  },
  async asyncData({ $axios }) {
    const msg_wall = (
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
    return { msg_wall, commentsGroup };
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
      const msg_wall = (
        await this.$axios.get("/comments", {
          params: {
            mode: "type",
            type: "msg_wall",
            tree: false,
            limit: 10000,
          },
        })
      ).data;
      this.msg_wall = msg_wall;
    },
  },
};
</script>
