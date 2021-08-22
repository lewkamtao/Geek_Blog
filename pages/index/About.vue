<template>
  <Detail
    @reloadComments="getComments"
    :about="about"
    :geek_config="geek_config"
    :options="{
      type: 'about',
      comments: comments,
    }"
  />
</template>

<script>
export default {
  components: {},
  head() {
    return {
      title: "关于我 - " + this.geek_config.site_info.title,
    };
  },
  async asyncData({ $axios, route }) {
    const comments = (
      await $axios.get("/comments", {
        params: {
          mode: "type",
          type: "about",
          tree: false,
          limit: 10000,
        },
      })
    ).data;
    var about = {};
    try {
      const aboutRes = await $axios.get("/page?alias=about&cache=false");
      if (aboutRes.code == 200) {
        about = aboutRes.data;
      }
    } catch {
      about = {};
    }

    return { comments, about };
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
  computed: {

  },
  methods: {
    // 获取评论
    async getComments() {
      const comments = (
        await this.$axios.get("/comments", {
          params: {
            mode: "type",
            type: "about",
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
