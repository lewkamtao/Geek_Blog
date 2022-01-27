<template>
  <div class="tag-wrapper-master part">
    <div class="title"># {{ articleListByTag.name }} #</div>
    <div class="tag-box">
      <div
        v-for="(item, index) in articleListByTag.expand.data"
        :key="'tag' + index"
      >
        <li>
          <nuxt-link :to="'article?id=' + item.id"> {{ item.title }}</nuxt-link>
        </li>
      </div>
      <div v-if="articleListByTag.expand.data.length == 0">暂无文章</div>
    </div>
  </div>
</template>

<script>
import util from "@/util/index";
import ArticlePart from "../custom/ArticlePart";

export default {
  components: {ArticlePart},
  props: {
    articleListByTag: {
      type: Object,
      default: function () {
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
      return function (time) {
        return util.getBeautifyTime(time);
      };
    }
  },
  methods: {},
  created() {
  },
  mounted() {
  }
};
</script>
<style lang="scss" scoped>
.tag-wrapper-master {
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
