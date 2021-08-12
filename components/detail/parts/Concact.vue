<template>
  <div style="margin-bottom: 14px" class="concact part">
    <div class="main-title" style="margin-bottom: 12px">联系方式</div>
    <div
      v-if="geek_config.master_info.concact_html"
      v-html="geek_config.master_info.concact_html"
    ></div>
    <div v-if="!geek_config.master_info.concact_html" class="null-box">
      <img
        src="https://kamtao-1255310647.cos.ap-chengdu.myqcloud.com/img/Gxf32F.jpg"
        alt
        srcset
      />
      <h6>板块尚未配置，请登录后，前往通用设置 - 关于我</h6>
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

