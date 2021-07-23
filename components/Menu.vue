<template>
  <div class="part menu" style="margin-bottom:30px">
    <div class="main-title">导航</div>
    <div class="nav-list">
      <nuxt-link to="/" class="paper-btn btn-primary">首页</nuxt-link>
      <nuxt-link to="/Photo" class="paper-btn btn-secondary">相册</nuxt-link>
      <nuxt-link to="/Timeline" class="paper-btn btn-success">时光机</nuxt-link>
      <nuxt-link to="/Links" class="paper-btn btn-warning">友情链接</nuxt-link>
      <nuxt-link to="/Message" class="paper-btn btn-danger">留言墙</nuxt-link>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  props: {},
  data() {
    return {};
  },
  watch: {},
  computed: {},
  methods: {},
  created() {},
  mounted() {}
};
</script>
<style lang="scss" scoped>
.menu {
  width: 100%;
  margin-top: 30px;
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
  margin-bottom: 10px;
  div {
    padding: 4px 7px;
    margin-right: 10px;
    margin-bottom: 10px;
    font-size: 18px;
  }
  a {
    padding: 4px 7px;
    margin-right: 10px;
    margin-bottom: 10px;
    font-size: 18px;
  }
}
</style>