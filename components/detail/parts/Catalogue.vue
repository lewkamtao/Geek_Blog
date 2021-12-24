<template>
  <div class="catalogue part">
    <div class="main-title" style="margin-bottom: 12px">目录</div>
    <div class="catalogue-scroll">
      <ul class="catalogue-list"></ul>
    </div>
  </div>
</template>

<script>
import util from "@/util/index";

export default {
  methods: {
    // 文章目录
    catalogue() {
      // document
      //   .querySelector(".catalogue .catalogue-list")
      //   .style.setProperty("max-height", "500px");
      // document
      //   .querySelector(".catalogue .catalogue-list")
      //   .style.setProperty("overflow", "auto");
      let contentElement = document.getElementById("article-editor");
      let catalogueContent = document.querySelector(
        ".catalogue .catalogue-list"
      );
      let children = contentElement.children;
      // 初始化内容
      catalogueContent.innerHTML = "";
      document.querySelector(".catalogue").style.setProperty("display", "none");
      // 转换数组，防止报错
      children = Array.from(children);
      children.forEach((item, index) => {
        let tag_name = item.tagName.toUpperCase();
        if (tag_name.substr(0, 1) === "H" && tag_name.substr(0, 2) !== "HR") {
          // 获取 H标签 内容
          let text = item.textContent;
          // 文章目录缩进判断
          let indent = 0;
          let num = Number(tag_name.substr(1, 1));
          switch (num) {
            case 1:
            case 2:
              indent = 0;
              break;
            case 3:
            case 4:
            case 5:
            case 6:
              indent = num - 2;
              break;
            default:
              break;
          }
          // 设置锚点ID
          let mark = "mark-" + tag_name + "-" + index;
          item.setAttribute("id", mark);
          // 设置目录层级样式
          let markCss = "mark-" + tag_name;
          document.querySelector(".catalogue .catalogue-list").innerHTML +=
            '<li class="catalogue-item ' +
            markCss +
            '" name="' +
            mark +
            '">' +
            '<a' +
            ' style="text-indent:' +
            indent +
            'em">' +
            text + '</a>' +
            "</li>";
          document.querySelector(".catalogue").style.removeProperty("display");
        }
      });
    },
    // 目录跳转
    markLocation() {
      document.querySelectorAll(".catalogue-item").forEach((item) => {
        item.addEventListener(
          "click",
          (e) => {
            let active = document.querySelector(".catalogue-item.active");
            if (active !== null) {
              active.classList.remove("active");
            }
            if (e.target.tagName.toUpperCase() === 'A') {
              console.log(e.target.parentNode)
              e.target.parentNode.classList.add("active");
            } else {
              e.target.classList.add("active");
            }
            let offsetTop = document.querySelector(
              "#" + item.getAttribute("name")
            ).offsetTop;
            let topHeight =
              document.querySelector(".top-nav").offsetHeight - 70;
            let maskHeight = document.querySelector(
              ".article-wrapper .mask"
            ).offsetHeight;
            // util.toScroll(offsetTop + topHeight + maskHeight, 200);
            util.scrollSmoothTo(offsetTop + topHeight + maskHeight);
          },
          false
        );
      });
    },
  },
  created() {
  },
  mounted() {
    if (process.browser) {
      this.$nextTick(function () {
        // 文章目录
        this.catalogue();
        // 目录跳转
        this.markLocation();
      });
    }
  },
};
</script>
<style lang="scss">
.catalogue {
  .catalogue-scroll {
    padding-left: 7px;
    max-height: 500px;
    overflow: auto;
  }

  .catalogue-scroll::-webkit-scrollbar {
    width: 3px;
    height: 3px;
  }

  .catalogue-scroll::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background: rgba(0, 0, 0, 0);
  }

  .catalogue-scroll:hover::-webkit-scrollbar-thumb {
    background: rgba(146, 146, 146, .3);
  }

  .catalogue-scroll::-webkit-scrollbar-track {
    background: none;
  }

  .catalogue-item a {
    cursor: pointer;
    margin: 0 10px 0 10px;
    display: block;
    border-radius: 4px;
    padding: 0.5em;
  }

  .catalogue-item.active a {
    color: #000 !important;
    //font-weight: bolder;
    background: #ededed;
  }

  .catalogue-item a:hover {
    color: #000 !important;
    //font-weight: bolder;
    background: #ededed;
  }

  .catalogue-list {
    list-style: none;
    position: relative;
    border-left: 1px solid rgba(50, 50, 50, 0.06);
    padding: 20px 0px 20px 0;
  }

  .catalogue-list::before {
    bottom: auto;
    top: 0;
    position: absolute;
    left: -6px;
    width: 11px;
    height: 11px;
    border: 2px solid #14b596;
    border-radius: 15px;
    content: '';
    transition: .15s;
  }

  .catalogue-list::after {
    position: absolute;
    bottom: 0;
    left: -6px;
    width: 11px;
    height: 11px;
    border: 2px solid #14b596;
    border-radius: 15px;
    content: '';
    transition: .15s;
  }

  .catalogue-list li {
    position: relative;
    display: block;
  }

  .catalogue-list li::before {
    top: 50%;
    transform: translateY(-50%);
    position: absolute;
    bottom: 0;
    left: -4px;
    width: 7px;
    height: 7px;
    border: 2px solid #b1b1b1;
    background: #b1b1b1;
    border-radius: 15px;
    content: '';
    transition: .15s;
  }

  .catalogue-list li:hover::before {
    border: 2px solid #14b596;
    background: #14b596;
  }

  .catalogue-list li.active::before {
    border: 2px solid #14b596;
    background: #14b596;
  }

  .catalogue-list::-webkit-scrollbar {
    display: none;
  }
}
</style>
<style lang="scss" scoped>
.catalogue {
  .catalogue-item {
    line-height: 2em;
    cursor: pointer;
  }
}

@media screen and (max-width: 1025px) {
  .catalogue {
    display: none;
  }
}
</style>
