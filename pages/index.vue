<template>
  <div class="wrap">
    <div class="wrapper" :class="{ isShowNav: isShowNav }">
      <TopNav
        @showNav="showNav()"
        :geek_config="geek_config"
        class="top-nav-wrapper-master"
      />
      <LeftNav
        ref="leftNav"
        :user="user"
        :geek_config="geek_config"
        :article_sort="article_sort"
        class="left-nav"
      />
      <div id="geek_main" v-show="!isShowNav" class="index-main">
        <nuxt-child
          :user="user"
          :geek_config="geek_config"
          @playSong="playSong"
        />
        <Footer :geek_config="geek_config" />
      </div>
    </div>
    <div class="to-top">
      <el-backtop style="z-index: 99999">
        <div class="icon">UP</div></el-backtop
      >
    </div>
  </div>
</template>

<script>
import first_geek_config from "@/util/geek.config.js";

export default {
  components: {},
  head() {
    return {
      title: this.geek_config.site_config.title,
      meta: [
        {
          hid: "keywords",
          name: "keywords",
          content: this.geek_config.site_config.keywords
        },
        {
          hid: "description",
          name: "description",
          content: this.geek_config.site_config.description
        }
      ],
      link: [
        {
          rel: "icon",
          type: "image/x-icon",
          href: this.geek_config.site_config.favicon_url
        }
      ]
    };
  },
  async asyncData({ $axios }) {
    var geek_config = false;
    var noSet = false;
    try {
      const res_geek_config = await $axios.get(
        "/options?key=geek_config&cache=false"
      );
      if (res_geek_config.code == 200 && res_geek_config.data.opt) {
        geek_config = res_geek_config.data.opt;
      } else {
        geek_config = first_geek_config.geek_config;
        noSet = true;
      }
    } catch (err) {
      geek_config = first_geek_config.geek_config;
      noSet = true;
    }

    const userId = (await $axios.get("/options?key=webmaster")).data.opt
      .users_id;

    const user = (await $axios.get("/users?id=" + userId)).data;
    const article_sort = (
      await $axios.get("/article-sort?limit=1000&cache=false")
    ).data;
    return { user, article_sort, geek_config, noSet };
  },
  props: {},
  data() {
    return {
      isShowNav: false,
      backUpTopScroll: 0,
      noSet: false
    };
  },
  watch: {},
  computed: {},
  methods: {
    showNav() {
      if (process.browser) {
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

    playSong({ songs, index }) {
      this.$refs.leftNav.playSong({ songs, index });
    }
  },
  created() {
    if (this.noSet) {
      this.$router.push("/getStart");
    }
  },
  beforeRouteUpdate(to, from, next) {
    if (process.browser) {
      //  隐藏遮罩 优先级
      this.isShowNav = false;
      next();
    }
  },
  mounted() {}
};
</script>
<style scoped lang="scss">
.wrapper {
  max-width: 1300px;
  min-width: 1000px;
  display: flex;
  justify-content: space-between;
  margin: 0px auto;
  box-sizing: content-box;
  padding: 0px 7px 10px 7px;

  .top-nav-wrapper-master {
    position: fixed;
    max-width: 100%;
    width: 100%;
    background: rgba(255, 255, 255, 0.8);
    -webkit-backdrop-filter: saturate(200%) blur(20px);
    // box-shadow: 0px 0px 15px -5px rgb(0 0 0 / 15%);
    backdrop-filter: saturate(200%) blur(20px);
    height: 50px;
    left: 50%;
    top: 0px;
    transform: translateX(-50%);
    z-index: 999;
  }
  .left-nav {
    position: fixed;
    width: 240px;
    height: 100%;
    overflow-y: scroll;
    z-index: 99;
    scrollbar-color: transparent transparent;
    scrollbar-track-color: transparent;
    -ms-scrollbar-track-color: transparent;
  }

  .index-main {
    width: calc(100% - 240px);
    margin-left: 240px;
    margin-top: 55px;
    padding: 4px;
    height: auto;
  }

  .to-top {
    .icon {
      height: 100%;
      width: 100%;
      background-color: #f2f5f6;
      box-shadow: 0 0 6px rgba(0, 0, 0, 0.12);
      text-align: center;
      line-height: 40px;
      color: #000;
      font-weight: bolder;
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
    padding: 0px 10px;
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
      margin-top: 70px;
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
      position: fixed;
      z-index: 999999;
      bottom: 20px;
      right: 10px;
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
