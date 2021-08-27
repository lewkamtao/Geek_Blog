<template>
  <div class="part article-sort">
    <div class="main-title">归档</div>
    <div class="article-title-list">
      <ul>
        <a
          href="#"
          v-for="(item, index) in article_sort.data"
          :key="index"
          @click="getArticleBySort(item.id)"
        >
          {{ item.name }}
          <span style="margin-left: 10px" class="ui mini label">{{
            item.expand.count
          }}</span>
        </a>
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
    return {
      tagsClass: [],
    };
  },
  watch: {},
  computed: {},
  methods: {
    getTagColor() {
      if (this.article_sort.data && this.article_sort.data.length > 0) {
        this.article_sort.data.forEach((tag, index) => {
          var options = ["", "secondary", "success", "warning", "danger"];
          var i = Math.floor(Math.random() * options.length);
          this.tagsClass[index] = options[i];
        });
        this.$forceUpdate();
      }
    },
    getArticleBySort(id) {},
  },
  created() {
    this.getTagColor();
  },
  mounted() {},
};
</script>
<style lang="scss" scoped>
.article-sort {
  width: 100%;
  margin-top: 8px;
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
    border-radius: 6px;
    line-height: 25px;
    min-height: 32px;
    padding: 4px 15px;
    color: #999;
    display: inline-block;
    box-sizing: border-box;
    font-size: 14px;
    cursor: pointer;
    .label {
      position: absolute;
      right: 15px;
      top: 50%;
      transform: translateY(-50%);
    }
  }
  a::before {
    position: absolute;
    top: 0px;
    left: 0px;
    content: "";
    width: 100%;
    height: 1px;
    background: rgba($color: #000000, $alpha: 0.05);
  }
  a:first-child::before {
    display: none;
  }
  a:hover {
    color: #000;
    background: rgba($color: #000, $alpha: 0.05);
  }
  a:hover::before {
    display: none;
  }
  a:hover + a::before {
    display: none;
  }
}
</style>
