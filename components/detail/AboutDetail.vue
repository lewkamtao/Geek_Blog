<template>
  <div class="article-wrapper">
    <header
      :style="'background:url(' + geek_config.images_config.bg_about + ')'"
    ></header>
    <div class="user-info">
      <div class="user-box">
        <div class="nickname">{{ user.nickname }}</div>
        <div class="avatar">
          <img :src="user.head_img" alt="" />
        </div>
      </div>
      <div class="direction">{{ user.description }}</div>
    </div>
    <div class="tips" v-show="article_tips">{{ article_tips }}</div>
    <main class="section">
      <div class="vditor-reset" id="preview"></div>
    </main>
  </div>
</template>

<script>
import util from "@/util/index";
import Vditor from "vditor";
import "vditor/src/assets/scss/index.scss";

export default {
  head() {
    return {
      link: [
        {
          rel: "stylesheet",
          type: "text/css",
          href: "https://cdn.bootcdn.net/ajax/libs/font-awesome/5.15.3/css/all.css",
        },
        {
          rel: "stylesheet",
          type: "text/css",
          href: "https://cdn.jsdelivr.net/npm/vditor/dist/index.css",
        },
      ],
    };
  },
  components: {},
  props: {
    user: {
      type: Object,
      default: function () {
        return {};
      },
    },
    geek_config: {
      type: Object,
      default: function () {
        return {};
      },
    },
    article: {
      type: Object,
      default: function () {
        return {};
      }
    },
  },
  data() {
    return {
      article_tips: false,
    };
  },
  watch: {},
  computed: {
    getBeautifyTime() {
      return function (time) {
        return util.getBeautifyTime(time);
      };
    },
  },
  methods: {
    renderMarkdown(md) {
      Vditor.preview(document.querySelector("#preview"), md, {
        speech: {
          enable: true,
        },
        anchor: 1,
      });
    },
  },
  created() {
    if (process.browser && JSON.stringify(this.article) != "{}") {
      this.$nextTick(function () {
        this.renderMarkdown(this.article.content);
      });
    } else {
      this.article_tips =
        "注意：请在inis后台添加页面，别名必须为：about，否则不生效。";
    }
  },
  mounted() {},
};
</script>
<style lang="scss" scoped>
.article-wrapper {
  padding: 0px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  .user-info {
    margin-top: -50px;
    width: 100%;
    .user-box {
      display: flex;
      align-items: center;
      justify-content: flex-end;
      margin-right: 20px;
      color: #fff;
      .nickname {
        transform: translateY(-50%);
        font-size: 16px;
        font-weight: bold;
      }
      .avatar {
        width: 70px;
        height: 70px;
        margin-left: 15px;
        img {
          width: 100%;
          height: 100%;
          border-radius: 5px;
        }
      }
    }
    .direction {
      text-align: right;
      margin: 10px 25px;
      color: #666;
    }
  }
  header {
    background-color: #eee;
    height: 300px;
    background-size: cover !important;
    background-position: center !important;
  }

  main {
    margin-top: 0px;
    margin-bottom: 0px;
    padding: 30px;
  }

  .section:after {
    margin-top: 150px;
  }
}
.tips {
  height: 500px;
  line-height: 500px;
  text-align: center;
}
@media screen and (max-width: 1440px) {
}
// 移动端适配
@media screen and (max-width: 1025px) {
  .article-wrapper {
    padding: 0px;
    main {
      margin-top: 0px;
      margin-bottom: 0px;
      padding: 0px 15px 50px 15px;
    }
  }
}
</style>
