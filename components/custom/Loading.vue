<template lang="html">
  <div class="loading" v-if="false">
  </div>
</template>

<script>
export default {
  data: () => ({}),
  methods: {
    start() {
      if (process.browser) {
        var geek_main = document.getElementById("geek_main");
        if (geek_main) {
          geek_main.classList.add("isGeekMainLoading");
        }
      }
    },
    finish() {
      if (process.browser) {
        setTimeout(function () {
          var geek_main = document.getElementById("geek_main");
          if (geek_main) {
            geek_main.classList.remove("isGeekMainLoading");
          }
        }, 100);
      }
    },
  },
};
</script>

<style scoped>
.loading-page {
  position: absolute;
  z-index: -999;
  transition: opacity 0.25s;
}
@media screen and (max-width: 1025px) {
  .loading-page {
    display: none;
  }
}
</style>
