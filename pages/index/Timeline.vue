<template>
  <Detail
    :geek_config="geek_config"
    :timeline="timeline"
    @reloadComments="getComments"
    :options="{
      type: 'moving',
    }"
  />
</template>

<script>
export default {
  components: {},
  head() {
    return {
      title: "时光机 - " + this.geek_config.site_config.title,
    };
  },
  async asyncData({ $axios, route }) {
    const timeline = (
      await $axios.get("/comments", {
        params: {
          mode: "type",
          type: "moving",
          tree: false,
          limit: 10000,
        },
      })
    ).data;
    return { timeline };
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
            type: "moving",
            tree: false,
            limit: 20,
          },
        })
      ).data;
      this.timeline = comments;
    },
  },
};
</script>