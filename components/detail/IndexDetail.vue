<template>
  <div class="index-wrapper-master part">
    <no-ssr>
      <div v-show="!hidMasonry" class="loading">
        <img
          width="300"
          src="https://kamtao-1255310647.cos.ap-chengdu.myqcloud.com/img/loading.gif"
          alt
        />
      </div>

      <div
        v-masonry
        transition-duration="0s"
        item-selector=".card"
        class="masonry"
        v-show="hidMasonry"
      >
        <div
          v-masonry-tile
          class="card border border-primary"
          :class="getBorderType()"
          :key="index"
          @click="hidMasonry = false"
          v-for="(item, index) in articleList.data"
        >
          <nuxt-link :to="'/Article?id=' + item.id">
            <div class="cover">
              <v-img v-if="item.img_src" :src="item.img_src"></v-img>
              <v-img v-if="!item.img_src" :src="'https://api.ixiaowai.cn/api/api.php?' + index"></v-img>
              <h4 class="card-title">{{ item.title }}</h4>
            </div>

            <div class="card-body">
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
    <div @click="getArticleList()" class="more-btn">
      {{
      articleList.data.length != articleList.count ? "点击加载更多" : "没有更多了"
      }}
    </div>
  </div>
</template>

<script>
import NoSSR from "vue-no-ssr";
import util from "@/util/index";
import VImg from "@/components/VImg";

export default {
  components: {
    "no-ssr": NoSSR,
    "v-img": VImg
  },
  props: {
    articleList: {
      type: Object,
      default: {}
    }
  },
  data() {
    return {
      page: 1,
      limit: 5,
      hidMasonry: true
    };
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
      var tag_options = ["", "secondary", "success", "warning", "danger"];
      var index = Math.floor(Math.random() * tag_options.length);
      return tag_options[index];
    },
    async getArticleList(type) {
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
          page: this.page
        };
        this.articleList.data = this.articleList.concat(
          (
            await this.$axios.get("/article-sort", {
              params
            })
          ).data.expand.data
        );
      } else {
        params = { limit: this.limit, page: this.page };
        this.articleList.data = this.articleList.data.concat(
          (
            await this.$axios.get("/article", {
              params
            })
          ).data.data
        );
      }
    }
  },
  created() {},
  mounted() {}
};
</script> 
<style lang="scss" scoped>
.index-wrapper-master {
  width: 100%;
}

.more-btn {
  margin-top: 20px;
  width: 100%;
  height: 45px;
  line-height: 45px;
  background: #eee;
  font-size: 16px;
  text-align: center;
  opacity: 0.4;
  color: #000;
  border-radius: 15px;
  transition: opacity 0.25s;
  cursor: pointer;
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
.more-btn:hover {
  opacity: 1;
}
.masonry {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  .card {
    width: calc(100% / 2 - 30px);
    margin: 15px;
    overflow: hidden;

    cursor: pointer;
    background: #fff;
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
  .cover {
    position: relative;
    .card-title {
      position: absolute;
      bottom: 25px;
      left: 15px;
      color: #000;
      font-size: 20px;
      font-weight: bold;
      color: #fff;
    }
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
    opacity: 0.6;
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

// 移动端适配
@media screen and (max-width: 1025px) {
  .index-wrapper-master {
    padding: 0px 15px 15px 15px;
  }
  .masonry .card {
    width: 100%;
    margin: 15px 0px;
  }
  .more-btn {
    height: 40px;
    line-height: 40px;
    font-size: 14px;
    border-radius: 10px;
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
}
</style>