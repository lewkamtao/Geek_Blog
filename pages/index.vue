<template>
  <div class="wrap">
    <div
      id="top"
      class="wrapper"
      :class="{ isShowNav: isShowNav, isShowAside: isShowAside }"
    >
      <TopNav
        @showNav="showNav()"
        :geek_config="geek_config"
        class="top-nav-wrapper-master"
      />
      <LeftNav
        :geek_config="geek_config"
        :article_sort="article_sort"
        class="left-nav"
      />
      <div id="geek_main" class="index-main">
        <nuxt-child :geek_config="geek_config" />
        <Footer :geek_config="geek_config" />
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
    <div class="mode-set-box">
      <input
        class="modal-state"
        id="modal-1"
        type="checkbox"
        :checked="isShowModeSet"
      />
      <div class="modal">
        <label class="modal-bg" for="modal-1"></label>
        <div class="modal-body">
          <label class="btn-close" for="modal-1" @click="closeModeSetBox"
            >X</label
          >
          <h4 class="modal-title">请选择你喜爱的风格</h4>
          <p class="modal-text">
            你可以选择当道的圆滑，也可以别有个性的锐利。若关闭窗口后，你想再次修改，可以在左侧导航栏设置模式。
          </p>
          <button @click="sharpHandle(false)">圆滑模式</button>
          <button @click="sharpHandle(true)">锐利模式</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import DevicePixelRatio from "@/util/devicePixelRatio.js";
import util from "@/util/index";
import first_geek_config from "@/util/geek.config.js";

export default {
  components: {},
  head() {
    return {
      title: this.geek_config.site_info.title,
      meta: [
        {
          hid: "keywords",
          name: "keywords",
          content: this.geek_config.site_info.keywords,
        },
        {
          hid: "description",
          name: "description",
          content: this.geek_config.site_info.description,
        },
      ],
      link: [
        {
          rel: "icon",
          type: "image/x-icon",
          href: this.geek_config.site_info.favicon_url,
        },
      ],
    };
  },
  async asyncData({ $axios }) {
    var geek_config = {};

    try {
      const res_geek_config = await $axios.get(
        "/options?key=geek_config&cache=false"
      );
      if (res_geek_config.code == 200 && res_geek_config.data.opt) {
        geek_config = res_geek_config.data.opt;
      } else {
        geek_config = first_geek_config.geek_config;
      }
    } catch {
      geek_config = first_geek_config.geek_config;
    }

    const article_sort = (await $axios.get("/article-sort?limit=1000")).data;
    return { article_sort, geek_config };
  },
  props: {},
  data() {
    return {
      isShowNav: false,
      isShowAside: false,
      isShowOpenAsideBtn: false,
      backUpTopScroll: 0,
      isShowModeSet: false,
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
          setTimeout(function () {
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
          setTimeout(function () {
            document.documentElement.scrollTop = top;
          }, 10);
          this.backUpTopScroll = 0;
        }
      }
      this.isShowAside = !this.isShowAside;
    },
    sharpHandle(status) {
      util.sharpHandle(status);
      var mode = {
        isDark: false,
        isSharp: status,
      };
      var mode = this.$cookies.set("mode", mode);
    },
    closeModeSetBox() {
      util.openModal(false);
    },
  },
  created() {
    this.isShowOpenAsideBtn = true;
    var mode = this.$cookies.get("mode");
    if (!mode) {
      util.openModal(true);
      this.isShowModeSet = true;
    }
  },
  beforeRouteUpdate(to, from, next) {
    if (process.browser) {
      //  隐藏遮罩 优先级
      util.openModal(false);
      this.isShowNav = false;
      this.isShowAside = false;
      this.isShowOpenAsideBtn = true;

      next();
    }
  },
  mounted() {},
};
</script>
<style scoped  lang="scss">
.wrapper {
  max-width: 1351px;
  min-width: 1180px;
  display: flex;
  justify-content: space-between;
  box-sizing: border-box;
  margin: 0px auto;
  box-sizing: border-box;
  .top-nav-wrapper-master {
    position: fixed;
    max-width: 100%;
    width: 100%;
    background: rgba(255, 255, 255, 0.8);
    -webkit-backdrop-filter: saturate(200%) blur(20px);
    box-shadow: 0px 0px 15px -5px rgb(0 0 0 / 15%);
    backdrop-filter: saturate(200%) blur(20px);
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
  -ms-overflow-style: none;
  overflow: -moz-scrollbars-none;
  scrollbar-color: transparent transparent;
}

.mode-set-box {
  button {
    margin-right: 15px;
    font-size: 14px;
    padding: 10px;
  }
}

@media screen and (max-width: 1380px) {
  .wrapper {
    padding: 0px 14px;
    box-sizing: border-box;
    .top-nav-wrapper-master {
      padding: 0px 20px;
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

  .wrapper {
    max-width: 100%;
    min-width: 100%;
    width: 100%;
    padding: 0px 7px;
    .top-nav-wrapper-master {
      margin-top: 15px;
      padding: 0px 14px;
      height: 45px;
      width: 100%;
      background: none;
      -webkit-backdrop-filter: none;
      backdrop-filter: none;
      box-shadow: none;
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
