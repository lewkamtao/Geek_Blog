<template>
  <div class="right-wrapper article-wrapper">
    <div ref="articleMain" class="main part links">
      <header
        class="border border-primary"
        :style="'background:url(http://www.dmoe.cc/random.php)'"
        :class="getBorderType"
      >
        <div class="mask"></div>
        <div class="content">
          <div class="title">友情链接</div>
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
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
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
                class="feather feather-link"
              >
                <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
              </svg>
              {{ links.count }}
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
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                <circle cx="12" cy="12" r="3" />
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
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
              </svg>
              {{ article.expand.comments }}
            </div>
          </div>
        </div>
      </header>
      <div class="card" style="width: 80%; margin: 50px auto">
        <div class="card-body">
          <h4 class="card-title">这里是友情链接模块!</h4>
          <h5 class="card-subtitle">当前页面正在开发</h5>

          <p class="card-text">
            一个基于很牛*的系统开发的一个很牛*的主题
            <br />这是一个目前还不算完整，使用 Vue + Nuxt.js
            开发的现代化博客，不算太慢，有点意思。
          </p>
        </div>
        <img src="https://kamtao-1255310647.cos.ap-chengdu.myqcloud.com/img/Gxf32F.jpg" alt srcset />
      </div>
    </div>
    <div ref="aside" :style="setAsideLeft" class="aside">
      <Aside type="links" @reloadComments="getComments" :comments="comments" :article="article" />
    </div>
  </div>
</template>

<script>
// 这里是友情链接的id 注意要是文章的id 文章标题必须是：友情链接
var links_article_id = 13;

export default {
  components: {},
  head() {
    return {
      title: this.article.title
    };
  },
  async asyncData({ $axios, route }) {
    const article = (
      await $axios.get("/article", {
        params: {
          id: links_article_id
        }
      })
    ).data;
    const links = (await $axios.get("/links")).data;
    const comments = (
      await $axios.get("/comments", {
        params: {
          article_id: links_article_id,
          tree: false,
          limit: 10000
        }
      })
    ).data;
    return { article, comments, links };
  },
  props: {},
  data() {
    return {
      setAsideLeft: "", // 用于计算侧边栏
      asideHidth: 0,
      id: links_article_id
    };
  },

  watch: {},
  computed: {
    getBorderType() {
      return function() {
        return "border-" + Math.floor(Math.random() * 6 + 1);
      };
    }
  },
  methods: {
    // 获取评论
    async getComments() {
      const comments = (
        await this.$axios.get("/comments", {
          params: {
            article_id: links_article_id,
            tree: false,
            limit: 10000
          }
        })
      ).data;
      this.comments = comments;
    }
  },

  created() {},

  mounted() {
    var that = this;
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
.article-wrapper {
  display: flex;
  .main {
    width: calc(100% - 400px);
    min-width: 500px;
  }
}

.aside {
  top: 0px;
  padding: 75px 7px 7px 7px;
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
    margin-bottom: 24px;
    font-weight: bold;
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
      font-size: 15px;
      .feather {
        margin-right: 10px;
      }
    }
  }
}
.aside::-webkit-scrollbar {
  width: 0px;
  height: 0px;
  display: none;
}

// 移动端适配
@media screen and (max-width: 680px) {
  .article-wrapper {
    .main {
      min-width: 100%;
      width: 100%;
    }
    header {
      padding: 20px;
      .title {
        font-size: 26px;
      }
      .summary {
        div {
          font-size: 14px;
        }
      }
    }
    .card {
      width: 100% !important;
    }
    .aside {
      left: 7px !important;
      padding: 73px 7px 7px 7px;
    }
  }
}
</style>