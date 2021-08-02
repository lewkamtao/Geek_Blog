<template>
  <div class="right-wrapper article-wrapper-master">
    <div ref="articleMain" class="main">
      <article-detail
        v-if="options.article && options.type == 'article'"
        :article="options.article"
        :minHidth="asideHidth"
        class="part"
      ></article-detail>
      <links-detail
        v-if="options.links && options.type == 'links'"
        :links="options.links"
        class="part"
      ></links-detail>
      <index-detail
        v-if="options.type == 'index'"
        :articleList="options.articleList"
        class="part"
      ></index-detail>
      <message-detail
        v-if="options.type == 'message'"
        :comments="options.comments"
        class="part"
      ></message-detail>
    </div>
    <div ref="aside" :style="setAsideLeft" class="aside">
      <!-- 标签云 -->
      <tag-cloud v-if="options.tag" :tag="options.tag"></tag-cloud>

      <!-- 目录 -->
      <catalogue v-if="options.catalogue"></catalogue>

      <!-- 评论板块 -->
      <comment
        @reloadComments="reloadComments"
        v-if="options.comments && options.type != 'message'"
        :comments="options.comments"
        :articleId="options.article ? options.article.id : 99"
        :type="options.type"
      ></comment>

      <!-- 内容更新 -->
      <developments v-if="options.type == 'index'"></developments>

      <!-- 最新评论 -->
      <lately
        v-if="options.type == 'index'"
        :newComments="options.newComments"
      ></lately>

      <!-- 联系方式 -->
      <info v-if="options.type == 'index'"></info>

      <!-- 博客信息 -->
      <concact v-if="options.type == 'index'"></concact>

      <!-- 评论排行榜 -->
      <comment-rank
        v-if="options.type == 'message'"
        :commentsGroup="options.commentsGroup"
      ></comment-rank>
    </div>
  </div>
</template> 
 
<script>
import ArticleDetail from "@/components/detail/ArticleDetail";
import LinksDetail from "@/components/detail/LinksDetail";
import IndexDetail from "@/components/detail/IndexDetail";
import MessageDetail from "@/components/detail/MessageDetail";

import Catalogue from "@/components/detail/parts/Catalogue";
import Comment from "@/components/detail/parts/Comment";
import TagCloud from "@/components/detail/parts/TagCloud";
import Info from "@/components/detail/parts/Info";
import Developments from "@/components/detail/parts/Developments";
import Lately from "@/components/detail/parts/Lately";
import Concact from "@/components/detail/parts/Concact";
import CommentRank from "@/components/detail/parts/CommentRank";

export default {
  components: {
    ArticleDetail,
    IndexDetail,
    LinksDetail,
    MessageDetail,

    Catalogue,
    Comment,
    TagCloud,
    Developments,
    Lately,
    Info,
    Concact,
    CommentRank,
  },
  props: {
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
      setAsideLeft: "", // 用于计算侧边栏
      asideHidth: 0,
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
  created() {},
  mounted() {
    var that = this;
    this.id = parseInt($nuxt.$route.query.id);
    var articleMainWidth =
      that.$refs.articleMain.offsetLeft +
      that.$refs.articleMain.clientWidth +
      7;
    that.setAsideLeft = "left:" + articleMainWidth + "px;position: fixed;";

    that.$nextTick(function () {
      that.asideHidth = that.$refs.aside.offsetHeight - 120;
    });
    window.onresize = function () {
      that.$nextTick(function () {
        articleMainWidth =
          that.$refs.articleMain.offsetLeft +
          that.$refs.articleMain.clientWidth +
          7;

        that.asideHidth = that.$refs.aside.offsetHeight - 120;
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