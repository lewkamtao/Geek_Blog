<template>
  <div class="sort-wrapper-master part">
    <div class="title"># {{ articleListBySort.name }} #</div>
    <div class="sort-box">
      <div
        v-for="(item, index) in articleListBySort.expand.data"
        :key="'s' + index"
      >
        <li>
          <nuxt-link :to="'article?id=' + item.id"> {{ item.title }}</nuxt-link>
        </li>
      </div>
      <div v-if="articleListBySort.expand.data.length == 0">暂无文章</div>
    </div>
  </div>
</template>

<script>
import util from "@/util/index";
import ArticlePart from "../custom/ArticlePart";

export default {
  components: { ArticlePart },
  props: {
    articleListBySort: {
      type: Object,
      default: function() {
        return {};
      }
    }
  },
  data() {
    return {
      page: 1,
      limit: 10,
      loading: false
    };
  },
  watch: {},
  computed: {
    getBeautifyTime() {
      return function(time) {
        return util.getBeautifyTime(time);
      };
    }
  },
  methods: {
    getTagColor() {
      var tag_options = ["", "secondary", "success", "warning", "danger"];
      var index = Math.floor(Math.random() * tag_options.length);
      return tag_options[index];
    },
    async getarticleListBySort(type) {
      this.loading = true;
      if (this.articleListBySort.data.length == this.articleListBySort.count) {
        this.$notify({
          type: "warning",
          title: "注意",
          message: "没有更多文章了",
          duration: 5000,
          offset: 65
        });
        return;
      }

      if (type == "new") {
        this.page = 1; // 重新选择分类
        this.articleListBySort = [];
      } else {
        this.page += 1; // 页码增加
      }
      var params = {};
      if (this.isSelect_article_id) {
        params = {
          id: this.isSelect_article_id,
          limit: this.limit,
          page: this.page
        };
        this.articleListBySort.data = this.articleListBySort.concat(
          (
            await this.$axios.get("/article-sort", {
              params
            })
          ).data.expand.data
        );
      } else {
        params = { limit: this.limit, page: this.page };
        this.articleListBySort.data = this.articleListBySort.data.concat(
          (
            await this.$axios.get("/article", {
              params
            })
          ).data.data
        );
      }
      this.loading = false;
    }
  },
  created() {},
  mounted() {}
};
</script>
<style lang="scss" scoped>
.sort-wrapper-master {
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 30px;
  min-height: 80vh;
  .title {
    font-size: 30px;
    margin-bottom: 30px;
  }
  li {
    margin-left: 30px;
  }
  a {
    color: #777;
    line-height: 30px;
  }
  a:hover {
    color: #000;
  }
}
</style>
