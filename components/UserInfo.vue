<template>
  <div class="part">
    <div class="user-info">
      <img class="logo" :src="options.site_img" alt="" srcset="" />
      <div class="title">{{ options.title }}</div>
      <div class="description">{{ options.description }}</div>
    </div>
    <div class="main-title">导航</div>
    <div class="nav-list">
      <nuxt-link to="/" class="paper-btn btn-secondary">首页</nuxt-link>
      <nuxt-link to="/" class="paper-btn btn-warning">时光机</nuxt-link>
      <nuxt-link to="/" class="paper-btn btn-danger">友链</nuxt-link>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  props: {
    options: {
      type: Object,
      default: {}
    }
  },
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
.user-info {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  box-sizing: border-box;
  height: 300px;
  .logo {
    width: 80px;
  }
  .title {
    margin: 22px 0px 14px 0px;
    color: #fff;
    font-size: 20px;
    background: #0071de;
  }
  .description {
    font-size: 12px;
  }
}
.nav-list {
  a {
    padding: 5px;
    font-size: 16px;
  }
}
</style>