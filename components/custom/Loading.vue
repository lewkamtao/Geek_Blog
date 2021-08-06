<template lang="html">
  <div class="loading-page" v-if="loading">
    <img width="300" src="https://kamtao-1255310647.cos.ap-chengdu.myqcloud.com/img/loading.gif" alt srcset />
  </div>
</template>

<script>
export default {
  data: () => ({
    loading: false
  }),
  methods: {
    start() {
      this.loading = true;
    },
    finish() {
      var that = this;
      setTimeout(function() {
        that.loading = false;
      }, 500);
    }
  }
};
</script>

<style scoped>
.loading-page {
  position: fixed;
  bottom: 50px;
  left: -50px;
  z-index: 9999999999;
}
@media screen and (max-width: 1025px) {
  .loading-page {
    display: none;
  }
}
</style>