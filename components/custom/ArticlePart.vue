<template>
  <div class="part article-box">
    <nuxt-link :to="'/Article?id=' + articleData.id">
      <div class="cover cover-bg"></div>
      <div
        class="cover"
        :style="
          'background:url(' +
          (articleData.img_src
            ? articleData.img_src
            : 'https://tngeek-mall-1255310647.cos.ap-guangzhou.myqcloud.com/public/images/pexels/' +
              articleData.id +
              '.jpg!blog_mainPic)')
        "
      ></div>
      <div class="article-box-body">
        <div class="article-box-title">{{ articleData.title }}</div>
        <div class="article-box-subtitle">{{ articleData.description }}</div>
        <tag-list
          style="margin-top: 5px; margin-bottom: 10px"
          v-if="articleData.expand.tag"
          :tags="articleData.expand.tag"
          :showJump=false
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
            {{ articleData.expand.author.nickname }}
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
            {{ articleData.expand.comments }}
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
      <span
        v-show="articleData.is_top && articleData.is_show"
        class="ui horizontal label red mini isTop"
        >置顶</span
      >
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
  padding: 7px;
  box-sizing: border-box;
  opacity: 0.9;
  transition: all 0.1s;

  a {
    background-image: none;
    display: flex;
  }
  .isTop {
    position: absolute;
    right: 10px;
    top: 10px;
  }
}
.article-box:hover {
  opacity: 1;
}
.cover {
  position: relative;
  z-index: 99;
  width: 280px;
  height: 180px;
  box-sizing: border-box;
  background-size: cover !important;
  border-radius: 7px;
  background-position: center center !important;
}
.cover-bg {
  position: absolute;
  left: 0px;
  top: 0px;
  width: 280px;
  height: 180px;
  background: #eee;
}

.article-box-body {
  position: relative;
  width: calc(100% - 320px);
  padding: 15px;
}
.article-box-title {
  margin-top: -2px;
  line-height: 24px;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  line-clamp: 2;
  -webkit-line-clamp: 2;
  font-size: 18px;
  color: #000;
  font-weight: bold;
}
.article-box-subtitle {
  font-size: 13px;
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
  bottom: 10px;
  left: 15px;
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

// 移动端适配
@media screen and (max-width: 1350px) {
  .index-wrapper-master {
    padding: 15px 25px 25px 25px;
  }
  .masonry .article-box {
    height: auto;

    .cover {
      width: 240px;
    }
    .article-box-body {
      width: calc(100% - 260px);
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
    align-articledatas: center;
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
  .masonry {
    .article-box {
      padding: 10px;

      a {
        flex-direction: column;
        .cover {
          width: 100%;
          margin-bottom: 20px;
        }
        .article-box-body {
          width: 100%;
        }
      }
    }
  }
}
</style>
