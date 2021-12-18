<template>
  <div class="catalogue part">
    <div class="main-title" style="margin-bottom: 12px">目录</div>
    <div class="catalogue-list vditor-outline" id="outline"></div>
  </div>
</template>

<script>
import util from "@/util/index";

export default {
  methods: {
    // 文章目录
    catalogue() {
      document.querySelector(".catalogue .catalogue-list").style.setProperty("min-height", "200px")
      document.querySelector(".catalogue .catalogue-list").style.setProperty("max-height", "500px")
      document.querySelector(".catalogue .catalogue-list").style.setProperty("overflow", "auto")
      let contentElement = document.getElementById("article-editor")
      let slimscroll = document.querySelector(".catalogue .catalogue-list")
      let children = contentElement.children
      slimscroll.innerHTML = ''
      document.querySelector(".catalogue").style.setProperty("display", "none")
      // 转换数组，防止报错
      children = Array.from(children)
      children.forEach((item, index) => {
        let tag_name = item.tagName.toUpperCase()
        if (tag_name.substr(0, 1) === "H" && tag_name.substr(0, 2) !== "HR") {
          // 获取 H标签 内容
          let text = item.textContent
          // 设置锚点ID
          let mark = "mark-" + tag_name + "-" + index
          item.setAttribute("id", mark)
          // 设置目录层级样式
          let markCss = "mark-" + tag_name
          document.querySelector(".catalogue .catalogue-list").innerHTML += '<div class="catalogue-item ' + markCss + '" name="' + mark + '"># ' + text + '</div>'
          document.querySelector(".catalogue").style.removeProperty("display")
        }
      })
    },
    // 目录跳转
    markLocation() {
      document.querySelectorAll('.catalogue-item').forEach((item) => {
        item.addEventListener('click', (e) => {
          let active = document.querySelector('.catalogue-item.active')
          if (active !== null) {
            active.classList.remove('active')
          }
          e.target.classList.add('active')
          let offsetTop = document.querySelector("#" + item.getAttribute("name")).offsetTop
          let topHeight = document.querySelector(".top-nav").offsetHeight - 70
          let maskHeight = document.querySelector(".article-wrapper .mask").offsetHeight
          util.toScroll(offsetTop + topHeight + maskHeight, 200)
        }, false)
      })
    }
  },
  created() {
  },
  mounted() {
    if (process.browser) {
      this.$nextTick(function () {
        // 文章目录
        this.catalogue()
        // 目录跳转
        this.markLocation()
      })
    }

  }
}
</script>

<style lang="scss" scoped>
.catalogue {
  .catalogue-item {
    line-height: 2em;
    cursor: pointer;
  }

  .catalogue-item:hover {
    color: #727cf5;
  }
}


@media screen and (max-width: 1025px) {
  .catalogue {
    display: none;
  }
}
</style>
