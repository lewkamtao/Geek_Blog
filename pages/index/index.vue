<template>
  <Detail
    :options="{
  type: 'index',
  catalogue: false,
  comments: false,
  tag: false,
  article: false,
  articleList:articleList
  }"
  />
</template>

<script>
export default {
  components: {},
  async asyncData({ $axios }) {
    const articleList = (await $axios.get("/article?limit=10")).data;
    return { articleList };
  },
  props: {},
  data() {
    return {
      page: 1,
      limit: 10
    };
  }
};
</script> 
