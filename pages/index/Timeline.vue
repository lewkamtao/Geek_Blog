<template>
  <Detail
    :geek_config="geek_config"
    :user="user"
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
      await $axios.get("/api/comments/all", {
        params: {
          mode: "type",
          type: "moving",


        },
      })
    ).data;
    return { timeline };
  },
  props: {
    geek_config: {
      type: Object,
      default: function () {
        return {};
      }
    },
    user: {
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
            type: "moving",

            limit: 20,
          },
        })
      ).data;
      this.timeline = comments;
    },
  },
};
</script>
