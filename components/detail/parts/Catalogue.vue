<template>
  <div class="catalogue part">
    <div class="main-title" style="margin-bottom: 12px">目录</div>
    <div class="catalogue-scroll" id="catalogue-scroll">
    </div>
  </div>
</template>

<script>
import Catalog from '@/util/catalog'
import '@/assets/css/catalog.scss'

export default {
  methods: {},
  created() {
  },
  mounted() {
    if (process.browser) {
      this.$nextTick(function () {
        new Catalog({
          contentEl: 'article-editor', // 内容获取区
          catalogEl: `catalogue-scroll`, // 目录容器
          selector: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6']
        })
      });
    }
  },
};
</script>
<style lang="scss" scoped></style>
