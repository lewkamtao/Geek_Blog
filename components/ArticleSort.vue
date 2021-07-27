<template>
  <div class="part article-sort" style="margin-bottom: 14px">
    <div class="form-group">
      <div class="main-title">文章分类</div>

      <select
        id="paperSelects1"
        v-model="isSelect_article_id"
        @change="getArticle('new')"
      >
        <option value>全部文章</option>
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
        <nuxt-link
          v-show="['留言墙', '友情链接'].indexOf(item.title) < 0"
          v-for="(item, index) in nav_article.data"
          :key="index"
          class="text-secondary"
          :to="'/Article?id=' + item.id"
        >
          {{ item.title }}
        </nuxt-link>
        <div class="more-btn" v-show="nav_article.count == 0">暂无文章</div>
        <div class="more-btn" v-show="nav_article.count != 0" @click="getArticle()">
          {{
            nav_article.data.length != nav_article.count
              ? "点击加载更多"
              : "没有更多了"
          }}
        </div>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  props: {
    article: {
      type: Object,
      default: [],
    },
    article_sort: {
      type: Array,
      default: [],
    },
  },
  data() {
    return {
      page: 1,
      limit: 10,
      nav_article: {},
      isSelect_article_id: "",
    };
  },
  watch: {},
  computed: {},
  methods: {
    async getArticle(type) {
      if (
        this.nav_article.data.length == this.nav_article.count &&
        type != "new"
      ) {
        return;
      }

      if (type == "new") {
        this.page = 1; // 重新选择分类
        this.nav_article.data = [];
        this.$forceUpdate();
      } else {
        this.page += 1; // 页码增加
      }
      var params = {};
      if (this.isSelect_article_id) {
        params = {
          id: this.isSelect_article_id,
          limit: this.limit,
          page: this.page,
        };
        var article = (
          await this.$axios.get("/article-sort", {
            params,
          })
        ).data.expand;
        this.nav_article = {
          count: article.count,
          data: this.nav_article.data.concat(article.data),
        };
        this.$forceUpdate();
      } else {
        params = {
          limit: this.limit,
          page: this.page,
        };

        var article = (
          await this.$axios.get("/article", {
            params,
          })
        ).data;
        this.nav_article = {
          count: article.count,
          data: this.nav_article.data.concat(article.data),
        };
        this.$forceUpdate();
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
  margin-top: 14px;
}

#paperSelects1 {
  width: calc(100% - 10px);
  margin: 0 auto;
  cursor: pointer;
  background: #fff;
}
.article-title-list {
  line-height: 30px;
}
ul {
  display: flex;
  flex-direction: column;
  a {
    position: relative;
    width: 100%;
    background-image: none;
    border-radius: 10px;
    line-height: 24px;
    min-height: 36px;
    padding: 8px 20px;
    overflow: hidden;
    font-size: 14px;
  }
  a::before {
    position: absolute;
    top: 0px;
    left: 0px;
    content: "";
    width: 100%;
    height: 1px;
    background: rgba($color: #000000, $alpha: 0.15);
  }
  a:hover {
   background: rgba($color: #000, $alpha: 0.05);
  }
  a:hover::before {
    display: none;
  }
  a:hover + a::before {
    display: none;
  }
}

.more-btn {
  text-align: center;
  padding: 10px;
  cursor: pointer;
  color: #000;
  opacity: 0.5;
  transition: opacity 0.25s;
}

.more-btn:hover {
  opacity: 1;
}
</style>