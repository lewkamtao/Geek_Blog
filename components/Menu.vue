<template>
  <div class="part menu">
    <div class="main-title">导航</div>
    <div class="nav-list">
      <nuxt-link
        v-for="(item, index) in menu"
        :key="index"
        :to="item.path"
        @click="toFn(item.type)"
        class="paper-btn border"
        :class="getBtnColor(index)"
        >{{ item.title }}</nuxt-link
      >
      <div v-if="isLogin" @click="loginOut" class="paper-btn border btn-danger">
        退出登录
      </div>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  props: {},
  data() {
    return {
      menu: [
        {
          path: "/",
          title: "首页",
        },
        {
          path: "/About",
          title: "关于我",
        },
        {
          path: "/Photo",
          title: "相册",
        },
        {
          path: "/Timeline",
          title: "时光机",
        },
        {
          path: "/Links",
          title: "友情链接",
        },
        {
          path: "/Message",
          title: "留言墙",
        },
      ],
      isLogin: false,
    };
  },
  watch: {},
  computed: {
    getBtnColor(index) {
      return function (index) {
        var tag_options = [
          "primary",
          "success",
          "secondary",
          "primary-outline",
          "secondary-outline",
          "warning-outline",

          "danger",
          "warning",

          "success-outline",
          "danger-outline",
        ];
        // var index = Math.floor(Math.random() * tag_options.length);
        return "btn-" + tag_options[index];
      };
    },
  },
  methods: {
    loginOut() {
      this.$cookies.remove("token");
      location.reload();
    },
  },
  created() {
    if (this.$cookies.get("token")) {
      this.isLogin = true;
      this.user = this.$cookies.get("user");
    }
  },
  beforeRouteUpdate(to, from, next) {
    if (this.$cookies.set("token", "")) {
      this.isLogin = true;
      this.$forceUpdate();
    }
    next();
  },
  mounted() {},
};
</script>
<style lang="scss" scoped>
.menu {
  width: 100%;
  margin-top: 14px;
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
  margin-bottom: 7px;

  a {
    width: 100%;
    padding: 8px 15px 8px 25px;
    margin-bottom: 8px;
    font-size: 18px;
    background-image: none;
  }
  div {
    width: 100%;
    padding: 8px 15px 8px 25px;
    margin-bottom: 8px;
    font-size: 18px;
  }
}
</style>