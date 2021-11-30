<template>
  <main>
    <div class="login-wrapper part">
      <div id="login" class="form part" :class="borderStyle">
        <div id="owl-login" :class="{ password: isActivePassWord }">
          <div class="hand"></div>
          <div class="hand hand-r"></div>
          <div class="arms">
            <div class="arm"></div>
            <div class="arm arm-r"></div>
          </div>
        </div>
        <div style="margin-bottom: 20px" class="ui input item">
          <input
            type="text"
            v-model="form.account"
            @keyup.enter="login"
            placeholder="账号"
          />
        </div>
        <div style="margin-bottom: 20px" class="ui input item">
          <input
            type="password"
            v-model="form.password"
            @blur="isActivePassWord = false"
            @focus="isActivePassWord = true"
            @keyup.enter="login"
            placeholder="密码"
          />
        </div>
        <div class="row">
          <button
            @click="login"
            style="width: 100%"
            class="ui primary button "
            :class="{ loading: loading }"
          >
            登录
          </button>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
export default {
  components: {},
  props: {},
  data() {
    return {
      form: {
        account: "",
        password: "",
      },
      isActivePassWord: false,
      borderStyle: "",
      loading: false,
    };
  },
  watch: {},
  computed: {},
  methods: {
    login() {
      var data = this.form;
      data.mode = "login";
      this.loading = true;
      this.$axios.post("/users", data).then((res) => {
        this.loading = false;
        if (res.code == "200") {
          this.$cookies.set("token", res.data["login-token"]);
          location.reload();
        }
      });
    },
  },
  created() {
    if (this.$cookies.get("token")) {
      this.$router.push("/"); //否则跳转至首页
    }
  },
  mounted() {},
};
</script>
<style  scoped lang="less">
.login-wrapper {
  position: relative;
  min-width: 980px;
  margin: 0 auto;
  height: calc(100vh - 120px);
  overflow: hidden;
  display: flex;
  align-items: center;
}

.form {
  position: relative;
  padding: 50px;
  margin: 0px auto;
  box-sizing: border-box;
  z-index: 99;
  width: 300px;
  height: auto;
  background: #fff;
  box-shadow: 0px 0px 30px rgba(0, 0, 0, 0.1);
  .item {
    margin-bottom: 15px;
    width: 100%;
    label {
      font-size: 16px;
      line-height: 28px;
    }
  }
}

.cover {
  position: absolute;
  width: 70%;
  left: 20%;
  display: flex;
  flex-wrap: wrap;
  transform: rotate(-18deg) scale(1.8);
  font-weight: 400;
}

.cover span {
  font-size: 14px;
  margin-right: 50px;
  margin-bottom: 14px;
  color: #000;
  opacity: 0.1;
  cursor: pointer;
}

.cover span:hover {
  opacity: 1;
}

.login-button {
  margin-top: 10px;
  height: 35px;
  font-size: 16px;
  padding: 5px 15px;
}

// 移动端适配
@media screen and (max-width: 1025px) {
  .login-wrapper {
    width: 100%;
    height: calc(100vh - 120px);
    min-width: 100%;
    padding: 45px;
    .form {
      padding: 30px;
    }
  }
}

