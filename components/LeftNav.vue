<template>
  <div class="left-nav">
    <!-- 个人信息 -->
    <user-info :user="user"></user-info>

    <!-- 菜单列表 -->
    <menu-list
      :geek_config="geek_config"
      @openMusicBox="openMusicBox"
      @closeMusicBox="closeMusicBox"
    ></menu-list>

    <!-- 音乐盒 -->
    <music-box
      v-if="musicBoxSwitch"
      ref="music_box"
      :geek_config="geek_config"
    ></music-box>

    <!-- 分类 -->
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
    user: {
      type: Object,
      default: function () {
        return {};
      },
    },
    article_sort: {
      type: Object,
      default: function () {
        return {};
      },
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
  padding: 51px 4px 4px 4px;
  box-sizing: border-box;

  .permit-no {
    margin: 30px 0px 150px 0px;
  }
}
.left-nav > div {
  margin-bottom: 8px;
}
.left-nav > div:first-child {
  margin-top: 8px;
}
.left-nav > div:last-child {
  margin-bottom: 50px;
}
// 移动端适配
@media screen and (max-width: 1025px) {
  .left-nav {
    padding: 51px 14px 14px 14px;
  }
  .left-nav > div {
    margin-bottom: 14px;
  }
  .left-nav > div:first-child {
    margin-top: 18px;
  }
  .left-nav > div:last-child {
    margin-bottom: 50px;
  }
}
</style>
