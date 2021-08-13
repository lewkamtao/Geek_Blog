<template>
  <div class="right-wrapper article-wrapper-master">
    <div ref="articleMain" class="main">
      <!-- 文章内页 -->
      <article-detail
        v-if="options.article && options.type == 'article'"
        :article="options.article"
        class="part"
      ></article-detail>

      <!-- 友情链接 -->
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
        class="part"
      ></index-detail>

      <!-- 留言板 -->
      <msg-wall-detail
        v-if="options.type == 'msg_wall'"
        :msg_wall="msg_wall"
        class="part"
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
    </div>
    <div ref="aside" :style="setAsideLeft" class="aside">
      <!-- 标签云 -->
      <tag-cloud v-if="options.tag" :tag="options.tag"></tag-cloud>

      <!-- 目录 -->
      <catalogue v-if="options.catalogue"></catalogue>

      <!-- 统计信息 -->
      <record v-if="options.type == 'about'"> </record>

      <!-- 社交媒体 -->
      <concact
        v-if="options.type == 'about' && geek_config.master_info.concact_switch"
        :geek_config="geek_config"
      ></concact>

      <!-- 评论板块 -->
      <comment
        @reloadComments="reloadComments"
        v-if="options.comments && options.type != 'msg_wall'"
        :comments="options.comments"
        :articleId="options.article ? options.article.id : 99"
        :type="options.type"
      ></comment>

      <!-- 最新评论 -->
      <lately
        v-if="options.type == 'index'"
        :newComments="options.newComments"
      ></lately>

      <!-- 博客信息 -->
      <info v-if="options.type == 'index'"></info>

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

import Catalogue from "@/components/detail/parts/Catalogue";
import Comment from "@/components/detail/parts/Comment";
import TagCloud from "@/components/detail/parts/TagCloud";
import Info from "@/components/detail/parts/Info";
import Lately from "@/components/detail/parts/Lately";
import Concact from "@/components/detail/parts/Concact";
import Record from "@/components/detail/parts/Record";
import CommentRank from "@/components/detail/parts/CommentRank";
import PostTimeLine from "@/components/detail/parts/PostTimeLine";
import Diary from "@/components/detail/parts/Diary";

export default {
  components: {
    ArticleDetail,
    IndexDetail,
    LinksDetail,
    MsgWallDetail,
    TimelineDetail,
    AboutDetail,

    Diary,
    Catalogue,
    Comment,
    TagCloud,
    Lately,
    Info,
    Concact,
    Record,
    PostTimeLine,
    CommentRank,
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
    var articleMainWidth =
      that.$refs.articleMain.getBoundingClientRect().left +
      that.$refs.articleMain.clientWidth +
      7;
    that.setAsideLeft = "left:" + articleMainWidth + "px;position: fixed;";

    window.onresize = function () {
      that.$nextTick(function () {
        articleMainWidth =
          that.$refs.articleMain.offsetLeft +
          that.$refs.articleMain.clientWidth +
          7;

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
  }
}
.aside {
  top: 0px;
  padding: 75px 7px 110px 7px;
  box-sizing: border-box;
  max-height: 100%;
  height: 100%;
  overflow-y: scroll;
  width: 350px;

  margin-bottom: 50px;
  z-index: 999;
  scrollbar-color: transparent transparent;
  scrollbar-track-color: transparent;
  -ms-scrollbar-track-color: transparent;
}
.aside > div {
  margin-bottom: 14px;
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
      left: 7px !important;
      opacity: 1;
      padding: 75px 7px 55px 7px;
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
