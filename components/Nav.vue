<template>
  <div class="nav">
    <div class="part">
      <div class="main-title">{{ options.title }}</div>
      <div>{{ options.description }}</div>
      <div class="导航"></div>
      <pre>{{ options }}</pre>
    </div>

    <div class="part sidebar" style="margin-bottom:30px">
      <div class="form-group">
        <div class="main-title">文章分类</div>

        <select
          id="paperSelects1"
          v-model="isSelect_article_id"
          @change="getArticle()"
        >
          <option
            v-for="(article_sort, index) in article_sort"
            :key="index"
            :value="article_sort.id"
            >{{ article_sort.name }}</option
          >
        </select>
      </div>
      <div class="article-title-list">
        <ul>
          <li v-for="(item, index) in nav_article" :key="index">
            <nuxt-link class="text-secondary" :to="'/Article?id=' + item.id">
              {{ item.title }}</nuxt-link
            >
          </li>
        </ul>
      </div>
    </div>
    <div class="footer">
      {{ options.copy }}
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
    },
    article_sort: {
      type: Array,
      default: []
    },
    article: {
      type: Array,
      default: []
    }
  },
  data() {
    return {
      nav_article: [],
      isSelect_article_id: ""
    };
  },
  watch: {},
  computed: {},
  methods: {
    async getArticle() {
      this.nav_article = (
        await this.$axios.get("/article-sort", {
          params: { id: this.isSelect_article_id, limit: 100000 }
        })
      ).data.expand.data;
    }
  },
  created() {
    this.nav_article = this.article;
    this.isSelect_article_id = this.article_sort[0].id;
  },
  mounted() {}
};
</script>
<style lang="scss" scoped>
.aside {
  width: 100%;
}
.sidebar {
  margin-top: 30px;
  overflow: scroll;
  max-height: 50vh;
}
#paperSelects1 {
  width: 100%;
  cursor: pointer;
  background: #fff;
}
.article-title-list {
  line-height: 30px;
  padding-left: 25px;
}
a {
  background-image: none;
}
</style>