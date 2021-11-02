<template>
  <Detail
    :options="{
      type: 'articleBySort',
      catalogue: false,
      comments: false,
      tag: false,
      article: false,
      articleListBySort: articleListBySort,
      newComments: newComments
    }"
  />
</template>

<script>
export default {
  components: {},
  async asyncData({ $axios, route }) {
    var sort_id = parseInt(route.query.sort_id);
    const articleListBySort = (
      await $axios.get("/article-sort?limit=100000&id=" + sort_id)
    ).data;
    return { articleListBySort };
  },
  props: {},
  beforeRouteUpdate(to, from, next) {
    var sort_id = parseInt(to.query.sort_id);
    this.upDated(sort_id);
    next();
  },
  data() {
    return {
      newComments: {}
    };
  },
  methods: {
    async upDated(sort_id) {
      const articleListBySort = (
        await this.$axios.get("/article-sort?limit=10000&id=" + sort_id)
      ).data;
      this.articleListBySort = articleListBySort;
    }
  },
  created() {}
};
</script>
