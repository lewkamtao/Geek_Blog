<template>
  <div class="nav">
    <UserInfo class="user-info" :options="options" />
    <Pages
      class="pages-wrapper"
      :article_sort="article_sort"
      :article="article"
      :pages="pages"
    />
    <ArticleSort
      class="article-sort"
      :article_sort="article_sort"
      :article="article"
    />

    <Pages :article_sort="article_sort" :article="article" :pages="pages" />
    <Pages :article_sort="article_sort" :article="article" :pages="pages" />
  </div>
</template>

<script>
export default {
  components: {},

  props: {
    options: {
      type: Object,
      default: {}
    },
    article_sort: {
      type: Array,
      default: []
    },
    article: {
      type: Array,
      default: []
    },
    pages: {
      type: Array,
      default: []
    }
  },
  data() {
    return {};
  },
  watch: {},
  computed: {},
  methods: {},
  created() {},
  mounted() {}
};
</script>
<style lang="scss" scoped>
.user-info {
  position: fixed;
  width: 250px;
  z-index: 999;
}
.pages-wrapper {
  margin-top: 330px;
}
</style>