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

    <Links :links="links" />
    <div class="copy">
      {{ options.copy }}
    </div>
  </div>
</template>

<script>
export default {
  components: {},

  props: {
    options: {
      type: Object,
      default: {},
    },
    article_sort: {
      type: Array,
      default: [],
    },
    article: {
      type: Array,
      default: [],
    },
    pages: {
      type: Array,
      default: [],
    },
    links: {
      type: Array,
      default: [],
    },
  },
  data() {
    return {};
  },
  watch: {},
  computed: {},
  methods: {},
  created() {},
  mounted() {},
};
</script>
<style lang="scss" scoped>
.nav {
  display: block;
  padding: 15px;
  box-sizing: border-box;
  .user-info {
    margin-top: 15px;
  }
  .copy {
    margin: 30px 0px;
  }
}
</style>