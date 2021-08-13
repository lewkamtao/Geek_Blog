<template>
  <div class="article-wrapper">
    <header
      :style="'background:url(' + geek_config.site_info.timeline_bg + ')'"
    ></header>
    <div class="user-info">
      <div class="user-box">
        <div class="nickname">{{ geek_config.master_info.nickname }}</div>
        <div class="avatar">
          <img :src="geek_config.master_info.head_img" alt="" />
        </div>
      </div>
      <div class="direction">{{ geek_config.master_info.description }}</div>
    </div>
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
    geek_config: {
      type: Object,
      default: function () {
        return {};
      },
    },
    article: {
      type: Object,
      default: {},
    },
  },
  data() {
    return {
      article_title_list: [],
    };
  },
  watch: {
    article: function () {
      this.renderMarkdown(this.article.content);
    },
  },
  computed: {
    getBorderType() {
      return function () {
        return "border-" + Math.floor(Math.random() * 6 + 1);
      };
    },
    getBeautifyTime() {
      return function (time) {
        return util.getBeautifyTime(time);
      };
    },
  },
  methods: {
    renderMarkdown(md) {
      var that = this;
      const initOutline = () => {
        const headingElements = [];
        this.article_title_list = [];
        Array.from(document.getElementById("preview").children).forEach(
          (item, index) => {
            if (
              item.tagName.length === 2 &&
              item.tagName !== "HR" &&
              item.tagName.indexOf("H") === 0
            ) {
              item.id = item.innerText + "_" + index;

              this.article_title_list.push({
                dom: item,
                id: item.id,
                title: item.innerText,
                offsetTop: item.offsetTop,
              });
            }
          }
        );
        Array.from(
          document.getElementById("outline").getElementsByTagName("li")
        ).forEach((item, index) => {
          item.setAttribute(
            "data-target-id",
            this.article_title_list[index].id
          );
        });

        let toc = this.article_title_list.map((item) => {
          return item.dom;
        });
        window.addEventListener("scroll", () => {
          const scrollTop = window.scrollY;
          const currentElement = document.querySelector(
            ".vditor-outline__item--current"
          );
          for (let i = 0, iMax = toc.length; i < iMax; i++) {
            if (scrollTop < toc[i].offsetTop - 250) {
              if (currentElement) {
                currentElement.classList.remove(
                  "vditor-outline__item--current"
                );
              }
              let index = i > 0 ? i - 1 : 0;
              document
                .querySelector(
                  'li[data-target-id="' +
                    this.article_title_list[index].id +
                    '"]'
                )
                .classList.add("vditor-outline__item--current");
              break;
            }
          }
        });
      };
      Vditor.preview(document.querySelector("#preview"), md, {
        speech: {
          enable: true,
        },
        anchor: 1,
        after() {
          const outlineElement = document.querySelector("#outline");
          Vditor.outlineRender(
            document.querySelector("#preview"),
            outlineElement
          );

          if (outlineElement.innerText.trim() !== "") {
            outlineElement.style.display = "block";
            that.$nextTick(function () {
              initOutline();
            });
          } else {
            outlineElement.style.display = "block";
            outlineElement.innerHTML = "暂无目录";
          }
        },
      });
    },
  },
  created() {
    if (process.browser) {
      this.$nextTick(function () {
        this.renderMarkdown(this.article.content);
      });
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
        width: 75px;
        height: 75px;
        margin-left: 15px;
        img {
          border-radius: 5px;
        }
      }
    }
    .direction {
      text-align: right;
      margin: 20px 10px;
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
@media screen and (max-width: 1440px) {
}
// 移动端适配
@media screen and (max-width: 1025px) {
  .article-wrapper {
    padding: 20px;
  }
}
</style>
