<template>
  <div class="links-detail">
    <header
      class="border border-primary card"
      :style="'background:url(' + geek_config.site_info.links_bg + ')'"
      :class="getBorderType"
    >
      <div class="mask"></div>
      <div class="card-body">
        <h4 class="card-title">朋友，你好!</h4>
        <p class="card-text">
          但也不全是，有些是我不要脸单方面连的，比如：尤雨溪。
        </p>
      </div>
    </header>
    <div class="links">
      <div
        v-for="(item, index) in links.data"
        :key="index"
        class="links-card border border"
        :class="getBorderType()"
      >
        <a :href="item.url" target="_blank" class="user-item">
          <div class="avatar">
            <img :src="item.head_img" />
          </div>
          <div class="user-info">
            <div class="name">{{ item.name }}</div>
            <p class="description">{{ item.description }}</p>
          </div>
        </a>
      </div>
    </div>
    <div></div>
  </div>
</template>

<script>
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
    getBorderType() {
      return function () {
        return "border-" + Math.floor(Math.random() * 6 + 1);
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
.article-wrapper {
  display: flex;
}

header {
  width: calc(100% - 30px);
  margin: 15px 15px 15px 15px;
  position: relative;
  overflow: hidden;
  padding:50px 20px;
  color: #000;
  text-align: center;
  background-size: cover !important;
  box-shadow: none;
  .mask {
    position: absolute;
    top: -5%;
    left: -5%;
    width: 110%;
    height: 110%;
    background: rgba($color: #000000, $alpha: 0.4);
  }
  .card-body {
    position: relative;
    z-index: 99;
    color: #fff;
    text-align: left;
    .card-title {
      font-weight: bold;
    }
    .card-text {
      color: #fff;
      margin-top: 30px;
    }
  }
}
.links-pre::-webkit-scrollbar {
  width: 0px;
  height: 0px;
  display: none;
}
.links {
  width: 100%;
  display: flex;
  flex-wrap: wrap;

  .links-card {
    width: calc(100% / 2 - 30px);
    margin: 15px;
    overflow: hidden;
    background-color: rgba($color: #000000, $alpha: 0.05);
    .user-item {
      display: flex;
      background-image: none;
      align-items: flex-start;
      box-sizing: border-box;
      .avatar {
        width: 90px;
        height: 90px;
        display: flex;
        align-items: center;
        justify-content: center;

        img {
          width: 90px;
          height: auto;
          border-radius: 0px;
        }
      }
      .user-info {
        width: calc(100% - 100px);
        display: flex;
        flex-direction: column;
        padding: 10px;
        height: auto;
        max-height: 90px;
        .name {
          font-weight: bold;
          color: #5f6984;
          font-size: 14px;
          line-height: 16px;
        }
        .description {
          font-size: 13px;
          line-height: 16px;
          height: 40px;
          margin-top: 10px;
          color: #999;
          word-break: break-all;
          display: -webkit-box; /**对象作为伸缩盒子模型展示**/
          -webkit-box-orient: vertical; /**设置或检索伸缩盒子对象的子元素的排列方式**/
          -webkit-line-clamp: 2; /**显示的行数**/
          overflow: hidden; /**隐藏超出的内容**/
        }
      }
    }
  }
}

// 移动端适配
@media screen and (max-width: 1025px) {
  .article-wrapper {
    .main {
      min-width: 100%;
      width: 100%;
      padding: 0px;
      transition: opacity 0.5s;
      overflow: hidden;
    }
    header {
      margin: 0px;
      width: 100%;
      padding: 80px 20px;
      border-radius: 0px;
      border: none;

      .title {
        font-size: 26px;
      }
      .summary {
        div {
          margin: 5px 10px;
          font-size: 14px;
          .feather {
            margin-right: 5px;
          }
        }
      }
    }
    .card {
      width: 100% !important;
    }
  }

  .links {
    margin-top: 0px;
    padding: 20px;
    box-sizing: border-box;

    .links-card {
      width: 100%;
      margin: 5px 0px;
      border-radius: 0px;
      border: none;
      border-bottom: 1px rgba($color: #000000, $alpha: 0.05) solid;
      background: none;
      .user-item {
        padding: 10px;
        .avatar {
          width: 50px;
          height: 50px;
          border-radius: 5px;
          overflow: hidden;
          img {
            width: 50px;
          }
        }
        .user-info {
          padding: 5px 10px;
          height: auto;
          max-height: 70px;
          width: calc(100% - 60px);
        }
      }
    }
  }
}
</style>