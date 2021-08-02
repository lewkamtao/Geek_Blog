<template>
  <div class="part article-sort" style="margin-bottom: 30px">
    <div class="main-title">归档</div>
    <div class="article-title-list">
      <ul>
        <li
          v-for="(item, index) in article_sort.data"
          :key="index"
          @click="getArticleBySort(item.id)"
        >
          {{ item.name }}
          <div class="badge" :class="tagsClass[index]">
            {{ item.expand.count }}
          </div>
        </li>
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
      default: {},
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
    getArticleBySort(id) {
      console.log(id);
    },
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
  margin-top: 14px;
}
.article-title-list {
  line-height: 30px;
}
ul {
  display: flex;
  flex-direction: column;
  li {
    position: relative;
    width: 100%;
    background-image: none;
    border-radius: 10px;
    line-height: 24px;
    min-height: 36px;
    padding: 8px 15px;
    display: inline-block;
    box-sizing: border-box;
    font-size: 14px;
    cursor: pointer;
    div.badge {
      position: absolute;
      right: 15px;
      top: 50%;
      transform: translateY(-50%);
    }
  }
  li::before {
    position: absolute;
    top: 1px;
    left: 0px;
    content: "";
    width: 100%;
    height: 1px;
    background: rgba($color: #000000, $alpha: 0.05);
  }
  li:first-child::before {
    display: none;
  }
  li:hover {
    background: rgba($color: #000, $alpha: 0.05);
  }
  li:hover::before {
    display: none;
  }
  li:hover + li::before {
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