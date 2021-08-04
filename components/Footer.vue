<template>
  <div class="footer-wrapper">
    <div v-html="geek_config.site_info.footer_html"></div>
  </div>
</template>

<script>
export default {
  components: {},
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
  methods: {},
  created() {},
  mounted() {}
};
</script>
<style lang="scss" scoped>
.footer-wrapper {
  width: 100%;
  height: 100px;
  display: flex;
  align-items: center;
}
.isShowAside {
  .footer-wrapper {
    display: none;
  }
}
</style>