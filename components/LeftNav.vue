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
      type: Object,
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
    font-size: 13px;
    color: #999;
    letter-spacing: 0.5px;
    text-align: center;
    margin: -10px 0px 40px 0px;
  }
}
// 移动端适配
@media screen and (max-width: 1025px) {
  .left-nav {
    padding: 56px 14px 14px 14px;
  }
}
</style>