<template>
  <div class="about-wrapper part">
    <div
      v-if="geek_config.master_info.about_detail_html"
      v-html="geek_config.master_info.about_detail_html"
    ></div>
    <div v-if="!geek_config.master_info.about_detail_html" class="null-box">
      <img src="https://kamtao-1255310647.cos.ap-chengdu.myqcloud.com/img/Gxf32F.jpg" alt srcset />
      <h6>页面尚未配置，请登录后，前往通用设置 - 关于我</h6>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  head() {
    return {
      title: "关于我 - " + this.geek_config.site_info.title
    };
  },
  async asyncData({ $axios, route }) {},
  props: {
    geek_config: {
      type: Object,
      default: {}
    }
  },
  data() {
    return {};
  },

  watch: {},
  computed: {},
  methods: {}
};
</script>
<style lang="scss" scoped>
.about-wrapper {
  width: 100%;
  overflow: hidden;
  div {
    width: 100%;
  }
  
}
.null-box {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 50px;
  h6 {
    text-align: center;
  }
}
</style>
