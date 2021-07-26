<template>
  <div id="top" class="wrapper">
    <TopNav :options="options" class="top-nav" />
    <LeftNav
      :options="options"
      :article="article"
      :article_sort="article_sort"
      :links="links"
      :pages="pages"
      class="left-nav"
    />
    <div class="main">
      <nuxt-child :options="options" />
    </div>

    <div class="to-top">
      <a href="#top" class="paper-btn margin">
        <div style="margin-top: 23px">^</div>
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
          content: this.options.keywords,
        },
      ],
      link: [
        { rel: "icon", type: "image/x-icon", href: this.options.site_ico },
      ],
    };
  },
  async asyncData({ $axios }) {
    const options = (await $axios.get("/options")).data;
    const article_sort = (
      await $axios.get("/article-sort", {
        params: { limit: 100000 },
      })
    ).data.data;
    const pages = (await $axios.get("/page")).data.data;
    const links = (await $axios.get("/links")).data.data;
    const article = (
      await $axios.get("/article", {
        params: { limit: 1000000 },
      })
    ).data.data;

    return { options, article_sort, article, pages, links };
  },
  props: {},
  data() {
    return {};
  },
  watch: {},
  computed: {},
  methods: {},
  created() {
    // if (process.client) {
    //   new DevicePixelRatio().init();
    // }
  },
  beforeRouteUpdate(to, from, next) {
    if (process.browser) {
      // 置顶topNav条 隐藏遮罩 优先级
      util.showTopNav(true);
      next();
    }
  },
  mounted() {},
};
</script>
<style  scoped lang="less">
.wrapper {
  max-width: 1441px;
  min-width: 1180px;
  display: flex;
  justify-content: space-between;
  box-sizing: border-box;
  margin: 0px auto;
  .top-nav {
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

  .main {
    width: calc(100% - 280px);
    margin-left: 280px;
    margin-top: 68px;
    padding: 7px;
    margin-bottom: 70px;
    height: auto;
  }
  .to-top {
    position: fixed;
    bottom: 50px;
    right: 100px;
    display: flex;

    z-index: 999999;
    transition: all 0.25s;
    .paper-btn {
      font-size: 35px;
      width: 45px;
      height: 45px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-top-left-radius: 185px 160px;
      border-top-right-radius: 200px 195px;
      border-bottom-right-radius: 160px 195px;
      border-bottom-left-radius: 185px 190px;
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
    .top-nav {
      padding: 0px 15px;
      box-sizing: border-box;
    }
  }
}
</style>