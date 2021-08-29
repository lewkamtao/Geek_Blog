<template>
  <div class="part">
    <div class="user-info">
      <div class="avatar">
        <img :src="geek_config.master_info.head_img" alt srcset />
      </div>
      <div class="nickname">{{ geek_config.master_info.nickname }}</div>
      <div class="description">{{ geek_config.master_info.description }}</div>
    </div>
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
  },
  data() {
    return {};
  },
  watch: {},
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
  .avatar {
    width: 70px;
    height: 70px;
    overflow: hidden;
    img {
      width: 100%;
      height: 100%;
      border-radius: 8px;
    }
  }
  .nickname {
    margin-top: 8px;margin-bottom:5px;
    color: #000;
    font-size: 18px;
    font-weight: bold;
  }
  .description {
    font-size: 14px;
    line-height: 22px;
    color: #000;
  }
}
</style>
