<template>
  <div class="right-wrapper index-wrapper part">
    <no-ssr>
      <div
        v-masonry
        transition-duration="0.5s"
        item-selector=".card"
        class=" masonry"
      >
        <div
          v-masonry-tile
          class="card border border-primary"
          :class="getBorderType()"
          :key="index"
          v-for="(item, index) in article.data"
        >
          <img
            :src="'http://www.dmoe.cc/random.php?' + index"
            alt="Card example image"
          />
          <div class="card-body">
            <h4 class="card-title">{{ item.title }}</h4>
            <h5 class="card-subtitle">{{ item.description }}</h5>
            <p class="card-text">
              更新时间：{{ item.update_time }} <br />
              点击量：{{ item.expand.comments }} 字数：{{
                item.font_count
              }}
              评论：{{ item.expand.comments }} 点击量：{{
                item.expand.comments
              }}
            </p>
          </div>
        </div>
      </div>
    </no-ssr>
  </div>
</template>

<script>
import NoSSR from "vue-no-ssr";

export default {
  components: {
    "no-ssr": NoSSR
  },

  async asyncData({ $axios }) {
    const article = (await $axios.get("/article")).data;
    return { article };
  },
  props: {},
  data() {
    return {};
  },
  watch: {},
  computed: {
    getBorderType() {
      return function() {
        return "border-" + Math.floor(Math.random() * 6 + 1);
      };
    }
  },
  methods: {},
  created() {
    console.log(this.article);
  },
  mounted() {}
};
</script> 
<style lang="scss" scoped>
.index-wrapper {
  display: flex;
}
.masonry {
  width: 100%;
  .card {
    width: calc(100% / 4 - 20px);
    margin: 10px;
    overflow: hidden;
    cursor: pointer;
  }
  .card-title {
    color: #000;
    font-size: 24px;
  }
  .card-body {
    padding: 20px;
  }
  .card-subtitle {
    font-size: 12px;
  }
  .card-text {
    font-size: 12px;
    line-height: 24px;
    margin-bottom: 0px;
  }
}
</style>