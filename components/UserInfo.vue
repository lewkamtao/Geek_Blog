<template>
  <div class="part">
    <div class="user-info">
      <div class="avatar border border-primary" :class="getBorderType()">
        <img :src="options.site_img" alt srcset />
      </div>
      <div class="nickname">{{ options.title }}</div>
      <div class="description">{{ options.description }}</div>
    </div>
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
  .avatar {
    width: 80px;
    height: 80px;
    overflow: hidden;
    img {
      border-bottom-left-radius: 0px;
      border-bottom-right-radius: 0px;
      border-top-left-radius: 0px;
      border-top-right-radius: 0px;
    }
  }
  .nickname {
    margin: 22px 0px 14px 0px;
    color: #fff;
    font-size: 18px;
    font-weight: bold;
    background: #333;
  }
  .description {
    font-size: 14px;
    line-height: 22px;
    color: #000;
    margin-bottom: 10px;
  }
}
</style>