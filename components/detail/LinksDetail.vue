<template>
  <div class="links-detail">
    <header
      class="ui dimmable dimmed border border-primary"
      :style="'background:url(' + geek_config.site_info.links_bg + ')'"
    >
      <div
        class="ui simple dimmer"
        style="background-color: rgba(0, 0, 0, 0.65)"
      ></div>
      <div class="card-body">
        <h1>朋友，你好!</h1>
      </div>
    </header>
    <div class="ui two column stackable grid">
      <div class="three column row">
        <div
          v-for="(item, index) in links.data"
          :key="index"
          style="margin-top: 30px"
          class="column"
        >
          <div class="ui card">
            <div class="image">
              <img :src="item.head_img" />
            </div>
            <div class="content">
              <a :href="item.url" target="_blank" class="header">{{
                item.name
              }}</a>
              <div class="meta">
                <span class="date">
                  {{ getBeautifyTime(item.create_time) }}</span
                >
              </div>
              <div class="description">
                {{ item.description }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div></div>
  </div>
</template>

<script>
import util from "@/util/index";

export default {
  components: {},
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
  padding: 30px;
  header {
    width: 100%;
    position: relative;
    overflow: hidden;
    padding: 50px 20px;
    color: #fff;
    text-align: center;
    background-size: cover !important;
    box-shadow: none;

    .card-body {
      position: relative;
      z-index: 99;
    }
  }
  .description {
    height: 40px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
}
</style>
