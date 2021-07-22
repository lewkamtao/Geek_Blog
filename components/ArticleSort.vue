<template>
  <div class="part article-sort" style="margin-bottom: 30px">
    <div class="form-group">
      <div class="main-title">文章分了个类</div>

      <select
        id="paperSelects1"
        v-model="isSelect_article_id"
        @change="getArticle()"
      >
        <option value="">全部文章</option>
        <option
          v-for="(article_sort, index) in article_sort"
          :key="index"
          :value="article_sort.id"
        >
          {{ article_sort.name }}
        </option>
      </select>
    </div>
    <div class="article-title-list">
      <ul>
        <li v-for="(item, index) in nav_article" :key="index">
          <nuxt-link class="text-secondary" :to="'/Article?id=' + item.id">{{
            item.title
          }}</nuxt-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  props: {
    article: {
      type: Array,
      default: [],
    },
    article_sort: {
      type: Array,
      default: [],
    },
  },
  data() {
    return {
      nav_article: [],
      isSelect_article_id: "",
    };
  },
  watch: {},
  computed: {},
  methods: {
    async getArticle() {
      var params = { limit: 100000 };
      if (this.isSelect_article_id) {
        params = { id: this.isSelect_article_id, limit: 100000 };
        this.nav_article = (
          await this.$axios.get("/article-sort", {
            params,
          })
        ).data.expand.data;
      } else {
        this.nav_article = (
          await this.$axios.get("/article", {
            params,
          })
        ).data.data;
      }
    },
  },
  created() {
    this.nav_article = this.article;
    this.isSelect_article_id = "";
  },
  mounted() {},
};
</script>
<style lang="scss" scoped>
.article-sort {
  width: 100%;
  margin-top: 30px;
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
li {
  border-bottom: 1px #d4d4d4 solid;
  margin-bottom: 10px;
}
</style>