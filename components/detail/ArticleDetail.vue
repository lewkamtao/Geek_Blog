<template>
  <div class="article-wrapper">
    <main class="section">
      <header class="border border-primary">
        <div class="bg"></div>
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
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
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
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                <circle cx="12" cy="12" r="3" />
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
              {{ article.expand.comments.count || "暂无评论" }}
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
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
              {{ article.create_time }} /
              {{ getBeautifyTime(article.create_time) }}
            </div>
          </div>
        </div>
      </header>
      <div class="article-main">
        <div class="edit-box">
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
        </div>

        <!--文章内容-->
        <article-editor :content="article.content" :article_id="article.id">
        </article-editor>
      </div>
    </main>
    <!--文章页脚-->
    <article-footer :article="article"></article-footer>
  </div>
</template>

<script>
import util from "@/util/index";
import ArticleEditor from "../custom/ArticleEditor";
import ArticleFooter from "../custom/ArticleFooter.vue";

export default {
  components: { ArticleEditor, ArticleFooter },
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
  },
  created() {
    this.token = this.$cookies.get("token");
  },
  mounted() {},
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
    padding: 30px;
    color: #000;
    text-align: center;
    overflow: hidden;
    border-radius: 6px 6px 0px 0px;

    .bg {
      position: absolute;
      left: 0px;
      top: 0px;
      width: 100%;
      height: 100%;
      opacity: 0.08;
      background: url(https://tngeek-mall-1255310647.cos.ap-guangzhou.myqcloud.com/public/images/fish/userHomeBg.svg);
      background-size: cover;
      background-position: center;
      filter: invert(70%);
    }

    .content {
      position: relative;
      z-index: 9;
      color: #000;
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
    padding: 0px;
  }
  .article-main {
    padding: 20px;
  }
  .section:after {
    margin-top: 150px;
  }
  .end {
    background-color: rgba(163, 163, 163, 0.9);
    color: #fff;
    padding: 3px 20px;
    position: relative;
    border-radius: 14px;
  }
  .appreciation-box {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100px;
    height: 40px;
    margin: 0 auto;
    font-size: 14px;
    background: rgb(221, 86, 70);
    border-radius: 50px;
    color: #fff;
    cursor: pointer;
    .icon {
      font-size: 18px;
    }
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
    .edit-box {
      display: none;
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
  }
}
</style>
