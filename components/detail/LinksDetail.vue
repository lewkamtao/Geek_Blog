<template>
  <div class="links-detail">
    <page-header :bgUrl="geek_config.images_config.bg_links"></page-header>
    <div class="ui middle aligned selection list">
      <a
        class="item"
        v-for="(item, index) in links.data"
        :key="index"
        :href="item.url"
        target="_blank"
      >
        <v-img
          style="border-radius: 4px"
          class="ui image"
          width="40px"
          height="40px"
          nullUrl="https://api.kamtao.com/storage/users/anime/4.jpg"
          :url="item.head_img"
        >
        </v-img>
        <div class="content">
          <div class="header">{{ item.name }}</div>
          <div class="description">
            {{ item.description }}
          </div>
        </div>
      </a>
    </div>
    <main class="section" style="padding: 30px" v-show="article.content !== ''">
      <article-editor :content="article.content" :article_id="article.id">
      </article-editor>
    </main>
  </div>
</template>

<script>
import PageHeader from "@/components/custom/PageHeader.vue";
import util from "@/util/index";
import ArticleEditor from "../custom/ArticleEditor";

export default {
  components: { PageHeader, ArticleEditor },
  props: {
    geek_config: {
      type: Object,
      default: function () {
        return {};
      },
    },
    links: {
      type: Object,
      default: function () {
        return {};
      },
    },
    article: {
      type: Object,
      default: function () {
        return {};
      },
    },
  },
  data() {
    return {};
  },

  watch: {},
  computed: {
    getBeautifyTime() {
      return function (time) {
        return util.getBeautifyTime(time);
      };
    },
  },
  methods: {},
  created() {},
  mounted() {},
  beforeDestroy() {},
};
</script>
<style lang="scss" scoped>
.links-detail {
  padding: 0;
  display: flex;
  flex-direction: column;
  overflow: hidden;

  .list {
    padding: 30px 50px 0 50px;
  }

  .item {
    padding: 10px !important;
    box-shadow: 0 0 5px rgba($color: #000000, $alpha: 0.15) !important;
    margin-bottom: 15px !important;
  }

  .content {
    width: calc(100% - 120px);
  }

  .description {
    margin-top: 5px;
    overflow: hidden;
    height: 16px;
  }

  main {
    margin-top: 0;
    margin-bottom: 0;
    padding: 0 30px 30px 30px;
  }

  .section:after {
    margin-top: 150px;
  }
}

@media screen and (max-width: 1440px) {
}

// 移动端适配
@media screen and (max-width: 1025px) {
  .article-wrapper {
    padding: 0;

    main {
      margin-top: 0;
      margin-bottom: 0;
      padding: 0 15px 50px 15px;
    }
  }
}

@media screen and (max-width: 1024px) {
  .links-detail {
    padding: 0px;

    .list {
      padding: 15px;
    }
  }
}
</style>
