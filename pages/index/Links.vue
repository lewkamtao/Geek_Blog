<template>
  <Detail
    @reloadComments="getComments"
    :options="{
    type: 'links',
    comments: comments,
    links: links
    }"
  />
</template>

<script>
export default {
  components: {},
  head() {
    return {
      title: "友情链接 - " + this.options.title
    };
  },
  async asyncData({ $axios, route }) {
    const links = (await $axios.get("/links")).data;
    const comments = (
      await $axios.get("/comments", {
        params: {
          mode: "type",
          type: "links",
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
    return {};
  },

  watch: {},
  computed: {
    getBorderType() {
      return function() {
        return "border-" + Math.floor(Math.random() * 6 + 1);
      };
    }
  },
  methods: {
    // 获取评论
    async getComments() {
      const comments = (
        await this.$axios.get("/comments", {
          params: {
            mode: "type",
            type: "links",
            tree: false,
            limit: 10000
          }
        })
      ).data;
      this.comments = comments;
    }
  }
};
</script>