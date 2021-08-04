<template>
  <div class="left-nav">
    <UserInfo class="user-info" :options="options" :geek_config="geek_config" />
    <MusicBox v-if="musicBoxSwitch" />
    <Menu
      :options="options"
      :geek_config="geek_config"
      @openMusicBox="openMusicBox"
      @closeMusicBox="closeMusicBox"
    />
    <!-- <Pages :pages="pages" /> -->
    <ArticleSort class="article-sort" :article_sort="article_sort" />
    <div class="permit-no" v-html="geek_config.site_info.permit_no"></div>
  </div>
</template>

<script>
export default {
  components: {},

  props: {
    geek_config: {
      type: Object,
      default: {}
    },
    options: {
      type: Object,
      default: {}
    },
    article_sort: {
      type: Object,
      default: {}
    },

  },
  data() {
    return {
      musicBoxSwitch: false
    };
  },
  watch: {},
  computed: {},
  methods: {
    openMusicBox() {
      this.musicBoxSwitch = true;
    },
    closeMusicBox() {
      this.musicBoxSwitch = false;
    }
  },
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
  .permit-no {
    margin: 30px 0px 150px 0px;
  }
}
// 移动端适配
@media screen and (max-width: 1025px) {
  .left-nav {
    padding: 56px 14px 14px 14px;
  }
}
</style>