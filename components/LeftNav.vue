<template>
  <div class="left-nav">
    <UserInfo class="user-info" :options="options" />
    <Menu />
    <Pages :pages="pages" />
    <ArticleSort class="article-sort" :article_sort="article_sort" :article="article" />

    <LinksCard :links="links" />
    <div class="copy">{{ options.copy }}</div>
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
    },
    links: {
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
.left-nav {
  display: block;
  padding: 60px 7px 7px 7px;
  box-sizing: border-box;
  .user-info {
    margin-top: 15px;
  }
  .copy {
    margin: 25px 0px;
  }
}
// 移动端适配
@media screen and (max-width: 680px) {
  .left-nav {
    padding: 50px 7px 7px 7px;
  }
}
</style>