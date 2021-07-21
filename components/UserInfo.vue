<template>
  <div class="part">
    <div class="user-info">
      <img class="logo" :src="options.site_img" alt="" srcset="" />
      <div class="title">{{ options.title }}</div>
      <div class="description">{{ options.description }}</div>
    </div>
    <!-- <fieldset class="form-group mode-setting">
      <label for="mode" class="paper-switch-label">
        {{ mode ? "黑夜" : "白天" }}
      </label>
      <label class="paper-switch">
        <input id="paperSwitch4" name="mode" v-model="mode" type="checkbox" />
        <span class="paper-switch-slider"></span>
      </label>
    </fieldset> -->
  </div>
</template>

<script>
export default {
  components: {},
  props: {
    options: {
      type: Object,
      default: {},
    },
  },
  data() {
    return {
      mode: false,
    };
  },
  watch: {
    mode: function (val) {
      if (val) {
        document.getElementsByTagName("body")[0].className = "dark";
      } else {
        document.body.removeAttribute("class");
      }
    },
  },
  computed: {},
  methods: {},
  created() {},
  mounted() {},
};
</script>
<style lang="scss" scoped>
.user-info {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  box-sizing: border-box;
  .mode-setting {
    position: absolute;
    right: 10px;
    top: 30px;
    display: flex;
    align-items: center;
    .paper-switch-label {
      margin-top: 1px;
    }
  }
  .logo {
    width: 80px;
  }
  .title {
    margin: 22px 0px 14px 0px;
    color: #fff;
    font-size: 20px;
    background: #0071de;
  }
  .description {
    font-size: 14px;
    line-height: 22px;
    color: #000;
    margin-bottom: 10px;
  }
}
</style>