<template>
  <Detail
    :options="{
      type: 'articleByTag',
      catalogue: false,
      comments: false,
      tag: false,
      article: false,
      articleListByTag: articleListByTag,
      newComments: newComments
    }"
  />
</template>

<script>
export default {
  components: {},
  async asyncData({ $axios, route }) {
    const tag_id = parseInt(route.query.tag_id);
    const articleListByTag = (
      await $axios.get("/api/tag?limit=100000&cache=false&id=" + tag_id)
    ).data;
    debugger
    return { articleListByTag };
  },
  props: {},
  beforeRouteUpdate(to, from, next) {
    var tag_id = parseInt(to.query.tag_id);
    this.upDated(tag_id);
    next();
  },
  data() {
    return {
      newComments: {}
    };
  },
  methods: {
    async upDated(tag_id) {
      this.articleListByTag = (
        await this.$axios.get(
          "/api/tag?limit=10000&cache=false&id=" + tag_id
        )
      ).data;
    }
  },
  created() {}
};
</script>
