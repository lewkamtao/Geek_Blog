<template>
  <div class="footer-wrapper">
    <div class="by">
      Powered by
      <a href="https://inis.cc/">inis</a> | 本站自豪使用了全世界最好的Vue框架
      <br />Copyright (c) 2021-present, Kamtao (Geek) Lew
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  props: {},
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
  .by {
    line-height: 24px;
    color: #999;
    font-size: 13px;
    letter-spacing: 0.5px;
  }
}

.isShowAside {
  .footer-wrapper {
    display: none;
  }
}
</style>