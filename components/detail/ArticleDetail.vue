<template>
  <div class="article-wrapper">
    <header
      class="border border-primary"
      :style="`background:url(https://tngeek-mall-1255310647.cos.ap-guangzhou.myqcloud.com/public/images/pexels/${article.id}.jpg!blog_header)`"
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
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
              <circle cx="12" cy="7" r="4"/>
            </svg>
            <polyline points="12 6 12 12 16 14"></polyline>
            {{ article.expand ? article.expand.author.nickname : "" }}
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
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
              <circle cx="12" cy="12" r="3"/>
            </svg>
            <polyline points="12 6 12 12 16 14"></polyline>
            {{ article.views || 1 }}
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
              />
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
              <circle cx="12" cy="12" r="10"/>
              <polyline points="12 6 12 12 16 14"/>
            </svg>
            {{ article.create_time }} /
            {{ getBeautifyTime(article.create_time) }}
          </div>
        </div>
      </div>
    </header>

    <main class="section">
      <nuxt-link
        v-if="token"
        :to="'/AddArticle?id=' + article.id"
        style="margin-bottom: 50px; margin-right: 20px"
        class="ui blue labeled submit icon button"
      >
        <i class="icon edit outline"></i>
        编辑文章
      </nuxt-link>
      <div
        v-if="token"
        @click="delConfirm"
        style="margin-bottom: 50px"
        class="ui red labeled submit icon button"
      >
        <i class="icon trash alternate outline"></i>
        删除文章
      </div>
      <article-editor :content="article.content" :article_id="article.id">
      </article-editor>
      <div class="article-footer">
        <section id="license">
          <div class="header"><span>许可协议</span></div>
          <div class="body">
            <p>
              <span>本文采用</span>
              <a target="_blank" rel="external nofollow noopener noreferrer"
                 href="https://creativecommons.org/licenses/by-nc-sa/4.0/">署名-非商业性使用-相同方式共享 4.0 国际</a>
              <span>许可协议，转载请注明出处。</span>
            </p>
          </div>
        </section>
        <section id="share">
          <div class="header"><span>分享文章</span></div>
          <div class="body">
            <div class="link"><input class="copy-area" readonly="true" id="copy-link" :value="articleUrl"/></div>
            <div class="social-wrap dis-select">
              <a class="social share-item wechat" @click="toggle('qrcode-wechat')"><img
                src="https://cdn.jsdelivr.net/gh/cdn-x/placeholder@1.0.1/social/b32ef3da1162a.svg" alt=""></a>
              <a class="social share-item weibo" target="_blank" rel="external nofollow noopener noreferrer"
                 :href="'https://service.weibo.com/share/share.php?url='+ articleUrl +'&amp;title=' + article.title + '&amp;summary=' + article.description"><img
                class="lazy entered loaded"
                src="https://cdn.jsdelivr.net/gh/cdn-x/placeholder@1.0.1/social/80c07e4dbb303.svg" alt=""></a>
              <a class="social share-item email"
                 :href="'mailto:?subject='+ article.title +'&amp;body='+ articleUrl"><img
                src="https://cdn.jsdelivr.net/gh/cdn-x/placeholder@1.0.1/social/a1b00e20f425d.svg" alt=""></a>
              <a class="social share-item link" @click="copy('copy-link')"><img
                src="https://cdn.jsdelivr.net/gh/cdn-x/placeholder@1.0.1/social/8411ed322ced6.svg"></a>
            </div>
            <div class="qrcode" id="qrcode-wechat" style="visibility:hidden;height:0"><img
              src="https://api.qrserver.com/v1/create-qr-code/?size=256x256&amp;data=https://hasaik.com/posts/3fe685e0.html"
              alt=""></div>
          </div>
        </section>
      </div>
    </main>
  </div>
</template>

<script>
import util from "@/util/index";
import ArticleEditor from "../custom/ArticleEditor";

export default {
  components: {ArticleEditor},
  props: {
    article: {
      type: Object,
      default: function () {
        return {};
      },
    },
  },
  data() {
    return {
      article_title_list: [],
      token: "",
      blog: "",
      articleUrl: ""
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
    delConfirm() {
      this.$confirm("此操作将永久删除该文章, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.del(this.article.id);
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    del(id) {
      if (this.token) {
        var data = {
          "login-token": this.token,
          mode: "remove",
          id: JSON.stringify(id),
        };

        this.$axios.post("/api/article", data).then((res) => {
          if (res.code == 200) {
            this.$notify({
              type: "success",
              title: "恭喜！",
              message: "成功删除了一篇文章",
              duration: 5000,
              offset: 65,
            });
            this.$router.push("/");
          }
        });
      }
    },
    toggle(id) {
      const el = document.getElementById(id);
      if (el) {
        el.classList.toggle("display");
      }
    },
    copy(id) {
      const el = document.getElementById(id);
      if (el) {
        el.select();
        document.execCommand("Copy");
        this.$notify({
          type: "success",
          title: "成功",
          message: "复制成功！"
        });
      }
    }
  },
  created() {
    this.token = this.$cookies.get("token");
  },

  mounted() {
    this.articleUrl = window.document.location.host + '/Article?id=' + this.article.id
  },
};
</script>
<style lang="scss" scoped>
.article-wrapper {
  padding: 0px;
  display: flex;
  flex-direction: column;

  header {
    position: relative;
    overflow: hidden;
    padding: 50px;
    color: #000;
    text-align: center;
    background-size: cover !important;
    background-position: center !important;
    border-radius: 8px 8px 0px 0px;

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
      z-index: 9;
      color: #fff;
    }

    .title {
      font-size: 30px;
      font-weight: bold;
      text-align: left;
      margin-bottom: 24px;
      line-height: 35px;
    }

    .summary {
      display: flex;
      justify-content: flex-start;
      align-items: flex-start;
      flex-direction: column;
      white-space: nowrap;

      div {
        display: flex;
        justify-content: center;
        align-items: center;
        margin: 10px 0px;
        font-size: 14px;

        .feather {
          margin-right: 5px;
        }
      }
    }
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

// 移动端适配
@media screen and (max-width: 1025px) {
  .article-wrapper {
    padding: 0px;

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
  }
}
</style>
