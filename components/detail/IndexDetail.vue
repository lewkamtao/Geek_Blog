<template>
  <div class="index-wrapper-master">
    <div class="masonry">
      <div
        v-for="(articleData, index) in articleList.data"
        :key="index"
        class="index-part"
      >
        <article-part :articleData="articleData"></article-part>
      </div>
    </div>
    <div @click="getArticleList()" class="more-btn part">
      {{
        articleList.data.length != articleList.count
          ? "点击加载更多"
          : "没有更多了"
      }}
    </div>
  </div>
</template>

<script>
import util from "@/util/index";
import ArticlePart from "../custom/ArticlePart";

export default {
  components: { ArticlePart },
  props: {
    articleList: {
      type: Object,
      default: {},
    },
  },
  data() {
    return {
      page: 1,
      limit: 10,
    };
  },
  watch: {},
  computed: {
    getBeautifyTime() {
      return function (time) {
        return util.getBeautifyTime(time);
      };
    },
  },
  methods: {
    getTagColor() {
      var tag_options = ["", "secondary", "success", "warning", "danger"];
      var index = Math.floor(Math.random() * tag_options.length);
      return tag_options[index];
    },
    async getArticleList(type) {
      if (this.articleList.data.length == this.articleList.count) {
        this.$notify({
          type: "warning",
          title: "注意",
          message: "没有更多文章了",
          duration: 5000,
          offset: 65,
        });
        return;
      }

      if (type == "new") {
        this.page = 1; // 重新选择分类
        this.articleList = [];
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
        this.articleList.data = this.articleList.concat(
          (
            await this.$axios.get("/article-sort", {
              params,
            })
          ).data.expand.data
        );
      } else {
        params = { limit: this.limit, page: this.page };
        this.articleList.data = this.articleList.data.concat(
          (
            await this.$axios.get("/article", {
              params,
            })
          ).data.data
        );
      }
    },
  },
  created() {},
  mounted() {},
};
</script>
<style lang="scss" scoped>
.index-wrapper-master {
  width: 100%;
}

.more-btn {
  margin-top: 5px;
  padding: 0px;
  width: 100%;
  height: 45px;
  line-height: 45px;
  background: #fff;
  font-size: 16px;
  text-align: center;
  color: #000;
  opacity: 1;
  transition: all 0.25s;
  cursor: pointer;
}
.more-btn:hover {
  background: #eee;
}
.loading {
  width: 100%;
  height: 80vh;
  display: flex;
  align-items: center;
  justify-content: center;
  img {
    width: 400px;
  }
}

.masonry {
  width: 100%;
  .index-part {
    width: 100%;
    margin-bottom: 8px;
  }
}
</style>
