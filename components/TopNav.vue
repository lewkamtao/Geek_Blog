<template>
  <div class="top-nav-wrapper">
    <div id="topNavMask" class="top-nav-mask modal-bg">1</div>
    <div class="top-nav part">
      <div class="left">
        <nuxt-link to="/">
          <div class="logo">
            <img width="35" src="https://cos.tngeek.com/logo.png" alt srcset />
            是一尘不染的猫
          </div>
        </nuxt-link>

        <div class="search">
          <input placeholder="擅用搜索，事半功倍" type="text" /> 
        </div>
      </div>
      <div class="right-links">
        <nuxt-link to="/login">登录</nuxt-link>
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
  props: {},
  data() {
    return { mode: false };
  },
  watch: {
    mode: function(val) {
      if (val) {
        document.getElementsByTagName("body")[0].className = "dark";
      } else {
        document.body.removeAttribute("class");
      }
    }
  },
  computed: {},
  methods: {},
  created() {},
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
    backdrop-filter: saturate(200%) blur(20px);
    padding: 0px 20px;
    display: flex;
    justify-content: space-between;
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
        font-size: 24px;
        img {
          margin-right: 10px;
        }
      }
      .search {
        margin-left: 45px;
        input {
          width: 250px;
          height: 35px;
          padding-left: 10px;
          font-size: 15px;
          border-radius: 10px !important;
          border: none;
          background: #eee;
          transition: all 0.25s;
        }
        input:hover {
          background: rgba($color: #000000, $alpha: 0.07);
        }
        input:focus {
          background: rgba($color: #000000, $alpha: 0.09);
        }
      }
    }
    .right-links {
      display: flex;
      align-items: center;
      a {
        font-size: 18px;
        margin-right: 20px;
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
  z-index: 999;
  display: none;
  transition: all 0.3s;
  background: rgba($color: #000000, $alpha: 0.5);
}
@media screen and (max-width: 1480px) {
  .top-nav-wrapper {
    width: calc(100% - 14px);
  }
}
</style>