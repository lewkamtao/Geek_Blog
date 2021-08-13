<template>
  <div class="about-wrapper part">
    <div
      v-if="geek_config.master_info.about_detail_html"
      v-html="geek_config.master_info.about_detail_html"
    ></div>
    <div v-if="!geek_config.master_info.about_detail_html" class="null-box">
      <img
        src="https://kamtao-1255310647.cos.ap-chengdu.myqcloud.com/img/Gxf32F.jpg"
        alt
        srcset
      />
      <h6>页面尚未配置，请登录后，前往通用设置 - 关于我</h6>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    geek_config: {
      type: Object,
      default: {},
    },
  },
};
</script>
<style lang="scss" scoped>
.about-wrapper {
  padding: 0px;
}
</style>
