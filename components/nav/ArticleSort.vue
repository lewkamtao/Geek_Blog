<template>
  <div class="part article-sort">
    <div class="main-title">分类</div>
    <div class="article-title-list">
      <ul>
        <nuxt-link
          :to="'ArticleBySort?sort_id=' + item.id"
          v-for="(item, index) in article_sort.data"
          :key="index"
        >
          <span> {{ item.name }}</span>
          <span style="margin-right: 10px">{{ item.expand.count }}</span>
        </nuxt-link>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  props: {
    article_sort: {
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
  computed: {},
  methods: {},
  created() {},
  mounted() {},
};
</script>
<style lang="scss" scoped>
.article-sort {
  width: 100%;
  padding: 10px;
  .main-title {
    margin-left: 6px;
    margin-top: 5px;
  }
}
.article-title-divst {
  line-height: 30px;
}
ul {
  display: flex;
  flex-direction: column;
  a {
    position: relative;
    width: 100%;
    background-image: none;
    border-radius: 5px;
    line-height: 25px;
    min-height: 32px;
    padding: 5px 8px 5px 18px;
    color: #999;
    display: flex;
    justify-content: space-between;
    box-sizing: border-box;
    font-size: 14px;
    cursor: pointer;
    .label {
      position: absolute;
      right: 6px;
      top: 50%;
      transform: translateY(-50%);
      background: rgba($color: #000, $alpha: 0);
    }
  }

  a:hover {
    color: #000;
    background: rgba($color: #000, $alpha: 0.05);
  }
}
</style>
