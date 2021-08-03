<template>
  <div class="left-nav">
    <UserInfo class="user-info" :options="options" />
    <Menu :options="options" @openMusicBox="openMusicBox" />
    <MusicBox v-if="musicBoxSwitch" />
    <Pages :pages="pages" />
    <ArticleSort
      class="article-sort"
      :article_sort="article_sort"
      :article="article"
    />
    <div class="copy">{{ options.copy }}</div>
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
      type: Object,
      default: {},
    },
    article: {
      type: Object,
      default: [],
    },
    pages: {
      type: Array,
      default: [],
    },
  },
  data() {
    return {
      musicBoxSwitch: false,
    };
  },
  watch: {},
  computed: {},
  methods: {
    openMusicBox() {
      this.musicBoxSwitch = !this.musicBoxSwitch;
    },
  },
  created() {},
  mounted() {},
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