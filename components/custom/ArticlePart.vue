<template>
  <div class="part article-box">
    <nuxt-link :to="'/Article?id=' + articleData.id">
      <div class="article-box-body">
        <div class="article-box-title">
          <span
            style="margin-right: 10px"
            v-show="articleData.is_top && articleData.is_show"
            class="ui horizontal label red mini"
            >置顶</span
          >
          {{ articleData.title }}
        </div>
        <div class="article-box-subtitle">{{ articleData.description }}</div>
        <tag-list
          v-if="articleData.expand.tag.length > 0"
          :tags="articleData.expand.tag"
          :showJump="false"
        ></tag-list>
        <div class="article-box-footer">
          <div
            v-if="articleData.expand.sort && articleData.expand.sort.length > 0"
          >
            <svg
              viewBox="0 0 24 24"
              width="16"
              height="16"
              stroke="currentColor"
              stroke-width="2"
              fill="none"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="feather css-i6dzq1"
            >
              <line x1="4" y1="9" x2="20" y2="9"></line>
              <line x1="4" y1="15" x2="20" y2="15"></line>
              <line x1="10" y1="3" x2="8" y2="21"></line>
              <line x1="16" y1="3" x2="14" y2="21"></line>
            </svg>

            {{ articleData.expand.sort[0].name }}
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
            {{ articleData.expand.comments.count }}
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
            {{ articleData.views }}
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
            {{ getBeautifyTime(articleData.create_time) }}
          </div>
        </div>
      </div>
      <div v-if="articleData.img_src" class="article-cover">
        <img :src="`${articleData.img_src}`" alt="" srcset="" />
      </div>
    </nuxt-link>
  </div>
</template>

<script>
import util from "@/util/index";
import TagList from "./TagList.vue";

export default {
  components: {
    TagList,
  },
  props: {
    articleData: {
      type: Object,
      default: function () {
        return {};
      },
    },
  },
  computed: {
    getBeautifyTime() {
      return function (time) {
        return util.getBeautifyTime(time);
      };
    },
  },
};
</script>

<style lang="scss" scoped>
.article-box {
  width: 100%;
  overflow: hidden;
  cursor: pointer;
  padding: 17px;
  box-sizing: border-box;
  opacity: 0.9;
  transition: all 0.1s;

  a {
    background-image: none;
    display: flex;
    align-items: flex-start;
  }
}
.article-box:hover {
  opacity: 1;
}
.article-cover {
  width: 100px;
  height: 100px;
  img {
    width: 100%;
    height: 100%;
    border-radius: 6px;
    object-fit: cover;
  }
}
.article-box-body {
  position: relative;
  display: flex;
  flex-direction: column;
  width: calc(100% - 110px);
  margin-right: 10px;
  padding-bottom: 30px;
  min-height: 100px;
}
.article-box-title {
  display: flex;
  align-items: center;
  margin-top: -2px;
  line-height: 24px;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  line-clamp: 2;
  -webkit-line-clamp: 2;
  font-size: 18px;
  color: #000;
  font-weight: 600;
}
.article-box-subtitle {
  font-size: 13px;
  color: #000;
  opacity: 0.4;
  line-height: 22px;
  margin-top: 5px;
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
  left: 0px;
  bottom: 0px;
  padding: 0px;
  font-size: 12px;
  line-height: 24px;
  color: #000;
  margin-bottom: 0px;
  display: flex;
  white-space: nowrap;
  opacity: 0.4;
  div {
    margin-right: 12px;
    display: flex;
    align-items: center;
    .feather {
      margin-right: 5px;
    }
  }
}

// 移动端适配
@media screen and (max-width: 1350px) {
  .index-wrapper-master {
    padding: 15px 25px 25px 25px;
  }

  .masonry .article-box {
    height: auto;

    .article-box-body {
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
    align-articledatas: center;
    justify-content: center;
    img {
      width: 400px;
    }
  }
}

@media screen and (max-width: 765px) {
  .index-wrapper-master {
    padding: 0px 15px 15px 15px;
  }
  .article-cover {
    width: 60px;
    height: auto;
    img {
      width: 60px;
      height: 60px;
    }
  }
  .masonry {
    .article-box {
      a {
        .article-box-body {
          min-height: auto;
          width: calc(100% - 60px);
        }
      }
    }
  }
}
</style>
