<template>
  <Detail
    @reloadComments="getComments"
    :link="link"
    :geek_config="geek_config"
    :options="{
      type: 'links',
      comments: comments,
      links: links,
    }"
  />
</template>

<script>
export default {
  components: {},
  head() {
    return {
      title: "友链 - " + this.geek_config.site_config.title,
    };
  },
  async asyncData({$axios, route}) {
    const links = (await $axios.get("/api/links?limit=100000")).data;
    const comments = (
      await $axios.get("/api/comments/all", {
        params: {
          mode: "type",
          type: "links",


        },
      })
    ).data;
    // 友链页内容
    var link = {};
    try {
      const linkRes = await $axios.get("/api/page?alias=links&cache=false");
      if (linkRes.code == 200) {
        link = linkRes.data;
      }
    } catch {
      link = {};
    }
    return {comments, links, link};
  },
  props: {
    geek_config: {
      type: Object,
      default: function () {
        return {};
      }
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
        await this.$axios.get("/api/comments/all", {
          params: {
            mode: "type",
            type: "links",


          },
        })
      ).data;
      this.comments = comments;
    },
  },
};
</script>
