<template>
  <div class="top-nav-wrapper">
    <div class="top-nav">
      <div class="left">
        <nuxt-link class="pc-logo" to="/">
          <div class="logo">
            <img
              width="26"
              :src="geek_config.site_config.logo_url"
              alt
              srcset
            />
            <div class="title">{{ geek_config.site_config.title }}</div>
          </div>
        </nuxt-link>
        <div @click="showNav()" class="logo mobile-logo">
          <img width="35" src="https://cos.tngeek.com/logo.png" alt srcset />
        </div>
        <div class="search">
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
            class="feather feather-search"
          >
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            placeholder="关键词"
            v-model="searchValue"
            @focus="(isShowResBox = true), searchArticleFn()"
            @blur="hidResBox()"
            type="text"
          />
          <div class="res-box" :class="{ 'is-show-res-box': isShowResBox }">
            <div class="title">
              {{ searchArticle.length > 0 ? "搜索结果推荐文章" : "暂无结果" }}
            </div>
            <ul>
              <nuxt-link
                v-for="(item, index) in searchArticle"
                :key="index"
                :to="'/Article?id=' + item.id"
                >{{ item.title }}</nuxt-link
              >
            </ul>
          </div>
        </div>
      </div>
      <div class="right">
        <div class="right-links">
          <div
            @click="toLink({ isLogin: false, path: '/Timeline' })"
            class="child"
          >
            <i class="bell outline icon"></i>
          </div>
          <div
            @click="toLink({ isLogin: false, path: '/MsgWall' })"
            class="child"
          >
            <i class="clock outline icon"></i>
          </div>

          <div
            @click="toLink({ isLogin: true, path: '/Timeline' })"
            class="child"
          >
            <i class="edit outline icon"></i>
          </div>
          <div @click="toLink({ isLogin: true, path: '/About' })" class="child">
            <i class="user outline icon"></i>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  props: {
    geek_config: {
      type: Object,
      default: {},
    },
  },
  data() {
    return {
      isLogin: false,
      user: false,
      searchValue: "",
      timer: "",
      searchArticle: [],
      isShowResBox: false,
    };
  },
  watch: {
    searchValue: function (val) {
      var that = this;
      clearTimeout(this.timer);
      this.timer = setTimeout(async function () {
        that.searchArticleFn();
      }, 250);
    },
  },
  computed: {},
  methods: {
    async searchArticleFn() {
      this.searchArticle = (
        await this.$axios.get("/search?value=" + this.searchValue + "&limit=10")
      ).data.data;
    },
    toLink({ isLogin, path }) {
      if (isLogin && !this.isLogin) {
        this.$notify({
          type: "warning",
          title: "注意",
          message: "请先登录！",
          duration: 5000,
          offset: 65,
        });
        this.$router.push("/login");
        return;
      }
      this.$router.push(path);
    },
    hidResBox() {
      var that = this;
      setTimeout(function () {
        that.isShowResBox = false;
      }, 500);
    },
    showNav() {
      this.$emit("showNav");
    },
  },
  created() {
    if (this.$cookies.get("token")) {
      this.isLogin = true;
      this.user = this.$cookies.get("user");
    }
  },
  beforeRouteUpdate(to, from, next) {
    if (this.$cookies.get("token")) {
      this.isLogin = true;
      this.user = this.$cookies.get("user");
      this.$forceUpdate();
    }
    next();
  },
  mounted() {},
};
</script>
<style lang="scss" scoped>
.top-nav-wrapper {
  width: 100%;
  height: 100%;

  .top-nav {
    max-width: calc(1351px - 14px);
    margin: 0 auto;
    width: 100%;
    height: 50px;
    display: flex;
    justify-content: space-between;
    border-radius: 7px;
    align-items: center;
    a {
      background-image: none;
    }

    .left {
      display: flex;
      align-items: center;

      .logo {
        display: flex;
        align-items: center;
        margin-right: 20px;

        .title {
          margin-left: 15px;
          font-size: 22px;
          font-weight: 700;
          margin-right: 10px;
          font-style: italic;
        }
        img {
          transition: all 0.25s;
        }
        img:active {
          transform: scale(0.9);
        }
      }
      .pc-logo {
        display: block;
      }
      .mobile-logo {
        display: none;
      }
    }
    .right {
      display: flex;
    }
    .right-links {
      display: flex;
      align-items: center;
      .child {
        cursor: pointer;
        white-space: nowrap;
        font-size: 22px;
        margin-right: 30px;
        transition: all 0.25s;
      }
      .child:last-child {
        margin-right: 0px;
      }
      .child:hover {
        transform: scale(1.1);
      }
      .child:active {
        transform: scale(0.9);
      }
      .nickname {
        font-size: 14px;
      }
    }
    .search {
      position: relative;
      margin-right: 30px;
      .feather-search {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        right: 15px;
        color: #999 !important;
        z-index: 99999;
      }
      input {
        position: relative;
        z-index: 99;
        width: 250px;
        height: 35px;
        padding-left: 20px;
        font-size: 14px;
        border-radius: 7px;
        border: none;
        background: #eee;
        transition: all 0.25s;
      }
      .res-box {
        position: absolute;
        left: 0px;
        top: 0px;
        border-radius: 7px;
        width: 272px;
        height: 0px;
        overflow-y: scroll;
        padding: 0px 10px 0px 10px;
        box-sizing: border-box;
        line-height: 30px;
        color: #000;
        transition: all 0.25s;
        .title {
          width: 100%;
          color: #999;
          font-size: 14px;
          padding: 5px 5px 5px 10px;
        }
        ul {
          display: flex;
          flex-direction: column;
          a {
            position: relative;
            width: 100%;
            padding: 3px 10px;
            border-radius: 7px;
            font-size: 14px;
            color: #666;
          }
          a::before {
            position: absolute;
            top: 0px;
            left: 0px;
            width: 100%;
            height: 1px;
            background: #eee;
            content: "";
          }
          a:hover {
            background: rgba($color: #000000, $alpha: 0.05);
          }
          a:hover::before {
            display: none;
          }
          a:hover + a::before {
            display: none;
          }
        }
      }
      .res-box::-webkit-scrollbar {
        width: 0px;
        height: 0px;
        display: none;
      }
      input:hover {
        background: rgba($color: #000000, $alpha: 0.1);
      }
      input:focus {
        background: rgba($color: #ffffff, $alpha: 1);
      }
      .is-show-res-box {
        height: 450px;
        padding: 40px 10px 12px 10px;
        background: rgba($color: #ffffff, $alpha: 1);
        box-shadow: 0px 0px 13px 0px rgb(0 0 0 / 15%);
      }
    }
  }
}
.form-group {
  margin: 0px;
}

@media screen and (max-width: 1300px) {
  .top-nav-wrapper {
    width: calc(100% - 8px);
  }
}

// 移动端适配
@media screen and (max-width: 1025px) {
  .top-nav-wrapper {
    background: none;
    -webkit-backdrop-filter: none;
    box-shadow: none;
    backdrop-filter: none;

    .top-nav {
      height: 45px;
      padding: 0px 10px;
      background: rgba(255, 255, 255, 0.8);
      -webkit-backdrop-filter: saturate(200%) blur(20px);
      box-shadow: none;
      backdrop-filter: saturate(200%) blur(20px);
      .left {
        .pc-logo {
          display: none;
        }
        .mobile-logo {
          display: block;
          margin-right: 10px;
        }
        .logo {
          display: inline-block;
          .title {
            display: none;
          }
          img {
            width: auto;
            height: 18px;
          }
        }
      }

      .search {
        margin-right: 10px;
        width: calc(100% - 40px);
        display: none;
        input {
          height: 30px;
          width: 100%;
          font-size: 14px;
          border-radius: 7px;
          padding-left: 10px;
        }

        .res-box {
          border-radius: 7px;
          width: 100%;
        }
      }
      .right-links {
        a {
          font-weight: bold;
          margin-right: 5px;
          font-size: 14px;
          margin-left: 5px;
        }
      }
    }
  }
}
</style>
