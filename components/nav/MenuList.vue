<template>
  <div class="part menu">
    <div class="main-title" style="margin-left: 6px; margin-top: 5px">导航栏</div>
    <div class="nav-list">
      <div
        v-for="(item, index) in menu"
        :key="index"
        class="nav-list-wrapper"
        v-show="item.isLogin ? (isLogin ? true : false) : true"
        @click="active = item.path"
        :class="{ active: active == item.path }"
      >
        <nuxt-link :to="item.path" class="menu-child" v-if="!item.type">
          <i v-html="item.icon" class="icon"></i>
          <div class="title">
            {{ item.title }}
          </div>
        </nuxt-link>

        <div
          :to="item.path"
          class="menu-child"
          @click.stop="toFn(index, item.type)"
          v-if="item.type"
        >
          <i v-html="item.icon" class="icon"></i>
          <div class="title">
            {{ item.title }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  props: {
    geek_config: {
      type: Object,
      default: function() {
        return {};
      }
    }
  },
  data() {
    return {
      menu: [
        // icon 配置 https://feathericons.com/  调整svg内的width和height:  width="16" height= "16"
        {
          value: "home",

          path: "/",
          title: "首页",
          iconBg: "#fff",
          iconColor: "#999",
          icon: `<svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" class="css-i6dzq1"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>`
        },
        {
          value: "about",

          path: "/About",
          title: "关于",
          iconBg: "#fff",
          iconColor: "#999",
          icon: `<svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" class="css-i6dzq1"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>`
        },

        {
          value: "time_line",

          path: "/Timeline",
          title: "时光机",
          iconBg: "#fff",
          iconColor: "#999",
          icon: `<svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" class="css-i6dzq1"><path d="M21 2H3v16h5v4l4-4h5l4-4V2zm-10 9V7m5 4V7"></path></svg>`
        },
        {
          value: "music",
          path: "/Music",
          title: "音乐",
          iconBg: "#fff",
          iconColor: "#999",
          icon: `<svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" class="css-i6dzq1"><path d="M9 18V5l12-2v13"></path><circle cx="6" cy="18" r="3"></circle><circle cx="18" cy="16" r="3"></circle></svg>`
        },
        {
          value: "photo",
          path: "/Photo",
          title: "图库",
          iconBg: "#fff",
          iconColor: "#999",
          icon: `<svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" class="css-i6dzq1"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>`
        },
        {
          value: "links",
          path: "/Links",
          title: "朋友",
          iconBg: "#fff",
          iconColor: "#999",
          icon: `<svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" class="css-i6dzq1"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>`
        },
        {
          value: "msg_wall",

          path: "/MsgWall",
          title: "留言墙",
          iconBg: "#fff",
          iconColor: "#999",
          icon: `<svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" class="css-i6dzq1"><path d="M20.24 12.24a6 6 0 0 0-8.49-8.49L5 10.5V19h8.5z"></path><line x1="16" y1="8" x2="2" y2="22"></line><line x1="17.5" y1="15" x2="9" y2="15"></line></svg>`
        },
        {
          value: "adm",

          path: "#",
          title: "后台",
          type: "back",
          isLogin: false,
          iconBg: "#fff",
          iconColor: "#999",
          icon: `<svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" class="css-i6dzq1"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>`
        },

        {
          value: "setting",

          path: "/Setting",
          isLogin: true,
          title: "设置",
          iconBg: "#fff",
          iconColor: "#999",
          icon: `<svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" class="css-i6dzq1"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path></svg>`
        },
        {
          value: "admin_login_out",

          path: "#",
          type: "loginOut",
          isLogin: true,
          title: "注销",
          iconBg: "#fff",
          iconColor: "#999",
          icon: `<svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" class="css-i6dzq1"><circle cx="12" cy="12" r="10"></circle><polyline points="12 8 8 12 12 16"></polyline><line x1="16" y1="12" x2="8" y2="12"></line></svg>`
        }
      ],
      isLogin: false,
      active: ""
    };
  },
  watch: {
    $route: function() {
      this.active = this.$route.path;
    }
  },
  computed: {},
  methods: {
    toFn(index, type) {
      switch (type) {
        case "loginOut":
          this.loginOut();
          break;
        case "back":
          if (this.geek_config.site_config.adm_site_url == "") {
            this.$notify({
              type: "warning",
              title: "错误",
              message: "请前往设置，配置后台地址",
              duration: 5000,
              offset: 65
            });
          } else {
            window.open(this.geek_config.site_config.adm_site_url, "_blank");
          }

          break;
        default:
          break;
      }
    },

    loginOut() {
      this.$cookies.remove("token");
      this.$router.push("/");
      setTimeout(function() {
        location.reload();
      }, 200);
    }
  },
  created() {
    if (this.$cookies.get("token")) {
      this.isLogin = true;
      this.user = this.$cookies.get("user");
    }
    var _menu = JSON.parse(JSON.stringify(this.menu));
    for (let i = 0; i <= this.geek_config.menu_config.length - 1; i++) {
      _menu.forEach(menu => {
        if (menu.value == this.geek_config.menu_config[i].value) {
          menu.isShow = this.geek_config.menu_config[i].isShow;
        }
      });
    }
    this.menu = _menu.filter(item => item.isShow != false);
  },
  beforeRouteUpdate(to, from, next) {
    if (this.$cookies.set("token", "")) {
      this.isLogin = true;
      this.$forceUpdate();
    }
    next();
  },
  mounted() {
    this.active = this.$route.path;
  }
};
</script>
<style lang="scss" scoped>
.menu {
  width: 100%;
  padding: 10px;
}

.list {
  line-height: 30px;
  padding-left: 25px;
}
.text-secondary {
  background-image: none !important;
}

.nav-list {
  display: flex;
  flex-wrap: wrap;
  .nav-list-wrapper {
    width: 100%;

    .menu-child {
      position: relative;
      display: flex;
      width: 100%;
      padding: 0px 5px 0px 48px;
      margin: 0px;
      font-size: 16px;
      background-image: none;
      text-align: left;
      height: 35px;
      color: #999;
      cursor: pointer;
      .icon {
        position: absolute;
        left: 13px;
        top: 50%;
        width: 24px;
        height: 24px;
        display: flex;
        align-items: center;
        justify-content: center;
        transform: translateY(-50%);
        color: #999;
      }
      .title {
        position: relative;
        width: 100%;
        height: 35px;
        display: flex;
        font-size: 14px;
        justify-content: space-between;
        align-items: center;
        box-sizing: border-box;
        .feather-chevron-right {
          font-weight: lighter;
          color: #d1d1d1;
        }
      }
    }
  }

  .nav-list-wrapper:hover {
    background: rgba($color: #000000, $alpha: 0.05);
    border-radius: 5px;
    .title {
      color: #333;
    }
    .icon {
      color: #333;
    }
  }
  .active {
    background: rgba($color: #000000, $alpha: 0.1) !important;
    border-radius: 5px;
    .title {
      color: #333;
    }
    .icon {
      color: #333 !important;
    }
  }
}
</style>
