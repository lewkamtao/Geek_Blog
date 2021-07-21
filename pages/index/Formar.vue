<template>
  <div class="wrapper">
    <div class="container">
      <div class="menu">
        <ul class="menu-list">
          <li
            　
            v-for="(nav, index) in navList"
            :key="'nav' + index"
            　　　　　　　　　　　　　　:class="{on: activeIndex === index}"
            　　　　　　　　　　　　　　@click="currentClick(index)"
          >
            <a href="javascript:;" @click="pageJump(nav.index)">{{
              nav.title
            }}</a>
            <div
              v-if="nav.children.length > 0 && activeIndex === index"
              　　　　　　　　　　　　　　　　class="menu-children-list"
            >
              <ul class="nav-list">
                <li
                  v-for="(item, idx) in nav.children"
                  :key="idx"
                  :class="{ on: childrenActiveIndex === idx }"
                  　@click.stop="childrenCurrentClick(idx)"
                >
                  <a href="javascript:;" @click="pageJump(item.index)"
                    >　　　　　　　　　　　　　　　　　　　　　　　　{{
                      item.title
                    }}　　　　　　　　　　　　　　　　　　　　　
                  </a>
                </li>
              </ul>
            </div>
          </li>
        </ul>
      </div>
      <div
        class="help-center-content"
        v-html="compiledMarkdown"
        　　　　　　　ref="helpDocs"
        @scroll="docsScroll"
      ></div>
    </div>
  </div>
</template>
<script>
import marked from "marked";

let rendererMD = new marked.Renderer();
marked.setOptions({
  renderer: rendererMD,
  gfm: true,
  tables: true,
  breaks: false,
  pedantic: false,
  sanitize: false,
  smartLists: true,
  smartypants: false,
});

export default {
  data() {
    return {
      navList: [],
      activeIndex: 0,
      docsFirstLevels: [],
      docsSecondLevels: [],
      childrenActiveIndex: 0,
    };
  },
  async asyncData({ $axios, route }) {
    const mdContent = (
      await $axios.get("/article", {
        params: {
          id: 110,
        },
      })
    ).data;
    return { mdContent };
  },
  mounted() {
    this.navList = this.handleNavTree();
    this.getDocsFirstLevels(0);
  },
  methods: {
    childrenCurrentClick(index) {
      this.childrenActiveIndex = index;
    },
    getDocsFirstLevels(times) {
      // 解决图片加载会影响高度问题
      setTimeout(() => {
        let firstLevels = [];
        Array.from(document.querySelectorAll("h1"), (element) => {
          firstLevels.push(element.offsetTop - 60);
        });
        this.docsFirstLevels = firstLevels;

        if (times < 8) {
          this.getDocsFirstLevels(times + 1);
        }
      }, 500);
    },
    getDocsSecondLevels(parentActiveIndex) {
      let idx = parentActiveIndex;
      let secondLevels = [];
      let navChildren = this.navList[idx].children;

      if (navChildren.length > 0) {
        secondLevels = navChildren.map((item) => {
          return this.$el.querySelector(`#data-${item.index}`).offsetTop - 60;
        });
        this.docsSecondLevels = secondLevels;
      }
    },
    docsScroll() {
      if (this.titleClickScroll) {
        return;
      }

      let scrollTop = this.$refs.helpDocs.scrollTop;
      let firstLevelIndex = this.getLevelActiveIndex(
        scrollTop,
        this.docsFirstLevels
      );
      this.currentClick(firstLevelIndex);

      let secondLevelIndex = this.getLevelActiveIndex(
        scrollTop,
        this.docsSecondLevels
      );
      this.childrenCurrentClick(secondLevelIndex);
    },
    getLevelActiveIndex(scrollTop, docsLevels) {
      let currentIdx = null;
      let nowActive = docsLevels.some((currentValue, index) => {
        if (currentValue >= scrollTop) {
          currentIdx = index;
          return true;
        }
      });

      currentIdx = currentIdx - 1;

      if (nowActive && currentIdx === -1) {
        currentIdx = 0;
      } else if (!nowActive && currentIdx === -1) {
        currentIdx = docsLevels.length - 1;
      }
      return currentIdx;
    },
    pageJump(id) {
      this.titleClickScroll = true;
      this.$refs.helpDocs.scrollTop =
        this.$el.querySelector(`#data-${id}`).offsetTop - 40;
      setTimeout(() => (this.titleClickScroll = false), 100);
    },
    currentClick(index) {
      this.activeIndex = index;
      this.getDocsSecondLevels(index);
    },
    getTitle(content) {
      let nav = [];

      let tempArr = [];
      content.replace(/(#+)[^#][^\n]*?(?:\n)/g, function (match, m1, m2) {
        let title = match.replace("\n", "");
        let level = m1.length;
        tempArr.push({
          title: title.replace(/^#+/, "").replace(/\([^)]*?\)/, ""),
          level: level,
          children: [],
        });
      });

      // 只处理一级二级标题，以及添加与id对应的index值
      nav = tempArr.filter((item) => item.level <= 2);
      let index = 0;
      return (nav = nav.map((item) => {
        item.index = index++;
        return item;
      }));
    },
    // 将一级二级标题数据处理成树结构
    handleNavTree() {
      let navs = this.getTitle(this.content);
      let navLevel = [1, 2];
      let retNavs = [];
      let toAppendNavList;

      navLevel.forEach((level) => {
        // 遍历一级二级标题，将同一级的标题组成新数组
        toAppendNavList = this.find(navs, {
          level: level,
        });

        if (retNavs.length === 0) {
          // 处理一级标题
          retNavs = retNavs.concat(toAppendNavList);
        } else {
          // 处理二级标题，并将二级标题添加到对应的父级标题的children中
          toAppendNavList.forEach((item) => {
            item = Object.assign(item);
            let parentNavIndex = this.getParentIndex(navs, item.index);
            return this.appendToParentNav(retNavs, parentNavIndex, item);
          });
        }
      });
      return retNavs;
    },
    find(arr, condition) {
      return arr.filter((item) => {
        for (let key in condition) {
          if (condition.hasOwnProperty(key) && condition[key] !== item[key]) {
            return false;
          }
        }
        return true;
      });
    },
    getParentIndex(nav, endIndex) {
      for (var i = endIndex - 1; i >= 0; i--) {
        if (nav[endIndex].level > nav[i].level) {
          return nav[i].index;
        }
      }
    },
    appendToParentNav(nav, parentIndex, newNav) {
      let index = this.findIndex(nav, {
        index: parentIndex,
      });
      nav[index].children = nav[index].children.concat(newNav);
    },
    findIndex(arr, condition) {
      let ret = -1;
      arr.forEach((item, index) => {
        for (var key in condition) {
          if (condition.hasOwnProperty(key) && condition[key] !== item[key]) {
            return false;
          }
        }
        ret = index;
      });
      return ret;
    },
  },
  computed: {
    content() {
      return this.mdContent;
    },
    compiledMarkdown: function () {
      let index = 0;
      rendererMD.heading = function (text, level) {
        if (level <= 2) {
          return `<h${level} id="data-${index++}">${text}</h${level}>`;
        } else {
          return `<h${level}>${text}</h${level}>`;
        }
      };
      rendererMD.code = function (code, language) {
        code = code.replace(/\r\n/g, "<br>");
        code = code.replace(/\n/g, "<br>");
        return `<div class="text">${code}</div>`;
      };
      return marked(this.content);
    },
  },
};
</script>