<template>
  <div class="top-nav-wrapper">
    <div id="topNavMask" class="top-nav-mask modal-bg">1</div>
    <div class="top-nav part">
      <div class="logo">Geek</div>
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
.top-nav-wrapper {
  width: 100%;
  height: 100%;
  background: none !important;
}
.top-nav {
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.7);
  -webkit-backdrop-filter: saturate(200%) blur(20px);
  backdrop-filter: saturate(200%) blur(20px);
}

.top-nav-mask {
  position: absolute;
  left: 0px;
  top: 0px;
  width: 100%;
  height: 100%;
  z-index: 999;
  display: none;
  transition: all 0.3s;
  background: rgba($color: #000000, $alpha: 0.5);
}
</style>