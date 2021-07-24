<template>
  <div class="right-wrapper index-wrapper part">
    <no-ssr>
      <div v-masonry transition-duration="none" item-selector=".card" class="masonry">
        <div
          v-masonry-tile
          class="card border border-primary"
          :class="getBorderType()"
          :key="index"
          v-for="(item, index) in article.data"
        >
          <nuxt-link :to="'/Article?id=' + item.id">
            <img v-if="item.img_src" :src="item.img_src" />
            <img v-if="!item.img_src" :src="'http://www.dmoe.cc/random.php?' + index" />
            <div class="card-body">
              <h4 class="card-title">{{ item.title }}</h4>
              <h5 class="card-subtitle">{{ item.description }}</h5>
              <div class="tag">
                <span
                  v-for="(tag, index) in item.expand.tag"
                  :key="index"
                  class="badge"
                  :class="getTagColor()"
                >{{ tag.name }}</span>
              </div>
              <div class="card-text">
                <div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16px"
                    height="16px"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    class="feather feather-user"
                  >
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                  </svg>
                  <polyline points="12 6 12 12 16 14"></polyline>
                  {{ item.expand.author.nickname }}
                </div>
                <div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16px"
                    height="16px"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    class="feather feather-message-square"
                  >
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                  </svg>
                  {{ item.expand.comments }}
                </div>
                <div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16px"
                    height="16px"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    class="feather feather-eye"
                  >
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                  <polyline points="12 6 12 12 16 14"></polyline>
                  {{ item.views }}
                </div>
                <div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16px"
                    height="16px"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    class="feather feather-clock"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <polyline points="12 6 12 12 16 14" />
                  </svg>
                  {{ getBeautifyTime(item.create_time) }}
                </div>
              </div>
            </div>
          </nuxt-link>
        </div>
      </div>
    </no-ssr>
  </div>
</template>

<script>
import NoSSR from "vue-no-ssr";
import util from "@/util/index";

export default {
  components: {
    "no-ssr": NoSSR
  },
  async asyncData({ $axios }) {
    const article = (
      await $axios.get("/article", {
        params: { limit: 20 }
      })
    ).data;
    article.data = article.data.filter(
      item => ["留言墙", "友情链接"].indexOf(item.title) < 0
    );
    return { article };
  },
  props: {},
  data() {
    return {};
  },
  watch: {},
  computed: {
    getBeautifyTime() {
      return function(time) {
        return util.getBeautifyTime(time);
      };
    },
    getBorderType() {
      return function() {
        return "border-" + Math.floor(Math.random() * 6 + 1);
      };
    }
  },
  methods: {
    getTagColor() {
      var options = ["", "secondary", "success", "warning", "danger"];
      var index = Math.floor(Math.random() * options.length);
      return options[index];
    }
  },
  created() {},
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
    width: calc(100% / 3 - 30px);
    margin: 15px;
    overflow: hidden;
    cursor: pointer;
    a {
      background-image: none;
    }
    .badge {
      cursor: pointer;
      margin-bottom: 7px;
      font-weight: 400;
      font-size: 12px;
      margin-right: 7px;
    }
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
    margin-top: 10px;
    margin-bottom: 0px;
    display: flex;
    white-space: nowrap;
    flex-wrap: wrap;
    div {
      margin-right: 12px;
      display: flex;
      align-items: center;
      .feather {
        margin-right: 5px;
      }
    }
  }
}
@media screen and (max-width: 1280px) {
  .masonry {
    width: 100%;
    .card {
      width: calc(100% / 2 - 35px);
    }
  }
}
</style>