<template>
  <div class="top-nav-wrapper">
    <div id="topNavMask" class="top-nav-mask modal-bg"></div>
    <div class="top-nav">
      <div class="left">
        <nuxt-link class="pc-logo" to="/">
          <div class="logo">
            <img width="30" src="https://cos.tngeek.com/logo.png" alt srcset />
            <div class="title">{{ options.title }}</div>
          </div>
        </nuxt-link>
        <div @click="showNav()" class="logo mobile-logo">
          <img width="35" src="https://cos.tngeek.com/logo.png" alt srcset />
        </div>
        <div class="search">
          <input
            placeholder="擅用搜索，事半功倍"
            v-model="searchValue"
            @focus="(isShowResBox = true), searchArticleFn()"
            @blur="hidResBox()"
            type="text"
          />
          <div class="res-box" :class="{ 'is-show-res-box': isShowResBox }">
            <div class="title">{{ searchArticle.length > 0 ? "搜索结果推荐文章" : "暂无结果" }}</div>
            <ul>
              <nuxt-link
                v-for="(item, index) in searchArticle"
                :key="index"
                :to="'/Article?id=' + item.id"
              >{{ item.title }}</nuxt-link>
            </ul>
          </div>
        </div>
      </div>
      <div class="right-links">
        <nuxt-link v-if="isLogin" to="/about">{{ user.nickname }}</nuxt-link>
        <nuxt-link v-else to="/login">
          <svg
            style="margin-top: 5px"
            xmlns="http://www.w3.org/2000/svg"
            width="20px"
            height="20px"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="feather feather-key"
          >
            <path
              d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4"
            />
          </svg>
        </nuxt-link>

        <!-- <fieldset class="form-group mode-setting">
          <label for="mode" class="paper-switch-label">{{ mode ? "黑夜" : "白天" }}</label>
          <label class="paper-switch">
            <input id="paperSwitch4" name="mode" v-model="mode" type="checkbox" />
            <span class="paper-switch-slider"></span>
          </label>
        </fieldset>-->
      </div>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  props: {
    options: {
      type: Object,
      default: {}
    }
  },
  data() {
    return {
      mode: false,
      isLogin: false,
      user: false,
      searchValue: "",
      timer: "",
      searchArticle: [],
      isShowResBox: false
    };
  },
  watch: {
    mode: function(val) {
      if (val) {
        document.getElementsByTagName("body")[0].className = "dark";
      } else {
        document.body.removeAttribute("class");
      }
    },
    searchValue: function(val) {
      var that = this;
      clearTimeout(this.timer);
      this.timer = setTimeout(async function() {
        that.searchArticleFn();
      }, 250);
    }
  },
  computed: {},
  methods: {
    async searchArticleFn() {
      this.searchArticle = (
        await this.$axios.get("/search?value=" + this.searchValue + "&limit=10")
      ).data.data;
    },
    hidResBox() {
      var that = this;
      setTimeout(function() {
        that.isShowResBox = false;
      }, 500);
    },
    showNav() {
      this.$emit("showNav");
    }
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
  mounted() {}
};
</script>
<style lang="scss" scoped>
.top-nav-wrapper {
  width: 100%;
  height: 100%;
  background: none !important;

  .top-nav {
    width: 100%;
    height: 60px;
    background: rgba(255, 255, 255, 0.8);
    -webkit-backdrop-filter: saturate(200%) blur(20px);
    box-shadow: 0px 0px 15px -15px rgb(0 0 0 / 15%);
    backdrop-filter: saturate(200%) blur(20px);
    padding: 0px 20px;
    display: flex;
    justify-content: space-between;
    border-radius: 15px;
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
        font-size: 20px;
        font-weight: bold;
        margin-right: 10px;
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
      .search {
        position: relative;
        margin-left: 50px;

        input {
          position: relative;
          z-index: 99;
          width: 320px;
          height: 40px;
          padding-left: 20px;
          font-size: 15px;
          border-radius: 12px;
          border: none;
          background: #eee;
          transition: all 0.25s;
         
        }
        .res-box {
          position: absolute;
          left: 0px;
          top: 0px;
          border-radius: 15px;
          width: 320px;
          height: 0px;
          overflow-y: scroll;
          padding: 0px 10px 0px 10px;
          line-height: 30px;
          color: #000;
          transition: all 0.25s;
          .title {
            width: 100%;
            color: #999;
            padding: 5px 5px 5px 10px;
          }
          ul {
            display: flex;
            flex-direction: column;
            a {
              position: relative;
              width: 100%;
              padding: 3px 10px;
              border-radius: 10px;
              font-size: 13px;
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
              background: rgba($color: #000000, $alpha: 0.07);
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
          background: rgba($color: #000000, $alpha: 0.2);
        }
        input:focus {
          background: rgba($color: #ffffff, $alpha: 0.9);
        }
        .is-show-res-box {
          height: 450px;
          padding: 40px 10px 12px 10px;
          background: rgba($color: #ffffff, $alpha: 1);
          box-shadow: 0px 0px 13px 0px rgb(0 0 0 / 15%);
        }
      }
    }
    .right-links {
      display: flex;
      align-items: center;
      a {
        white-space: nowrap;
        font-size: 18px;
        margin-right: 10px;
        transition: all 0.25s;
      }
      a:hover {
        transform: scale(1.1);
      }
      a:active {
        transform: scale(0.9);
      }
    }
  }
}
.form-group {
  margin: 0px;
}
.top-nav-mask {
  position: absolute;
  left: 0px;
  top: 0px;
  width: 100%;
  height: 100%;
  z-index: -9;
  border-radius: 15px;
  transition: opacity 0.25s;
  opacity: 0;
  background: rgba($color: #000000, $alpha: 0.55);
}
.isShowModal {
  .top-nav-mask {
    z-index: 9;
    opacity: 1 !important;
  }
}

@media screen and (max-width: 1480px) {
  .top-nav-mask {
    width: calc(100% - 30px);
    left: 15px;
  }
  .top-nav-wrapper {
    width: calc(100% - 14px);
  }
}

// 移动端适配
@media screen and (max-width: 680px) {
  .isShowModal {
    .top-nav-wrapper {
      display: none;
    }
  }
  .top-nav-wrapper {
    .top-nav {
      height: 45px;
      padding: 0px 10px;
      .left {
        width: calc(100% - 35px);
        .pc-logo {
          display: none;
        }
        .mobile-logo {
          display: block;
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
        .search {
          margin-left: 0px;
          width: calc(100% - 40px);
          input {
            height: 30px;
            width: 100%;
            border-radius: 7px;
            padding-left: 10px;
          }

          .res-box {
            border-radius: 10px;
            width: 100%;
          }
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
