<template>
  <div class="part">
    <div class="user-info">
      <div class="avatar">
        <img :src="geek_config.master_info.head_img" alt srcset />
      </div>
      <div class="info">
        <div class="nickname">{{ geek_config.master_info.nickname }}</div>
        <div class="description">
          {{ geek_config.master_info.description }}
        </div>
      </div>
    </div>
    <div class="user-intro">
      <div style="margin-left: 8px; margin-top: 10px" class="main-title">
        介绍
      </div>
      <div class="ui list intro">
        <div class="item">
          <i class="mail icon"></i>
          <div class="content">前端工程师 在 广州</div>
        </div>

        <div class="item">
          <i class="marker icon"></i>
          <div class="content">住在 <span class="tag">广州 白云</span></div>
        </div>

        <div class="item">
          <i class="linkify icon"></i>
          <div class="content">喜欢 <span class="tag">唱 跳 rap</span></div>
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
.part {
  display: flex;
  flex-direction: column;
}
.user-info {
  position: relative;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  box-sizing: border-box;
  padding: 6px;
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
    width: 50px;
    height: 50px;
    overflow: hidden;
    img {
      width: 100%;
      height: 100%;
      border-radius: 8px;
    }
  }
  .info {
    width: calc(100% - 60px);
    margin-left: 10px;
    .nickname {
      margin-top: 2px;
      margin-bottom: 5px;
      color: #000;
      font-size: 18px;
      font-weight: bold;
    }
    .description {
      font-size: 14px;
      line-height: 22px;
      color: #000;
      width: 140px;
      overflow: hidden; /*超出部分隐藏*/
      white-space: nowrap; /*不换行*/
      text-overflow: ellipsis; /*超出部分文字以...显示*/
    }
  }
  .intro {
    margin-top: -5px;
    padding: 10px;
  }
  .tag {
    color: #0e6eb8;
  }
}
</style>
