<template>
  <div id="top" class="wrapper">
    <Nav
      :options="options"
      :article="article"
      :article_sort="article_sort"
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
    const article_sort = (await $axios.get("/article-sort")).data.data;
    const article = (
      await $axios.get("/article-sort", {
        params: { id: article_sort[0].id, limit: 100000 }
      })
    ).data.expand.data;

    return { options, article_sort, article };
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
  min-width: 980px;
  display: flex;
  justify-content: space-between;
  padding: 30px;
  box-sizing: border-box;
  margin: 0px auto;
  .nav {
    position: fixed;
    top: 30px;
    width: 250px;
    height: calc(100vh - 60px);
  }

  .main {
    width: calc(100% - 280px);
    margin-left: 280px;
    height: auto;
    overflow: hidden;
  }
  .to-top {
    position: fixed;
    bottom: 50px;
    right: 50px;
    display: flex;

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
</style>