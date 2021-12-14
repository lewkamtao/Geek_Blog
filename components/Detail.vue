<template>
  <div class="right-wrapper article-wrapper-master">
    <div ref="articleMain" class="main">
      <!-- 文章内页 -->
      <article-detail
        v-if="options.type == 'article'"
        :geek_config="geek_config"
        :article="article"
        class="part"
      ></article-detail>

      <!-- 朋友 -->
      <links-detail
        :geek_config="geek_config"
        v-if="options.links && options.type == 'links'"
        :links="options.links"
        :article="link"
        class="part"
      ></links-detail>

      <!-- 首页 -->
      <index-detail
        v-if="options.type == 'index'"
        :articleList="options.articleList"
      ></index-detail>

      <!-- 文章分类 -->
      <article-by-sort-detail
        v-if="options.type == 'articleBySort'"
        :articleListBySort="options.articleListBySort"
      ></article-by-sort-detail>

      <!-- 留言板 -->
      <msg-wall-detail
        v-if="options.type == 'msg_wall'"
        :geek_config="geek_config"
        :msg_wall="msg_wall"
        @reloadComments="reloadComments"
      ></msg-wall-detail>

      <!-- 音乐 -->
      <music-detail
        :songs="music.songs"
        @playSong="playSong"
        v-if="options.type == 'music'"
      ></music-detail>

      <!-- 时光机 -->
      <timeline-detail
        v-if="options.type == 'moving'"
        :geek_config="geek_config"
        :user="user"
        class="part"
        :timeline="timeline"
      ></timeline-detail>

      <!-- 关于 -->
      <about-detail
        v-if="options.type == 'about'"
        :geek_config="geek_config"
        :user="user"
        :article="about"
        class="part"
      ></about-detail>

      <!-- 设置 -->
      <setting-detail
        v-if="options.type == 'setting'"
        :geek_config="geek_config"
      ></setting-detail>
    </div>
    <div ref="aside" :style="setAsideLeft" class="aside" v-if="setAsideLeft">
      <!-- 标签云 -->
      <tag-cloud
        v-if="options.type == 'article' && article.expand.tag"
        :tags="article.expand.tag"
      ></tag-cloud>

      <!-- 目录 -->
      <catalogue v-if="options.catalogue"></catalogue>

      <!-- 统计信息 -->
      <record v-if="options.type == 'about' || options.type == 'articleBySort'">
      </record>

      <!-- 社交媒体 -->
      <contact
        v-if="['about', 'moving'].indexOf(options.type) >= 0"
        :geek_config="geek_config"
      ></contact>

      <!-- 音乐歌单 -->
      <music-list
        @getSongs="getSongs"
        v-if="['music'].indexOf(options.type) >= 0"
        :music_list="music.music_list"
      ></music-list>

      <!-- 评论板块 -->
      <comment
        @reloadComments="reloadComments"
        v-if="options.comments && options.type != 'msg_wall'"
        :comments="options.comments"
        :articleId="article ? article.id : 0"
        :type="options.type"
      ></comment>

      <!-- 最新评论 -->
      <lately
        v-if="options.type == 'index'"
        :newComments="options.newComments"
      ></lately>

      <!-- 评论排行榜 -->
      <comment-rank
        v-if="options.type == 'msg_wall'"
        :commentsGroup="options.commentsGroup"
      ></comment-rank>

      <!-- 发布时光机 -->
      <post-time-line
        @reloadComments="reloadComments"
        v-if="options.type == 'moving' && isLogin"
      ></post-time-line>

      <!-- 日记 -->
      <diary
        v-if="['index', 'articleBySort', 'moving'].indexOf(options.type) >= 0"
      ></diary>

      <!-- 博客信息 -->
      <info v-if="options.type == 'index'"></info>

      <!-- 设置菜单 -->
      <setting-menu
        v-if="['setting'].indexOf(options.type) >= 0"
      ></setting-menu>
    </div>
  </div>
</template>

<script>
import ArticleDetail from "@/components/detail/ArticleDetail";
import LinksDetail from "@/components/detail/LinksDetail";
import IndexDetail from "@/components/detail/IndexDetail";
import MsgWallDetail from "@/components/detail/MsgWallDetail";
import TimelineDetail from "@/components/detail/TimelineDetail";
import AboutDetail from "@/components/detail/AboutDetail";
import SettingDetail from "@/components/detail/SettingDetail";
import MusicDetail from "@/components/detail/MusicDetail";
import ArticleBySortDetail from "@/components/detail/ArticleBySortDetail";

