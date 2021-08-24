<template>
  <div class="index-wrapper-master">
    <div class="masonry">
      <div
        class="article-box"
        :key="index"
        @click="hidMasonry = false"
        v-for="(item, index) in articleList.data"
      >
        <nuxt-link :to="'/Article?id=' + item.id">
          <div class="cover">
            <v-img v-if="item.img_src" :src="item.img_src"></v-img>
            <v-img
              v-if="!item.img_src"
              :src="'https://api.kenvie.com/webp.php?' + index"
            ></v-img>
          </div>

          <div class="article-box-body">
            <div class="article-box-title">{{ item.title }}</div>
            <div class="article-box-subtitle">{{ item.description }}</div>
            <tag-list
              style="margin-top: 10px; margin-bottom: 10px"
              v-if="item.expand.tag"
              :tags="item.expand.tag"
            ></tag-list>
            <div class="article-box-footer">
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
                  <path
                    d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"
                  />
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
    <div @click="getArticleList()" class="more-btn">
      {{
        articleList.data.length != articleList.count
          ? "点击加载更多"
          : "没有更多了"
      }}
    </div>
  </div>
</template>

<script>
import util from "@/util/index";
import TagList from "../custom/TagList.vue";

export default {
  components: { TagList },
  props: {
    articleList: {
      type: Object,
      default: {},
    },
  },
  data() {
    return {
      page: 1,
      limit: 5,
      hidMasonry: true,
    };
  },
  watch: {},
  computed: {
    getBeautifyTime() {
      return function (time) {
        return util.getBeautifyTime(time);
      };
    },
  },
  methods: {
    getTagColor() {
      var tag_options = ["", "secondary", "success", "warning", "danger"];
      var index = Math.floor(Math.random() * tag_options.length);
      return tag_options[index];
    },
    async getArticleList(type) {
      if (this.articleList.data.length == this.articleList.count) {
        return;
      }

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
          page: this.page,
        };
        this.articleList.data = this.articleList.concat(
          (
            await this.$axios.get("/article-sort", {
              params,
            })
          ).data.expand.data
        );
      } else {
        params = { limit: this.limit, page: this.page };
        this.articleList.data = this.articleList.data.concat(
          (
            await this.$axios.get("/article", {
              params,
            })
          ).data.data
        );
      }
    },
  },
  created() {},
  mounted() {},
};
</script>
<style lang="scss" scoped>
.index-wrapper-master {
  width: 100%;
  padding: 14px;
}

.more-btn {
  margin-top: 5px;
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
  .article-box {
    width: 100%;
    margin:5px 0px;
    overflow: hidden;
    cursor: pointer;
    background: rgba($color: #000000, $alpha: 0.02);
    border-color: rgba($color: #000000, $alpha: 0.05);
    border-width: 1px;
    box-shadow: none;
    a {
      background-image: none;
      display: flex;
    }
    .badge {
      cursor: pointer;
      margin-bottom: 7px;
      font-weight: 400;
      font-size: 12px;
      margin-right: 7px;
      padding: 1px 2px;
    }
  }
  .article-box:hover {
    transform: none;
    border-color: rgba($color: #000000, $alpha: 0.2);
  }
  .cover {
    width: 320px;
    position: relative;
  }

  .article-box-body {
    position: relative;
    width: calc(100% - 320px);
    padding: 20px;
  }
  .article-box-title {
    font-size: 18px;
    color: #000;
    font-weight: bold;
  }
  .article-box-subtitle {
    font-size: 14px;
    color: #999;
    line-height: 22px;
    margin-top: 10px;
    text-overflow: -o-ellipsis-lastline;
    overflow: hidden;
    font-weight: normal;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    line-clamp: 2;
    -webkit-box-orient: vertical;
  }
  .article-box-footer {
    position: absolute;
    bottom: 20px;
    left: 20px;
    background: none;
    border: none;
    padding: 0px;
    font-size: 12px;
    line-height: 24px;
    color: #000;
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

// 移动端适配
@media screen and (max-width: 1355px) {
  .index-wrapper-master {
    padding: 15px 25px 25px 25px;
  }
  .masonry .article-box {
    margin: 15px 0px;
    a {
      flex-direction: column;
    }
    .cover {
      width: 100%;
    }
    .article-box-body {
      width: 100%;
      padding-bottom: 50px;
      .article-box-title {
        font-size: 18px;
      }
    }
  }
  .more-btn {
    height: 40px;
    line-height: 40px;
    font-size: 14px;
    border-radius: 7px;
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

@media screen and (max-width: 1024px) {
  .index-wrapper-master {
    padding: 0px 15px 15px 15px;
  }
}
</style>
