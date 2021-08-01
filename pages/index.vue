<template>
  <div id="top" class="wrapper" :class="{ isShowNav: isShowNav, isShowAside: isShowAside }">
    <TopNav @showNav="showNav()" :options="options" class="top-nav-wrapper-master" />
    <LeftNav
      :options="options"
      :article_sort="article_sort"
      :article="article"
      :links="links"
      :pages="pages"
      class="left-nav"
    />
    <div class="index-main">
      <nuxt-child :options="options" />
      <Footer />
    </div>

    <div class="to-top">
      <div
        @click="showAside()"
        class="show-aside-btn"
        :class="{ isShowOpenAsideBtn: isShowOpenAsideBtn }"
      >
        <div style="margin-top: -5px">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20px"
            height="20px"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="feather feather-twitch"
          >
            <path d="M21 2H3v16h5v4l4-4h5l4-4V2zm-10 9V7m5 4V7" />
          </svg>
        </div>
      </div>
      <a href="#top" class="paper-btn">
        <div>^</div>
      </a>
    </div>
  </div>
</template>

<script>
import DevicePixelRatio from "@/util/devicePixelRatio.js";
import util from "@/util/index";

export default {
  components: {},
  head() {
    return {
      title: this.options.title,
      meta: [
        {
          hid: "description",
          name: "description",
          content: this.options.keywords
        }
      ],
      link: [{ rel: "icon", type: "image/x-icon", href: this.options.site_ico }]
    };
  },
  async asyncData({ $axios }) {
    const options = (await $axios.get("/options")).data;
    const article_sort = (await $axios.get("/article-sort?limit=1000")).data
      ;
    const pages = (await $axios.get("/page")).data.data;
    const links = (await $axios.get("/links?limit=5")).data.data;
    const article = (await $axios.get("/article?limit=5")).data;

    return { options, article_sort, article, pages, links };
  },
  props: {},
  data() {
    return {
      isShowNav: false,
      isShowAside: false,
      isShowOpenAsideBtn: false,
      backUpTopScroll: 0
    };
  },
  watch: {},
  computed: {},
  methods: {
    showNav() {
      if (process.browser && !this.isShowAside) {
        if (!this.isShowNav && this.backUpTopScroll == 0) {
          this.backUpTopScroll = document.documentElement.scrollTop;
        } else {
          var top = JSON.parse(JSON.stringify(this.backUpTopScroll));
          setTimeout(function() {
            document.documentElement.scrollTop = top;
          }, 10);
          this.backUpTopScroll = 0;
        }
      }
      this.isShowNav = !this.isShowNav;
    },
    showAside() {
      if (process.browser && !this.isShowNav) {
        if (!this.isShowNav && this.backUpTopScroll == 0) {
          this.backUpTopScroll = document.documentElement.scrollTop;
        } else {
          var top = JSON.parse(JSON.stringify(this.backUpTopScroll));
          setTimeout(function() {
            document.documentElement.scrollTop = top;
          }, 10);
          this.backUpTopScroll = 0;
        }
      }
      this.isShowAside = !this.isShowAside;
    }
  },
  created() {
    // if (process.client) {
    //   new DevicePixelRatio().init();
    // }

    if (["/Article", "/Links"].indexOf(this.$route.path) >= 0) {
      this.isShowOpenAsideBtn = true;
    } else {
      this.isShowOpenAsideBtn = false;
    }
  },
  beforeRouteUpdate(to, from, next) {
    if (process.browser) {
      //  隐藏遮罩 优先级
      util.openModal(false);
      this.isShowNav = false;
      this.isShowAside = false;
      if (["/Article", "/Links"].indexOf(to.path) >= 0) {
        this.isShowOpenAsideBtn = true;
      } else {
        this.isShowOpenAsideBtn = false;
      }
      next();
    }
  },
  mounted() {
    // 修复qq浏览器不能成功post
  }
};
</script> 
<style scoped  lang="scss">
.wrapper {
  max-width: 1441px;
  min-width: 1180px;
  display: flex;
  justify-content: space-between;
  box-sizing: border-box;
  margin: 0px auto;
  box-sizing: border-box;
  .top-nav-wrapper-master {
    position: fixed;
    max-width: calc(1441px - 14px);
    height: 60px;
    left: 50%;
    top: 0px;
    transform: translateX(-50%);
    z-index: 99999999;
  }
  .left-nav {
    position: fixed;
    width: 280px;
    height: 100%;
    overflow-y: scroll;
    z-index: 999;
    scrollbar-color: transparent transparent;
    scrollbar-track-color: transparent;
    -ms-scrollbar-track-color: transparent;
  }

  .index-main {
    width: calc(100% - 280px);
    margin-left: 280px;
    margin-top: 68px;
    padding: 7px;
    height: auto;
  }

  .to-top {
    position: fixed;
    bottom: 50px;
    right: 100px;
    display: flex;
    flex-direction: column;
    margin: 10px;
    z-index: 999999;
    transition: all 0.25s;
    .show-aside-btn {
      display: none;
      font-size: 30px;
      width: 45px;
      height: 45px;
      align-items: center;
      justify-content: center;
      border-top-left-radius: 185px 160px;
      border-top-right-radius: 200px 195px;
      border-bottom-right-radius: 160px 195px;
      border-bottom-left-radius: 185px 190px;
      background: #fff;
      border: #000 solid 2px;
      margin-bottom: 20px;
    }
    .paper-btn {
      font-size: 30px;
      width: 45px;
      height: 45px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-top-left-radius: 185px 160px;
      border-top-right-radius: 200px 195px;
      border-bottom-right-radius: 160px 195px;
      border-bottom-left-radius: 185px 190px;
      div {
        transform: scaleX(1.3);
        margin-top: 3px;
      }
    }
  }
}

.left-nav::-webkit-scrollbar {
  width: 0px;
  height: 0px;
  display: none;
  scrollbar-width: none;
}
@media screen and (max-width: 1480px) {
  .wrapper {
    padding: 0px 15px;
    box-sizing: border-box;
    .top-nav-wrapper-master {
      padding: 0px 15px;
      box-sizing: border-box;
    }
  }
}

// 移动端适配
@media screen and (max-width: 1025px) {
  ::-webkit-scrollbar {
    width: 0px;
    height: 0px;
    display: none !important;
    scrollbar-width: none;
  }
  .isShowModal {
    .aside-wrapper {
      height: 0px;
    }
    .to-top {
      display: none;
    }
  }
  .wrapper {
    max-width: 100%;
    min-width: 100%;
    width: 100%;
    padding: 0px 7px;
    .top-nav-wrapper-master {
      margin-top: 15px;
      height: 45px;
      width: 100%;
    }
    .index-main {
      width: 100%;
      margin-left: 0px;
      margin-top: 65px;
      transition: opacity 0.25s;
    }
    .left-nav {
      left: -100vw;
      margin-top: 3px;
      opacity: 0;
      width: 100%;
      position: fixed;
      transition: all 0.5s;
    }
    .to-top {
      bottom: 20px;
      right: 10px;
      .isShowOpenAsideBtn {
        display: flex;
      }
    }
  }
  .isShowNav {
    .index-main {
      opacity: 0;
      overflow: hidden;
      height: 0px;
    }
    .to-top {
      display: none !important;
    }
    .left-nav {
      left: 0vw;
      opacity: 1;
    }
  }
}
</style>
 