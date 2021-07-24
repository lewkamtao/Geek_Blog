<template>
  <div class="article-wrapper" :style="'min-height:' + minHidth + 'px;'">
    <header
      class="border border-primary"
      :style="'background:url(http://www.dmoe.cc/random.php)'"
      :class="getBorderType()"
    >
      <div class="mask"></div>
      <div class="content">
        <div class="title">{{ article.title }}</div>
        <div class="summary">
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18px"
              height="18px"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="feather feather-user"
            >
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
              <circle cx="12" cy="7" r="4"></circle>
            </svg>
            <polyline points="12 6 12 12 16 14"></polyline>
            {{ article.expand.author.nickname }}
          </div>
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16px"
              height="16px"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="feather feather-eye"
            >
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
              <circle cx="12" cy="12" r="3"></circle>
            </svg>
            <polyline points="12 6 12 12 16 14"></polyline>

            {{ article.views }}
          </div>
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18px"
              height="18px"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="feather feather-message-square"
            >
              <path
                d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"
              ></path>
            </svg>
            {{ article.expand.comments || "暂无评论" }}
          </div>
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18px"
              height="18px"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="feather feather-clock"
            >
              <circle cx="12" cy="12" r="10"></circle>
              <polyline points="12 6 12 12 16 14"></polyline>
            </svg>

            {{ article.create_time }} /
            {{ getBeautifyTime(article.create_time) }}
          </div>
        </div>
      </div>
    </header>

    <main class="section">
      <div class="vditor-reset" id="vditorPreview"></div>
    </main>
  </div>
</template>

<script>
import util from "@/util/index";
import VditorPreview from "vditor/dist/method.min";

export default {
  head() {
    return {
      link: [
        {
          rel: "stylesheet",
          type: "text/css",
          href:
            "https://cdn.bootcdn.net/ajax/libs/font-awesome/5.15.3/css/all.css"
        },
        {
          rel: "stylesheet",
          type: "text/css",
          href: "https://cdn.jsdelivr.net/npm/vditor/dist/index.css"
        }
      ]
    };
  },
  components: {},
  props: {
    minHidth: {
      // 受缩放插件影响需要，同步一下高度
      type: Number,
      default: 500
    },
    article: {
      type: Object,
      default: {}
    }
  },
  data() {
    return {};
  },
  watch: {
    article: function() {
      this.renderMarkdown(this.article.content);
    }
  },
  computed: {
    getBorderType() {
      return function() {
        return "border-" + Math.floor(Math.random() * 6 + 1);
      };
    },
    getBeautifyTime() {
      return function(time) {
        return util.getBeautifyTime(time);
      };
    }
  },
  methods: {
    renderMarkdown(md) {
      if (process.browser) {
        VditorPreview.preview(document.getElementById("vditorPreview"), md, {
          hljs: { style: "github" }
        });
      }
    }
  },
  created() {},
  mounted() {
    this.$nextTick(function() {
      this.renderMarkdown(this.article.content);
    });
  }
};
</script>
<style lang="scss" scoped>
.article-wrapper {
  padding: 30px;
  display: flex;
  flex-direction: column;

  header {
    position: relative;
    overflow: hidden;
    padding: 50px;
    color: #000;
    text-align: center;
    background-size: cover !important;

    .mask {
      position: absolute;
      top: -5%;
      left: -5%;
      width: 110%;
      height: 110%;
      background: rgba($color: #000000, $alpha: 0.4);
    }
    .content {
      position: relative;
      z-index: 999;
      color: #fff;
    }
    .title {
      font-size: 40px;
      margin-bottom: 30px;
    }
    .summary {
      display: flex;
      justify-content: center;
      align-items: center;
      white-space: nowrap;
      div {
        display: flex;
        justify-content: center;
        align-items: center;
        margin: 10px 20px;
        font-size: 18px;
        .feather {
          margin-right: 10px;
        }
      }
    }
  }

  main {
    margin-top: 30px;
    margin-bottom: 0px;
  }

  .section:after {
    margin-top: 150px;
  }

  @media screen and (max-width: 1440px) {
    header {
      text-align: left;
      .summary {
        align-items: flex-start;
        flex-direction: column;
        div {
          margin: 10px 0px;
        }
      }
    }
  }
}
</style>