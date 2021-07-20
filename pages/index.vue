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
    <Nuxt class="main" />

    <div class="to-top">
      <a href="#top" class="paper-btn margin">
        <div style="margin-top:23px">^</div>
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
        params: { limit: 100000 }
      })
    ).data.data;
    const pages = (await $axios.get("/page")).data.data;
    const links = (await $axios.get("/links")).data.data;
    const article = (
      await $axios.get("/article-sort", {
        params: { id: article_sort[1].id, limit: 100000 }
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
  mounted() {}
};
</script>
<style  scoped lang="less">
.wrapper {
  max-width: 1600px;
  min-width: 1280px;
  overflow: scroll;
  display: flex;
  justify-content: space-between;
  padding: 30px;
  box-sizing: border-box;
  margin: 0px auto;
  .nav {
    width: 250px;
    z-index: 99999;
  }

  .main {
    width: calc(100% - 280px);
    height: auto;
  }
  .to-top {
    position: fixed;
    bottom: 50px;
    right: 50px;
    display: flex;
    z-index: 99999999;

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

.wrapper::-webkit-scrollbar {
  width: 0px;
  height: 0px;
  display: none;
}
</style>