<template>
  <div class="left-nav">
    <div>
      <!-- 个人信息 -->
      <user-info :geek_config="geek_config"></user-info>

      <!-- 菜单列表 -->
      <menu-list
        :geek_config="geek_config"
        @openMusicBox="openMusicBox"
        @closeMusicBox="closeMusicBox"
      ></menu-list>

      <!-- 音乐盒 -->
      <music-box
        v-if="musicBoxSwitch && geek_config.menu_switch.music_box"
        ref="music_box"
        :geek_config="geek_config"
      ></music-box>

      <!-- 归档 -->
      <article-sort
        class="article-sort"
        :article_sort="article_sort"
      ></article-sort>

      <!-- 设置 -->
      <mode-set
        @openMusicBox="openMusicBox"
        @closeMusicBox="closeMusicBox"
      ></mode-set>

      <!-- 备案号 -->
      <permit-no :geek_config="geek_config"></permit-no>
    </div>
  </div>
</template>

<script>
import UserInfo from "@/components/nav/UserInfo";
import MusicBox from "@/components/nav/MusicBox";
import MenuList from "@/components/nav/MenuList";
import ArticleSort from "@/components/nav/ArticleSort";
import PermitNo from "@/components/nav/PermitNo";
import ModeSet from "@/components/nav/ModeSet";

export default {
  components: { UserInfo, MusicBox, MenuList, ArticleSort, PermitNo, ModeSet },
  props: {
    geek_config: {
      type: Object,
      default: function () {
        return {};
      },
    },

    article_sort: {
      type: Object,
      default: {},
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
      this.musicBoxSwitch = true;
    },
    closeMusicBox() {
      this.musicBoxSwitch = false;
    },
    playSong({ songs, index }) {
      this.musicBoxSwitch = true;
      this.$nextTick(function () {
        this.$refs.music_box.playSongs({ songs, index });
      });
    },
  },
  created() {},
  mounted() {},
};
</script>
<style lang="scss" scoped>
.left-nav {
  display: block;
  padding: 44px 4px 4px 4px;
  box-sizing: border-box;

  .permit-no {
    margin: 30px 0px 150px 0px;
  }
}
// 移动端适配
@media screen and (max-width: 1025px) {
  .left-nav {
    padding: 56px 5px 5px 5px;
  }
}
</style>
