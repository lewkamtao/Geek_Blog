<template>
  <div id="top" class="wrapper">
    <Nav
      :options="options"
      :article="article"
      :article_sort="article_sort"
      :pages="pages"
      :links="links"
      class="nav"
    />
    <div class="main">
      <Nuxt />
    </div>

    <div class="to-top">
      <a href="#top" class="paper-btn margin">
        <div style="margin-top: 23px">^</div>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
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
      await $axios.get("/article-sort", {
        params: { id: article_sort[1].id, limit: 1000000 },
      })
    ).data.expand.data;

    return { options, article_sort, article, pages, links };
  },
  props: {},
  data() {
    return {};
  },
  watch: {},
  computed: {},
  methods: {},
  created() {},
  mounted() {},
};
</script>
<style  scoped lang="less">
.wrapper {
  max-width: 1600px;
  min-width: 1180px;
  display: flex;
  justify-content: space-between;
  box-sizing: border-box;
  margin: 0px auto;
  .nav {
    position: fixed;
    width: 310px;
    height: 100vh;
    overflow: scroll;
    z-index: 99999;
  }

  .main {
    margin-left: 310px;
    margin-top: 15px;
    padding: 15px;
    margin-bottom: 70px;
    width: calc(100vw - 310px);
    height: auto;
  }
  .to-top {
    position: fixed;
    bottom: 50px;
    right: 100px;
    display: flex;

    z-index: 99999999;
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

.nav::-webkit-scrollbar {
  width: 0px;
  height: 0px;
  display: none;
}
@media screen and (max-width: 1440px) {
  .wrapper {
    padding: 0px 15px;
    box-sizing: border-box;
  }
}
</style>