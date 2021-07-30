<template>
  <div class="right-wrapper article-wrapper-master">
    <div ref="articleMain" class="main">
      <article-detail
        v-if="options.article&&options.type=='article'"
        :article="options.article"
        :minHidth="asideHidth"
        class="part"
      ></article-detail>
      <links-detail v-if="options.links&&options.type=='links'" :links="options.links" class="part"></links-detail>
    </div>
    <div ref="aside" :style="setAsideLeft" class="aside">
      <tag-cloud v-if="options.tag" :tag="options.tag"></tag-cloud>
      <catalogue v-if="options.catalogue"></catalogue>
      <comment
        @reloadComments="reloadComments"
        v-if="options.comments"
        :comments="options.comments"
        :articleId="options.article?options.article.id:99"
        :type="options.type"
      ></comment>
    </div>
  </div>
</template>
 
<script>
import ArticleDetail from "@/components/ArticleDetail";
import LinksDetail from "@/components/LinksDetail";

import Catalogue from "@/components/Catalogue";
import Comment from "@/components/Comment";
import TagCloud from "@/components/TagCloud";

export default {
  components: { ArticleDetail, Catalogue, Comment, TagCloud },
  props: {
    options: {
      type: Object,
      default: {
        type: "",
        links: false, // 友链
        catalogue: false,
        comments: false,
        tag: false,
        article: false
      }
    }
  },
  data() {
    return {
      setAsideLeft: "", // 用于计算侧边栏
      asideHidth: 0,
      id: ""
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
    }
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

    that.$nextTick(function() {
      that.asideHidth = that.$refs.aside.offsetHeight - 120;
    });
    window.onresize = function() {
      that.$nextTick(function() {
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
  }
};
</script>
<style lang="scss" scoped>
.article-wrapper-master {
  display: flex;
  .main {
    width: calc(100% - 400px);
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
  width: 400px;
  margin-bottom: 50px;
  z-index: 999;
  scrollbar-color: transparent transparent;
  scrollbar-track-color: transparent;
  -ms-scrollbar-track-color: transparent;
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
      transition: all 0.5s;
    }
  }
  .isShowAside {
    .aside {
      left: 7px !important;
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