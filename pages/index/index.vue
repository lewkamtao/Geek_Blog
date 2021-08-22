<template>
  <Detail
    :options="{
      type: 'index',
      catalogue: false,
      comments: false,
      tag: false,
      article: false,
      articleList: articleList,
      newComments: newComments,
    }"
  />
</template>

<script>
export default {
  components: {},
  async asyncData({ $axios }) {
    const articleList = (await $axios.get("/article?limit=5")).data;
    return { articleList };
  },
  props: {},
  data() {
    return {
      newComments: {},
    };
  },
  methods: {
    async getNewComments() {
      const newComments = (await this.$axios.get("/comments?limit=5")).data;
      this.newComments = newComments;
    },
  },
  created() {
    this.getNewComments();
  },
};
</script>
