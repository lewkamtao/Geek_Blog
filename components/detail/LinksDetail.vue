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
  </div>
</template>

<script>
import PageHeader from "@/components/custom/PageHeader.vue";
import util from "@/util/index";

export default {
  components: { PageHeader },
  props: {
    geek_config: {
      type: Object,
      default: function () {
        return {};
      },
    },
    links: {
      type: Object,
      default: {},
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
  padding: 0px;
  .list {
    padding: 30px 50px;
  }
  .item {
    padding: 10px !important;
    box-shadow: 0px 0px 5px rgba($color: #000000, $alpha: 0.15) !important;
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
