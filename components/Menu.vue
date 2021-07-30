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
        :class="'btn-'+item.color"
      >{{ item.title }}</nuxt-link>
      <div v-if="isLogin" @click="loginOut" class="paper-btn border btn-danger">退出登录</div>
    </div>
  </div>
</template>

<script>
import geek from "@/geek.config.js";
export default {
  components: {},
  props: {},
  data() {
    return {
      menu: geek.menu,
      isLogin: false
    };
  },
  watch: {},
  computed: {},
  methods: {
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
  },
  beforeRouteUpdate(to, from, next) {
    if (this.$cookies.set("token", "")) {
      this.isLogin = true;
      this.$forceUpdate();
    }
    next();
  },
  mounted() {}
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
    padding: 8px 15px 8px 15px;
    margin-bottom: 8px;
    font-size: 16px;
    background-image: none;
    text-align: left;
  }
  div {
    width: 100%;
    padding: 8px 15px 8px 15px;
    margin-bottom: 8px;
    font-size: 16px;
    text-align: left;
  }
}
</style>