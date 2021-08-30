<template>
  <div class="right-wrapper article-wrapper-master">
    <div ref="articleMain" class="main">
      <!-- 文章内页 -->
      <article-detail
        v-if="options.type == 'article'"
        :article="article"
        class="part"
      ></article-detail>

      <!-- 朋友 -->
      <links-detail
        :geek_config="geek_config"
        v-if="options.links && options.type == 'links'"
        :links="options.links"
        class="part"
      ></links-detail>

      <!-- 首页 -->
      <index-detail
        v-if="options.type == 'index'"
        :articleList="options.articleList"
      ></index-detail>

      <!-- 留言板 -->
      <msg-wall-detail
        v-if="options.type == 'msg_wall'"
        :msg_wall="msg_wall"
        @reloadComments="reloadComments"
      ></msg-wall-detail>

      <!-- 时光机 -->
      <timeline-detail
        v-if="options.type == 'timeline'"
        :geek_config="geek_config"
        class="part"
        :timeline="timeline"
      ></timeline-detail>

      <!-- 关于 -->
      <about-detail
        v-if="options.type == 'about'"
        :geek_config="geek_config"
        :article="about"
        class="part"
      ></about-detail>

      <!-- 设置 -->
      <setting-detail
        v-if="options.type == 'setting'"
        :geek_config="geek_config"
      ></setting-detail>
    </div>
    <div ref="aside" :style="setAsideLeft" class="aside">
      <!-- 标签云 -->
      <tag-cloud
        v-if="options.type == 'article' && article.expand.tag"
        :tags="article.expand.tag"
      ></tag-cloud>

      <!-- 目录 -->
      <catalogue v-if="options.catalogue"></catalogue>

      <!-- 统计信息 -->
      <record v-if="options.type == 'about'"> </record>

      <!-- 社交媒体 -->
      <contact
        v-if="options.type == 'about' && geek_config.master_info.concact_switch"
        :geek_config="geek_config"
      ></contact>

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
        v-if="options.type == 'timeline' && isLogin"
      ></post-time-line>

      <!-- 日记 -->
      <diary v-if="['index', 'timeline'].indexOf(options.type) >= 0"></diary>

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

export default {
  components: {
    ArticleDetail,
    IndexDetail,
    LinksDetail,
    MsgWallDetail,
    TimelineDetail,
    AboutDetail,
    SettingDetail,

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
  },
  props: {
    geek_config: {
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
    msg_wall: {
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
    that.$nextTick(function () {
      articleMainWidth =
        that.$refs.articleMain.getBoundingClientRect().left +
        that.$refs.articleMain.clientWidth +
        4;
      that.setAsideLeft = "left:" + articleMainWidth + "px;position: fixed;";
    });
    window.onresize = function () {
      that.$nextTick(function () {
        articleMainWidth =
          that.$refs.articleMain.offsetLeft +
          that.$refs.articleMain.clientWidth +
          4;
        that.setAsideLeft = "left:" + articleMainWidth + "px;position: fixed;";
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
    .main {
      min-width: 100%;
      width: 100%;
      transition: all 0.25s;
    }
    .aside {
      width: calc(100% - 14px);
      opacity: 0;
      transition: all 0.5s;
    }
  }
  .isShowAside {
    .aside {
      left: 4px !important;
      opacity: 1;
      padding: 75px 4px 55px 4px;
    }
    .main {
      opacity: 0;
      overflow: hidden;
      height: 0px;
      padding: 0px;
    }
  }
}
</style>
