<template>
  <div class="part menu">
    <div class="main-title">导航</div>
    <div class="nav-list">
      <nuxt-link v-for="(item, index) in menu" :key="index" :to="item.path">{{item.title}}</nuxt-link>
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
          title: "首页"
        },
        {
          path: "/About",
          title: "关于我"
        },
        {
          path: "/Photo",
          title: "相册" 
        },
        {
          path: "/Timeline",
          title: "时光机"
        },
        {
          path: "/Links", 
          title: "友情链接"
        },
        {
          path: "/Message",
          title: "留言墙"
        }
      ]
    };
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
  margin-bottom: 10px;

  a {
    width: 100%;
    padding: 8px 0px;
    font-size: 18px;
    background-image: none;
    border-radius: 5px;
    padding-left: 20px;
    border-bottom: 1px #eee solid;
  }
  a:hover {
    background: #eee;
  }
}
</style>