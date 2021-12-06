<template>
  <no-ssr>
    <mavon-editor
      id="article-editor"
      v-html="content"
      :ishljs="true"
      style="box-shadow: none;z-index:0"
    >
    </mavon-editor
  ></no-ssr>
</template>

<script>
import util from "@/util/index";
import "highlight.js/styles/googlecode.css";

export default {
  components: {},
  props: {
    article_id: {
      type: Number,
      default: function() {
        return 0;
      }
    },
    content: {
      type: String,
      default: function() {
        return "";
      }
    }
  },
  beforeRouteUpdate(to, from, next) {
    if (process.browser) {
      next();
      setTimeout(async () => {
        var objs = document
          .getElementById("article-editor")
          .getElementsByTagName("img");
        for (var i = 0; i < objs.length; i++) {
          objs[i].onclick = function() {
            window.open(this.src);
          };
          objs[i].style.cursor = "pointer";
        }

        // 代码块高亮及复制功能
        util.addCodeCopyBtn()
      }, 100);
    }
  },
  mounted() {
    if (process.browser) {
      this.$nextTick(function() {
        try {
          setTimeout(async () => {
            // 处理文章图片fancybox
            let imgdom = "";
            let imgs = document
              .getElementById("article-editor")
              .getElementsByTagName("img");

            for (let i = 0; i < imgs.length; i++) {
              // 如果img标签的父级是a标签，不增加fancybox
              let node= imgs[i].parentNode.localName;
              if (node === "a"){
                continue;
              }
              let elem = document.createElement("a");
              elem.setAttribute("data-fancybox", "gallery");
              imgdom = imgs[i].cloneNode(true);
              elem["href"] = imgdom.src;
              elem.appendChild(imgdom);
              imgs[i].parentNode.replaceChild(elem, imgs[i]);
            }

            // 处理文章a标签跳转到新窗口
            Array.from(document.getElementById("article-editor").getElementsByTagName("a")).forEach(function (aTag){
              aTag.setAttribute("target","_blank");
              aTag.setAttribute("rel","external nofollow noopener noreferrer");
            })

            // 代码块高亮及复制功能
            util.addCodeCopyBtn()
          }, 100);
        } catch {}
        util.checkHidContentFn(this.article_id, this);
      });
    }
  }
};
</script>

<style lang="scss" scoped></style>
