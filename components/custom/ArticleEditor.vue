<template>
  <no-ssr>
    <mavon-editor
      id="article-editor"
      v-html="content"
      style="box-shadow: none;z-index:0"
    >
    </mavon-editor
  ></no-ssr>
</template>

<script>
import util from "@/util/index";

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
      //  隐藏遮罩 优先级
      next();
      setTimeout(() => {
        var objs = document
          .getElementById("article-editor")
          .getElementsByTagName("img");
        for (var i = 0; i < objs.length; i++) {
          objs[i].onclick = function() {
            window.open(this.src);
          };
          objs[i].style.cursor = "pointer";
        }
      }, 300);
    }
  },
  mounted() {
    if (process.browser) {
      this.$nextTick(function() {
        try {
          setTimeout(() => {
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
              console.log(elem);
              img.parentNode.replaceChild(elem, img);
            });
          }, 300);
        } catch {}
        util.checkHidContentFn(this.article_id, this);
      });
    }
  }
};
</script>

<style lang="scss" scoped></style>
