<template lang="html">
    
  <div class="loading-page" v-if="loading">
    <img width="500" src="https://kamtao-1255310647.cos.ap-chengdu.myqcloud.com/img/loading.gif" alt srcset />
    <p>Loading...</p>
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
      }, 200);
    }
  }
};
</script>

<style scoped>
.loading-page {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 9999999999;
  background: rgba(255, 255, 255, 0.8);
  font-size: 30px;
  font-family: sans-serif;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
</style>