// 猫头鹰动画
#login #owl-login,
#register #owl-login {
  width: 211px;
  height: 108px;
  background-image: url("@/assets/images/owl-login.png");
  position: absolute;
  top: -100px;
  left: 50%;
  margin-left: -111px;
}
@media all and (-webkit-min-device-pixel-ratio: 1.5),
  (min--moz-device-pixel-ratio: 1.5),
  (-o-min-device-pixel-ratio: 1.5/1),
  (min-device-pixel-ratio: 1.5),
  (min-resolution: 138dpi),
  (min-resolution: 1.5dppx) {
  #login #owl-login,
  #register #owl-login {
    background-image: url("@/assets/images/owl-login@2x.png");
    -webkit-background-size: 211px 108px;
    -moz-background-size: 211px 108px;
    background-size: 211px 108px;
  }
}
#login #owl-login .hand,
#register #owl-login .hand {
  width: 34px;
  height: 34px;
  -webkit-border-radius: 45px;
  border-radius: 45px;
  background-color: #472d20;
  -webkit-transform: scaleY(0.6);
  -moz-transform: scaleY(0.6);
  -o-transform: scaleY(0.6);
  -ms-transform: scaleY(0.6);
  transform: scaleY(0.6);
  -webkit-transition: 0.3s ease-out;
  -moz-transition: 0.3s ease-out;
  -o-transition: 0.3s ease-out;
  -ms-transition: 0.3s ease-out;
  transition: 0.3s ease-out;
  position: absolute;
  left: 14px;
  bottom: -8px;
}
#login #owl-login .hand.hand-r,
#register #owl-login .hand.hand-r {
  left: 170px;
}
#login #owl-login.password .hand,
#register #owl-login.password .hand {
  -webkit-transform: translateX(42px) translateY(-15px) scale(0.7);
  -moz-transform: translateX(42px) translateY(-15px) scale(0.7);
  -o-transform: translateX(42px) translateY(-15px) scale(0.7);
  -ms-transform: translateX(42px) translateY(-15px) scale(0.7);
  transform: translateX(42px) translateY(-15px) scale(0.7);
}
#login #owl-login.password .hand.hand-r,
#register #owl-login.password .hand.hand-r {
  -webkit-transform: translateX(-42px) translateY(-15px) scale(0.7);
  -moz-transform: translateX(-42px) translateY(-15px) scale(0.7);
  -o-transform: translateX(-42px) translateY(-15px) scale(0.7);
  -ms-transform: translateX(-42px) translateY(-15px) scale(0.7);
  transform: translateX(-42px) translateY(-15px) scale(0.7);
}
#login #owl-login .arms,
#register #owl-login .arms {
  top: 58px;
  position: absolute;
  width: 100%;
  height: 41px;
  overflow: hidden;
}
#login #owl-login .arms .arm,
#register #owl-login .arms .arm {
  width: 40px;
  height: 65px;
  position: absolute;
  left: 20px;
  top: 40px;
  background-image: url("@/assets/images/owl-login-arm.png");
  -webkit-transition: 0.3s ease-out;
  -moz-transition: 0.3s ease-out;
  -o-transition: 0.3s ease-out;
  -ms-transition: 0.3s ease-out;
  transition: 0.3s ease-out;
  -webkit-transform: rotate(-20deg);
  -moz-transform: rotate(-20deg);
  -o-transform: rotate(-20deg);
  -ms-transform: rotate(-20deg);
  transform: rotate(-20deg);
}
@media all and (-webkit-min-device-pixel-ratio: 1.5),
  (min--moz-device-pixel-ratio: 1.5),
  (-o-min-device-pixel-ratio: 1.5/1),
  (min-device-pixel-ratio: 1.5),
  (min-resolution: 138dpi),
  (min-resolution: 1.5dppx) {
  #login #owl-login .arms .arm,
  #register #owl-login .arms .arm {
    background-image: url("@/assets/images/owl-login-arm@2x.png");
    -webkit-background-size: 40px 65px;
    -moz-background-size: 40px 65px;
    background-size: 40px 65px;
  }
}
#login #owl-login .arms .arm.arm-r,
#register #owl-login .arms .arm.arm-r {
  -webkit-transform: rotate(20deg) scaleX(-1);
  -moz-transform: rotate(20deg) scaleX(-1);
  -o-transform: rotate(20deg) scaleX(-1);
  -ms-transform: rotate(20deg) scaleX(-1);
  transform: rotate(20deg) scaleX(-1);
  left: 158px;
}
#login #owl-login.password .arms .arm,
#register #owl-login.password .arms .arm {
  -webkit-transform: translateY(-40px) translateX(40px);
  -moz-transform: translateY(-40px) translateX(40px);
  -o-transform: translateY(-40px) translateX(40px);
  -ms-transform: translateY(-40px) translateX(40px);
  transform: translateY(-40px) translateX(40px);
}
#login #owl-login.password .arms .arm.arm-r,
#register #owl-login.password .arms .arm.arm-r {
  -webkit-transform: translateY(-40px) translateX(-40px) scaleX(-1);
  -moz-transform: translateY(-40px) translateX(-40px) scaleX(-1);
  -o-transform: translateY(-40px) translateX(-40px) scaleX(-1);
  -ms-transform: translateY(-40px) translateX(-40px) scaleX(-1);
  transform: translateY(-40px) translateX(-40px) scaleX(-1);
}
</style>