import Catalogue from "@/components/detail/parts/Catalogue";
import Comment from "@/components/detail/parts/Comment";
import TagCloud from "@/components/detail/parts/TagCloud";
import Info from "@/components/detail/parts/Info";
import Lately from "@/components/detail/parts/Lately";
import Contact from "@/components/detail/parts/Contact";
import Record from "@/components/detail/parts/Record";
import CommentRank from "@/components/detail/parts/CommentRank";
import PostTimeLine from "@/components/detail/parts/PostTimeLine";
import Diary from "@/components/detail/parts/Diary";
import SettingMenu from "@/components/detail/parts/SettingMenu";
import MusicList from "./detail/parts/musicList.vue";

export default {
  components: {
    ArticleDetail,
    IndexDetail,
    LinksDetail,
    MsgWallDetail,
    TimelineDetail,
    AboutDetail,
    SettingDetail,
    MusicDetail,
    ArticleBySortDetail,

    Diary,
    Catalogue,
    Comment,
    TagCloud,
    Lately,
    Info,
    Contact,
    Record,
    PostTimeLine,
    CommentRank,
    SettingMenu,
    MusicList,
  },
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
    timeline: {
      type: Object,
      default: function () {
        return {};
      },
    },
    article: {
      type: Object,
      default: function () {
        return {};
      },
    },
    about: {
      type: Object,
      default: function () {
        return {};
      },
    },
    link: {
      type: Object,
      default: function () {
        return {};
      },
    },
    msg_wall: {
      type: Object,
      default: function () {
        return {};
      },
    },
    music: {
      type: Object,
      default: function () {
        return {};
      },
    },
    options: {
      type: Object,
      default: {
        type: "",
        links: false, // 友链
        catalogue: false,
        comments: false,
        tag: false,
        article: false,
        articleList: false,
        commentsGroup: false,
        newComments: false, // 最新评论
      },
    },
  },
  data() {
    return {
      isLogin: false,
      setAsideLeft: "", // 用于计算侧边栏
      id: "",
    };
  },
  beforeRouteUpdate(to, from, next) {
    this.id = parseInt(to.query.id);
    this.getArticle();
    this.getComments();
    next();
  },
  watch: {},
  computed: {},
  methods: {
    reloadComments() {
      this.$emit("reloadComments");
    },
    getSongs(id) {
      this.$emit("getSongs", id);
    },
    playSong({ songs, index }) {
      this.$emit("playSong", { songs, index });
    },
  },
  created() {
    if (this.$cookies.get("token")) {
      this.isLogin = true;
    }
  },
  mounted() {
    var that = this;
    this.id = parseInt($nuxt.$route.query.id);
    var articleMainWidth = "";
    articleMainWidth =
      that.$refs.articleMain.getBoundingClientRect().left +
      that.$refs.articleMain.clientWidth +
      4;
    that.setAsideLeft = "left:" + articleMainWidth + "px;";
    window.onresize = function () {
      that.$nextTick(function () {
        articleMainWidth =
          that.$refs.articleMain.offsetLeft +
          that.$refs.articleMain.clientWidth +
          4;
        that.setAsideLeft = "left:" + articleMainWidth + "px;";
      });
    };
  },
  beforeDestroy() {
    window.onresize = null;
  },
};
</script>
<style lang="scss" scoped>
.article-wrapper-master {
  display: flex;
  width: 100%;
  .main {
    width: calc(100% - 350px);
    min-width: 500px;
    transition: opacity 0.25s;
    overflow: hidden;
  }
}
.aside {
  position: fixed;
  top: 0px;
  padding: 59px 4px 110px 4px;
  box-sizing: border-box;
  max-height: 100%;
  height: 100%;
  overflow-y: scroll;
  width: 350px;
  margin-bottom: 50px;
  z-index: 99;
  scrollbar-color: transparent transparent;
  scrollbar-track-color: transparent;
  -ms-scrollbar-track-color: transparent;
}
.aside > div {
  margin-bottom: 8px;
}
.aside::-webkit-scrollbar {
  width: 0px;
  height: 0px;
  -ms-overflow-style: none;
  overflow: -moz-scrollbars-none;
  display: none;
}

// 移动端适配
@media screen and (max-width: 1025px) {
  .article-wrapper-master {
    flex-direction: column;
    .main {
      min-width: 100%;
      width: 100%;
      transition: all 0.25s;
    }
    .aside {
      position: static;
      padding: 0px;
      margin-top: 14px;
      margin-bottom: 0px;
      width: 100%;
      opacity: 1;
      transition: all 0.5s;
    }
    .aside > div {
      margin-bottom: 14px;
    }
  }
}
</style>
