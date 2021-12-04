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
import hljs from "highlight.js"; //导入代码高亮文件

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

        await hljs;
        let highlight = document.querySelectorAll("pre");
        highlight.forEach(block => {
          hljs.highlightBlock(block);
        });
      }, 100);
    }
  },
  mounted() {
    if (process.browser) {
      this.$nextTick(function() {
        try {
          setTimeout(async () => {
            // 处理文章图片fancybox
            var imgdom = "";
            var imgs = document
              .getElementById("article-editor")
              .getElementsByTagName("img");

            imgs.forEach(function(img, index) {
              var elem = document.createElement("a");
              elem.setAttribute("data-fancybox", "gallery");
              imgdom = img.cloneNode(true);
              elem["href"] = imgdom.src;
              elem.appendChild(imgdom);
              img.parentNode.replaceChild(elem, img);
            });

            // 处理文章a标签跳转到新窗口
            var aTags = document.getElementById("article-editor").getElementsByTagName("a");
            aTags.forEach(function (aTag){
              aTag.setAttribute("target","_blank");
              aTag.setAttribute("rel","external nofollow noopener noreferrer");
            })

            // 处理代码块高亮
            await hljs;
            let highlight = document.querySelectorAll("pre");
            highlight.forEach(block => {
              hljs.highlightBlock(block);
            });
          }, 100);
        } catch {}
        util.checkHidContentFn(this.article_id, this);
      });
    }
  }
};
</script>

<style lang="scss" scoped></style>
